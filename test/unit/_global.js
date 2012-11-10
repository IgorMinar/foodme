'use strict';

beforeEach(module('foodMeApp'));

beforeEach(function() {
  this.addMatchers({
    toHaveClass: function(className, count) {
      var error, actual = this.actual;

      this.message = function() { return error; };

      if (actual.length < count) {
        error = 'Expected at least ' + count + ' but was ' + actual.length;
      } else {
        for(var i = 0, ii = actual.length; i < ii; i++) {
          var expected = actual.eq(i).hasClass(className);

          if (i < count) expected = !expected;

          if (expected) {
            error = 'Expected ' + className + ' on ' + i + ' but was ' +
                angular.mock.dump(actual.eq(i));
            break;
          }
        }
      }

      return !error;
    }
  });
});
