'use strict';

foodMeApp.controller('FoodMeController', function($scope, $location) {
  $scope.routeIs = function(routeName) {
    return $location.path() === routeName;
  };
});
