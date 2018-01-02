import React, { Children } from 'react'
import gql from 'graphql-tag';
import graphql from 'react-apollo/graphql';
import Loader from '../../components/loader/loader';

const VIEWER_QUERY = gql`
    query GetViewerQuery {
        viewer {
            id
            name
            email
            isAdmin
        }
    }
`;

const UserProvider = ({ children, data }) => {
    const { loading, error, viewer } = data;
    if (loading) {
        return <Loader spinning />
    }

    const { isAdmin } = viewer ? viewer.isAdmin : false;

    return (
        <div>
            {Children.map(children, (child) => React.cloneElement(child, { isAdmin }))}
        </div>
    );
}

export default graphql(VIEWER_QUERY)(UserProvider);