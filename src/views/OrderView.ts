export class OrderView {
	private template: HTMLTemplateElement;
	private formSelector = 'form';

	constructor(private container: HTMLElement) {
		const template = document.getElementById('order') as HTMLTemplateElement;
		if (!template) {
			throw new Error('Order template not found');
		}
		this.template = template;
	}

	public render(): HTMLElement {
		return this.template.content.cloneNode(true) as HTMLElement;
	}

	public setOnSubmit(callback: () => void): void {
		setTimeout(() => {
			const modalElement = document.querySelector('.modal__content');
			if (!modalElement) {
				console.warn('Modal content not found');
				return;
			}

			const form = modalElement.querySelector(this.formSelector) as HTMLFormElement;
			if (!form) {
				console.warn('Form not found inside modal content');
				return;
			}

			form.addEventListener('submit', (e) => {
				e.preventDefault();
				callback();
			});
		}, 0);
	}
}
