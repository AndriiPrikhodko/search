var search = require( '../book/page_search' );

filter_year = 2015;
search = new search();

describe('QA challenge', function() {
  it('Check search results', function() {
      browser.ignoreSynchronization = true;

      search.openPage();
      search.filtering().yearAfter(filter_year);
      search.sorting().priceDesc();
      search.assertAllResults([search.assertYear(filter_year), search.assertPriceDesc()]);
  });
});
