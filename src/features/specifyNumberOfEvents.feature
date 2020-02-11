Feature: Specify number of events

Scenario: When a user hasn't specified a number of events, the default is 32
Given User has not specified how many events they want to see
When User is viewing default event list
Then User will see 32 events

Scenario: User can define how many events they want to see at a time
Given User is viewing default event list
When User changes number of events they want to view
Then User will see the number of events they specified