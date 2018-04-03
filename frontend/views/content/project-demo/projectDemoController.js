myApp.controller('ProjectDemoCtrl', function ($scope, TemplateService, NavigationService, $timeout, toastr, $http, $uibModal, $stateParams, $sce, $state) {
    $scope.template = TemplateService.getHTML("content/project-demo/project-demo.html");
    $scope.template.footer = "";
    var trustSrc = function (src) {
        return $sce.trustAsResourceUrl(src);
    };
    $scope.url = trustSrc($stateParams.url);
    $scope.id = $stateParams.id;

    $scope.goBack = function () {
        if ($scope.id) {
            $state.go('app.project', {
                id: $scope.id
            });
        } else {
            $state.go('app.home');
        }
    };

});