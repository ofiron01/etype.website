'use strict';

/* Controllers */

angular.module('eTypeWebsite.controllers', ['ngAnimate'])

  // MAIN CONTROLLER
  .controller('MainCtrl', ['$scope', '$location', function($scope, $location){


        $scope.websiteName = 'ETYPE';
        $scope.currentPage =  $location.path().substr(1);

        $scope.pages = [
            {pageTitle: $scope.websiteName + ' | Home', navTitle: 'Home', navURL: 'home'},
            {pageTitle: $scope.websiteName + ' | About', navTitle: 'About', navURL: 'about'},
            {pageTitle: $scope.websiteName + ' | Solutions', navTitle: 'Solutions', navURL: 'solutions'},
            {pageTitle: $scope.websiteName + ' | Services', navTitle: 'Services', navURL: 'services'},
            {pageTitle: $scope.websiteName + ' | Contact us', navTitle: 'Contact us', navURL: 'contactus'},
        ];

        $scope.solutions = [
            {pageTitle: $scope.websiteName + ' | eParliament', navTitle: 'eParliament', navURL: 'eParliament'},
            {pageTitle: $scope.websiteName + ' | eProduction', navTitle: 'eProduction', navURL: 'eProduction'},
            {pageTitle: $scope.websiteName + ' | eCorporate', navTitle: 'eCorporate', navURL: 'eCorporate'},
            {pageTitle: $scope.websiteName + ' | eLaw', navTitle: 'eLaw', navURL: 'eLaw'},
            {pageTitle: $scope.websiteName + ' | eSchool', navTitle: 'eSchool', navURL: 'eSchool'}
        ];


        $scope.navigateTo = function(page) {
            $scope.currentPage = page.navURL;
            $location.path(page.navURL);

        };


  }])

    // SOLUTIONS PAGE
    .controller('SolutionsCtrl', ['$scope', function($scope){

        $scope.activeSolutionInfo = 1;

        $scope.learnAboutSolution = function(solutionInfoID) {
            $scope.activeSolutionInfo = solutionInfoID;
        }

    }]);
