'use strict';

describe('CustomerController', function() {
  var customer, scope;

  beforeEach(module(function($provide) {
    customer = {
      name: 'Bob Green',
      address: '123 Main St; Anytown AB 12345'
    };
    $provide.value('customer', customer);
  }));

  beforeEach(inject(function($controller) {
    $controller('CustomerController', {$scope: scope = {}});
  }));


  it('should set customerName and customerAddress from customer service', function() {
    expect(scope.customerName).toEqual('Bob Green');
    expect(scope.customerAddress).toEqual('123 Main St; Anytown AB 12345');
  });


  describe('findRestaurants', function() {

    it('should save customer name and address to customer', function() {
      scope.findRestaurants('newName', 'newAddress');

      expect(customer.name).toEqual('newName');
      expect(customer.address).toEqual('newAddress');
    });


    it('should redirect the user to restaurant list', inject(function($location) {
      $location.url('/customer');
      expect($location.url()).toEqual('/customer');

      scope.findRestaurants('newName', 'newAddress');
      expect($location.url()).toEqual('/');
    }));
  });
});
