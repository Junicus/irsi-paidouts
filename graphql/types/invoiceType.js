import {
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLString,
    GraphQLFloat
} from 'graphql';
import { GraphQLDate } from 'graphql-iso-date';
import { InvoiceDetailType } from './invoiceDetailType';
import { VendorType } from './vendorType';
import { StoreType } from './storeType';

export const InvoiceType = new GraphQLObjectType({
    name: 'Invoice',
    fields: () => ({
        _id: {
            type: new GraphQLNonNull(GraphQLID),
            resolve(invoice) {
                return invoice.invoiceId;
            }
        },
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
    })
});
