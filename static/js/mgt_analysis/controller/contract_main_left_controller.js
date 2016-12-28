ampApp.controller("contract-main-left-controller",["$scope","$rootScope",function($scope,$rootScope){

    $scope.$on("$destroy",function(){destroy();});



    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    function initPageView(){
        container = $("#contract-main-left");

        reset();

        amp_main.leftPanel_update();

        $(container).find(".amp-datetimepicker input").datetimepicker({
            language: "zh-CN",
            format:"yy-mm-dd",
            todayBtn:"linked",
            startView:2,
            minView:2,
            weekStart: 1,
            todayHighlight: 1,
            autoclose: 1,
            forceParse: 0
        });
    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){
        container.on("click touchend","a.enrolment-btn",function(e){
            e.stopPropagation();
            e.preventDefault();
            $rootScope.$broadcast("contract-main.enrolment");
            $scope.$apply();
            console.log("broadcast enrolment");
        });

        container.on("click touchend","a.reset-btn",function(e){
            e.stopPropagation();
            e.preventDefault();
            reset();
            $(container).find(".amp-datetimepicker input").datetimepicker("update");
        });

        container.on("click touchend","a.query-btn",function(e){
            e.stopPropagation();
            e.preventDefault();

            var formContainer = $(this).closest(".amp-form-group-container");
            var startDate = formContainer.find("[data-name=startDate]").val();
            startDate = "20"+startDate;
            startDate = new Date(startDate);

            var endDate = formContainer.find("[data-name=endDate]").val();
            if(endDate==""){
                endDate = null;
            }else{
                endDate = "20"+endDate;
                endDate = new Date(endDate);
            }

            var rentType = formContainer.find("[data-name=rentType]").val();
            var contractId = formContainer.find("[data-name=contractId]").val();

            var queryData = {startDate:startDate,endDate:endDate,rentType:rentType,contractId:contractId};
            $rootScope.$broadcast("contract-main.query",queryData);
            $scope.$apply();
        });
    }

    /* ======================================== common methods ======================================== */
    function destroy(){
        $(container).find(".amp-datetimepicker input").datetimepicker("remove");
    }

    function reset(){
        var currentDate = new Date();
        var year = currentDate.getFullYear();
        var month = currentDate.getMonth()+1;
        var date = currentDate.getDate();
        year = year%2000;
        if(month<10){
            month="0"+month;
        }
        if(date<10){
            date="0"+date;
        }

        var dateString = year+"-"+month+"-"+date;

        container.find("[data-name=startDate]").val(dateString);
        container.find("[data-name=endDate]").val("");
        container.find("[data-name=rentType]").val("全部");
        container.find("[data-name=contractId]").val("");

        container.find(".amp-select li").removeClass("active");
        // $(container).find(".amp-datetimepicker input").datetimepicker("setStartDate","2016-11-16");


    }

    // 初始化
    function init(){
        initPageView();
        bindPageEvents();
    }
    init();
}]);
