'use strict';

foodMeApp.service('cart', function Cart(localStorage, customer, $rootScope, $http, alert) {
  var self = this;


  self.add = function(item, restaurant) {
    if (!self.restaurant || !self.restaurant.id) {
      self.restaurant = {
        id: restaurant.id,
        name: restaurant.name,
        description: restaurant.description
      };
    }

    if (self.restaurant.id == restaurant.id) {
      self.items.forEach(function(cartItem) {
        if (item && cartItem.name == item.name) {
          cartItem.qty ++;
          item = null;
        }
      });
      if (item) {
        item = angular.copy(item);
        item.qty = 1;
        self.items.push(item);
      }
    } else {
      alert('Can not mix menu items from different restaurants.');
    }
  };


  self.remove = function(item) {
    var index = self.items.indexOf(item);
    if (index >= 0) {
      self.items.splice(index, 1);
    }
    if (!self.items.length) {
      self.restaurant = {};
    }
  }


  self.total = function() {
    return self.items.reduce(function(sum, item) {
      return sum + Number(item.price * item.qty);
    }, 0);
  };


  self.submitOrder = function() {
    if (self.items.length) {
      return $http.post('/api/order', {
        items: self.items,
        restaurant: self.restaurant,
        payment: self.payment,
        deliverTo: customer
      }).then(function(response) {
        self.reset();
        return response.data.orderId;
      });
    }
  }


  self.reset = function() {
    self.items = [];
    self.restaurant = {};
  };


  createPersistentProperty('items', 'fmCartItems', Array);
  createPersistentProperty('restaurant', 'fmCartRestaurant', Object);
  self.payment = {}; // don't keep CC info in localStorage


  function createPersistentProperty(localName, storageName, Type) {
    var json = localStorage[storageName];

    self[localName] = json ? JSON.parse(json) : new Type;

    $rootScope.$watch(
        function() { return self[localName]; },
        function(value) {
          if (value) {
            localStorage[storageName] = JSON.stringify(value);
          }
        },
        true);
  }
});
