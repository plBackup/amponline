'use strict';

/* Controllers */

var ampControllers = angular.module('ampControllers', []);

ampControllers.controller('ampListCtrl', ['$scope', 'Phone',
  function($scope, Phone) {
    $scope.phones = Phone.query();
    $scope.orderProp = 'age';
  }]);

ampControllers.controller('ampDetailCtrl', ['$scope', '$routeParams', 'Phone',
  function($scope, $routeParams, Phone) {
    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    };
  }]);

ampControllers.controller('NOICtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    console.log("...");


  }]);
