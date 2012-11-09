'use strict';

describe('CheckoutController', function() {
  it('should setup scope', function() {
    var cart = { restaurant: {id: 123} };
    var userInfo = {};
    var scope = {};

    module(function($provide){
      $provide.value('cart', cart);
      $provide.value('userInfo', userInfo);
    });

    inject(function($controller) {
      var checkoutController = $controller('CheckoutController', {$scope:scope});

      expect(scope.cart).toBe(cart);
      expect(scope.restaurantId).toBe(123);
      expect(scope.user).toBe(userInfo);
      expect(scope.cards).toEqual([
        { type:'visa', label:'Visa' },
        { type:'mc', label:'MasterCard' },
        { type:'amex', label:'Amex' },
        { type:'discover', label:'Discover' }
      ]);
    });
  });
});
