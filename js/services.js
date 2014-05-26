'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('eTypeWebsite.services', []).
  value('version', '0.1');




eTypeWebsite.factory('Data', function(){
    return {

        websiteName : 'ETYPE',
        currentPage : ''

    };
});
