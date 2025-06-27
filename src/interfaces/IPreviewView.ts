import { IView } from './IView';
import { IProductItem, UUID } from '../types';

export interface IPreviewView extends IView<IProductItem> {
	close(): void;

	bindAddToCart(
		handler: (id: UUID) => void,
		openBasketCallback: () => void,
	): void;

	updateButtonState(id: UUID, inBasket: boolean): void;

	getCurrentId(): UUID | null;
}

export interface IPreviewView {
	render(data: IProductItem): void;

	close(): void;

	bindAddToCart(handler: (id: string) => void, openBasket: () => void): void;

	updateButtonState(id: string, inBasket: boolean): void;

	getCurrentId(): string | null;

	getContainer?(): HTMLElement;
}