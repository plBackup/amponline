ampApp.controller("noi-enrolment-controller",["$scope","$filter",function($scope,$filter){


    $scope.record={
        year:2016,
        real1:"",
        real2:"",
        real3:"",
        real4:"",
        real5:"",
        real6:"",
        real7:"",
        real8:"",
        real9:"",
        real10:"",
        real11:"",
        real12:"",
        budget1:0,
        budget2:"",
        budget3:"",
        budget4:"",
        budget5:"",
        budget6:"",
        budget7:"",
        budget8:"",
        budget9:"",
        budget10:"",
        budget11:"",
        budget12:""
    };

    var dateTime = new Date();
    var year = dateTime.getFullYear();
    var month = dateTime.getMonth()+1;
    var monthText = "";
    if(month<10){
        monthText = "0"+month;
    }else{
        monthText = month;
    }

    $scope.date =year+"-"+monthText;

    /* ======================================== 监听广播事件 ======================================== */

    $scope.$on("$destroy",function(){destroy();});
    $scope.$on("noi-enrolment.change-month",function(event,params){
        $scope.date = params;
        $scope.$apply();
    });



    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    function initPageView(){
        container = $("#noi-enrolment");
    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){

        $(container).find(".amp-datetimepicker input").datetimepicker({
            language: "zh-CN",
            format:"yyyy-mm-dd",
            todayBtn:"linked",
            startView:2,
            minView:2,
            weekStart: 1,
            todayHighlight: 1,
            autoclose: 1,
            forceParse: 0
        });

        container.on("click","a.nav-back-btn",function(e){
            e.stopPropagation();
            e.preventDefault();

        });

        container.on("click","a.save-btn",function(e){
            e.stopPropagation();
            e.preventDefault();


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



