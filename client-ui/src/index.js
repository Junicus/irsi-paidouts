import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createHashHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';
import { configureStore } from './store/configure-store';
import Router from './router/router';
import App from './containers/App';

import './index.css';

const initialState = window.initialReduxState;
const history = createHashHistory();
const store = configureStore(history);
const enhancedHistory = syncHistoryWithStore(history, store);

ReactDOM.render(
    <Provider store={store}>
        <App history={enhancedHistory} store={store} />
    </Provider>, document.getElementById('root'));
registerServiceWorker();
