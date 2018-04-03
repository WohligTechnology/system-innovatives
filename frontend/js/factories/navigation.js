// var adminurl = 'http://innovatives.sptr.co/api/';
var imgurl = adminurl + "upload/";
var imgpath = imgurl + "readFile";

myApp.factory('NavigationService', function ($http) {
    var navigation = [{
        name: "Home",
        classis: "active",
        anchor: "home",
        subnav: [{
            name: "Subnav1",
            classis: "active",
            anchor: "home"
        }]
    }, {
        name: "Links",
        classis: "active",
        anchor: "links",
        subnav: []
<<<<<<< HEAD
=======
    }, {
        name: "Project",
        classis: "active",
        anchor: "project",
        subnav: []
>>>>>>> 87f45b54325e42808f314066b6e7d0e7fafe9190
    }];

    return {
        getNavigation: function () {
            return navigation;
        },

        callApi: function (url, callback) {
            $http.post(adminurl + url).then(function (data) {
                data = data.data;
                callback(data);
            });
        },

        callApiWithData: function (url, formData, callback) {
            $http.post(adminurl + url, formData).then(function (data) {
                data = data.data;
                callback(data);

            });
        },



    };
});