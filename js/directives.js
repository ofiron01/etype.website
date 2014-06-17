'use strict';

/* Directives */


angular.module('eTypeWebsite.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).
    directive('tabSelect', function(){

        return {
            restrict: 'AE',
            templateUrl: 'partials/directives/TabSelect.html',
            link: function(scope,element,attrs,ctrl) {

                scope.activeSolutionInfo = 1;

                scope.learnAboutSolution = function(solutionInfoID) {
                    scope.activeSolutionInfo = solutionInfoID;
                }

            }

        }
    }).

    directive('langSelect', function(languages){

        return {
            restrict: 'E',
            templateUrl:'partials/directives/LanguageSelect.html',
            scope: {
                initialText: '@',
                languagesCollection: '@',
                linkFormModel: '='
            },

            link: function(scope, element, attrs, ctrl) {


            },

            controller: function($scope) {
                $scope.selectedLanguage = {name:$scope.initialText};

                $scope.languagesList = languages.getLanguages($scope.languagesCollection);

                $scope.selectLanguage = function(lang) {
                    $scope.selectedLanguage = lang;
                    $scope.linkFormModel = lang.name;
                }

            }
        }

    });
