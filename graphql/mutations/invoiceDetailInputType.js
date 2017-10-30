import {
    GraphQLID,
    GraphQLFloat,
    GraphQLInputObjectType,
    GraphQLNonNull
} from 'graphql';

export const InvoiceDetailInputType = new GraphQLInputObjectType({
    name: 'InvoiceDetailInput',
    fields: {
        account: { type: new GraphQLNonNull(GraphQLID) },
        amount: { type: new GraphQLNonNull(GraphQLFloat) }
    }
});
