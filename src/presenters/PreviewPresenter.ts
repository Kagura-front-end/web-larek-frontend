import { EventEmitter } from '../components/base/events';
import { IProductItem } from '../types';
import { IView } from '../interfaces/IView';

export class PreviewPresenter {
  constructor(
    private events: EventEmitter,
    private view: IView<IProductItem>
  ) {}

  public init(): void {
    this.events.on<IProductItem>('preview:changed', (item) => {
      this.view.render(item);
    });
  }
}