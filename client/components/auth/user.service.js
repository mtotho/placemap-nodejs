'use strict';

angular.module('placemapApp')
  .factory('User', function ($resource, $rootScope) {
    return $resource($rootScope.basePath+'api/users/:id/:controller', {
      id: '@_id'
    },
    {
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
	  });
  });
