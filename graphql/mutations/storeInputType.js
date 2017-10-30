import {
    GraphQLString,
    GraphQLNonNull,
    GraphQLInputObjectType
} from 'graphql';

export const StoreInputType = new GraphQLInputObjectType({
    name: 'StoreInput',
    fields: {
        name: { type: new GraphQLNonNull(GraphQLString) }
    }
});
