ampApp.controller("business-merchant-detail-enrolment-controller",["$scope","$rootScope",function($scope,$rootScope){

    $scope.$on("$destroy",function(){destroy();});

    $scope.$on("business-merchant-detail.enrolment",function(){
        container.removeClass("amp-display-hide");
        container.find(".contract-enrolment").addClass("amp-animated").addClass("amp-slide-left-in");

        triggerAnimation();
    });



    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    function initPageView() {
        container = $("#business-merchant-detail-enrolment");
    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){

        $(container).find(".amp-datetimepicker input").datetimepicker({
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

        $(container).find(".amp-datetimepicker").on("click",function(e){
            e.stopPropagation();
            e.preventDefault();
            $(this).closest(".amp-datetimepicker").find("input").datetimepicker("show");
        });

        container.find(".contract-enrolment").on("webkitAnimationEnd animationend",function(){
            if($(this).hasClass("amp-slide-right-out")){
                container.addClass("amp-display-hide");
                reset();
            }
            $(this).removeClass("amp-slide-right-out");
            $(this).removeClass("amp-slide-left-in");
        });

        container.on("click","a.close-panel-btn",function(e){
            e.stopPropagation();
            e.preventDefault();
            container.find(".contract-enrolment").addClass("amp-slide-right-out");
            triggerAnimation();
        });

        container.on("click","a.save-btn",function(e){
            e.stopPropagation();
            e.preventDefault();

            if(!validateAmpInputCollection($(container).find("[amp-input-validate]"))){return;}

            var record = {};
            container.find("[data-name]").each(function(){
                var name = $(this).attr("data-name");
                var value = $(this).val();
                record[name]=value;
            });

            var chargeDate = new Date();
            record.chargeDate = chargeDate.getFullYear()+"-"+(chargeDate.getMonth()+1)+"-"+chargeDate.getDate();


            $rootScope.$broadcast("business-merchant-detail-enrolment.save-record",record);
            $scope.$apply();
            container.find(".contract-enrolment").addClass("amp-slide-right-out");
        });

        container.on("click","a.continue-save-btn",function(e){
            e.stopPropagation();
            e.preventDefault();

            if(!validateAmpInputCollection($(container).find("[amp-input-validate]"))){return;}

            var record = {};
            container.find("[data-name]").each(function(){
                var name = $(this).attr("data-name");
                var value = $(this).val();
                record[name]=value;
            });
            var chargeDate = new Date();
            record.chargeDate = chargeDate.getFullYear()+"-"+(chargeDate.getMonth()+1)+"-"+chargeDate.getDate();

            $rootScope.$broadcast("business-merchant-detail-enrolment.save-record",record);
            $scope.$apply();
            reset();
        });

        container.on("change",".amp-input[amp-input-validate] input",function(e){
            e.stopPropagation();
            e.preventDefault();

            validateAmpInputCollection($(this).parent());
        });

    }

    /* ======================================== common methods ======================================== */
    function destroy(){
        $(container).find(".amp-datetimepicker input").datetimepicker("remove");
    }

    function triggerAnimation(){
        setTimeout(function(){
            if(container.find(".contract-enrolment").hasClass("amp-slide-right-out")){
                container.addClass("amp-display-hide");
                reset();
            }
            container.find(".contract-enrolment").removeClass("amp-slide-right-out");
            container.find(".contract-enrolment").removeClass("amp-slide-left-in");
        },500);
    }// 兼容IE9

    function reset(){
        $(container).find("[data-name]").val("");
        $(container).find(".amp-input-error").removeClass("amp-input-error");
    }

    // 初始化
    function init(){
        initPageView();
        bindPageEvents();
    }
    init();

}]);
