'use strict';

var RESPONSE = [
  {
    "price": 3,
    "id": "esthers",
    "cuisine": "german",
    "rating": 3,
    "name": "Esther's German Saloon"
  },
  {
    "price": 4,
    "id": "robatayaki",
    "cuisine": "japanese",
    "rating": 5,
    "name": "Robatayaki Hachi"
  },
  {
    "price": 2,
    "id": "tofuparadise",
    "cuisine": "vegetarian",
    "rating": 1,
    "name": "BBQ Tofu Paradise"
  },
  {
    "price": 5,
    "id": "bateaurouge",
    "cuisine": "french",
    "rating": 4,
    "name": "Le Bateau Rouge"
  },
  {
    "price": 3,
    "id": "khartoum",
    "cuisine": "african",
    "rating": 2,
    "name": "Khartoum Khartoum"
  }
];


describe('RestaurantsController', function() {
  var scope;

  var idsFrom = function(restaurants) {
    return restaurants.map(function(restaurant) {
      return restaurant.id;
    });
  };

  beforeEach(inject(function($controller, $httpBackend, $rootScope) {
    scope = $rootScope;

    $httpBackend.whenGET('/api/restaurant').respond(RESPONSE);
    $controller('RestaurantsController', {$scope: scope});

    $httpBackend.flush();
  }));


  it('should filter by price', function() {
    expect(scope.restaurants.length).toBe(5);

    scope.$apply(function() {
      scope.filter.price = 3;
    });

    expect(idsFrom(scope.restaurants)).toEqual(['esthers', 'khartoum']);

    scope.$apply(function() {
      scope.filter.price = null;
    });

    expect(scope.restaurants.length).toBe(5);
  });


  it('should filter by rating', function() {
    expect(scope.restaurants.length).toBe(5);

    scope.$apply(function() {
      scope.filter.rating = 1;
    });

    expect(idsFrom(scope.restaurants)).toEqual(['tofuparadise']);

    scope.$apply(function() {
      scope.filter.rating = null;
    });

    expect(scope.restaurants.length).toBe(5);
  });


  it('should filter by cuisine', function() {
    expect(scope.restaurants.length).toBe(5);

    scope.$apply(function() {
      scope.filter.cuisine = ['german'];
    });

    expect(idsFrom(scope.restaurants)).toEqual(['esthers']);

    scope.$apply(function() {
      scope.filter.cuisine = ['african', 'german'];
    });

    expect(idsFrom(scope.restaurants)).toEqual(['esthers', 'khartoum']);
  });


  it('should sort asc/desc', function() {
    // first click on "name" makes it sort asc
    scope.$apply(function() {
      scope.sortBy('name');
    });

    expect(idsFrom(scope.restaurants)).toEqual([
      'tofuparadise', 'esthers', 'khartoum', 'bateaurouge', 'robatayaki'
    ]);

    // first click on "rating" makes it sort asc
    scope.$apply(function() {
      scope.sortBy('rating');
    });

    expect(idsFrom(scope.restaurants)).toEqual([
      'tofuparadise', 'khartoum', 'esthers', 'bateaurouge', 'robatayaki'
    ]);

    // second click on "rating" makes it sort desc
    scope.$apply(function() {
      scope.sortBy('rating');
    });

    expect(idsFrom(scope.restaurants)).toEqual([
      'robatayaki', 'bateaurouge', 'esthers', 'khartoum', 'tofuparadise'
    ]);
  });
});

