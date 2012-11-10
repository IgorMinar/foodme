'use strict';

foodMeApp.controller('CheckoutController',
    function CheckoutController($scope, cart, userInfo, $location) {

  $scope.cart = cart;
  $scope.restaurantId = cart.restaurant.id;
  $scope.user = userInfo;
  $scope.submitting = false;

  $scope.cards = [
    {type: 'visa', label: 'Visa'},
    {type: 'mc', label: 'MasterCard'},
    {type: 'amex', label: 'Amex'},
    {type: 'discover', label: 'Discover'}
  ];

  $scope.purchase = function() {
    $scope.submitting = true;
    cart.submitOrder().then(function(orderId) {
      $location.path('thank-you').search({orderId: orderId});
    });
  };
});
