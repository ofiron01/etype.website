'use strict';

/* Controllers */

angular.module('eTypeWebsite.controllers', ['ngAnimate'])

  // MAIN CONTROLLER
  .controller('MainCtrl', ['$scope', '$location', 'dataService', '$anchorScroll', function($scope, $location, dataService, $anchorScroll){


        $scope.websiteName = dataService.websiteName;
        $scope.pages = dataService.pages;
        $scope.solutions = dataService.solutions;

       /* $scope.currentPage =  $location.path().substr(1);
        if ($scope.currentPage.indexOf('solutions/') > -1) $scope.currentPage = 'solutions';
        if ($scope.currentPage == '') $scope.currentPage = 'home';*/
        //else if ($scope.currentPage.valueOf('solutions/') > -1) $scope.currentPage = 'solutions';

        $scope.navigateTo = function(page) {
            $scope.currentPage = page.navCat;
            $location.path(page.navURL);

        };

        $scope.detectRoute = function() {
            $anchorScroll();
            angular.forEach($scope.pages, function(item) {
                item.current = $location.path().match(new RegExp(item.navURL)) ? true : false;
            });
        };

        $scope.$on('$routeChangeSuccess', $scope.detectRoute);

  }])

    .controller('ServicesCtrl', function($scope, contactFormService, submitBtn, $timeout, fileUploadSerivce) {

        contactFormService.config = {
            "client": "ETYPE",
            "replyTo": "sales@etype.co.il",
            "replyToName": "ETYPE | Sales",
            "from":"contact@etype.co.il",
            "fromName":"ETYPE",
            "to": "ofiron01@gmail.com",
            "script": "srv/handler/?action=sendform",
            "subject": "ETYPE | Website contact form"
        };

        $scope.sendInProgress = false;
        $scope.sendButtonText = 'SEND';
        $scope.fileUploadResponseData = {
            status: 'failed',
            message: 'Please upload a file (.doc, .docx, .pdf, .txt, .rtf)'
        };

        $scope.onFileSelect = function(files) {

            fileUploadSerivce.onFileSelect($scope, files);

        };

        $scope.onFormSubmit = function(contactDetails, contactForm) {

            if (contactForm.$valid) {

                contactDetails.Filename = $scope.fileUploadResponseData.filename;

                submitBtn.alter($scope, 'PLEASE WAIT...', true);
                contactFormService.submitForm(contactDetails, contactFormService.config).then(function(data) {

                    //on sucess
                    contactForm.$setPristine();
                    $scope.contactDetails = {};
                    submitBtn.alter($scope, 'THANK YOU', true);
                    $timeout(function() {
                        submitBtn.alter($scope, 'SEND', false);
                    },2000);


                }, function(status) {
                    // on error
                    submitBtn.alter($scope, 'ERROR OCCURED', true);
                    $timeout(function() {
                        submitBtn.alter($scope, 'SEND', false);
                    },2000);
                });

            }

        };

    });



