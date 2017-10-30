import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
export const VendorSchema = mongoose.Schema({
    name: String
});
