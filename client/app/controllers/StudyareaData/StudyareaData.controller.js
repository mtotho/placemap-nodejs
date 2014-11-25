'use strict';

angular.module('placemapApp')
  .controller('StudyareadataCtrl', function ($scope, API, $stateParams) {
	var sa_id = $stateParams.studyarea_id;
	
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
	 	API.Studyarea.get({id:sa_id},function(result){
    		$scope.studyarea=result;
    		console.log("====Study Area Data====");
    		console.log(result);
    	
    		
    	});
	}
	init();

	$scope.checkChange = function(question_index, question, chk){
		console.log(question_index);
		//console.log(question.option_text);
		console.log(chk.option_text);
		//console.log($scope.filters.responses[question_index].opts[chk.option_text]);
		if($scope.filters.responses[question_index].opts[chk.option_text]==false){
			delete $scope.filters.responses[question_index].opts[chk.option_text];
		}
		delete $scope.filters.responses[2];
		console.log($scope.filters);
	}
	$scope.filterChange = function(){
		
		//remove icon filter if icon is null
		if($scope.filters.icon==null){
			delete $scope.filters["icon"]; 
		}
		
		/*var truect;
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
		*/
	}


  });
