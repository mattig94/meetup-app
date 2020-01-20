import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';

describe('<Event /> component', () => {
  let EventWrapper;
  beforeAll(() => {
    EventWrapper = shallow(<Event event={      
      {
        created: 1578970069000,
        duration: 7200000,
        id: '267896597',
        name: 'MANGIA  Early Valentine Night (bring your own wine) ',
        rsvp_limit: 20,
        date_in_series_pattern: false,
        status: 'upcoming',
        time: 1581030000000,
        local_date: '2020-02-06',
        local_time: '18:00',
        updated: 1578970155000,
        utc_offset: -18000000,
        waitlist_count: 0,
        yes_rsvp_count: 11,
        venue: {
          id: 15467992,
          name: 'Mangia Italian',
          lat: 42.97475814819336,
          lon: -71.46304321289062,
          repinned: false,
          address_1: '33a Elm Street',
          city: 'Manchester',
          country: 'us',
          localized_country_name: 'USA',
          zip: '03101',
          state: 'NH',
        },
        group: {
          created: 1532494067000,
          name: 'Nh Women\'s Shapeup',
          id: 29347114,
          join_mode: 'approval',
          lat: 42.9900016784668,
          lon: -71.47000122070312,
          urlname: 'Nh-Womens-Shapeup',
          who: 'Members',
          localized_location: 'Manchester, NH',
          state: 'NH',
          country: 'us',
          region: 'en_US',
          timezone: 'US/Eastern',
        },
        link: 'https://www.meetup.com/Nh-Womens-Shapeup/events/267896597/',
        description: '',
        visibility: 'public',
        member_pay_fee: false,
      }
    } />);
  });

  beforeEach(() => {
    EventWrapper.setState({ expanded: false });
  });

  test('render basic information', () => {
    expect(EventWrapper.find('.Event')).toHaveLength(1);
    expect(EventWrapper.find('.time')).toHaveLength(1);
    expect(EventWrapper.find('.name')).toHaveLength(1);
    expect(EventWrapper.find('.group-name')).toHaveLength(1);
    expect(EventWrapper.find('.going')).toHaveLength(1);
  });

  test('render correct information', () => {
    expect(EventWrapper.find('.time').text()).toEqual('18:00 - 2020-02-06');
    expect(EventWrapper.find('.name').text()).toEqual('MANGIA  Early Valentine Night (bring your own wine) ');
    expect(EventWrapper.find('.group-name').text()).toEqual('Group: Nh Women\'s Shapeup');
    expect(EventWrapper.find('.going').text()).toEqual('11 people are going');
  });

  test('show more info when user clicks on "Details" button', () => {
    EventWrapper.find('.detailsButton').simulate('click');
    expect(EventWrapper.find('.moreInfo')).toHaveLength(1);
  });

  test('hide more info when user clicks on "Details" button', () => {
    EventWrapper.setState({ expanded: true });
    EventWrapper.find('.detailsButton').simulate('click');
    expect(EventWrapper.find('.moreInfo')).toHaveLength(0);
  });

  test('Display more info', () => {
    EventWrapper.setState({ expanded: true });
    expect(EventWrapper.find('.moreInfo .address')).toHaveLength(1);
    expect(EventWrapper.find('.moreInfo .visibility')).toHaveLength(1);
    expect(EventWrapper.find('.moreInfo .link')).toHaveLength(1);
    expect(EventWrapper.find('.moreInfo .description')).toHaveLength(1);
  });

  test('Display correct extra info', () => {
    EventWrapper.setState({ expanded: true });
    expect(EventWrapper.find('.moreInfo .address').text()).toEqual('Mangia Italian, 33a Elm Street, Manchester, NH');
    expect(EventWrapper.find('.moreInfo .visibility').text()).toEqual('public');
    expect(EventWrapper.find('.moreInfo .link').prop('href')).toEqual('https://www.meetup.com/Nh-Womens-Shapeup/events/267896597/');
    expect(EventWrapper.find('.moreInfo .description').html()).toEqual('<div class=\"description\"></div>');
  });
})