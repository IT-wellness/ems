import { ConfidentialClientApplication } from "@azure/msal-node";
import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = ['CLIENT_ID', 'TENANT_ID', 'CLIENT_SECRET'];
for (const varName of requiredEnvVars) {
  if (!process.env[varName]) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
}

const msalConfig = {
  auth: {
    clientId: process.env.CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
    clientSecret: process.env.CLIENT_SECRET,
  },
  system: {
    loggerOptions: {
      loggerCallback(loglevel, message, containsPii) {
        if (!containsPii) console.log(`[MSAL] ${message}`);
      },
      piiLoggingEnabled: false,
      logLevel: 3 // Info
    }
  }
};

const msalClient = new ConfidentialClientApplication(msalConfig);
export default msalClient;