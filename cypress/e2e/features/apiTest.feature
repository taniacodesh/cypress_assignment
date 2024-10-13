Feature: PokeAPI Tests

  Scenario Outline: Check a GET request using a valid id or name of berry
    Given 'valid' id or name
    When User sends a GET request to '<url>'
    Then Response status should be 200
    And 'Response' should contain 'id' 1 and 'name' 'cheri'

    Examples:
      | url                                   |
      | https://pokeapi.co/api/v2/berry/1     |
      | https://pokeapi.co/api/v2/berry/cheri |

  Scenario Outline: Check a GET request using an invalid id or name of berry
    Given 'invalid' id or name
    When User sends a GET request to '<url>'
    Then Response status should be 404
    And Response should contain 'Not Found' error message

    Examples:
      | url                                     |
      | https://pokeapi.co/api/v2/berry/65      |
      | https://pokeapi.co/api/v2/berry/invalid |

  Scenario: Check a GET request using a valid name of berry flavour
    Given 'valid' id or name
    When User sends a GET request to 'https://pokeapi.co/api/v2/berry-flavor/spicy'
    Then Response status should be 200
    And 'Response' should contain 'id' 1 and 'name' 'spicy'

  Scenario: Get the berry info of the berry with 'spicy' flavor and more 'potency'
    Given 'valid' id or name
    When User sends a GET request to 'https://pokeapi.co/api/v2/berry-flavor/spicy'
    Then Response status should be 200
    And 'Response' should contain 'id' 1 and 'name' 'spicy'
    When User finds the berry with the highest 'potency' and sends a new request
    Then 'New response' should contain 'id' 60 and 'name' 'enigma'
