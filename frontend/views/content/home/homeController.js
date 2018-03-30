myApp.controller('HomeCtrl', function ($scope, TemplateService, NavigationService, $timeout, toastr, $http,$state,$stateParams,$uibModal) {
    $scope.template = TemplateService.getHTML("content/home/home.html");
    TemplateService.title = "Home"; //This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();

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
    $scope.contactForm = {};
    $scope.submitForm = function (data) {
        if (!data.name) {
            $scope.nameError = true;
        }
        if (!data.email) {
            $scope.emailError = true;
        }
        if (!data.contactno) {
            $scope.contactnoError = true;
        }
        if (!data.query) {
            $scope.queryError = true;
        }
        $scope.contactData = {};
        $scope.contactData.userEmail = data.userEmail;
        $scope.contactData.name = data.name;
        $scope.contactData.number = data.number;
        $scope.contactData.comments = data.comments;
        NavigationService.callApiWithData("Contact/contactUs", $scope.contactData, function (data) {
            console.log("data in api", data);

        });
    };




});