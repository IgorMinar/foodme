'use strict';

foodMeApp.factory('userInfo', function($rootScope, $window, $log) {

  var userInfoString = $window.localStorage.userInfo;

  var userInfo = userInfoString ? JSON.parse(userInfoString) : {
    name: undefined,
    address: undefined
  };


  $rootScope.$watch(function() { return userInfo; }, function() {
    $window.localStorage.userInfo = JSON.stringify(userInfo);
  }, true);

  return userInfo;

});

