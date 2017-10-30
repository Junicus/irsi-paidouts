import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
export const AccountSchema = mongoose.Schema({
    number: String,
    name: String
});
