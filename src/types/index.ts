export type UUID = string;
export type Price = number | null;
export type Category = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил';

export interface IProductItem {
	id: UUID;
	description: string;
	image: string;
	title: string;
	category: Category;
	price: Price;
}

export interface IProductListResponse {
	total: number;
	items: IProductItem[];
}

export interface IAppState {
	catalog: IProductItem[];
	basket: UUID[];  // список id товаров
	order: IOrder | null;
}

export type PaymentMethod = 'online' | 'offline';

export interface IOrderForm {
	payment: PaymentMethod;
	address: string;
	email: string;
	phone: string;
}

export interface IOrder extends IOrderForm {
	items: UUID[];
	total: number;
}

export interface IOrderResponse {
	id: UUID;
	total: number;
}

export type SelectorElement<T extends Element = HTMLElement> = string | T;

export type FormErrors = Partial<Record<keyof IOrder, string>>;

export interface IAppEvents {
	'items:changed': IProductItem[];
	'basket:changed': { items: UUID[]; total: number };
	'preview:changed': IProductItem;
	'order:ready': IOrder;
	'order:submit': void;
	'order:success': IOrderResponse;
	'formErrors:change': FormErrors;
	'contacts:submit': void;
	'payment:change': PaymentMethod;
}

export type ModalType = 'preview' | 'basket' | 'order' | 'contacts' | 'success';

export type ApiResponse<T> = {
	success: boolean;
	data?: T;
	error?: string;
};

export type CategoryMapping = {
	[key in Category]: string;
};

export const categoryMapping: CategoryMapping = {
	'софт-скил': 'soft',
	'другое': 'other',
	'дополнительное': 'additional',
	'кнопка': 'button',
	'хард-скил': 'hard'
};

