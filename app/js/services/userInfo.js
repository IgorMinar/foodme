'use strict';

foodMeApp.factory('userInfo', function($rootScope, localStorage, $log) {

  var userInfoString = localStorage.userInfo;

  var userInfo = userInfoString ? JSON.parse(userInfoString) : {
    name: undefined,
    address: undefined
  };


  $rootScope.$watch(function() { return userInfo; }, function() {
    $window.localStorage.userInfo = JSON.stringify(userInfo);
  }, true);

  return userInfo;

});

