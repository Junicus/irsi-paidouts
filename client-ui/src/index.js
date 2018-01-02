import React from 'react';
import ReactDOM from 'react-dom';
import Admin from './components/admin-dashboard/admin';
import Resource from './components/admin-dashboard/resource/resource';
import registerServiceWorker from './registerServiceWorker';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import * as AuthenticationContext from 'adal-angular';
import { adalConfig } from './adal/adal-config';

import UserProvider from './containers/users/user-provider';

import ListStoresView from './views/ListStoresView';
import ShowStoreView from './views/ShowStoreView';
import CreatePaidOutView from './views/CreatePaidOutView';

import './styles/index.css';
import './styles/semantic/semantic.min.css';

let authContext = new AuthenticationContext(adalConfig);
authContext.handleWindowCallback();

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql'
});

const authLink = setContext((_, { headers }) => {
  let authToken = '';

  authContext.acquireToken('a492c290-a618-4212-9be3-7ef5d1d978f4', (errDes, token, error) => {
    if (token) authToken = token
  });

  return {
    headers: {
      ...headers,
      authorization: authToken ? `Bearer ${authToken}` : null
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

if (!authContext.isCallback(window.location.hash)) {
  if (!authContext.getCachedToken(adalConfig.clientId) || !authContext.getCachedUser()) {
    authContext.login();
  } else {
    ReactDOM.render(
      <ApolloProvider client={client}>
        <UserProvider>
          <Admin dashboard={() => <div>Dashboard</div>}>
            <Resource name='stores' list={ListStoresView} show={ShowStoreView} />
            <Resource name='paidout' create={CreatePaidOutView} />
          </Admin>
        </UserProvider>
      </ApolloProvider>
      , document.getElementById('root'));
    registerServiceWorker();
  }
}
