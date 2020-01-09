import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });

  test('test that component is rendered', () => {
    expect(NumberOfEventsWrapper).toHaveLength(1);
  });

  test('render event numbrt input', () => {
    expect(NumberOfEventsWrapper.find('input')).toHaveLength(1);
  });

  test('default number of events is 32', () => {
    expect(NumberOfEventsWrapper.state('number')).toBe(32);
  });

  test('change number state when input changes', () => {
    const eventObject = { target: { value: 5 }};
    NumberOfEventsWrapper.find('input').simulate('change', eventObject);
    expect(NumberOfEventsWrapper.state('number')).toBe(5);
  })
})