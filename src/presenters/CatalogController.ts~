import { EventEmitter } from '../components/base/events';
import { ApiService } from '../components/base/ApiService';
import { IProductItem } from '../types';
import type { CatalogView } from '../views/CatalogView'; // ✅ Импортируем только тип

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
      .catch((err) => console.error('❌ Ошибка загрузки каталога:', err));
  }
}
