import { EventEmitter } from '../components/base/events';
import { IProductItem, UUID } from '../types';
import { PreviewView } from '../views/PreviewView';

export class PreviewPresenter {
  private catalog: IProductItem[] = [];

  constructor(
    private events: EventEmitter,
    private view: PreviewView
  ) {}

  public init(): void {
    this.events.on<'preview:changed'>('preview:changed', (product) => {
      this.view.render(product);
    });

    this.events.on<'basket:changed'>('basket:changed', (data) => {
      console.log('[basket:changed]', data);

      const id = this.view.getCurrentId();
      console.log('[basket:changed] currentId:', id);

      if (!data?.items || !id) return;

      const inBasket = data.items.some((item) => item.id === id);
      this.view.updateButtonState(id, inBasket);
    });

    this.view.bindAddToCart({
      onAdd: (id: string) => {
        console.log(`[PreviewPresenter] emitting basket:add for ${id}`);
        this.events.emit('basket:add', { id });
      },
      onBuy: () => {
        console.log('[PreviewPresenter] emitting order:open');
        this.view.close();
        this.events.emit('order:open');
      }
    });

    this.events.on<'items:changed'>('items:changed', (items) => {
      this.catalog = items;
    });
  }
}
