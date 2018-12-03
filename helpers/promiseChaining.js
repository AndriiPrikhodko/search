var R = require('ramda');

exports.execute = promises => R.reduce((chain,promise) => chain = chain.then(promise),protractor.promise.when())
(promises)
