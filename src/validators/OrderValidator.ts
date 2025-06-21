import { IOrder, FormErrors } from '../types';

export class OrderValidator {
  static validate(order: IOrder): FormErrors {
    const errors: FormErrors = {};

    if (!order.address?.trim()) errors.address = 'Введите адрес';
    if (!order.email?.includes('@')) errors.email = 'Некорректный email';
    if (!order.phone?.match(/^\\+?\\d{10,15}$/)) errors.phone = 'Некорректный номер';
    if (!order.payment) errors.payment = 'Выберите способ оплаты';

    return errors;
  }
}
