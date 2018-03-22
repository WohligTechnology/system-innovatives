myApp.factory('NavigationService', function () {
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
        name: "Login",
        classis: "active",
        anchor: "login",
        subnav: []
    }, {
        name: "Marco Polo",
        classis: "active",
        anchor: "marcopolo",
        subnav: []
    }];

    return {
        getNavigation: function () {
            return navigation;
        },
    };
});