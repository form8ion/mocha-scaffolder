Feature: scaffold

  Scenario: new project
    When the project is scaffolded
    Then the testing framework is configured
    And a canary test exists to ensure the framework configuration works
