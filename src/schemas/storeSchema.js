import mongoose from 'mongoose';
import { InvoiceSchema } from './invoiceSchema';

mongoose.Promise = global.Promise;
export const StoreSchema = mongoose.Schema({
    name: String,
    invoices: [InvoiceSchema]
});
