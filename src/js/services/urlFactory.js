import url from 'url-join';

import config from '../../../config';

const API_BASE = config.api.baseURL;
const API_PREFIX = config.api.apiPrefix;
const BASE = url(API_BASE, API_PREFIX);

/* URL for login page */
const loginURL = () => url(BASE, 'auth/login');

/* URL for Registration page */
const registerURL = () => url(BASE, 'auth/register');

/**
* Returns the modelURL
* @param  {String} modelName  The model name
* @param  {Integer} resourceId The resourceId
* @return {String}            The model url
*/
const modelURL = (modelName, resourceId) => {
  let modelURL = url(BASE, modelName);

  if (resourceId) {
    modelURL = url(modelURL, `${resourceId}`);
  }

  return modelURL;
};

const modelLikeURL = (modelURL) => {
  const modelLikeURL = url(modelURL, 'like');

  return modelLikeURL;
};

export {loginURL, registerURL, modelURL, modelLikeURL};
