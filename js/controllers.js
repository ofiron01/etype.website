'use strict';

/* Controllers */

angular.module('eTypeWebsite.controllers', ['ngAnimate'])

  // MAIN CONTROLLER
  .controller('MainCtrl', ['$scope', '$location', 'Data', function($scope, $location, Data){


        $scope.websiteName = Data.websiteName;
        $scope.currentPage =  $location.path().substr(1);
        if ($scope.currentPage == '') $scope.currentPage = 'home';
        //else if ($scope.currentPage.valueOf('solutions/') > -1) $scope.currentPage = 'solutions';

        $scope.pages = [
            {pageTitle: $scope.websiteName + ' | Home', navTitle: 'Home', navURL: 'home', navCat: 'home'},
            {pageTitle: $scope.websiteName + ' | About', navTitle: 'About', navURL: 'about', navCat: 'about'},
            {pageTitle: $scope.websiteName + ' | Solutions', navTitle: 'Solutions', navURL: 'solutions', navCat: 'solutions'},
            {pageTitle: $scope.websiteName + ' | Services', navTitle: 'Services', navURL: 'services', navCat: 'services'},
            {pageTitle: $scope.websiteName + ' | Contact us', navTitle: 'Contact us', navURL: 'contactus', navCat: 'contactus'},
        ];

        $scope.solutions = [
            {pageTitle: $scope.websiteName + ' | eParliament', navTitle: 'eParliament', navURL: 'solutions/eParliament', navCat: 'solutions'},
            {pageTitle: $scope.websiteName + ' | eProduction', navTitle: 'eProduction', navURL: 'solutions/eProduction', navCat: 'solutions'},
            {pageTitle: $scope.websiteName + ' | eCorporate', navTitle: 'eCorporate', navURL: 'solutions/eCorporate', navCat: 'solutions'},
            {pageTitle: $scope.websiteName + ' | eLaw', navTitle: 'eLaw', navURL: 'solutions/eLaw', navCat: 'solutions'},
            {pageTitle: $scope.websiteName + ' | eSchool', navTitle: 'eSchool', navURL: 'solutions/eSchool', navCat: 'solutions'}
        ];


        $scope.navigateTo = function(page) {
            $scope.currentPage = page.navCat;
            $location.path(page.navURL);

        };


  }])

    // SOLUTIONS PAGE
    .controller('SolutionsCtrl', ['$scope', '$location', function($scope, $location){
        $scope.navigateToSolution = function(page) {

            $location.path(page);

        };

    }])


    .controller('SolutionsEParliamentCtrl', ['$scope', function($scope){

        $scope.activeSolutionInfo = 1;

        $scope.learnAboutSolution = function(solutionInfoID) {
            $scope.activeSolutionInfo = solutionInfoID;
        }

    }]);
