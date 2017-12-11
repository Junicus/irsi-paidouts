import mongoose from 'mongoose';

import { InvoiceSchema } from './schemas/invoiceSchema';
import { AccountSchema } from './schemas/accountSchema';
import { VendorSchema } from './schemas/vendorSchema';
import { StoreSchema } from './schemas/storeSchema';
import { UserSchema } from './schemas/userSchema';

//mongoose models
export const Invoice = mongoose.model('invoice', InvoiceSchema);
export const Account = mongoose.model('account', AccountSchema);
export const Vendor = mongoose.model('vendor', VendorSchema);
export const Store = mongoose.model('store', StoreSchema);
export const User = mongoose.model('user', UserSchema);
