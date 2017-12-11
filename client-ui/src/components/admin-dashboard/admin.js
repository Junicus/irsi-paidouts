import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom';
import { DefaultLayout } from './layout/default-layout';
import { Provider } from 'react-redux';
import configureStore from '../../store/configure-store';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';

export const Admin = ({
  dashboard,
  appLayout,
  children
}) => {
  const history = createHistory();
  const store = configureStore(history);

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <Switch>
            <Route path='/'
              render={() => {
                return React.createElement(appLayout || DefaultLayout, {
                  dashboard,
                  children
                });
              }}
            />
          </Switch>
        </div>
      </ConnectedRouter>
    </Provider>
  );
};

Admin.propTypes = {
  appLayout: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string
  ])
};

export default Admin;
