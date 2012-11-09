'use strict';

describe('NavbarController', function() {
  it('should check if string matches current location path',
      inject(function($location, $controller) {
    var scope = {};

    $controller('NavbarController', {$scope:scope});

    $location.path('/abc');

    expect(scope.routeIs('/abc')).toEqual(true);
    expect(scope.routeIs('/x')).toEqual(false);

    $location.path('/main');

    expect(scope.routeIs('/abc')).toEqual(false);
    expect(scope.routeIs('/x')).toEqual(false);
    expect(scope.routeIs('/main')).toEqual(true);
  }));
});
