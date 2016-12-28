ampApp.controller("arrears-merchant-detail-receiving-controller",["$scope","$rootScope",function($scope,$rootScope){
    //$scope.records = [{"arrearsType":"租金","arrearsDayCount":"62","arrearsAmount":"5477.85"},{"arrearsType":"物管","arrearsDayCount":"47","arrearsAmount":"1983.15"},{"arrearsType":"其他","arrearsDayCount":"0","arrearsAmount":"0"}];
    $scope.records = resetRecords([]);

    var merchantName = globalStorage.getSessionData("arrears_merchant_name");

    $scope.merchantName = merchantName;

    resetRecords();

    function resetRecords(list){
        list = list||[];
        var totalAmount = 0;

        list.forEach(function(item){
            var amount = parseFloat(item.arrearsAmount);
            totalAmount+=amount;
        });
        list.push({arrearsType:"合计",arrearsAmount:totalAmount});

        return list;
    }





    $scope.$on("$destroy",function(){destroy();});

    $scope.$on("arrears-merchant-detail.select",function(event,params){
        $scope.records = resetRecords(params);
        $scope.$apply();
    });

    $scope.$on("arrears-merchant-detail.receive",function(){
        container.removeClass("amp-display-hide");
        container.find(".contract-enrolment").addClass("amp-animated").addClass("amp-slide-left-in");

        triggerAnimation();
    });



    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    function initPageView() {
        container = $("#arrears-merchant-detail-receiving");
    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){

        container.find(".contract-enrolment").on("webkitAnimationEnd animationend",function(){
            if($(this).hasClass("amp-slide-right-out")){
                container.addClass("amp-display-hide");
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

        container.on("click","a.receive-btn",function(e){
            e.stopPropagation();
            e.preventDefault();
            container.find(".contract-enrolment").addClass("amp-slide-right-out");

            $rootScope.$broadcast("arrears-merchant-detail.received");
            $scope.records = [];
            $scope.$apply();
        });
    }

    /* ======================================== common methods ======================================== */
    function destroy(){}

    function triggerAnimation(){
        setTimeout(function(){
            if(container.find(".contract-enrolment").hasClass("amp-slide-right-out")){
                container.addClass("amp-display-hide");
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
