import { AppPresenter } from './presenters/AppPresenter';
import { EventEmitter } from './components/base/events';

import './scss/styles.scss'; // подключение стилей

const events = new EventEmitter();
const app = new AppPresenter(events);
app.init();
