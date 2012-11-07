'use strict';

foodMeApp.service('cart', function Cart(localStorage) {
  var self = this;

  this.add = function(item) {
    this.items.push(item);
    serialize();
  };

  this.remove = function(item) {
    var index = this.cart.items.indexOf(item);
    if (index >= 0) {
      this.cart.items.splice(index, 1);
    }
    serialize();
  }

  this.checkout = function() {
    localStorage.items = null;
    localStorage.restaurant = null;
    deserialize();
  }

  function deserialize() {
    self.items = read('cartItems', []);
    self.restaurant = read('cartRestaurant', {});
    self.payment = read('cartItems', {});
  }

  function read(name, defaultValue) {
    var json = localStorage[name];

    return json ? JSON.parse(json) : defaultValue;
  }

  function serialize() {
    localStorage.cart = JSON.stringify(self.items);
  }

  this.items = null;
  this.restaurant = null;
  this.payment = null;

  deserialize();
});
