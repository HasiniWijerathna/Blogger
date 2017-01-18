import url from 'url-join';

import config from '../../../config';

const API_BASE = config.baseURL;
const API_PREFIX = config.apiPrefix;
const BASE = url(API_BASE, API_PREFIX);

const loginURL = () => url(BASE, 'auth/login');
const registerURL = () => url(BASE, 'auth/register');

const modelURL = (modelName, resourceId) => {
  let modelURL = url(BASE, modelName);

  if (resourceId) {
    modelURL = url(modelURL, `${resourceId}`);
  }

  return modelURL;
};

export {loginURL, registerURL};
