<<<<<<< HEAD
myApp.controller('HomeCtrl', function ($scope, TemplateService, NavigationService, $timeout, toastr, $http) {
    $scope.template = TemplateService.getHTML("content/home.html");
    TemplateService.title = "Home"; //This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();

    $scope.submitForm = function (data) {
        console.log("This is it");
        return new Promise(function (callback) {
            $timeout(function () {
                callback();
            }, 5000);
        });
    };



})

.controller('LinksCtrl', function ($scope, TemplateService, NavigationService, $timeout, toastr, $http) {
    $scope.template = TemplateService.getHTML("content/links.html");
    TemplateService.title = "Links"; // This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();
})

// Example API Controller
.controller('DemoAPICtrl', function ($scope, TemplateService, apiService, NavigationService, $timeout) {
    apiService.getDemo($scope.formData, function (data) {
        console.log(data);
    });
=======
myApp.controller('AppCtrl', function ($scope, TemplateService, apiService, NavigationService, $timeout, $state, $stateParams, $location) {


    if ($.jStorage.get("user")) {
        var tokenKey = $.jStorage.get("user").tokenKey;
    }

    if ($state.params.token) {
        var tokenParam = $state.params.token;
    }

    $scope.verifyToken = function (token) {
        $scope.data1 = {};
        $scope.data1.token = token;
        NavigationService.callApiWithData('User/verifyToken', $scope.data1, function (data) {
            console.log("data in verify user", data);
            if (data.value) {
                if ($state.current.name == 'app.validation') {
                    $.jStorage.set("user", data.data);
                    $state.go('app.home');
                }
            } else {
                $state.go('login');
                $.jStorage.flush();
            }
        })
    }

    if (!tokenKey) {
        if (tokenParam) {
            // API Call
            $scope.verifyToken(tokenParam);
        } else {
            // Go To Login
            $state.go('login');
        }

    } else { 
        // If jstorage not empty
        $scope.verifyToken(tokenKey);
    }




});

myApp.controller('ValidationCtrl', function ($scope, TemplateService, apiService, NavigationService, $timeout) {

>>>>>>> 87f45b54325e42808f314066b6e7d0e7fafe9190
});