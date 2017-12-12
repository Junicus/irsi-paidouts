import React, { Component } from 'react'
import gql from 'graphql-tag';
import graphql from 'react-apollo/graphql';

import Table from 'antd/lib/table';
import { Content } from 'antd/lib/layout';

import { Link } from 'react-router-dom';

const MY_STORES_QUERY = gql`
    query MyStoresQuery {
        viewer {
            stores {
                edges {
                    node {
                        id
                        name
                    }
                }
            }
        }
    }
`;

class MyStoreList extends Component {
    render() {
        if (this.props.data.loading) {
            return (<div>Loading...</div>);
        }

        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            render: (text, record) =>
                <Link to={`/stores/${record.id}/show`}>
                {
                    text
                }
                </Link>
        }];

        const stores = this.props.data.viewer.stores.edges.map(edge => ({
            ...edge.node,
            key: edge.node.id
        }));

        return (
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                <Table columns={columns}
                    dataSource={stores}
                    bordered
                />
            </Content>
        );
    }
}

export default graphql(MY_STORES_QUERY)(MyStoreList);