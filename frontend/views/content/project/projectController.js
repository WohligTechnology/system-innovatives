myApp.controller('ProjectCtrl', function ($scope, TemplateService, NavigationService, $timeout, toastr, $http, $uibModal) {
    $scope.template = TemplateService.getHTML("content/project/project.html");
    TemplateService.title = "Project"; //This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();

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
            templateUrl: "frontend/views/content/contactus/contactus.html",
            scope: $scope,
            size: 'lg',
            // backdropClass: 'back-drop'
        });
    }

    $scope.openFeedback = function () {
        console.log("inside modal");
        $scope.feedback = $uibModal.open({
            animation: true,
            templateUrl: "frontend/views/content/feedback/feedback.html",
            scope: $scope,
            size: 'lg',
            // backdropClass: 'back-drop'
        });
    }

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