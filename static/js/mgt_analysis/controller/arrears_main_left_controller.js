ampApp.controller("arrears-main-left-controller",["$scope","$rootScope",function($scope,$rootScope){

    $scope.$on("$destroy",function(){destroy();});


    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    function initPageView(){
        container = $("#arrears-main-left");

        amp_main.leftPanel_update();

        reset();

        $(container).find(".amp-date-selector input").datetimepicker({
            language: "zh-CN",
            format:"yyyy-mm",
            todayBtn:"linked",
            startView:3,
            minView:3,
            weekStart: 1,
            todayHighlight: 1,
            autoclose: 1,
            forceParse: 0
        });
    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){
        container.on("click touchend","a.arrears-detail-btn",function(e){
            e.stopPropagation();
            e.preventDefault();
            window.location = "#/arrears_detail";
        });

        $(container).on("click touchend",".amp-date-selector .amp-date-selector-prev",function(e){
            e.stopPropagation();
            e.preventDefault();
            var dataMonth = $(this).closest(".amp-date-selector").find("input").val();
            var year = parseInt(dataMonth.split("-")[0]);
            var month = parseInt(dataMonth.split("-")[1]);
            month--;
            var newDate = new Date();
            newDate.setFullYear(year);
            newDate.setMonth(month-1);

            var monthText = "";
            if(newDate.getMonth()+1<10){
                monthText = "0"+(newDate.getMonth()+1);
            }else{
                monthText = (newDate.getMonth()+1);
            }

            $(this).closest(".amp-date-selector").find("input").val(newDate.getFullYear()+"-"+monthText);
            $(this).closest(".amp-date-selector").find("input").datetimepicker("update");
        });

        $(container).on("click touchend",".amp-date-selector .amp-date-selector-next",function(e){
            e.stopPropagation();
            e.preventDefault();
            var dataMonth = $(this).closest(".amp-date-selector").find("input").val();
            var year = parseInt(dataMonth.split("-")[0]);
            var month = parseInt(dataMonth.split("-")[1]);
            month++;
            var newDate = new Date();
            newDate.setFullYear(year);
            newDate.setMonth(month-1);

            var monthText = "";
            if(newDate.getMonth()+1<10){
                monthText = "0"+(newDate.getMonth()+1);
            }else{
                monthText = (newDate.getMonth()+1);
            }

            $(this).closest(".amp-date-selector").find("input").val(newDate.getFullYear()+"-"+monthText);
            $(this).closest(".amp-date-selector").find("input").datetimepicker("update");
        });

        $(container).on("click touchend","a.reset-btn",function(e){
            e.stopPropagation();
            e.preventDefault();
            reset();
            $(container).find(".amp-date-selector").find("input").datetimepicker("update");
        });
    }

    /* ======================================== common methods ======================================== */
    function destroy(){
        $(container).find(".amp-date-selector input").datetimepicker("remove");
    }

    function reset(){
        $(container).find(".amp-select input").val("全部");
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        if(month<10){
            month="0"+month;
        }
        $(container).find(".amp-date-selector input").val(year+"-"+month);

        container.find(".amp-select li").removeClass("active");
    }

    // 初始化
    function init(){
        initPageView();
        bindPageEvents();
    }
    init();

}]);
