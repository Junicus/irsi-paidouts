import React, { Component } from 'react'
import gql from 'graphql-tag';
import graphql from 'react-apollo/graphql';

import Table from 'antd/lib/table';
import { Content } from 'antd/lib/layout';

const GET_STORE_INVOICES = gql`
query GetStoreInvoices($storeId: ID!) {
     node(id: $storeId) {
         ... on Store {
            name
         }
     }
}
`;

export class StoreInvoiceList extends Component {
    render() {
        return (<div>Invoice List</div>);
    }
}

export default graphql(GET_STORE_INVOICES)(StoreInvoiceList);
