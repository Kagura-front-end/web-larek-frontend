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
    card.querySelector('.card__price')!.textContent = this.item.price ? `${this.item.price} синапсов` : 'Бесценно';
    const imageName = this.item.image.replace(/^\/+/, ''); // удалим все слеши в начале

    const imageUrl = new URL(`/static/${imageName}`, process.env.API_ORIGIN);
    console.log('Image URL:', imageUrl.toString());

    (card.querySelector('.card__image') as HTMLImageElement).src = imageUrl.toString();
    card.setAttribute('data-id', this.item.id);
    return card;
  }
}
