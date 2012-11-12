'use strict';

describe('CustomerController', function() {
  var userInfo, scope;

  beforeEach(module(function($provide) {
    userInfo = {
      name: 'Bob Green',
      address: '123 Main St; Anytown AB 12345'
    };
    $provide.value('customer', userInfo);
  }));

  beforeEach(inject(function($controller) {
    scope = {};
    $controller('CustomerController', {$scope:scope});
  }));


  it('should set user name and address from userInfo', function() {
    expect(scope.customerName).toEqual('Bob Green');
    expect(scope.address).toEqual('123 Main St; Anytown AB 12345');
  });

  describe('findRestaurants', function() {

    it('should save customer name and address to userInfo', function() {
      scope.findRestaurants('newName', 'newAddress');

      expect(userInfo.name).toEqual('newName');
      expect(userInfo.address).toEqual('newAddress');
    });
  });
});
