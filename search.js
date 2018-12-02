var until = protractor.ExpectedConditions;
var wait_time = 5000;
var regex_price = new RegExp(/^[0-9|.]*/)
var regex_year = new RegExp(/[0-9]*$/)
var p = [];

describe('QA challenge', function() {
  it('Check search', function() {
    browser.ignoreSynchronization = true;
    browser.get('https://www.autohero.com/de/search/');
    browser.wait(until.presenceOf(element(by.xpath('// span [contains(.,"Erstzulassung ab")]'))), wait_time, 'Filter Erstzulassung is not visible');
    element(by.xpath('// span [contains(.,"Erstzulassung ab")]')).click();

    browser.wait(until.presenceOf(element(by.css('select[name="yearRange.min"]'))), wait_time, 'Drop-down year selector is not visible');
    element(by.css('select[name="yearRange.min"]')).click();

    browser.wait(until.presenceOf(element(by.css('select[name="yearRange.min"] option[data-qa-selector-value="2015"]'))), wait_time, 'Year option is not visible');
    element(by.css('select[name="yearRange.min"] option[data-qa-selector-value="2015"]')).click();

    browser.wait(until.stalenessOf(element(by.css('div.loading___1v1Pd'))), wait_time, 'Sorting is not executed');

    browser.wait(until.presenceOf(element(by.css('li[data-qa-selector-value = "2015"]'))), wait_time, 'Filter year after 2015 is not applied');

    element(by.css('select[name="sort"]')).click();
    browser.wait(until.presenceOf(element(by.css('option[data-qa-selector-value="offerPrice.amountMinorUnits.desc"]'))), wait_time, 'Price descending option is not visible');
    element(by.css('option[data-qa-selector-value="offerPrice.amountMinorUnits.desc"]')).click();
    browser.wait(until.stalenessOf(element(by.css('div.loading___1v1Pd'))), wait_time, 'Sorting is not executed');
    element.all(by.css('ul[data-qa-selector="spec-list"]'))
    .then(specs => specs.map(spec => spec.all(by.css('li')).first().getText().then(year => expect(regex_year.exec(year)[0]).not.toBeLessThan(2015))) );

    element.all(by.css('div[data-qa-selector="price"]'))
    .then(prices => prices.map(function(price, i){
      price.getText().then(price => p.push((regex_price.exec(price)[0])))
      .then(function(){if(i > 0) expect(p[i-1]).not.toBeLessThan(p[i])})
    }
  ));
  });
});
