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

search = function(){};

search.prototype.openPage = function(){return browser.get('https://www.autohero.com/de/search/')}

search.prototype.filtering = () => filtering;

search.prototype.sorting = () => sorting;

search.prototype.assertYear = function(min_year){
  return element.all(by.css('ul[data-qa-selector="spec-list"]'))
          .then(specs =>
            specs.map(spec => spec.all(by.css('li')).first().getText()
            .then(year => expect(regex_list.endsOnNumber.exec(year)[0]).not.toBeLessThan(min_year))
            )
          )
}

search.prototype.assertPriceDesc = function(){
  return element.all(by.css('div[data-qa-selector="price"]'))
    .then(prices => prices.map(function(price, i){
      price.getText().then(price => p.push((regex_list.startsOnFloating.exec(price)[0])))
      .then(function(){if(i > 0) expect(p[i-1]).not.toBeLessThan(p[i])})
    })
  )
}

search.prototype.assertAllResults = function(asserts){
  var asserts = asserts;
  return pagination.pageCalucator()
  .then(function(num_result_pages){
    promiseChaining(
      R.reduce(function(acc, page){
        acc.push(() => pagination.nextPage())
        acc = [...acc, ...asserts]
        return acc
        }
        ,[]
      )(R.range(1,num_result_pages))
  )
  })
}

module.exports = search;
