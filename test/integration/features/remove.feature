Feature: Remove Mocha from a project

  Scenario: Mocha exists in the project
    When mocha is removed from the project
    Then mocha dependencies are removed

  Scenario: Mocha did not previously exist in the project
    When mocha is removed from the project
