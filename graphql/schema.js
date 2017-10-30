import { GraphQLSchema } from 'graphql';
import { RootQueryType } from './types/rootqueryType';
import { RootMutationType } from './mutations/rootMutation';

const Schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
});

export default Schema;