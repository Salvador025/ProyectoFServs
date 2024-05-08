Feature: Sign Up for the Web Application

  As a new user
  I want to sign up with my details
  So that I can create an account and access the home page

  Scenario: Successful sign up
    Given I am on the page "http://localhost:3000"
    When I click on the sign Up button
    And I enter a username in the username field
    And I enter my name in the name field
    And I enter an email in the email field
    And I enter a password in the password field
    And I press enter
    Then I should be redirected to "http://localhost:3000/home"
