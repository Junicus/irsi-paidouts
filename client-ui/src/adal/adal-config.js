const endpoints = {
    'http://localhost:3001/graphql': 'api://14e855f1-8f9d-40e1-9601-c4cbc3610a56'
}

export const adalConfig = {
    clientId: process.env.REACT_APP_AZURE_CLIENT_ID,
    extraQueryParameters: 'nux=1&scope=api://14e855f1-8f9d-40e1-9601-c4cbc3610a56/access_as_user',
    redirectUri: 'http://localhost:3000/auth',
    disableRenewal: false,
    endpoints: endpoints,
    cacheLocation: 'localStorage'
};
