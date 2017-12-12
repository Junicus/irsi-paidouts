import React from 'react'
import Table from 'antd/lib/table';
import { Link } from 'react-router-dom';

const StoreList = ({ stores }) => {
    const columns = [{
        title: 'Name',
        dataIndex: 'name',
        render: (text, record) =>
            <Link to={`/stores/${record.id}/show`}>{text}</Link>
    }];

    return (
        <Table columns={columns}
            dataSource={stores}
            bordered
        />
    );
}

export default StoreList;