'use strict';


// Declare app level module which depends on filters, and services
var eTypeWebsite = angular.module('eTypeWebsite', [
  'ngRoute',
  'eTypeWebsite.filters',
  'eTypeWebsite.services',
  'eTypeWebsite.directives',
  'eTypeWebsite.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {templateUrl: 'partials/home.html'});
  $routeProvider.when('/about', {templateUrl: 'partials/about.html'});
  $routeProvider.when('/solutions', {templateUrl: 'partials/solutions.html'});
  $routeProvider.when('/services', {templateUrl: 'partials/services.html'});
  $routeProvider.when('/contactus', {templateUrl: 'partials/contactus.html'});

  $routeProvider.when('/solutions/eParliament', {templateUrl: 'partials/solutions.eparliament.html'});
  $routeProvider.when('/solutions/eProduction', {templateUrl: 'partials/solutions.eproduction.html'});
  $routeProvider.when('/solutions/eSchool', {templateUrl: 'partials/solutions.eschool.html'});
  $routeProvider.when('/solutions/eLaw', {templateUrl: 'partials/solutions.elaw.html'});
  $routeProvider.when('/solutions/eCorporate', {templateUrl: 'partials/solutions.eCorporate.html'});

  $routeProvider.otherwise({redirectTo: '/home'});
}]);




