import React from 'react'
import queryString from 'querystring';
import { Segment, Message, Container, Header, Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PaidOutList from '../../components/paidouts/paidout-list';

const StoreShowPage = ({ loading, error, store }) => {
    console.log(store);
    const { edges } = store;
    console.log(edges);

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
            <Header as='h1' attached='top'>
                {store.name}
            </Header>
            <Segment attached>
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
        </Container>
    );
}

export default StoreShowPage;