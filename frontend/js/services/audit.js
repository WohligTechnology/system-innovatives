myApp.service('AuditService', function ($http) {
    var token = $.jStorage.get("token");

    this.create = function (token, activity) {

        var params = {
            token: token,
            activity: activity
        };

        $http({
            url: apiUrl + 'UsageLogs/create',
            params: params,
            method: 'POST'
        }).then(function (response) {
            console.log("response", response);

        }).catch(function () {
            console.log("inside catch")
        });

    };

});