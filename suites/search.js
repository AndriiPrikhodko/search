var search = require( '../book/search_page' );

filter_year = 2015;
search = new search();

describe('QA challenge', function() {
  it('Check search results', function() {
      browser.ignoreSynchronization = true;
      
      search.openPage()
      search.filtering().yearAfter(filter_year)
      search.sorting().priceDesc()
      search.setAssertYear(filter_year)
      search.assertAllResults([search.assertYear, search.assertPriceDesc])
  });
});
