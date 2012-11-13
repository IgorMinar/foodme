'use strict';

var foodMeApp = angular.module('foodMeApp', ['ngResource']);

foodMeApp.config(function($routeProvider) {

  $routeProvider.
      when('/', {
        controller: 'RestaurantsController',
        templateUrl: 'views/restaurants.html'
      }).
      when('/menu/:restaurantId', {
        controller: 'MenuController',
        templateUrl: 'views/menu.html'
      }).
      when('/checkout', {
        controller: 'CheckoutController',
        templateUrl: 'views/checkout.html'
      }).
      when('/thank-you', {
        controller: 'ThankYouController',
        templateUrl: 'views/thank-you.html'
      }).
      when('/customer', {
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
