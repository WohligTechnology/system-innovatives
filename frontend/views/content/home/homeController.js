myApp.controller('HomeCtrl', function ($scope, TemplateService, NavigationService, $timeout, toastr, $http) {
    $scope.template = TemplateService.getHTML("content/home/home.html");
    TemplateService.title = "Home"; //This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();

    $scope.mySlides = [{
            img: 'img/slider-image1.png'
        }, {
            img: 'img/slider-image1.png'
        },
        {
            img: 'img/slider-image1.png'
        }
    ];

    $scope.mySlides2 = [{
            img: 'img/one1.png',
            textheading: 'TUI MATE',
            text: 'Plan holidays with the help to digital assistant'
        },
        {
            img: 'img/one2.png',
            textheading: 'MARCO POLO',
            text: 'An AR application to be used on Destination, Cruises & more.'
        },
        {
            img: 'img/one3.png',
            textheading: 'TUI MOMENTS',
            text: 'Experience your holiday before booking'
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