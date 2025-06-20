import { Api } from '../components/base/api';
import { EventEmitter } from '../components/base/events';
import { IProductItem } from '../types';

export class CatalogPresenter {
  private api = new Api(process.env.API_ORIGIN + '/api/weblarek');

  constructor(private events: EventEmitter) {}

  init() {
    this.api.get('/product')
      .then((res: any) => {
        const items: IProductItem[] = res.items;
        this.events.emit('items:changed', items);
      })
      .catch(console.error);
  }
}
