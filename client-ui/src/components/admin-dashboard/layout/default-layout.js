import React from 'react';
import PropTypes from 'prop-types';

import Layout, { Header } from 'antd/lib/layout';

import Sidebar from '../sidebar/sidebar';
import AdminRoutes from '../admin-routes/admin-routes';

import './default-layout.css';

export const DefaultLayout = ({
    dashboard,
    children,
}) => {
    return (
        <Layout style={{ height: '100vh' }}>
            <Header>
                <div className='logo' />
            </Header>
            <Layout>
                <Sidebar dashboard={dashboard} />
                <Layout>
                    <AdminRoutes dashboard={dashboard}>
                        {children}
                    </AdminRoutes>
                </Layout>
            </Layout>
        </Layout >
    )
};

DefaultLayout.propTypes = {
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
}

export default DefaultLayout;