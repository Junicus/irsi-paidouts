import { authContext } from '../adal/adalConfig';
let user = authContext.getCachedUser();
let username = undefined;
let email = undefined;
let userToken = null;

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';

const loginRequest = () => ({
    type: LOGIN_REQUEST
});

const loginSuccess = (username, email, token) => ({
    type: LOGIN_SUCCESS,
    username,
    email,
    token
});

const loginError = (loginError) => ({
    type: LOGIN_ERROR,
    loginError
});

const logoutRequest = () => ({
    type: LOGOUT_REQUEST
});

export const checkLoginStatus = () => {
    return (dispatch) => {
        dispatch(loginRequest());
        if (user) {
            username = user.profile.name;
            email = user.profile.unique_name;

            authContext.acquireToken(authContext.config.clientId, (error, token) => {
                if (error) {
                    console.log('ADAL error occurred: ' + error);
                    dispatch(loginError(error));
                    return;
                }

                if (!token) {
                    console.log('no token!');
                    return;
                }

                userToken = token;
            });

            dispatch(loginSuccess(username, email, userToken));
        } else {
            loginUser();
        }
    };
}

export const loginUser = () => {
    authContext.login();
}

export const logoutUser = () => {
    return (dispatch) => {
        dispatch(logoutRequest());
        authContext.logOut();
    }
}