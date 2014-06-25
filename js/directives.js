'use strict';

angular.module('eTypeWebsite.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).
    directive('tabSelect', function(dataService){

        return {
            restrict: 'AE',
            templateUrl: 'partials/directives/TabSelect.html',
            link: function(scope,element,attrs,ctrl) {

                scope.activeSolutionInfo = 1;



                scope.learnAboutSolution = function(solutionInfoID) {
                    scope.activeSolutionInfo = solutionInfoID;

                    angular.forEach(angular.element('.learn-more'), function(value, key) {

                            value.innerHTML = 'LEARN MORE';
                    });

                    angular.element('.learn-more')[solutionInfoID-1].innerHTML = 'about ' + dataService.miniSolutions[solutionInfoID-1];

                };

                scope.learnAboutSolution(1);



            }

        }
    }).

    directive('langSelect', function(languages){

        return {
            restrict: 'EA',
            templateUrl:'partials/directives/LanguageSelect.html',
            scope: {
                initialText: '@',
                languagesCollection: '@',
                linkFormModel: '='
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

    }).

    directive('solutionBadge', function() {

        return {
            restrict: 'E',
            templateUrl: 'partials/directives/SolutionBadge.html',
            scope: {
                solution: '='
            },
            replace:true,
            link: function(scope,element,attrs,ctrl) {


                element.on('mouseover', function(event) {

                    angular.element('#' + scope.solution.name + '_name').css({opacity:0});
                    angular.element('#' + scope.solution.name + '_desc, #' + scope.solution.name + '_action').removeClass('hidden').show();
                    element.removeClass(scope.solution.class).addClass(scope.solution.class2);

                }).on('mouseout', function(event) {

                    angular.element('#' + scope.solution.name + '_name').css({opacity:1});
                    angular.element('#' + scope.solution.name + '_desc, #' + scope.solution.name + '_action').hide();
                    element.removeClass(scope.solution.class2).addClass(scope.solution.class);
                });
            }
        }

    });

