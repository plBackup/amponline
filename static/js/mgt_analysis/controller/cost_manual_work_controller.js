ampApp.controller("cost-manual-work-controller",["$scope","$http","$rootScope",function($scope,$http,$rootScope){
    $scope.data = {};

    function initializeData(data){
        $scope.data = data;

    }

    /* ======================================== 监听广播事件 ======================================== */

    $scope.$on("$destroy",function(){destroy();});


    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    var pin = null;
    function initPageView(){
        container = $("#cost-manual-work");

        var width = $(container).find(".dept-table-head").outerWidth();
        $(container).find(".dept-table-head").css("width",width+"px");

        pin = $(container).find(".dept-table-head").pin({
            containerSelector: $(container).find(".cost-manual-work-pin-wrapper"),
            padding: {top: 44, bottom: 0}
        });

        setTimeout(function(){
            pin.refresh();
        },500);

    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){
        container.on("click", "a.collapse-btn", function (e) {
            e.stopPropagation();
            e.preventDefault();
            $(this).toggleClass("collapsed");
            $(this).closest("table").find(".sub-record").toggleClass("amp-display-hide");

            if(isPC()){
                pin.refresh();
            }


        });
    }

    /* ======================================== common methods ======================================== */
    function destroy(){
    }
    // 初始化
    function init(){
        var projectId = $rootScope.curProject;
        var url = "../static/js/mgt_analysis/data/"+projectId+"/cost_manual_work_data.json";
        $http.get(url).success(function(result){
            initializeData(result);
            initPageView();
            bindPageEvents();
        });
    }
    init();

}]);



