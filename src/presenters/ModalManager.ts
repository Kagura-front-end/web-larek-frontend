import { Modal } from '../components/common/Modal';

export class ModalManager {
	private modal: Modal;

	constructor(modal: Modal) {
		this.modal = modal;
	}

	public open(content: HTMLElement): void {
		this.modal.open(content);
	}

	public openTemplate(templateId: string): void {
		const template = document.getElementById(templateId) as HTMLTemplateElement;
		if (!template) throw new Error(`Template '${templateId}' not found`);
		const content = template.content.cloneNode(true) as HTMLElement;
		this.open(content);
	}

	public close(): void {
		this.modal.close();
	}

	public bindCloseButton(className: string): void {
		document.addEventListener('click', (e) => {
			const target = e.target as HTMLElement;
			if (target.classList.contains(className)) {
				this.close();
			}
		});
	}
}
