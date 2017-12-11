require('dotenv').config();

const tenantID = process.env.AZURE_TENANT_ID;
const clientID = process.env.AZURE_CLIENT_ID;

export const credentials = {
    identityMetadata: `https://login.microsoftonline.com/${tenantID}/.well-known/openid-configuration`,
    clientID
};