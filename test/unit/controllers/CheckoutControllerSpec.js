'use strict';

describe('CheckoutController', function() {

  var ORDER_ID = 'abc123',
      cart, userInfo, $scope, checkoutController;


  beforeEach(function() {
    cart = {
      restaurant: {id: 123},
      submitOrder: jasmine.createSpy('submitOrder').andReturn({
        then: function(fn) {
          fn(ORDER_ID);
        }
      })
    };
    userInfo = {};
    $scope = {};

    module(function($provide){
      $provide.value('cart', cart);
      $provide.value('userInfo', userInfo);
    });

    inject(function($controller) {
      checkoutController = $controller('CheckoutController', {$scope:$scope});
    });
  });


  it('should setup scope', function() {
    expect($scope.cart).toBe(cart);
    expect($scope.restaurantId).toBe(123);
    expect($scope.user).toBe(userInfo);
    expect($scope.cards).toEqual([
      { type:'visa', label:'Visa' },
      { type:'mc', label:'MasterCard' },
      { type:'amex', label:'Amex' },
      { type:'discover', label:'Discover' }
    ]);
  });


  describe('purchase', function() {

    it('should submit order from the cart', function() {
      $scope.purchase();
      expect(cart.submitOrder).toHaveBeenCalled();
    });


    it('should change location after the order was submitted', inject(function($location) {
      $scope.purchase();
      expect($location.url()).toBe('/thank-you?orderId=' + ORDER_ID);
    }));


    it('should set "submitting" model to true', function() {
      $scope.purchase();
      expect($scope.submitting).toBe(true);
    });
  });
});
