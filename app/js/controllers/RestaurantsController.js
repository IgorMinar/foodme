'use strict';

foodMeApp.controller('RestaurantsController', function($scope, userInfo, $location, Restaurant) {

  if (!userInfo.address) {
    $location.url('/user-info');
  }

  $scope.userInfo = userInfo;

  $scope.allRestaurants = Restaurant.query();

  $scope.filter = {
    cuisine: [],
    price: null,
    rating: null
  };

  var filterRestaurants = function() {
    var restaurants = $scope.allRestaurants;
    var filter = $scope.filter;

    $scope.restaurants = [];

    angular.forEach(restaurants, function(item, key) {

      if (filter.cuisine.length && filter.cuisine.indexOf(item.cuisine) === -1) {
        return;
      }

      if (filter.price && filter.price != item.price) {
        return;
      }

      if (filter.rating && filter.rating != item.rating) {
        return;
      }

      $scope.restaurants.push(item);
    });
  };

  $scope.$watch('allRestaurants', filterRestaurants, true);
  $scope.$watch('filter', filterRestaurants, true);
});
