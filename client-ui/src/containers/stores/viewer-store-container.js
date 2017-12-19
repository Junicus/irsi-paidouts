import React, { Component } from 'react'
import gql from 'graphql-tag';
import graphql from 'react-apollo/graphql';

import StoreShowPage from '../../pages/stores/store-show-page';

const VIEWER_STORE_QUERY = gql`
    query ViewerStoreQuery($id: ID!) {
        viewer {
            id
            store(id: $id) {
                id
                name
                paidouts {
                    edges {
                        node {
                            id
                        }
                    }
                }
            }
        }
    }
`;

class ViewerStoreContainer extends Component {
    render() {
        const { loading, error, viewer } = this.props.data;
        const store = viewer ? viewer.store : {};

        return (
            <StoreShowPage loading={loading} error={error} store={store} />
        );
    }
}

export default graphql(VIEWER_STORE_QUERY, {
    options: (props) => {
        return { variables: { id: props.match.params.id } }
    }
})(ViewerStoreContainer);