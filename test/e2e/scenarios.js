'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('foodme', function() {

  beforeEach(function() {
    browser().navigateTo('/index.html');
  });

  it('should read delivery information', function() {
    var alertText;

    input('customerName').enter('Customer');
    input('address').enter('Address');
    this.addFutureAction('mack alert()', function(window, document, done) {
      window.alert = function(text) { alertText = text; };
      done();
    });
    element(':button.btn-primary').click();
    expect(this.addFutureAction('alert text', function(window, decoment, done){
      done(null, alertText);
    })).toEqual('Customer - Address');
  });
});
