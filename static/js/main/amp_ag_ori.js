/**
 * Created by limeiting on 16/11/4.
 */
'use strict';
/* App Module */

var ampApp = angular.module('amp', [
    'ui.router',
    'noi',
    "ampFilters",
    "ampFilter",
    'commonService',
    //'amp-directive-collection',
    "dataTool"
    //'noiFilters'
]);


ampApp.config(["$stateProvider","$urlRouterProvider",function($stateProvider,$urlRouterProvider) {
    // An array of state definitions
    var states = [
        {
            name: 'noi',
            url: '/noi',
            views:{
                'toolbar': {
                    templateUrl: '../components/toolbar/noi_filter.html',
                    controller:"monthFilterController",
                    controllerAs:"tCtrl"
                },
                'content': {
                    templateUrl: '../views/noi_analyse/noi.html',
                    controller:"noiController",
                    controllerAs:"noiCtrl"
                },
                "right":{
                    templateUrl: '../views/blank_right.html'
                }
            },
            controller:"page",
            resolve: {
                noiAllData: function(noiService) {
                    return noiService.getAllData();
                },
               /* data: ['$q','$timeout', function($q,$timeout){
                    var defer = $q.defer();
                    $timeout(function(){
                        defer.resolve();
                        amp_main.loading_hide();
                    }, 300);
                    return defer.promise;
                }]*/
            }
        }, //state
        {
            name: 'rpgindex',
            url: '/rpgindex',
            views:{
                'toolbar': {
                    templateUrl: '../components/toolbar/rent_package_filter.html',
                    controller:"dataFilterController",
                    controllerAs:"fCtrl"
                },
                'content': {
                    templateUrl: '../views/datatools/datatool_rent_package.html',
                    controller:"dataIndexController",
                    controllerAs:"dCtrl"
                },
                "right":{
                    templateUrl: '../views/datatools/datatool_rent_package_rpanel.html',
                    controller:"dataRightController",
                    controllerAs:"rCtrl"
                }
            },
            //controller:"page",
            resolve: {
                dataIndexData:function(dataIndexService){
                    return dataIndexService.getIndexData();
                },
               /* pageIndex:["$stateParams",function($stateParams){
                    //这里的逻辑是把数据做在 list-> ui-view( create )里的方法
                    return $stateParams.pageIndex;
                }],*/
               /* data: ['$q','$timeout', function($q,$timeout){
                    var defer = $q.defer();
                    $timeout(function(){
                        defer.resolve();
                        amp_main.loading_hide();
                    }, 300);
                    return defer.promise;
                }]*/
            }
        }, //state
        {
            name: 'irrplan',
            url: '/irrplan',
            views:{
                'toolbar': {
                    templateUrl: '../components/toolbar/blank_filter.html'
                },
                'content': {
                    templateUrl: '../views/datatools/datatool_irr_plan.html',
                    controller:"irrPlanController",
                    controllerAs:"pCtrl"
                },
                "right":{
                    templateUrl: '../views/blank_right.html'
                }
            },
            controller:"page",
            resolve: {
                irrPlanData: function(irrPlanService) {
                    return irrPlanService.getIrrData();
                },
              /*  data: ['$q','$timeout', function($q,$timeout){
                    var defer = $q.defer();
                    $timeout(function(){
                        defer.resolve();
                        amp_main.loading_hide();
                    }, 300);
                    return defer.promise;
                }]*/
            }
        }, //state
        {
            name: 'datasim',
            url: '/datasim',
            views:{
                'toolbar': {
                    templateUrl: '../components/toolbar/blank_filter.html'
                },
                'content': {
                    templateUrl: '../views/datatools/datatool_sim.html',
                    controller:"dataSimController",
                    controllerAs:"sCtrl"
                },
                "right":{
                    templateUrl: '../views/blank_right.html'
                }
            },
            controller:"page",
            resolve: {
                simData:function(dataIndexService){
                    return dataIndexService.getIndexData();
                },
                simChartData:function(dataSimChart){
                  return dataSimChart.getSimChartData();
                },
               /* data: ['$q','$timeout', function($q,$timeout){
                    var defer = $q.defer();
                    $timeout(function(){
                        defer.resolve();
                        amp_main.loading_hide();
                    }, 300);
                    return defer.promise;
                }]*/
            }
        }, //state
        {
            name: 'managefee',
            url: '/managefee',
            views:{
                'toolbar': {
                    templateUrl: '../components/toolbar/blank_filter.html'
                },
                'content': {
                    templateUrl: '../views/datatools/datatool_manage_fee.html',
                    controller:'dataFeeController',
                    controllerAs:"fCtrl"
                },
                "right":{
                    templateUrl: '../views/blank_right.html'
                }
            },
            controller:"page",
            resolve: {
                manageFeeData: function(manageFeeService) {
                    return manageFeeService.getSetData();
                },
               /* data: ['$q','$timeout', function($q,$timeout){
                    var defer = $q.defer();
                    $timeout(function(){
                        defer.resolve();
                        amp_main.loading_hide();
                    }, 300);
                    return defer.promise;
                }]*/
            }
        }, //state
        {
            name: 'rpgset',
            url: '/rpgset',
            views:{
                'toolbar': {
                    templateUrl: '../components/toolbar/blank_filter.html'
                },
                'content': {
                    templateUrl: '../views/datatools/datatool_rpg_set_index.html',
                    controller:'dataSetController',
                    controllerAs:"sCtrl"
                },
                "right":{
                    templateUrl: '../views/blank_right.html'
                }
            },
            controller:"page",
            resolve: {
                rpgSetData: function(dataSetService) {
                    return dataSetService.getSetData();
                },
                rpgresultData: function(dataSetResultService) {
                    return dataSetResultService.getSetData();
                },
               /* data: ['$q','$timeout', function($q,$timeout){
                    var defer = $q.defer();
                    $timeout(function(){
                        defer.resolve();
                        amp_main.loading_hide();
                    }, 300);
                    return defer.promise;
                }]*/
            }
        } //state
    ];



    // 投资分析
    $stateProvider.state("simulation_calculation_main", {
        url: "/simulation_calculation_main",
        views: {
            "toolbar": {
            },
            "content": {
                controller:"simulation-calculation-main-controller",
                templateUrl: "../investment_analysis/simulation_calculation_main.html"
            },
            "right": {
            }
        },
        controller:"page",
        resolve: {
            data: ['$q','$timeout', function($q,$timeout){
                var defer = $q.defer();
                $timeout(function(){
                    defer.resolve();
                    amp_main.loading_hide();
                }, 300);
                return defer.promise;
            }]
        }
    });

    // 管理分析-收入分析-合同
    $stateProvider.state("contract_main", {
        url: "/contract_main",
        views: {
            "toolbar": {
                controller:"contract-main-left-controller",
                templateUrl: "../mgt_analysis/contract_main_left.html"
            },
            "content": {
                controller:"contract-main-controller",
                templateUrl: "../mgt_analysis/contract_main.html"
            },
            "enrolment": {
                controller:"contract-main-right-controller",
                templateUrl: "../mgt_analysis/contract_main_right.html"

            }
        },
        controller:"page",
        resolve: {
         /*   data: ['$q','$timeout', function($q,$timeout){
                var defer = $q.defer();
                $timeout(function(){
                    defer.resolve();
                    amp_main.loading_hide();
                }, 300);
                return defer.promise;
            }]*/
        }
    });

    //管理分析-收入分析-营收
    $stateProvider.state("business_main", {
        url: "/business_main",
        views: {
            "toolbar": {
                controller:"business-main-left-controller",
                templateUrl: "../mgt_analysis/business_main_left.html"
            },
            "content": {
                controller:"business-main-controller",
                templateUrl: "../mgt_analysis/business_main.html"
            },
            "enrolment": {
            }
        },
        controller:"page",
        resolve: {
        /*    data: ['$q','$timeout', function($q,$timeout){
                var defer = $q.defer();
                $timeout(function(){
                    defer.resolve();
                    amp_main.loading_hide();
                }, 300);
                return defer.promise;
            }]*/
        }
    });

    //管理分析-收入分析-营收-列表 business_merchant_list.html
    $stateProvider.state("business_merchant_list", {
        url: "/business_merchant_list",
        views: {
            "toolbar": {
                controller:"business-merchant-list-left-controller",
                templateUrl: "../mgt_analysis/business_merchant_list_left.html"
            },
            "content": {
                controller:"business-merchant-list-controller",
                templateUrl: "../mgt_analysis/business_merchant_list.html"
            },
            "enrolment": {

            }
        },
        controller:"page",
        resolve: {
           /* data: ['$q','$timeout', function($q,$timeout){
                var defer = $q.defer();
                $timeout(function(){
                    defer.resolve();
                    amp_main.loading_hide();
                }, 300);
                return defer.promise;
            }]*/
        }
    });

    //管理分析-收入分析-营收-列表 business_merchant_list.html
    $stateProvider.state("business_merchant_detail", {
        url: "/business_merchant_detail",
        views: {
            "toolbar": {
                controller:"business-merchant-detail-left-controller",
                templateUrl: "../mgt_analysis/business_merchant_detail_left.html"
            },
            "content": {
                controller:"business-merchant-detail-controller",
                templateUrl: "../mgt_analysis/business_merchant_detail.html"
            },
            "enrolment": {
                controller:"business-merchant-detail-enrolment-controller",
                templateUrl: "../mgt_analysis/business_merchant_detail_enrolment.html"
            }
        },
        controller:"page",
        resolve: {
          /*  data: ['$q','$timeout', function($q,$timeout){
                var defer = $q.defer();
                $timeout(function(){
                    defer.resolve();
                    amp_main.loading_hide();
                }, 300);
                return defer.promise;
            }]*/
        }
    });

    // 管理分析-运营分析-客流 passenger_flow_main.html
    $stateProvider.state("passenger_flow_main", {
        url: "/passenger_flow_main",
        views: {
            "toolbar": {
                controller:"passenger-flow-main-left-controller",
                templateUrl: "../mgt_analysis/passenger_flow_main_left.html"
            },
            "content": {
                controller:"passenger-flow-main-controller",
                templateUrl: "../mgt_analysis/passenger_flow_main.html"
            },
            "enrolment": {

            }
        },
        controller:"page",
        resolve: {
            /*data: ['$q','$timeout', function($q,$timeout){
                var defer = $q.defer();
                $timeout(function(){
                    defer.resolve();
                    amp_main.loading_hide();
                }, 300);
                return defer.promise;
            }]*/
        }
    });

    $stateProvider.state("passenger_flow_main_enrolment", {
        url: "/passenger_flow_main_enrolment",
        views: {
            "toolbar": {
                controller:"passenger-flow-main-enrolment-left-controller",
                templateUrl:"../mgt_analysis/passenger_flow_main_enrolment_left.html"
            },
            "content": {
                controller:"passenger-flow-main-enrolment-controller",
                templateUrl: "../mgt_analysis/passenger_flow_main_enrolment.html"
            },
            "enrolment": {

            }
        },
        controller:"page",
        resolve: {
          /*  data: ['$q','$timeout', function($q,$timeout){
                var defer = $q.defer();
                $timeout(function(){
                    defer.resolve();
                    amp_main.loading_hide();
                }, 300);
                return defer.promise;
            }]*/
        }
    });



    //管理分析-支出分析-成本  cost_main.html (缺少工具栏)
    $stateProvider.state("cost_main", {
        url: "/cost_main",
        views: {
            "toolbar": {
                controller:"cost-main-left-controller",
                templateUrl: "../mgt_analysis/cost_main_left.html"
            },
            "content": {
                controller:"cost-main-controller",
                templateUrl: "../mgt_analysis/cost_main.html"
            },
            "enrolment": {
                controller:"cost-enrolment-controller",
                templateUrl: "../mgt_analysis/cost_enrolment.html"
            }
        },
        controller:"page",
        resolve: {
          /*  data: ['$q','$timeout', function($q,$timeout){
                var defer = $q.defer();
                $timeout(function(){
                    defer.resolve();
                    amp_main.loading_hide();
                }, 300);
                return defer.promise;
            }]*/
        }
    });

    //管理分析-支出分析-成本-人工  cost_manual_work.html
    $stateProvider.state("cost_manual_work", {
        url: "/cost_manual_work",
        views: {
            "toolbar": {
                controller:"cost-manual-work-left-controller",
                templateUrl: "../mgt_analysis/cost_manual_work_left.html"
            },
            "content": {
                controller:"cost-manual-work-controller",
                templateUrl: "../mgt_analysis/cost_manual_work.html"
            },
            "enrolment": {
                controller:"cost-manual-work-enrolment-controller",
                templateUrl: "../mgt_analysis/cost_manual_work_enrolment.html"
            }
        },
        controller:"page",
        resolve: {
            /*data: ['$q','$timeout', function($q,$timeout){
                var defer = $q.defer();
                $timeout(function(){
                    defer.resolve();
                    amp_main.loading_hide();
                }, 300);
                return defer.promise;
            }]*/
        }
    });

    //管理分析-租赁分析-商户销量 merchant_sale_main.html
    $stateProvider.state("merchant_sale_main", {
        url: "/merchant_sale_main",
        views: {
            "toolbar": {
                controller:"merchant-sale-main-left-controller",
                templateUrl: "../mgt_analysis/merchant_sale_main_left.html"
            },
            "content": {
                controller:"merchant-sale-main-controller",
                templateUrl: "../mgt_analysis/merchant_sale_main.html"
            },
            "enrolment": {
            }
        },
        controller:"page",
        resolve: {
           /* data: ['$q','$timeout', function($q,$timeout){
                var defer = $q.defer();
                $timeout(function(){
                    defer.resolve();
                    amp_main.loading_hide();
                }, 300);
                return defer.promise;
            }]*/
        }
    });
    //管理分析-租赁分析-欠费
    $stateProvider.state("arrears_main", {
        url: "/arrears_main",
        views: {
            "toolbar": {
                controller:"arrears-main-left-controller",
                templateUrl: "../mgt_analysis/arrears_main_left.html"
            },
            "content": {
                controller:"arrears-main-controller",
                templateUrl: "../mgt_analysis/arrears_main.html"
            },
            "enrolment": {
            }
        },
        controller:"page",
        resolve: {
            /*data: ['$q','$timeout', function($q,$timeout){
                var defer = $q.defer();
                $timeout(function(){
                    defer.resolve();
                    amp_main.loading_hide();
                }, 300);
                return defer.promise;
            }]*/
        }
    });
    //管理分析-租赁分析-欠费明细
    $stateProvider.state("arrears_detail", {
        url: "/arrears_detail",
        views: {
            "toolbar": {
                controller:"arrears-detail-left-controller",
                templateUrl: "../mgt_analysis/arrears_detail_left.html"
            },
            "content": {
                controller:"arrears-detail-controller",
                templateUrl: "../mgt_analysis/arrears_detail.html"
            },
            "enrolment": {
                controller:"arrears-enrolment-controller",
                templateUrl: "../mgt_analysis/arrears_enrolment.html"
            }
        },
        controller:"page",
        resolve: {
           /* data: ['$q','$timeout', function($q,$timeout){
                var defer = $q.defer();
                $timeout(function(){
                    defer.resolve();
                    amp_main.loading_hide();
                }, 300);
                return defer.promise;
            }]*/
        }
    });
    //管理分析-租赁分析-欠费明细-录入
    $stateProvider.state("arrears_enrolment", {
        url: "/arrears_enrolment",
        views: {
            "toolbar": {
                templateUrl: "../mgt_analysis/arrears_enrolment_left.html"
            },
            "content": {
                templateUrl: "../mgt_analysis/arrears_enrolment.html"
            },
            "enrolment": {
            }
        },
        controller:"page",
        resolve: {
          /*  data: ['$q','$timeout', function($q,$timeout){
                var defer = $q.defer();
                $timeout(function(){
                    defer.resolve();
                    amp_main.loading_hide();
                }, 300);
                return defer.promise;
            }]*/
        }
    });
    // 管理分析-租赁分析-商户销量-业态详情	shop_sale_type_list.html
    $stateProvider.state("shop_sale_type_list", {
        url: "/shop_sale_type_list",
        views: {
            "toolbar": {
                controller:"shop-sale-type-list-left-controller",
                templateUrl: "../mgt_analysis/shop_sale_type_list_left.html"
            },
            "content": {
                controller:"shop-sale-type-list-controller",
                templateUrl: "../mgt_analysis/shop_sale_type_list.html"
            },
            "enrolment": {
                controller:"shop-sale-type-enrolment-controller",
                templateUrl: "../mgt_analysis/shop_sale_type_enrolment.html"
            }
        },
        controller:"page",
        resolve: {
           /* data: ['$q','$timeout', function($q,$timeout){
                var defer = $q.defer();
                $timeout(function(){
                    defer.resolve();
                    amp_main.loading_hide();
                }, 300);
                return defer.promise;
            }]*/
        }
    });

    //管理分析-租赁分析-租赁 rent_main.html
    $stateProvider.state("rent_main", {
        url: "/rent_main",
        views: {
            "toolbar": {
                controller:"rent-main-left-controller",
                templateUrl: "../mgt_analysis/rent_main_left.html"
            },
            "content": {
                controller:"rent-main-controller",
                templateUrl: "../mgt_analysis/rent_main.html"
            },
            "enrolment": {
            }
        },
        controller:"page",
        resolve: {
            /*data: ['$q','$timeout', function($q,$timeout){
                var defer = $q.defer();
                $timeout(function(){
                    defer.resolve();
                    amp_main.loading_hide();
                }, 300);
                return defer.promise;
            }]*/
        }
    });

    //管理分析-租赁分析-欠费明细-商铺欠费明细 arrears_merchant_detail.html (缺少工具栏)
    $stateProvider.state("arrears_merchant_detail", {
        url: "/arrears_merchant_detail",
        views: {
            "toolbar": {
                controller:"arrears-merchant-detail-left-controller",
                templateUrl: "../mgt_analysis/arrears_merchant_detail_left.html"
            },
            "content": {
                controller:"arrears-merchant-detail-controller",
                templateUrl: "../mgt_analysis/arrears_merchant_detail.html"
            },
            "enrolment": {
                controller:"arrears-merchant-detail-receiving-controller",
                templateUrl:"../mgt_analysis/arrears_merchant_detail_receiving.html"
            }
        },
        controller:"page",
        resolve: {
           /* data: ['$q','$timeout', function($q,$timeout){
                var defer = $q.defer();
                $timeout(function(){
                    defer.resolve();
                    amp_main.loading_hide();
                }, 300);
                return defer.promise;
            }]*/
        }
    });

    // 管理分析-租赁分析-商户销量-排名 shop_sale_rank.html
    $stateProvider.state("shop_sale_rank", {
        url: "/shop_sale_rank",
        views: {
            "toolbar": {
            },
            "content": {
                controller:"shop-sale-rank-controller",
                templateUrl: "../mgt_analysis/shop_sale_rank.html"
            },
            "enrolment": {
            }
        },
        controller:"page",
        resolve: {
           /* data: ['$q','$timeout', function($q,$timeout){
                var defer = $q.defer();
                $timeout(function(){
                    defer.resolve();
                    amp_main.loading_hide();
                }, 300);
                return defer.promise;
            }]*/
        }
    });

    $stateProvider.state("blank", {
        url: "/blank",
        views: {
            "toolbar": {
            },
            "content": {
                templateUrl: "../views/blank_page.html"
            },
            "enrolment": {
            }
        },
        controller:"page",
        resolve: {
           /* data: ['$q','$timeout', function($q,$timeout){
                var defer = $q.defer();
                $timeout(function(){
                    defer.resolve();
                    amp_main.loading_hide();
                }, 300);
                return defer.promise;
            }]*/
        }
    });

    // Loop over the state definitions and register them
    states.forEach(function(state) {
        $stateProvider.state(state);
    });
    $urlRouterProvider.when('', '/noi');
    //$urlRouterProvider.when('/rpgindex', '/rpgindex/1');
    $urlRouterProvider.otherwise(
        function($injector, $location) {
            $location.path('/noi');
        });

}]);


ampApp.controller('MainController', ["$rootScope","$scope","$location","$timeout",function($rootScope, $scope,$location,$timeout) {
    var curProject=window.location.search.slice(1).split("=")[1] ||0;
    console.log(curProject);
    $rootScope.curProject=curProject;

    //$rootScope.projectName="商业公司A";

    $rootScope.homePageIsShown = true;
    $scope.state = {};
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {

        var prev = $rootScope.prev ? $rootScope.prev : '';
        $scope.state.back = (toState.name === prev);
        $scope.state.toHome = (toState.name === 'noi');
        $scope.state.loading=false;
        $scope.state.enter=false;
        $scope.state.exit=true;
        //ampApp.collector.destory();
       // $scope.$apply();
    });
    $rootScope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams){
            $rootScope.curState=toState.name;
            $rootScope.prev=fromState.name;
            $scope.state.enter=true;
            $scope.state.exit=false;
            $scope.state.loading=false;
            ////console.log("prev:"+fromState.name);
            //left panel update
            amp_main.leftPanel_update();
            ampApp.setNav(toState.name);

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


    $scope.$on("data_filter",function(e,data){
        $scope.$broadcast("datatool_filter",data);
    });
    $scope.$on("right_open",function(e,data){
        $scope.rightOpened=data["right_open"];
        //这里演示框架写好后，重构下侧边栏的显示逻辑
        if($scope.rightOpened==true){
            amp_main.rightPanel_open();
        }else{
            amp_main.rightPanel_close();
        }

    });
    //monthupdate emit;
    $scope.$on("monthUpdate",function(e,data){
        /*console.log("-----------------------data");
        console.dir(data);*/
        $scope.$broadcast("noiMonthUpdate",data);
    });

    $scope.rightOpened=false;

    /*$scope.$on("shopEdit",function(e,data){
        //console.log(e);
        //console.log(data);
    });*/
    $scope.goPath = function(href){
        //console.log("go path");
        if(href){
            var target=href.split("#/")[1];
        }
        $scope.$apply(function(){
            $location.path(target);
        });
    };
    $(".ys-amp").on("relocate",function(e,id,href){
        //alert("href:"+href);
      /*  //console.log("on relocate")
        //console.log(e)
        //console.log(id);
        //console.log(href);
        //console.log($location);*/
        $scope.goPath(href);

    });

    amp_main.init();

   /* $timeout(function(){
        $location.path("noi")
    },3000)*/

}]);


ampApp.nav_list={

    "noi":{
        sideNav:"#main-0",
        headerBar:"#header-tabs-0",
        headerItem:"#nav-tabs-item-0-0"
    },
    "rpgindex":{
        sideNav:"#main-4",
        headerBar:"#header-tabs-4",
        headerItem:"#nav-tabs-item-4-0"
    },
    "rpgset":{
        sideNav:"#main-4",
        headerBar:"#header-tabs-4",
        headerItem:"#nav-tabs-item-4-0"
    },
    "managefee":{
        sideNav:"#main-4",
        headerBar:"#header-tabs-4",
        headerItem:"#nav-tabs-item-4-0"
    },
    "datasim":{
        sideNav:"#main-4",
        headerBar:"#header-tabs-4",
        headerItem:"#nav-tabs-item-4-1"
    },

    "irrplan":{
        sideNav:"#main-4",
        headerBar:"#header-tabs-4",
        headerItem:"#nav-tabs-item-4-2"
    },
    "business_merchant_list":{
        sideNav:"#main-2",
        headerBar:"#header-tabs-2",
        headerItem:"#nav-tabs-item-2-0"
    },
    "floor_mgt":{
        sideNav:"#main-4",
        headerBar:"#header-tabs-4",
        headerItem:"#nav-tabs-item-4-0"
    },

};

//手动设置当前菜单的激活状态 navhash为当前route的state值 配置于ampApp.nav_list
ampApp.setNav=function(navhash){
    var navSets=ampApp.nav_list[navhash];
    if(typeof navSets!=="undefined"){
        $(".leftpanelinner ul.nav-bracket").find("li").removeClass("active");
        $(navSets.sideNav).closest("li").addClass("active");

        $(".head-main-menu").children(".nav-tabs").removeClass("active");
        $(navSets.headerBar).addClass("active").find("li").removeClass("active").end().find(navSets.headerItem).addClass("active");
    }
};

/*<div tap="message=tapped"></div>*/
/*ampApp.directive("tap",function(){
    return function($scope,$elem,attrs){
        $elem.on("touchstart touchend",function(){
            $scope.$apply(attrs["tap"]);
        });
    }
});*/

//swiper 和 datetimepicker的回收器
ampApp.collector=(function($,ac){
    var collector=ac;
    collector.array_swipers=[];
    collector.array_datepickers=[];

    collector.add_swiper=function(s){
        collector.array_swipers.push(s);
    };
    collector.add_datepicker=function(d){
        collector.array_datepickers.push(d);
    };

    collector.destory=function(){
        $.each(collector.array_swipers,function(i,e){
            e.destroy(true,true);
        });
        collector.array_swipers=[];
        $.each(collector.array_datepickers,function(i,e){
            $(e.selector).datetimepicker("remove");
        });
        collector.array_datepickers=[];

    };

    return collector;
})(jQuery,ampApp.collector||{});

