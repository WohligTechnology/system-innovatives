myApp.controller('LoginCtrl', function ($scope, TemplateService, NavigationService, $timeout, toastr, $http, $state) {
    $scope.template = TemplateService.getHTML("content/login/login.html");
    TemplateService.title = "Login"; //This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();

    var body = angular.element(document.querySelector('body'));
    body.addClass("login-bg");

    $scope.submitForm = false;
    $scope.loginForm = {};
    $scope.loginBtnClicked = false;
    $scope.apiCalling = false;
    $scope.submitloginForm = function (data, valid) {
        if (valid) {
            $scope.apiCalling = true;
            $scope.email = data.email;
            $scope.data = {};
            $scope.data.email = data.email;
            NavigationService.callApiWithData('User/sendAccess', $scope.data, function (data) {
                if (data.value) {
                    $scope.apiCalling = false;
                    toastr.success('Login successful. Please check your email to verify token.');
                    $scope.Form2 = {};
                } else {
                    $scope.apiCalling = false;
                    toastr.error('Oops, Your Email ID doesn\'t exist with us!');
                }
            });
        } else {
            $scope.loginBtnClicked = true;
        }

    };


});