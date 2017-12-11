import React, { Component } from 'react'
import gql from 'graphql-tag';
import graphql from 'react-apollo/graphql';

import Table from 'antd/lib/table';
import { Content } from 'antd/lib/layout';

const ALL_INVOICES_QUERY = gql`
    query AllInvoicesQuery {
        viewer {
            id
        }
    }
`;

class InvoiceList extends Component {
    render() {
        console.log(this.props.data);
        const invoicesToRender = [{
            id: '1',
            createdAt: Date.now(),
            vendor: { id: '1', name: 'Test Vendor' },
            amount: 100.00
        },
        {
            id: '2',
            createdAt: Date.now(),
            vendor: { id: '2', name: 'Another Vendor' },
            amount: 150.00
        }];

        const columns = [{
            title: 'Date',
            dataIndex: 'createdAt',
        },
        {
            title: 'Vendor',
            dataIndex: 'vendor.name',
        },
        {
            title: 'Amount',
            dataIndex: 'amount'
        }];

        return (
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                <Table columns={columns}
                    dataSource={invoicesToRender.map(invoice => ({
                        ...invoice,
                        key: invoice.id
                    }))}
                    bordered
                />
            </Content>
        );
    }
}

export default graphql(ALL_INVOICES_QUERY)(InvoiceList);