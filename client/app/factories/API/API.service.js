'use strict';

angular.module('placemapApp')
  .factory('API', function ($resource) {
    // Service logic
 
    // Public API here
    return {

      Studyarea:$resource('api/studyareas/:id',{id: '@_id'},{
                    update: {method: 'PUT'}
                 }),

      AuditType:$resource('api/audit_types/:id',{id: '@_id'},{
                    update: {method: 'PUT'}
                }),
      
      Response:$resource('api/responses'),

      Question:$resource('api/questions'),

      //consolidated from yeoman generated user service
      User:$resource('api/users/:id/:controller', {id: '@_id'}, {
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
