import { EventEmitter } from '../components/base/events';
import { IProductItem } from '../types';
import { IView } from '../interfaces/IView';

interface IPreviewView extends IView<IProductItem> {
  close(): void;
}

export class PreviewPresenter {
  constructor(
    private events: EventEmitter,
    private view: IPreviewView
  ) {}

  public init(): void {
    this.events.on<IProductItem>('preview:changed', (item) => {
      this.view.render(item);
    });

    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('modal__close')) {
        this.view.close();
      }
    });
  }
}
