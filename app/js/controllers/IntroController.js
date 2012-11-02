'use strict';

foodMeApp.controller('IntroController', function IntroController($scope, userInfo, $location) {

  $scope.userName = userInfo.name;
  $scope.address = userInfo.address;


  $scope.findRestaurants = function(userName, address) {

    userInfo.name = userName;
    userInfo.address = address;

    $location.url('/');
  };

});
