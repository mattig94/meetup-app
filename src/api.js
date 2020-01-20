import { mockEvents } from "./mock-events";

async function getSuggestions(query) {
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

async function getEvents(lat, lon) {
  return mockEvents.events;
}

export { getSuggestions, getEvents };