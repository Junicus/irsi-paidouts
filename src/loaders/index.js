import DataLoader from 'dataloader';

import * as accountLoaders from './accountLoaders';
import * as storeLoaders from './storeLoaders';
import * as vendorLoaders from './vendorLoaders';

export const createLoaders = (authToken) => {
    return {
        accounts: new DataLoader(keys => getAccount)
    };
};

export const operations = {
    account: accountLoaders,
    vendor: vendorLoaders,
    store: storeLoaders
};