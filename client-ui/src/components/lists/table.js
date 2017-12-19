import React from 'react';
import { Header, Segment, Table as SUITable } from 'semantic-ui-react';

const Table = ({ loading = false, header, columns, data }) => {
  if (!data || data.length === 0) {
    return (<Segment loading={loading}><div>No data</div></Segment>);
  }

  if (!columns || columns.length === 0) {
    return (<Segment loading={loading}><div>No columns</div></Segment>);
  }

  const getColumnHeaders = (columns) => {
    return columns.map((column) => <SUITable.HeaderCell key={column.title}>
      {column.title}
    </SUITable.HeaderCell>);
  }

  const getDataRows = (columns, data) => {
    const getDataRow = (columns, record) => {
      const getData = (dataIndex, record) => {
        return dataIndex.split('.').reduce((a, property) => {
          return a[property];
        }, record);
      }

      return columns.map((column) => {
        if ('render' in column) {
          return (<SUITable.Cell>{column.render(record[column.dataIndex], record)}</SUITable.Cell>);
        } else {
          return (<SUITable.Cell>{getData(column.dataIndex, record)}</SUITable.Cell>);
        }
      });
    }

    return data.map((record) => <SUITable.Row>{getDataRow(columns, record)}</SUITable.Row>);
  }

  return (
    <div>
      {header && <Header attached='top' as='h3'>{header()}</Header>}
      <Segment attached={!!header} loading={loading} as={SUITable} >
        <SUITable.Header>
          {getColumnHeaders(columns)}
        </SUITable.Header>
        <SUITable.Body>
          {getDataRows(columns, data)}
        </SUITable.Body>
      </Segment>
    </div >
  );
}

export default Table;
