import axios from 'axios';

import {getSession} from './SessionService';

const generateHeaders = () => {
  const session = getSession();
  const headers = {};

  if (session.authenticated) {
    headers['Authorization'] = `Bearer: ${session.token}`;
  }

  return headers;
};

const get = (url, params) => {
  const headers = generateHeaders();

  return axios.get(url, {
    headers,
    params,
  });
};

const post = (url, data) => {
  const headers = generateHeaders();

  return axios.post(url, data, {headers});
};

const put = (url, data) => {
  const headers = generateHeaders();

  return axios.put(url, data, {headers});
};

const httDelete = (url, params) => {
  const headers = generateHeaders();

  return axios.delete(url, {
    headers,
    params,
  });
};

export {get, post, put, httDelete};
