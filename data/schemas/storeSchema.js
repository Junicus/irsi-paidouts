import mongoose from 'mongoose';
import { PaidOutSchema } from './paidoutSchema';

mongoose.Promise = global.Promise;
export const StoreSchema = mongoose.Schema({
    name: String,
    paidouts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'paidout' }]
});
