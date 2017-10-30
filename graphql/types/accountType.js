import {
    GraphQLID,
    GraphQLNonNull,
    GraphQLString,
    GraphQLObjectType
} from 'graphql';

export const AccountType = new GraphQLObjectType({
    name: 'Account',
    description: 'The GL account',
    fields: {
        _id: { type: new GraphQLNonNull(GraphQLID) },
        number: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) }
    }
});