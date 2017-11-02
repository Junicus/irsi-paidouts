require('dotenv').config();

const tenantName = process.env.AZURE_TENANT_NAME;
const clientID = process.env.AZURE_CLIENT_ID;

export const credentials = {
    identityMetadata: `https://login.microsoftonline.com/${tenantName}.onmicrosoft.com/.well-known/openid-configuration`,
    clientID
};

console.log(credentials);