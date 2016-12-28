/**
 * Created by limeiting on 16/11/15.
 */
/* App Module */

var mainApp = angular.module('main', [
    'ui.router'
]);


mainApp.config('$stateProvide','$urlRouteProvide',function($stateProvider,$urlRouterProvider) {
    // An array of state definitions
    var states = [
        {
            name: 'main',
            url: '/main',
            views:{
                'content': {
                    templateUrl: '../main/main_ag.html',
                    controller:'pjListController',
                },
            },

            resolve: {
                projects: function(ProjectService) {
                    return ProjectService.getAllProject();
                },
                data: ['$q','$timeout', function($q,$timeout){
                    var defer = $q.defer();
                    $timeout(function(){
                        defer.resolve();
                    }, 300);
                    return defer.promise;
                }]
            }
        }, //state
        {
            name: 'create',
            url: '/create',
            views:{
                'content': {
                    templateUrl: '../main/create_project.html'
                },
            },
            controller:"pjCreateController",
            resolve: {
                project:{},
                data: ['$q','$timeout', function($q,$timeout){
                    var defer = $q.defer();
                    $timeout(function(){
                        defer.resolve();
                    }, 300);
                    return defer.promise;
                }]
            }
        },//state,
        {
            name: 'update',
            url: '/update/:projectId',
            views:{
                'content': {
                    templateUrl: '../main/create_project.html'
                },
            },
            controller:"pjCreateController",
            resolve: {
                project:function(projects,$stateParams){
                    var pId=$stateParams.projectId;
                    return projects[pId];
                    /* return projects.find(function (project) {
                     return project.id==pId;
                     })*/
                },
                data: ['$q','$timeout', function($q,$timeout){
                    var defer = $q.defer();
                    $timeout(function(){
                        defer.resolve();
                    }, 300);
                    return defer.promise;
                }]
            }
        }//state
    ];//end states;

    // Loop over the state definitions and register them
    states.forEach(function(state) {
        $stateProvider.state(state);
    });
    $urlRouterProvider.when('', '/main');

    $urlRouterProvider.otherwise(
        function($injector, $location) {
            $location.path('/main');
        });
});

mainApp.service('ProjectService', function($http) {
    var service = {
        getAllProject: function() {
            return $http.get('../data/projectList.json', { cache: true }).then(function(res) {
                return res.data['projects'];
            });
        },

        getProject: function(id) {
            function projectMatchesParam(project) {
                return project.id === id;
            }

            return service.getAllProject().then(function (project) {
                return project.find(projectMatchesParam)
            });
        },
    };

    return service;
});


mainApp.controller('MainController', function($rootScope, $scope) {
    $rootScope.homePageIsShown = true;

    $scope.state = {};
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {

        var prev = $rootScope.prev ? $rootScope.prev : '';
        $scope.state.back = (toState.name === prev);
        $scope.state.toHome = (toState.name === 'noi');
        $scope.state.loading=false;
        $scope.state.enter=false;
        $scope.state.exit=true;
        // $scope.$apply();
    });
    $rootScope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams){
            $rootScope.curState=toState.name;
            $rootScope.prev=fromState.name;
            $scope.state.enter=true;
            $scope.state.exit=false;
            $scope.state.loading=false;
            //console.log("prev:"+fromState.name);
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

mainApp.controller("pjListController",["$rootScope","$scope","projects",function($rootScope,$scope,projects){
    var self=this;
    $rootScope.projects=projects["projects"];
}]);

mainApp.controller("pjCreateController",["$rootScope","$scope","project",function($rootScope,$scope,project){
    //$scope.project=project;
    var self=this;
    self.project=project;
    //self.curState=$rootScope.curState;
}]);

mainApp.run(function($http) {
    $http.get('../data/projectList.json', { cache: true });
});
