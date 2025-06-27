import { EventEmitter } from '../components/base/events';
import { ApiService } from '../components/base/ApiService';
import { IOrder } from '../types';

interface OrderHandlerOptions {
	api: ApiService;
	events: EventEmitter;
}

export class OrderHandler {
	private api: ApiService;
	private events: EventEmitter;

	constructor(options: OrderHandlerOptions) {
		this.api = options.api;
		this.events = options.events;
	}

	public init(): void {
		this.events.on<IOrder>('order:submit', (order) => {
			this.api.post('/order', order)
				.then(() => {
					console.log('Заказ успешно отправлен');
				})
				.catch((error) => {
					console.error('Ошибка при отправке заказа:', error);
					this.events.emit('order:error', { message: 'Не удалось оформить заказ. Попробуйте позже.' });
				});
		});
	}
}
