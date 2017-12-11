import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { rootReducer } from '../reducers';
import { routerMiddleware as getRouterMiddleware } from 'react-router-redux';

export const configureStore = (history) => {
    const initialState = {};
    const enhancers = [];
    const middleware = [
        thunkMiddleware,
        getRouterMiddleware(history)
    ];

    if (process.env.NODE_ENV === 'development') {
        const loggerMiddleware = createLogger();
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
};

export default configureStore;