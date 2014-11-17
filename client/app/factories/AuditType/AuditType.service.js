'use strict';

angular.module('placemapApp')
  .factory('AuditType', function ($resource) {
  
    return $resource('/api/audit_types/:id',{},
    {
      update: {
        method: 'PUT'
      }
    });
  });
