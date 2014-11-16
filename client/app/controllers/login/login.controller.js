'use strict';

angular.module('placemapApp').controller('LoginCtrl', function ($scope, Auth, $location) {

	$scope.errors= new Object();

    $scope.login = function(form) {
      $scope.submitted = true;



      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {

          // Logged in, redirect to home
          $location.path('/admin');
        })
        .catch( function(err) {
   
          $scope.errors.other = err.message;
        });
      }
    };

  });
