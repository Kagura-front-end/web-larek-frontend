import { Api } from './api';
import {
	IProductItem,
	IProductListResponse,
	IOrder,
	IOrderResponse,
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
