import debug from 'debug';
import React, { Component } from 'react';
import { Router } from 'react-router';
import routes from './routes';

const dbg = debug('app:router:dev');

export default class extends Component {
    render() {
        dbg('render: props=%o', this.props);
        const { store, history } = this.props;

        return (
            <div>
                <Router history={history}>
                    {routes(store)}
                </Router>
            </div>
        );
    }
}