import { IProductItem } from '../types';
import { IView } from '../interfaces/IView';
import { setImage } from '../utils/utils';

export class PreviewView implements IView<IProductItem> {
  private template: HTMLTemplateElement;
  private container: HTMLElement;
  private modal: HTMLElement;
  private currentId: string | null = null;

  constructor(templateSelector: string, containerSelector: string) {
    const templateEl = document.querySelector(templateSelector);
    const containerEl = document.querySelector(containerSelector);
    const modalEl = containerEl?.closest('.modal');

    if (!(templateEl instanceof HTMLTemplateElement)) {
      throw new Error(`Template '${templateSelector}' not found or not a <template>`);
    }
    if (!(containerEl instanceof HTMLElement)) {
      throw new Error(`Container '${containerSelector}' not found`);
    }
    if (!(modalEl instanceof HTMLElement)) {
      throw new Error(`Modal not found for container '${containerSelector}'`);
    }

    this.template = templateEl;
    this.container = containerEl;
    this.modal = modalEl;
  }

  public render(data: IProductItem): void {
    this.currentId = data.id;

    const card = this.template.content.cloneNode(true) as HTMLElement;

    (card.querySelector('.card__title') as HTMLElement).textContent = data.title;
    (card.querySelector('.card__text') as HTMLElement).textContent = data.description;
    (card.querySelector('.card__category') as HTMLElement).textContent = data.category;
    (card.querySelector('.card__price') as HTMLElement).textContent = data.price
      ? `${data.price} синапсов`
      : 'Бесценно';

    const image = card.querySelector('.card__image') as HTMLImageElement;
    setImage(image, data.image, data.title);

    const button = card.querySelector('.button') as HTMLButtonElement;
    button.classList.add('card__button');
    button.dataset.id = data.id;
    button.textContent = 'В корзину';

    this.container.replaceChildren(card); 
    this.modal.classList.add('modal_active');
  }

  public close(): void {
    this.modal.classList.remove('modal_active');
  }

  public bindAddToCart(
    handler: (id: string) => void,
    openBasketCallback: () => void
  ): void {
    this.container.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;

      if (target.classList.contains('card__button')) {
        const id = target.dataset.id;

        if (id) {
          if (target.textContent === 'Купить') {
            openBasketCallback();
          } else {
            handler(id);
          }
        }
      }
    });
  }

  public updateButtonState(id: string, inBasket: boolean): void {
    const button = this.container.querySelector<HTMLButtonElement>('.card__button');

    console.log('[updateButtonState]', {
      currentId: this.currentId,
      id,
      button,
      inBasket,
    });

    if (!button || button.dataset.id !== id) return;

    setTimeout(() => {
      button.textContent = inBasket ? 'Купить' : 'В корзину';
    }, 0);
  }

  public getCurrentId(): string | null {
    return this.currentId;
  }
}
