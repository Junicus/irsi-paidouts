import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_REQUEST } from '../actions/loginActions';

const loginReducer = (state = {
    isLoginPending: false,
    isLoginSuccess: false,
    loginError: null,
    username: null,
    email: null,
    token: null
}, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoginPending: true
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoginPending: false,
                isLoginSuccess: true,
                username: action.username,
                email: action.email,
                token: action.token
            };
        case LOGIN_ERROR:
            return {
                isLoginPending: false,
                isLoginSuccess: false,
                loginError: action.loginError,
                username: null,
                email: null,
                token: null
            };
        case LOGOUT_REQUEST:
            return {
                isLoginPending: false,
                isLoginSuccess: false,
                loginError: null,
                username: null,
                email: null,
                token: null
            }
        default:
            return state;
    }
}

export default loginReducer;