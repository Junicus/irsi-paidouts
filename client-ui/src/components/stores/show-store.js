import React, { Component } from 'react'
import gql from 'graphql-tag';
import graphql from 'react-apollo/graphql';

import Table from 'antd/lib/table';
import { Content } from 'antd/lib/layout';

const GET_STORE_BY_ID = gql`
query GetStoreById($id: ID!) {
    node(id: $id) {
        ... on Store {
            name
        }
    }
}
`;

class ShowStore extends Component {
    render() {
        const loading = this.props.data.loading;
        const error = this.props.data.error;
        const store = this.props.data.node;

        if (loading) {
            return (<span>Loading...</span>);
        }

        if (error) {
            return (<span>{error}</span>);
        }

        return (<div>{store.name}</div>);
    }
}

export default graphql(GET_STORE_BY_ID, {
    options: (props) => {
        return { variables: { id: props.match.params.id } }
    }
})(ShowStore);