import React, { Component } from 'react'
import { Container, Segment, Header } from 'semantic-ui-react';
import queryString from 'querystring';
import DateRangeSelector from '../components/datepickers/dateRangeSelector';
import StorePaidOutsContainer from '../containers/stores/store-paidouts-container';
import Table from '../components/lists/table';
import ListHeader from '../components/lists/list-header';

class ShowStoreView extends Component {
  state = {
    filter: {
      startDate: new Date().toISOString().substr(0, 10),
      endDate: new Date().toISOString().substr(0, 10)
    }
  }

  onFilterChange = (_, data) => {
    this.setState({
      filter: {
        startDate: data.left,
        endDate: data.right
      }
    });
  }

  render() {
    const { location } = this.props;
    const query = queryString.parse(location.search.slice(1));
    return (
      <Container style={{ marginTop: '1em' }}>
        <Header as='h1' attached='top'>{query.storeName}</Header>
        <Segment attached>
          <DateRangeSelector
            leftValue={this.state.filter.startDate}
            rightValue={this.state.filter.endDate}
            onChange={this.onFilterChange}
          />
          <StorePaidOutsContainer id={query.storeId} {...this.state.filter} render={(loading, error, node) => {
            const columns = [{
              dataIndex: 'id',
              title: 'ID',
            }];
            const data = node && node.paidouts.edges ? node.paidouts.edges.map((paidout) => ({
              id: paidout.node.id,
              createdAt: paidout.node.createdAt,
              vendorName: paidout.node.vendor ? paidout.node.vendor.name : '',
              amount: paidout.node.amount
            })) : [];
            const rightCommands = [{
              label: 'Create',
              url: `/paidout/create${location.search}`,
              icon: 'add'
            }];
            return (<Table loading={loading} header={() => (<ListHeader title='Paid Outs' rightCommands={rightCommands} />)}
              columns={columns} data={data} />);
          }} />
        </Segment>
      </Container>
    );
  }
}

export default ShowStoreView;