ampApp.controller("shop-sale-rank-controller",["$scope","$http","$rootScope",function($scope,$http,$rootScope){
    var commercialDataAll = {};
    var commercialDataCatering = {};
    var commercialDataChildren = {};
    var commercialDataClothing = {};
    var commercialDataMating = {};




    function initializeData(data){
        commercialDataAll = data.commercialDataAll;
        commercialDataCatering = data.commercialDataCatering;
        commercialDataChildren = data.commercialDataChildren;
        commercialDataClothing = data.commercialDataClothing;
        commercialDataMating = data.commercialDataMating;
        $scope.records =commercialDataAll;
    }

    /* ======================================== 监听广播事件 ======================================== */

    $scope.$on("$destroy",function(){destroy();});



    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    function initPageView(){
        container = $("#shop-sale-rank");
    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){

        container.on("click",".commercial-item a[data-href]",function(e){
            e.stopPropagation();
            e.preventDefault();
            var href = $(this).attr("data-href");

            var preData = $scope.records;

            if(href=="all"){
                $scope.records = commercialDataAll;
            }else if(href=="catering"){
                $scope.records = commercialDataCatering;
            }else if(href=="children"){
                $scope.records = commercialDataChildren;
            }else if(href=="clothing"){
                $scope.records = commercialDataClothing;
            }else if(href=="mating"){
                $scope.records = commercialDataMating;
            }

            if($scope.records==null){
                $scope.records = preData;
            }else{
                $(this).closest(".commercial-item-list").find("a").removeClass("active");
                $(this).addClass("active");
            }

            $scope.$apply();
        });

    }

    /* ======================================== common methods ======================================== */
    function destroy(){}
    // 初始化
    function init(){
        var projectId = $rootScope.curProject;
        var url = "../static/js/mgt_analysis/data/"+projectId+"/shop_sale_rank_data.json";
        $http.get(url).success(function(result){
            initializeData(result);
            initPageView();
            bindPageEvents();
        });
    }
    init();

}]);



