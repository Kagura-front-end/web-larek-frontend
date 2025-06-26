import { EventEmitter } from '../components/base/events';
import { UUID, IProductItem } from '../types';

interface BasketChangedPayload {
	items: IProductItem[];
	total: number;
}

export class BasketService {
	private basket: UUID[] = [];
	private catalog: IProductItem[] = [];

	constructor(private events: EventEmitter) {
	}

	public init(): void {
		this.loadFromStorage();

		this.events.on<{ id: UUID }>('basket:add', ({ id }) => this.add(id));
		this.events.on<{ id: UUID }>('basket:remove', ({ id }) => this.remove(id));
		this.events.on<IProductItem[]>('items:changed', (items) => {
			this.catalog = items;
			this.emitBasketChanged();
		});
		this.events.on<{ id: UUID }>('basket:get', ({ id }) => {
			const inBasket = this.basket.includes(id);
			this.events.emit('basket:status', { id, inBasket });
		});
	}

	private loadFromStorage(): void {
		const data = localStorage.getItem('basket');
		if (data) {
			try {
				const parsed = JSON.parse(data);
				if (Array.isArray(parsed)) {
					this.basket = parsed;
				}
			} catch (e) {
				console.warn('Failed to parse basket from storage', e);
			}
		}
	}

	private saveToStorage(): void {
		localStorage.setItem('basket', JSON.stringify(this.basket));
	}

	private emitBasketChanged(): void {
		const items = this.getItems();
		const total = items.reduce((sum, item) => sum + (item.price ?? 0), 0);

		const payload: BasketChangedPayload = {
			items,
			total,
		};

		this.events.emit('basket:changed', payload);
	}

	private add(id: UUID): void {
		if (!this.basket.includes(id)) {
			this.basket.push(id);
			this.saveToStorage();
			this.emitBasketChanged();
		}
	}

	public remove(id: UUID): void {
		this.basket = this.basket.filter(itemId => itemId !== id);
		this.saveToStorage();
		this.emitBasketChanged();
	}

	public getItems(): IProductItem[] {
		return this.catalog.filter(product => this.basket.includes(product.id));
	}

	public clear(): void {
		this.basket = [];
		this.saveToStorage();
		this.emitBasketChanged();
	}
}
