Feature: IMDb.com Search and Navigation Tests

  Background:
    Given User visits the IMDb page
    And User accepts cookies

  @important
  Scenario: Search for Nicolas Cage and access his profile
    When User types 'Nicolas Cage' in the searchbox
    And User clicks on the search button
    And User clicks on 'Nicolas Cage' result in 'People' section in the search
    Then 'Nicolas Cage' page should be displayed
    When User clicks on Upcoming tab in Credits section
    Then Upcoming tab should be expanded
    When User clicks in the first movie with 'In Production' tag
    Then 'The Prince' page should be displayed

  Scenario: Navigate to the Top Box Office and rate a movie.
    When User clicks on the Menu
    And User waits for 100
    And User clicks on the 'Top Box Office' option in the Menu
    Then 'Top Box Office (US)' title should be displayed
    And User clicks on the 2 item in the list
    And User waits for 200
    And User clicks on the IMDb Rating button
    And User clicks on the Rate button
    And User sets a 5 stars Rating
    And User clicks on the Rate button in the modal

  Scenario: Navigate to the Top 250 TV Shows and view a photo
    When User clicks on the Menu
    And User clicks on the 'Top 250 TV Shows' option in the Menu
    And User clicks on the 'Breaking Bad' option in the list
    And User clicks on the Photos button
    And User clicks on the Gallery button
    And User waits for 200
    And User clicks on the Filter button
    And User selects 'Danny Trejo' in the More people dropdown
    Then 'Danny Trejo' filter should be applied
    When User closes the modal
    And User waits for 200
    Then 6 images should be displayed
    And User clicks on the 2 image in the list

  Scenario: Search for celebrities born yesterday and take a screenshot
    When User clicks on the Menu
    And User clicks on the 'Born Today' option in the Menu
    Then filter should 'be' applied
    When User removes the search
    Then filter should 'not be' applied
    And User unfolds 'Birthday'
    Then 'Birthday' option should be expanded
    When User types 'yesterday' on Birthday
    And User clicks on the See results button
    And User clicks on the 3 item in the list
    And User takes a screenshot

  Scenario: Search for celebrities born 40 years ago today and take a screenshot
    When User clicks on the Menu
    And User clicks on the 'Born Today' option in the Menu
    Then filter should 'be' applied
    When User removes the search
    Then filter should 'not be' applied
    And User unfolds 'Birth date'
    Then 'Birth date' option should be expanded
    And User searches for birth date '40 years ago'
    And User clicks on the See results button
    And User clicks on the 1 link in the description of the 1 result
    Then User takes a screenshot
