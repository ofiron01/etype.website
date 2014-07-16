'use strict';

angular.module('eTypeWebsite.controllers', ['ngAnimate'])


  .controller('MainCtrl', ['$scope', '$route', '$location', 'dataService', '$anchorScroll', 'pageTitle', function($scope, $route, $location, dataService, $anchorScroll, pageTitle){


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

        $scope.reloadRoute = function() {
            $route.reload();
        }

        $scope.getTitle = function() {
           return pageTitle.title();
        };

        $scope.detectRoute = function() {
            $anchorScroll();
            angular.forEach($scope.pages, function(item) {
                item.current = $location.path().match(new RegExp(item.navURL)) ? true : false;
            });
        };

        $scope.$on('$routeChangeSuccess', $scope.detectRoute);

        //preload site images
        $(['images/hp_stamp1.png',
           'images/hp_stamp1_2.png',
           'images/hp_stamp1_3.png',
           'images/hp_stamp1_4.png',
           'images/hp_stamp1_5.png',
           'images/solution_element.png',
           'images/solutions_element2.png',
           'images/solutions_element3.png',
           'images/solutions_element4.png',
           'images/solutions_element5.png',
        ]).each(function(){
            $('<img/>')[0].src = this;
        });

  }])

    .controller('ServicesCtrl', function($scope, contactFormService, submitBtn, $timeout, $location, fileUploadSerivce, pageTitle, dataService) {

        console.log($location);
        if ($location.path() == '/services')
            pageTitle.setTitle(dataService.pages[dataService.getPageByName(dataService.pages,'Services')].pageTitle);
        else if ($location.path() == '/contactus')
            pageTitle.setTitle(dataService.pages[dataService.getPageByName(dataService.pages,'Contact us')].pageTitle);


        contactFormService.config = {
            "client": "ETYPE",
            "replyTo": "sales@etype.co.il",
            "replyToName": "ETYPE | Sales",
            "from":"contact@etype.co.il",
            "fromName":"ETYPE",
            "to": "sales@etype.co.il",
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

    })

    .controller('HomeCtrl', function(pageTitle, dataService){
        pageTitle.setTitle(dataService.pages[dataService.getPageByName(dataService.pages, 'Home')].pageTitle);
    }).
    controller('SolutionsCtrl', function(pageTitle, dataService){
        pageTitle.setTitle(dataService.pages[dataService.getPageByName(dataService.pages, 'Solutions')].pageTitle);
    }).
    controller('AboutCtrl', function(pageTitle, dataService){
        pageTitle.setTitle(dataService.pages[dataService.getPageByName(dataService.pages, 'About')].pageTitle);
    }).
    controller('eParliamentCtrl', function(pageTitle, dataService){
        pageTitle.setTitle(dataService.solutions[dataService.getPageByName(dataService.solutions, 'eParliament')].pageTitle);
    }).
    controller('eProductionCtrl', function(pageTitle, dataService){
        pageTitle.setTitle(dataService.solutions[dataService.getPageByName(dataService.solutions, 'eProduction')].pageTitle);
    }).
    controller('eCorporateCtrl', function(pageTitle, dataService){
        pageTitle.setTitle(dataService.solutions[dataService.getPageByName(dataService.solutions, 'eCorporate')].pageTitle);
    }).
    controller('eLawCtrl', function(pageTitle, dataService){
        pageTitle.setTitle(dataService.solutions[dataService.getPageByName(dataService.solutions, 'eLaw')].pageTitle);
    }).
    controller('eSchoolCtrl', function(pageTitle, dataService){
        pageTitle.setTitle(dataService.solutions[dataService.getPageByName(dataService.solutions, 'eSchool')].pageTitle);
    });




