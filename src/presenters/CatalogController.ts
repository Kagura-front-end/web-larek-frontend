import { Api } from '../components/base/api';
import { EventEmitter } from '../components/base/events';
import { IProductItem } from '../types';
import { CatalogView } from '../views/CatalogView';

export class CatalogController {
  private api: Api;
  private view: CatalogView;

  constructor(
    private events: EventEmitter,
    view: CatalogView
  ) {
    this.api = new Api(process.env.API_ORIGIN + '/api/weblarek');
    this.view = view;
  }

  public init(): void {
    this.loadProducts();

    // Подписка на изменение каталога
    this.events.on<IProductItem[]>('items:changed', (items) => {
      this.view.render(items);
    });
  }

  private loadProducts(): void {
    this.api.get('/product')
      .then((res: { items: IProductItem[] }) => {
        this.events.emit('items:changed', res.items);
      })
      .catch((error) => {
        console.error('Ошибка при загрузке каталога:', error);
      });
  }
}
