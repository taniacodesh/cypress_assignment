# QA ENGINEER CHALLENGE

## First Steps

In order to install all dependencies, run following command in root directory:
```bash
npm install
```

## Exercise 1: Using Cypress as automation framework, implement the following automated tests:

- **Go to IMDb.com, search for Nicolas Cage and access his profile; then unfold the Upcoming tab in the Credits section, and click on the first movie with a Completed tag. We want to make sure that this scenario is working on Chrome and Firefox.**
- **Go to IMDb.com, unfold the Menu and navigate to the Top Box Office section; then click on the 2nd item on the Top box office list; then click on the IMDb Rating button, click on the Rate button, and set a 5 stars Rating and click on the Rate button in the modal.**
- **Go to IMDb.com, unfold the Menu button, and navigate to the Top 250 TV Shows section; then click on Breaking Bad, go to the Photos, display only Danny Trejo's photos, and then click on the 2nd photo in the list.**
- **Go to IMDb.com, unfold the Menu button and navigate to the Born today section; delete default search, then unfold Birthday and search for Celebrities born yesterday. Click on the 3rd name in the list and take a screenshot.**
- **Go to IMDb.com, unfold the Menu button and navigate to the Born today section; delete default search, then unfold Birth date and search for Celebrities born the same day as today but exactly 40 years ago, using the date picker for the “from” option and the string field for the “to” option. Now on the 1st result in the list, click on the 1st link you can find on the description (if any) and take a screenshot.**

_Done in files: “imdbTest.feature”, “imdbTest.cy.js” and “imdbPage.js” using design based on POM.You can find them in:_

- _cypress/e2e/features_
- _cypress/suport/step_definitions_
- _cypress/support/page_objects_

**To execute the tests run these commands:**
```bash
##  to execute 1st test in chrome
npm run test1:chrome
```
```bash
##  to execute 1st test in firefox
npm run test1:firefox
```
```bash
## to execute all tests
npm run tests:imdb
```

## Exercise 2: Using Cypress as automation framework, implement the following API automated tests:

**The API under scope is https://pokeapi.co/**

- **Make sure we can call https://pokeapi.co/api/v2/berry/{id or name}/ using a valid id, and we get expected response**
- **Check error is appearing when calling with invalid id**
- **Make sure we can call https://pokeapi.co/api/v2/berry/{id or name}/ using a valid name, and we get expected response**
- **Check error is appearing when calling with invalid name**
- **Make sure we can call https://pokeapi.co/api/v2/berry-flavor/{id or name}/ using a valid name, and we get the expected response.**
- **Then, pick up all the berries with “spicy” flavour, check the name of the one with more “potency”, and call https://pokeapi.co/api/v2/berry/{id or name}/ using that info, making sure we get the expected responses.**

_Done in files: “apiTest.feature”, “apiTest.cy.js” and “apiPage.js” using design based on POM. You can find them in:_

- _cypress/e2e/features_
- _cypress/suport/step_definitions_
- _cypress/support/page_objects_
  
```bash
## to execute all tests
npm run tests:api
```

## Exercise 3: Implement the following manual test:

    Given the following form:
    <label for="tentacles">Number of tentacles (10-100):</label>
    <input type="number" id="tentacles" name="tentacles"
    min="10" max="100">
    <button>Send</button>

**Write all necessary test cases to make sure the input field is working as expected; valid values will lead to a "Success" message, and invalid to an "Error" message.**

The input is of type ‘number’, which means that it only accepts numerical values. The number input type does not allow characters, and it only permits the following inputs: - numbers - “.” only as separator of integer and decimal part - “-” only for negative numbers, other way is not allowed.

So I have created tests using Gherkin to check that:

- Success message is returned when input is a:
  - integer between 0 and 100
  - decimal number (using .) between 0 and 100 that are equivalent to an integer. For example: 10.00
- Error message is returned when input is:
  - numbers with decimals between 0 and 100 that are NOT equivalent to an integer, due to the fact that it is not possible to have 1.5 tentacles.
  - numbers with or without decimal out the range 10-100 (negative numbers included).
  - empty value

### Feature: Check tentacles form functionality

#### Success cases

    Scenario Outline: Check tentacles form with an integer value between 0 and 100 returns a success message.
        Given User visits tentacles form
        When User enter ‘<number>’
        And User clicks on ‘Send’ button
        Then A ‘Success’ message is displayed

        Examples:
        |number |
        | 10    |
        | 33    |
        | 77    |
        | 100   |

    Scenario Outline: Check tentacles form with a decimal number value between 0 and 100 that is equivalent to an integer (using .) returns a success message.
        Given User visits tentacles form
        When User enter ‘<number>’
        And User clicks on ‘Send’ button
        Then A ‘Success’ message is displayed

        Examples:
        | number |
        | 10.00  |
        | 33.00  |
        | 77.00  |
        | 100.00 |

#### Error cases

    Scenario Outline: Check tentacles form with decimal number values between 0 and 100 with decimals (using .) that are not equivalent to an integer returns an error message.
        Given User visits tentacles form
        When User enter ‘<number>’
        And User clicks on ‘Send’ button
        Then A ‘Error’ message is displayed

        Examples:
        | number|
        | 10.01 |
        | 33.56 |
        | 77.56 |
        | 99.97 |

    Scenario Outline: Check tentacles form with values out of the range 0-100 returns an error message.
        Given User visits tentacles form
        When User enter ‘<number>’
        And User clicks on ‘Send’ button
        Then A ‘Error’ message is displayed

        Examples:
        | number |
        | -30    |
        | 9      |
        | 9.99   |
        | 101    |

    Scenario: Check tentacles form with empty value returns an error message.
        Given User visits tentacles form
        When User enter ‘’
        And User clicks on ‘Send’ button
        Then A ‘Error’ message is displayed

## Exercise 4: Write the following bug report:

**While performing the 2nd test on point 1 (Top Box Office test) you found each time you try to rate a movie with 10 stars, the Rate button is not enabled, so you cannot submit the data. Write a bug to report this issue.**

### Rate button is not enabled when trying to rate a movie with 10 stars\*\*

**Description:**  
The Rate button is not enabled when trying to rate a movie with 10 stars.

**Environment:**

- Visitor user (not registered)
- IMDb website: https://www.imdb.com/search/name/

**Steps to reproduce:**

1. User visits the IMDb page
2. User clicks on the Menu
3. User goes to Top Box Office
4. User clicks on some item in the list
5. User clicks on the IMDb Rating button
6. User clicks on the Rate button
7. User sets 10 stars

**Expected behaviour:**

- The Rate button is enabled and can be clickable
  > _('expectedBehaviour.png' image in path: /exercise4Attachments)_

**Current behaviour:**

- The Rate button is disabled and can not be clickable
  > _('currentBehaviour.png' image in path: /exercise4Attachments)_

## Exercise 5: As extras, implement the following tasks (not mandatory):

- Implement assertions wherever you feel they are needed.
- Set IMDb.com as _baseUrl_ in the configuration.
  > In ‘cypress.config.js’ file
- Set _videoUploadOnPasses_ to _false_ in the configuration.
  > In ‘cypress.config.js’ file
- Implement a _beforeEach_ hook to access _baseUrl_.
  > In my case due to I am using a POM design I add it in the Background in ‘imdbTest.feature’ file, but I left a comment in ‘imdbTest.cy.js’ file with the example.
- Clean code! (Use linting if you can)
- For point 3, use Gherkin.
  > Done in Exercise 3
- Be careful with flaky tests! (Careful with screen sizes)
- Cypress Plugins are allowed.
