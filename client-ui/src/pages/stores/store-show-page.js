import React from 'react'
import queryString from 'querystring';
import { Segment, Message, Container, Header, Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Table from '../../components/lists/table';
import ListHeader from '../../components/lists/list-header';
import DateRangeSelector from '../../components/datepickers/dateRangeSelector';

import PaidOutList from '../../components/paidouts/paidout-list';

const StoreShowPage = ({ loading, error, store }) => {
    console.log(store);
    const { edges } = store;
    console.log(edges);

    const columns = [];
    const paidouts = [];

    if (error) {
        return (
            <Container style={{ marginTop: '1em' }}>
                <Message content={
                    <span>Error: store not found</span>
                } />

                <Message content={
                    <span>{`${error}`}</span>
                } />
            </Container>
        );
    }
    return (
        <Container style={{ marginTop: '1em' }}>
            <Header as='h1'>
                {store.name}
            </Header>
            <DateRangeSelector />
            <Table columns={columns} data={paidouts}
                header={() => (<ListHeader title='Paid Outs' rightCommands={
                    [{
                        label: 'Create',
                        url: '/paidout/create',
                        icon: 'add'
                    }]
                } />)} />
            {/*             <Segment attached>
                <Menu attached='top' borderless>
                    <Menu.Item header>Paid Outs</Menu.Item>
                    <Menu.Item position='right'>
                        <Link to={{
                            pathname: `/paidout/create`,
                            search: queryString.stringify({ storeId: store.id })
                        }}><Icon name='add' />Create</Link>
                    </Menu.Item>
                </Menu>
                {paidouts ? <PaidOutList paidouts={paidouts} /> : <div>No data</div>}
            </Segment>
 */}        </Container>
    );
}

export default StoreShowPage;