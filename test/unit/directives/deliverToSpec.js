'use strict';

describe('deliverTo', function() {
  var userInfo, element;


  // load template into $templateCache
  beforeEach(module('js/directives/deliverTo.html'));

  beforeEach(module(function($provide){
    userInfo = {};
    $provide.value('userInfo', userInfo);
  }));

  beforeEach(inject(function($compile, $rootScope) {
    element = $compile('<fm-deliver-to></fm-deliver-to>')($rootScope);
    $rootScope.$apply();
  }));


  it("should display customer's address", inject(function($compile, $rootScope, userInfo) {
    userInfo.address = "some really cool address";
    $rootScope.$apply();

    expect(element.text()).toMatch(/Deliver to: some really cool address/);

    userInfo.address = "changed address";
    $rootScope.$apply();

    expect(element.text()).toMatch(/Deliver to: changed address/);
  }));


  it("should display a link to change the delivery address", inject(function($compile, $rootScope) {
    var anchor = element.find('a');

    expect(anchor.attr('href')).toBe('#/customer');
    expect(anchor.text()).toBe('Change');
  }));

});
