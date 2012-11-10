'use strict';

foodMeApp.controller('RestaurantsController',
    function RestaurantsController($scope, userInfo, $location, Restaurant, today) {

  if (!userInfo.address) {
    $location.url('/customer');
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

  $scope.DELIVERY_OPTIONS = [
    {id: today(), title: 'Today'},
    {id: (today() + 1) % 7, title: 'Tomorrow'}
  ];

  $scope.userInfo = userInfo;

  var filter = $scope.filter = {
    delivery: today()   ,
    cuisine: [],
    price: null,
    rating: null,
    sortBy: 'name',
    sortAsc: true
  };

  $scope.sortIconFor = function(key) {
    if (filter.sortBy !== key) {
      return '';
    }

    return filter.sortAsc ? '\u25B2' : '\u25BC';
  };

  var filterRestaurants = function() {
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
  };

  var allRestaurants = Restaurant.query(filterRestaurants);

  $scope.$watch('filter', filterRestaurants, true);
});
