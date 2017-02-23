ampApp.controller("arrears-detail-controller",["$scope","getPaginationResultFactory","$http","$rootScope",function($scope,getPaginationResultFactory,$http,$rootScope){

    $scope.records = [];
    $scope.totalCount=null;

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
        $scope.records = data;

        var totalCount = 0;

        data.forEach(function(item){
            var arrearsTotalAmount = item.arrearsTotalAmount;
            if(!isNaN(arrearsTotalAmount)){
                totalCount+=parseFloat(arrearsTotalAmount);
            }
        });

        $scope.totalCount=totalCount;

        var currentPageNo = 1;
        var pageSize = 10;
        $scope.paginationInfo = getPaginationResultFactory(currentPageNo,pageSize,$scope.records);
    }


    /* ======================================== 监听广播事件 ======================================== */

    $scope.$on("$destroy",function(){destroy();});

    $scope.$on("arrears-detail.save-record",function(event,params){
        $scope.records.unshift(params);
        $scope.paginationInfo = getPaginationResultFactory($scope.paginationInfo.pageNo,$scope.paginationInfo.pageSize,$scope.records);
        $scope.$apply();
    });



    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    var pin = null;
    function initPageView(){
        container = $("#arrears-detail");

        var width = $(container).find(".amp-thead").outerWidth();
        $(container).find(".amp-thead").css("width",width+"px");

        pin = $(container).find(".amp-thead").pin({
            containerSelector: $(container).find(".amp-collapse-table"),
            padding: {top: 44, bottom: 50}
        });

        setTimeout(function(){
            pin.refresh();
        },500);
    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){
        container.on("click",".amp-table-row-content",function(e){
            e.stopPropagation();
            e.preventDefault();

            var merchantName = $(this).attr("data-merchant-name");
            var arrearsTotalAmount = $(this).attr("data-arrears-total-amount");
            var deposit = $(this).attr("data-deposit");


            globalStorage.setSessionData("arrears_merchant_name",merchantName);
            globalStorage.setSessionData("arrears_merchant_amount",arrearsTotalAmount);
            globalStorage.setSessionData("arrears_merchant_deposit",deposit);

            window.location = "#/arrears_merchant_detail";
        });
    }

    /* ======================================== common methods ======================================== */
    function destroy(){
    }
    
    // 初始化
    function init(){
        var projectId = $rootScope.curProject;
        var url = "../static/js/mgt_analysis/data/"+projectId+"/arrears_detail_data.json";
        $http.get(url).success(function(result){
            initializeData(result);
            initPageView();
            bindPageEvents();
        });
    }
    init();

}]);



