import axios from 'axios';
import { mockEvents } from "./mock-events";

async function getSuggestions(query) {
  if (window.location.href.startsWith('http://localhost')) {
    return [
      {
        city: 'Manchester',
        country: 'gb',
        localized_country_name: 'United Kingdom',
        name_string: 'Manchester, Greater Manchester, United Kingdom',
        zip: 'M2 5AS',
        lat: 53.48,
        lon: -2.25
      },
      {
        city: 'Manchester',
        country: 'us',
        localized_country_name: 'USA',
        state: 'NH',
        name_string: 'Manchester, New Hampshire, USA',
        zip: '03101',
        lat: 42.99,
        lon: -71.47
      }
    ];
  }
  const token = await getAccessToken();
  if (token) {
    const url = 'https://api.meetup.com/find/locations?&sign=true&photo-host=public&query='
      + query
      + '&access_token=' + token;
    const result = await axios.get(url);
    return result.data;
  }
  return [];
}

async function getEvents(lat, lon) {
  if (window.location.href.startsWith('http://localhost')) {
    return mockEvents.events;
  }
  const token = await getAccessToken();
  if (token) {
    let url = 'https://api.meetup.com/find/upcoming_events?&sign=true&photo-host=public'
      + '&access_token=' + token;
      //lat, lon is optional; if you have a lat and lon you can add them
      if (lat && lon) {
        url += '&lat=' + lat + '&lon=' + lon;
      }
      const result = await axios.get(url);
      return result.data.events;
  }
}

async function getAccessToken() {
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    if (!code) {
      window.location.href = 'https://secure.meetup.com/oauth2/authorize?client_id=ab6cq5bspu5ej2p1qtp7pknvjr&response_type=code&redirect_uri=https://mattig94.github.io/meetup-app/';
      return null;
    }
    return getOrRenewAccessToken('get', code);
  }
  const lastSavedTime = localStorage.getItem('last_saved_time');
  if (accessToken && (Date.now() - lastSavedTime < 3600000)) {
    return accessToken;
  }
  //if this access_token is expired, we try to renew it by using refresh_token
  const refreshToken = localStorage.getItem('refresh_token');
  return getOrRenewAccessToken('renew', refreshToken);
}

async function getOrRenewAccessToken(type, key) {
  let url;
  if (type === 'get') {
    //Lambda endpoint to get token by code
    url = 'https://3ww9exeah4.execute-api.us-east-1.amazonaws.com/dev/api/token/'
      + key;
  } else if (type === 'renew') {
    //Lambda endpoint to get token by refresh_token
    url = 'https://3ww9exeah4.execute-api.us-east-1.amazonaws.com/dev/api/refresh/'
      + key;
  }
  //use axios to make a GET request to the endpoint
  const tokenInfo = await axios.get(url);
  //save tokens to localStorage together with a timestamp
  localStorage.setItem('access_token', tokenInfo.data.access_token);
  localStorage.setItem('refresh_token', tokenInfo.data.refresh_token);
  localStorage.setItem('last_saved_time', Date.now());
  //return the access_token
  return tokenInfo.data.access_token;
}

export { getSuggestions, getEvents };