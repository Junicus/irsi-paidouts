import React, { Component } from 'react';

export default class Layout extends Component {
    render() {
        return (
            <div>
                Layout
                <div>{this.props.children}</div>
            </div>
        )
    }
}