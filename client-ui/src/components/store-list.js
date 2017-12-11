import React, { Component } from 'react'
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import Table from 'antd/lib/table';
import Spin from 'antd/lib/spin';
import { Content } from 'antd/lib/layout';

const ALL_STORES_QUERY = gql`
    query AllStoresQuery {
        stores {
            id
            name
        }
    }
`;

class StoreList extends Component {
    render() {
        if (this.props.data.loading) {
            return <Spin size='large' tip='Loading...' />
        }

        const stores = this.props.data.stores.map((store) => (
            {
                ...store,
                key: store.id
            }
        ));

        const columns = [{
            title: 'Name',
            dataIndex: 'name',
        }];

        return (
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                <Table columns={columns}
                    dataSource={stores}
                    bordered />
            </Content>
        );
    }
}

export default graphql(ALL_STORES_QUERY)(StoreList);