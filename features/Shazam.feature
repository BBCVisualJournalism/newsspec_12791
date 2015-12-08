Feature: Shazam

    Elevator pitch: "Find out which city in the world has the most similar musical tastes to your city."
    Technological implementation: Full-width scaffold.
    Languages: News. World Service have also expressed an interest. @TODO - decide which languages to support.

    Contacts:
      Editorial:      Ed
      Design:         Charlotte
      Development:    Richard & Punit

  Scenario: Landing page
    Given I have just landed on the page
    Then I should see a large introductory image
    And a centrally aligned search box
    And an 'Enter your nearest city' call to action
    And a disabled 'Search' button
    And a "Can't find your city?" link

  Scenario: Simple search
    Given I have typed in a city that exists in the system
    Then I should see that city in the autosuggest
    And I should be able to select it

  Scenario: Complex search
    Given I have selected "Can't find your city?"
    Then I should be able to search for my country/state
    And no city suggestions should appear in the autocomplete
    Given I have selected my country/state
    Then the dropdown list becomes active
    And it should list all the cities in my country/state

  Scenario: Search button becomes active
    Given I have selected my city (by any means)
    Then the Search button should become active

  Scenario: Scroll to Top Tracks section
    Given I have pressed the Search button
    Then I should be scrolled down to the 'Top Tracks' section
    And this section should show the top most searched Shazam tracks in my city

  Scenario: Top Tracks section on desktop
    Given I am on a desktop
    And I am on the 'Top Tracks' section
    Then I should see all 10 tracks

  Scenario: Top Tracks section on portable devices
    Given I am on a mobile/tablet size viewport
    And I am on the 'Top Tracks' section
    Then I should only see the first 5 tracks
    And there should be an option to 'Show more tracks'

  Scenario: Showing more tracks on portable devices
    Given I am on a mobile/tablet size viewport
    And I am on the 'Top Tracks' section
    When I select the 'Show more tracks' option
    Then the remaining 5 tracks should load in (preferably animated)

  Scenario: Hiding tracks on portable devices
    Given I am on a mobile/tablet size viewport
    And I am on the 'Top Tracks' section
    And I have selected the 'Show more tracks option'
    Then the option should be renamed to 'Show less'
    And if I select THAT option
    Then the bottom 5 tracks should be removed (preferably animated)

  Scenario: Playing a song snippet
    Given the song snippet exists
    Then the play button should be active
    And when I press the play button
    Then it should play the snippet

  Scenario: Pausing a song snippet
    Given I have started playing a song snippet
    Then the play icon should change to a pause icon
    When I press the pause icon
    Then the playback should be paused
    And the icon should turn back to a play button

  Scenario: Re-playing a song snippet
    Given I have started and paused a song snippet
    When I press the play button again
    Then the playback should continue where it left off

  Scenario: Completing song snippet playback
    Given I have started playing a snippet
    When the playback finishes
    Then it should change back to a play icon
    And the functionality should be reset # could probably be reworded more clearly

  Scenario: Song snippet doesn't exist
    Given a song snippet doesn't exist
    Then the play button should be grey and inactive

  Scenario: Song artwork exists
    Given the artwork for a song snippet exists
    Then it should be displayed next to the play icon

  Scenario: Song artwork doesn't exist
    Given the artwork for a song snippet does NOT exist
    Then a placeholder image should be displayed instead

  Scenario: Twin town exists
    Given there is a twin town
    Then I should see which town my town is matched with
    # (this is the furthest away town with the most similar musical tastes)
    And it should say how far away the town is
    And it should state how many tracks we have in common (1 - 10)
    And it should list those track names
    And they should be ordered by that city's preferences # @TODO - Ed/Ransome

  Scenario: Twin town doesn't exist
    Given my town is unique
    Then # @TODO - Ed

  Scenario: Sharetools
    Given I share from the bespoke sharetools
    Then it should be populated with a custom message about my twin town
    Or be populated with a "my town is unique" kind of message if there is no twin town # @TODO - Ed
    And it should have a Shazam-themed social media image
