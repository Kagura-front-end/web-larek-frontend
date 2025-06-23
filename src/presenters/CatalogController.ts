import { ApiService } from '../components/base/ApiService';
import { EventEmitter } from '../components/base/events';
import { IProductItem } from '../types';
import { CatalogView } from '../views/CatalogView';

export interface ICatalogControllerConstructor {
  api: ApiService;
  events: EventEmitter;
  view: CatalogView;
}

export class CatalogController {
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
        console.log('📦 Каталог получен:', response);
        this.view.render(response.items);
        this.events.emit('items:changed', response.items);
      })
      .catch((error) => {
        console.error('❌ Ошибка получения каталога:', error);
        this.events.emit('catalog:error', 'Не удалось загрузить каталог. Попробуйте позже.');
      });
  }

  public update(items: IProductItem[]): void {
    this.view.render(items);
  }
}
