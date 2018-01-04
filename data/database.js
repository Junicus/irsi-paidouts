import * as tables from './tables';
import mongoose from 'mongoose';

export const Users = {
  getUser: (id) => {
    return new Promise((resolve, reject) => {
      tables.User.findById(id).then((doc) => resolve(doc), (err) => reject(err));
    });
  },
  getUserBySub: (sub) => {
    return new Promise((resolve, reject) => {
      tables.User.findOne({ sub: sub }).then(doc => resolve(doc), err => reject(err));
    });
  },
  createUser: (user) => {
    return new Promise((resolve, reject) => {
      let newUser = new tables.User({
        sub: user.sub,
        name: user.name,
        email: user.unique_name,
        isAdmin: false
      });
      newUser.save().then((doc) => resolve(doc), (err) => reject(err));
    });
  }
}

export const Stores = {
  getStore: (id) => {
    return new Promise((resolve, reject) => {
      tables.Store.findById(id).then((doc) => resolve(doc), (err) => reject(err));
    });
  },
  getStores: () => {
    return new Promise((resolve, reject) => {
      tables.Store.find({}).then((doc) => resolve(doc), (err) => reject(err));
    });
  },
  getStoresByUser: (id) => {
    return new Promise((resolve, reject) => {
      tables.User.findById(id).populate('stores').then((doc) => {
        resolve(doc.stores);
      }, (err) => reject(err));
    });
  },
  createStore: (args, ctx) => {
    return new Promise((resolve, reject) => {
      const { name } = args;
      let store = new tables.Store({
        name
      });
      store.save().then((doc) => resolve(doc), (err) => reject(err));
    });
  }
};

export const PaidOuts = {
  getPaidOut: (id) => {
    return new Promise((resolve, reject) => {
      tables.PaidOut.findById(id).then((doc) => resolve(doc), (err) => reject(err));
    });
  },
  getPaidOuts: () => {
    return new Promise((resolve, reject) => {
      tables.PaidOut.find({}).then((docs) => resolve(docs), (err) => reject(err));
    });
  },
  getPaidOutsByStore: (store) => {
    return new Promise((resolve, reject) => {
      tables.PaidOut.find({ store })
        .populate('vendor')
        .populate('store')
        .then(docs => resolve(docs))
        .catch(err => reject(err));
    });
  },
  getPaidOutsByStoreByRange: (store, startDate, endDate) => {
    return new Promise((resolve, reject) => {
      tables.PaidOut.find({ store, created_at: { "$gte": startDate, "$lte": endDate } })
        .populate('vendor')
        .populate('store')
        .then(docs => resolve(docs))
        .catch(err => reject(err));
    });
  },
  createPaidOut: (args, ctx) => {
    return new Promise((resolve, reject) => {
      const { storeId, created_at, vendorId, details } = args;
      console.log(details);
      let paidout = new tables.PaidOut({
        store: mongoose.Types.ObjectId(storeId),
        created_at: created_at,
        vendor: mongoose.Types.ObjectId(vendorId),
        details: details.map((d) => ({
          account: mongoose.Types.ObjectId(d.accountId),
          amount: d.amount
        }))
      });
      paidout.save()
        .then((doc) => tables.Vendor.populate(doc, { path: 'vendor', model: 'vendor' }))
        .then((doc) => tables.Store.populate(doc, { path: 'store', model: 'store' }))
        .then((doc) => {
          return Promise.all(doc.details.map((detail) => tables.Account.populate(detail, { path: 'account', model: 'account' })))
            .then((values) => doc)
            .catch(err => reject(err));
        })
        .then((doc) => resolve(doc))
        .catch(err => reject(err));
    });
  }
};

export const Vendors = {
  getVendor: (id) => {
    return new Promise((resolve, reject) => {
      tables.Vendor.findById(id).then((doc) => resolve(doc), (err) => reject(err));
    });
  },
  getVendors: () => {
    return new Promise((resolve, reject) => {
      tables.Vendor.find({}).then((docs) => resolve(docs), (err) => reject(err));
    });
  },
  createVendor: (args, ctx) => {
    return new Promise((resolve, reject) => {
      const { name } = args;
      let vendor = new tables.Vendor({
        name
      });
      vendor.save().then((doc) => resolve(doc), (err) => reject(err));
    });
  }
}

export const Accounts = {
  getAccount: (id) => {
    return new Promise((resolve, reject) => {
      tables.Account.findById(id).then((doc) => resolve(doc), (err) => reject(err));
    });
  },
  getAccounts: () => {
    return new Promise((resolve, reject) => {
      tables.Account.find({}).then((docs) => resolve(docs), (err) => reject(err));
    });
  },
  createAccount: (args, ctx) => {
    return new Promise((resolve, reject) => {
      const { name } = args;
      let Account = new tables.Account({
        name
      });
      Account.save().then((doc) => resolve(doc), (err) => reject(err));
    });
  }
}