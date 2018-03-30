myApp.controller('LoginCtrl', function ($scope, TemplateService, NavigationService, $timeout, toastr, $http, $state) {
    $scope.template = TemplateService.getHTML("content/login/login.html");
    TemplateService.title = "Login"; //This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();

    var body = angular.element(document.querySelector('body'));
    body.addClass("login-bg");

    $scope.submitForm = false;
    $scope.loginForm = {};
    $scope.submitloginForm = function (data2) {
        if (!data2.email) {
            $scope.femailError = true;
        }
        $scope.email = data2.email;
        $scope.data = {};
        $scope.data.email = data2.email;
        NavigationService.callApiWithData('User/sendAccess', $scope.data, function (data) {
            if (data.value) {
                toastr.success('Login successful. Please check your email to verify token.');
                $scope.Form2 = {};
            } else {
                toastr.error('Oops, Your Email ID doesn\'t exist with us!');
            }
        });

    };


});