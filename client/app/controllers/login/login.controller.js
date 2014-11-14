'use strict';

angular.module('placemapApp').controller('LoginCtrl', function ($scope, Auth, $location) {


    $scope.login = function(form) {
      $scope.submitted = true;



      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function(result) {
  
          // Logged in, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

  });
