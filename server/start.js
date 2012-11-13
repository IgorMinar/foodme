var PORT = process.argv[2] && parseInt(process.argv[2], 10) || 3000;
var STATIC_DIR = __dirname + '/../app';
var DATA_FILE = __dirname + '/data/restaurants.json';

require('./index').start(PORT, STATIC_DIR, DATA_FILE);
