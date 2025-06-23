import { ensureElement } from '../utils/utils';
import { SelectorElement } from '../types';

export class OrderView {
  private orderTemplate: HTMLTemplateElement;
  private contactsTemplate: HTMLTemplateElement;
  private root: HTMLElement;

  private addressInput?: HTMLInputElement;
  private emailInput?: HTMLInputElement;
  private phoneInput?: HTMLInputElement;

  private cardButton?: HTMLButtonElement;
  private cashButton?: HTMLButtonElement;
  private submitButton?: HTMLButtonElement;

  private payment: 'card' | 'cash' = 'card';

  constructor(private container: HTMLElement) {
    this.orderTemplate = ensureElement<HTMLTemplateElement>('#order');
    this.contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
  }

  // Шаг 1: отрисовка способа оплаты и адреса
  public renderOrder(): HTMLElement {
    const root = this.orderTemplate.content.firstElementChild?.cloneNode(true) as HTMLElement;
    this.root = root;

    this.addressInput = ensureElement<HTMLInputElement>('.form__input[name="address"]', root);
    this.cardButton = ensureElement<HTMLButtonElement>('.button_alt[name="card"]', root);
    this.cashButton = ensureElement<HTMLButtonElement>('.button_alt[name="cash"]', root);
    this.submitButton = ensureElement<HTMLButtonElement>('.order__button', root);

    this.cardButton.addEventListener('click', () => this.setPaymentMethod('card'));
    this.cashButton.addEventListener('click', () => this.setPaymentMethod('cash'));

    this.setPaymentMethod(localStorage.getItem('payment') === 'cash' ? 'cash' : 'card');

    this.container.innerHTML = '';
    this.container.appendChild(root);
    return root;
  }

  // Шаг 2: отрисовка email и телефона
  public renderContacts(): HTMLElement {
    const root = this.contactsTemplate.content.firstElementChild?.cloneNode(true) as HTMLElement;
    this.root = root;

    this.emailInput = ensureElement<HTMLInputElement>('.form__input[name="email"]', root);
    this.phoneInput = ensureElement<HTMLInputElement>('.form__input[name="phone"]', root);
    this.submitButton = ensureElement<HTMLButtonElement>('button[type="submit"]', root);

    this.container.innerHTML = '';
    this.container.appendChild(root);
    return root;
  }

  public setOnAddressChange(callback: (value: string) => void) {
    this.addressInput?.addEventListener('input', () => callback(this.addressInput!.value));
  }

  public setOnSubmit(callback: () => void) {
    this.submitButton?.addEventListener('click', callback);
  }

  public setSubmitEnabled(value: boolean) {
    if (this.submitButton) {
      this.submitButton.disabled = !value;
    }
  }

  public getPaymentMethod(): 'card' | 'cash' {
    return this.payment;
  }

  public getAddress(): string {
    return this.addressInput?.value.trim() || '';
  }

  public getEmail(): string {
    return this.emailInput?.value.trim() || '';
  }

  public getPhone(): string {
    return this.phoneInput?.value.trim() || '';
  }

  public setOnEmailChange(callback: (value: string) => void) {
    this.emailInput.addEventListener('input', () => callback(this.emailInput.value));
  }

  public setOnPhoneChange(callback: (value: string) => void) {
    this.phoneInput.addEventListener('input', () => callback(this.phoneInput.value));
  }

  private setPaymentMethod(method: 'card' | 'cash') {
    this.payment = method;
    localStorage.setItem('payment', method);

    if (this.cardButton && this.cashButton) {
      this.cardButton.classList.toggle('button_alt-active', method === 'card');
      this.cashButton.classList.toggle('button_alt-active', method === 'cash');
    }
  }
}
