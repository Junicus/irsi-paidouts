import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
export const PaidOutDetailSchema = mongoose.Schema({
    accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'account' },
    amount: { type: mongoose.Schema.Types.Decimal128 }
});