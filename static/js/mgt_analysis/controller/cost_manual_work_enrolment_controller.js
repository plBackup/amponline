ampApp.controller("cost-manual-work-enrolment-controller",["$scope",function($scope){
    $scope.records = null;

    /* ======================================== 监听广播事件 ======================================== */

    $scope.$on("$destroy",function(){destroy();});

    $scope.$on("cost-manual-work.enrolment",function(){
        container.removeClass("amp-display-hide");
        container.find(".contract-enrolment").addClass("amp-animated").addClass("amp-slide-left-in");

        triggerAnimation();
    });


    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    function initPageView(){
        container = $("#cost-manual-work-enrolment");


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

            if(!validateAmpInputCollection($(container).find("[amp-input-validate]"))){return;}

            container.find(".contract-enrolment").addClass("amp-slide-right-out");

            triggerAnimation();
        });

        container.on("click","a.nav-back-btn",function(e){
            e.stopPropagation();
            e.preventDefault();


            container.find(".contract-enrolment").addClass("amp-slide-right-out");

            triggerAnimation();
        });

        container.on("change",".amp-input[amp-input-validate] input",function(e){
            e.stopPropagation();
            e.preventDefault();

            validateAmpInputCollection($(this).parent());
        });
    }

    /* ======================================== common methods ======================================== */
    function destroy(){
    }

    function reset(){
        $(container).find(".amp-input input").val("");
        $(container).find(".amp-input-error").removeClass("amp-input-error");
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

    // 初始化
    function init(){
        initPageView();
        bindPageEvents();
    }
    init();
}]);



