export interface IView<T> {
  render(data: T): void;
  close?(): void;
  bindAddToCart?(handler: (id: string) => void): void;
}
