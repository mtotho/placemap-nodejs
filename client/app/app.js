'use strict';





angular.isUndefinedOrNull = function(val) {
    return angular.isUndefined(val) || val === null 
}

angular.module('placemapApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'uiGmapgoogle-maps',
  'ngProgress',
  'ngAria',
  'ngMaterial'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $provide, $httpProvider,uiGmapGoogleMapApiProvider) {
    $urlRouterProvider
     .otherwise('/');
    
      uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyAHDR09KWWgVoyFCoavaoHm2cCAHX5VL2',
        v: '3.17',
        libraries: 'weather,geometry,visualization,places'
    });
/*
     if(location.host.split(":")[0]!='localhost'){
        var url=window.location.href;              //http://localhost:9000/admin/studyareas/create 
        var base_url = url.split("placemap")[0]; //http://localhost:9000/admin/ 
     //   console.log(base_url.split(location.host));
        root_path = base_url.split(location.host)[1] + 'placemap/';

        
      
    }*/
        

    //$browser.baseHref = function() { return "/" };
  // is_state_restored = "derp";
    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');


  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  }).run(function ($rootScope, $state, Auth, $cookieStore,userStorage) {
     // $rootScope.basePath = $("#linkBasePath").attr('href');

    window.onbeforeunload = function (event) {
      
        $rootScope.$broadcast('savestate');
    };
  });

$(document).ready(function(){
  window.debug = true;


});

angular.module('placemapApp').filter("toArray", function(){
    return function(obj) {
        var result = [];
        angular.forEach(obj, function(val, key) {
            result.push(val);
        });
        return result;
    };
});

angular.module('placemapApp').directive('fullHeight', function ($window) {
    return {
        restrict: 'A',
        link: function (scope, element) {
            var headerheight=$("header").outerHeight();
            var navheight=$(".nav_bar").outerHeight();
           // console.log(headerheight);
            scope.initializeWindowSize = function () {

                $(element).css('min-height', $window.innerHeight - (headerheight+navheight));
            };
            scope.initializeWindowSize();
            angular.element($window).bind('resize', function () {
                scope.initializeWindowSize();
            });
        }
    };
});

function autosize(){
  var headerheight=$("header").outerHeight();
  var info_height=$("#info_area").outerHeight();
  var windowheight=$(window).outerHeight();

  var targetheight = windowheight - (headerheight + info_height);


  var namewidth = $(".name_panel h3").width();
  //console.log(namewidth);

  //$(".name_panel").width(namewidth);


  $("#map_canvas").height(targetheight);
}