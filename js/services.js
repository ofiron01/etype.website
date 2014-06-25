'use strict';


angular.module('eTypeWebsite.services', []);

eTypeWebsite.factory('dataService', function(){

    var websiteName = function() { return  'ETYPE' };

    return {

        getPageByName: function(arr,name) {

            var returnVal = 0;
            $(arr).each(function(index, value) {
                if (this.navTitle == name) returnVal = index;
            });

            return returnVal;
        },

        pages: [
            {pageTitle: websiteName() + ' | Home', navTitle: 'Home', navURL: 'home', navCat: 'home'},
            {pageTitle: websiteName() + ' | About', navTitle: 'About', navURL: 'about', navCat: 'about'},
            {pageTitle: websiteName() + ' | Solutions', navTitle: 'Solutions', navURL: 'solutions', navCat: 'solutions'},
            {pageTitle: websiteName() + ' | Services', navTitle: 'Services', navURL: 'services', navCat: 'services'},
            {pageTitle: websiteName() + ' | Contact us', navTitle: 'Contact us', navURL: 'contactus', navCat: 'contactus'},
        ],

        solutions: [
            {pageTitle: websiteName() + ' | Solutions - eParliament', navTitle: 'eParliament', navURL: 'solutions/eParliament', navCat: 'solutions'},
            {pageTitle: websiteName() + ' | Solutions - eProduction', navTitle: 'eProduction', navURL: 'solutions/eProduction', navCat: 'solutions'},
            {pageTitle: websiteName() + ' | Solutions - eCorporate', navTitle: 'eCorporate', navURL: 'solutions/eCorporate', navCat: 'solutions'},
            {pageTitle: websiteName() + ' | Solutions - eLaw', navTitle: 'eLaw', navURL: 'solutions/eLaw', navCat: 'solutions'},
            {pageTitle: websiteName() + ' | Solutions - eSchool', navTitle: 'eSchool', navURL: 'solutions/eSchool', navCat: 'solutions'}
        ],

        miniSolutions: [
            'syncType', 'syncRecord', 'syncMNG', 'syncPlayer'
        ]

    };
})


.factory('pageTitle', function() {

    var _title = 'ETYPE | Home';
    return {
        title: function() {
            return _title;
        },
        setTitle: function(title) {
            _title = title;
        }
    }

})



.factory('fileUploadSerivce', function($upload) {

        return {
            onFileSelect: function($scope, $files) {
                //$files: an array of files selected, each file has name, size, and type.
                for (var i = 0; i < $files.length; i++) {
                    var file = $files[i];
                    $scope.upload = $upload.upload({
                        url: 'srv/handler/?action=fileupload', //upload.php script, node.js route, or servlet url
                        method: 'POST',
                        // headers: {'header-key': 'header-value'},
                        // withCredentials: true,
                        data: {myObj: $scope.myModelObj},
                        file: file // or list of files: $files for html5 only
                        /* set the file formData name ('Content-Desposition'). Default is 'file' */
                        //fileFormDataName: myFile, //or a list of names for multiple files (html5).
                        /* customize how data is added to formData. See #40#issuecomment-28612000 for sample code */
                        //formDataAppender: function(formData, key, val){}
                    }).progress(function(evt) {
                            console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                        }).success(function(data, status, headers, config) {
                           $scope.fileUploadResponseData = data;

                        });
                    //.error(...)
                    //.then(success, error, progress);
                    //.xhr(function(xhr){xhr.upload.addEventListener(...)})// access and attach any event listener to XMLHttpRequest.
                }

            }
        }

})

.factory('contactFormService', function($http, $log, $q) {
        return {

            config: {
                "client": "",
                "replyTo": "",
                "replyToName": "",
                "from":"",
                "fromName":"",
                "to": "",
                "script": "",
                "subject": ""
            },

            submitForm: function(params, config) {

                var deffered = $q.defer();

                var paramsObj = {"params": params, "config":config};

                $http({method:'GET', url:config.script, params: paramsObj }).
                    success(function(data, status, headers, config){
                        deffered.resolve(data)
                    }).

                    error(function(data, status, headers, config){
                        $log.warn(data, status, headers, config);
                        deffered.reject();
                    });

                return deffered.promise;

            }

        }
    })

.factory('submitBtn', function() {
        return {

            alter: function(scope, text, disable) {
                scope.sendInProgress = disable;
                scope.sendButtonText = text;
            }

        }
    })

.factory('languages', function() {
    return {

        getLanguages: function(list) {
            return this[list];
        },
        inputLanguages: [
            {name: 'English', val: ''},
            {name: 'Arabic', val: ''},
            {name: 'Chinese', val: ''},
            {name: 'Dutch', val: ''},
            {name: 'French', val: ''},
            {name: 'German', val: ''},
            {name: 'Hebrew', val: ''},
            {name: 'Italian', val: ''},
            {name: 'Korean', val: ''},
            {name: 'Norwegian', val: ''},
            {name: 'Polish', val: ''},
            {name: 'Portuguese', val: ''},
            {name: 'Russian', val: ''},
            {name: 'Spanish', val: ''},
            {name: 'Swedish', val: ''},
            {name: 'Japanese', val: ''},
            {name: 'Afrikaans', val: ''},
            {name: 'Albanian', val: ''},
            {name: 'Armenian', val: ''},
            {name: 'Azerbaijani', val: ''},
            {name: 'Belarussian', val: ''}
        ],
        outputLanguages: [
            {name: 'English', val: ''},
            {name: 'Arabic', val: ''},
            {name: 'Chinese', val: ''},
            {name: 'Dutch', val: ''},
            {name: 'French', val: ''},
            {name: 'German', val: ''},
            {name: 'Hebrew', val: ''},
            {name: 'Italian', val: ''},
            {name: 'Korean', val: ''},
            {name: 'Norwegian', val: ''},
            {name: 'Polish', val: ''},
            {name: 'Portuguese', val: ''},
            {name: 'Russian', val: ''},
            {name: 'Spanish', val: ''},
            {name: 'Swedish', val: ''},
            {name: 'Japanese', val: ''},
            {name: 'Afrikaans', val: ''},
            {name: 'Albanian', val: ''},
            {name: 'Armenian', val: ''},
            {name: 'Azerbaijani', val: ''},
            {name: 'Belarussian', val: ''}
        ]

    }
});
