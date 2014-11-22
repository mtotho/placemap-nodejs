'use strict';

angular.module('placemapApp')
  .factory('AuditType', function ($resource, $rootScope) {
  
    return $resource($rootScope.basePath+'api/audit_types/:id',{id: '@_id'},
    {
      update: {
        method: 'PUT'
      }
    });
  });
