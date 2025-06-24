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
  private modalContent: HTMLElement;

  constructor(private options: IOrderHandlerConstructor) {
    this.view = new OrderView(document.querySelector('.modal__content') as HTMLElement);
  }

  public init(): void {
    const { events, api, orderService } = this.options;

    // обработка отправки полной формы
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

  public renderFormStep1(): HTMLElement {
    const form = this.view.renderOrder();
    this.modalContent = form;

    this.view.setOnAddressChange((value) => {
      this.options.orderService.setAddress(value);
      this.view.setSubmitEnabled(this.options.orderService.isFormStep1Valid());
    });

    this.view.setOnSubmit(() => {
      const step2 = this.view.renderContacts();
      this.modalContent.replaceWith(step2);
      this.modalContent = step2;

      this.view.setSubmitEnabled(false);

      const validate = () => {
        const email = this.view.getEmail();
        const phone = this.view.getPhone();
        this.view.setSubmitEnabled(email.length > 0 && phone.length > 0);
      };

      this.view.setOnEmailChange(validate);
      this.view.setOnPhoneChange(validate);

      this.view.setOnSubmit(() => {
        const form: IOrderForm = {
          payment: this.view.getPaymentMethod(),
          address: this.view.getAddress(),
          email: this.view.getEmail(),
          phone: this.view.getPhone(),
        };

        this.options.events.emit('order:formFilled', form);
      });
    });

    return form;
  }
}
