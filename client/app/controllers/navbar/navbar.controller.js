'use strict';

angular.module('placemapApp').controller('NavbarCtrl', function ($scope, $location,$state,$rootScope, Auth,$mdSidenav) {
    
  	var is_state_restored = false;

		$scope.tabs={
				home:{title:"About", state:"home", order:1, visible:true},
				SASelect:{title:"Study Areas", state:"SASelect", order:2, visible:true},
				Placemaking:{title:"Placemaking Tutorial", state:"Placemaking", order:3, visible:true},
				admin:{title:"Admin Panel", state:"admin", order:4, visible:true},
				login:{title:"Login", state:"login", order:4, visible:false},
				logout:{title:"Logout", state:"logout", order:5, visible:true}
				
				//{title:""},
				//{title:"Home"}
			}

		

	$scope.selectTab = function (tab){
		//console.log("selecting tab");
		//console.log();
	
		if(is_state_restored){

			if(tab.state=="logout"){
				$scope.logout();
			}else{
				$scope.selectedIndex =tab.order-1;
				console.log("selecting " + tab.state);
				$state.go(tab.state);
			}


		}
	

		
	}
	
	$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
		
		 if(!is_state_restored){
             $rootScope.$broadcast('restorestate'); //let everything know we need to restore state
             is_state_restored=true;
          //state is already restored, save it
          }else{
            $rootScope.$broadcast('savestate');
          }
         

	 	
			 console.log("Going to state: "+toState.name);
          	  switch(toState.name){
				case "home":{
					$scope.selectedIndex=0;
					break;
				}
				case "SASelect":{
					$scope.selectedIndex=1;
					break;
				}
				case "Placemaking":{
					$scope.selectedIndex=2;
					break;
				}
				case "admin":{
					
					$scope.selectedIndex=3;
					
					break;
				}
				case "login":{
					$scope.selectedIndex=3;
					break;
				}
			};


		});
	
		$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
			//console.log(toState);	


		 	//Auth.isLoggedInAsync(function(isLoggedIn){

	 		console.log(fromParams);
		 	Auth.isLoggedInAsync(function(isLoggedIn){

	 		   if (toState.data.authenticate && !isLoggedIn) {
	 		   		console.log("not logged");
	              	$state.go("login");
	              	event.preventDefault();
	            }else{
	            	//console.log("logged in");
	            }
						
				if(isLoggedIn){
					console.log("is logged in");
					//if(angular.isUndefinedOrNull($scope.tabs.admin)){
			 			$scope.tabs.admin.visible=true;
			 			$scope.tabs.logout.visible=true;
			 			$scope.tabs.login.visible=false;
			 		//}

						//delete $scope.tabs.login;
		
			 	}else{
			 		//if(angular.isUndefinedOrNull($scope.tabs.login)){
			 			$scope.tabs.login.visible=true;
			 			$scope.tabs.admin.visible=false;
			 			$scope.tabs.logout.visible=false;

			 		//}
				 		
			 		//delete $scope.tabs.logout;
		 		}

		 		

			

		 //	

	 	});

		

		 	
		


			});
		$scope.logout = function(){
			Auth.logout();
		//	$scope.isLoggedIn=false;
			//$state.go("home");
			$location.path('/');

		}


  });
