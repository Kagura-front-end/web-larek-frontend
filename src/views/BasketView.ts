import { IProductItem } from '../types';
import { ensureElement } from '../utils/utils';

export class BasketView {
	private list: HTMLElement;
	private priceEl: HTMLElement;
	private submitButton: HTMLButtonElement;
	private root: HTMLElement;

	constructor() {
		const template = document.getElementById('basket') as HTMLTemplateElement;
		if (!template) {
			throw new Error('Basket template not found');
		}

		this.root = template.content.firstElementChild!.cloneNode(true) as HTMLElement;

		this.list = this.root.querySelector('.basket__list') as HTMLElement;
		this.priceEl = this.root.querySelector('.basket__price') as HTMLElement;
		this.submitButton = this.root.querySelector('.basket__button') as HTMLButtonElement;

		this.submitButton.disabled = true;
	}

	public render(items: IProductItem[]): HTMLElement {
		this.list.replaceChildren(); // лучше, чем innerHTML = ''
		let total = 0;

		items.forEach((item) => {
			const li = document.createElement('li');
			li.classList.add('basket__item');

			const titleEl = document.createElement('span');
			titleEl.textContent = item.title;

			const priceEl = document.createElement('span');
			priceEl.textContent = `${item.price} синапсов`;

			const deleteButton = document.createElement('button');
			deleteButton.classList.add('basket__item-delete');
			deleteButton.dataset.id = item.id;
			deleteButton.setAttribute('aria-label', 'Удалить товар');

			const deleteIcon = document.createElement('img');
			deleteIcon.src = '/src/images/trash.svg';
			deleteIcon.alt = 'Удалить';

			deleteButton.appendChild(deleteIcon);

			li.appendChild(titleEl);
			li.appendChild(priceEl);
			li.appendChild(deleteButton);
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
			if (!this.submitButton.disabled) {
				callback();
			}
		});
	}
}
