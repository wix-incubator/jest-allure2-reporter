Feature: Suites
  Scenario: Verify Suite Structure
    Given the Suites tab of an Allure report
    Then it should show executed tests grouped by suites and classes

  Scenario: Support for Test Case Parameters
    Given the Suites tab of an Allure report
    When I expand a "Parameterized" test suite
    Then it should show test cases with their parameters

  Scenario: Support for Flaky Tests
    Given the Suites tab of an Allure report
    When I expand a "Flaky" test suite
    Then it should show a test case with a bomb icon
