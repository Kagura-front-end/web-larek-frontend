import { IProductItem } from '../types/index';
import { categoryMapping } from '../types/index';


export class ProductCard {
  constructor(private item: IProductItem) {
  }

  public render(): HTMLElement {
    const template = document.getElementById('card-catalog') as HTMLTemplateElement;

    if (!template) {
      throw new Error('Card template not found');
    }

    const card = template.content.firstElementChild!.cloneNode(true) as HTMLElement;

    const categoryEl = card.querySelector('.card__category') as HTMLElement;
    const titleEl = card.querySelector('.card__title') as HTMLElement;
    const priceEl = card.querySelector('.card__price') as HTMLElement;
    const imageEl = card.querySelector('.card__image') as HTMLImageElement;

    categoryEl.textContent = this.item.category;
    this.updateCategoryClass(categoryEl, this.item.category);

    titleEl.textContent = this.item.title;
    priceEl.textContent = this.item.price
      ? `${this.item.price} синапсов`
      : 'Бесценно';

    const imageName = this.item.image.replace(/^\/+/, '');
    const imageUrl = new URL(`/static/${imageName}`, process.env.API_ORIGIN);
    if (imageEl) {
      imageEl.src = imageUrl.toString();
      imageEl.alt = this.item.title;
    }

    card.setAttribute('data-id', this.item.id);
    return card;
  }


  private updateCategoryClass(element: HTMLElement, category: string): void {
    Array.from(element.classList).forEach(className => {
      if (className.startsWith('card__category_')) {
        element.classList.remove(className);
      }
    });

    if (category in categoryMapping) {
      const mapped = categoryMapping[category as keyof typeof categoryMapping];
      element.classList.add(`card__category_${mapped}`);
    } else {
      console.warn(`Неизвестная категория: "${category}"`);
    }
  }
}
