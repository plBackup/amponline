ampApp.controller("business-merchant-list-left-controller",["$scope","$rootScope",function($scope,$rootScope){

    $scope.$on("$destroy",function(){destroy();});



    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    function initPageView(){
        container = $("#business-merchant-list-left");

        amp_main.leftPanel_update();
    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){
        container.on("click touchend","a.reset-btn",function(e){
            e.stopPropagation();
            e.preventDefault();
            container.find("input").val("");
        });

        container.on("click touchend","a.search-btn",function(e){
            e.stopPropagation();
            e.preventDefault();
            var brandName = $(container).find("[data-name=brandName]").val();
            var storeNo = $(container).find("[data-name=storeNo]").val();
            $rootScope.$broadcast("business-merchant-list.search",{brandName:brandName,storeNo:storeNo});
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
