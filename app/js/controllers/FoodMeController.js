'use strict';

foodMeApp.controller('FoodMeController', function($scope, $location) {
  $scope.routeIs = function(routeName) {
    console.log('xxx', $location.path())
    return $location.path() === routeName;
  };
});
