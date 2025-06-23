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
    // Отображение карточки в модалке
    this.events.on<'preview:changed'>('preview:changed', (product) => {
      this.view.render(product);
    });

    // Слушаем изменение корзины — обновляем кнопку
    this.events.on<'basket:changed'>('basket:changed', (data) => {
      if (!data?.items) return;

      const id = this.view.getCurrentId();
      if (!id) return;

      const inBasket = data.items.some((item) => item.id === id);
      this.view.updateButtonState(id, inBasket);
    });

    // Добавление в корзину из модалки
    this.view.bindAddToCart(
      (id: string) => {
        this.events.emit('basket:add', { id });
      },
      () => {
        this.events.emit('basket:open', undefined);
      }
    );

    // Получаем товары и запоминаем для поиска по id
    this.events.on<'items:changed'>('items:changed', (items) => {
      this.catalog = items;
    });
  }
}
