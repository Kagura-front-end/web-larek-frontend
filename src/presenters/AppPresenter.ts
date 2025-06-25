import { CatalogView } from '../views/CatalogView';
import { CatalogController } from './CatalogController';
import { BasketService } from './BasketService';
import { OrderHandler } from './OrderHandler';
import { EventEmitter } from '../components/base/events';
import { ApiService } from '../components/base/ApiService';
import { PreviewView } from '../views/PreviewView';
import { PreviewPresenter } from './PreviewPresenter';
import { BasketView } from '../views/BasketView';
import { Modal } from '../components/common/Modal';
import { OrderView } from '../views/OrderView';
import { OrderService } from '../models/OrderService';
import { IOrder, PaymentMethod } from '../types';

export class AppPresenter {
	private catalog: CatalogController;
	private basket: BasketService;
	private order: OrderHandler;
	private preview: PreviewPresenter;
	private api: ApiService;
	private orderView: OrderView;
	private orderService = new OrderService();
	private lastTotal = 0;

	private basketView: BasketView;
	private modal: Modal;

	constructor(private events: EventEmitter) {
		const catalogView = new CatalogView('.gallery', this.events);
		const previewView = new PreviewView('#card-preview', '.modal__content');
		const modalContentEl = document.querySelector('.modal__content') as HTMLElement;
		this.orderView = new OrderView(modalContentEl);

		this.api = new ApiService(process.env.API_ORIGIN + '/api/weblarek');

		this.preview = new PreviewPresenter(this.events, previewView);
		this.basketView = new BasketView();

		this.catalog = new CatalogController({
			api: this.api,
			events: this.events,
			view: catalogView,
		});

		this.basket = new BasketService(this.events);

		this.order = new OrderHandler({
			api: this.api,
			events: this.events,
		});

		this.modal = new Modal();
	}

	public init(): void {
		this.catalog.init();
		this.basket.init();
		this.order.init();
		this.preview.init();

		this.events.on('order:open', () => {
			const orderContent = this.orderView.render();
			this.modal.open(orderContent);

			this.orderView.setOnSubmit(() => {
				const order: IOrder = {
					address: this.orderService.getAddress(),
					email: this.orderService.getEmail(),
					phone: this.orderService.getPhone(),
					payment: this.orderService.getPayment() as PaymentMethod,
					items: this.basket.getItems(),
					total: this.lastTotal,
				};

				this.events.emit('order:submit', order);
			});

			setTimeout(() => {
				const modalElement = document.querySelector('.modal__content');
				if (!modalElement) return;

				const buttons = modalElement.querySelectorAll<HTMLButtonElement>('.order__buttons .button');
				const addressInput = modalElement.querySelector<HTMLInputElement>('input[name="address"]');
				const nextButton = modalElement.querySelector<HTMLButtonElement>('button[type="submit"]');
				const paymentErrorContainer = modalElement.querySelector('.form__errors_payment') as HTMLElement;
				const addressErrorContainer = modalElement.querySelector('.form__errors_address') as HTMLElement;

				const validate = () => {
					let isValid = true;
					const payment = this.orderService.getPayment();
					const address = addressInput?.value.trim() || '';

					paymentErrorContainer.textContent = '';
					addressErrorContainer.textContent = '';

					if (!payment) {
						paymentErrorContainer.textContent = 'Выберите способ оплаты';
						isValid = false;
					}

					if (address.length < 20 || /\s{2,}/.test(address)) {
						addressErrorContainer.textContent = 'Адрес должен содержать минимум 20 символов';
						isValid = false;
					} else {
						this.orderService.setAddress(address);
					}

					nextButton!.disabled = !isValid;
				};

				buttons.forEach(btn => {
					btn.addEventListener('click', () => {
						buttons.forEach(b => b.classList.remove('button_alt-active'));
						btn.classList.add('button_alt-active');
						this.orderService.setPayment(btn.name as PaymentMethod);
						validate();
					});
				});

				addressInput?.addEventListener('input', validate);

				nextButton?.addEventListener('click', (e) => {
					e.preventDefault();
					validate();
					if (!nextButton?.disabled) {
						const contactsTemplate = document.getElementById('contacts') as HTMLTemplateElement;
						if (contactsTemplate) {
							const contactsContent = contactsTemplate.content.cloneNode(true) as HTMLElement;
							this.modal.open(contactsContent);

							setTimeout(() => {
								const modalElement = document.querySelector('.modal__content');
								if (!modalElement) return;

								const emailInput = modalElement.querySelector<HTMLInputElement>('input[name="email"]');
								const phoneInput = modalElement.querySelector<HTMLInputElement>('input[name="phone"]');
								const payButton = modalElement.querySelector<HTMLButtonElement>('button[type="submit"]');
								const emailError = modalElement.querySelector('.form__errors_email') as HTMLElement;
								const phoneError = modalElement.querySelector('.form__errors_phone') as HTMLElement;

								const updatePayButton = () => {
									const email = emailInput?.value.trim() || '';
									const phone = phoneInput?.value.trim() || '';

									const isValidEmail = email.includes('@') && email.length >= 15 && email.split('@')[1]?.length >= 7;
									const isValidPhone = /^\+?\d{10,}$/.test(phone);

									emailError.textContent = '';
									phoneError.textContent = '';

									if (!isValidEmail) {
										emailError.textContent = 'Введите email в правильном формате';
									}

									if (!isValidPhone) {
										phoneError.textContent = 'Длина телефона должна быть 10 символов. Используйте только цифры';
									}

									const isFormValid = isValidEmail && isValidPhone;

									if (payButton) payButton.disabled = !isFormValid;

									if (isFormValid) {
										this.orderService.setEmail(email);
										this.orderService.setPhone(phone);
									}
								};

								emailInput?.addEventListener('input', updatePayButton);
								phoneInput?.addEventListener('input', updatePayButton);

								payButton?.addEventListener('click', () => {
									const total = this.lastTotal;
									this.basket.clear();
									this.orderService.reset();
									this.events.emit('basket:changed', { items: [], total: 0 });

									const successTemplate = document.getElementById('success') as HTMLTemplateElement;
									if (successTemplate) {
										const successContent = successTemplate.content.cloneNode(true) as HTMLElement;
										const descriptionEl = successContent.querySelector('.order-success__description');
										if (descriptionEl) {
											descriptionEl.textContent = `Списано ${total} синапсов`;
										}

										this.modal.open(successContent);

										setTimeout(() => {
											const modalElement = document.querySelector('.modal__content');
											const closeBtn = modalElement?.querySelector<HTMLButtonElement>('.order-success__close');
											closeBtn?.addEventListener('click', () => {
												this.modal.close();
												window.scrollTo({ top: 0, behavior: 'smooth' });
											});
										}, 0);
									}
								});
							}, 0);
						}
					}
				});
			}, 0);
		});

		document.querySelector('.header__basket')?.addEventListener('click', () => {
			this.events.emit('basket:open');
		});

		this.events.on('basket:open', () => {
			const items = this.basket.getItems();
			this.lastTotal = items.reduce((sum: number, item) => sum + (item.price ?? 0), 0);
			const modalContent = this.basketView.render(items);

			this.basketView.setOnRemove((id: string) => {
				this.basket.remove(id);
				this.events.emit('basket:open');
			});

			this.basketView.setOnSubmit(() => {
				this.events.emit('order:open');
			});

			this.modal.open(modalContent);
		});
	}
}