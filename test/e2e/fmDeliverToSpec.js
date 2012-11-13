'use strict';

describe('fmDeliverTo', function() {

  beforeEach(function() {
    browser().navigateTo('/index.html#/customer');

    // fill in the customer, so that we navigate to restaurants list
    input('customerName').enter('John');
    input('customerAddress').enter('Some city');
    element(':button.btn-primary').click();
  });


  it('should show deliver to address', function() {
    expect(element('.breadcrumb').text()).toMatch('Some city');
  });
});
