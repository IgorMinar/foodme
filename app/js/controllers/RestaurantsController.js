'use strict';

foodMeApp.controller('RestaurantsController', function($scope, userInfo, $location, Restaurant) {

  if (!userInfo.address) {
    $location.url('/user-info');
  }

  $scope.CUISINE_OPTIONS = {
    african: 'African',
    american: 'American',
    barbecue: 'Barbecue',
    cafe: 'Cafe',
    chinese: 'Chinese',
    'czech/slovak': 'Czech / Slovak',
    german: 'German',
    indian: 'Indian',
    japanese: 'Japanese',
    mexican: 'Mexican',
    pizza: 'Pizza',
    thai: 'Thai',
    vegetarian: 'Vegetarian'
  };

  var today = new Date().getDay();
  $scope.DELIVERY_OPTIONS = [
    {id: today, title: 'Today'},
    {id: (today + 1) % 7, title: 'Tomorrow'}
  ];

  $scope.userInfo = userInfo;

  var filter = $scope.filter = {
    delivery: today,
    cuisine: [],
    price: null,
    rating: null,
    sortBy: 'name',
    sortAsc: true
  };

  $scope.sortBy = function(key) {
    if (filter.sortBy === key) {
      filter.sortAsc = !filter.sortAsc;
    } else {
      filter.sortBy = key;
      filter.sortAsc = true;
    }
  };

  $scope.sortIconFor = function(key) {
    if (filter.sortBy !== key) {
      return '';
    }

    return filter.sortAsc ? '\u25B2' : '\u25BC';
  };

  var filterAndSortRestaurants = function() {
    $scope.restaurants = [];

    // filter
    angular.forEach(allRestaurants, function(item, key) {
      if (filter.cuisine.length && filter.cuisine.indexOf(item.cuisine) === -1) {
        return;
      }

      if (filter.price && filter.price !== item.price) {
        return;
      }

      if (filter.rating && filter.rating !== item.rating) {
        return;
      }

      if (item.days.indexOf(filter.delivery) === -1) {
        return;
      }

      $scope.restaurants.push(item);
    });

    // sort
    $scope.restaurants.sort(function(a, b) {
      if (a[filter.sortBy] > b[filter.sortBy]) {
        return filter.sortAsc ? 1 : -1;
      }

      if (a[filter.sortBy] < b[filter.sortBy]) {
        return filter.sortAsc ? -1 : 1;
      }

      return 0;
    });
  };

  var allRestaurants = Restaurant.query(filterAndSortRestaurants);

  $scope.$watch('filter', filterAndSortRestaurants, true);
});
