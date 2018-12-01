var until = protractor.ExpectedConditions;

describe('QA change', function() {
  it('Check search', function() {
    browser.ignoreSynchronization = true;
    browser.get('https://www.autohero.com/de/search/');
  });
});
