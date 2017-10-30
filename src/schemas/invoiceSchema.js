import mongoose from 'mongoose';
import { InvoiceDetailSchema } from './invoiceDetailSchema';

mongoose.Promise = global.Promise;
export const InvoiceSchema = mongoose.Schema({
    invoiceId: String,
    storeId: String,
    created_at: Date,
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'vendor' },
    detail: [InvoiceDetailSchema]
});
