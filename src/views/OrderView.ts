export class OrderView {
  private template: HTMLTemplateElement;

  constructor(private container: HTMLElement) {
    const template = document.getElementById('order') as HTMLTemplateElement;

    if (!template) {
      throw new Error('Order template not found');
    }

    this.template = template;
  }

  public render(): HTMLElement {
    const fragment = this.template.content.cloneNode(true) as HTMLElement;
    return fragment;
  }
}
