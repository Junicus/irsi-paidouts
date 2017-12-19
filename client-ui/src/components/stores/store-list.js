import React from 'react'
import { Segment, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const StoreList = ({ loading = false, stores }) => {
    if (!stores) return null;

    const columns = [{
        title: 'Name',
        dataIndex: 'name',
        render: (text, record) =>
            <Link to={`/stores/${record.id}/show`}>{text}</Link>
    }];

    const headerCells = columns.map((column) => {
        return (<Table.HeaderCell key={column.title}>{column.title}</Table.HeaderCell>);
    });

    const buildCells = (store) => {
        return columns.map((column) => {
            if (column.render) {
                return (<Table.Cell key={`${store.id}-${column.name}`}>{column.render(store[column.dataIndex], store)}</Table.Cell>)
            } else {
                return (<Table.Cell key={`${store.id}-${column.name}`}>{store[column.dataIndex]}</Table.Cell>);
            }
        });
    }

    const data = stores.map((store) => (<Table.Row key={store.id}>{buildCells(store)}</Table.Row>));

    return (
        <Segment as={Table} loading={loading}>
            <Table.Header>
                <Table.Row>
                    {headerCells}
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {data}
            </Table.Body>
        </Segment>
    );
}

export default StoreList;