'use strict';

angular.module('placemapApp')
  .factory('Studyarea', function ($resource) {
    // Service logic
    // ...
     return $resource('api/studyareas/:id',{id: '@_id'},
    {
      update: {
        method: 'PUT'
      }
    });
  });
