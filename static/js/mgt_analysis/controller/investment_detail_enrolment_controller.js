ampApp.controller("investment-detail-enrolment-controller",["$scope","$rootScope",function($scope,$rootScope){

    $scope.record = {
        projectItemName:null,
        budget:null,
        real:null,
        rate:"-"
    };

    $scope.$on("$destroy",function(){destroy();});

    $scope.$on("investment-detail.enrolment",function(){
        container.removeClass("amp-display-hide");
        container.find(".contract-enrolment").addClass("amp-animated").addClass("amp-slide-left-in");

        triggerAnimation();
    });


    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    function initPageView() {
        container = $("#investment-detail-enrolment");
    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){

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



            container.find(".contract-enrolment").addClass("amp-slide-right-out");
        });

        container.on("click","a.continue-save-btn",function(e){
            e.stopPropagation();
            e.preventDefault();


            reset();
        });



    }

    /* ======================================== common methods ======================================== */
    function destroy(){
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
