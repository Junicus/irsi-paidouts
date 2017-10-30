import express from 'express';
import graphQLHTTP from 'express-graphql';
import { addMockFunctionsToSchema } from 'graphql-tools';
import './src/database';

import * as tables from './src/tables';

import schema from './graphql/schema';
import mocks from './graphql/mocks';

console.log({ starting: true });

const PORT = 3001;
const app = express();

let useGraphiql = false;
/*if (process.env.NODE_ENV === 'development') {
    useGraphiql = true;
    addMockFunctionsToSchema({
        schema,
        mocks
    });
}*/

app.use('/graphql', graphQLHTTP({
    schema,
    graphiql: useGraphiql
}));

app.listen(PORT, () => {
    console.log({ listening: PORT, running: true });
});