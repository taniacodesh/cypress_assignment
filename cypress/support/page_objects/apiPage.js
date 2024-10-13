
class ApiPage {

  sendGetRequest(url) {
    cy.request({
      method: 'GET',
      url: url,
      failOnStatusCode: false, // Avoid failing when the status code is not 2xx or 3xx
    }).as('apiResponse');
  }

  getMaxBerryandSendRequest(field) {
    cy.get('@apiResponse').then((response) => {
      const berries = response.body.berries;
      const maxBerry = berries.reduce((max, current) => {
        return current[field] > max[field] ? current : max;
      });
      cy.request(maxBerry.berry.url).as('newBerryResponse');
    });
  }

  checkResponseStatus(statusCode) {
    cy.get('@apiResponse').then((response) => {
      expect(response.status).to.eq(statusCode);
    });
  }

  checkResponseValues(response,field1,value1,field2,value2){
    if(response == 'New response') {
      cy.get('@newBerryResponse').then((response) => {
        expect(response.body[field1]).to.eq(value1);
        expect(response.body[field2]).to.eq(value2);
      })
    } else {
      cy.get('@apiResponse').then((response) => {
        expect(response.body[field1]).to.eq(value1);
        expect(response.body[field2]).to.eq(value2);
      }) 
    }
  }

  checkErrorMessage(errorMessage) {
    cy.get('@apiResponse').then((response) => {
      expect(response.body).to.eq(errorMessage);
    });
  }

}
  
  export default ApiPage;
  