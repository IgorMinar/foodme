'use strict';

var foodMeApp = angular.module('foodMeApp', []);

foodMeApp.config(function($routeProvider) {

  $routeProvider.
      when('/', {
        controller: 'CustomerController',
        templateUrl: 'views/customer.html'
      }).
      when('/who-we-are', {
        templateUrl: 'views/who-we-are.html'
      }).
      when('/how-it-works', {
        templateUrl: 'views/how-it-works.html'
      }).
      when('/help', {
        templateUrl: 'views/help.html'
      });

});
