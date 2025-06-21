import { IProductItem } from '../types';

export class ProductCard {
  constructor(private item: IProductItem) {}

  public render(): HTMLElement {
    const template = document.getElementById('card-catalog') as HTMLTemplateElement;

    if (!template) {
      throw new Error('Card template not found');
    }

    const card = template.content.firstElementChild!.cloneNode(true) as HTMLElement;

    card.querySelector('.card__category')!.textContent = this.item.category;
    card.querySelector('.card__title')!.textContent = this.item.title;
    card.querySelector('.card__price')!.textContent = this.item.price
      ? `${this.item.price} синапсов`
      : 'Бесценно';

    const imageName = this.item.image.replace(/^\/+/, ''); // Удалить начальные слэши
    const imageUrl = new URL(`/static/${imageName}`, process.env.API_ORIGIN);

    const imageEl = card.querySelector('.card__image') as HTMLImageElement;
    if (imageEl) {
      imageEl.src = imageUrl.toString();
      imageEl.alt = this.item.title;
    }

    card.setAttribute('data-id', this.item.id);

    return card;
  }
}
