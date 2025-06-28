import { AppPresenter } from './presenters/AppPresenter';
import { EventEmitter } from './components/base/events';
import { OrderHandler } from './presenters/OrderHandler';
import { ApiService } from './components/base/ApiService';
import './scss/styles.scss';

const events = new EventEmitter();
const app = new AppPresenter(events);
app.init();

const api = new ApiService('https://larek-api.nomoreparties.co/api/weblarek');
const orderHandler = new OrderHandler({
	api: api,
	events: events,
});
orderHandler.init();