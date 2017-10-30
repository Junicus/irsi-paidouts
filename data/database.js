import * as tables from './tables';

export const Stores = {
    getStore: (id) => {
        return new Promise((resolve, reject) => {
            console.log('find by id', id);
            tables.Store.findById(id).then((doc) => resolve(doc), (err) => reject(err));
        });
    },
    getStores: () => {
        return new Promise((resolve, reject) => {
            tables.Store.find({}).then((doc) => resolve(doc), (err) => reject(err));
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

export const Invoices = {
    getInvoice: (id) => {
        return new Promise((resolve, reject) => {
            tables.Invoice.findById(id).then((doc) => resolve(doc), (err) => reject(err));
        });
    },
    getInvoices: () => {
        return new Promise((resolve, reject) => {
            tables.Invoice.find({}).then((docs) => resolve(docs), (err) => reject(err));
        });
    },
    getInvoicesByStore: (storeId) => {
        return new Promise((resolve, reject) => {
            tables.Invoice.find({ storeId }).then((docs) => resolve(docs), (err) => reject(err));
        });
    },
    getInvoicesByStoreByRange: (storeId, startDate, endDate) => {
        return new Promise((resolve, reject) => {
            tables.Invoice.find({ storeId }).then((docs) => resolve(docs), (err) => reject(err));
        });
    },
    createInvoice: (args, ctx) => {
        return new Promise((resolve, reject) => {
            const { storeId, vendorId, detail } = args;
            let invoice = new tables.invoice({
                storeId,
                created_at: Date.now(),
                vendor: vendorId,
                detail
            });
            invoice.save().then((doc) => resolve(doc), (err) => reject(err));
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