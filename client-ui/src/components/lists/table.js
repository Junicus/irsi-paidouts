import React from 'react';
import { Segment, Table } from 'semantic-ui-react';

const Table = ({ loading = false, columns, datasource }) => {
  if (!datasource) {
    return (<div>No data</div>);
  }

  if (!columns) {
    return (<div>No columns</div>);
  }

  const headerCells = columns.map((column) => {
    return (<Table.HeaderCell key={column.title}>{column.title}</Table.HeaderCell>);
  });

  const buildCells = (record) => {
    return columns.map((column) => {
      if (column.render) {
        return (<Table.Cell key={`${row.id}-${column.title}`}>
          {column.render(datasource[column.dataIndex], record)}
        </Table.Cell>);
      } else {
        return (<Table.Cell key={`${row.id}-${column.title}`}>
          {datasource[column.dataIndex]}
        </Table.Cell>);
      }
    });
  }

  const data = datasource.map((record) => (<Table.Row key={record.id}>{buildCells(record)}</Table.Row>));

  return (
    <Segment as={Table}>
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

export default Table;
