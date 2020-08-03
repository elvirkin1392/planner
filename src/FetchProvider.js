import React from "react";
import { Provider } from "use-http";
import { useSelector } from "react-redux";

import {  selectors as authSelectors} from "./services/auth";
import config from "./config";

export const FetchProvider = (props) => {
  const accessToken = useSelector(authSelectors.getAccessToken);
  
  const fetchOptions = {
    interceptors: {
      request: async ({ options, url, path, route }) => {
        options.headers["Content-Type"] = `application/json`;
        options.headers["Authorization"] = accessToken;
        return options;
      },
      response: async ({ response }) => {
        const res = response;
        return res;
      }
    }
  };
  
  return <Provider url={config.API_HOST} options={fetchOptions} {...props}/>
};
