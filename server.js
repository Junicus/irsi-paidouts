import express from 'express';
import graphQLHTTP from 'express-graphql';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { Mockgoose } from 'mockgoose';
import { schema } from './graphql/schema';

mongoose.Promise = global.Promise;

const graphQLServer = express();
graphQLServer.set('port', (process.env.API_PORT || 3001));

graphQLServer.use(morgan('dev'));

graphQLServer.use(bodyParser.json());
graphQLServer.use(cors());

graphQLServer.use('/graphql', graphQLHTTP({
    schema,
    pretty: true,
    graphiql: true
}));

graphQLServer.use(function redirect(req, res) {
    res.redirect('/graphql');
});

if (process.env.MONGO_URI) {
    mongoose.connect(`${process.env.MONGO_URI}paidouts`, { useMongoClient: true }).then(
        () => console.log('connected to mongo'),
        (err) => console.error(err)
    );
} else {
    const mockgoose = new Mockgoose(mongoose);
    mockgoose.prepareStorage().then(() => {
        mongoose.connect('mongodb://localhost/paidouts', { useMongoClient: true }).then(
            () => console.log('connected to mongo'),
            (err) => console.error(err));
    });
}

export default graphQLServer;