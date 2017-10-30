import {
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString
} from 'graphql';

import { AccountType } from '../types/accountType';
import { InvoiceType } from '../types/invoiceType';
import { StoreType } from '../types/storeType';
import { VendorType } from '../types/vendorType';

import { AccountInputType } from './accountInputType';
import { InvoiceInputType } from './invoiceInputType';
import { StoreInputType } from './storeInputType';
import { VendorInputType } from './vendorInputType';

import { operations } from '../../src/loaders';

export const RootMutationType = new GraphQLObjectType({
    name: 'RootMutation',
    description: 'The Root Mutation',
    fields: {
        createAccount: {
            type: AccountType,
            args: {
                input: { type: AccountInputType }
            },
            resolve(_, args, ctx) {
                const { input } = args;
                return operations.account.createAccount(input, ctx);
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
                return operations.store.createStore(input, ctx);
            }
        },
        createVendor: {
            type: VendorType,
            args: {
                input: { type: VendorInputType }
            },
            resolve(_, args, ctx) {
                const { input } = args;
                return operations.vendor.createVendor(input, ctx);
            }
        }
    }
});