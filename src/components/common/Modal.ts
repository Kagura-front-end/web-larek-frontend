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

		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') {
				this.close();
			}
		});
	}

	public open(content: HTMLElement): void {
		this.content.replaceChildren(content);
		this.container.classList.add('modal_active');
	}

	public close(): void {
		this.container.classList.remove('modal_active');
	}
}
