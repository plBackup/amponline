ampApp.controller("business-merchant-detail-controller",["$scope","getPaginationResultFactory","$filter","$http","$rootScope",function($scope,getPaginationResultFactory,$filter,$http,$rootScope){
    var selectedType = globalStorage.getSessionData("select_commercial_type");
    var merchantName = globalStorage.getSessionData("selected_merchant_name");

    $scope.records = [];
    $scope.merchantName = merchantName;
    $scope.commercialType = null;
    $scope.merchantSummary = {
        contractStartTime: null,
        rentPeriod: null,
        rentType: null
    };

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
        $scope.records = $filter("filter")(data.initData,{merchantName:merchantName});
        $scope.merchantName = merchantName;
        $scope.commercialType = data.allType[selectedType];
        var arr = $filter("filter")(data.merchantSummaryList,{merchantName:merchantName});
        if(arr.length>0){
            $scope.merchantSummary = arr[0];
        }
        var currentPageNo = 1;
        var pageSize = 10;
        $scope.paginationInfo = getPaginationResultFactory(currentPageNo,pageSize,$scope.records);
    }

    /* ======================================== 监听广播事件 ======================================== */

    $scope.$on("$destroy",function(){destroy();});

    $scope.$on("business-merchant-detail-enrolment.save-record",function(event,params){
        $scope.records.unshift(params);
        $scope.paginationInfo = getPaginationResultFactory($scope.paginationInfo.pageNo,$scope.paginationInfo.pageSize,$scope.records);
        $scope.$apply();
    });

    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    var pin = null;
    function initPageView(){
        container = $("#business-merchant-detail");

        var width = $(container).find(".dept-table-head").outerWidth();
        $(container).find(".dept-table-head").css("width",width+"px");

        pin = $(container).find(".dept-table-head").pin({
            containerSelector: $(container).find(".ys-table-block"),
            padding: {top: 44, bottom: 0}
        });

        setTimeout(function(){
            pin.refresh();
        },500);

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
        var url = "../static/js/mgt_analysis/data/"+projectId+"/business_merchant_detail_data.json";
        $http.get(url).success(function(result){
            initializeData(result);
            initPageView();
            bindPageEvents();
        });
    }
    init();
}]);



