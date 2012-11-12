'use strict';

foodMeApp.controller('CustomerController',
    function CustomerController($scope, customer, $location) {

  $scope.customerName = customer.name;
  $scope.address = customer.address;


  $scope.findRestaurants = function(customerName, address) {
    customer.name = customerName;
    customer.address = address;

    $location.url('/');
  };
});
