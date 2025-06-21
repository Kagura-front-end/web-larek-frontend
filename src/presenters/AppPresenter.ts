import { CatalogView } from '../views/CatalogView';
import { CatalogController } from './CatalogController';
import { BasketService } from './BasketService';
import { OrderHandler } from './OrderHandler';
import { EventEmitter } from '../components/base/events';
import { ApiService } from '../components/base/ApiService';
import { PreviewView } from '../views/PreviewView';
import { PreviewPresenter } from './PreviewPresenter';

export class AppPresenter {
  private catalog: CatalogController;
  private basket: BasketService;
  private order: OrderHandler;
  private preview: PreviewPresenter;
  private api: ApiService;

  constructor(private events: EventEmitter) {
    const catalogView = new CatalogView('.gallery', this.events);
    const previewView = new PreviewView('#card-preview', '.modal__content');

    this.api = new ApiService(process.env.API_ORIGIN + '/api/weblarek');

    this.preview = new PreviewPresenter(this.events, previewView);

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
  }

  public init(): void {
    this.catalog.init();
    this.basket.init();
    this.order.init();
    this.preview.init();
  }
}
