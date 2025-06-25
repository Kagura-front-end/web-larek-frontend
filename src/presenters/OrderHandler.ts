import { EventEmitter } from '../components/base/events';
import { ApiService } from '../components/base/ApiService';
import { IOrder, IOrderResponse } from '../types';

export interface IOrderHandlerConstructor {
  api: ApiService;
  events: EventEmitter;
}

export class OrderHandler {
  constructor(private options: IOrderHandlerConstructor) {}

  public init(): void {
    this.options.events.on<IOrder>('order:submit', async (order) => {
      try {
        const result: IOrderResponse = await this.options.api.sendOrder(order);
        this.options.events.emit('order:success', result);
      } catch (error) {
        console.error('Order submit failed:', error);
      }
    });
  }
}
