'use strict';

angular.module('placemapApp')
  .factory('API', function ($resource, apiroot) {
    // Service logic
 
    // Public API here
    return {

      Studyarea:$resource(apiroot+'studyareas/:id',{id: '@_id'},{
                    update: {method: 'PUT'}
                 }),

      AuditType:$resource(apiroot+'api/audit_types/:id',{id: '@_id'},{
                    update: {method: 'PUT'}
                }),
      
      Response:$resource(apiroot+'api/responses'),

      Question:$resource(apiroot+'api/questions'),

      //consolidated from yeoman generated user service
      User:$resource(apiroot+'api/users/:id/:controller', {id: '@_id'}, {
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
