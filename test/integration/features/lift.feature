Feature: Lift Mocha

  Scenario: canary test without other tests yet
    Given a mocharc file exists
    And the canary test still exists
    When the project is lifted
    Then the canary test is not removed

  Scenario: other mocha tests exist, but canary test still exists
    Given a mocharc file exists
    And other mocha tests exist
    And the canary test still exists
    When the project is lifted
    Then the canary test is removed

  Scenario: other mocha tests exist, but canary test no longer exists
    Given a mocharc file exists
    And other mocha tests exist
    When the project is lifted
    Then the canary test is removed
