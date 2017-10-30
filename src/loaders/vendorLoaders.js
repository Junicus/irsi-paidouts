import { Vendor } from '../tables';

export const createVendor = (args, ctx) => {
    var { name } = args;
    var vendor = new Vendor({
        name
    });
    return new Promise((resolve, reject) => {
        vendor.save((err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
};

export const getVendor = (key) => {
    return Vendor.find({ _id: key });
};

export const getVendors = () => {
    return Vendor.find().exec();

};
