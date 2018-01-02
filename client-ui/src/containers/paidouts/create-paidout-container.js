import React from 'react';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';

const CREATE_PAIDOUT_QUERIES = {
  getAccounts: gql`
    query getAccountsQuery {
      accounts {
        id
        name
      }
    }
  `,
  getVendors: gql`
    query getVendorsQuery {
      vendors {
        id
        name
      }
    }
  `,
  createPaidOut: gql`
    mutation createPaidOutMutation($input: String!) {
      createPaidOut(input: $input) {
        id
      }
    }
  `
}

const CreatePaidoutContainer = ({ getAccountsQuery, getVendorsQuery, render, mutate }) => {
  const { accounts } = getAccountsQuery;
  const { vendors } = getVendorsQuery;
  const loading = getAccountsQuery.loading || getVendorsQuery.loading;
  const error = getAccountsQuery.error || getVendorsQuery.error;
  return (render(loading, error, accounts, vendors, mutate));
};

export default compose(
  graphql(CREATE_PAIDOUT_QUERIES.getAccounts, { name: 'getAccountsQuery' }),
  graphql(CREATE_PAIDOUT_QUERIES.getVendors, { name: 'getVendorsQuery' }),
  graphql(CREATE_PAIDOUT_QUERIES.createPaidOut)
)(CreatePaidoutContainer);