Feature: Log into the Web Application

  As a user of the web application
  I want to log in using my credentials
  So that I can access the home page

  Scenario: Successful login
    Given I am on the page "http://localhost:3000"
    When I click on the "logInButton" button
    And I enter the email "test@test.com" in the email field
    And I enter the password "123" in the password field
    And I press Enter
    Then I should be redirected to "http://localhost:3000//home"
