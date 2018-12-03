var until           = protractor.ExpectedConditions;
var regex_list      = require('../helpers/regex_list');
var promiseChaining = require('../helpers/promiseChaining').execute;
var filtering       = require('../modules/search_page/filtering');
var sorting         = require('../modules/search_page/sorting');
var pagination      = require('../modules/search_page/pagination');
var config          = require('../my_config');
var R               = require('ramda');

var p = []

pagination = new pagination()
filtering = new filtering()
sorting = new sorting()

search = function(){
  var filter_year;
};

search.prototype.openPage = function(){return browser.get('https://www.autohero.com/de/search/')}

search.prototype.setAssertYear = function(filter_year){this.filter_year = filter_year}

search.prototype.filtering = () => filtering;

search.prototype.sorting = () => sorting;

search.prototype.assertYear = function(){
  that = this
  return element.all(by.css('ul[data-qa-selector="spec-list"]'))
          .then(specs =>
            specs.map(spec => spec.all(by.css('li')).first().getText()
            .then(year => expect(parseInt(regex_list.endsOnNumber.exec(year)[0])).not.toBeLessThan(that.filter_year))
          )
        )
}

search.prototype.assertPriceDesc = function(){
  return element.all(by.css('div[data-qa-selector="price"]'))
    .then(prices => prices.map(function(price, i){
      price.getText().then(price => p.push(parseFloat(regex_list.startsOnFloating.exec(price)[0])))
      .then(function(){
        if(p.length > 1){
          p2check = R.takeLast(2,p)
          expect(p2check[0]).not.toBeLessThan(p2check[1])}
        })
    })
  )
}

search.prototype.assertAllResults = function(asserts){
  return pagination.pageCalucator()
  .then(function(num_result_pages){
    promiseChaining(
      R.compose(
        R.flatten,
        R.append(asserts),
        R.reduce(function(acc, page){
          acc = [...acc, ...asserts]
          acc.push(pagination.nextPage)
          return acc
          }
          ,[])
      )(R.range(1,num_result_pages))
  )
  })
}

module.exports = search;
