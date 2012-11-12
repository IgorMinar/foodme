'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('foodme', function() {

  beforeEach(function() {
    browser().navigateTo('/index.html');
  });

  it('should persist customer information', function() {
    input('customerName').enter('Customer');
    input('customerAddress').enter('Address');

    element(':button.btn-primary').click();

    //reload the page
    browser().navigateTo('/index.html#/');

    expect(input('customerName').val()).toEqual('Customer');
    expect(input('customerAddress').val()).toEqual('Address');
  });


  it('should disable form submission button when empty', function() {
    input('customerName').enter('');
    input('customerAddress').enter('');

    expect(element(':button.btn-primary:disabled').count()).toEqual(1);
  });
});
