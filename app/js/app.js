'use strict';

var foodMeApp = angular.module('foodMeApp', []);

foodMeApp.config(function($routeProvider) {

  $routeProvider.
      when('/', {
        controller: 'CustomerController',
        templateUrl: 'views/customer.html'
      });
});
