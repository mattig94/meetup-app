import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount } from 'enzyme';
import App from '../App';

const feature = loadFeature('./src/features/showHideEventDetails.feature');

defineFeature(feature, test => {
  test('An event element is collapsed by default', ({ given, when, then }) => {       
    given('User has searched thier location', () => {
    });
    let AppWrapper;
    when('User is viewing their nearby events', () => {
      AppWrapper = mount(<App />);
    });

    then('User should see the list of upcoming events from their location with the details collapsed by default', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.Event .moreInfo')).toHaveLength(0);
    });
  });

  test('User can expand an event to see its details', ({ given, when, then }) => {    
    let AppWrapper;
    given('User wants to see event details', () => {
      AppWrapper = mount(<App />);
    });

    when('User clicks details button', () => {
      AppWrapper.update();
      AppWrapper.find('.Event .detailsButton').at(0).simulate('click');
    });

    then('User sees expanded event details', () => {
      expect(AppWrapper.find('.Event .moreInfo')).toHaveLength(1);
    });
  });

  test('User can collapse an event to hide its details', ({ given, and, when, then }) => { 
    let AppWrapper;
    given('User is viewing events', () => {
      AppWrapper = mount(<App />);
    });

    and('Event details are open', () => {
      AppWrapper.update();
      AppWrapper.find('.Event .detailsButton').at(0).simulate('click');
      expect(AppWrapper.find('.Event .moreInfo')).toHaveLength(1);
    });

    when('User clicks details button a second time', () => {
      AppWrapper.update();
      AppWrapper.find('.Event .detailsButton').at(0).simulate('click');
    });

    then('The event details collapse', () => {
      expect(AppWrapper.find('.Event .moreInfo')).toHaveLength(0);
    });
  });
});