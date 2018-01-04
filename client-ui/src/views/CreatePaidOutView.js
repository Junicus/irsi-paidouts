import React, { Component } from 'react'
import { Container, Segment, Header } from 'semantic-ui-react';
import queryString from 'querystring';
import CreatePaidOutContainer from '../containers/paidouts/create-paidout-container';
import CreatePaidOutForm from '../components/forms/create-paidout-form';

import STORE_PAIDOUTS_QUERY from '../containers/stores/store-paidouts-container';

class CreatePaidOutView extends Component {
  state = {
    createdAt: new Date().toISOString().substr(0, 10),
    vendor: { id: null },
    storeId: queryString.parse(this.props.location.search.slice(1)).storeId,
    storeName: queryString.parse(this.props.location.search.slice(1)).storeName,
    detail: []
  }

  onSubmit = (data, mutate) => {
    const { location, history: { push } } = this.props;
    const query = queryString.parse(location.search.slice(1));

    mutate({
      variables: { input: data },
      refetchQueries: [{ query: STORE_PAIDOUTS_QUERY }]
    });

    push(`/stores/${query.storeId}/show?storeId=${query.storeId}`);

  }

  render() {
    const { location } = this.props;
    const query = queryString.parse(location.search.slice(1));

    return (
      <Container style={{ marginTop: '1em' }}>
        <Header as='h1' attached='top'>Create new Paid Out</Header>
        <Segment attached>
          <CreatePaidOutContainer render={
            (loading, error, accounts, vendors, mutate) => {
              const localOnSubmit = (e, data) => this.onSubmit(data, mutate);
              return (<CreatePaidOutForm loading={loading}
                value={this.state}
                storeId={query.storeId}
                storeName={query.storeName}
                accounts={accounts}
                vendors={vendors}
                onSubmit={localOnSubmit} />);
            }
          } />
        </Segment>
      </Container>
    );
  }
}

export default CreatePaidOutView;