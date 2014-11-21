'use strict';

angular.module('placemapApp')
  .controller('StudyareadataCtrl', function ($scope, $resource, $stateParams) {
	var sa_id = $stateParams.studyarea_id;
	var StudyArea = $resource('/api/studyareas/'+sa_id);
    $scope.ratings = [
    	{
    		'name':'Detracts',
    		'value':'red'
    	},
    	{
    		'name':'Needs work',
    		'value':'yellow'
    	},
    	{
    		'name':'Adds Value',
    		'value':'green'
    	}
    ]
    $scope.filters = new Object();
    //$scope.
  // $scope.filters.icon = new Array();

	function init(){
	 	StudyArea.get(function(result){
    		$scope.studyarea=result;
    		console.log("====Study Area Data====");
    		console.log(result);
    	
    		
    	});
	}
	init();

	$scope.filterChange = function(){
		
		//remove icon filter if icon is null
		if($scope.filters.icon==null){
			delete $scope.filters["icon"]; 
		}
		var truect;
		for(var index in $scope.filters.responses){
			console.log(index);
			for(var key in $scope.filters.responses[index].opts){
				if($scope.filters.responses[index].opts[key]==false){
					delete $scope.filters.responses[index].opts; 
				}else{
					truect++;
				}
			}

			if(truect==0){
				delete $scope.filters.responses;
			}
		}
		
		console.log($scope.filters);
		
	}


  });
