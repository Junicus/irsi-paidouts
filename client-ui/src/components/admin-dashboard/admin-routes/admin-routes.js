import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux'
import { declareResources as declareResourcesAction } from '../../../actions/resourceActions';
import compose from 'recompose/compose';
import { Content } from 'antd/lib/layout';
import CrudRoute from '../crud-routes/crud-routes';

class AdminRoutes extends Component {
    componentDidMount() {
        this.initializeResources(this.props.children);
    }

    initializeResources = (children) => {
        if (typeof children === 'function') {

        } else {
            const resources = React.Children.map(children, ({ props }) => props) || [];
            this.props.declareResources(resources);
        }
    }

    render() {
        const { dashboard, resources } = this.props;
        return (
            <Switch>
                <Route path='/'
                    exact
                    render={() => {
                        return React.createElement(dashboard)
                    }}
                />

                {resources.map(resource => (
                    <Route path={`/${resource.name}`}
                        key={resource.name}
                        render={() => (
                            <CrudRoute
                                resource={resource.name}
                                list={resource.list} />
                        )}
                    />
                ))}
            </Switch>
        );
    }
};

AdminRoutes.propTypes = {
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    resources: PropTypes.array
}

const mapStateToProps = (state) => {
    return {
        resources: Object.keys(state.resources).map(
            key => state.resources[key].props
        )
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        declareResources: resources => dispatch(declareResourcesAction(resources))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(AdminRoutes);