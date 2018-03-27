myApp.controller('HomeCtrl', function ($scope, TemplateService, NavigationService, $timeout, toastr, $http) {
    $scope.template = TemplateService.getHTML("content/home/home.html");
    TemplateService.title = "Home"; //This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();

$scope.projectType =[{
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
       console.log("data in clicktype",data);
       $scope.data={};
         $scope.data.type=data;
          console.log("data.email",$scope.data);
       NavigationService.callApiWithData('Projects/projectList',$scope.data, function (data) {
           $scope.mySlides2=data.data;
           console.log("$scope.mySlides2", $scope.mySlides2);

       })
      
   };

   $scope.clickType($scope.projectType[0].type);


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

    // $scope.mySlides2 = [{
    //         img: 'img/one1.png',
    //         textheading: 'TUI MATE',
    //         text: 'Plan holidays with the help to digital assistant'
    //     },
    //     {
    //         img: 'img/one2.png',
    //         textheading: 'MARCO POLO',
    //         text: 'An AR application to be used on Destination, Cruises & more.'
    //     },
    //     {
    //         img: 'img/one3.png',
    //         textheading: 'TUI MOMENTS',
    //         text: 'Experience your holiday before booking'
    //     },
    //     {
    //         img: 'img/one1.png',
    //         textheading: 'TUI MATE',
    //         text: 'Plan holidays with the help to digital assistant'
    //     },
    //     {
    //         img: 'img/one2.png',
    //         textheading: 'MARCO POLO',
    //         text: 'An AR application to be used on Destination, Cruises & more.'
    //     },
    //     {
    //         img: 'img/one3.png',
    //         textheading: 'TUI MOMENTS',
    //         text: 'Experience your holiday before booking'
    //     }
    // ];

    $timeout(function () {
        var mySwiper = new Swiper('.swiper-container', {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }
        })
    }, 100);
});