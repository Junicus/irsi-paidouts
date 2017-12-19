import mongoose from 'mongoose';
import { PaidOutDetailSchema } from './paidoutDetailSchema';

mongoose.Promise = global.Promise;
export const PaidOutSchema = mongoose.Schema({
    storeId: String,
    created_at: Date,
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'vendor' },
    detail: [PaidOutDetailSchema]
});
