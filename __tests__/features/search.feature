Feature: ITESO Search
  As a user
  I want to search for "Carreras" on the ITESO homepage
  So that I can see the search results page

  Scenario: Searching for "Carreras" on ITESO
    Given I am on the ITESO homepage
    When I search for "Carreras"
    Then I should see the search results