import { EventEmitter } from '../components/base/events';
import { UUID, IProductItem } from '../types';

interface BasketRemoveEvent {
  id: UUID;
}

interface BasketAddEvent {
  id: UUID;
}

export class BasketService {
  private basket: UUID[] = [];
  private catalog: IProductItem[] = [];

  constructor(private events: EventEmitter) {}

  public init(): void {
    this.events.on<BasketAddEvent>('basket:add', ({ id }) => {
      if (!this.basket.includes(id)) {
        this.basket.push(id);
        this.emitBasketChanged();
      }
    });

    this.events.on<BasketRemoveEvent>('basket:remove', ({ id }) => {
      this.basket = this.basket.filter(itemId => itemId !== id);
      this.emitBasketChanged();
    });

    this.events.on<IProductItem[]>('items:changed', (items) => {
      this.catalog = items;
      this.emitBasketChanged(); // пересчитать total, если каталог обновился
    });
  }

  private emitBasketChanged(): void {
    const items = this.catalog.filter(product => this.basket.includes(product.id));
    const total = items.reduce((sum, item) => sum + (item.price ?? 0), 0);

    this.events.emit('basket:changed', {
      items: this.basket,
      total,
    });
  }
}
