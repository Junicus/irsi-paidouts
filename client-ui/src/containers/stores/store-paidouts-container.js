import React, { Component } from 'react'
import gql from 'graphql-tag';
import graphql from 'react-apollo/graphql';

export const STORE_PAIDOUTS_QUERY = gql`
    query StorePaidOutsQuery($id: ID!, $startDate: Date!, $endDate: Date!) {
      node(id: $id) {
        id
        ... on Store {
          paidoutsByDate(startDate: $startDate, endDate: $endDate) {
            edges {
              node {
                id
                created_at
                vendor {
                  id
                  name
                }
                total
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