'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('foodme', function() {

  beforeEach(function() {
    browser().navigateTo('/index.html');
  });

  it('should read customer information and alert when button is clicked', function() {
    var alertText;

    input('customerName').enter('Customer');
    input('customerAddress').enter('Address');

    this.addFutureAction('mock alert()', function(window, document, done) {
      window.alert = function(text) { alertText = text; };
      done();
    });

    element(':button.btn-primary').click();

    expect(this.addFutureAction('alert text', function(window, decoment, done){
      done(null, alertText);
    })).toEqual('Customer - Address');
  });
});
