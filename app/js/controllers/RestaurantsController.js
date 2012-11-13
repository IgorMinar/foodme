'use strict';

foodMeApp.controller('RestaurantsController',
    function RestaurantsController($scope, customer, $location) {

  if (!customer.address) {
    $location.url('/customer');
  }

  $scope.restaurants = [
    {
      "id":"angular",
      "name":"Angular Pizza",
      "cuisine":"pizza",
      "price":1,
      "rating":5,
      "description":"Home of the superheroic pizza!"
    },{
      "id":"tofuparadise",
      "name":"BBQ Tofu Paradise",
      "cuisine":"vegetarian",
      "price":2,
      "rating":1,
      "description":"Vegetarians, we have your BBQ needs covered. Our home-made tofu skewers and secret BBQ sauce will have you licking your fingers."
    },{
      "id":"beijing",
      "name":"Beijing Express",
      "cuisine":"chinese",
      "price":2,
      "rating":4,
      "description":"Fast, healthy, Chinese food. Family specials for takeout or delivery. Try our Peking Duck!"
    }
  ];

});
