'use strict';

angular.module('placemapApp').controller('NavbarCtrl', function ($scope, $location) {
    

	$scope.$on('$stateChangeSuccess', function () {
			
				/*
			if(auth.isLoggedIn()){
				$scope.user=auth.getUser();
				$scope.isLoggedIn=true;
			}else{
				$scope.isLoggedIn=false;
			}
			*/

			var path=$location.path().split("/")[1];

			$("header .nav li").removeClass("active");
			$scope.userNavText="Admin Panel";

			switch(path){
				case "":{
					
					$("header .nav li:nth-child(1)").addClass("active");
					break;
				}
				case "studyarea":{
					$("header .nav li:nth-child(2)").addClass("active");

					break;
				}
				case "login":{
						
					$("header .nav li:nth-child(3)").addClass("active");
					break;
				}
				case "admin":{
					$scope.userNavText="Logout";
					$("header .nav li:nth-child(4)").addClass("active");

					break;
				}
				default:{
					;
					break;
				}
			}

			console.log(path);

		});


  });
