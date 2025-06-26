import { CatalogView } from '../views/CatalogView';
import { CatalogPresenter } from './CatalogPresenter';
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
import { IProductItem } from '../types';
import { FormFlowPresenter } from './FormFlowPresenter';
import { ModalManager } from './ModalManager';

export class AppPresenter {
	private catalog: CatalogPresenter;
	private basket: BasketService;
	private order: OrderHandler;
	private preview: PreviewPresenter;

	private api: ApiService;
	private basketView: BasketView;
	private orderView: OrderView;
	private orderService = new OrderService();

	private modal: ModalManager;
	private formFlow: FormFlowPresenter;

	private lastTotal = 0;

	constructor(private events: EventEmitter) {
		this.api = new ApiService(process.env.API_ORIGIN + '/api/weblarek');

		const catalogView = new CatalogView('.gallery', this.events);
		const previewView = new PreviewView('#card-preview', '.modal__content');
		const rawModal = new Modal();

		this.basketView = new BasketView();
		this.orderView = new OrderView(document.querySelector('.modal__content')!);
		this.modal = new ModalManager(rawModal);

		this.catalog = new CatalogPresenter({ api: this.api, events: this.events, view: catalogView });
		this.basket = new BasketService(this.events);
		this.preview = new PreviewPresenter(this.events, previewView);
		this.order = new OrderHandler({ api: this.api, events: this.events });

		this.formFlow = new FormFlowPresenter({
			orderService: this.orderService,
			orderView: this.orderView,
			basketItems: () => this.basket.getItems(),
			getTotal: () => this.lastTotal,
			clearBasket: () => this.basket.clear(),
			events: this.events,
			modal: this.modal,
		});
	}

	public init(): void {
		this.catalog.init();
		this.basket.init();
		this.order.init();
		this.preview.init();

		this.events.on<{ items: IProductItem[]; total: number }>('basket:changed', ({ items }) => {
			this.basketView.updateCounter(items.length);
		});

		this.events.on('order:open', () => {
			this.formFlow.start();
		});

		this.events.on('basket:open', () => {
			const items = this.basket.getItems();
			this.lastTotal = items.reduce((sum, item) => sum + (item.price ?? 0), 0);

			const content = this.basketView.render(items);
			this.basketView.setOnRemove((id: string) => {
				this.basket.remove(id);
				this.events.emit('basket:open');
			});
			this.basketView.setOnSubmit(() => {
				this.events.emit('order:open');
			});

			this.modal.open(content);
		});

		document.querySelector('.header__basket')?.addEventListener('click', () => {
			this.events.emit('basket:open');
		});

		this.modal.bindCloseButton('modal__close');
	}
}
