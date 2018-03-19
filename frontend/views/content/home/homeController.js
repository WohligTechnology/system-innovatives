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
            img: "img/one1.png"
        },
        {
            img: "img/one2.png"
        },
        {
            img: "img/one3.png"
        }
    ];

    $timeout(function () {
        var mySwiper = new Swiper('.swiper-container', {
            navigation: {
                nextEl: '.swiper-next',
                prevEl: '.swiper-prev'
            }
        })
        console.log("inside timeout");
    }, 100);
});