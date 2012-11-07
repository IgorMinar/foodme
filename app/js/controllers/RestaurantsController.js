'use strict';

foodMeApp.controller('RestaurantsController', function($scope, userInfo, $location, $resource) {
  var Restaurant = $resource('/api/restaurant/:id', {id: '@id'});

  if (!userInfo.address) {
    $location.url('/user-info');
  }

  $scope.userInfo = userInfo;

  $scope.restaurants = Restaurant.query();

});
