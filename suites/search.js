var search = require( '../book/page_search' );
var regex_price = new RegExp(/^[0-9|.]*/)
var regex_year = new RegExp(/[0-9]*$/)
var p = []

search = new search();

describe('QA challenge', function() {
  it('Check search results', function() {
      browser.ignoreSynchronization = true;

      search.openPage();
      search.filtering().yearAfter("2015");
      search.sorting().priceDesc();
      search.assertAllResults([assertYear(2015), assertPriceDesc()]);
  });
});

var assertYear = function(min_year){
  return element.all(by.css('ul[data-qa-selector="spec-list"]'))
          .then(specs =>
            specs.map(spec => spec.all(by.css('li')).first().getText()
            .then(year => expect(regex_year.exec(year)[0]).not.toBeLessThan(min_year))
            )
          )
}

var assertPriceDesc = function(){
  return element.all(by.css('div[data-qa-selector="price"]'))
    .then(prices => prices.map(function(price, i){
      price.getText().then(price => p.push((regex_price.exec(price)[0])))
      .then(function(){if(i > 0) expect(p[i-1]).not.toBeLessThan(p[i])})
    })
  )
}
