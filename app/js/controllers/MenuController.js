'use strict';

foodMeApp.controller('MenuController', function MenuController($scope, $routeParams, Restaurant) {

  $scope.restaurant = {
    id: 'esthers',
    name: "Esther's German Saloon",
    description: 'Authentic German restaurant specializing in home style german cuisine.',
    address: '22 Teutonic Ave.',
    rating: 3,
    price: 3,
    menuItems: [
      {name: 'Kartoffel Reibekuchen mit Apfelmus', price: '5.95'},
      {name: 'Bratwurst mit Brötchen und Sauerkraut', price: '5.95'},
      {name: 'Currywurst mit Brötchen', price: '5.95'},
      {name: 'Frikadelle mit Brötchen', price: '6.95'},
      {name: 'Französische Zwiebelsuppe mit Käse', price: '3.95'},
      {name: 'Ungarische Gulaschsuppe mit Brötchen', price: '5.95'},
      {name: 'Haus Salatteller', price: '3.95'},
      {name: 'Gemischter Salat', price: '4.55'},
      {name: 'Wurstsalad mit Bauernbrot', price: '6.95'},
      {name: 'Bockwurst Würstchen', price: '4.95'},
      {name: 'Frankfurter Würstchen', price: '4.95'},
      {name: 'Fleishkas mit Kartoffelsalat', price: '6.95'},
      {name: 'Maultaschen mit Käse', price: '7.95'},
      {name: 'Kaesepaetzle', price: '6.95'},
      {name: 'Wienerschnitzel', price: '8.95'},
      {name: 'Jaegerschnitzel', price: '9.95'},
      {name: 'Sauerbraten', price: '10.45'},
      {name: 'Das Hausmannskost', price: '11.45'},
      {name: 'Gebackener Camenbert', price: '7.55'}
    ]
  }

  //Restaurant.get({id: $routeParams.restaurantId});

});
