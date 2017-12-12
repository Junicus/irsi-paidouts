import React from 'react'
import { Content } from 'antd/lib/layout';
import Loader from '../../components/loader/loader';
import StoreList from '../../components/stores/store-list';

const StoreListPage = ({ loading, error, stores }) => {
    return (
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            {loading ? <Loader spinning /> : ''}
            {!stores && <div>No Stores</div>}
            {stores && <StoreList stores={stores} />}
        </Content>
    );
}

export default StoreListPage;