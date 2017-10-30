import {
    GraphQLString,
    GraphQLFloat,
    GraphQLNonNull,
    GraphQLObjectType
} from 'graphql';
import { AccountType } from './accountType';

export const InvoiceDetailType = new GraphQLObjectType({
    name: 'InvoiceDetail',
    fields: {
        account: {
            type: new GraphQLNonNull(AccountType)
        },
        amount: {
            type: new GraphQLNonNull(GraphQLFloat)
        }
    }
});
