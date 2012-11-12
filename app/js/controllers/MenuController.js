'use strict';

foodMeApp.controller('MenuController',
    function MenuController($scope, $routeParams, Restaurant) {

  $scope.restaurant = Restaurant.get({id: $routeParams.restaurantId});

});
