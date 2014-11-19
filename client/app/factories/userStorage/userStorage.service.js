'use strict';

angular.module('placemapApp')
  .factory('userStorage', ['$rootScope', '$cookieStore', function ($rootScope, $cookieStore) {

    var service = {

        model: {
            name: '',
            email: '',
            admin:{
              studyareas:{
                create:{
                  in_progress:false,
                  lat:'',
                  lng:'',
                  zoom:'',
                  name:'',
                  is_public:''
                }
              }

            }
        },

        SaveState: function () {
            console.log("saving state");
            //console.log(service.model);
        
            $cookieStore.put("user_data",angular.toJson(service.model));

            //sessionStorage.userService = angular.toJson(service.model);
        },

        RestoreState: function () {
            console.log("restoring state (in service)");
            if(!angular.isUndefined($cookieStore.get("user_data"))){
              service.model = angular.fromJson($cookieStore.get("user_data"));
            }
            
        }
    }

    $rootScope.$on("savestate", service.SaveState);
    $rootScope.$on("restorestate", service.RestoreState);

    return service;
}]);