import { EventEmitter } from '../components/base/events';
import { IProductItem, UUID } from '../types';
import { IPreviewView } from '../interfaces/IPreviewView';

interface BasketChangedEvent {
	items: UUID[];
	total: number;
}

export class PreviewPresenter {
	constructor(
		private events: EventEmitter,
		private view: IPreviewView,
	) {
	}

	public init(): void {
		this.events.on<IProductItem>('preview:changed', (item) => {
			this.view.render(item);
			this.events.emit('basket:get', { id: item.id });
		});

		this.view.bindAddToCart(
			(id) => {
				this.events.emit('basket:add', { id });
				this.view.updateButtonState(id, true);
			},
			() => {
				this.events.emit('basket:open');
			},
		);

		const container = this.view.getContainer?.();
		if (container) {
			container.addEventListener('click', (event) => {
				const target = event.target as HTMLElement;
				if (target.classList.contains('modal__close')) {
					this.view.close();
				}
			});
		}

		this.events.on<BasketChangedEvent>('basket:changed', (basket) => {
			const currentId = this.view.getCurrentId();
			if (!currentId) return;

			const inBasket = basket.items.includes(currentId);
			this.view.updateButtonState(currentId, inBasket);
		});

		this.events.on<{ id: UUID; inBasket: boolean }>('basket:status', ({ id, inBasket }) => {
			const currentId = this.view.getCurrentId();
			if (currentId === id) {
				this.view.updateButtonState(id, inBasket);
			}
		});
	}
}
