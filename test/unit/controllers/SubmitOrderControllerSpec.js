'use strict';

describe('SubmitOrderController', function() {
  it('should order cart', function() {
    var cart = {
      order: jasmine.createSpy('order')
    };

    module(function($provide){
      $provide.value('cart', cart);
    });

    inject(function($httpBackend, $routeParams, $controller) {
      var scope = {};

      $controller('SubmitOrderController', {$scope:scope});

      expect(cart.order).toHaveBeenCalled();;
    });
  });
});
