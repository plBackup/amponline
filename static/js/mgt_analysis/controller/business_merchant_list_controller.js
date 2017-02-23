ampApp.controller("business-merchant-list-controller",["$scope","$filter","$http","$rootScope","getPaginationResultFactory",function($scope,$filter,$http,$rootScope,getPaginationResultFactory){
    $scope.commercialType = null;
    $scope.records = [];
    $scope.filteredRecords = [];

    var selectedType = globalStorage.getSessionData("select_commercial_type");
    var queryParams = {brandName:"",storeNo:""};

    $scope.paginationInfo = {
        pageNo:null,
        pageCount:null,
        recordCount:null,
        pageSize:null,
        records:[]
    };

    $scope.fetchData = function(){
        $scope.paginationInfo = getPaginationResultFactory($scope.paginationInfo.pageNo,$scope.paginationInfo.pageSize,$scope.filteredRecords);
        $scope.$apply();
    };

    function initializeData(data){
        $scope.commercialType = data.allType[selectedType];
        $scope.records = data.allData[selectedType];
        $scope.filteredRecords = $filter("filter")($scope.records,queryParams);

        var currentPageNo = 1;
        var pageSize = 10;
        $scope.paginationInfo = getPaginationResultFactory(currentPageNo,pageSize,$scope.filteredRecords);
    }

    /* ======================================== 监听广播事件 ======================================== */

    $scope.$on("$destroy",function(){destroy();});

    $scope.$on("business-merchant-list.search",function(event,params){
        queryParams = params;
        $scope.filteredRecords = $filter("filter")($scope.records,queryParams);
        $scope.paginationInfo = getPaginationResultFactory($scope.paginationInfo.pageNo,$scope.paginationInfo.pageSize,$scope.filteredRecords);
        $scope.$apply();
    });



    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    var pin = null;
    function initPageView(){
        container = $("#business-merchant-list");

        var width = $(container).find(".amp-thead").outerWidth();
        $(container).find(".amp-thead").css("width",width+"px");

        pin = $(container).find(".amp-thead").pin({
            containerSelector: $(container).find(".amp-collapse-table"),
            padding: {top: 44, bottom: 0}
        });

        setTimeout(function(){
            pin.refresh();
        },500);

    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){
        container.on("click", "ul.amp-table-row-content", function (e) {
            e.stopPropagation();
            e.preventDefault();

            var merchantName = $(this).find("li:first-child").html();
            globalStorage.setSessionData("selected_merchant_name",merchantName);

            window.location="#/business_merchant_detail";
        });
    }

    /* ======================================== common methods ======================================== */
    function destroy(){
    }

    // 初始化
    function init(){
        var projectId = $rootScope.curProject;
        var url = "../static/js/mgt_analysis/data/"+projectId+"/business_merchant_list_data.json";
        $http.get(url).success(function(result){
            initializeData(result);
            initPageView();
            bindPageEvents();
        });
    }
    init();
}]);



