ampApp.controller("arrears-merchant-detail-controller",["$scope","getPaginationResultFactory","$filter","$rootScope","$http",function($scope,getPaginationResultFactory,$filter,$rootScope,$http){



    var merchantName = globalStorage.getSessionData("arrears_merchant_name");
    var arrearsTotalAmount =globalStorage.getSessionData("arrears_merchant_amount");
    var deposit = globalStorage.getSessionData("arrears_merchant_deposit");

    var queryParams = {merchantName:merchantName};

    $scope.records=[];
    $scope.filteredRecords=[];
    $scope.merchantName = merchantName;
    $scope.arrearsTotalAmount = arrearsTotalAmount;
    $scope.deposit = deposit;
    $scope.arrearsCount = null;


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
        $scope.records=data;
        $scope.filteredRecords = $filter("filter")($scope.records,queryParams);
        $scope.arrearsCount = $scope.filteredRecords.length;
        var currentPageNo = 1;
        var pageSize = 10;
        $scope.paginationInfo = getPaginationResultFactory(currentPageNo,pageSize,$scope.filteredRecords);
    }

    /* ======================================== 监听广播事件 ======================================== */

    $scope.$on("$destroy",function(){destroy();});

    $scope.$on("arrears-merchant-detail.query",function(event,params){
        queryParams = params;
        queryParams.merchantName = merchantName;

        $scope.filteredRecords = $filter("filter")($scope.records,queryParams);
        $scope.paginationInfo = getPaginationResultFactory($scope.paginationInfo.pageNo,$scope.paginationInfo.pageSize,$scope.filteredRecords);
        $scope.$apply();
    });

    $scope.$on("arrears-merchant-detail.received",function(event,params){
        var arrearsTypes = [];
        container.find(".amp-checkbox.checked").each(function(){
            var arrearsType = $(this).next().html();
            arrearsTypes.push(arrearsType);
        });

        $scope.records = $scope.records.filter(function(item){
            for(var i=0;i<arrearsTypes.length;i++){
                if(item.arrearsType==arrearsTypes[i]){
                    return false;
                }
            }
            return true;
        });


        $scope.filteredRecords = $filter("filter")($scope.records,queryParams);
        $scope.paginationInfo = getPaginationResultFactory($scope.paginationInfo.pageNo,$scope.paginationInfo.pageSize,$scope.filteredRecords);
        $scope.$apply();
    });


    /* ======================================== 初始化页面 ======================================== */
    var container = null;

    function initPageView(){
        container = $("#arrears-merchant-detail");

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
        container.on("click",".amp-checkbox",function(e){
            e.stopPropagation();
            e.preventDefault();
            $(this).toggleClass("checked");

            var selectedRecords = [];
            container.find(".amp-checkbox.checked").each(function(){
                var arrearsType = $(this).next().html();
                var arrearsAmount = parseFloat($(this).parent().next().attr("data-value"));
                selectedRecords.push({arrearsType:arrearsType,arrearsAmount:arrearsAmount});
            });
            $rootScope.$broadcast("arrears-merchant-detail.select",selectedRecords);
        });
    }

    /* ======================================== common methods ======================================== */
    function destroy(){
    }
    // 初始化
    function init(){
        var projectId = $rootScope.curProject;
        var url = "../static/js/mgt_analysis/data/"+projectId+"/arrears_merchant_detail_data.json";
        $http.get(url).success(function(result){
            initializeData(result);
            initPageView();
            bindPageEvents();
        });
    }
    init();

}]);



