import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom';

const CrudRoute = ({
    resource,
    list
}) => {
    return (
        <Switch>
            {list && (
                <Route exact
                    path={`/${resource}`}
                    render={() => (
                        React.createElement(list)
                    )} />
            )}
        </Switch>
    );
};

export default CrudRoute;