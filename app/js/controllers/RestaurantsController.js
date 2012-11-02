'use strict';

foodMeApp.controller('RestaurantsController', function($scope, userInfo, $location) {

  if (!userInfo.zip) {
    $location.url('/user-info')
  }

  $scope.userInfo = userInfo;

  $scope.restaurants = [
    { id: 'esthers2',
      name: "Esther's German Saloon2",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut neque orci. Fusce bibendum mauris eu nulla tincidunt ultrices. Donec consequat adipiscing sapien non tincidunt. Aliquam varius suscipit blandit.",
      rating: 5,
      price: 4,
      open : '012345'
    },
    { id: 'esthers',
      name: "Esther's German Saloon",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut neque orci. Fusce bibendum mauris eu nulla tincidunt ultrices. Vestibulum leo velit, viverra quis pulvinar eu, aliquet vitae libero. Pellentesque facilisis felis ac ligula molestie eu congue lectus egestas.",
      rating: 4,
      price: 3,
      open : '0123456'
    }
  ]

});
