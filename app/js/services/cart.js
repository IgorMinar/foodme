'use strict';

foodMeApp.service('cart', function Cart(localStorage, userInfo, $rootScope, $http, alert) {
  var self = this;

  this.add = function(item, restaurant) {
    if (!this.restaurant || !this.restaurant.id) {
      this.restaurant = {
        id: restaurant.id,
        name: restaurant.name,
        description: restaurant.description
      };
    }

    if (this.restaurant.id == restaurant.id) {
      this.items.forEach(function(cartItem) {
        if (item && cartItem.name == item.name) {
          cartItem.qty ++;
          item = null;
        }
      });
      if (item) {
        item = angular.copy(item);
        item.qty = 1;
        this.items.push(item);
      }
    } else {
      alert('Can not mix menu items from different restaurants.');
    }
  };

  this.remove = function(item) {
    var index = this.items.indexOf(item);
    if (index >= 0) {
      this.items.splice(index, 1);
    }
  }

  this.total = function() {
    return this.items.reduce(function(sum, item) {
      return sum + Number(item.price * item.qty);
    }, 0);
  };

  this.order = function() {
    if (this.items.length) {
      $http.post('/api/order', {
        items: this.items,
        restaurant: this.restaurant,
        payment: this.payment,
        deliverTo: userInfo
      });

      this.reset();
    }
  }

  this.reset = function() {
    this.items = [];
    this.restaurant = {};
  };

  function bind(localName, storageName, Type) {
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

  this.items;
  this.restaurant;
  this.payment;

  bind('items', 'cartItems', Array);
  bind('restaurant', 'cartRestaurant', Object);
  bind('payment', 'cartPayment', Object);
});
