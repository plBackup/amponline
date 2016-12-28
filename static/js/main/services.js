'use strict';

/* Services */

var ampServices = angular.module('ampServices', ['ngResource']);

ampServices.factory('Phone', ['$resource',
  function($resource){
    return $resource('data/:phoneId.json', {}, {
      query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
    });
  }]);
