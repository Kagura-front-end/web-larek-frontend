import { EventEmitter } from '../components/base/events';
import { CatalogPresenter } from './CatalogPresenter';
import { BasketPresenter } from './BasketPresenter';
import { OrderPresenter } from './OrderPresenter';

export class AppPresenter {
  constructor(private events: EventEmitter) {}

  init() {
    new CatalogPresenter(this.events).init();
    new BasketPresenter(this.events).init();
    new OrderPresenter(this.events).init();
  }
}
