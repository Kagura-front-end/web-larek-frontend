import { EventEmitter } from '../components/base/events';
import { ApiService } from '../components/base/ApiService';
import { IOrder, IOrderResponse } from '../types';
import { OrderValidator } from '../validators/OrderValidator';

export interface IOrderHandlerConstructor {
  api: ApiService;
  events: EventEmitter;
}

export class OrderHandler {
  constructor(private options: IOrderHandlerConstructor) {}

  public init(): void {
    this.options.events.on<IOrder>('order:submit', async (order) => {
      const errors = OrderValidator.validate(order);

      if (Object.keys(errors).length > 0) {
        this.options.events.emit('formErrors:change', errors);
        return;
      }

      try {
        const result: IOrderResponse = await this.options.api.sendOrder(order);
        this.options.events.emit('order:success', result);
      } catch (error) {
        console.error('Order submit failed:', error);
      }
    });
  }
}
