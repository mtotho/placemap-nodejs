'use strict';

angular.module('placemapApp')
  .controller('AdminUserCtrl', function ($scope, Auth, User) {
    	//var User = $resource('/api/users');
    	//$scope.roles = new Array();
    	function init(){
    		
	    	$scope.userRoles = [
	    		'admin',
	    		'user'
	    	];
	    	
    		User.query(Auth.getCurrentUser(), function(result){
	    		$scope.users = result;
	    		console.log(result);
    		});


			$('#mdlAddUser').modal({
			  show: false
			});
    	}
    	init();

    	
		$scope.btnNewUser = function(){
			
			$("#mdlAddUser").modal('show');
		}
		
		$scope.modalSubmitNewUser = function(form){
	     	if(form.$valid) {
	     		
	     		if($scope.newUser.password1==$scope.newUser.password2){

	     			$scope.newUser.password = $scope.newUser.password1;
	     			Auth.createUser($scope.newUser,function(result){
	     				console.log("===new user===");
	     				console.log(result);
	     				$scope.users.push(result);
	     				$("#mdlAddUser").modal('hide');
	     			});
	     		}else{
	     			alert("Passwords do not match");
	     		}
	     		
	     	}
		}

  });
