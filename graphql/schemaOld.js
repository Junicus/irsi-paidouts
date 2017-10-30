import { GraphQLSchema } from 'graphql';

import {
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInputObjectType
} from 'graphql';

import {
    GraphQLDate
} from 'graphql-iso-date';

import {
    connectionDefinitions,
    connectionArgs,
    connectionFromArray,
    nodeDefinitions,
    globalIdField,
    fromGlobalId,
} from 'graphql-relay';

import * as database from '../data/database';

const { nodeInterface, nodeField } = nodeDefinitions(
    (globalId) => {
        const { type, id } = fromGlobalId(globalId);
        switch (type) {
            case 'Store':
                return database.Stores.getStore(id);
            case 'Vendor':
                return database.Vendors.getVendor(id);
            case 'Account':
                return database.Accounts.getAccount(id);
            case 'Invoice':
                return database.Invoices.getInvoice(id);
        }
        return null;
    },
    (obj) => {
        if (obj instanceof Store) {
            return StoreType;
        }
        if (obj instanceof Vendor) {
            return VendorType;
        }
        if (obj instanceof Account) {
            return AccountType;
        }
        if (obj instanceof Invoice) {
            return InvoiceType;
        }
        return null;
    }
);

const AccountInputType = new GraphQLInputObjectType({
    name: 'AccountInput',
    fields: () => ({
        number: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) }
    })
});

const InvoiceDetailInputType = new GraphQLInputObjectType({
    name: 'InvoiceDetailInput',
    fields: () => ({
        account: { type: new GraphQLNonNull(GraphQLID) },
        amount: { type: new GraphQLNonNull(GraphQLFloat) }
    })
});

const InvoiceInputType = new GraphQLInputObjectType({
    name: 'InvoiceInput',
    fields: () => ({
        storeId: { type: new GraphQLNonNull(GraphQLID) },
        vendorId: { type: new GraphQLNonNull(GraphQLID) },
        detail: { type: new GraphQLNonNull(InvoiceDetailInputType) }
    })
});

const StoreInputType = new GraphQLInputObjectType({
    name: 'StoreInput',
    fields: () => ({
        name: { type: new GraphQLNonNull(GraphQLString) }
    })
});

const VendorInputType = new GraphQLInputObjectType({
    name: 'VendorInput',
    fields: () => ({
        name: { type: new GraphQLNonNull(GraphQLString) }
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        email: {
            type: new GraphQLNonNull(GraphQLString)
        },
        store: {
            type: new GraphQLNonNull(StoreType)
        }
    })
});

const AccountType = new GraphQLObjectType({
    name: 'Account',
    description: 'The GL account',
    fields: () => ({
        id: globalIdField('Account'),
        number: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) }
    }),
    interfaces: [nodeInterface]
});

const {
    connectionType: InvoicesConnection,
    edgeType: InvoiceEdge
} = connectionDefinitions({
        name: 'Invoices',
        nodeType: InvoiceType
    });

const StoreType = new GraphQLObjectType({
    name: 'Store',
    fields: () => ({
        id: globalIdField('Store'),
        name: { type: new GraphQLNonNull(GraphQLString) },
        invoices: {
            type: InvoicesConnection,
            args: {
                ...connectionArgs
            },
            resolve: (obj, args, ctx) => {
                console.log(obj);
                console.log(ctx);
                connectionFromArray(getInvoices(obj.id), args);
            }
        },
        invoicesByDate: {
            type: new GraphQLList(InvoiceType),
            args: {
                startDate: { type: new GraphQLNonNull(GraphQLDate) },
                endDate: { type: new GraphQLNonNull(GraphQLDate) }
            },
            resolve: (store, args) => {
                return [];
            }
        }
    }),
    interfaces: [nodeInterface]
});

const InvoiceDetailType = new GraphQLObjectType({
    name: 'InvoiceDetail',
    fields: () => ({
        account: {
            type: new GraphQLNonNull(AccountType)
        },
        amount: {
            type: new GraphQLNonNull(GraphQLFloat)
        }
    })
});


const InvoiceType = new GraphQLObjectType({
    name: 'Invoice',
    fields: () => ({
        id: globalIdField('Invoice'),
        store: { type: new GraphQLNonNull(StoreType) },
        createdAt: {
            type: new GraphQLNonNull(GraphQLDate),
            resolve(invoice) {
                return invoice.created_at;
            }
        },
        vendor: { type: new GraphQLNonNull(VendorType) },
        detail: { type: new GraphQLList(InvoiceDetailType) },
        amount: { type: new GraphQLNonNull(GraphQLFloat) }
    }),
    interfaces: [nodeInterface]
});

const VendorType = new GraphQLObjectType({
    name: 'Vendor',
    description: 'A vendor used at the store',
    fields: () => ({
        id: globalIdField('Vendor'),
        name: { type: new GraphQLNonNull(GraphQLString) }
    }),
    interfaces: [nodeInterface]
});

const RootQueryType = new GraphQLObjectType({
    name: 'RootQuery',
    description: 'The Root Query',
    fields: () => ({
        viewer: {
            type: UserType,
        },
        node: nodeField,
    })
});

/*const RootMutationType = new GraphQLObjectType({
    name: 'RootMutation',
    description: 'The Root Mutation',
    fields: () => ({
        createAccount: {
            type: AccountType,
            args: {
                input: { type: AccountInputType }
            },
            resolve(_, args, ctx) {
                const { input } = args;
                return database.Accounts.createAccount(input, ctx);
            }
        },
        createInvoice: {
            type: InvoiceType,
            args: {
                input: { type: InvoiceInputType }
            },
            resolve(_, args, ctx) {
                const { input } = args;
                console.log(input);
            }
        },
        createStore: {
            type: StoreType,
            args: {
                input: { type: StoreInputType }
            },
            resolve(_, args, ctx) {
                const { input } = args;
                return database.Stores.createStore(input, ctx);
            }
        },
        createVendor: {
            type: VendorType,
            args: {
                input: { type: VendorInputType }
            },
            resolve(_, args, ctx) {
                const { input } = args;
                return database.Vendors.createVendor(input, ctx);
            }
        }
    })
});*/

const Schema = new GraphQLSchema({
    query: RootQueryType,
    //mutation: RootMutationType
});

export default Schema;