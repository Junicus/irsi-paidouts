import { Account } from '../tables';

export const createAccount = (args, ctx) => {
    var { number, name } = args;
    var account = new Account({
        number,
        name
    });
    return account.save();
};

export const getAccount = (key) => {
    return Account.find({ _id: key });
};

export const getAccounts = () => {
    return Account.find({});
};
