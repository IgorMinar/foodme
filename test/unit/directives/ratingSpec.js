'use strict';

describe('rating', function() {
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

  var $rootElement, $rootScope, ratingScope;

  beforeEach(inject(function(_$rootElement_, $compile, _$rootScope_) {
    $rootScope = _$rootScope_;
    $rootElement = _$rootElement_;

    $rootElement.html(
        '<fm-rating symbol="{{symbol}}" max="{{max}}" disabled="{{disabled}}" ' +
            'ng-model="$parent.model"></fm-rating>');

    $rootScope.symbol = '*';
    $rootScope.max = 5;
    $compile($rootElement)($rootScope);
    $rootScope.$apply();
    ratingScope = $rootElement.find('ul').scope();
  }));


  it('should update the view on model', function() {
    $rootScope.model = 3;
    $rootScope.$apply();

    expect($rootElement.find('li')).toHaveClass('fm-selected', 3);
  });


  it('should update the model on click', function() {
    ratingScope.select(3-1);
    $rootScope.$apply();
    expect($rootScope.model).toEqual(3);

    expect($rootElement.find('li')).toHaveClass('fm-selected', 3);
  });

  it('should update the model on hover', function() {
    ratingScope.enter(3-1);
    $rootScope.$apply();

    expect($rootElement.find('li')).toHaveClass('fm-hover', 3);

    ratingScope.leave(3-1);
    $rootScope.$apply();

    expect($rootElement.find('li')).toHaveClass('fm-hover', 0);
  });

  it('should ignore clicks when disabled', function() {
    $rootScope.disabled = true;
    $rootScope.$apply();

    ratingScope.select(3-1);
    $rootScope.$apply();
    expect($rootScope.model).toEqual(undefined);

    expect($rootElement.find('li')).toHaveClass('fm-selected', 0);
  });

  it('should ignore hover when disabled', function() {
    $rootScope.disabled = true;
    $rootScope.$apply();

    ratingScope.enter(3-1);
    $rootScope.$apply();

    expect($rootElement.find('li')).toHaveClass('fm-hover', 0);
  });
});
