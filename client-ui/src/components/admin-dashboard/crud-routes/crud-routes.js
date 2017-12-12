import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom';

const CrudRoute = ({
    resource,
    list,
    show
}) => {
    return (
        <Switch>
            {list && (
                <Route
                    exact
                    path={`/${resource}`}
                    render={() => (
                        React.createElement(list)
                    )} />
            )}
            {show && (
                <Route
                    exact
                    path={`/${resource}/:id/show`}
                    render={
                        (renderProps) => {
                            return React.createElement(show,
                                {
                                    ...renderProps
                                });
                        }
                    } />
            )}
        </Switch>
    );
};

CrudRoute.propTypes = {
    resource: PropTypes.string.isRequired,
    list: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    show: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
};

export default CrudRoute;