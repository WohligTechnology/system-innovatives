myApp.controller('ProjectCtrl', function ($scope, TemplateService, NavigationService, $timeout, toastr, $http, $uibModal, $stateParams) {
    $scope.template = TemplateService.getHTML("content/project/project.html");
    TemplateService.title = "Project"; //This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();

    console.log("stateparam id", $stateParams.id)

    $scope.dataId = {
        _id: $stateParams.id
    };

    NavigationService.callApiWithData("Projects/getOne", $scope.dataId, function (data) {
        console.log("Project data", data.data);
        $scope.projectData = data.data;
        //  $scope.projectName=$scope.projectData.name;
        //  $scope.projectImage=$scope.projectData.bannerImage;
        $scope.project = [{
            img: $scope.projectData.bannerImage,
            name: $scope.projectData.name
        }];
    });



    $scope.submitForm = function (data) {
        console.log("This is it");
        return new Promise(function (callback) {
            $timeout(function () {
                callback();
            }, 5000);
        });
    };

    $scope.openModal = function () {
        console.log("inside modal");
        $scope.feedback = $uibModal.open({
            animation: true,
            templateUrl: "views/content/contactus/contactus.html",
            scope: $scope,
            size: 'lg',
            // backdropClass: 'back-drop'
        });
    }

    $scope.openFeedback = function () {
        console.log("inside modal");
        $scope.feedback = $uibModal.open({
            animation: true,
            templateUrl: "views/content/feedback/feedback.html",
            scope: $scope,
            size: 'lg',
            // backdropClass: 'back-drop'
        });
    }


    // $scope.submitFeedback = function (data) {
    //         console.log("feedback");

    //         console.log("data in form", data);
    //         $scope.feedbackData = {};
    //         $scope.feedbackData.userEmail = data.userEmail;
    //         $scope.feedbackData.comment = data.comment;
    //         console.log("$scope.feedbackData", $scope.feedbackData);
    //         NavigationService.callApiWithData("Feedback/feedback", $scope.feedbackData, function (data) {
    //             console.log("data in api", data);


    //         });
    //     };


    $scope.checklen = function (data) {
        $scope.contacterror = "";
        var len = data.length;
        if (len < 10) {
            $scope.contacterror = "Please enter a valid phone number";
            console.log('In Length', len);
        } else if (len == 10) {
            $scope.contacterror = "";
        }
    }

    //  $scope.submitContact = function (data) {
    //         console.log("data in form", data);
    //         $scope.contactData = {};
    //         $scope.contactData.userEmail = data.userEmail;
    //         $scope.contactData.name = data.name;
    //         $scope.contactData.number = data.number;
    //         $scope.contactData.comments = data.comments;
    //         console.log("$scope.contactData", $scope.contactData);
    //         NavigationService.callApiWithData("Contact/contactUs", $scope.contactData, function (data) {
    //             console.log("data in api", data);


    //         });
    //     };


    //new validate//


    $scope.contactForm = {};
    $scope.submitForm = function (data) {
        console.log('dkhicjii', data);
        if (!data.name) {
            $scope.nameError = true;
            console.log("im im", $scope.showError);
        }
        if (!data.email) {
            $scope.emailError = true;
            console.log("im im", $scope.showError);
        }
        if (!data.contactno) {
            $scope.contactnoError = true;
            console.log("im im", $scope.showError);
        }
        if (!data.query) {
            $scope.queryError = true;
            console.log("im im", $scope.showError);
        }


        $scope.contactData = {};
        $scope.contactData.userEmail = data.userEmail;
        $scope.contactData.name = data.name;
        $scope.contactData.number = data.number;
        $scope.contactData.comments = data.comments;
        console.log("$scope.contactData", $scope.contactData);
        NavigationService.callApiWithData("Contact/contactUs", $scope.contactData, function (data) {
            console.log("data in api", data);


        });


    };


    $scope.feedbackForm = {};
    $scope.submitfeedbackForm = function (data1) {
        console.log('dkhicjii', data1);
        if (!data1.name) {
            $scope.fnameError = true;
            console.log("im im", $scope.showError);
        }
        if (!data1.email) {
            $scope.femailError = true;
            console.log("im im", $scope.showError);
        }
        if (!data1.contactno) {
            $scope.fcontactnoError = true;
            console.log("im im", $scope.showError);
        }
        if (!data1.query) {
            $scope.fqueryError = true;
            console.log("im im", $scope.showError);
        }

        $scope.feedbackData = {};
        $scope.feedbackData.userEmail = data1.userEmail;
        $scope.feedbackData.comment = data1.comment;
        console.log("$scope.feedbackData", $scope.feedbackData);
        NavigationService.callApiWithData("Feedback/feedback", $scope.feedbackData, function (data) {
            console.log("data in api", data);


        });





    };















    //end















    $scope.marcocontent = [{
            title: 'Overview',
            subtitle: 'An AR application to be used on Destinations, Cruises & more.'
        },
        {
            title: 'Challenges',
            subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pellentesque est id lacus eleifend feugiat. Ut ut velit vel nulla venenatis egestas a ac risus. Morbi ex risus, maximus ac nunc id, varius interdum tortor. Pellentesque feugiat, turpis vitae lobortis gravida, ante erat pretium purus, vel efficitur tortor quam nec eros.'
        },
        {
            title: 'Our Solution',
            subtitle: 'Cras in vulputate quam. Nam mollis, ex non scelerisque sodales, ipsum eros aliquam turpis, in feugiat erat metus eu dui. Morbi eu lectus ex. Fusce iaculis nisl condimentum, pharetra urna in, egestas augue. '
        },
        {
            title: 'Use Cases',
            subtitle: 'Donec id interdum erat. Donec vitae orci tellus. Proin scelerisque et justo vel placerat. Mauris dapibus ornare purus eu condimentum. Suspendisse faucibus felis nec elit maximus accumsan. Pellentesque vulputate mi sed mi i'
        }
    ]
});