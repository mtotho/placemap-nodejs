'use strict';

angular.module('placemapApp')
  .factory('Studyarea', function ($resource, $rootScope) {
    // Service logic
    // ...
     return $resource($rootScope.basePath+'api/studyareas/:id',{id: '@_id'},
    {
      update: {
        method: 'PUT'
      }
    });
  });
