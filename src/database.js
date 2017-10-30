import Sequalize from 'sequelize';
import mongoose from 'mongoose';

// mongo database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/paidouts', { useMongoClient: true }).then(
    () => console.log('connected to mongo'),
    (err) => console.error(err)
)