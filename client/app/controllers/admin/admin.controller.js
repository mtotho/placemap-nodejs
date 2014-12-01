'use strict';

angular.module('placemapApp')
  .controller('AdminCtrl', function ($scope, $state,$mdSidenav) {
	  $scope.toggleLeft = function() {
	    	$mdSidenav('left').toggle();
		}

	  
  });

angular.module('placemapApp').directive('fullAdminHeight', function ($window) {
    return {
        restrict: 'A',
        link: function (scope, element) {
            var headerheight=$("header").outerHeight();
            var navheight=$(".nav_bar").outerHeight();
            var bottomheight=parseInt($(".bottom").css("height").replace("px",""))+
            					parseInt($(".bottom").css('padding-top').replace("px","")) + parseInt($(".bottom").css('padding-bottom').replace("px",""))
            					parseInt($(".bottom button").css('padding-top').replace("px","")) + parseInt($(".bottom button").css('padding-bottom').replace("px",""));
          	var view_content_margin=parseInt($(".admin_content").css('padding-top').replace("px","")) + parseInt($(".admin_content").css('padding-bottom').replace("px",""));
          	
           	console.log($("div.bottom.ng-scope button").css("height"));
            scope.initializeWindowSize = function () {
              
                $(element).css('height', $window.innerHeight - (headerheight+navheight+50+view_content_margin));
            };
            scope.initializeWindowSize();
            angular.element($window).bind('resize', function () {
                scope.initializeWindowSize();
            });
        }
    };
});