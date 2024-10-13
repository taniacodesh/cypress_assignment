import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import ApiPage from "../page_objects/apiPage";

const apiPage = new ApiPage();

Given ('{string} id or name', (valid) => {});

When ('User sends a GET request to {string}', (url) => {
  apiPage.sendGetRequest(url);
});

When ('User finds the berry with the highest {string} and sends a new request', (field) => {
  apiPage.getMaxBerryandSendRequest(field);
});

Then ('Response status should be {int}', (statusCode) => {
  apiPage.checkResponseStatus(statusCode);
});

Then ('{string} should contain {string} {int} and {string} {string}',  (response,field1,value1,field2,value2) => {
  apiPage.checkResponseValues(response,field1,value1,field2,value2);
});

Then('Response should contain {string} error message', (errorMessage) => {
  apiPage.checkErrorMessage(errorMessage);
});



