import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString
} from 'graphql';

import {
    GraphQLDate
} from 'graphql-iso-date';

import {
    nodeDefinitions,
    fromGlobalId,
    globalIdField,
    connectionDefinitions,
    connectionArgs,
    connectionFromPromisedArray
} from 'graphql-relay';

import * as database from '../data/database';

const { nodeInterface, nodeField } = nodeDefinitions(
    (globalId) => {
        const { type, id } = fromGlobalId(globalId);
        switch (type) {
            case 'Vendor':
                return database.Vendors.getVendor(id);
            case 'Account':
                return database.Accounts.getAccount(id);
            case 'Store':
                return database.Stores.getStore(id);
            case 'Invoice':
                return database.Invoices.getInvoice(id);

        }
        return null;
    },
    (obj) => {
        if (obj instanceof Vendor) {
            return vendorType;
        }
        if (obj instanceof Account) {
            return accountType;
        }
        if (obj instanceof Store) {
            return storeType;
        }
        if (obj instanceof Invoice) {
            return invoiceType;
        }

        return null;
    }
);

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        node: nodeField,
        vendors: {
            type: new GraphQLList(vendorType),
            resolve: () => {
                return database.Vendors.getVendors();
            }
        },
        accounts: {
            type: new GraphQLList(accountType),
            resolve: () => {
                return database.Accounts.getAccounts();
            }
        },
        stores: {
            type: new GraphQLList(storeType),
            resolve: () => {
                return database.Stores.getStores();
            }
        }
    })
});

const vendorType = new GraphQLObjectType({
    name: 'Vendor',
    fields: () => ({
        id: globalIdField('Vendor'),
        name: { type: new GraphQLNonNull(GraphQLString) }
    }),
    interfaces: [nodeInterface]
});

const accountType = new GraphQLObjectType({
    name: 'Account',
    fields: () => ({
        id: globalIdField('Account'),
        number: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
    }),
    interfaces: [nodeInterface]
});

const storeType = new GraphQLObjectType({
    name: 'Store',
    fields: () => ({
        id: globalIdField('Store'),
        name: { type: new GraphQLNonNull(GraphQLString) },
        invoices: {
            type: invoicesConnection,
            args: {
                ...connectionArgs,
            },
            resolve: (store, { ...args }) =>
                connectionFromPromisedArray(database.Invoices.getInvoicesByStore(fromGlobalId(store.id).id), args)
        },
        invoicesByDate: {
            type: invoicesConnection,
            args: {
                startDate: { type: new GraphQLNonNull(GraphQLDate) },
                endDate: { type: new GraphQLNonNull(GraphQLDate) },
                ...connectionArgs,
            },
            resolve: (store, { startDate, endDate, ...args }) =>
                connectionFromPromisedArray(database.Invoices.getInvoicesByStoreByRange(fromGlobalId(store.id).id, startDate, endDate), args)
        }
    }),
    interfaces: [nodeInterface]
});

const invoiceType = new GraphQLObjectType({
    name: 'Invoice',
    fields: () => ({
        id: globalIdField('Invoice'),
    }),
    interfaces: [nodeInterface]
});

const { connectionType: invoicesConnection, edgeType: invoicesEdge } = connectionDefinitions({ name: 'Invoices', nodeType: invoiceType });

export const schema = new GraphQLSchema({
    query: Query,
});