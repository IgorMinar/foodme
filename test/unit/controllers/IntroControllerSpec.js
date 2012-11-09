'use strict';

describe('IntroController', function() {
  var userInfo;

  beforeEach(module(function($provide) {
    userInfo = {
      name: 'userName',
      address: '123 Main St; Anytown AB 12345'
    };
    $provide.value('userInfo', userInfo);
  }));

  it('should set user name and location', inject(function($location, $controller) {
    var scope = {};

    $controller('IntroController', {$scope:scope});

    expect(scope.userName).toEqual('userName');
    expect(scope.address).toEqual('123 Main St; Anytown AB 12345');

    $location.url('/someUrl');
    expect($location.url()).toEqual('/someUrl');

    scope.findRestaurants('newName', 'newAddress');
    expect($location.url()).toEqual('/');
    expect(userInfo.name).toEqual('newName');
    expect(userInfo.address).toEqual('newAddress');
  }));
});
