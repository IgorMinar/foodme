'use strict';

foodMeApp.controller('RestaurantsController', function($scope, userInfo, $location, Restaurant) {

  if (!userInfo.address) {
    $location.url('/user-info');
  }

  $scope.userInfo = userInfo;

  $scope.filter = {
    cuisine: [],
    price: null,
    rating: null
  };

  var filterRestaurants = function() {
    var filter = $scope.filter;

    $scope.restaurants = [];

    angular.forEach(allRestaurants, function(item, key) {

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

  var allRestaurants = Restaurant.query(filterRestaurants);

  $scope.$watch('filter', filterRestaurants, true);
});
