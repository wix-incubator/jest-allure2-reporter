Feature: Report Structure
  Scenario: Verify Allure Report Generation and Structure
    Given an Allure report is generated
    Then it should include an 'Overview' tab, various data representation tabs, and individual test case pages
    And different tabs should switch between views of the original data structure
    And tree-like representations should support filtering and sorting
