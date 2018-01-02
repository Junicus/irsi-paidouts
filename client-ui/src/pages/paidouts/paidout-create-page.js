import React, { Component } from 'react'
import { Container, Header, Form, Button } from 'semantic-ui-react';
import { DatePickerInput } from 'rc-datepicker';

class PaidoutCreatePage extends Component {
  state = {
    businessDate: Date(),
    vendorId: '',
    storeId: this.props.store.id
  }

  onFormChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  onFormSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    const { loading, vendors, accounts, store } = this.props;
    if (loading) { return <div>Loading...</div> }

    const vendorOptions = !vendors ? [] : vendors.map((vendor) => {
      return { key: vendor.id, text: vendor.name, value: vendor.id }
    });

    return (
      <Container style={{ marginTop: '1em' }} >
        <Header as='h2'>
          {'Create new PaidOut entry'}
        </Header>
        <Form>
          <Form.Field>
            <label>Business Date</label>
            <DatePickerInput
              value={this.state.businessDate}
              onChange={
                (jsDate, dateString) => {
                  this.setState({ businessDate: jsDate });
                }
              } iconClassName='calendar icon' />
          </Form.Field>
          <Form.Select label='Vendor' name='vendorId' placeholder='Vendor' onChange={this.onFormChange} options={vendorOptions} />
          <Button type='submit'>Submit</Button>
        </Form>
      </Container >
    );
  }
}

export default PaidoutCreatePage;