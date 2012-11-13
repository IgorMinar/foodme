'use strict';

describe('step 10', function() {

  beforeEach(function() {
    browser().navigateTo('/index.html#/customer');

    // fill in the customer, so that we navigate to restaurants list
    input('customerName').enter('John');
    input('customerAddress').enter('Some city');
    element(':button.btn-primary').click();
  });


  it('should render 3 restaurants', function() {
    var table = repeater('.fm-restaurant-list table tr');
    expect(table.count()).toEqual(40);
  });
});
