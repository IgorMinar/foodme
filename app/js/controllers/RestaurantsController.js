'use strict';

foodMeApp.controller('RestaurantsController',
    function RestaurantsController(customer, $location) {

  if (!customer.address) {
    $location.url('/customer');
  }

});
