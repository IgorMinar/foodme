'use strict';

describe('step 15', function() {

  beforeEach(function() {
    browser().navigateTo('/index.html#/customer');

    // fill in the customer, so that we navigate to restaurants list
    input('customerName').enter('John');
    input('customerAddress').enter('Some city');
    element(':button.btn-primary').click();
  });


  it('should have a change button that navigates to /customer', function() {
    element('.breadcrumb a:contains(Change)').click();
    expect(browser().location().url()).toEqual('/customer');
  });
});
