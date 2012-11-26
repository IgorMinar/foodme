'use strict';

describe('directives fmCheckboxList', function() {
  var inputs, scope;

  beforeEach(inject(function($rootElement, $compile, $rootScope) {
    scope = $rootScope;
    scope.filter = {};
    scope.OPTIONS = {
      a: 'A',
      b: 'B',
      c: 'C',
      d: 'D'
    };

    $rootElement.html(
      '<div fm-checkbox-list ng-model="filter.cuisine">' +
        '<label ng-repeat="(name, title) in OPTIONS" class="checkbox">' +
          '<input type="checkbox" value="{{name}}"> {{title}}' +
        '</label>' +
      '</div>');

    angular.element(document.body).append($rootElement);

    $compile($rootElement)(scope);
    scope.$apply();

    inputs = $rootElement.find('input');
  }));

  afterEach(inject(function($rootElement) {
    $rootElement.remove();
  }));

  var triggerClickOn = function(elm) {
    var event = document.createEvent('MouseEvents');
    // https://developer.mozilla.org/en-US/docs/DOM/event.initMouseEvent
    event.initMouseEvent('click', true, true, window);
    elm.dispatchEvent(event);
  };


  it('should update the view on model change', function() {
    scope.$apply(function() {
      scope.filter.cuisine = ['a', 'b'];
    });

    expect(inputs.eq(0).prop('checked')).toBe(true);
    expect(inputs.eq(1).prop('checked')).toBe(true);
    expect(inputs.eq(2).prop('checked')).toBe(false);
    expect(inputs.eq(3).prop('checked')).toBe(false);
  });


  it('should update the model on view change', function() {
    triggerClickOn(inputs.eq(0)[0]); // check a
    expect(scope.filter.cuisine).toEqual(['a']);

    triggerClickOn(inputs.eq(2)[0]); // check c
    expect(scope.filter.cuisine).toEqual(['a', 'c']);

    triggerClickOn(inputs.eq(0)[0]); // uncheck a
    expect(scope.filter.cuisine).toEqual(['c']);
  });
});
