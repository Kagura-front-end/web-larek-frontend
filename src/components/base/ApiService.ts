import { Api } from './api';
import {
	IProductListResponse,
	IOrder,
	IOrderResponse,
} from '../../types';

export class ApiService extends Api {
	public getProductList(): Promise<IProductListResponse> {
		return this.get<IProductListResponse>('/product/');
	}

	public sendOrder(order: IOrder): Promise<IOrderResponse> {
		return this.post<IOrderResponse>('/order', order);
	}
}
