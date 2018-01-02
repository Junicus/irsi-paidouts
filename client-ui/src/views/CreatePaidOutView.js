import React, { Component } from 'react'
import { Container, Segment, Header } from 'semantic-ui-react';
import queryString from 'querystring';
import CreatePaidOutContainer from '../containers/paidouts/create-paidout-container';
import CreatePaidOutForm from '../components/forms/create-paidout-form';

class CreatePaidOutView extends Component {
  state = {
    createdAt: new Date().toISOString().substr(0, 10),
    vendor: { id: null },
    storeId: queryString.parse(this.props.location.search.slice(1)).storeId,
    storeName: queryString.parse(this.props.location.search.slice(1)).storeName,
    detail: []
  }

  onSubmit = (data) => {
    const { history: push } = this.props;
    console.log(data);
  }

  render() {
    console.log(this.props);
    const { location } = this.props;
    const query = queryString.parse(location.search.slice(1));

    return (
      <Container style={{ marginTop: '1em' }}>
        <Header as='h1' attached='top'>Create new Paid Out</Header>
        <Segment attached>
          <CreatePaidOutContainer render={
            (loading, error, accounts, vendors, mutate) => {
              console.log(loading, error, accounts, vendors);
              const localOnSubmit = (e, data) => this.onSubmit(e, data, mutate);
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