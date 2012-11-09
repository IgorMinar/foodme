'use strict';

describe('ThankYouController', function() {

  it('should read orderId from $routeParams and expose it on the scope',
      inject(function($controller, $routeParams) {

    var $scope = {},
        $routeParams = {};

    $routeParams.orderId = 'abc123';

    $controller('ThankYouController', {$scope: $scope, $routeParams: $routeParams});

    expect($scope.orderId).toBe('abc123');
  }));

});
