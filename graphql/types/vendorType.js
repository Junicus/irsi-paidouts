import {
    GraphQLID,
    GraphQLNonNull,
    GraphQLString,
    GraphQLObjectType
} from 'graphql';

export const VendorType = new GraphQLObjectType({
    name: 'Vendor',
    description: 'A vendor used at the store',
    fields: {
        _id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) }
    }
});