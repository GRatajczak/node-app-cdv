// tests/helpers.js

const axios = require('axios');
const https = require('https');

const agent = new https.Agent({
  rejectUnauthorized: false,
});

 const getAppUrl = (uri, isPublic, env) => {
  switch (env) {
    //TODO add other envs
    default:
      return `https://localhost:3002${uri}`;
  }
};

 const callApi = async (method, uri, body, options, isPublic, env) => {
  const url = getAppUrl(uri, isPublic, env);
  const conf = { ...options, httpsAgent: agent };
  switch (method) {
    case "post":
      return axios.post(url, body, conf);
    case "put":
      return axios.put(url, body, conf);
    case "patch":
      return axios.patch(url, body, conf);
    case "delete":
      return axios.delete(url, conf);
    default:
      return await axios.get(url, conf);
  }
};

module.exports = callApi;
