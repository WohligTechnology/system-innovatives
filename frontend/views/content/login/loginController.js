myApp.controller('LoginCtrl', function ($scope, TemplateService, NavigationService, $timeout, toastr, $http, $state) {
    $scope.template = TemplateService.getHTML("content/login/login.html");
    TemplateService.title = "Login"; //This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();

    $scope.bodyClass = 'login-bg';

    $scope.submitForm = false;
    $scope.loginForm = {};
    $scope.loginBtnClicked = false;
    $scope.apiCalling = false;
    $scope.submitloginForm = function (data, valid) {

        if (valid) {
            $scope.apiCalling = true;
            $scope.email = data.email;
            $scope.data = {};
            $scope.data.username = data.username;
            $scope.data.password = data.password;
            NavigationService.callApiWithData('User/sendAccess', $scope.data, function (data) {
                if (data.value) {
                    // $scope.apiCalling = false;
                    // swal({
                    //     type: 'success',
                    //     title: 'Email Sent Successfully!',
                    //     text: 'We have sent you the access link via email.'
                    // });
                    // $scope.loginForm = {};
                    $state.go("app.validation", {
                        token: data.data.tokenKey
                    });
                } else {
                    $scope.apiCalling = false;
                    swal({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Invalid username or password!'
                    });
                }
            });
        } else {
            $scope.loginBtnClicked = true;
        }

    };


});