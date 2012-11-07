#!/usr/bin/env node

var path = require('path');
var csv = require('csv');
var fs = require('fs');
var model = require('../server/model');
var Restaurant = model.Restaurant;
var MenuItem = model.MenuItem;

var inputFileRestaurants = path.resolve(__dirname, '../server/data/restaurants.csv');
var inputFileMenus = path.resolve(__dirname, '../server/data/menus.csv');
var outputFile = path.resolve(__dirname, '../server/data/restaurants.json');
var restaurantsBuffer = [];
var menuItemsBuffer = {};
var pending = 2;

var finish = function() {
  pending--;

  if (!pending) {
    writeOutput();
  }
};

var bufferRestaurantRow = function(data, idx) {
  if (idx === 0) {
    return;
  }

  restaurantsBuffer.push(Restaurant.fromArray(data));
};

var bufferMenuItemRow = function(data, idx) {
  if (idx === 0) {
    return;
  }

  var buffer = menuItemsBuffer[data[0]] = menuItemsBuffer[data[0]] || [];
  buffer.push(MenuItem.fromArray(data));
};

var writeOutput = function() {
  restaurantsBuffer.forEach(function(restaurant) {
    restaurant.menuItems = (menuItemsBuffer[restaurant.cuisine] || []).slice();
  });

  fs.writeFile(outputFile, JSON.stringify(restaurantsBuffer), function() {
    console.log('Converted to ' + outputFile);
  });
};

csv()
  .from.stream(fs.createReadStream(inputFileRestaurants))
  .on('record', bufferRestaurantRow)
  .on('end', finish);

csv()
  .from.stream(fs.createReadStream(inputFileMenus))
  .on('record', bufferMenuItemRow)
  .on('end', finish);
