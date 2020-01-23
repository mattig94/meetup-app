import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => {}}/>);
  });

  test('render event number input', () => {
    expect(NumberOfEventsWrapper.find('.howManyEvents')).toHaveLength(1);
  });

  test('default number of events is 32', () => {
    expect(NumberOfEventsWrapper.state('number')).toBe(32);
  });

  test('render number input correctly', () => {
    const number = NumberOfEventsWrapper.state('number');
    expect(NumberOfEventsWrapper.find('.howManyEvents').prop('value')).toBe(number);
  });

  test('change number state when input changes', () => {
    const eventObject = { target: { value: 5 }};
    NumberOfEventsWrapper.find('.howManyEvents').simulate('change', eventObject);
    expect(NumberOfEventsWrapper.state('number')).toBe(5);
  });
});