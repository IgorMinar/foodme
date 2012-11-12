'use strict';

describe('services customer', function() {
  var customer, localStorage, $rootScope;

  beforeEach(module(function($provide) {
    localStorage = {
      fmCustomer: '{"name":"init-name","address":"init-address"}'
    };

    $provide.value('localStorage', localStorage);
  }));

  beforeEach(inject(function(_customer_, _$rootScope_) {
    customer = _customer_;
    $rootScope = _$rootScope_;
  }));


  it('should update any change to localStorage', function() {
    $rootScope.$apply(function() {
      customer.name = 'Michael Jackson';
      customer.address = '2231 Planet Mars, Apt 501';
    });

    expect(localStorage.fmCustomer).toBe('{"name":"Michael Jackson",' +
      '"address":"2231 Planet Mars, Apt 501"}');
  });


  it('should load initial value from localStorage', function() {
    expect(customer.name).toBe('init-name');
    expect(customer.address).toBe('init-address');
  });
});
