import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Sider } from 'antd/lib/layout';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import { getResources } from '../../../reducers/resources';
import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import inflection from 'inflection';

const Sidebar = ({
    dashboard,
    resources
 }) => {
    const transformResourceName = (name) => {
        return inflection.transform(name, ['humanize', 'capitalize', 'pluralize']);
    }

    const menuItems = resources.map((resource) => {
        return (
            <Menu.Item key={resource.name}>
                <Link to={`/${resource.name}`} >
                    <Icon type={resource.icon ? resource.icon : 'bars'} />
                    <span>{transformResourceName(resource.name)}</span>
                </Link>
            </Menu.Item>
        );
    });

    return (
        <Sider>
            <Menu theme='dark'>
                {
                    dashboard &&
                    <Menu.Item key='dashboard'>
                        <Link to='/'>
                            <Icon type='pie-chart' />
                            <span>Dashboard</span>
                        </Link>
                    </Menu.Item>
                }
                {menuItems}
            </Menu>
        </Sider>
    );
};

Sidebar.propTypes = {
    resources: PropTypes.array
}

const mapStateToProps = (state) => {
    return {
        resources: getResources(state.resources)
    };
}

export default connect(mapStateToProps)(Sidebar);