'use strict';

foodMeApp.controller('MenuController', function MenuController($scope, $routeParams, Restaurant) {

  $scope.restaurant = {
    id: 'fancy',
    name: 'Fancy Restaurant',
    address: 'Some street 23',
    ratting: 3,
    price: 4
  }//Restaurant.get({id: $routeParams.restaurantId});

});
