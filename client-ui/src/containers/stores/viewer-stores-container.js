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

const ViewerStoresContainer = ({ data, render }) => {
    const { loading, error, viewer } = data;

    return (render(loading, error, viewer));
}

export default graphql(VIEWER_STORES_QUERY)(ViewerStoresContainer);