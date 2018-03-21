myApp.controller('DemoAPICtrl', function ($scope, TemplateService, apiService, NavigationService, $timeout) {
    apiService.getDemo($scope.formData, function (data) {
        console.log(data);
    });
});