var idFromName = function(name) {
  return name && name.toLowerCase().replace(/\W/g, '');
};

var isString = function(value) {
  return typeof value === 'string';
};

var DAYS = {
  Su: 0,
  Mo: 1,
  Tu: 2,
  We: 3,
  Th: 4,
  Fr: 5,
  Sa: 6
};

var parseDays = function(str) {
  return str.split(',').map(function(day) {
    return DAYS[day];
  });
};


var Restaurant = function(data) {
  // defaults
  this.days = [1, 2, 3, 4, 5, 6];
  this.menuItems = [];
  this.price = 0;
  this.rating = 0;

  this.update(data);

  this.id = this.id || idFromName(this.name);
};

Restaurant.prototype.update = function(data) {
  Object.keys(data).forEach(function(key) {
    if (key === 'price' || key === 'rating' && isString(data[key])) {
      this[key] = parseInt(data[key], 10);
    } else {
      this[key] = data[key];
    }
  }, this);

  this.menuItems = this.menuItems.map(function(data) {
    return new MenuItem(data);
  });
};

Restaurant.prototype.validate = function(errors) {
  if (!this.name) {
    errors.push('Invalid: "name" is a mandatory field!');
  }

  return errors.length === 0;
};

Restaurant.fromArray = function(data) {
  return new Restaurant({
    id: data[1],
    name: data[0],
    cuisine: data[2],
    opens: data[3],
    closes: data[4],
    days: parseDays(data[5]),
    price: parseInt(data[6], 10),
    rating: parseInt(data[7], 10),
    location: data[8],
    description: data[9]
  });
};


var MenuItem = function(data) {
  this.name = data.name;
  this.price = data.price;
};

MenuItem.fromArray = function(data) {
  return new MenuItem({
    name: data[1],
    price: parseFloat(data[2])
  });
};

exports.Restaurant = Restaurant;
exports.MenuItem = MenuItem;
