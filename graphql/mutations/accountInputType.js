import {
    GraphQLString,
    GraphQLNonNull,
    GraphQLInputObjectType
} from 'graphql';

export const AccountInputType = new GraphQLInputObjectType({
    name: 'AccountInput',
    fields: {
        number: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) }
    }
});
