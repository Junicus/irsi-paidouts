import {
  GraphQLID,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInputObjectType
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
  connectionFromPromisedArray,
  connectionFromArray
} from 'graphql-relay';

import * as database from '../data/database';

import { Vendor, Account, Store, PaidOut, User } from '../data/tables';

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
      case 'PaidOut':
        return database.PaidOuts.getPaidOut(id);
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
    if (obj instanceof PaidOut) {
      return paidoutType;
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
        return connectionFromPromisedArray(database.Stores.getStoresByUser(user.id), args);
      }
    },
    store: {
      type: storeType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve: (_, { id }) => {
        return database.Stores.getStore(fromGlobalId(id).id);
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
    paidouts: {
      type: paidoutsConnection,
      args: {
        ...connectionArgs,
      },
      resolve: (store, { ...args }) =>
        connectionFromPromisedArray(database.PaidOuts.getPaidOutsByStore(fromGlobalId(store.id).id), args)
    },
    paidoutsByDate: {
      type: paidoutsConnection,
      args: {
        startDate: { type: new GraphQLNonNull(GraphQLDate) },
        endDate: { type: new GraphQLNonNull(GraphQLDate) },
        ...connectionArgs,
      },
      resolve: (store, { startDate, endDate, ...args }) =>
        connectionFromPromisedArray(database.PaidOuts.getPaidOutsByStoreByRange(fromGlobalId(store.id).id, startDate, endDate), args)
    }
  }),
  interfaces: [nodeInterface]
});

const paidoutType = new GraphQLObjectType({
  name: 'PaidOut',
  fields: () => ({
    id: globalIdField('PaidOut'),
    store: { type: storeType },
    created_at: { type: GraphQLDate },
    vendor: { type: vendorType },
    details: { type: GraphQLList(paidoutDetailType) }
  }),
  interfaces: [nodeInterface]
});

const paidoutDetailType = new GraphQLObjectType({
  name: 'PaidOutDetail',
  fields: () => ({
    id: globalIdField('PaidOutDetail'),
    account: { type: accountType },
    amount: { type: GraphQLFloat }
  }),
  interfaces: [nodeInterface]
});

const { connectionType: paidoutsConnection, edgeType: paidoutsEdge } = connectionDefinitions({ name: 'PaidOuts', nodeType: paidoutType });
const { connectionType: paidoutsDetailConnection, edgeType: paidoutsDetailEdge } = connectionDefinitions({ name: 'PaidOutsDtail', nodeType: paidoutDetailType });
const { connectionType: storesConnection, edgeType: storesEdge } = connectionDefinitions({ name: 'Stores', nodeType: storeType });

const createPaidOutDetailInputType = new GraphQLInputObjectType({
  name: 'CreatePaidOutDetailInput',
  fields: () => ({
    accountId: { type: new GraphQLNonNull(GraphQLString) },
    amount: { type: new GraphQLNonNull(GraphQLFloat) }
  })
});

const createPaidOutInputType = new GraphQLInputObjectType({
  name: 'CreatePaidOutInput',
  fields: () => ({
    storeId: { type: new GraphQLNonNull(GraphQLString) },
    created_at: { type: new GraphQLNonNull(GraphQLDate) },
    vendorId: { type: new GraphQLNonNull(GraphQLID) },
    details: { type: new GraphQLList(createPaidOutDetailInputType) }
  })
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createPaidOut: {
      type: paidoutType,
      args: {
        input: { type: new GraphQLNonNull(createPaidOutInputType) },
      },
      resolve: (mutation, { input, ...args }, ctx) => {
        const { storeId, vendorId, details } = input;
        const newStoreId = fromGlobalId(storeId).id;
        const newVendorId = fromGlobalId(vendorId).id;

        const newDetail = details.map((d) => ({
          accountId: fromGlobalId(d.accountId).id,
          amount: `${d.amount}`,
        }));

        const payload = {
          ...input,
          storeId: newStoreId,
          vendorId: newVendorId,
          details: newDetail
        };

        return database.PaidOuts.createPaidOut(payload, ctx).then((doc) => doc);
      }
    }
  }),
});

export const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});