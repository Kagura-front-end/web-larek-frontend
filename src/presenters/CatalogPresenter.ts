import { EventEmitter } from '../components/base/events';
import { ApiService } from '../components/base/ApiService';
import { IProductItem } from '../types';
import type { CatalogView } from '../views/CatalogView';

export interface ICatalogControllerConstructor {
	api: ApiService;
	events: EventEmitter;
	view: CatalogView;
}

export class CatalogPresenter {
	private api: ApiService;
	private events: EventEmitter;
	private view: CatalogView;

	constructor({ api, events, view }: ICatalogControllerConstructor) {
		this.api = api;
		this.events = events;
		this.view = view;
	}

	public init(): void {
		this.api.getProductList()
			.then((response) => {
				this.view.render(response.items);
				this.events.emit('items:changed', response.items);
			})
			.catch((error) => {
				console.error('Произошла ошибка при загрузке списка:', error);
			});
	}
}
