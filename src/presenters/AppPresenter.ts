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
import { OrderService } from '../models/OrderService';
import { IProductItem } from '../types';

export class AppPresenter {
  private catalog: CatalogController;
  private basket: BasketService;
  private order: OrderHandler;
  private preview: PreviewPresenter;
  private api: ApiService;
  private basketView: BasketView;
  private modal: Modal;

  constructor(private events: EventEmitter) {
    const catalogView = new CatalogView('.gallery', this.events);
    const previewView = new PreviewView('#card-preview', '.modal__content');

    this.api = new ApiService(process.env.API_ORIGIN + '/api/weblarek');
    this.modal = new Modal();

    const orderService = new OrderService(this.events);

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
      orderService: orderService,
      modal: this.modal,
    });
  }

  public init(): void {
    this.catalog.init();
    this.basket.init();
    this.order.init();
    this.preview.init();

    document.querySelector('.header__basket')?.addEventListener('click', () => {
      this.events.emit('basket:open');
    });

    this.events.on<'items:changed'>('items:changed', (items) => {
      this.catalog.update(items);
      this.basket.setCatalog(items);
    });

    this.events.on<'basket:open'>('basket:open', () => {
      localStorage.setItem('modal:open', 'basket');

      const items = this.basket.getItems();
      const modalContent = this.basketView.render(items);

      this.basketView.setOnRemove((id) => {
        this.basket.remove(id);
        this.events.emit('basket:open');
      });

      this.basketView.setOnSubmit(() => {
        console.log('🛒 Нажата кнопка "Оформить"');
        this.events.emit('order:open');
      });

      this.modal.open(modalContent);
    });

    this.events.on<'order:open'>('order:open', () => {
      localStorage.setItem('modal:open', 'order');
      const content = this.order.renderFormStep1();
      this.modal.open(content);
    });

    this.events.on<'catalog:error'>('catalog:error', (message) => {
      console.warn('⚠️ Ошибка загрузки каталога:', message);
      const container = document.querySelector('.gallery');
      if (container) {
        container.innerHTML = `<p class="error">⚠️ ${message}</p>`;
      }
    });

    this.modal.onClose = () => {
      localStorage.removeItem('modal:open');
    };

    const lastModal = localStorage.getItem('modal:open');
    if (lastModal === 'basket') {
      this.events.emit('basket:open');
    } else if (lastModal === 'order') {
      this.events.emit('order:open');
    }
  }
}
