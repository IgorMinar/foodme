basePath = '../app';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  'lib/angular/angular.js',
  'lib/angular/angular-*.js',
  '../test/lib/angular/angular-mocks.js',

  'js/app.js',
  'js/**/*.js',
  '../test/unit/**/*.js',

  // templates
  'js/directives/**/*.html'
];

preprocessors = {
  '**/*.html': 'html2js'
};

autoWatch = true;

browsers = ['Chrome'];

junitReporter = {
  outputFile: 'test_out/unit.xml',
  suite: 'unit'
};
