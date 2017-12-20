import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

import Table from '../components/lists/table';
import ListHeader from '../components/lists/list-header';
import Link from '../components/link/link';

import '../styles/semantic/semantic.min.css';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);

const testColumns = [{
  dataIndex: 'createdAt',
  title: 'Created At',
  render: (data, record) => {
    return data.toLocaleDateString();
  }
}, {
  dataIndex: 'vendor.name',
  title: 'Vendor'
}, {
  dataIndex: 'amount',
  title: 'Amount'
}];

const testData = [{
  createdAt: new Date(),
  vendor: { id: '1', name: 'Test Vendor' },
  amount: 500.00
}, {
  createdAt: new Date(),
  vendor: { id: '1', name: 'Test Vendor 2' },
  amount: 250.00
}];

const header = () => {
  return (<ListHeader title='Paid Outs' />);
}

const headerWithRightCommands = () => {
  const rightCommands = [{
    url: '/test',
    label: 'Create',
    icon: 'add'
  }];

  return (<ListHeader title='Paid Outs' rightCommands={rightCommands} />);
}

storiesOf('Table', module)
  .add('no data', () => <Table />)
  .add('no columns', () => <Table data={testData} />)
  .add('data and columns', () => <Table columns={testColumns} data={testData} />)
  .add('with header', () => <Table columns={testColumns} data={testData} header={header} />)
  .add('with header and commands', () => <Table columns={testColumns} data={testData} header={headerWithRightCommands} />)

const linkData = {
  url: '#',
  label: 'Test',
  icon: 'add'
}

storiesOf('Link', module)
  .add('basic', () => <Link url='#' label='Test' />)
  .add('with icon', () => <Link {...linkData} />)