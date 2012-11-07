'use strict';

foodMeApp.controller('RestaurantsController', function($scope, userInfo, $location, Restaurant) {

  if (!userInfo.address) {
    $location.url('/user-info');
  }

  $scope.userInfo = userInfo;

  $scope.restaurants = Restaurant.query();

});
