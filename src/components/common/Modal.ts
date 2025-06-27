export class Modal {
	private container: HTMLElement;
	private content: HTMLElement;
	private closeButton: HTMLElement;

	constructor() {
		this.container = document.querySelector('.modal')!;
		this.content = this.container.querySelector('.modal__content')!;
		this.closeButton = this.container.querySelector('.modal__close')!;

		this.closeButton.addEventListener('click', () => this.close());

		this.container.addEventListener('click', (e) => {
			if (e.target === this.container) {
				this.close();
			}
		});
	}

	private _toggleModal(state = true) {
		this.container.classList.toggle('modal_active', state);
	}

	private _handleEscape = (evt: KeyboardEvent) => {
		if (evt.key === 'Escape') {
			this.close();
		}
	};

	public open(content: HTMLElement): void {
		this.content.replaceChildren(content);
		this._toggleModal();
		document.addEventListener('keydown', this._handleEscape);
	}

	public close(): void {
		this._toggleModal(false);
		this.content.replaceChildren();
		document.removeEventListener('keydown', this._handleEscape);
	}
}
