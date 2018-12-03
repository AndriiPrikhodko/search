var until           = protractor.ExpectedConditions;
var config          = require('../../my_config');

filtering = function(){};

filtering.prototype.yearAfter = function(year){
  return browser.wait(until.presenceOf(element(by.xpath('// span [contains(.,"Erstzulassung ab")]'))), config.wait_time, 'Filter Erstzulassung is not visible')
  .then(() => element(by.xpath('// span [contains(.,"Erstzulassung ab")]')).click())
  .then(() => browser.wait(until.presenceOf(element(by.css('select[name="yearRange.min"]'))), config.wait_time, 'Drop-down year selector is not visible'))
  .then(() => element(by.css('select[name="yearRange.min"]')).click())
  .then(() => browser.wait(until.presenceOf(element(by.css('select[name="yearRange.min"] option[data-qa-selector-value="2015"]'))), config.wait_time, 'Year option is not visible'))
  .then(() => element(by.css('select[name="yearRange.min"] option[data-qa-selector-value="'+ year +'"]')).click())
  .then(() => browser.wait(until.presenceOf(element(by.css('li[data-qa-selector-value = "'+ year +'"]'))), config.wait_time, 'Filter year after '+ year +' is not applied'))
}

module.exports = filtering;
