'use strict';

/* Directives */


angular.module('eTypeWebsite.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);
