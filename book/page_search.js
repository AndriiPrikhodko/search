var until = protractor.ExpectedConditions;
var wait_time = 5000;

search = function(){};

search.prototype.openPage = function(){return browser.get('https://www.autohero.com/de/search/')}

search.prototype.filtering = () => new filtering();

search.prototype.sorting = () => new sorting();

search.prototype.assertAllResults = function(asserts){
  promise = protractor.promise.when()
  return asserts.length > 0 ? asserts.map(function(assert){promise.then(() => assert)}) : asserts[0]
}

module.exports = search;

filtering = function(){};

filtering.prototype.yearAfter = function(year){
  return browser.wait(until.presenceOf(element(by.xpath('// span [contains(.,"Erstzulassung ab")]'))), wait_time, 'Filter Erstzulassung is not visible')
  .then(() => element(by.xpath('// span [contains(.,"Erstzulassung ab")]')).click())
  .then(() => browser.wait(until.presenceOf(element(by.css('select[name="yearRange.min"]'))), wait_time, 'Drop-down year selector is not visible'))
  .then(() => element(by.css('select[name="yearRange.min"]')).click())
  .then(() => browser.wait(until.presenceOf(element(by.css('select[name="yearRange.min"] option[data-qa-selector-value="2015"]'))), wait_time, 'Year option is not visible'))
  .then(() => element(by.css('select[name="yearRange.min"] option[data-qa-selector-value="'+ year +'"]')).click())
  .then(() => browser.wait(until.presenceOf(element(by.css('li[data-qa-selector-value = "'+ year +'"]'))), wait_time, 'Filter year after '+ year +' is not applied'))
}

sorting = function(){};

sorting.prototype.priceDesc = function(){
  return browser.wait(until.presenceOf(element(by.css('select[name="sort"]'))), wait_time, 'Sorting bar is not visible')
  .then(() => element(by.css('select[name="sort"]')).click())
  .then(() => browser.wait(until.presenceOf(element(by.css('option[data-qa-selector-value="offerPrice.amountMinorUnits.desc"]'))), wait_time, 'Price descending option is not visible'))
  .then(() => element(by.css('option[data-qa-selector-value="offerPrice.amountMinorUnits.desc"]')).click())
  .then(() => browser.wait(until.stalenessOf(element(by.css('div.loading___1v1Pd'))), wait_time, 'Sorting is not executed'))
}
