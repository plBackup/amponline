ampApp.controller("floor-mgt-controller",["$scope","$filter","$http","$rootScope","getPaginationResultFactory",function($scope,$filter,$http,$rootScope,getPaginationResultFactory){
    $scope.records = [
        {floorNo:"5F",floorName:"5层"},
        {floorNo:"4F",floorName:"4层"},
        {floorNo:"3F",floorName:"3层"},
        {floorNo:"2F",floorName:"2层"},
        {floorNo:"1F",floorName:"1层"}
    ];

    /* ======================================== 监听广播事件 ======================================== */
    $scope.$on("$destroy",function(){destroy();});

    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    function initPageView(){
        container = $("#contract-main");
    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){

    }

    /* ======================================== common methods ======================================== */
    function destroy(){
    }

    function init(){
        initPageView();
        bindPageEvents();
    }
    init();
}]);



