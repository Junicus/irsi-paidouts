import debug from 'debug';
import React, { Component } from 'react'
import PropTypes from 'prop-types'

const dbg = debug('app:components:home');

export default class Home extends Component {
    render() {
        dbg('render: props=%o', this.props);

        return (
            <div>Home</div>
        );
    }
}