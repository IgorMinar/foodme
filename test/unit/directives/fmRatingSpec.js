'use strict';

describe('rating', function() {
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

  var $rootElement, $rootScope, $compile, ratingScope;

  var compileHtml = function(html) {
    $rootElement.html(html ||
        '<fm-rating symbol="*" max="5" readonly="{{readonly}}" ' +
            'ng-model="$parent.model"></fm-rating>');

    $compile($rootElement)($rootScope);
    $rootScope.$apply();
    ratingScope = $rootElement.find('ul').scope();
  };

  beforeEach(inject(function(_$rootElement_, _$compile_, _$rootScope_) {
    $rootScope = _$rootScope_;
    $compile = _$compile_;
    $rootElement = _$rootElement_;
  }));


  it('should update the view on model', function() {
    compileHtml();
    $rootScope.model = 3;
    $rootScope.$apply();

    expect($rootElement.find('li')).toHaveClass('fm-selected', 3);
  });


  it('should update the model on click', function() {
    compileHtml();
    ratingScope.select(3-1);
    $rootScope.$apply();
    expect($rootScope.model).toEqual(3);

    expect($rootElement.find('li')).toHaveClass('fm-selected', 3);
  });

  it('should update the model on hover', function() {
    compileHtml();
    ratingScope.enter(3-1);
    $rootScope.$apply();

    expect($rootElement.find('li')).toHaveClass('fm-hover', 3);

    ratingScope.leave(3-1);
    $rootScope.$apply();

    expect($rootElement.find('li')).toHaveClass('fm-hover', 0);
  });

  it('should ignore clicks when disabled', function() {
    compileHtml();
    $rootScope.readonly = true;
    $rootScope.$apply();

    ratingScope.select(3-1);
    $rootScope.$apply();
    expect($rootScope.model).toEqual(undefined);

    expect($rootElement.find('li')).toHaveClass('fm-selected', 0);
  });

  it('should ignore hover when disabled', function() {
    compileHtml();
    $rootScope.readonly = true;
    $rootScope.$apply();

    ratingScope.enter(3-1);
    $rootScope.$apply();

    expect($rootElement.find('li')).toHaveClass('fm-hover', 0);
  });

  it('should work inside ng-repeat', function() {
    compileHtml('<div ng-repeat="i in [1, 2, 3]"><fm-rating symbol="{{symbol}}" max="{{max}}" disabled="{{disabled}}" ng-model="$parent.i"></fm-rating></div>');

    expect($rootElement.find('div').eq(0).find('li')).toHaveClass('fm-selected', 1);
    expect($rootElement.find('div').eq(1).find('li')).toHaveClass('fm-selected', 2);
    expect($rootElement.find('div').eq(2).find('li')).toHaveClass('fm-selected', 3);
  });
});
