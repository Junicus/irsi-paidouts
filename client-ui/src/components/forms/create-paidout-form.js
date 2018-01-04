import React, { Component } from 'react'
import { Header, Segment, Table as SUITable, Form, Button } from 'semantic-ui-react';
import moment from 'moment';
import Table from '../lists/table';

class CreatePaidoutForm extends Component {
  state = {
    createdAt: moment().startOf('day').toISOString().substr(0, 10),
    vendor: { id: null },
    storeId: this.props.storeId,
    storeName: this.props.storeName,
    details: [],
    newAccount: null,
    newAmount: ''
  }

  onSubmit = (e) => {
    e.preventDefault();
    //TODO: do some data verification?
    const { onSubmit } = this.props;
    const formData = {
      created_at: this.state.createdAt,
      vendorId: this.state.vendor.id,
      storeId: this.state.storeId,
      details: this.state.details.map((detail) => ({ accountId: detail.accountId, amount: detail.amount }))
    };
    onSubmit(e, formData);
  }

  onVendorChange = (e, { name, value }) => {
    this.setState({
      vendor: { id: value }
    });
  }

  onChange = (e, { name, value }) => {
    this.setState({
      [name]: value
    });
  }

  onAddDetail = (e) => {
    e.preventDefault();
    const { newAccount, details } = this.state;
    const { accounts } = this.props;
    const selectedAccount = accounts.find((account) => {
      return account.id === newAccount;
    });
    details.push({ accountId: selectedAccount.id, accountName: selectedAccount.name, amount: this.state.newAmount });
    this.setState({
      details,
      newAccount: null,
      newAmount: ''
    });
  }

  render() {
    const { loading, vendors, accounts, onSubmit } = this.props;
    const vendorOptions = !loading ? vendors.map((vendor) => ({
      key: vendor.id,
      text: vendor.name,
      value: vendor.id
    })) : [];
    const accountOptions = !loading ? accounts.map((account) => ({
      key: account.id,
      text: account.name,
      value: account.id
    })) : [];
    const detailColumns = [{
      dataIndex: 'accountName',
      title: 'Account'
    }, {
      dataIndex: 'amount',
      title: 'Amount'
    }];

    return (
      <Segment as={Form} loading={loading} onSubmit={this.onSubmit}>
        <Form.Field>
          <label>Business Date</label>
          <Form.Input name='createdAt' type='date' value={this.state.createdAt} onChange={this.onChange} />
        </Form.Field>
        <Form.Field>
          <label>Store</label>
          <Form.Input value={this.state.storeName} readOnly />
        </Form.Field>
        <Form.Field>
          <label>Vendor</label>
          <Form.Select name='vendor' placeholder='Select vendor...' options={vendorOptions} onChange={this.onVendorChange} />
        </Form.Field>
        <Segment>
          <Form.Group inline>
            <Form.Select name='newAccount' label='Account' value={this.state.newAccount}
              options={accountOptions} placeholder='Select account...'
              onChange={this.onChange} />
            <Form.Input name='newAmount' label='Amount' value={this.state.newAmount} placeholder='0.00'
              onChange={this.onChange} />
            <Form.Field control={Button} content='Add' onClick={this.onAddDetail} />
          </Form.Group>
          <Table columns={detailColumns} data={this.state.details} />
        </Segment>
        <Form.Field control={Button}>Submit</Form.Field>
      </Segment>
    );
  }
}

export default CreatePaidoutForm;