ampApp.controller("arrears-merchant-detail-left-controller",["$scope","$rootScope",function($scope,$rootScope){

    $scope.$on("$destroy",function(){destroy();});



    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    function initPageView(){
        container = $("#arrears-merchant-detail-left");

        amp_main.leftPanel_update();
    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){
        container.on("click touchend","a.receive-confirmation-btn",function(e){
            e.stopPropagation();
            e.preventDefault();
            $rootScope.$broadcast("arrears-merchant-detail.receive");
        });

        container.on("click touchend",".arrears-type-select ul li",function(e){
            e.preventDefault();
            var arrearsType = $(this).html();
            if(arrearsType=="全部"){
                arrearsType = "";
            }
            $rootScope.$broadcast("arrears-merchant-detail.query",{arrearsType:arrearsType})
        });
    }

    /* ======================================== common methods ======================================== */
    function destroy(){

    }


    // 初始化
    function init(){
        initPageView();
        bindPageEvents();
    }
    init();


}]);
