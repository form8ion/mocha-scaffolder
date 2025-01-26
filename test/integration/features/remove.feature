Feature: Remove Mocha from a project

  Scenario: Mocha exists in the project
    Given a mocharc file exists
    And a setup file exists
    When mocha is removed from the project
    Then mocha dependencies are removed
    And configuration files are removed

  Scenario: Mocha exists and the canary test still exists
    Given a mocharc file exists
    And the canary test still exists
    When mocha is removed from the project
    Then the canary test is removed

  Scenario: Mocha did not previously exist in the project
    When mocha is removed from the project
