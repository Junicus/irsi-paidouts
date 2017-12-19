import React from 'react';
import { Segment, Table } from 'semantic-ui-react';

const PaidOutList = ({ loading = false, paidouts }) => {
  if(!paidouts) return null;
  
  const columns = [];

  const headerCells = columns.map((column) => {
    return (<Table.HeaderCell key={column.title}>{column.title}</Table.HeaderCell>);
  });

  const buildCells = (paidout) => {
    return columns.map((column) => {
      if (column.render) {
        return (<Table.Cell key={`${paidout.id}-${column.title}`}>
          {column.render(paidout[column.dataIndex], paidout)}
        </Table.Cell>);
      } else {
        return (<Table.Cell key={`${paidout.id}-${column.title}`}>
          {paidout[column.dataIndex]}
        </Table.Cell>);
      }
    });
  }

  const data = paidouts.map((paidout) => (<Table.Row key={paidout.id}>{buildCells(paidout)}</Table.Row>));

  return (
    <Segment as={Table} attached>
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

export default PaidOutList;
