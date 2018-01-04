import React, { Component } from 'react'
import { Header, Segment, Table as SUITable, Form, Button } from 'semantic-ui-react';
import moment from 'moment';
import DetailsSubform from './create-paidout-details-subform';
import FormUtils from './form-utils';
import Table from '../lists/table';
import { run, ruleRunner } from '../validation/ruleRunner';
import { required, mustContainSomething } from '../validation/rules';

const fieldValidations = [
  ruleRunner('vendorId', 'Vendor', required),
  ruleRunner('details', 'Details', mustContainSomething)
];

class CreatePaidoutForm extends Component {
  state = {
    created_at: moment().startOf('day').toISOString().substr(0, 10),
    storeId: this.props.storeId,
    storeName: this.props.storeName,
    vendorId: null,
    details: [],
    showErrors: false,
    validationErrors: {}
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ showErrors: true });
    if ((Object.keys(this.state.validationErrors).length === 0 && this.state.validationErrors.constructor === Object) === false) {
      console.log('validation error');
      return null;
    }
    const { onSubmit } = this.props;
    const formData = {
      created_at: this.state.created_at,
      vendorId: this.state.vendorId,
      storeId: this.state.storeId,
      details: this.state.details.map((detail) => ({ accountId: detail.accountId, amount: detail.amount }))
    };
    onSubmit(e, formData);
  }

  handleChange = (e, { name, value }) => {
    let newState = {
      ...this.state,
      [name]: value
    };
    newState.validationErrors = run(newState, fieldValidations);
    this.setState(newState);
  }

  handleAddDetail = (detail) => {
    const { details } = this.state;
    details.push(detail);
    let newState = {
      ...this.state,
      details
    };
    newState.validationErrors = run(newState, fieldValidations);
    this.setState(newState);
  }

  componentWillMount() {
    this.setState({ validationErrors: run(this.state, fieldValidations) });
  }

  errorFor(field) {
    return this.state.validationErrors[field] || "";
  }

  render() {
    const { loading, vendors, accounts, onSubmit } = this.props;
    const vendorOptions = !loading ? vendors.map((vendor) => ({
      key: vendor.id,
      text: vendor.name,
      value: vendor.id
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
        <Form.Group>
          <FormUtils.Input name='created_at' label='Date' type='date' value={this.state.created_at} onChange={this.handleChange} />
          <FormUtils.Input label='Store' value={this.state.storeName} readOnly />
        </Form.Group>
        <FormUtils.Select name='vendorId' label='Vendor' placeholder='Select vendor...' options={vendorOptions} onChange={this.handleChange}
          showErrors={this.state.showErrors} errorText={this.errorFor('vendorId')} />
        <Segment>
          <DetailsSubform accounts={accounts} onAdd={this.handleAddDetail} />
          <Table columns={detailColumns} data={this.state.details} />
        </Segment>
        <Form.Field control={Button}>Submit</Form.Field>
        {
          JSON.stringify(this.state)
        }
      </Segment>
    );
  }
}

export default CreatePaidoutForm;