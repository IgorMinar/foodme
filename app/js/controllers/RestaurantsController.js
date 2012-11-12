'use strict';

foodMeApp.controller('RestaurantsController',
    function RestaurantsController($scope, customer, $location, $http) {

  if (!customer.address) {
    $location.url('/customer');
  }

  $http.get('/api/restaurant').then(function(response) {
    $scope.restaurants = response.data;
  });

});
