import React, { Component } from 'react'
import gql from 'graphql-tag';
import graphql from 'react-apollo/graphql';

import StoreListPage from '../../pages/stores/store-list-page';

const VIEWER_STORES_QUERY = gql`
    query ViewerStoresQuery {
        viewer {
            id
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

class ViewerStoresContainer extends Component {
    render() {
        const { loading, error, viewer } = this.props.data;
        let stores = [];
        if (viewer) {
            stores = viewer.stores.edges.map(edge => ({
                ...edge.node,
                key: edge.node.id
            }));
        }

        return (
            <StoreListPage loading={loading} error={error} stores={stores} />
        );
    }
}

export default graphql(VIEWER_STORES_QUERY)(ViewerStoresContainer);