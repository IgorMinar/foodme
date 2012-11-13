'use strict';

foodMeApp.controller('CustomerController',
    function CustomerController($scope) {

  $scope.findRestaurants = function(customerName, customerAddress) {
    alert(customerName + ' - ' + customerAddress);
  };
});
