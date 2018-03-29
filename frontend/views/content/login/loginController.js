myApp.controller('LoginCtrl', function ($scope, TemplateService, NavigationService, $timeout, toastr, $http,$state) {
    $scope.template = TemplateService.getHTML("content/login/login.html");
    TemplateService.title = "Login"; //This is the Title of the Website
    // TemplateService.footer = "content/template/login-footer.html"; //This is the Footer for Login Page
    $scope.navigation = NavigationService.getNavigation();

console.log("inside Login");

//     $scope.submitForm = function (data) {
//        $scope.email=data.email;
//        $scope.data={};
//          $scope.data.email=data.email;
//        NavigationService.callApiWithData('User/sendAccess',$scope.data, function (data) {
//            if(data.value){
//                $scope.emailExist=true;
//                $scope.emailNotExist=false;
//            }
//            else{
//                $scope.emailNotExist=true;
//                $scope.emailExist=false;
//            }

//        })
//    }


 $scope.loginForm = {};
    $scope.submitloginForm = function (data2) {
        console.log('dkhicjii', data2);
        if (!data2.email) {
            $scope.femailError = true;
            console.log("im im", $scope.showError);
        }

        $scope.email=data2.email;
       $scope.data={};
         $scope.data.email=data2.email;
       NavigationService.callApiWithData('User/sendAccess',$scope.data, function (data) {
           if(data.value){
               $scope.emailExist=true;
               $scope.emailNotExist=false;
           }
           else{
               $scope.emailNotExist=true;
               $scope.emailExist=false;
           }

       })
        
    };





});