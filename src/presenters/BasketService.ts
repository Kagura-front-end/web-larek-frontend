import { EventEmitter } from '../components/base/events';
import { UUID, IProductItem } from '../types';

export class BasketService {
  private basket: UUID[] = [];
  private catalog: IProductItem[] = [];

  constructor(private events: EventEmitter) {}

  public init(): void {
    this.loadFromStorage();
    this.events.on<{ id: UUID }>('basket:add', ({ id }) => this.add(id));
    this.events.on<{ id: UUID }>('basket:remove', ({ id }) => this.remove(id));
    this.events.on<IProductItem[]>('items:changed', (items) => {
      this.catalog = items;
      this.emitBasketChanged();
    });
    this.events.on<{ id: UUID }>('basket:get', ({ id }) => {
      const inBasket = this.basket.includes(id);
      this.events.emit('basket:status', { id, inBasket });
    });
  }

  private loadFromStorage(): void {
    const data = localStorage.getItem('basket');
    if (data) {
      try {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          this.basket = parsed;
          this.updateCounter(); 
        }
      } catch (e) {
        console.warn('Failed to parse basket from storage', e);
      }
    }
  }

  private add(id: UUID): void {
    if (!this.basket.includes(id)) {
      this.basket.push(id);
      this.saveToStorage();
      this.emitBasketChanged();
      this.updateCounter();
    }
  }

  private remove(id: UUID): void {
    this.basket = this.basket.filter(itemId => itemId !== id);
    this.saveToStorage();
    this.emitBasketChanged();
    this.updateCounter();
  }

  private saveToStorage(): void {
    localStorage.setItem('basket', JSON.stringify(this.basket));
  }

  private emitBasketChanged(): void {
    const items = this.catalog.filter(product => this.basket.includes(product.id));
    const total = items.reduce((sum, item) => sum + (item.price ?? 0), 0);

    this.events.emit('basket:changed', {
      items,
      total,
    });
  }

  private updateCounter(): void {
    const counter = document.querySelector('.header__basket-counter');
    if (counter) counter.textContent = String(this.basket.length);
  }
}
