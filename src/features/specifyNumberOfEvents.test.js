import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount } from 'enzyme';
import App from '../App';
import NumberOfEvents from '../NumberOfEvents';


const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  test('When a user hasn\'t specified a number of events, the default is 32', ({ given, when, then }) => {
    given('User has not specified how many events they want to see', () => {

    });
    let NumberOfEventsWrapper;
    when('User is viewing default event list', () => {
      NumberOfEventsWrapper = mount(<NumberOfEvents />);
    });

    then('User will see 32 events', () => {
      NumberOfEventsWrapper.update();
      expect(NumberOfEventsWrapper.state('number')).toBe(32);
    });
  });

  test('User can define how many events they want to see at a time', ({ given, when, then }) => {
    let AppWrapper
    given('User is viewing default event list', () => {
      AppWrapper = mount(<App />);
    });

    when('User changes number of events they want to view', () => {
      AppWrapper.find('.howManyEvents').simulate('change', { target: { value: 20 } });
    });

    then('User will see the number of events they specified', () => {
      expect(AppWrapper.state('page')).toBe(20);
    });
  });
});