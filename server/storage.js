var MemoryStorage = function() {
  var storage = [];

  this.getAll = function() {
    return storage;
  };

  this.add = function(item) {
    storage.push(item);
  };

  this.getById = function(id) {
    for (var i = 0; i < storage.length; i++) {
      if (storage[i].id === id) {
        return storage[i];
      }
    }

    return null;
  };

  this.deleteById = function(id) {
    for (var i = 0; i < storage.length; i++) {
      if (storage[i].id === id) {
        storage.splice(i, 1);
        return true;
      }
    }

    return false;
  };
};

exports.Memory = MemoryStorage;
