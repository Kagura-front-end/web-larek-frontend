📦 WebLarek — онлайн-магазин цифровых товаров
Стек: HTML, SCSS, TypeScript, Webpack
Архитектура: MVP (Model–View–Presenter)

🔧 Установка и запуск

npm install
npm run start


src/
├── components/        # Общие компоненты (Modal, EventEmitter и др.)
│   └── base/          # Базовые абстракции (ApiService, events)
├── models/            # OrderService и другие бизнес-модели
├── presenters/        # Презентеры (AppPresenter, CatalogPresenter, BasketService и др.)
├── styles/            # SCSS-стили
├── utils/             # Утилиты (getImageUrl и др.)
├── views/             # View-компоненты (CatalogView, BasketView, PreviewView и др.)
├── types.ts           # Глобальные типы приложения
└── index.ts           # Точка входа в приложение


🧩 Архитектура
Проект следует принципам MVP (Model–View–Presenter), но логика управления шагами заказа и валидации форм пока что остаётся централизованной внутри AppPresenter.ts.

Model: OrderService, типы заказа, структура корзины.

View: Компоненты визуализации (CatalogView, PreviewView, BasketView).

Presenter: AppPresenter, CatalogPresenter, OrderHandler.

⛔ Валидация форм не вынесена в отдельные презентеры, а реализована напрямую внутри AppPresenter.ts.

📄 Формы и валидация
Шаги формы заказа:
Order: Выбор способа оплаты, ввод адреса.

Contacts: Ввод email и телефона.

Success: Завершение и отображение итоговой суммы.

Валидация:
Реализована через функции validateOrderForm() и validateContactsForm() внутри AppPresenter.

Адрес: не менее 20 символов, без двойных пробелов.

Email: минимум 15 символов, должен содержать @, а после @ — минимум 7 символов.

Телефон: только цифры и +, минимум 10 символов.

📚 Типы данных (types.ts)
IProductItem — товар

IBasketItem — товар в корзине

IOrder — структура заказа

PaymentMethod — 'online' | 'cash'

🧠 Компоненты и роли
AppPresenter.ts
Главный координатор.

Управляет открытием корзины, предпросмотра, заказом.

Обрабатывает шаги формы (Order → Contacts → Success).

Содержит всю валидацию (вручную).

Слушает и испускает события через EventEmitter.

CatalogPresenter.ts
Получает товары с API и передаёт в CatalogView.

PreviewPresenter.ts
Управляет предпросмотром товара.

Обновляет кнопку товара в зависимости от наличия в корзине.

BasketService.ts
Хранит и управляет списком товаров в корзине.

Считает итоговую сумму.

OrderHandler.ts
Обрабатывает отправку заказа на сервер через ApiService.

🔁 Взаимодействие компонентов

CatalogPresenter → CatalogView → [click] → EventEmitter → PreviewPresenter → PreviewView
BasketService ⇄ BasketView
AppPresenter ↔ Modal → OrderView / Contacts form / Success
🧠 Паттерны
MVP — Model (данные), View (отображение), Presenter (логика)

Event Bus — EventEmitter используется для связи между модулями

View и Model не знают друг о друге напрямую





