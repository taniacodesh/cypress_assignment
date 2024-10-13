import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import ImdbPage from "../page_objects/imdbPage";

//Exceptions 
Cypress.on('uncaught:exception', (err, runnable) => {
//   if (err.message.includes('Minified React error')) {
     return false;
//  }
});

// ** NOTE: This code in my case should be remove because I am not using it
// due to with POM I have used Background to do it.
// I only wrote it because in the extra section is requested.
//  beforeEach(() => {
//   cy.visit(Cypress.config('baseUrl')); 
//   cy.viewport(1920,1080);
//   imdbPage.clickOnAcceptButton();
//  });

const imdbPage = new ImdbPage();

When ('User waits for {int}', (time) => {
  cy.wait(time);
});

When ('User types {string} on Birthday', (text) => {
  imdbPage.enterBirthdayTextbox(text);
});

Given ('User visits the IMDb page', () => {
  imdbPage.visit();
  cy.viewport(1920,1080);
});

When('User accepts cookies', () => {
  imdbPage.acceptCookies();
});

When ('User types {string} in the searchbox', (text) => {
  imdbPage.typeOnSearchBox(text);
});

When ('User searches for birth date {string}', (date) => {
  imdbPage.searchByBirthDate(date);
});

When ('User sets a {int} stars Rating', (starNumbers) => {
  imdbPage.clickOnStarButton(starNumbers);
});

When('User selects {string} in the More people dropdown', (name) => {
  imdbPage.selectOnMorePeopleDropdown(name);
})

When ('User closes the modal', () => {
  imdbPage.clickOnCloseIcon();
})

When ('User removes the search', () => {
  imdbPage.clickOnAppliedFilter();
})

When ('User unfolds {string}', (filterName) => {
  imdbPage.clickOnSearchFilterByName(filterName);
})

When('User takes a screenshot', () => {
  cy.screenshot();
});

When ('User clicks on {string} result in {string} section in the search', (record,sectionName) => {
  imdbPage.clickOnResult(record,sectionName);
});

When ('User clicks on the search button', () => {
  imdbPage.clickOnSearchButton();
});

When ('User clicks on Upcoming tab in Credits section', () => {
  imdbPage.clickOnUpcomingTab();
});

When ('User clicks in the first movie with {string} tag', (tag) => {
  imdbPage.clickOnFirstMovieByTag(tag);
});

When ('User clicks on the Menu', () => {
  imdbPage.clickOnMenuButton();
});

When ('User clicks on the {string} option in the Menu', (option) => {
  imdbPage.clickOnMenuOption(option);
});

When ('User clicks on the {int} item in the list', (index) => {
  imdbPage.clickOnTitleByIndex(index);
});

When ('User clicks on the {int} image in the list', (index) => {
  imdbPage.clickOnImageByIndex(index);
});

When ('User clicks on the {string} option in the list', (option) => {
  imdbPage.clickOnTitleByOption(option);
});

When ('User clicks on the IMDb Rating button', () => {
  imdbPage.clickOnImdbRatingButton();
});

When ('User clicks on the Rate button', () => {
  imdbPage.clickOnRateButton();
});

When ('User clicks on the Rate button in the modal', () => {  
  imdbPage.clickOnModalRateButton();
});

When ('User clicks on the Photos button', () => {
  imdbPage.clickOnPhotosButton();
});

When('User clicks on the Gallery button', () =>
{
  imdbPage.clickOnGalleryButton();
});

When('User clicks on the Filter button', () => {
  imdbPage.clickOnFilterButton();
});

When ('User clicks on the See results button', () => {
  imdbPage.clickOnSeeResultsButton();
});

When ('User clicks on the {int} link in the description of the {int} result', (linkIndex, resultIndex) => {
  imdbPage.clickOnLinkByIndex(linkIndex,resultIndex); 
});

Then ('{string} page should be displayed', (title) => {
  imdbPage.checkTitlePage(title);
});

Then ('{string} title should be displayed', (title) => {
  imdbPage.checkHeader(title);
});

Then ('Upcoming tab should be expanded', () => {
  imdbPage.checkProjectsAccordeonIsDisplayed();
});

Then ('{string} filter should be applied', (option) => {
  imdbPage.checkFilterOptionIsApplied(option);
});

Then ('{int} images should be displayed', (index) => {
  imdbPage.checkResults (index);
});

Then('filter should {string} applied', (visibility) => {
  imdbPage.checkFilterVisibility(visibility);
})

Then ('{string} option should be expanded', (section) => {
  imdbPage.checkSectionIsExpanded(section);

});