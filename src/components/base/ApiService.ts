/*
import { Api } from './api';
import {
    IProductItem,
    IProductListResponse,
    IOrder,
    IOrderResponse
} from '../../types';

export class ApiService extends Api {
    public getProductList(): Promise<IProductListResponse> {
        return this.get<IProductListResponse>('/product/');
    }

    public getProductItem(id: string): Promise<IProductItem> {
        return this.get<IProductItem>(`/product/${id}`);
    }

    public sendOrder(order: IOrder): Promise<IOrderResponse> {
        return this.post<IOrderResponse>('/order', order);
    }
}
*/
import mockData from '../../mocks/mock-products.json';
import { IProductItem, IOrder, IOrderResponse } from '../../types';

export class ApiService {
	constructor(private baseUrl: string) {}

	public async getProductList(): Promise<{ items: IProductItem[] }> {
		try {
			const response = await fetch(`${this.baseUrl}/product`);
			if (!response.ok) throw new Error('Network error');
			return await response.json();
		} catch (error) {
			console.warn('⚠️ Ошибка API, используем мок-данные.');
			return { items: mockData.items as IProductItem[] };
		}
	}

	public async sendOrder(order: IOrder): Promise<IOrderResponse> {
		const response = await fetch(`${this.baseUrl}/order`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(order),
		});

		if (!response.ok) {
			throw new Error('Ошибка отправки заказа');
		}

		return await response.json();
	}
}
