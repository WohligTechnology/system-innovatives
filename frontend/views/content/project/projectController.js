myApp.controller('ProjectCtrl', function ($scope, TemplateService, NavigationService, $timeout, toastr, $http, $uibModal, $stateParams) {
    $scope.template = TemplateService.getHTML("content/project/project.html");
    TemplateService.title = "Project"; //This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();

    $scope.dataId = {
        _id: $stateParams.id
    };

    NavigationService.callApiWithData("Projects/getOne", $scope.dataId, function (data) {
        $scope.project = data.data;

    });


    $scope.submitForm = function (data) {
        return new Promise(function (callback) {
            $timeout(function () {
                callback();
            }, 5000);
        });
    };

    $scope.requestDemo = function (projectName) {
        $scope.requestData = {};
        $scope.requestData.project = projectName;
        $scope.requestData.email = $.jStorage.get("user").email;
        NavigationService.callApiWithData("Projects/requestDemo", $scope.requestData, function (data) {
            if (data.value) {
                toastr.success('Demo request sent. We will get back you shortly');
            }

        });
    };


    $scope.openContact = function () {
        $scope.contactInstance = $uibModal.open({
            animation: true,
            templateUrl: "views/content/contactus/contactus.html",
            scope: $scope,
            size: 'lg',
            // backdropClass: 'back-drop'
        });
    }

    $scope.openFeedback = function () {
        $scope.feedbackInstance = $uibModal.open({
            animation: true,
            templateUrl: "views/content/feedback/feedback.html",
            scope: $scope,
            size: 'lg',
            // backdropClass: 'back-drop'
        });
    }


    $scope.checklen = function (data) {
        $scope.contacterror = "";
        var len = data.length;
        if (len < 10) {
            $scope.contacterror = "Please enter a valid phone number";
        } else if (len == 10) {
            $scope.contacterror = "";
        }
    }

    $scope.submitForm = false;
    $scope.contactForm = {};
    $scope.contactBtnClicked = false;
    $scope.apiCalling = false;
    $scope.submitcontactForm = function (data, valid) {
        if (valid) {
            $scope.apiCalling = true;
            $scope.data = {};
            $scope.data.userEmail = data.userEmail;
            $scope.data.name = data.name;
            $scope.data.number = data.number;
            $scope.data.comments = data.comments;
            NavigationService.callApiWithData('Contact/contactUs', $scope.data, function (data) {
                if (data.value) {
                    $scope.apiCalling = false;
                    $scope.contactInstance.close();
                } else {
                    $scope.apiCalling = false;
                    $scope.contactInstance.close();
                }
            });
        } else {
            $scope.contactBtnClicked = true;
        }
    };

    $scope.submitForm = false;
    $scope.feedbackForm = {};
    $scope.feedbackBtnClicked = false;
    $scope.apiCalling = false;
    $scope.submitfeedbackForm = function (data, valid, rating) {
        console.log("project name", $scope.project.name);
        if (valid && rating != 0) {
            $scope.apiCalling = true;
            $scope.data = {};
            $scope.data.userEmail = data.userEmail;
            $scope.data.comment = data.comment;
            $scope.data.rating = data.rating;
            $scope.data.project = $scope.project.name;
            NavigationService.callApiWithData('Feedback/feedback', $scope.data, function (data) {
                if (data.value) {
                    $scope.apiCalling = false;
                    $scope.feedbackInstance.close();
                } else {
                    $scope.apiCalling = false;
                    $scope.feedbackInstance.close();
                }
            });
        } else {
            $scope.feedbackBtnClicked = true;
        }

    };
});