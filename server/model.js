var idFromName = function(name) {
  return name && name.toLowerCase().replace(/\W/g, '');
};

var isString = function(value) {
  return typeof value === 'string';
};


var Restaurant = function(data) {
  // defaults
  this.days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
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
    days: data[5].split(','),
    price: parseInt(data[6], 10),
    rating: parseInt(data[7], 10),
    location: data[8]
  });
};

exports.Restaurant = Restaurant;
