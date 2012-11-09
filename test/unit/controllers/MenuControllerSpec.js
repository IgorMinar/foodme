'use strict';

describe('MenuController', function() {
  it('should load restaurant', function($location, $controller) {
    var cart = {};

    module(function($provide){
      $provide.value('cart', cart);
    });

    inject(function($httpBackend, $routeParams, $controller) {
      var scope = {};

      $httpBackend.expectGET('/api/restaurant').respond({id:1234});

      $controller('MenuController', {$scope:scope});

      expect(scope.cart).toEqual(cart);
      expect(scope.restaurant.id).not.toBeDefined();
      $httpBackend.flush();
      expect(scope.restaurant.id).toEqual(1234);
    });
  });
});
