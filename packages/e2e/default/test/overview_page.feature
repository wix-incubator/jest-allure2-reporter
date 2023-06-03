Feature: Overview Page
  Scenario: Validate Default Widgets on Overview Page
    Given the 'Overview' page of an Allure report
    Then it should include widgets for Statistics, Launches, Behaviors, Executors, History Trend, and Environment
    And all widgets should correctly represent basic project and test environment characteristics
    And all home page widgets should be draggable and configurable
