# Test Plan

1. Test cases:
  * by **category**:
    * Product defect
    * Test defect
    * Custom category
  * by **parameters** (gray text in tree):
    * without
    * with
  * by **execution issues**:
    * duplicate names in the same suite
    * indeed retried tests
    * from a broken "beforeAll" hook
    * from a broken "afterAll" hook
    * from broken test suite files
    * broken due to a failed test environment setup
  * with **Execution**:
    * Set up
    * Test body
    * Tear down
    * inner steps
    * with parameters
    * with attachments
      * image
      * image diff
      * video
      * log
    * with results and errors
2. Test tree (grouping):
   * By **suite**
     * Package
     * Parent suite
     * Suite
     * Subsuite
     * Test case
   * By **story**:
     * Epic
     * Feature
     * Story
   * By **package**:
     * Package
     * ...
3. Report-scoped features:
    * Executor (build agent name)
4. Test run history
   * Duration
   * Duration trend
   * Retries trend
   * Categories trend
5. User API:
  * Decorator-like functions:
    * $Title()
    * $Description()
    * $Severity()
    * $Tag()
    * $Parameters()
  * Real decorators:
    * `@allure.step('Login as %s')` – should format string with the given parameters and attach them to the step.
