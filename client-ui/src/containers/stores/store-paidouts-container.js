import React, { Component } from 'react'
import gql from 'graphql-tag';
import graphql from 'react-apollo/graphql';

const STORE_PAIDOUTS_QUERY = gql`
    query StorePaidOutsQuery($id: ID!) {
      node(id: $id) {
        id
        ... on Store {
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

const StorePaidOutsContainer = ({ data, render }) => {
  const { loading, error, node } = data;
  return (render(loading, error, node));
};

export default graphql(STORE_PAIDOUTS_QUERY, {
  options: (props) => {
    return { variables: { id: props.id, startDate: props.startDate, endDate: props.endDate } }
  }
})(StorePaidOutsContainer);