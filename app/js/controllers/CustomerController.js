'use strict';

foodMeApp.controller('CustomerController',
    function CustomerController($scope, customer, $location) {

  $scope.customerName = customer.name;
  $scope.customerAddress = customer.address;


  $scope.findRestaurants = function(customerName, customerAddress) {
    customer.name = customerName;
    customer.address = customerAddress;

    $location.url('/');
  };
});
