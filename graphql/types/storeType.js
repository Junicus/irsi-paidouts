import {
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLObjectType
} from 'graphql';
import { GraphQLDate } from 'graphql-iso-date';
import { InvoiceType } from './invoiceType';

export const StoreType = new GraphQLObjectType({
    name: 'Store',
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        invoices: {
            type: new GraphQLList(InvoiceType),
            resolve() {
                return [];
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
    })
});
