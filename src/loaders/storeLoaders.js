import { Store } from '../tables';

export const createStore = (args, ctx) => {
    var { name } = args;
    var store = new Store({
        name
    });
    return store.save();
};

export const getStore = (key) => {
    return Store.find({ _id: key });
};

export const getStores = () => {
    return Store.find({});
};
