
# WebLarek: Документация проекта

## Описание
WebLarek — это одностраничное frontend-приложение интернет-магазина с каталогом товаров, корзиной и пошаговой формой оформления заказа. Приложение реализовано по архитектурному паттерну MVP (Model-View-Presenter) и построено на событийной модели с использованием собственного EventEmitter.

## Структура проекта
```
src/
├── components/       # Общие компоненты
│   ├── base/         # Утилиты, API, евенты
│   └── common/       # Простые UI-компоненты
├── interfaces/       # Интерфейсы (View, Presenter)
├── models/           # Бизнес-логика: BasketService, OrderService
├── presenters/       # Презентеры (App, Catalog, Order, Preview)
├── utils/            # Утилиты и константы
├── views/            # Представления (DOM, HTML)
└── index.ts          # Точка входа
```

## Об архитектуре
Архитектура проекта построена по принципу MVP (Model-View-Presenter) с использованием событийной модели.

**Model (Модели)** — отвечают за хранение состояния приложения и бизнес-логику. Например, `BasketService` управляет содержимым корзины и её синхронизацией, а `OrderService` — полями формы заказа.

**View (Представления)** — работают с DOM и отображают интерфейс. Не содержат бизнес-логики, получают данные от Presenter и инициируют события при действиях пользователя.

**Presenter (Презентеры)** — оркестраторы, координируют работу между Model и View, подписываются на события и обновляют интерфейс или модели. Например, `CatalogPresenter` загружает товары и передаёт их в представление, а `FormFlowPresenter` управляет логикой пошаговой формы заказа.

## Взаимодействие компонентов
- Пользователь инициирует действия (например, нажимает кнопку).
- Представление (View) эмитит событие через EventEmitter.
- Презентер (Presenter) обрабатывает событие, обновляет модель или вызывает метод View.
- Модель (Model), при необходимости, эмитит собственные события (например, `basket:changed`), чтобы уведомить другие части системы.

**Преимущества:**
- Компоненты слабо связаны между собой
- Упрощается тестирование
- Упрощается масштабирование

## Пример взаимодействия
1. Пользователь кликает на карточку товара → `preview:changed`
2. `PreviewPresenter` открывает модалку предпросмотра
3. Кнопка "В корзину" → `basket:add`
4. `BasketService` добавляет товар, эмитит `basket:changed`
5. Клик "Оформить" → открывается форма
6. Завершение формы → `order:submit` → `OrderHandler` отправляет заказ, открывает success

## Событийная система
Все компоненты взаимодействуют через EventEmitter. Ниже — таблица всех событий в проекте:

| Событие        | Кто эмитит           | Кто слушает                     | Что делает                                              |
|----------------|----------------------|---------------------------------|----------------------------------------------------------|
| items:changed  | CatalogPresenter     | BasketService                   | Сохраняет каталог для получения товаров по ID            |
| preview:changed| CatalogView          | PreviewPresenter                | Показывает модалку предпросмотра товара                  |
| basket:add     | PreviewView (кнопка) | BasketService                   | Добавляет товар в корзину                                |
| basket:remove  | BasketView           | BasketService                   | Удаляет товар из корзины                                 |
| basket:get     | PreviewPresenter     | BasketService                   | Проверяет, есть ли товар в корзине                       |
| basket:status  | BasketService        | PreviewPresenter                | Обновляет текст кнопки                                   |
| basket:changed | BasketService        | AppPresenter, BasketView, FormFlow | Обновляет UI и корзину                               |
| order:submit   | FormFlowPresenter    | OrderHandler                    | Отправляет POST-запрос с заказом                         |

##Описание классов в 3 частях - презентеры, views-компоненты, утилиты и остальные классы:
      1) Презентеры:
  CatalogPresenter
  Назначение:
Загружает список товаров из API и инициирует отображение каталога. Обрабатывает клики по карточкам, открывая модальное окно предпросмотра товара.
  Конструктор:
constructor(api: ApiService, events: EventEmitter, view: CatalogView)

  Свойства:
api: ApiService — для получения данных с сервера;
events: EventEmitter — для работы с событиями;
view: CatalogView — отображает карточки товаров.

  Методы:
init() — загружает каталог и эмитит items:changed;
handleItemsChanged(items: IProductItem[]) — обновляет представление;
+ слушает items:changed, эмитит preview:changed при клике.
----------------------------------------
  PreviewPresenter
  Назначение:
Связывает PreviewView и BasketService, управляет логикой предпросмотра товара (добавление в корзину, проверка статуса).
  Конструктор:
constructor(events: EventEmitter, view: IPreviewView)

  Свойства:
events: EventEmitter — обработка событий;
view: IPreviewView — отображение карточки товара в модалке.

  Методы:
init() — подписывается на события:
preview:changed — отображает карточку;
basket:changed, basket:get, basket:status — обновление статуса кнопки.
----------------------------------------
  OrderHandler
  Назначение:
Отправка заказа на сервер.
  Конструктор принимает:
api: ApiService — отправка POST-запроса;
events: EventEmitter — слушает событие order:submit.

  Методы:
подписка на order:submit и вызов api.order(order: IOrder).
----------------------------------------
  FormFlowPresenter
  Назначение:
Управляет пошаговой формой оформления заказа: сначала адрес и способ оплаты, затем email и телефон. Выполняет валидацию и отправку формы.
  Конструктор
constructor(private options: FormFlowPresenterOptions)
  Свойства:
orderService: OrderService — модель, хранящая значения полей формы
orderView: OrderView — View-слой, отвечающий за форму
basketItems: () => IProductItem[] — функция для получения товаров из корзины
getTotal: () => number — функция для получения итоговой суммы
clearBasket: () => void — функция для очистки корзины после оформления
events: EventEmitter — глобальный эмиттер событий
modal: ModalManager — контроллер модальных окон

  Методы:
start(): void — запускает форму, навешивает обработчики
setupFirstStep(): void — шаг 1: проверка адреса и способа оплаты
setupContactsStep(): void — шаг 2: валидация email/телефона, оформление заказа

Эмитит:
order:submit, basket:changed
----------------------------------------
  AppPresenter
  Назначение:
Главный презентер приложения. Инициализирует все компоненты, связывает события, рендерит начальный каталог, контролирует переходы между экранами.
  Конструктор:
constructor(private options: AppPresenterOptions)
  Свойства:
components: содержит экземпляры всех компонентов (presenter/view/service)
events: EventEmitter
modal: ModalManager
  Методы:
init(): void — связывает события, вызывает init() у других презентеров
handleOrderSubmit(order: IOrder): void — отправка заказа
----------------------------------------
  ModalManager
  Назначение:
Открывает/закрывает модальные окна на основе шаблонов.
  Свойства:
modalElement: HTMLElement — DOM-элемент модального окна (корневой контейнер)
modalContentElement: HTMLElement — элемент, куда вставляется содержимое модалки
  Методы:
open(content) — открыть модалку с переданным HTML;
openTemplate(templateId) — открыть по ID шаблона;
close() — закрыть текущее окно;
bindCloseButton(className) — позволяет закрыть модалку по кнопке.
--------------------------------
  BasketService<T>
  Назначение:
Модель для хранения и управления товарами в корзине. Сохраняет данные в localStorage, считает сумму, реагирует на события.
  Конструктор:
constructor(events: EventEmitter)
  Свойства:
basket: string[] — ID товаров в корзине;
catalog: T[] — текущий каталог (загружается при событии items:changed).
  Методы:
init() — подписка на события;
add(id: string) — добавить товар;
remove(id: string) — удалить товар;
getItems() — возвращает IProductItem[];
clear() — очистить корзину;
calculateTotal() — сумма в корзине;
has(id: string) — есть ли товар в корзине.
-------------------------------------
    2)View-компоненты
  CatalogView
  Назначение:
Отображает список товаров (карточки) в DOM-каталоге.
  Конструктор:
containerSelector: string — CSS-селектор контейнера;
events: EventEmitter — глобальный эмиттер, на который навешиваются события.
  Свойства:
container: HTMLElement — DOM-элемент, в который добавляются карточки товаров
events: EventEmitter — глобальный эмиттер событий
template: HTMLTemplateElement — шаблон карточки товара (находится по id card-catalog)
  Методы:
render(items: IProductItem[]) — создаёт карточки, навешивает обработчик на каждую, эмитит preview:changed при клике.
-------------------------------------
  PreviewView
  Назначение:
Представление модального окна предпросмотра товара с кнопкой "В корзину" / "Купить".
  Конструктор:
templateSelector: string — шаблон карточки;
containerSelector: string — контейнер в модальном окне.
  Свойства:
template: HTMLTemplateElement — шаблон карточки товара, извлекается по переданному templateSelector
container: HTMLElement — DOM-контейнер, в который вставляется карточка
currentId: string | null — id текущего отображаемого товара (нужен для проверки наличия в корзине)
buttonEl: HTMLButtonElement — кнопка "Купить"/"В корзину" (определяется при рендере)
cardElement: HTMLElement — DOM-элемент карточки товара в модалке
  Методы:
render(data: IProductItem) — отображает карточку товара в модалке;
close() — закрывает модалку;
bindAddToCart(handler, openBasketCallback) — обработка клика на кнопку;
updateButtonState(id, inBasket) — обновляет текст кнопки;
getCurrentId() — возвращает текущий id;
getContainer() — возвращает DOM-элемент.
-------------------------------------
  BasketView
  Назначение:
Отображает содержимое корзины в модалке, позволяет удалять товары, оформить заказ.
  constructor(templateSelector: string, containerSelector: string, counterSelector: string)
  Свойства:
template: HTMLTemplateElement — шаблон карточки товара в корзине
container: HTMLElement — контейнер, в который рендерятся элементы корзины
counterElement: HTMLElement — DOM-элемент счётчика товаров в шапке
submitButton: HTMLButtonElement — кнопка "Оформить заказ" в модалке (определяется при рендере)
listElement: HTMLElement — контейнер внутри модалки, куда вставляются карточки товаров (например, .basket__list)
  Методы:
render(items: IProductItem[]) — рендер списка товаров в корзине;
setOnRemove(handler) — обработчик удаления;
setOnSubmit(handler) — обработчик нажатия на «Оформить»;
updateCounter(count) — обновление счётчика корзины в шапке.
-------------------------------------
  OrderView
  Назначение:
Представление первого шага формы заказа (адрес и способ оплаты).
  Конструктор:
container: HTMLElement — DOM-элемент модального окна.
  Свойства:
container: HTMLElement — контейнер формы (обычно .modal__content, передаётся снаружи)
formElement: HTMLFormElement — элемент формы (находится внутри container)
addressInput: HTMLInputElement — поле ввода адреса
paymentInputs: NodeListOf<HTMLInputElement> — список radio-кнопок способов оплаты
submitButton: HTMLButtonElement — кнопка "Далее"
errorContainer: HTMLElement — блок для отображения ошибок валидации
  Методы:
render() — возвращает DOM формы;
setOnSubmit(callback) — навешивает обработчик на <form> (submit).
-------------------------------------
  ProductCard
  Назначение:
Создаёт и возвращает DOM-элемент карточки товара на основе шаблона #card-catalog. Применяется в CatalogView для рендера товаров каталога.
  Конструктор:
constructor(private item: IProductItem)
  Свойства:
item: IProductItem — объект с данными товара:
id: string
title: string
description: string
image: string
category: string
price?: number
  Методы:
render(): HTMLElement — клонирует шаблон карточки, заполняет его данными из item, применяет стили по категории, возвращает готовый DOM-элемент;
private updateCategoryClass(element: HTMLElement, category: string): void — очищает старые классы категории и добавляет нужный в соответствии с categoryMapping.
-------------------------------------
    3)Другие компоненты:
IPreviewView, IView<T>
Определения интерфейсов см. в секции "Типы и интерфейсы" ниже
-------------------------------------
  ApiService
  Назначение:
Работает с внешним API: получает список товаров (GET), отправляет заказы (POST). Используется CatalogPresenter и OrderHandler.
  Конструктор:
constructor(baseUrl: string)
  Свойства:
baseUrl: string — сохраняется при инициализации, используется во всех HTTP-запросах как префикс.
  Методы:
get<T>(uri: string): Promise<T>;
post<T, R>(uri: string, data?: T): Promise<R>;
getProductList(): Promise<IProductItem[]>;
order(data: IOrder): Promise<void>;
get<T>(uri) — универсальный GET-запрос
post<T, R>(uri, data) — универсальный POST-запрос
getProductList() — получить список товаров
order(data) — отправить заказ
-------------------------------------
  OrderService
  Назначение:
Модель хранения данных заказа (формы). Не отображает UI.
  Свойства:
private email: string — адрес электронной почты покупателя
private phone: string — номер телефона покупателя
private address: string — адрес доставки
private payment: PaymentMethod — способ оплаты ('card' или 'cash')
  Методы:
setEmail(), getEmail() — email покупателя;
setPhone(), getPhone() — номер телефона;
setAddress(), getAddress() — адрес доставки;
setPayment(), getPayment() — способ оплаты;
reset() — очищает все поля.
-------------------------------------
  Events.ts содержит интерфейс IAppEvents — набор всех событий приложения с их типами данных. Используется для типизации EventEmitter.
  Пример:
interface IAppEvents {
'basket:add': string;
'basket:remove': string;
'basket:changed': { items: IProductItem[]; total: number };
...
}
-------------------------------------
  constants.ts содержит константы, используемые по всему проекту: селекторы DOM, ключи хранилища, базовые настройки.
-------------------------------------
  utils.ts
Хелперы/утилиты. Например: setImage, createElement, formatPrice, debounce.
  Список методов и краткое описание:
function setImage(el: HTMLImageElement, src: string, alt: string): void
Утилита для установки изображения с проверкой на ошибки загрузки.
--------------------------------------
  index.ts
  Назначение:
Точка входа. Создаёт все компоненты, связывает их и запускает приложение (app.init()).
В index.ts создаются все сервисы, представления, презентеры и запускается приложение. Основная точка входа: связывает EventEmitter, ApiService, компоненты UI и стартует AppPresenter.
--------------------------------------
  types/index.ts
  Назначение:
Содержит типы, используемые по всему проекту: IProductItem, IOrder, UUID, PaymentMethod, ModalType.
Все типы проекта собраны в types/index.ts для единообразия и переиспользования.
----------------------------------------------------------------------------------------------------------
  ##Типы и интерфейсы
IView
export interface IView<T> {
render(data: T): HTMLElement;
}

Базовый интерфейс всех View.

IPreviewView
export interface IPreviewView extends IView<IProductItem> {
close(): void;
bindAddToCart(handler: () => void, openBasket: () => void): void;
updateButtonState(id: string, inBasket: boolean): void;
getCurrentId(): string | null;
getContainer(): HTMLElement;
}

Контракт представления предпросмотра товара.

IAppEvents
interface IAppEvents {
'basket:add': string;
'basket:remove': string;
'basket:changed': { items: IProductItem[]; total: number };
...
}

Интерфейс всех событий приложения и их payload'ов. Используется в EventEmitter.

IProductItem
interface IProductItem {
id: UUID;
title: string;
description: string;
image: string;
category: string;
price?: number;
}

IOrder
interface IOrder {
email: string;
phone: string;
address: string;
payment: PaymentMethod;
items: IProductItem[];
total: number;
}

PaymentMethod
type PaymentMethod = 'card' | 'cash';
ModalType
type ModalType = 'preview' | 'basket' | 'order' | 'contacts' | 'success';
UUID
type UUID = string;

----------------------------------------------------------------------------------------------------------

  ##Заключение

Архитектура проекта основана на паттерне MVP: представления отображают интерфейс и инициируют события, презентеры обрабатывают эти события и координируют взаимодействие между представлениями и моделями, а модели управляют состоянием и также могут эмитить события. Всё взаимодействие компонентов построено на событийном флоу (event-based flow) через централизованный EventEmitter, что обеспечивает слабую связанность и упрощает масштабирование.
