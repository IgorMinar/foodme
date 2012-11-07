'use strict';

foodMeApp.service('cart', function Cart(localStorage) {
  var self = this,
      bindings = [];

  this.add = function(item) {
    this.items.push(item);
    serialize();
  };

  this.remove = function(item) {
    var index = this.items.indexOf(item);
    if (index >= 0) {
      this.items.splice(index, 1);
    }
    serialize();
  }

  this.total = function() {
    return this.items.reduce(function(sum, item) {
      return sum + Number(item.price);
    }, 0);
  };

  this.checkout = function() {
    localStorage.items = null;
    localStorage.restaurant = null;
    deserialize();
  }

  function deserialize() {
    bindings.forEach(function(args) {
      var json = localStorage[args[1]];

      self[args[0]] = json ? JSON.parse(json) : new args[2];
    });
  }

  function serialize() {
    bindings.forEach(function(args) {
      localStorage[args[1]] = JSON.stringify(self[args[0]]);
    });
  }

  function bind() {
    bindings.push(arguments);
  }

  this.items;
  this.restaurant;
  this.payment;

  bind('items', 'cartItems', Array);
  bind('restaurant', 'cartRestaurant', Object);
  bind('payment', 'cartPayment', Object);
  deserialize();
});
