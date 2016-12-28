ampApp.controller("investment-detail-controller",["$scope","getPaginationResultFactory","$http","$rootScope",function($scope,getPaginationResultFactory,$http,$rootScope){


    $scope.records = [
        {projectItemName:"当月签约面积",budget:2570,real:1256,rate:"20%"}
    ];


    /* ======================================== 监听广播事件 ======================================== */

    $scope.$on("$destroy",function(){destroy();});




    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    function initPageView(){
        container = $("#investment-detail");
    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){

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



