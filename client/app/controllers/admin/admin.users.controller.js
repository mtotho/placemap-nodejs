'use strict';

angular.module('placemapApp')
  .controller('AdminUserCtrl', function ($scope, Auth, API) {
    	//var User = $resource('/api/users');
    	//$scope.roles = new Array();
    
    	function init(){
    		
	    	$scope.userRoles = [
	    		'admin',
	    		'user'
	    	];
	    	

    		API.User.query(Auth.getCurrentUser(), function(result){
	    		

	    		for(var i=0; i<result.length; i++){
	    			//$scope.edit_modes[result[i]._id]=false;
	    		}
	    		$scope.users = result;
	    		console.log(result);
    		});


			$('#mdlAddUser').modal({
			  show: false
			});
    	}
    	init();

    	$scope.editMode = function(user){
    		//console.log(user);
    	//	$scope.edit_modes[true;
    	}
    	
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
