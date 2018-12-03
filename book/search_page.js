var until           = protractor.ExpectedConditions;
var regex_list      = require('../helpers/regex_list');
var promiseChaining = require('../helpers/promiseChaining').execute;
var filtering       = require('../modules/search_page/filtering');
var sorting         = require('../modules/search_page/sorting');
var config          = require('../my_config');
var R               = require('ramda');

var p = []

search = function(){};

search.prototype.openPage = function(){return browser.get('https://www.autohero.com/de/search/')}

search.prototype.filtering = () => new filtering();

search.prototype.sorting = () => new sorting();

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
  return pageCalucator()
  .then(function(num_result_pages){
    promiseChaining(
      R.reduce(function(acc, page){
        acc.push(() => nextPage(element(by.css('li.active'))))
        acc = [...acc, ...asserts]
        return acc
        }
        ,[]
      )(R.range(1,num_result_pages))
  )
  })
}

module.exports = search;

var pageCalucator = () =>
  browser.wait(until.presenceOf(element(by.css('div[data-qa-selector="results-amount"]'))), config.wait_time, 'Results are not visible')
  .then(() => element(by.css('div[data-qa-selector="results-amount"]')).getText()
    .then(results_amount => num_result_pages = Math.ceil(regex_list.startsOnFloating.exec(results_amount)[0] / config.default_results_per_page))
  )

var nextPage = function(webElement){
  return browser.executeScript( "arguments[0].scrollIntoView()", webElement)
  .then(() => element.all(by.xpath('// li [@class = "active"] / following-sibling::li / a')).first().click())
  .then(() => browser.wait(until.presenceOf(element(by.xpath('// span [contains(.,"Erstzulassung ab")]'))), config.wait_time, 'Filter Erstzulassung is not visible'))
  .then(() => browser.sleep(3000))
}
