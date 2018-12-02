var search = require( '../book/page_search' );

search = new search();

describe('QA challenge', function() {
  it('Check search results', function() {
      browser.ignoreSynchronization = true;

      search.openPage();
      search.filtering().yearAfter("2015");
      search.sorting().priceDesc();
      search.assertAllResults([search.assertYear(2015), search.assertPriceDesc()]);
      browser.sleep(5000);
  });
});
