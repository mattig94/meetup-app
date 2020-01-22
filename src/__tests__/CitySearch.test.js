import React from 'react';
import { shallow } from 'enzyme';
import CitySearch from '../CitySearch';

describe('<CitySearch /> component', () => {
  let CitySearchWrapper;
  beforeAll(() => {
    CitySearchWrapper = shallow(<CitySearch updateEvents={() => {}} />)
  });

  test('render test input', () => {
    expect(CitySearchWrapper.find('.city')).toHaveLength(1);
  });

  test('render list of suggestions', () => {
    expect(CitySearchWrapper.find('.suggestions')).toHaveLength(1);
  });

  test('render text input correctly', () => {
    const query = CitySearchWrapper.state('query');
    expect(CitySearchWrapper.find('.city').prop('value')).toBe(query);
  });

  test('change state when test input changes', () => {
    const eventObject = { target: { value: 'Berlin' }};
    CitySearchWrapper.find('.city').simulate('change', eventObject);
    expect(CitySearchWrapper.state('query')).toBe('Berlin');
  });

  test('render list of suggestions correctly', () => {
    const suggestions = CitySearchWrapper.state('suggestions');
    expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(suggestions.length);
    for (let i = 0; i < suggestions.length; i += 1) {
      expect(CitySearchWrapper.find('.suggestions li').at(i).text()).toBe(suggestions[i].name_string);
    }
  });

  test('click on suggestion should change query state and empty list of suggestions', () => {
    CitySearchWrapper.setState({
      suggestions: [
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
      ]
    });
    expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(2);
    CitySearchWrapper.find('.suggestions li').at(1).simulate('click');
    expect(CitySearchWrapper.state('query')).toBe('Manchester, New Hampshire, USA');
    expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(0);
  });
});

describe('<CitySearch /> integration', () => {
  test('get a list of cities when user searches for Manchester', async () => {
    const CitySearchWrapper = shallow(<CitySearch />);
    CitySearchWrapper.find('.city').simulate('change', { target: { value: 'Manchester' } });
    await CitySearchWrapper.update();
    expect(CitySearchWrapper.state('suggestions')).toEqual([
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
    ]);
  });
});