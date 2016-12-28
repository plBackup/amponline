/**
 * Created by limeiting on 16/11/4.
 */
'use strict';

/* App Module */

var ampApp = angular.module('amp', [
    'ui.router',
    'ngAnimate',
    'ampControllers',
    'ampFilters',
    //'me-pageloading'
]);
ampApp.run(
    [          '$rootScope', '$state', '$stateParams',
        function ($rootScope,   $state,   $stateParams) {

            // It's very handy to add references to $state and $stateParams to the $rootScope
            // so that you can access them from any scope within your applications.For example,
            // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
            // to active whenever 'contacts.list' or one of its decendents is active.
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ]
);

ampApp.config(function($stateProvider,$urlRouterProvider) {
    // An array of state definitions
    var states = [
        {
            name: 'noi',
            url: '/noi',
            views:{
                'toolbar': {
                    templateUrl: '../components/toolbar/noi_filter.html',
                },
                'content': {
                    templateUrl: '../views/noi_analyse/noi.html',
                },
                "right":{
                    templateUrl: '../views/blank_right.html',
                }
            },
            controller:"page",
            resolve: {
                data: ['$q', function($q){
                    var defer = $q.defer();
                    setTimeout(function(){
                        defer.resolve('page1');
                    }, 1500);
                    return defer.promise;
                }]
            }
        }, //state
        {
            name: 'rpgindex',
            url: '/rpgindex',
            views:{
                'toolbar': {
                    templateUrl: '../components/toolbar/rent_package_filter.html',
                },
                'content': {
                    templateUrl: '../views/datatools/datatool_rent_package.html',
                },
                "right":{
                    templateUrl: '../views/datatools/datatool_rent_package_rpanel.html',
                }
            },
            controller:"page",
            resolve: {
                data: ['$q', function($q){
                    var defer = $q.defer();
                    setTimeout(function(){
                        defer.resolve('page1');
                    }, 1500);
                    return defer.promise;
                }]
            }
        }, //state
        {
            name: 'irrplan',
            url: '/irrplan',
            views:{
                'toolbar': {
                    templateUrl: '../components/toolbar/blank_filter.html',
                },
                'content': {
                    templateUrl: '../views/datatools/datatool_irr_plan.html',
                },
                "right":{
                    templateUrl: '../views/blank_right.html',
                }
            },
            controller:"page",
            resolve: {
                data: ['$q', function($q){
                    var defer = $q.defer();
                    setTimeout(function(){
                        defer.resolve('page1');
                    }, 1500);
                    return defer.promise;
                }]
            }
        }, //state
        {
            name: 'datasim',
            url: '/datasim',
            views:{
                'toolbar': {
                    templateUrl: '../components/toolbar/blank_filter.html',
                },
                'content': {
                    templateUrl: '../views/datatools/datatool_sim.html',
                },
                "right":{
                    templateUrl: '../views/blank_right.html',
                }
            },
            controller:"page",
            resolve: {
                data: ['$q', function($q){
                    var defer = $q.defer();
                    //mePageLoading.show("Circle");
                    setTimeout(function(){
                        //mePageLoading.hide();
                        defer.resolve('page1');
                    }, 1500);
                    return defer.promise;
                }]
            }
        }, //state
        {
            name: 'rpgset',
            url: '/rpgset',
            views:{
                'toolbar': {
                    templateUrl: '../components/toolbar/blank_filter.html',
                },
                'content': {
                    templateUrl: '../views/datatools/datatool_rpg_set_index.html',
                },
                "right":{
                    templateUrl: '../views/blank_right.html',
                }
            },
            controller:"page",
            resolve: {
                data: ['$q', function($q){
                    var defer = $q.defer();
                    setTimeout(function(){
                        defer.resolve();
                    }, 1500);
                    return defer.promise;
                }]
            }
        }, //state
    ];

    // Loop over the state definitions and register them
    states.forEach(function(state) {
        $stateProvider.state(state);
    });
    $urlRouterProvider.when('', '/datasim');

    $urlRouterProvider.otherwise(
        function($injector, $location) {
            $location.path('/datasim');
        });
});


ampApp.controller('AppController', [function($scope, $rootScope, $http, $timeout) {
    /*$scope.layoutMode = 0;
    $scope.list = [];
    $scope.currentAnimation;
    $scope.isShow = true;
    $scope.animations = ["toggle",
        "spin-toggle",
        "scale-fade",
        "scale-fade-in",
        "bouncy-scale-in",
        "flip-in",
        "slide-left",
        "slide-right",
        "slide-top",
        "slide-down",
        "bouncy-slide-left",
        "bouncy-slide-right",
        "bouncy-slide-top",
        "bouncy-slide-down",
        "rotate-in"];*/

}]);

ampApp.controller('mainCtrl', ['$scope', '$location', 'mePageLoading', function($scope, $location, mePageLoading){
    $scope.effect = 'Circle';
    $scope.show = function(){
        // 手动调用动画
        mePageLoading.show($scope.effect);
        setTimeout(function(){
            mePageLoading.hide();
        }, 1500);
    };
    $scope.toggle = function(){
        // 自动调用动画
        if($location.path() === '/page1'){
            $location.path('/page2');
        }else{
            $location.path('/page1');
        }
    };
}])
