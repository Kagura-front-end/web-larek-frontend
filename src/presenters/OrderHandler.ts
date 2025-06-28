import { EventEmitter } from '../components/base/events';
import { ApiService } from '../components/base/ApiService';
import { IApiOrder } from '../types';

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
		this.events.on<IApiOrder>('order:submit', (order) => {
			this.api.post('/order', order)
				.then(() => {
				})
				.catch((error) => {
					console.error('Ошибка при отправке заказа:', error);
				});
		});
	}
}
