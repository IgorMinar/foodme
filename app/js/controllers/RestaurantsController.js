'use strict';

foodMeApp.controller('RestaurantsController',
    function RestaurantsController($scope, Restaurant) {

  $scope.restaurants = Restaurant.query();
});
