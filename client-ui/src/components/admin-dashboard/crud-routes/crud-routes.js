import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom';

const CrudRoute = ({
    resource,
    list,
    show,
    create
}) => {
    return (
        <Switch>
            {list && (
                <Route
                    exact
                    path={`/${resource}`}
                    render={
                        (renderProps) => (
                            React.createElement(list, {
                                ...renderProps
                            }))
                    } />
            )}
            {show && (
                <Route
                    exact
                    path={`/${resource}/:id/show`}
                    render={
                        (renderProps) => (
                            React.createElement(show, {
                                ...renderProps
                            }))
                    } />
            )}
            {create && (
                <Route
                    exact
                    path={`/${resource}/create`}
                    render={
                        (renderProps) => (
                            React.createElement(create, {
                                ...renderProps
                            }))
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