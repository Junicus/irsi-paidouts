import { DECLARE_RESOURCES } from '../../actions/resourceActions';

const initialState = {};

export default (
    previousState = initialState,
    action,
) => {
    if (action.type === DECLARE_RESOURCES) {
        const newState = action.payload.reduce(
            (acc, resource) => ({
                ...acc,
                [resource.name]: {
                    props: resource,
                    data: () => { },
                    list: () => { }
                }
            }), {});
        return newState;
    }

    return previousState;
}

export const getResources = state =>
    Object.keys(state).map(key => state[key].props);