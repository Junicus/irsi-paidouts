import mongoose from 'mongoose';

import { AccountSchema } from './schemas/accountSchema';
import { VendorSchema } from './schemas/vendorSchema';
import { StoreSchema } from './schemas/storeSchema';
import { UserSchema } from './schemas/userSchema';
import { PaidOutSchema } from './schemas/paidoutSchema';

//mongoose models
export const PaidOut = mongoose.model('paidout', PaidOutSchema);
export const Account = mongoose.model('account', AccountSchema);
export const Vendor = mongoose.model('vendor', VendorSchema);
export const Store = mongoose.model('store', StoreSchema);
export const User = mongoose.model('user', UserSchema);
