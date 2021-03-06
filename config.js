var jasmine2SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
  seleniumServerJar: 'node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-3.141.59.jar',
  specs: ['suites/search.js'],
  jasmineNodeOpts: {defaultTimeoutInterval: 600000},
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
        args: ['--window-size=1920,1080']
    }
  },
  logLevel: 'WARN',
  onPrepare: function () {
    jasmine.getEnv().addReporter(new jasmine2SpecReporter({
      spec: {
        displayStacktrace: true
      }
    }));
  }
};
