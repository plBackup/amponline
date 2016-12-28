ampApp.controller("shop-sale-type-list-controller",["$scope","getPaginationResultFactory","$http","$rootScope",function($scope,getPaginationResultFactory,$http,$rootScope){
    var  commercialType = globalStorage.getSessionData("select_commercial_type_for_sale");

    $scope.commercialTypeSummary = {};
    $scope.commercialType =null;

    $scope.records = [];

    $scope.paginationInfo = {
        pageNo:null,
        pageCount:null,
        recordCount:null,
        pageSize:null,
        records:[]
    };

    $scope.fetchData = function(){
        $scope.paginationInfo = getPaginationResultFactory($scope.paginationInfo.pageNo,$scope.paginationInfo.pageSize,$scope.records);
        $scope.$apply();
    };

    function initializeData(data){
        $scope.records=data.allData[commercialType];
        $scope.commercialTypeSummary = data.allCommercialTypeSummary[commercialType];
        $scope.commercialType = data.allType[commercialType];

        var currentPageNo = 1;
        var pageSize = 10;
        console.log(commercialType);
        console.log(data.allData);
        $scope.paginationInfo = getPaginationResultFactory(currentPageNo,pageSize,$scope.records);
    }





    /* ======================================== 监听广播事件 ======================================== */

    $scope.$on("$destroy",function(){destroy();});

    $scope.$on("shop-sale-type.save-record",function(event,params){
        $scope.records.unshift(params);
        $scope.paginationInfo = getPaginationResultFactory($scope.paginationInfo.pageNo,$scope.paginationInfo.pageSize,$scope.records);
        $scope.$apply();
    });


    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    function initPageView(){
        container = $("#shop-sale-type-list");
    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){

    }

    /* ======================================== common methods ======================================== */
    function destroy(){
    }

    // 初始化
    function init(){
        var projectId = $rootScope.curProject;
        var url = "../static/js/mgt_analysis/data/"+projectId+"/shop_sale_type_list_data.json";
        $http.get(url).success(function(result){
            initializeData(result);
            initPageView();
            bindPageEvents();
        });
    }
    init();
}]);



