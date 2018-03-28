myApp.controller('LoginCtrl', function ($scope, TemplateService, NavigationService, $timeout, toastr, $http) {
    $scope.template = TemplateService.getHTML("content/login/login.html");
    TemplateService.title = "Login"; //This is the Title of the Website
    // TemplateService.footer = "content/template/login-footer.html"; //This is the Footer for Login Page
    $scope.navigation = NavigationService.getNavigation();

    $scope.submitForm = function (data) {
       console.log("inside submit form");
       $scope.email=data.email;
       $scope.data={};
         $scope.data.email=data.email;
          console.log("data.email",$scope.data);
       NavigationService.callApiWithData('User/sendAccess',$scope.data, function (data) {
           console.log("data in sendAccess", data);
           if(data.value){
               $scope.emailExist=true;
               $scope.emailNotExist=false;
           }
           else{
               $scope.emailNotExist=true;
               $scope.emailExist=false;
           }

       })
   }
});