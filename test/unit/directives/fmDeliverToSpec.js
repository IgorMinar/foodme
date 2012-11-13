'use strict';

describe('deliverTo', function() {
  var customer, element;


  // load template into $templateCache
  beforeEach(module('js/directives/fmDeliverTo.html'));

  beforeEach(module(function($provide){
    customer = {};
    $provide.value('customer', customer);
  }));

  beforeEach(inject(function($compile, $rootScope) {
    element = $compile('<fm-deliver-to></fm-deliver-to>')($rootScope);
    $rootScope.$apply();
  }));


  it("should display customer's address", inject(function($compile, $rootScope, customer) {
    customer.address = "some really cool address";
    $rootScope.$apply();

    expect(element.text()).toMatch(/Deliver to: some really cool address/);

    customer.address = "changed address";
    $rootScope.$apply();

    expect(element.text()).toMatch(/Deliver to: changed address/);
  }));


  it("should display a link to change the delivery address", inject(function($compile, $rootScope) {
    var anchor = element.find('a');

    expect(anchor.attr('href')).toBe('#/customer');
    expect(anchor.text()).toBe('Change');
  }));

});
