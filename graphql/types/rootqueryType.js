import {
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString
} from 'graphql';

import { StoreType } from './storeType';
import { UserType } from './userType';
import { VendorType } from './vendorType';
import { AccountType } from './accountType';

import { operations } from '../../src/loaders';

export const RootQueryType = new GraphQLObjectType({
    name: 'RootQuery',
    description: 'The Root Query',
    fields: {
        viewer: {
            type: UserType,
        },
        store: {
            type: StoreType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(query, args, ctx) {
                return { id: 'id' }
            }
        },
        stores: {
            type: new GraphQLList(StoreType),
            resolve: () => {
                return operations.store.getStores();
            }
        },
        vendors: {
            type: new GraphQLList(VendorType),
            resolve: () => {
                return operations.vendor.getVendors();
            }
        },
        accounts: {
            type: new GraphQLList(AccountType),
            resolve: () => {
                return operations.account.getAccounts();
            }
        }
    }
});