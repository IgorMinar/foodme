'use strict';

describe('RestaurantsController', function() {
  var userInfo, scope, restaurants, $httpBackend, dayOfWeek = 0;
  var cntrlFactory;

  beforeEach(module(function($provide) {
    dayOfWeek = 0;
    $provide.value('today', function(){ return dayOfWeek; });
    $provide.value('userInfo', userInfo = {});
    restaurants = [];
    return function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('/api/restaurant').respond(restaurants);
      scope = $rootScope;
      cntrlFactory = function() {
        return $controller('RestaurantsController', {$scope:$rootScope});
      };
    }
  }));

  describe('info redirection', function() {
    it('should redirect to customer route if no address',
        inject(function($location) {
          cntrlFactory();
          expect($location.url()).toEqual('/customer');
        })
    );

    it('should not redirect to customer route if address',
        inject(function($location) {
          userInfo.address = 'is defined';
          cntrlFactory();
          expect($location.url()).toEqual('');
        })
    );
  });

  describe('constants', function() {
    it('should publish cuisine constants', inject(function() {
      cntrlFactory();
      expect(scope.CUISINE_OPTIONS).toEqual({
        african: 'African',
        american: 'American',
        barbecue: 'Barbecue',
        cafe: 'Cafe',
        chinese: 'Chinese',
        'czech/slovak': 'Czech / Slovak',
        german: 'German',
        indian: 'Indian',
        japanese: 'Japanese',
        mexican: 'Mexican',
        pizza: 'Pizza',
        thai: 'Thai',
        vegetarian: 'Vegetarian'
      });
    }));

    it('should publish delivery options', inject(function() {
      dayOfWeek = 0;
      cntrlFactory();
      expect(scope.DELIVERY_OPTIONS).toEqual([
        {id: 0, title: 'Today'},
        {id: 1, title: 'Tomorrow'}
      ]);
    }));

    it('should publish delivery options and wrap last day', inject(function() {
      dayOfWeek = 6;
      cntrlFactory();
      expect(scope.DELIVERY_OPTIONS).toEqual([
        {id: 6, title: 'Today'},
        {id: 0, title: 'Tomorrow'}
      ]);
    }));
  });

  ddescribe("sortBy order", function() {
    var up = '\u25B2', down = '\u25BC', none = '';

    it('should sort and revers sort', inject(function() {
      cntrlFactory();
      scope.sortBy('Abc');

      var filter = scope.filter;

      expect(filter.sortBy).toEqual('Abc');
      expect(filter.sortAsc).toEqual(true);
      expect(scope.sortIconFor('Abc')).toBe(up);
      expect(scope.sortIconFor('x')).toBe(none);

      scope.sortBy('Abc');

      expect(filter.sortBy).toEqual('Abc');
      expect(filter.sortAsc).toEqual(false);
      expect(scope.sortIconFor('Abc')).toBe(down);
      expect(scope.sortIconFor('x')).toBe(none);


      scope.sortBy('x');

      expect(filter.sortBy).toEqual('x');
      expect(filter.sortAsc).toEqual(true);
      expect(scope.sortIconFor('Abc')).toBe(none);
      expect(scope.sortIconFor('x')).toBe(up);
    }));
  });

  ddescribe('filter', function() {
    var r1 = {name:'a', cuisine:'african',    days:'0',        price: 1, rating: 1};
    var r2 = {name:'z', cuisine:'vegeterian', days:'01233456', price: 5, rating: 5};

    beforeEach(inject(function() {
      restaurants.push(r1);
      restaurants.push(r2);
      cntrlFactory();
      $httpBackend.flush();

      this.addMatchers({
        toEqualData: function(expected) {
          return angular.equals(this.actual, expected);
        }
      });
    }));

    it('should show everything', function() {
      scope.$apply();
      expect(scope.restaurants).toEqualData([r1, r2]);
    });

    it('should filter on cuisine', function() {
      scope.filter.cuisine = ['vegeterian'];
      scope.$apply();
      expect(scope.restaurants).toEqualData([r2]);
    });

    it('should filter on price', function() {
      scope.filter.price = 5;
      scope.$apply();
      expect(scope.restaurants).toEqualData([r2]);
    });

    it('should filter on price', function() {
      scope.filter.rating = 5;
      scope.$apply();
      expect(scope.restaurants).toEqualData([r2]);
    });

    it('should filter on delivery', function() {
      scope.filter.delivery = 6;
      scope.$apply();
      expect(scope.restaurants).toEqualData([r2]);
    });

    it('should sort in both directions', function() {
      scope.$apply();
      expect(scope.restaurants).toEqualData([r1, r2]);

      scope.filter.sortAsc = false;
      scope.$apply();
      expect(scope.restaurants).toEqualData([r2, r1]);
    });
  });

});
