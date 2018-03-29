myApp.controller('HomeCtrl', function ($scope, TemplateService, NavigationService, $timeout, toastr, $http,$state,$stateParams) {
    $scope.template = TemplateService.getHTML("content/home/home.html");
    TemplateService.title = "Home"; //This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();

console.log("inside home");

    NavigationService.callApi("Projects/featuredProjects", function (data) {
    $scope.mySlidess=data.data;
   });

    $scope.projectType = [{
            type: 'TUI Projects'

        }, {
            type: 'TUI Innovative Pilots'

        },
        {
            type: 'TUI Potential Pilots'

        },
        {
            type: 'Cross Industry Innovations'
        }
    ];


    $scope.clickType = function (data) {
        $scope.selected = data;
        $scope.data = {};
        $scope.data.type = data;
        NavigationService.callApiWithData('Projects/projectList', $scope.data, function (data) {
            $scope.mySlides2 = data.data;

        })

    };

    $scope.clickType($scope.projectType[0].type);



    $scope.clickProject = function (id) {
        $scope.id = id;
        $state.go('app.project', {
            'id': $scope.id
        });

    };


    $scope.mySlides = [{
            img: 'img/slider-image1.png',
            title: 'Marco Polo 1',
            subtitle: 'An AR application to be used on Destinations, Cruises & more.'
        }, {
            img: 'img/slider-image1.png',
            title: 'Marco Polo 2',
            subtitle: 'An AR application to be used on Destinations, Cruises & more.'
        },
        {
            img: 'img/slider-image1.png',
            title: 'Marco Polo 3',
            subtitle: 'An AR application to be used on Destinations, Cruises & more.'
        }
    ];

    $timeout(function () {
        var mySwiper = new Swiper('.swiper-container', {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }
        })
    }, 100);
});