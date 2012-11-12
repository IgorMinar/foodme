'use strict';

foodMeApp.controller('CustomerController',
    function CustomerController($scope) {

  $scope.findRestaurants = function(customerName, address) {
    alert(customerName + ' - ' + address);
  };
});
