
class ImdbPage {

  //Elements
  getSearchBox = () => cy.get('#suggestion-search');
  getSearchButton = () => cy.get('#suggestion-search-button');
  getAcceptButton = () => cy.get('[data-testid="accept-button"]');
  getPageTitle = () => cy.get('[data-testid="hero__pageTitle"]');
  getUpcomingTab = () => cy.get('[data-testid="accordion-item-actor-upcoming-projects"]');
  getProjectsAccordeon = () => cy.get('#accordion-item-actor-upcoming-projects');
  getMenuButton = () => cy.get('#imdbHeader-navDrawerOpen');
  getMenuContent = () => cy.get('[data-testid="panel-content"]');
  getHeader = () => cy.get('h1.ipc-title__text.chart-layout-specific-title-text');
  getTitlesImages = () => cy.get('div.ipc-lockup-overlay__screen');
  getImdbRatingButton = () => cy.get('[data-testid="hero-rating-bar__aggregate-rating__score"]').eq(0);
  getRateButton = () => cy.get('[data-testid="rating-button__user-rating__unrated"]');
  getStarButton = (stars) => cy.get(`[aria-label="Rate ${stars}"]`);
  getModalRateButton = () => cy.get('button.ipc-btn.ipc-btn--single-padding.ipc-btn--center-align-content.ipc-btn--default-height.ipc-btn--core-accent1.ipc-btn--theme-baseAlt.ipc-btn--rounded.ipc-rating-prompt__rate-button');
  getTitleText = () => cy.get('h3.ipc-title__text');
  getPhotosButton = () => cy.get('[data-testid="hero__photo-link"]');
  getGalleryButton = () => cy.get('[data-testid="mv-gallery-button"]');
  getFilterButton = () => cy.get('[data-testid="image-chip-dropdown-test-id"]');
  getMorePeopleDropdown = () => cy.get('#Person-filter-select-dropdown');
  getCloseIcon = () => cy.get('[data-testid="promptable__x"]');
  getAllImages = () => cy.get('[data-testid="sub-section-images"] div a');
  getImageSection = () => cy.get('[data-testid="sub-section-images"]');
  getOptionFilter = () => cy.get('button[data-testid="filter-menu-chip-nm0001803"]');
  getPagination = () => cy.get('.sc-d9b35f63-0.jRYqsW');
  getAppliedFilter = () => cy.get('[data-testid^="selected-input-chip-list-birthday-"]');
  getAccordeon = (filterName) => cy.get(`[data-testid="accordion-item"]`).contains(filterName);
  getBirthdayTextBox = () => cy.get('[data-testid="birthday-input-test-id"]');
  getSeeResultsButton = () => cy.get('[data-testid="adv-search-get-results"]');
  getBirthDateStartTextBox = () => cy.get('input[data-testid="birthDate-start"]');
  getBirthDateEndTextBox = () => cy.get('input[data-testid="birthDate-end"]');
  getBioByIndex = (index) => cy.get('[data-testid="dli-bio"]').eq(index-1);
  getLinkByIndex = (index) => cy.get('a.ipc-md-link.ipc-md-link--entity').eq(index-1); 
  getAccordeonMovies = () => cy.get('li[data-testid^="unrel_cred_actor_"]');

  //Actions
    visit() {
      cy.visit('/');
    }

    typeOnSearchBox(text) {
      this.getSearchBox().clear();
      this.getSearchBox().type(text);
    }

    clickOnSearchButton() {
      this.getSearchButton().click();
    }

    getSection(sectionName) {
      const dataTestIdMap = {
        People: 'find-results-section-name',
        Titles: 'find-results-section-title',
        Interests: 'find-results-section-interest',
      }
      const sectionDataTestId = dataTestIdMap[sectionName]
      return cy.get(`[data-testid="${sectionDataTestId}"]`);
    }

    clickOnResult(text,sectionName) {
      this.getSection(sectionName).contains(text).click();
    }

    checkTitlePage(title) {
      this.getPageTitle().should('have.text',title);
    }

    checkHeader(title) {
      this.getHeader().should('have.text',title);
    }

    checkProjectsAccordeonIsDisplayed() {
      this.getProjectsAccordeon().should('be.visible');

    }

    acceptCookies() {
      this.getAcceptButton().click();
    }

    clickOnUpcomingTab() {
      this.getUpcomingTab().click();
    }

    clickOnFirstMovieByTag(tag) {
      this.getAccordeonMovies().then((movies) => {
        const foundMovie = Array.from(movies).find(movie => {
          return movie.innerText.includes(tag);
        });
    
        if (foundMovie) {
          cy.wrap(foundMovie).click();
        } else {
          cy.log(`There is no movies with tag: ${tag}`);
        }
      });
    }

    clickOnMenuButton() {
      this.getMenuButton().click();
    }
    
    clickOnMenuOption(option){
      this.getMenuContent()
      .find('a[role="menuitem"]')
      .contains(option) 
      .click();

    }

    clickOnTitleByIndex(index){
      this.getTitlesImages()
      .eq(index-1)
      .click();
    }

    clickOnImageByIndex(index){
      this.getAllImages()
      .eq(index-1)
      .click();
    }

    clickOnTitleByOption(option){
      this.getTitleText()
      .contains(option) 
      .click();
    }

    clickOnImdbRatingButton() {
      this.getImdbRatingButton().click();
    }
    clickOnRateButton() {
      this.getRateButton().click();
    }

    clickOnStarButton(index){
      this.getStarButton(index).click({force:true});
    }

    clickOnModalRateButton() {
      this.getModalRateButton().click();
    }

    clickOnPhotosButton() {
      this.getPhotosButton().click();
    }

    clickOnGalleryButton() {
      this.getGalleryButton().click();
    }
    
    clickOnFilterButton() {
      this.getFilterButton().click();
    }

    clickOnCloseIcon() {
      this.getCloseIcon().click();
    }

    selectOnMorePeopleDropdown(name) {
      cy.intercept('GET', 'https://caching.graphql.imdb.com/?operationName=TitleMediaIndexSubPage**', (req) => {
      }).as('getTitleMediaIndexSubPage');

      this.getMorePeopleDropdown()
      .contains('option', name)
      .invoke('val')
      .then(value => {
        this.getMorePeopleDropdown().select(value);
      })
      cy.wait('@getTitleMediaIndexSubPage').its('response.statusCode').should('equal', 200);
    }

    checkFilterOptionIsApplied(option) {
      this.getOptionFilter()
      .should('contain.text', option) 
      .and('have.attr', 'aria-pressed', 'true');
    }

    checkResults (index) {
      if (index>0) {
        this.getImageSection()
        .find('a')
        .its('length')
        .then((count) => {
          expect(count).to.equal(index);
        });
      }
    }

    checkFilterVisibility(visibility) {
        visibility == 'be' 
          ? this.getAppliedFilter().should('be.visible') 
          : this.getAppliedFilter().should('not.exist');
    }

    clickOnAppliedFilter() {
      this.getAppliedFilter().click();
    }

    clickOnSearchFilterByName(filterName) {
      this.getAccordeon(filterName).click();
    }

    enterBirthdayTextbox(text) {
      if (text == 'yesterday') {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate()-1);
        text = this.formatDate(yesterday);
      }
      this.getBirthdayTextBox().type(text +'{enter}');  
    }

    formatDate(date) {
      const month = String(date.getMonth() + 1);
      const day = String(date.getDate()); 
      return `${month}-${day}`; 
    }

    clickOnSeeResultsButton() {
      this.getSeeResultsButton().click();
    }

    checkSectionIsExpanded(section) {
      this.getAccordeon(section).should('have.attr','aria-expanded','true');
    }

    searchByBirthDate(date) {
      if (date == '40 years ago') {
        const today = new Date();
        const year = today.getFullYear() - 40; 
        const month = today.getMonth() + 1;
        const day = today.getDate();
        const birthDate = `${year}-${month}-${day}`;
        this.getBirthDateStartTextBox().type(birthDate);
        this.getBirthDateEndTextBox().type(birthDate);
      } else {
          this.getBirthDateStartTextBox().type(date);
          this.getBirthDateEndTextBox().type(date);
        }
    }

    clickOnLinkByIndex(linkIndex,resultIndex) {
      this.getBioByIndex(resultIndex).within(() => {
        this.getLinkByIndex(linkIndex).click();
      });
    }

}
  
  export default ImdbPage;
  