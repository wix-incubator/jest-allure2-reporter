###*
# This suite checks that Allure reporter can take metadata from CoffeeScript tests
###
describe 'CoffeeScript', ->
  counter = 0

  ###*
  # Increment counter
  ###
  beforeEach ->
    counter++

  ###*
  # @tag coffeescript
  ###
  it 'should work well with Allure', ->
    expect(counter).toBeGreaterThan(0)
