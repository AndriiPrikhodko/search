var until           = protractor.ExpectedConditions;
var config          = require('../../my_config');

sorting = function(){};

sorting.prototype.priceDesc = function(){
  return browser.wait(until.presenceOf(element(by.css('select[name="sort"]'))), config.wait_time, 'Sorting bar is not visible')
  .then(() => element(by.css('select[name="sort"]')).click())
  .then(() => browser.wait(until.presenceOf(element(by.css('option[data-qa-selector-value="offerPrice.amountMinorUnits.desc"]'))), config.wait_time, 'Price descending option is not visible'))
  .then(() => element(by.css('option[data-qa-selector-value="offerPrice.amountMinorUnits.desc"]')).click())
  .then(() => browser.wait(until.stalenessOf(element(by.css('div.loading___1v1Pd'))), config.wait_time, 'Sorting is not executed'))
}

module.exports = sorting;
