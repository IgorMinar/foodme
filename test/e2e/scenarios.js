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
    element(':button.btn-primary').click();

    browser().navigateTo('/index.html#/');

    expect(input('customerName').val()).toEqual('Customer');
    expect(input('address').val()).toEqual('Address');
  });

  it('should disable form submission button when empty', function() {
    input('customerName').enter('');
    input('address').enter('');

    expect(element(":button.btn-primary:disabled").count()).toEqual(1);
  });
});
