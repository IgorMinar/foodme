'use strict';

foodMeApp.controller('CustomerController',
    function CustomerController($scope, userInfo, $location) {

  $scope.customerName = userInfo.name;
  $scope.address = userInfo.address;


  $scope.findRestaurants = function(customerName, address) {
    userInfo.name = customerName;
    userInfo.address = address;

    $location.url('/');
  };
});
