import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
    GraphQLBoolean
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

import { Vendor, Account, Store, Invoice, User } from '../data/tables';

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
            case 'User':
                return database.Users.getUser(id);
            default:
                return null;
        }
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
        if (obj instanceof User) {
            return userType;
        }

        return null;
    }
);

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        viewer: {
            type: userType,
            resolve: (_, args, context) => {
                const { user } = context;
                return database.Users.getUserBySub(user.sub).then((doc) => {
                    if (doc) {
                        return doc;
                    } else {
                        return database.Users.createUser(user).then((doc) => {
                            return doc;
                        });
                    }
                });
            }
        },
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
        }
    })
});

const userType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: globalIdField('User'),
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        isAdmin: { type: new GraphQLNonNull(GraphQLBoolean) },
        stores: {
            type: storesConnection,
            args: {
                ...connectionArgs
            },
            resolve: (user, args) => {
                console.log(user.id)
                return connectionFromPromisedArray(database.Stores.getStoresByUser(user.id), args);
            }
        }
    }),
    interfaces: [nodeInterface]
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
const { connectionType: storesConnection, edgeType: storesEdge } = connectionDefinitions({ name: 'Stores', nodeType: storeType });

export const schema = new GraphQLSchema({
    query: Query,
});