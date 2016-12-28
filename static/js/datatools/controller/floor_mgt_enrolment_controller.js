ampApp.controller("floor-mgt-enrolment-controller",["$scope","$rootScope",function($scope,$rootScope){

    $scope.$on("$destroy",function(){destroy();});

    $scope.$on("floor-mgt.enrolment",function(){
        container.removeClass("amp-display-hide");
        container.find(".contract-enrolment").addClass("amp-animated").addClass("amp-slide-left-in");

        triggerAnimation();
    });




    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    function initPageView() {
        container = $("#floor-mgt-enrolment");
    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){



        container.on("click","a.close-panel-btn",function(e){
            e.stopPropagation();
            e.preventDefault();
            container.find(".contract-enrolment").addClass("amp-slide-right-out");
            triggerAnimation();
        });

        container.on("click","a.save-btn",function(e){
            e.stopPropagation();
            e.preventDefault();

            // TODO


        });

        container.on("click","a.continue-save-btn",function(e){
            e.stopPropagation();
            e.preventDefault();

            // TODO
        });


    }

    /* ======================================== common methods ======================================== */
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

    function destroy(){
    }

    function reset(){
    }

    // 初始化
    function init(){
        initPageView();
        bindPageEvents();
    }
    init();


}]);
