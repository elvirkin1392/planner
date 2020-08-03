import {CognitoUserPool} from "amazon-cognito-identity-js";

import config from "./config";

const poolData = {
  UserPoolId: config.AWS_USER_POOL_ID,
  ClientId: config.AWS_CLIENT_ID
}

export const UserPool = new CognitoUserPool(poolData);
