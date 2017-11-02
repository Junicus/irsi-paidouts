import debug from 'debug';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger';
import promiseMiddleware from 'redux-promise';
import { rootReducer } from '../reducers';
import DevTools from '../components/dev-tools/dev-tools';

const dbg = debug('app:store:dev');

export const configureStore = (history) => {
    dbg('root-reducer=%o', rootReducer);

    const initialState = {
    }

    const enhancers = [];
    const middleware = [
        thunkMiddleware,
        promiseMiddleware
    ];

    if (process.env.NODE_ENV === 'development') {
        const loggerMiddleware = createLogger({ collapsed: true });
        const devTools = DevTools.instrument();
        const devToolsExtension = (window.devToolsExtension) ? window.devToolsExtension() : f => f;
        middleware.push(loggerMiddleware);
        enhancers.push(devToolsExtension);
    }

    const composedEnhancers = compose(
        applyMiddleware(...middleware),
        ...enhancers
    );

    const store = createStore(rootReducer, initialState, composedEnhancers);

    return store;
}