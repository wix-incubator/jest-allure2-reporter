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
  # This comment contains URL to the official CoffeeScript website
  # @tag coffeescript
  # @url https://coffeescript.org CoffeeScript
  # @url https://codeschool.com
  ###
  it 'should work well with Allure', ->
    expect(counter).toBeGreaterThan(0)
