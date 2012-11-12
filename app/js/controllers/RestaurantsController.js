'use strict';

foodMeApp.controller('RestaurantsController',
    function RestaurantsController($scope, customer, $location, Restaurant) {

  if (!customer.address) {
    $location.url('/customer');
  }

  $scope.restaurants = Restaurant.query();

  $scope.filter = {
    cuisine: [],
    price: null,
    rating: null
  };

});
