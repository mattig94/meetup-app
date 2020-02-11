Feature: Show/hide event details

Scenario: An event element is collapsed by default
Given User has searched thier location  
When User is viewing their nearby events
Then User should see the list of upcoming events from their location with the details collapsed by default

Scenario: User can expand an event to see its details
Given User wants to see event details
When User clicks details button
Then User sees expanded event details

Scenario: User can collapse an event to hide its details
Given User is viewing events
And Event details are open
When User clicks details button a second time
Then The event details collapse