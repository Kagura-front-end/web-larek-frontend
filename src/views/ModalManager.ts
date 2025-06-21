import { ModalType } from '../types';

export class ModalManager {
  constructor(private root: HTMLElement = document.body) {}

  public open(modalId: ModalType): void {
    const modal = this.root.querySelector(`#modal-${modalId}`);
    modal?.classList.add('modal_active');
  }

  public close(modalId: ModalType): void {
    const modal = this.root.querySelector(`#modal-${modalId}`);
    modal?.classList.remove('modal_active');
  }

  public closeAll(): void {
    this.root.querySelectorAll('.modal_active')
      .forEach(modal => modal.classList.remove('modal_active'));
  }
}
