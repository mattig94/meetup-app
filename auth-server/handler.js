'use strict';

const axios = require('axios');

module.exports.getAccessToken = async (event) => {
  const MEETUP_OAUTH_URL = 'https://secure.meetup.com/oauth2/access'
    + '?client_id=ab6cq5bspu5ej2p1qtp7pknvjr'
    + '&client_secret=qa8rph5bhnrdfepm4ve66amkj2'
    + '&grant_type=authorization_code'
    + '&redirect_uri=https://mattig94.github.io/meetup-app/'
    + '&code=' + event.pathParameters.code;

  const info = await axios.post(MEETUP_OAUTH_URL);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin' : '*'
    },
    body: JSON.stringify({
      access_token: info.data.access_token,
      refresh_token: info.data.refresh_token
    }),
  };
};

module.exports.refreshAccessToken = async (event) => {
  const MEETUP_OAUTH_URL = 'https://secure.meetup.com/oauth2/access'
    + '?client_id=ab6cq5bspu5ej2p1qtp7pknvjr'
    + '&client_secret=qa8rph5bhnrdfepm4ve66amkj2'
    + '&grant_type=refresh_token'
    + '&refresh_token=' + event.pathParameters.code;
  
  const info = await axios.post(MEETUP_OAUTH_URL);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      access_token: info.data.access_token,
      refresh_token: info.data.refresh_token
    }),
  };
};