import React from 'react'
import { Content } from 'antd/lib/layout';
import Loader from '../../components/loader/loader';
import StoreShow from '../../components/stores/store-show';

const StoreShowPage = ({ loading, error, store }) => {
    return (
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            {loading ? <Loader spinning /> : ''}
            <StoreShow store={store} />
        </Content>
    );
}

export default StoreShowPage;