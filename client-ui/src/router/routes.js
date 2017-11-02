import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from '../layout';
import Home from '../components/home/home';
import Auth from '../components/auth/auth';

export default (store) => (
    <Switch>
        <Route path='/' component={Home} />
        <Route path='/auth' component={Auth} />
    </Switch>
);

if (module.hot) {
    module.hot.accept();
}