import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';

describe('<Event /> component', () => {
  let EventWrapper;
  beforeAll(() => {
    EventWrapper = shallow(<Event />);
  });

  test('render event time and date', () => {
    expect(EventWrapper.find('.eventTimeDate')).toHaveLength(1);
  });

  test('render event name', () => {
    expect(EventWrapper.find('.eventName')).toHaveLength(1);
  });

  test('render organizing group name', () => {
    expect(EventWrapper.find('.eventGroup')).toHaveLength(1);
  });

  test('render number of people going',() => {
    expect(EventWrapper.find('.yesRsvp')).toHaveLength(1);
  });

  test('render details button', () => {
    expect(EventWrapper.find('.details')).toHaveLength(1);
  });

  test('render event details', () => {
    expect(EventWrapper.find('.eventDetails')).toHaveLength(1);
  });

  test('toggle details when button is clicked', () => {
    EventWrapper.find('.details').simulate('click');
    expect(EventWrapper.state('detailsOpen')).toBe(true);
  });
})