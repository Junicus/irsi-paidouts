export const DECLARE_RESOURCES = 'IRSI/DECLARE_RESOURCE';

export const declareResources = resource => ({
    type: DECLARE_RESOURCES,
    payload: resource
})