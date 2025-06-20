import { EventEmitter } from '../components/base/events';
import { IBasketItem } from '../types';

interface BasketRemoveEvent {
  id: string;
}

interface BasketAddEvent {
  item: IBasketItem;
}

export class BasketPresenter {
  private basket: IBasketItem[] = [];

  constructor(private events: EventEmitter) {}

  init() {
    this.events.on<BasketAddEvent>('basket:add', ({ item }) => {
      this.basket.push(item);
      this.emitBasketChanged();
    });

    this.events.on<BasketRemoveEvent>('basket:remove', ({ id }) => {
      this.basket = this.basket.filter(item => item.id !== id);
      this.emitBasketChanged();
    });
  }

  private emitBasketChanged() {
    const total = this.basket.reduce((sum, item) => sum + (item.price ?? 0), 0);

    this.events.emit('basket:changed', {
      items: this.basket,
      total,
    });
  }
}
