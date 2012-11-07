'use strict';

describe('cart', function() {
  var localStorage;

  beforeEach(module(function($provide) {
    $provide.value('localStorage', localStorage = {});
  }));


  it('should add item', inject(function(cart) {
    cart.add();
  }));
});
