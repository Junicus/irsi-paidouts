import AuthenticationContext from 'adal-angular';

const adalConfig = {
    tenant: 'agironirsipr.onmicrosoft.com',
    clientId: 'b455221f-3cb2-40c9-bce8-e4e83a1e2841',
    extraQueryParameter: 'nux=1',
    endpoints: {
        '/api/': 'api://b455221f-3cb2-40c9-bce8-e4e83a1e2841/access_as_user'
    },
    redirectUri: 'http://localhost:3000/auth',
    cacheLocation: 'sessionStorage',
    popUp: false
};

export const authContext = new AuthenticationContext(adalConfig);

const isCallback = authContext.isCallback(window.location.hash);
authContext.handleWindowCallback();

if (isCallback && !authContext.getLoginError()) {
    window.location = authContext._getItem(authContext.CONSTANTS.STORAGE.LOGIN_REQUEST);
}

export default adalConfig;