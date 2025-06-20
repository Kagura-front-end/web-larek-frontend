import { EventEmitter } from '../components/base/events';
import { IProductItem } from '../types';
import { cloneTemplate } from '../utils/utils';

export class CatalogView {
  constructor(private events: EventEmitter) {}

  render(items: IProductItem[]) {
    const container = document.querySelector('.gallery')!;
    container.innerHTML = '';

    items.forEach(item => {
      const card = cloneTemplate<HTMLButtonElement>('#card-catalog');
      card.querySelector('.card__title')!.textContent = item.title;
      card.querySelector('.card__price')!.textContent = `${item.price} синапсов`;
      card.addEventListener('click', () => this.events.emit('preview:changed', item));
      container.appendChild(card);
    });
  }
}
