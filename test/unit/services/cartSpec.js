'use strict';

describe('cart', function() {
  var localStorage, cart, alerts, $rootScope, $httpBackend;

  beforeEach(module(function($provide) {
    alerts = [];
    $provide.value('localStorage', localStorage = {});
    $provide.value('alert', alerts.push.bind(alerts));
  }));

  beforeEach(inject(function(_cart_, _$rootScope_, _$httpBackend_) {
    cart = _cart_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  describe('add', function() {
    it('should complain if adding from different restaurants', function() {
      cart.add({}, {id: 123});
      cart.add({}, {id: 456});
      expect(alerts).toEqual(['Can not mix menu items from different restaurants.']);
    });

    it('should add item for first time', function() {
      cart.add({name:'item'}, {id: 123, name:'restaurantA'});
      $rootScope.$apply();

      expect(JSON.parse(localStorage.cartRestaurant)).
          toEqual({ id : 123, name : 'restaurantA' });
      expect(JSON.parse(localStorage.cartItems)).
          toEqual([{name:'item', qty:1}]);
    });

    it('should increment count on adding the item multiple times', function() {
      cart.add({name:'item'}, {id: 123, name:'restaurantA'});
      cart.add({name:'item'}, {id: 123, name:'restaurantA'});
      $rootScope.$apply();

      expect(JSON.parse(localStorage.cartRestaurant)).
          toEqual({ id : 123, name : 'restaurantA' });
      expect(JSON.parse(localStorage.cartItems)).
          toEqual([{name:'item', qty:2}]);
    });
  });

  describe('remove', function() {
    it('should remove item', function() {
      cart.add({name:'item'}, {id: 123, name:'restaurantA'});
      expect(cart.items.length).toEqual(1);

      cart.remove(cart.items[0]);
      expect(cart.items.length).toEqual(0);
    });
  });


  describe('total', function() {
    it('should compute total', function() {
      cart.add({name:'item', price:2}, {id: 123, name:'restaurantA'});
      cart.add({name:'item', price:2}, {id: 123, name:'restaurantA'});
      cart.add({name:'other', price:7}, {id: 123, name:'restaurantA'});

      expect(cart.total()).toEqual(11);
    });
  });


  describe('order', function() {
    it('should post order to server', function() {
      cart.add({name:'other', price:7}, {id: 123, name:'restaurantA'});

      $httpBackend.expectPOST('/api/order', {
        "items":[{"name":"other","price":7,"qty":1}],
        "restaurant":{"id":123,"name":"restaurantA"},
        "payment":{},
        "deliverTo":{}
      }).respond({});
      cart.submitOrder();
    });
  });

});
