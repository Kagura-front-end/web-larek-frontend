export class Modal {
  private container: HTMLElement;
  private content: HTMLElement;
  private listener: (event: MouseEvent) => void;
  public onClose?: () => void;

  constructor(selector: string = '.modal') {
    this.container = document.querySelector(selector) as HTMLElement;
    if (!this.container) throw new Error(`Modal element '${selector}' not found`);

    this.content = this.container.querySelector('.modal__content') as HTMLElement;
    if (!this.content) throw new Error(`.modal__content not found inside '${selector}'`);

    this.listener = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.modal__content') || target.closest('.modal__close')) {
        this.close();
      }
    };
  }

  public open(content: HTMLElement): void {
    console.log('🪟 Открываем модалку с контентом:', content);
    this.content.innerHTML = '';
    this.content.append(content);
    this.container.classList.add('modal_active');
    document.body.classList.add('body_fixed');
    this.container.addEventListener('click', this.listener);
  }

  public close(): void {
    this.container.classList.remove('modal_active');
    document.body.classList.remove('body_fixed');
    this.container.removeEventListener('click', this.listener);
    this.onClose?.();
  }
}
