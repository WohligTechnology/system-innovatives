myApp.controller('DemoAPICtrl', function ($scope, TemplateService, apiService, NavigationService, $timeout) {
    apiService.getDemo($scope.formData, function (data) {
        console.log(data);
    });
});

myApp.controller('AppCtrl', function ($scope, TemplateService, apiService, NavigationService, $timeout, $state,$stateParams,$location) {


if($.jStorage.get("user")){
var tokenKey = $.jStorage.get("user").tokenKey;
}

if($state.params.token){
var tokenParam=$state.params.token;
}

    $scope.verifyToken = function (token) {
        $scope.data1={};
        $scope.data1.token=token;
        NavigationService.callApiWithData('User/verifyToken',$scope.data1, function (data) {
            console.log("data in verify user", data);
            if (data.value) {
                $.jStorage.set("user", data.data);
                $state.go('app.home');
            } else {
                $state.go('login');
            }
        })
    }

    if (_.isEmpty(tokenKey)) 
    {
        if ($state.params.token) {
            // API Call
            $scope.verifyToken($state.params.token);
        } else {
            // Go To Login
                $state.go('login');
        }

    } else { // If jstorage not empty
        // $scope.verifyToken(tokenKey);
    }


});

myApp.controller('ValidationCtrl', function ($scope, TemplateService, apiService, NavigationService, $timeout) {

});