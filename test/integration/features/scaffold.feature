Feature: scaffold

  Scenario: new project
    When the project is scaffolded
    Then the testing framework is configured
    And dependencies are defined
    And the filename pattern is reported
    And a canary test exists to ensure the framework configuration works
