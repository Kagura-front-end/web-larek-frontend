import { EventEmitter } from '../components/base/events';
import { Api } from '../components/base/api';
import { IOrder } from '../types';

export class OrderPresenter {
  private api = new Api(process.env.API_ORIGIN + '/api/weblarek');

  constructor(private events: EventEmitter) {}

  init() {
    this.events.on<IOrder>('order:submit', (order) => {
      this.api.post('/order', order)
        .then((response) => this.events.emit('order:success', response))
        .catch((err) => console.error(err));
    });
  }
}
