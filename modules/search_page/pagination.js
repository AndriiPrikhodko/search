var until           = protractor.ExpectedConditions;
var config          = require('../../my_config');
var regex_list      = require('../../helpers/regex_list');

pagination = function(){};

pagination.prototype.pageCalucator = () =>
  browser.wait(until.presenceOf(element(by.css('div[data-qa-selector="results-amount"]'))), config.wait_time, 'Results are not visible')
  .then(() => element(by.css('div[data-qa-selector="results-amount"]')).getText()
    .then(results_amount => num_result_pages = Math.ceil(regex_list.startsOnFloating.exec(results_amount)[0] / config.default_results_per_page))
  )

pagination.prototype.nextPage = function(){
     currentPage = element(by.css('li.active'))
    return browser.executeScript( "arguments[0].scrollIntoView()", currentPage)
    .then(() => element.all(by.xpath('// li [@class = "active"] / following-sibling::li / a')).first().click())
    .then(() => browser.wait(until.presenceOf(element(by.xpath('// span [contains(.,"Erstzulassung ab")]'))), config.wait_time, 'Filter Erstzulassung is not visible'))
    .then(() => browser.sleep(3000))
}

module.exports = pagination;
