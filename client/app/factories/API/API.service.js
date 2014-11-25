'use strict';

angular.module('placemapApp')
  .factory('API', function ($resource, apiroot) {
    // Service logic
    console.log("derping");
    console.log(apiroot);
    // Public API here
    return {

      Studyarea:$resource(apiroot+'studyareas/:id',{id: '@_id'},{
                    update: {method: 'PUT'}
                 }),

      AuditType:$resource(apiroot+'audit_types/:id',{id: '@_id'},{
                    update: {method: 'PUT'}
                }),
      
      Response:$resource(apiroot+'responses'),

      Question:$resource(apiroot+'questions'),

      //consolidated from yeoman generated user service
      User:$resource(apiroot+'users/:id/:controller', {id: '@_id'}, {
                  changePassword: {
                    method: 'PUT',
                    params: {
                      controller:'password'
                    }
                  },
                  get: {
                    method: 'GET',
                    params: {
                      id:'me'
                    }
                  }
              })





    };
  });
