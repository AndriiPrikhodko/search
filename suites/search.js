var search = require( '../book/search_page' );

filter_year = 2015;

describe('QA challenge', function() {
  browser.ignoreSynchronization = true;
  search = new search();

  it('Check that all cars are filtered by year and sorted by price desc', function() {
      search.openPage()
      search.filtering().yearAfter(filter_year)
      search.sorting().priceDesc()
      search.setAssertYear(filter_year)
      search.assertAllResults([search.assertYear, search.assertPriceDesc])
  });
});
