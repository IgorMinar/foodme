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
    delivery: today(),
    cuisine: [],
    price: null,
    rating: null
  };


  $scope.restaurants = Restaurant.query();

});
