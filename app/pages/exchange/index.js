'use strict';

var Ractive = require('lib/ractive');
var emitter = require('lib/emitter');
var initCreate = require('./create');
var initAwaitingDeposit = require('./awaiting-deposit');

module.exports = function(el) {
  var ractive = new Ractive({
    el: el,
    template: require('./index.ract'),
    data: {
      isLoading: true
    }
  });

  var steps = {
    create: initCreate(ractive.find('#exchange_create')),
    awaitingDeposit: initAwaitingDeposit(ractive.find('#exchange_awaiting_deposit'))
  };
  var currentStep = steps.create;

  setTimeout(function() {
    ractive.set('isLoading', false);
    // showStep(steps.create);
    emitter.emit('set-exchange-awaiting-deposit', {
      depositAddress: 'LfmssDyX6iZvbVqHv6t9P6JWXia2JG7mdb',
      depositSymbol: 'LTC',
      depositMax: '13.4868',
      depositMin: '0.02299247 LTC',
      toSymbol: 'BTC',
      toAddress: '1N4h6WwnUaVgoDSh1X4cAcq294N1sKnwm1',
    });
    showStep(steps.awaitingDeposit);
  }, 300);

  emitter.on('change-exchange-step', function(step) {
    showStep(steps[step]);
  })

  function showStep(step) {
    currentStep.hide()
    step.show()
    currentStep = step
  }

  return ractive;
}