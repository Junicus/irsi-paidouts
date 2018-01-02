import React, { Component } from 'react'
import { Header, Segment, Table as SUITable, Form, Button } from 'semantic-ui-react';

class CreatePaidoutForm extends Component {
  state = {
    createdAt: new Date().toISOString().substr(0, 10),
    vendor: { id: null },
    storeId: this.props.storeId,
    storeName: this.props.storeName,
    detail: []
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit(this.state);
  }

  onVendorChange = (e, { name, value }) => {
    this.setState({
      vendor: { id: value }
    });
  }

  render() {
    const { loading, vendors, accounts, onSubmit } = this.props;
    const vendorOptions = !loading ? vendors.map((vendor) => ({
      key: vendor.id,
      text: vendor.name,
      value: vendor.id
    })) : [];

    console.log(this.state);
    return (
      <Segment as={Form} loading={loading} onSubmit={this.onSubmit}>
        <Form.Field>
          <label>Business Date</label>
          <Form.Input name='createdAt' onChange={this.onChange} />
        </Form.Field>
        <Form.Field>
          <label>Store</label>
          <Form.Input value={this.state.storeName} readOnly />
        </Form.Field>
        <Form.Field>
          <label>Vendor</label>
          <Form.Select name='vendor' options={vendorOptions} onChange={this.onVendorChange} />
        </Form.Field>
        <Form.Field control={Button}>Submit</Form.Field>
      </Segment>
    );
  }
}

export default CreatePaidoutForm;