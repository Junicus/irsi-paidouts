import React, { Component } from 'react'

import Table from 'antd/lib/table';
import { Content } from 'antd/lib/layout';

const ShowStore = ({ store }) => {
    return <div>
        {store.name}
    </div>
}

export default ShowStore;