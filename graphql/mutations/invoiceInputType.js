import {
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInputObjectType
} from 'graphql';

import { InvoiceDetailInputType } from './invoiceDetailInputType';

export const InvoiceInputType = new GraphQLInputObjectType({
    name: 'InvoiceInput',
    fields: {
        storeId: { type: new GraphQLNonNull(GraphQLID) },
        vendorId: { type: new GraphQLNonNull(GraphQLID) },
        detail: { type: new GraphQLNonNull(InvoiceDetailInputType) }
    }
});
