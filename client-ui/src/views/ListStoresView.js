import React from 'react'
import { Container, Segment, Header } from 'semantic-ui-react';
import queryString from 'querystring'
import { Link } from 'react-router-dom';
import ViewerStoresContainer from '../containers/stores/viewer-stores-container';
import ListHeader from '../components/lists/list-header';
import Table from '../components/lists/table';

const ListStoresView = () => {
  return (
    <Container style={{ marginTop: '1em' }}>
      <Header as='h1' attached='top'>My Stores</Header>
      <Segment attached>
        <ViewerStoresContainer render={(loading, error, viewer) => {
          const columns = [{
            dataIndex: 'name',
            title: 'Name',
            render: (data, record) => (<Link to={{
              pathname: `/stores/${record.id}/show`,
              search: queryString.stringify({ storeId: record.id, storeName: record.name })
            }} > {data}</Link>)
          }];
          const data = (viewer && viewer.stores.edges) ? viewer.stores.edges.map((store) => ({ id: store.node.id, name: store.node.name })) : [];
          return (<Table loading={loading} header={() => (<ListHeader title='Stores' />)} columns={columns} data={data} />);
        }} />
      </Segment>
    </Container>
  );
}

export default ListStoresView;