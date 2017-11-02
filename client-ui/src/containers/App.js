import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser, logoutUser, checkLoginStatus } from '../actions/loginActions';
import Router from '../router/router';

class App extends Component {
    componentWillMount() {
        this.props.checkLoginStatus();
    }

    onLogin = (e) => {
        this.props.login(e);
    }

    onLogout = (e) => {
        this.props.logout(e);
    }

    render() {
        const { username, isLoginSuccess, history, store } = this.props;
        let welcomeMessage = null;
        if (username !== null) {
            welcomeMessage = 'Welcome ' + username;
        }

        return (
            <div>
                <div>
                    {isLoginSuccess && <button onClick={this.onLogout}>Logout</button>}
                </div>
                <div>
                    {welcomeMessage}
                </div>
                <Router history={history} store={store} />
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        username: state.loginReducer.username,
        isLoginSuccess: state.loginReducer.isLoginSuccess
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (e) => {
            e.preventDefault();
            dispatch(loginUser());
        },
        logout: (e) => {
            e.preventDefault();
            dispatch(logoutUser());
        },
        checkLoginStatus: () => {
            dispatch(checkLoginStatus())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);