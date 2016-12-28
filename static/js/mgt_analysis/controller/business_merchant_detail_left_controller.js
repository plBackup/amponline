ampApp.controller("business-merchant-detail-left-controller",["$scope","$rootScope",function($scope,$rootScope){

    $scope.$on("$destroy",function(){destroy();});


    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    function initPageView(){
        container = $("#business-merchant-detail-left");

        amp_main.leftPanel_update();
    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){
        container.on("click touchend","a.enrolment-btn",function(e){
            e.stopPropagation();
            e.preventDefault();
            $rootScope.$broadcast("business-merchant-detail.enrolment");
        });
    }

    /* ======================================== common methods ======================================== */
    function destroy(){

    }

    function reset(){
        $(container).find("[data-name=business-type]").val("租金");
        $(container).find("[data-name=commercial-type]").val("全部");
        $(container).find("[data-name=income-type]").val("全部");
    }

    // 初始化
    function init(){
        initPageView();
        bindPageEvents();
    }
    init();



}]);
