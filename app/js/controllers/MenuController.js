'use strict';

foodMeApp.controller('MenuController', function MenuController($scope, $routeParams, Restaurant, cart) {

  $scope.cart = cart;
  $scope.restaurant = Restaurant.get({id: $routeParams.restaurantId});
});
