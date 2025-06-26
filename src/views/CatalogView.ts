import { IProductItem } from '../types';
import { ProductCard } from './ProductCard';
import { IView } from '../interfaces/IView';
import { EventEmitter } from '../components/base/events';

export class CatalogView implements IView<IProductItem[]> {
	private container: HTMLElement;

	constructor(containerSelector: string, private events: EventEmitter) {
		const el = document.querySelector(containerSelector);
		if (!el) {
			throw new Error(`Element '${containerSelector}' not found`);
		}
		this.container = el as HTMLElement;
	}

	public render(items: IProductItem[]): void {
		const fragment = document.createDocumentFragment();

		items.forEach((item) => {
			const card = new ProductCard(item).render();

			card.addEventListener('click', () => {
				this.events.emit('preview:changed', item);
			});

			fragment.appendChild(card);
		});

		this.container.replaceChildren(fragment);
	}
}

