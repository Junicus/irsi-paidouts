import React from 'react';
import queryString from 'querystring';
import gql from 'graphql-tag';
import graphql from 'react-apollo/graphql';

import PaidoutCreatePage from '../../pages/paidouts/paidout-create-page';

const GET_ACCOUNTS_AND_VENDORS = gql`
query GetAccountsAndVendors($id: ID!) {
    viewer {
      id
      store(id: $id) {
        id
        name
      }
    }
    accounts {
      id
      name
    }
    vendors {
      id
      name
    }
}
`;

const getQuery = location => {
  const { search } = location;
  return queryString.parse(search.slice(1));
}

const CreatePaidoutsContainer = ({ loading, data, ...props }) => {
  const { viewer, accounts, vendors } = data;
  const store = viewer ? viewer.store : {};

  return (
    <PaidoutCreatePage
      loading={loading}
      store={store}
      accounts={accounts}
      vendors={vendors} {...props} />
  );
}

export default graphql(GET_ACCOUNTS_AND_VENDORS, {
  options: ({ location }) => {
    const query = getQuery(location);
    return { variables: { id: query.storeId } }
  }
})(CreatePaidoutsContainer);