myApp.controller('HomeCtrl', function ($scope, TemplateService, NavigationService, $timeout, toastr, $http, $state, $stateParams, $uibModal) {
    $scope.template = TemplateService.getHTML("content/home/home.html");
    TemplateService.title = "Home"; //This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();

    NavigationService.callApi("Projects/featuredProjects", function (data) {
        $scope.mySlidess = data.data;
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



    //DISCUSS NOW MODAL
    $scope.openModal = function () {
        $scope.feedback = $uibModal.open({
            animation: true,
            templateUrl: "views/content/contactus/contactus.html",
            scope: $scope,
            size: 'lg',
            // backdropClass: 'back-drop'
        });
    }
    //DISCUSS NOW- CONTACT FORM VALIDATIONS
    $scope.submitForm = false;
    $scope.contactForm = {};
    $scope.contactBtnClicked = false;
    $scope.apiCalling = false;
    $scope.submitcontactForm = function (data, valid) {
        if (valid) {
            $scope.apiCalling = true;
            $scope.data = {};
            $scope.data.userEmail = data.userEmail;
            $scope.data.name = data.name;
            $scope.data.number = data.number;
            $scope.data.comments = data.comments;
            NavigationService.callApiWithData('Contact/contactUs', $scope.data, function (data) {
                if (data.value) {
                    $scope.apiCalling = false;
                    $scope.contactInstance.close();
                } else {
                    $scope.apiCalling = false;
                    $scope.contactInstance.close();
                }
            });
        } else {
            $scope.contactBtnClicked = true;
        }
    };
});