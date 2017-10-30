import {
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLObjectType
} from 'graphql';
import { StoreType } from './storeType';

export const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        email: {
            type: new GraphQLNonNull(GraphQLString)
        },
        store: {
            type: new GraphQLNonNull(StoreType)
        }
    }
});
