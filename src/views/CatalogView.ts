import { IProductItem } from '../types';
import { ProductCard } from './ProductCard';

export class CatalogView {
  private container: HTMLElement;

  constructor(containerSelector: string) {
    const el = document.querySelector(containerSelector);
    if (!el) {
      throw new Error(`Element '${containerSelector}' not found`);
    }
    this.container = el as HTMLElement;
  }

  public render(items: IProductItem[]): void {
    this.container.innerHTML = '';
    items.forEach((item) => {
      const card = new ProductCard(item).render();
      this.container.appendChild(card);
    });
  }
}
