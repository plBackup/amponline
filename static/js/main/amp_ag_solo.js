/**
 * Created by limeiting on 16/11/4.
 */
'use strict';

/* App Module */

var ampAppSolo = angular.module('ampsolo', [
    'ui.router',
    'dataSet'
]);

ampAppSolo.config(function($stateProvider,$urlRouterProvider) {
    // An array of state definitions
    var states = [

        {
            name: 'rpgpin',
            url: '/rpgpin',
            views:{
                'content': {
                    templateUrl: '../views/datatools/rpg_set.html',
                    controller:"dataSetController",
                    controllerAs:"sCtrl"
                },
                "right":{
                    templateUrl: '../views/blank_right.html',
                }
            },
            resolve: {
                rpgSetData:function(dataSetService){
                    return dataSetService.getData();
                },
                data: ['$q','$timeout', function($q,$timeout){
                    var defer = $q.defer();
                    $timeout(function(){
                        defer.resolve();
                        amp_main.loading_hide();
                    }, 300);
                    return defer.promise;
                }]
            }

        }, //state
        {
            name: 'rpgresult',
            url: '/rpgresult',
            views:{

                'content': {
                    templateUrl: '../views/datatools/datatool_rent_package_result.html',
                    controller:"dataResultController",
                    controllerAs:"rCtrl"
                },
                "right":{
                    templateUrl: '../views/blank_right.html',
                }
            },
            controller:"page",
            resolve: {
                rpgResultData:function(dataResultService){
                    return dataResultService.getData();
                },
                data: ['$q','$timeout', function($q,$timeout){
                    var defer = $q.defer();
                    $timeout(function(){
                        defer.resolve();
                        amp_main.loading_hide();
                    }, 300);
                    return defer.promise;
                }]
            }
        }, //state
    ];

    // Loop over the state definitions and register them
    states.forEach(function(state) {
        $stateProvider.state(state);
    });
    $urlRouterProvider.when('', '/rpgpin');
    $urlRouterProvider.when('datatool', '/');
    $urlRouterProvider.otherwise(
        function($injector, $location) {
            $location.path('/');
        });
});

ampAppSolo.controller('MainController', function($rootScope, $scope) {
    var curProject=window.location.search.slice(1).split("=")[1];
    $rootScope.curProject=curProject;

    $rootScope.homePageIsShown = true;
    $scope.state = {};
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {

        var prev = $rootScope.prev ? $rootScope.prev : '';
        $scope.state.back = (toState.name === prev);
        $scope.state.toHome = (toState.name === 'noi');
        $scope.state.loading=false;
        $scope.state.enter=false;
        $scope.state.exit=true;
        //$scope.$apply();
    });
    $rootScope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams){
            $rootScope.prev=fromState.name;
            $scope.state.enter=true;
            $scope.state.exit=false;
            $scope.state.loading=false;
            $rootScope.shownav=(toState.name==="rpgresult");
            ////console.log("prev:"+fromState.name);
        });
    $rootScope.$on('$viewContentLoading',
        function(event, viewConfig){
            // Access to all the view config properties.
            // and one special property 'targetView'
            // viewConfig.targetView
            $scope.state.loading=true;
        });

    $scope.$on('$viewContentLoaded',
        function(event){
            $scope.state.loading=false;
        });

});