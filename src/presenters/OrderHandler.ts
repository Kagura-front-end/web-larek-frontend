import { EventEmitter } from '../components/base/events';
import { ApiService } from '../components/base/ApiService';
import { IOrderForm, IOrderResponse, IOrder } from '../types';
import { OrderValidator } from '../validators/OrderValidator';
import { OrderView } from '../views/OrderView';
import { Modal } from '../components/common/Modal';
import { OrderService } from '../models/OrderService';

export interface IOrderHandlerConstructor {
  api: ApiService;
  events: EventEmitter;
  orderService: OrderService;
  modal: Modal;
}

export class OrderHandler {
  private view: OrderView;

  constructor(
    private options: IOrderHandlerConstructor
  ) {
    this.view = new OrderView(document.createElement('div'));
  }

  public init(): void {
    const { events, api, orderService, modal } = this.options;

    events.on('order:open', () => {
      const content = this.view.renderOrder();
      modal.open(content);

      this.view.setSubmitEnabled(false);

      this.view.setOnAddressChange((value) => {
        this.view.setSubmitEnabled(value.length > 0);
      });

      this.view.setOnSubmit(() => {
        // Переход ко второму шагу
        const content = this.view.renderContacts();
        modal.open(content);

        this.view.setSubmitEnabled(false);

        const validateContacts = () => {
          const email = this.view.getEmail();
          const phone = this.view.getPhone();
          this.view.setSubmitEnabled(email.length > 0 && phone.length > 0);
        };

        this.view.setOnEmailChange(validateContacts);
        this.view.setOnPhoneChange(validateContacts);

        this.view.setOnSubmit(async () => {
          const form: IOrderForm = {
            payment: this.view.getPaymentMethod(),
            address: this.view.getAddress(),
            email: this.view.getEmail(),
            phone: this.view.getPhone(),
          };

          events.emit('order:formFilled', form);
        });
      });
    });

    events.on<'order:formFilled'>('order:formFilled', async (form) => {
      const fullOrder: IOrder = orderService.getFullOrder();

      const errors = OrderValidator.validate(fullOrder);
      if (Object.keys(errors).length > 0) {
        events.emit('formErrors:change', errors);
        return;
      }

      try {
        const result: IOrderResponse = await api.sendOrder(fullOrder);
        events.emit('order:success', result);
      } catch (error) {
        console.error('Order submit failed:', error);
      }
    });
  }
}
