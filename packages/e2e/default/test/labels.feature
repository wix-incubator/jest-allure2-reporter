Feature: Flaky Tests
  Scenario: Marking Unstable Tests
    Given an Allure report with unstable tests
    Then it should clearly indicate the tests marked as 'flaky'
