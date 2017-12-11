import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import resources, { getResources as innerGetResources } from './resources';

export const rootReducer = combineReducers({
    resources,
    router: routerReducer
});

export const getResources = state => innerGetResources(state.resources);