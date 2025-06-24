import { IView } from './IView';
import { IProductItem, UUID } from '../types';

export interface IPreviewView extends IView<IProductItem> {
  close(): void;

  bindAddToCart(options: {
    onAdd: (id: string) => void;
    onBuy: () => void;
  }): void;

  updateButtonState(id: UUID, inBasket: boolean): void;
  getCurrentId(): UUID | null;
}
