'use strict';

var foodMeApp = angular.module('foodMeApp', []);

foodMeApp.config(function($routeProvider) {

  $routeProvider.
      when('/', {
        controller: 'RestaurantsController',
        templateUrl: 'views/restaurants.html'
      }).
      when('/user-info', {
        controller: 'IntroController',
        templateUrl: 'views/intro.html'
      }).
      when('/about-us', {
        templateUrl: 'views/about-us.html'
      }).
      when('/how-it-works', {
        templateUrl: 'views/how-it-works.html'
      });

});
