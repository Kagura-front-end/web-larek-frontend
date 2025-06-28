import { AppPresenter } from './presenters/AppPresenter';
import { EventEmitter } from './components/base/events';

import './scss/styles.scss';

const events = new EventEmitter();
const app = new AppPresenter(events);
app.init();

