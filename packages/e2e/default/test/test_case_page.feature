Feature: Test Case Page
  Scenario: Demonstrate Test Case Data
    Given a Test Case page of an Allure report
    Then it should show all individual data related to the test case including steps executed, timings, attachments, test categorization labels, descriptions, and links

  Scenario Outline: Demonstrate Test Status
    Given a <status> test case
    Then it should show the test as <status>

    Examples:
      | status |
      | passed |
      | failed |
      | broken |
      | skipped |
      | unknown |

