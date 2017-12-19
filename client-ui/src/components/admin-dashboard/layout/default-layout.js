import React from 'react';
import PropTypes from 'prop-types';

import {
  Menu,
  Item,
  Header,
  Container,
  Sidebar
} from 'semantic-ui-react';

import SidebarMenu from '../sidebar/sidebar-menu';
import AdminRoutes from '../admin-routes/admin-routes';

export const DefaultLayout = ({
  dashboard,
  children,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div>
        <Sidebar as={Menu}
          visible={true}
          vertical
          inverted>
          <Header textAlign='center'>
            <Item>IRSI PaidOuts</Item>
          </Header>
          <SidebarMenu dashboard={dashboard} />
        </Sidebar>
      </div>
      <div style={{ paddingLeft: 265 }}>
        <Container>
          <AdminRoutes dashboard={dashboard} children={children} />
        </Container>
      </div>
    </div>
  )
};

DefaultLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
}

export default DefaultLayout;