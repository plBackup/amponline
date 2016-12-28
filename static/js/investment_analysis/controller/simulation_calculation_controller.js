var simulationApp = angular.module("simulationApp", ['ampFilters']);

simulationApp.controller("simulation-calculation-controller",["$scope","$filter","$http",function($scope,$filter,$http){
    var queryMap = getQueryParameterMap();
    var projectId=queryMap.projectId;
    if(projectId==null||projectId==""){
        projectId = "0"; // 默认project id
    }

    var CASE_INFO_KEY = "PROJECT_"+projectId+"_CASE_INFO_";// 案例信息
    var CASE_DETAIL_KEY = "PROJECT_"+projectId+"_CASE_DETAIL_";  // 案例详细信息
    var CURRENT_CASE_ID = "PROJECT_"+projectId+"_CURRENT_CASE_ID";// 当前 case id
    var CURRENT_CASE_NAME = "PROJECT_"+projectId+"_CURRENT_CASE_NAME";// 当前 case name

    var defaultData = null; // 默认数据
    var caseId = globalStorage.getLocalData(CURRENT_CASE_ID); // 方案编号
    var caseName = globalStorage.getLocalData(CURRENT_CASE_NAME);// 方案名称

    if(caseId==null||caseId==""){
        caseId = "default";
    }
    if(caseName==null||caseName==""){
        caseName = "新方案";
    }

    $scope.caseName = caseName;


    /*{
        irrPercent:"16%",
        netPresentValue:"14741.82",
        appreciation:"13782.83",
        cashFlow:"4217.19",
        yearIndex:"2"
    }*/
    /* ======================================== 投资收益的测试指标 ======================================== */
    $scope.testIndexRecords = [];

    /* ======================================== 期初分析 ======================================== */
    $scope.initialAnalysis = {
        purchasingPrice:null,
        purchasingFee:null,
        loanFee:null,
        loan:null,
        loanRate:null,
        loanYear:null, // 等额本金 贷款年数量
        originBase:"-",
        initialBenefit:"-"
    };

    $scope.$watchGroup(["initialAnalysis.purchasingPrice","initialAnalysis.purchasingFee","initialAnalysis.loanFee","initialAnalysis.loan","initialAnalysis.loanRate"],function(newValue,oldValue, scope){
        recalculateAllData();
    });

    $scope.$watch("initialAnalysis.loanYear",function(newValue,oldValue, scope){
        if(newValue>100){
            $scope.initialAnalysis.loanYear = oldValue;
        }
        recalculateAllData();
    });

    /* ======================================== 参数 ======================================== */
    $scope.parameterInfo = {
        benefitRate:null, // 业主要求的收益率
        inputCapitalizationRate:null,// 输入资本化率
        costValue:null, // 销售成本
        costPercent:null,// 销售比例
        outputCapitalizationRateList:[
            {year:2,rate:null},
            {year:3,rate:null}
        ]// 输出资本化率
    };

    $scope.$watch("parameterInfo.inputCapitalizationRate",function(){
        recalculateAllData();
    });

    $scope.$watch("parameterInfo.benefitRate",function(){
        recalculateAllData();
    });

    $scope.$watchGroup(["parameterInfo.costValue","parameterInfo.costPercent"],function(){
        recalculateAllData();
    });


    /* ======================================== 市值 ======================================== */
    $scope.$watch("marketInfo.costPercent",function(newValue,oldValue, scope){
        recalculateAllData();
    });



    $scope.marketInfo={
        currentMarketValue:"自动生成",
        costValue:null,
        costPercent:null,
        loanValue:"自动生成",
        currentBenefit:"自动生成"
    };
    
    /* ======================================== 收支模拟 ======================================== */
    $scope.$watchCollection("incomeExpenseYearIncreaseRate",function(newValue,oldValue, scope){
        recalculateAllData();
    });

    $scope.incomeExpenseYearIncreaseRate = {
        rentIncomeRate:null,
        propertyFeeIncomeRate:null,
        otherIncomeRate:null,
        landValueTaxRate:null,

        energyConsumptionRate:null,
        waterFeeRate:null,
        powerFeeRate:null,
        gasFeeRate:null,
        publicConsumptionFeeRate:null,
        maintenanceFeeRate:null,
        generalMgtFeeRate:null,
        marketingExpenseRate:null,
        wagesRelatedCostRate:null,
        mgtFeeRate:null,
        chargeOffRate:null,
        depreciationRate:null,
        otherFeeRate:null,

        housePropertyTaxRate:null,
        businessTaxRate:null,
        otherTaxRate:null
    };

    function createEmptyRecordContent(){
        return {
            totalIncome:"-",
            rentIncome:null,
            propertyFeeIncome:null,
            otherIncome:null,
            totalFee:"-",
            landValueTax:null,
            energyConsumption:"-",
            waterFee:null,
            powerFee:null,
            gasFee:null,
            publicConsumptionFee:null, // 公共事业 能耗
            maintenanceFee:null,
            generalMgtFee:null,
            marketingExpense:null,
            wagesRelatedCost:null,
            mgtFee:null,
            chargeOff:null,
            depreciation:null,
            otherFee:null,
            totalTax:"-",
            housePropertyTax:null,
            businessTax:null,
            otherTax:null,
            noi:"-",
            capitalExport:null
        }
    }



    $scope.incomeExpense = {
        headers:[1,2,3],
        contents:[createEmptyRecordContent(),createEmptyRecordContent(),createEmptyRecordContent()]
    };

    /* ======================================== 税前现金流 ======================================== */
    $scope.preTaxCashFlowRecords = [
        {year:1,income:"自动生成",loanAmount:"自动生成",loanInterest:"自动生成",charges:"自动生成",preTaxCashFlow:"自动生成"},
        {year:2,income:"自动生成",loanAmount:"自动生成",loanInterest:"自动生成",charges:"自动生成",preTaxCashFlow:"自动生成"},
        {year:3,income:"自动生成",loanAmount:"自动生成",loanInterest:"自动生成",charges:"自动生成",preTaxCashFlow:"自动生成"}
    ];

    /* ======================================== 销售所得分析 ======================================== */
    $scope.saleIncomeAnalysisRecords = [
        {year:2,salePrice:"自动生成",saleCost:"自动生成",loanBalance:"自动生成",netSalesIncome:"自称生成"},
        {year:3,salePrice:"自动生成",saleCost:"自动生成",loanBalance:"自动生成",netSalesIncome:"自称生成"}
    ];

    /* ======================================== 贷款还款 ======================================== */
    $scope.loanRepaymentAnalysis = [];

    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    var swiper_1 = null;
    var swiper_2 = null;
    var preTaxCashFlowSwiper = null;
    var saleIncomeAnalysisSwiper = null;

    function initPageView(){
        container = $("#simulation-calculation");

        var clientHeight = $(window).height();

        container.find(".amp-content-panel").css("height",clientHeight-44-44+"px");
        container.find(".amp-content-panel-body").css("height",clientHeight-44-73-44+"px");
        container.find(".table-group-2").css("height",clientHeight-44-73-120-44+"px");
        container.find(".loan-repayment-analysis .table-wrapper").css("height",clientHeight-44-73-120-46+"px");

        if(isPC()){
            swiper_1 = new Swiper(".income-expenses-simulation .table-group-1 .swiper-container", {
                slidesPerView:"auto",
                freeMode: true,
                resistanceRatio : 0
            });

            swiper_2 = new Swiper(".income-expenses-simulation .table-group-2 .swiper-container", {
                preventClicksPropagation:false,
                scrollbar: ".income-expenses-simulation .table-group-2 .swiper-scrollbar",
                slidesPerView:"auto",
                freeMode: true,
                resistanceRatio : 0
            });

            preTaxCashFlowSwiper = new Swiper(".pre-tax-cash-flow .table-group-right .swiper-container", {
                scrollbar: ".pre-tax-cash-flow .table-group-right .swiper-scrollbar",
                slidesPerView:"auto",
                freeMode: true,
                resistanceRatio : 0
            });

            saleIncomeAnalysisSwiper = new Swiper(".sale-income-analysis .table-group-right .swiper-container", {
                scrollbar: ".sale-income-analysis .table-group-right .swiper-scrollbar",
                slidesPerView:"auto",
                freeMode: true,
                resistanceRatio : 0
            });
            swiper_1.params.control = swiper_2;//需要在Swiper2初始化后，Swiper1控制Swiper2
            swiper_2.params.control = swiper_1;//需要在Swiper1初始化后，Swiper2控制Swiper1
        }
        $("#preloader").fadeOut("fast");
    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){
        container.on("click",".section a.collapse-btn",function(e){
            e.stopPropagation();
            e.preventDefault();
            $(this).closest(".section").toggleClass("open");
        });

        /* block-right */
        container.on("click",".amp-check-btn-group a",function(e){
            e.stopPropagation();
            e.preventDefault();
            $(this).closest(".amp-check-btn-group").find("a").removeClass("active");
            $(this).addClass("active");
            var href = $(this).attr("data-href");
            $(container).find(".initial-analysis").hide();
            $(container).find(".income-expenses-simulation").hide();
            $(container).find(".pre-tax-cash-flow").hide();
            $(container).find(".sale-income-analysis").hide();
            $(container).find(".loan-repayment-analysis").hide();
            $(container).find(href).show();
            if(href==".income-expenses-simulation"){

            }
            if(href==".pre-tax-cash-flow"){

            }

            if(href==".sale-income-analysis"){

            }
            if(href==".loan-repayment-analysis"){

            }
            updateSwiper();
        });

        container.on("click",".record-list li.parent-group",function(e){
            e.stopPropagation();
            e.preventDefault();
            var dataGroup = $(this).attr("data-group");
            $(this).closest(".table-group").find("[data-group="+dataGroup+"].record-group.parent-group").toggleClass("collapsed");
            $(this).closest(".table-group").find("[data-group="+dataGroup+"]:not(.parent-group)").toggleClass("amp-display-hide");
        });

        container.on("click",".record-list li.sub-record-group a",function(e){
            e.stopPropagation();
            e.preventDefault();
            $(this).parent().toggleClass("collapsed");
            var dataGroup = $(this).parent().attr("sub-data-group");
            $(this).closest(".table-group").find("[sub-data-group="+dataGroup+"]:not(.sub-record-group)").toggleClass("amp-display-none");
        });


        container.on("click",".record-list-operation a.record-list-add-btn",function(e){
            e.stopPropagation();
            e.preventDefault();

            var len = $scope.incomeExpense.headers.length;
            $scope.incomeExpense.headers.push(len+1);
            console.log($scope.incomeExpense.headers);
            $scope.incomeExpense.contents.push(createEmptyRecordContent());


            if(len+1>1){
                $scope.parameterInfo.outputCapitalizationRateList.push({year:len+1,rate:null});
            }


            recalculateAllData();

            updateSwiper();

        });

        container.on("click",".record-list-operation a.record-list-remove-btn",function(e){
            e.stopPropagation();
            e.preventDefault();

            $scope.incomeExpense.headers.pop();
            $scope.incomeExpense.contents.pop();
            $scope.parameterInfo.outputCapitalizationRateList.pop();


            recalculateAllData();

            updateSwiper();
        });

        container.on("keypress",".amp-input input[data-type-integer]",function(e){
            if(e.keyCode==46|| e.keyCode==101){
                e.preventDefault();
            }
        });



        container.on("change",".amp-input input",function(e){
            var value = $(this).val();
            if(isNaN(value)){
                $(this).next().find("span").html("请输入数字");
                $(this).closest(".amp-input").addClass("amp-input-error");
            }else{
                $(this).closest(".amp-input").removeClass("amp-input-error");
            }
        });

        // 计算收支模拟
        container.on("keyup",".income-expenses-simulation .amp-input input",function(){
            var value = $(this).val();
            if(isNaN(value)||value==""){
                return;
            }
            recalculateAllData();
        });

        container.on("keyup","[data-name=outputCapitalizationRate]",function(){
            recalculateAllData();
        });

        container.on("click",".amp-nav-back",function(e){
            e.stopPropagation();
            e.preventDefault();
            window.close();
        });

        // 重置
        container.on("click","a.reset-case-btn",function(e){
            e.stopPropagation();
            e.preventDefault();

            var newObj = cloneData(defaultData);
            initializeData(newObj);
        });

        // 保存
        container.on("click","a.save-case-btn",function(e){
            e.stopPropagation();
            e.preventDefault();

            var caseDetail = {
                testIndexRecords:$scope.testIndexRecords,
                initialAnalysis:$scope.initialAnalysis,
                parameterInfo:$scope.parameterInfo,
                marketInfo:$scope.marketInfo,
                incomeExpenseYearIncreaseRate:$scope.incomeExpenseYearIncreaseRate,
                incomeExpense:$scope.incomeExpense,
                preTaxCashFlowRecords:$scope.preTaxCashFlowRecords,
                saleIncomeAnalysisRecords:$scope.saleIncomeAnalysisRecords
            };
            globalStorage.setLocalData(CASE_DETAIL_KEY+caseId,caseDetail);// 存储案例详情


            // 存储案例基本信息

            var testIndexRecords = $scope.testIndexRecords;

            if(testIndexRecords==null||testIndexRecords.length==0){
                return;
            }
            var lastIndex = testIndexRecords.length-1;
            var lastRecord = testIndexRecords[lastIndex];

            var caseInfo = {
                "caseId":caseId,
                "caseName":caseName,
                "irrPercent":lastRecord.irrPercent,
                "netPresentValue":lastRecord.netPresentValue,
                "appreciation":lastRecord.appreciation,
                "purchasingPrice":$scope.initialAnalysis.purchasingPrice,
                "loan":$scope.initialAnalysis.loan,
                "yearCount":lastRecord.yearIndex
            };
            globalStorage.setLocalData(CASE_INFO_KEY+caseId,caseInfo);


        });

        // 删除方案
        container.on("click","a.delete-case-btn",function(e){
            e.stopPropagation();
            e.preventDefault();

            if(!confirm("确认删除?")){
                return;
            }

            globalStorage.setLocalData(CASE_DETAIL_KEY+caseId,null);
            globalStorage.setLocalData(CASE_INFO_KEY+caseId,null);
            window.close();
        });

        container.on("dblclick",".pre-tax-cash-flow .table-group-right ul li,.sale-income-analysis .table-group-right ul li",function(e){
            e.stopPropagation();
            e.preventDefault();
            var fullSelectedRange = document.createRange();
            fullSelectedRange.selectNode($(this)[0]);
            document.getSelection().removeAllRanges();
            document.getSelection().addRange(fullSelectedRange);
        });
    }


    /* ======================================== common methods ======================================== */

    // 初始化 数据
    function initializeData(data){
        // 期初分析
        $scope.initialAnalysis = data.initialAnalysis;
        // 参数
        $scope.parameterInfo = data.parameterInfo;
        $scope.incomeExpense = data.incomeExpense;
        $scope.incomeExpenseYearIncreaseRate = data.incomeExpenseYearIncreaseRate;
        $scope.marketInfo.costValue = data.marketInfo.costValue;

        recalculateAllData();
    }

    // 重新设值
    var recalculateAllDataTimeout = null;
    function recalculateAllData(){
        clearTimeout(recalculateAllDataTimeout);
        recalculateAllDataTimeout = setTimeout(function(){
            resetInitialAnalysis($scope); // 重设 期初分析
            recalculateIncomeExpense($scope); // 重设 收支模拟
            resetLoanRepaymentAnalysis($scope);// 重设 贷款还款
            resetPreTaxCashFlowInfo($scope); // 重设税前现金流
            resetSaleIncomeAnalysisRecords($scope); // 重设销售所得分析
            resetTestIndexRecords($scope); // 重设模拟测算
            $scope.$apply();
        },300);
    }

    var swiperUpdateTimeout = null;

    function updateSwiper(){

        if(isPC()){
            clearTimeout(swiperUpdateTimeout);

            swiperUpdateTimeout = setTimeout(function(){
                swiper_1.update();
                swiper_2.update();
                preTaxCashFlowSwiper.update();
                saleIncomeAnalysisSwiper.update();

                swiper_1.update();
                swiper_2.update();
                preTaxCashFlowSwiper.update();
                saleIncomeAnalysisSwiper.update();
            },300);
        }
    }

    // 初始化
    function init(){
        var url = "../static/js/investment_analysis/data/"+projectId+"/simulation_calculation_data.json";

        $http.get(url).success(function(result){

            defaultData = result["default"]; // 初始化默认数据

            var storageCaseData = globalStorage.getLocalData(CASE_DETAIL_KEY+caseId);

            var remoteCaseData = result[caseId];

            var selectedData = storageCaseData||remoteCaseData||defaultData;

            initializeData(selectedData);
            initPageView();
            bindPageEvents();
        });
    }
    init();
}]);