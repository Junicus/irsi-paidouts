import React, { Component } from 'react'

export default class Auth extends Component {
    componentDidMount() {
        window.authContext.handleWindowCallback();
    }

    render() {
        return (<div></div>);
    }
}