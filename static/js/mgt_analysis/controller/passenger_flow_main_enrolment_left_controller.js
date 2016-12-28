ampApp.controller("passenger-flow-main-enrolment-left-controller",["$scope","$rootScope",function($scope,$rootScope){

    $scope.$on("$destroy",function(){destroy();});

    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    function initPageView(){
        container = $("#passenger-flow-main-enrolment-left");

        amp_main.leftPanel_update();

        var year = new Date().getFullYear();
        $(container).find(".amp-date-selector input").val(year);

        $(container).find(".amp-date-selector input").datetimepicker({
            language: "zh-CN",
            format:"yyyy",
            todayBtn:"linked",
            startView:4,
            minView:4,
            weekStart: 1,
            todayHighlight: 1,
            autoclose: 1,
            forceParse: 0
        });



        $(container).on("click touchend",".amp-date-selector .amp-date-selector-prev",function(e){
            e.stopPropagation();
            e.preventDefault();
            var year = $(this).closest(".amp-date-selector").find("input").val();
            year = parseInt(year);
            year--;
            $(this).closest(".amp-date-selector").find("input").val(year);

            $(this).closest(".amp-date-selector").find("input").datetimepicker("update");
        });

        $(container).on("click touchend",".amp-date-selector .amp-date-selector-next",function(e){
            e.stopPropagation();
            e.preventDefault();
            var year = $(this).closest(".amp-date-selector").find("input").val();
            year = parseInt(year);
            year++;
            $(this).closest(".amp-date-selector").find("input").val(year);
            $(this).closest(".amp-date-selector").find("input").datetimepicker("update");
        });

    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){

    }

    /* ======================================== common methods ======================================== */
    function destroy(){
        $(container).find(".amp-datetimepicker input").datetimepicker("remove");
    }

    // 初始化
    function init(){
        initPageView();
        bindPageEvents();
    }
    init();

}]);
