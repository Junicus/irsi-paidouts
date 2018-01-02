import React from 'react';
import { Header, Segment, Table as SUITable } from 'semantic-ui-react';

const Table = ({ loading = false, header, columns, data }) => {
  if (!data || data.length === 0) {
    return (
      <div>
        {header && <Header attached='top' as='h3'>{header()}</Header>}
        <Segment attached loading={loading}><div>No data</div></Segment>
      </div>
    );
  }

  if (!columns || columns.length === 0) {
    return (
      <div>
        {header && <Header attached='top' as='h3'>{header()}</Header>}
        <Segment attached loading={loading}><div>No columns</div></Segment>
      </div>);
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
          return (<SUITable.Cell key={`${record.id}-${column.dataIndex}`}>{column.render(record[column.dataIndex], record)}</SUITable.Cell>);
        } else {
          return (<SUITable.Cell key={`${record.id}-${column.dataIndex}`}>{getData(column.dataIndex, record)}</SUITable.Cell>);
        }
      });
    }

    return data.map((record) => <SUITable.Row key={`${record.id}`}>{getDataRow(columns, record)}</SUITable.Row>);
  }

  return (
    <div>
      {header && <Header attached='top' as='h3'>{header()}</Header>}
      <Segment attached={!!header} loading={loading} as={SUITable} >
        <SUITable.Header>
          <SUITable.Row>
            {getColumnHeaders(columns)}
          </SUITable.Row>
        </SUITable.Header>
        <SUITable.Body>
          {getDataRows(columns, data)}
        </SUITable.Body>
      </Segment>
    </div >
  );
}

export default Table;
