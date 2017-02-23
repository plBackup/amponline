ampApp.controller("contract-main-controller",["$scope","$filter","$http","$rootScope","getPaginationResultFactory",function($scope,$filter,$http,$rootScope,getPaginationResultFactory){
    // $scope.records = [{"propertyFeeTotal":"652020","contractStartTime":"2016-09-10","rentTotal":"7704144","paymentType":"月付","period":"120","brandName":"商户037","rentType":"提成租金","storeNo":"S1-2F-015 S1-1F-017","rentFreePeriod":"0","floorNo":"2F","deductPercent":"9%","contractEndTime":"2026-09-09","commercialType":"餐饮","contractId":"SYQBZZ16155","square":"217.34"},{"propertyFeeTotal":"428520","contractStartTime":"2016-09-10","rentTotal":"2487987.12","paymentType":"季付","period":"60","brandName":"商户177","rentType":"固定租金","storeNo":"H3e-2F-001 H3e-1F-001","rentFreePeriod":"3","floorNo":"1F","deductPercent":"-","contractEndTime":"2021-09-09","commercialType":"餐饮","contractId":"SYQBZZ16161","square":"285.68"},{"propertyFeeTotal":"1777200","contractStartTime":"2016-09-10","rentTotal":"9061350.4000000004","paymentType":"季付","period":"60","brandName":"商户226","rentType":"固定租金","storeNo":"H4a-1F-001/002/003 H4a-2F-001/002 H4a-3F-001","rentFreePeriod":"4","floorNo":"3F","deductPercent":"-","contractEndTime":"2021-09-09","commercialType":"餐饮","contractId":"SYQBZZ16024","square":"1184.8"},{"propertyFeeTotal":"306540","contractStartTime":"2016-09-10","rentTotal":"939270","paymentType":"季付","period":"36","brandName":"商户168","rentType":"固定租金","storeNo":"S1-1F-001","rentFreePeriod":"3","floorNo":"1F","deductPercent":"-","contractEndTime":"2019-09-09","commercialType":"餐饮","contractId":"SYQBZZ16362","square":"131"},{"propertyFeeTotal":"780858","contractStartTime":"2016-09-10","rentTotal":"1373509.2","paymentType":"季付","period":"36","brandName":"商户112","rentType":"固定租金","storeNo":"S1-2F-001 S1-1F-002","rentFreePeriod":"3","floorNo":"1F","deductPercent":"-","contractEndTime":"2019-09-09","commercialType":"餐饮","contractId":"SYQBZZ16109","square":"333.7"},{"propertyFeeTotal":"1347840","contractStartTime":"2016-09-10","rentTotal":"3179520","paymentType":"季付","period":"60","brandName":"商户136","rentType":"固定租金","storeNo":"S1-1F-005 S1-1F-003/004","rentFreePeriod":"2","floorNo":"1F","deductPercent":"-","contractEndTime":"2021-09-09","commercialType":"餐饮","contractId":"SYQBZZ16065","square":"345.6"},{"propertyFeeTotal":"254826","contractStartTime":"2016-09-10","rentTotal":"542322","paymentType":"季付","period":"36","brandName":"商户034","rentType":"固定租金","storeNo":"S1-1F-006","rentFreePeriod":"0","floorNo":"1F","deductPercent":"-","contractEndTime":"2019-09-09","commercialType":"餐饮","contractId":"SYQBZZ16052","square":"108.9"},{"propertyFeeTotal":"447720","contractStartTime":"2016-09-10","rentTotal":"1208270","paymentType":"季付","period":"60","brandName":"商户111","rentType":"固定租金","storeNo":"S1-1F-007","rentFreePeriod":"5","floorNo":"1F","deductPercent":"-","contractEndTime":"2021-09-09","commercialType":"餐饮","contractId":"SYQBZZ16226","square":"114.8"},{"propertyFeeTotal":"23556","contractStartTime":"2016-09-10","rentTotal":"157644","paymentType":"季付","period":"12","brandName":"商户115","rentType":"固定租金","storeNo":"S1-1F-008","rentFreePeriod":"0","floorNo":"1F","deductPercent":"-","contractEndTime":"2017-09-09","commercialType":"餐饮","contractId":"SYQBZZ16059","square":"30.2"},{"propertyFeeTotal":"56160","contractStartTime":"2016-09-10","rentTotal":"397440","paymentType":"季付","period":"36","brandName":"商户020","rentType":"固定租金","storeNo":"S1-1F-013","rentFreePeriod":"0","floorNo":"1F","deductPercent":"-","contractEndTime":"2019-09-09","commercialType":"餐饮","contractId":"SYQBZZ16129","square":"24"}];
    $scope.records = [];
    $scope.filteredRecords = $scope.records;

    $scope.paginationInfo = {
        pageNo:null,
        pageCount:null,
        recordCount:null,
        pageSize:null,
        records:[]
    };

    $scope.fetchData = function(){
        $scope.paginationInfo = getPaginationResultFactory($scope.paginationInfo.pageNo,$scope.paginationInfo.pageSize,$scope.filteredRecords);

        $(container).find(".amp-datetimepicker input").datetimepicker("remove");
        $scope.$apply();
    };

    function initializeData(data){
        $scope.records = data;
        $scope.filteredRecords = $scope.records;
        var currentPageNo = 1;
        var pageSize = 10;
        $scope.paginationInfo = getPaginationResultFactory(currentPageNo,pageSize,$scope.filteredRecords);
    }


    var filterContractId = "";
    var filterRentType = "";
    var filterStartDate = null;
    var filterEndDate = null;

    function compareTime(time1,time2){
        if(time1==null||time2==null){
            return 0;
        }
        if(time1.getTime()==time2.getTime()){
            return 0;
        }else if(time1.getTime()<time2.getTime()){
            return -1;
        }else if(time1.getTime()>time2.getTime()){
            return 1;
        }
    }

     function filterRecord(obj){
        if(obj.contractId.indexOf(filterContractId)<0){
            return;
        }
        if(obj.rentType.indexOf(filterRentType)<0){
            return;
        }
        var contractStartTime = null;

        if(obj.contractStartTime!=null){
            contractStartTime = new Date(obj.contractStartTime);
        }

        if(compareTime(filterStartDate,contractStartTime)>0||compareTime(filterEndDate,contractStartTime)<0){
            return;
        }
        return obj;
    }

    /* ======================================== 监听广播事件 ======================================== */
    $scope.$on("contract-main.query",function(event,params){
        $(container).find(".amp-datetimepicker input").datetimepicker("remove");
        filterContractId = params.contractId;
        filterRentType = params.rentType;
        if(filterRentType=="全部"){
            filterRentType = "";
        }
        filterStartDate = params.startDate;
        filterEndDate = params.endDate;

        $scope.filteredRecords = $filter("filter")($scope.records,filterRecord);

        $scope.paginationInfo = getPaginationResultFactory($scope.paginationInfo.pageNo,$scope.paginationInfo.pageSize,$scope.filteredRecords);
        $scope.$apply();
        $(container).find(".amp-datetimepicker input").datetimepicker("remove");
    });

    $scope.$on("contract-main.save-record",function(event,params){
        $scope.records.unshift(params);
        $scope.filteredRecords = $filter("filter")($scope.records,filterRecord);
        $scope.paginationInfo = getPaginationResultFactory($scope.paginationInfo.pageNo,$scope.paginationInfo.pageSize,$scope.filteredRecords);
        $scope.$apply();
    });


    $scope.$on("$destroy",function(){destroy();});







    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    var pin = null;
    function initPageView(){
        container = $("#contract-main");


        //var width = $(container).find(".amp-thead").outerWidth();
        //$(container).find(".amp-thead").css("width",width+"px");
        //pin = $(container).find(".amp-thead").pin({
        //    containerSelector: $(container).find(".amp-collapse-table"),
        //    padding: {top: 44, bottom: 50}
        //});

    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){
        $(container).on("click",".amp-collapse-table .amp-tbody .amp-table-row-content",function(e){
            if($(this).parent().find(".amp-table-row-collapse").length==0){
                return;
            }

            if(!$(this).next().hasClass("amp-table-row-collapse-initialized")){
                $(this).next().addClass("amp-table-row-collapse-initialized");
                $(this).next().find(".amp-datetimepicker input").datetimepicker({
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
                $(this).next().find(".amp-datetimepicker").on("click",function(e){
                    e.stopPropagation();
                    e.preventDefault();
                    $(this).closest(".amp-datetimepicker").find("input").datetimepicker({
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
                    $(this).closest(".amp-datetimepicker").find("input").datetimepicker("show");
                });
            }

            //if(isPC()){
            //    setTimeout(function(){
            //        pin.refresh();
            //    },1000);
            //}
        });

        container.on("click","a.cancel-btn,a.ok-btn",function(e){
            e.stopPropagation();
            e.preventDefault();
            $(this).closest(".amp-table-row").find(".amp-table-row-content").click();
        });

        container.on("focus","[data-type=number]",function(e){
            e.stopPropagation();
            e.preventDefault();
            var val = $(this).val().replace( /,/g,"");
            $(this).val(parseFloat(val).toFixed(2));
        });

        container.on("blur","[data-type=number]",function(e){
            e.stopPropagation();
            e.preventDefault();
            var val =$filter("number")($(this).val(),"2");
            $(this).val(val)
        });
    }

    /* ======================================== common methods ======================================== */
    function destroy(){
        $(container).find(".amp-datetimepicker input").datetimepicker("remove");
    }

    function init(){
        var projectId = $rootScope.curProject;
        var url = "../static/js/mgt_analysis/data/"+projectId+"/contract_main_data.json";
        $http.get(url).success(function(result){
            initializeData(result);
            initPageView();
            bindPageEvents();
        });
    }
    init();
}]);



