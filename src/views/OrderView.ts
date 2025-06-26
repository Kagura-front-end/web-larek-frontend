export class OrderView {
	private template: HTMLTemplateElement;
	private form?: HTMLFormElement;

	constructor(private container: HTMLElement) {
		const template = document.getElementById('order') as HTMLTemplateElement;
		if (!template) {
			throw new Error('Order template not found');
		}
		this.template = template;
	}

	public render(): HTMLElement {
		const fragment = this.template.content.cloneNode(true) as HTMLElement;
		this.form = fragment.querySelector('form')!;
		return fragment;
	}

	public setOnSubmit(callback: () => void): void {
		if (!this.form) {
			throw new Error('Form is not rendered yet');
		}

		this.form.addEventListener('submit', (e) => {
			e.preventDefault();
			callback();
		});
	}
}
