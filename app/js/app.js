'use strict';

var foodMeApp = angular.module('foodMeApp', ['ngResource']);

foodMeApp.config(function($routeProvider) {

  $routeProvider.
      when('/', {
        controller: 'RestaurantsController',
        templateUrl: 'views/restaurants.html'
      });
});
