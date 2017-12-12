import mongoose from 'mongoose';
import { StoreSchema } from './storeSchema';

mongoose.Promise = global.Promise;
export const UserSchema = mongoose.Schema({
    sub: String,
    name: String,
    email: String,
    isAdmin: Boolean,
    stores: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'store'
    }]
});
