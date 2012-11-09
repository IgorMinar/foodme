'use strict';

foodMeApp.controller("ThankYouController", function($scope, $routeParams) {
  $scope.orderId = $routeParams.orderId;
});
