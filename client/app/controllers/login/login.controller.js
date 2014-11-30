'use strict';

angular.module('placemapApp').controller('LoginCtrl', function ($scope,$location, $timeout, ngProgress, $state,Auth) {

	$scope.errors= new Object();

    $scope.login = function(form) {
      $scope.submitted = true;



      if(form.$valid) {
        ngProgress.color('green');
        ngProgress.start();
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
         // Auth.isLoggedInAsync(function(isLoggedIn){
           // $location.path('/admin');
            $state.go("admin", {is_valid:"true"});
            ngProgress.complete(); 
            //  event.preventDefault();

         //   }); //event.preventDefault;

        // });
         
          // Logged in, redirect to home
           //$timeout(function(event){
              //console.log($state);
              
         //    ngProgress.complete(); 
              //event.preventDefault();
          //  / 
           /// }, 2000)
          
        })
        .catch( function(err) {
    
          $scope.errors.other = err.message;
        });
      }
    };

  });
