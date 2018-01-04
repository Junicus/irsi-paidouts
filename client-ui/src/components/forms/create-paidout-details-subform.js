import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import FormUtils from './form-utils';
import { run, ruleRunner } from '../validation/ruleRunner';
import { required } from '../validation/rules';

const fieldValidations = [
  ruleRunner('account', 'Account', required),
  ruleRunner('amount', 'Amount', required)
];

class DetailsSubform extends Component {
  state = {
    account: '',
    amount: '',
    showErrors: false,
    validationErrors: {}
  }

  handleChange = (e, { name, value }) => {
    let newState = {
      ...this.state,
      [name]: value
    };
    newState.validationErrors = run(newState, fieldValidations);
    this.setState(newState);
  }

  handleAddClick = (e) => {
    e.preventDefault();
    this.setState({ showErrors: true });
    if ((Object.keys(this.state.validationErrors).length === 0 && this.state.validationErrors.constructor === Object) === false) {
      console.log('validation error');
      return null;
    }
    const { accounts, onAdd } = this.props;
    const selectedAccount = accounts.find((account) => account.id === this.state.account);
    const detail = { accountId: selectedAccount.id, accountName: selectedAccount.name, amount: this.state.amount };
    onAdd(detail);
    let newState = {
      account: '',
      amount: '',
      showErrors: false
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
    const { accounts } = this.props;

    const accountOptions = accounts ? accounts.map((account) => ({
      key: account.id,
      text: account.name,
      value: account.id
    })) : [];

    return (
      <Form.Group inline>
        <FormUtils.Select name='account' label='Account' value={this.state.account}
          options={accountOptions} placeholder='Select account...' onChange={this.handleChange}
          showErrors={this.state.showErrors} errorText={this.errorFor('account')} />
        <FormUtils.Input name='amount' label='Amount' value={this.state.amount} placeholder='0.00'
          onChange={this.handleChange} showErrors={this.state.showErrors} errorText={this.errorFor('amount')} />
        <Form.Field control={Button} content='Add' onClick={this.handleAddClick} />
      </Form.Group>
    );
  }
}

export default DetailsSubform;