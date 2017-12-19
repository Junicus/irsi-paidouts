import React from 'react'
import { Container, Segment, Header } from 'semantic-ui-react';
import Loader from '../../components/loader/loader';
import StoreList from '../../components/stores/store-list';

const StoreListPage = ({ loading, error, stores }) => {
    return (
        <Container style={{ marginTop: '1em' }}>
            <Header as='h1' attached='top'>My Stores</Header>
            <Segment attached>
                {stores ? <StoreList loading={loading} stores={stores} /> : ''}
            </Segment>
        </Container>
    );
}

export default StoreListPage;