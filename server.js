require('dotenv').config();
import express from 'express';
import graphQLHTTP from 'express-graphql';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { Mockgoose } from 'mockgoose';
import { schema } from './graphql/schema';
import passport from 'passport';
import { BearerStrategy } from 'passport-azure-ad';

import { credentials } from './config';

const options = {
    identityMetadata: credentials.identityMetadata,
    clientID: credentials.clientID,
    issuer: credentials.issuer,
    audience: credentials.issuer,
    validateIssuer: true,
    passReqToCallback: false
};

const users = [];
let owner = null;

const serverPort = process.env.PORT || 3001;

mongoose.Promise = global.Promise;

const graphQLServer = express();
graphQLServer.set('port', (process.env.API_PORT || 3001));

graphQLServer.use(morgan('dev'));

graphQLServer.use(bodyParser.json());
graphQLServer.use(cors());

graphQLServer.use(passport.initialize());
graphQLServer.use(passport.session());

const findById = (id, fn) => {
    const user = users.find((user) => { return user.sub === id });
    if (user) {
        return fn(null, user);
    }
    return fn(null, null);
}

const authenticationStrategy = new BearerStrategy(options, (token, done) => {
    findById(token.sub, (err, user) => {
        if (err) {
            console.log(err);
            return done(err);
        }
        if (!user) {
            users.push(token);
            owner = token.sub;
            return done(null, token);
        }
        owner = token.sub;
        return done(null, user, token);
    });
});

passport.use(authenticationStrategy);

graphQLServer.use('/graphql', passport.authenticate('oauth-bearer', { session: false }), graphQLHTTP({
//graphQLServer.use('/graphql', graphQLHTTP({
    schema,
    pretty: true,
    graphiql: true
}));

graphQLServer.use('/graphql2', graphQLHTTP({
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