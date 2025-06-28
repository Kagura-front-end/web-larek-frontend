import { OrderService } from '../models/OrderService';
import { OrderView } from '../views/OrderView';
import { EventEmitter } from '../components/base/events';
import { ModalManager } from './ModalManager';
import { IProductItem, PaymentMethod, IApiOrder } from '../types';

interface FormFlowPresenterOptions {
	orderService: OrderService;
	orderView: OrderView;
	basketItems: () => IProductItem[];
	getTotal: () => number;
	clearBasket: () => void;
	events: EventEmitter;
	modal: ModalManager;
}

export class FormFlowPresenter {
	constructor(private options: FormFlowPresenterOptions) {
	}

	public start(): void {
		const { orderView, modal } = this.options;
		const content = orderView.render();
		modal.open(content);

		setTimeout(() => {
			this.setupFirstStep();
		}, 0);
	}

	private setupFirstStep(): void {
		const modalElement = document.querySelector('.modal__content');
		if (!modalElement) return;

		const buttons = modalElement.querySelectorAll<HTMLButtonElement>('.order__buttons .button');
		const addressInput = modalElement.querySelector<HTMLInputElement>('input[name="address"]');
		const nextButton = modalElement.querySelector<HTMLButtonElement>('.order__button');
		const paymentErrorContainer = modalElement.querySelector('.form__errors_payment') as HTMLElement;
		const addressErrorContainer = modalElement.querySelector('.form__errors_address') as HTMLElement;

		const validate = () => {
			let isValid = true;
			const payment = this.options.orderService.getPayment();
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
				this.options.orderService.setAddress(address);
			}

			nextButton!.disabled = !isValid;
		};

		buttons.forEach(btn => {
			btn.addEventListener('click', () => {
				buttons.forEach(b => b.classList.remove('button_alt-active'));
				btn.classList.add('button_alt-active');
				this.options.orderService.setPayment(btn.name as PaymentMethod);
				validate();
			});
		});

		addressInput?.addEventListener('input', validate);

		nextButton?.addEventListener('click', (e) => {
			e.preventDefault();
			validate();
			if (!nextButton?.disabled) {
				this.setupContactsStep();
			}
		});
	}

	private setupContactsStep(): void {
		this.options.modal.openTemplate('contacts');

		setTimeout(() => {
			const modalElement = document.querySelector('.modal__content');
			if (!modalElement) return;

			const emailInput = modalElement.querySelector<HTMLInputElement>('input[name="email"]');
			const phoneInput = modalElement.querySelector<HTMLInputElement>('input[name="phone"]');
			const payButton = modalElement.querySelector<HTMLButtonElement>('button[type="submit"]');
			const emailError = modalElement.querySelector('.form__errors_email') as HTMLElement;
			const phoneError = modalElement.querySelector('.form__errors_phone') as HTMLElement;

			if (!emailInput || !phoneInput || !payButton || !emailError || !phoneError) return;

			const updatePayButton = () => {
				const email = emailInput.value.trim();
				const phone = phoneInput.value.trim();

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
				payButton.disabled = !isFormValid;

				if (isFormValid) {
					this.options.orderService.setEmail(email);
					this.options.orderService.setPhone(phone);
				}
			};

			emailInput.addEventListener('input', updatePayButton);
			phoneInput.addEventListener('input', updatePayButton);

			const form = modalElement.querySelector<HTMLFormElement>('form');
			form?.addEventListener('submit', (e) => {
				e.preventDefault();

				const order = this.buildOrder();
				this.options.events.emit('order:submit', order);

				const total = this.options.getTotal();
				this.options.clearBasket();
				this.options.orderService.reset();

				this.options.events.emit('basket:changed', { items: [], total });
				this.options.modal.openTemplate('success');

				setTimeout(() => {
					const modalEl = document.querySelector('.modal__content');
					const descriptionEl = modalEl?.querySelector('.order-success__description');
					const closeBtn = modalEl?.querySelector<HTMLButtonElement>('.order-success__close');

					if (descriptionEl) descriptionEl.textContent = `Списано ${total} синапсов`;

					closeBtn?.addEventListener('click', () => {
						this.options.modal.close();
						window.scrollTo({ top: 0, behavior: 'smooth' });
					});
				}, 0);
			});
		}, 0);
	}

	private buildOrder(): IApiOrder {
		return {
			address: this.options.orderService.getAddress(),
			email: this.options.orderService.getEmail(),
			phone: this.options.orderService.getPhone(),
			payment: this.options.orderService.getPayment() as PaymentMethod,
			items: this.options.basketItems().map((item: IProductItem) => item.id),
			total: this.options.getTotal(),
		};
	}
}