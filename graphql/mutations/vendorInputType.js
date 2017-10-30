import {
    GraphQLString,
    GraphQLNonNull,
    GraphQLInputObjectType
} from 'graphql';

export const VendorInputType = new GraphQLInputObjectType({
    name: 'VendorInput',
    fields: {
        name: { type: new GraphQLNonNull(GraphQLString) }
    }
});
