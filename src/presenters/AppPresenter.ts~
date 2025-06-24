import { CatalogView } from '../views/CatalogView';
import { CatalogController } from './CatalogController';
import { BasketService } from './BasketService';
import { OrderHandler } from './OrderHandler';
import { EventEmitter } from '../components/base/events';
import { ApiService } from '../components/base/ApiService';
import { PreviewView } from '../views/PreviewView';
import { PreviewPresenter } from './PreviewPresenter';
import { BasketView } from '../views/BasketView';
import { Modal } from '../components/common/Modal';
import { OrderView } from '../views/OrderView';
import { OrderService } from '../models/OrderService';

export class AppPresenter {
  private catalog: CatalogController;
  private basket: BasketService;
  private order: OrderHandler;
  private preview: PreviewPresenter;
  private api: ApiService;
  private orderView: OrderView;
  private orderService = new OrderService();
  private lastTotal: number = 0;

  private basketView: BasketView;
  private modal: Modal;

  constructor(private events: EventEmitter) {
    const catalogView = new CatalogView('.gallery', this.events);
    const previewView = new PreviewView('#card-preview', '.modal__content');
    const modalContentEl = document.querySelector('.modal__content') as HTMLElement;
    this.orderView = new OrderView(modalContentEl);

    this.api = new ApiService(process.env.API_ORIGIN + '/api/weblarek');

    this.preview = new PreviewPresenter(this.events, previewView);
    this.basketView = new BasketView();

    this.catalog = new CatalogController({
      api: this.api,
      events: this.events,
      view: catalogView,
    });

    this.basket = new BasketService(this.events);

    this.order = new OrderHandler({
      api: this.api,
      events: this.events,
    });

    this.modal = new Modal();
  }

  public init(): void {
    this.catalog.init();
    this.basket.init();
    this.order.init();
    this.preview.init();

    this.events.on('order:open', () => {
      this.modal.open(this.orderView.render());

      setTimeout(() => {
        const modalElement = document.querySelector('.modal__content');
        if (!modalElement) return;

        const buttons = modalElement.querySelectorAll<HTMLButtonElement>('.order__buttons .button');
        const addressInput = modalElement.querySelector<HTMLInputElement>('input[name="address"]');
        const nextButton = modalElement.querySelector<HTMLButtonElement>('button[type="submit"]');

        const updateState = () => {
          const hasPayment = !!this.orderService.getPayment();
          const address = addressInput?.value.trim();

          if (address) this.orderService.setAddress(address);
          const hasAddress = !!this.orderService.getAddress();

          if (nextButton) {
            nextButton.disabled = !(hasPayment && hasAddress);
          }
        };

        buttons.forEach(btn => {
          btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('button_alt-active'));
            btn.classList.add('button_alt-active');

            this.orderService.setPayment(btn.name);
            updateState();
          });
        });

        addressInput?.addEventListener('input', updateState);

        nextButton?.addEventListener('click', (e) => {
          e.preventDefault();
          const contactsTemplate = document.getElementById('contacts') as HTMLTemplateElement;
          if (contactsTemplate) {
            const contactsContent = contactsTemplate.content.cloneNode(true) as HTMLElement;
            this.modal.open(contactsContent);

            setTimeout(() => {
              const modalElement = document.querySelector('.modal__content');
              if (!modalElement) return;

              const emailInput = modalElement.querySelector<HTMLInputElement>('input[name="email"]');
              const phoneInput = modalElement.querySelector<HTMLInputElement>('input[name="phone"]');
              const payButton = modalElement.querySelector<HTMLButtonElement>('button[type="submit"]');

              const updatePayButton = () => {
                const email = emailInput?.value.trim();
                const phone = phoneInput?.value.trim();

                const isValid = !!email && !!phone;
                if (isValid) {
                  this.orderService.setEmail(email);
                  this.orderService.setPhone(phone);
                }

                if (payButton) {
                  payButton.disabled = !isValid;
                }
              };

              emailInput?.addEventListener('input', updatePayButton);
              phoneInput?.addEventListener('input', updatePayButton);

              payButton?.addEventListener('click', (e) => {
                e.preventDefault();

                // ✅ Используем ранее сохранённую сумму
                const total = this.lastTotal;

                // Сброс
                this.basket.clear();
                this.orderService.reset();
                this.events.emit('basket:changed', { items: [], total: 0 });

                const successTemplate = document.getElementById('success') as HTMLTemplateElement;
                if (successTemplate) {
                  const successContent = successTemplate.content.cloneNode(true) as HTMLElement;

                  const descriptionEl = successContent.querySelector('.order-success__description');
                  if (descriptionEl) {
                    descriptionEl.textContent = `Списано ${total} синапсов`;
                  }

                  this.modal.open(successContent);

                  setTimeout(() => {
                    const modalElement = document.querySelector('.modal__content');
                    const closeBtn = modalElement?.querySelector<HTMLButtonElement>('.order-success__close');
                    closeBtn?.addEventListener('click', () => {
                      this.modal.close();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    });
                  }, 0);
                }
              });
            }, 0);
          }
        });
      }, 0);
    });

    document.querySelector('.header__basket')?.addEventListener('click', () => {
      this.events.emit('basket:open');
    });

    this.events.on('basket:open', () => {
      const items = this.basket.getItems();

      // ✅ сохраняем сумму до оплаты
      this.lastTotal = items.reduce((sum, item) => sum + (item.price ?? 0), 0);

      const modalContent = this.basketView.render(items);

      this.basketView.setOnRemove((id) => {
        this.basket.remove(id);
        this.events.emit('basket:open');
      });

      this.basketView.setOnSubmit(() => {
        this.events.emit('order:open');
      });

      this.modal.open(modalContent);
    });
  }
}
