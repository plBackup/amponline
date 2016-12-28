ampApp.controller("floor-mgt-left-controller",["$scope","$rootScope",function($scope,$rootScope){

    $scope.$on("$destroy",function(){destroy();});



    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    function initPageView(){
        container = $("#floor-mgt-left");

    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){
        container.on("click touchend","a.enrolment-btn",function(e){
            e.stopPropagation();
            e.preventDefault();
            $rootScope.$broadcast("floor-mgt.enrolment");
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
