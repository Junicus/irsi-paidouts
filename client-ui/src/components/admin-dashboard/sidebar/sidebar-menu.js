import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getResources } from '../../../reducers/resources';
import { Link } from 'react-router-dom';
import inflection from 'inflection';

const SidebarMenu = ({
    dashboard,
    resources
 }) => {
    const transformResourceName = (name) => {
        return inflection.transform(name, ['humanize', 'capitalize', 'pluralize']);
    }

    const menuItems = resources.map((resource) => {
        if (resource.list) {
            return (
                <Menu.Item key={resource.name}>
                    <Link to={`/${resource.name}`} >
                        <Icon name={resource.icon ? resource.icon : 'list'} />
                        <span>{transformResourceName(resource.name)}</span>
                    </Link>
                </Menu.Item>
            );
        } else {
            return null;
        }
    }).filter((menuItem) => menuItem);

    return (
        <div>
            {
                dashboard &&
                <Menu.Item key='dashboard'>
                    <Link to='/'>
                        <Icon name='dashboard' />
                        <span>Dashboard</span>
                    </Link>
                </Menu.Item>
            }
            {menuItems}
        </div>
    );
};

SidebarMenu.propTypes = {
    resources: PropTypes.array
}

const mapStateToProps = (state) => {
    return {
        resources: getResources(state.resources)
    };
}

export default connect(mapStateToProps)(SidebarMenu);