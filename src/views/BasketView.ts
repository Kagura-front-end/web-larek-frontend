import { IProductItem } from '../types';
import { ensureElement } from '../utils/utils';

export class BasketView {
	private list: HTMLElement;
	private priceEl: HTMLElement;
	private submitButton: HTMLButtonElement;
	private root: HTMLElement;

	constructor() {
		const template = document.getElementById('basket') as HTMLTemplateElement;
		this.root = template.content.firstElementChild!.cloneNode(true) as HTMLElement;

		this.list = this.root.querySelector('.basket__list')!;
		this.priceEl = this.root.querySelector('.basket__price')!;
		this.submitButton = this.root.querySelector('.basket__button')!;

		this.submitButton.disabled = true;
	}

	public render(items: IProductItem[]): HTMLElement {
		this.list.innerHTML = '';
		let total = 0;

		items.forEach((item) => {
			const li = document.createElement('li');
			li.classList.add('basket__item');
			li.innerHTML = `
        <span>${item.title}</span>
        <span>${item.price} синапсов</span>
        <button class="basket__item-delete" data-id="${item.id}" aria-label="Удалить товар">
          <img src="/src/images/trash.svg" alt="Удалить">
        </button>
      `;
			this.list.appendChild(li);
			total += item.price ?? 0;
		});

		this.priceEl.textContent = `${total} синапсов`;
		this.submitButton.disabled = items.length === 0;

		return this.root;
	}

	public setOnRemove(callback: (id: string) => void) {
		this.list.addEventListener('click', (e) => {
			const btn = (e.target as HTMLElement).closest('.basket__item-delete') as HTMLElement;
			if (btn?.dataset.id) {
				callback(btn.dataset.id);
			}
		});
	}

	public setOnSubmit(callback: () => void) {
		this.submitButton.addEventListener('click', () => {
			if (!this.submitButton.disabled) callback();
		});
	}
}
