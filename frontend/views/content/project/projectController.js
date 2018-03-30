myApp.controller('ProjectCtrl', function ($scope, TemplateService, NavigationService, $timeout, toastr, $http, $uibModal, $stateParams) {
    $scope.template = TemplateService.getHTML("content/project/project.html");
    TemplateService.title = "Project"; //This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();

    console.log("stateparam id", $stateParams.id)

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

    //new validate//


    $scope.contactForm = {};
    $scope.submitForm = function (data,validation) {
        if (!data.name) {
            $scope.nameError = true;
        }
        if (!data.email) {
            $scope.emailError = true;
        }
        if (!data.contactno) {
            $scope.contactnoError = true;
        }
        if (!data.query) {
            $scope.queryError = true;
        }

        $scope.contactData = {};
        $scope.contactData.userEmail = data.userEmail;
        $scope.contactData.name = data.name;
        $scope.contactData.number = data.number;
        $scope.contactData.comments = data.comments;
        if (validation) {
            NavigationService.callApiWithData("Contact/contactUs", $scope.contactData, function (data) {
                console.log("data in api", data);
                $scope.contactForm = {};
                $scope.contactInstance.close();
            });
        }



    };


    $scope.feedbackForm = {};
    $scope.submitFeedback = function (data1) {
        if (!data1.name) {
            $scope.fnameError = true;
        }
        if (!data1.email) {
            $scope.femailError = true;
        }
        if (!data1.contactno) {
            $scope.fcontactnoError = true;
        }
        if (!data1.query) {
            $scope.fqueryError = true;
        }

        $scope.feedbackData = {};
        $scope.feedbackData.userEmail = data1.userEmail;
        $scope.feedbackData.comment = data1.comment;
        $scope.feedbackData.rating = data1.rating;
        NavigationService.callApiWithData("Feedback/feedback", $scope.feedbackData, function (data) {
            console.log("data in api", data);
            $scope.feedbackData = {};



        });
    };

    //end

    // $scope.marcocontent = [{
    //         title: 'Overview',
    //         subtitle: 'An AR application to be used on Destinations, Cruises & more.'
    //     },
    //     {
    //         title: 'Challenges',
    //         subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pellentesque est id lacus eleifend feugiat. Ut ut velit vel nulla venenatis egestas a ac risus. Morbi ex risus, maximus ac nunc id, varius interdum tortor. Pellentesque feugiat, turpis vitae lobortis gravida, ante erat pretium purus, vel efficitur tortor quam nec eros.'
    //     },
    //     {
    //         title: 'Our Solution',
    //         subtitle: 'Cras in vulputate quam. Nam mollis, ex non scelerisque sodales, ipsum eros aliquam turpis, in feugiat erat metus eu dui. Morbi eu lectus ex. Fusce iaculis nisl condimentum, pharetra urna in, egestas augue. '
    //     },
    //     {
    //         title: 'Use Cases',
    //         subtitle: 'Donec id interdum erat. Donec vitae orci tellus. Proin scelerisque et justo vel placerat. Mauris dapibus ornare purus eu condimentum. Suspendisse faucibus felis nec elit maximus accumsan. Pellentesque vulputate mi sed mi i'
    //     }
    // ]



});