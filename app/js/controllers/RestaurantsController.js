'use strict';

foodMeApp.controller('RestaurantsController',
    function RestaurantsController($scope) {

  $scope.restaurants = [{
    name: 'Angular Pizza', id: 'angular', price: 1, rating: 5,
    description: 'Home of the superheroic pizza!'
  }, {
    name: 'BBQ Tofu Paradise', id: 'tofuparadise', price: 2, rating: 1,
    description: 'Home of the superheroic pizza!Vegetarians, we have your BBQ needs covered. Our home-made tofu skewers and secret BBQ sauce will have you licking your fingers.'
  }, {
    name: 'Beijing Express', id: 'beijing', price: 2, rating: 4,
    description: 'Fast, healthy, Chinese food. Family specials for takeout or delivery. Try our Peking Duck!'
  }];
});
