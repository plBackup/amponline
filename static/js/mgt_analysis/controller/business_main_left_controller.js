ampApp.controller("business-main-left-controller",["$scope","$rootScope",function($scope,$rootScope){

    $scope.$on("$destroy",function(){destroy();});



    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    function initPageView(){
        container = $("#business-main-left");

        amp_main.leftPanel_update();
    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){
        container.on("click touchend","a.reset-btn",function(e){
            e.stopPropagation();
            e.preventDefault();
            reset();
        });

        container.on("click touchend","a.search-btn",function(e){
            e.stopPropagation();
            e.preventDefault();
            var businessType = $(container).find("[data-name=business-type]").val();
            $rootScope.$broadcast("business-main.query",{businessType:businessType})
        });
    }

    /* ======================================== common methods ======================================== */
    function destroy(){

    }

    function reset(){
        $(container).find("[data-name=business-type]").val("租金");
        $(container).find("[data-name=commercial-type]").val("全部");
        $(container).find("[data-name=income-type]").val("全部");
        container.find(".amp-select li").removeClass("active");
    }


    // 初始化
    function init(){
        initPageView();
        bindPageEvents();
    }
    init();


}]);
