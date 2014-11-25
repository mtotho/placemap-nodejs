'use strict';

var is_state_restored = false;





angular.module('placemapApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $provide, $httpProvider) {
    $urlRouterProvider
     .otherwise('/');
      var root_path="/";

     if(location.host.split(":")[0]!='localhost'){
        var url=window.location.href;              //http://localhost:9000/admin/studyareas/create 
        var base_url = url.split("placemap")[0]; //http://localhost:9000/admin/ 
     //   console.log(base_url.split(location.host));
        root_path = base_url.split(location.host)[1] + 'placemap/';

        
      
    }
        
     console.log(root_path);

     $provide.value("apiroot", root_path+'api/');
    //$cookieStore.put("state_restored","false");
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


    //console.log(is_state_restored);
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
        
        
          //State is not restored
         if(!is_state_restored){
             $rootScope.$broadcast('restorestate'); //let everything know we need to restore state
             is_state_restored=true;
          //state is already restored, save it
          }else{
            $rootScope.$broadcast('savestate');
          }


         Auth.isLoggedInAsync(function(loggedIn) {
            if (toState.data.authenticate && !loggedIn) {
               $state.transitionTo("login");
               event.preventDefault();
            }
          });//end Auth
         //console.log($cookieStore.get('state_restored'));




        
    });//end stateChangeStart

    window.onbeforeunload = function (event) {
      
        $rootScope.$broadcast('savestate');
    };
  });

$(document).ready(function(){
  window.debug = true;


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