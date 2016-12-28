/* ======================================== 期初分析 ======================================== */
/**
 * 重新计算 期初分析
 * @param $scope
 */
function resetInitialAnalysis($scope){
    var arr = [$scope.initialAnalysis.purchasingPrice,$scope.initialAnalysis.purchasingFee,$scope.initialAnalysis.loanFee];

    $scope.initialAnalysis.originBase = addNumber(arr,"-");

    $scope.initialAnalysis.initialBenefit = subtractNumber($scope.initialAnalysis.originBase,$scope.initialAnalysis.loan,"-");
}

/* ======================================== 税前现金流 ======================================== */
/**
 * 获取指定年的贷款还款信息
 * @param year
 */
function getLoanRepaymentItemForSpecialYear($scope,year){
    var result = {year:year,pmt:0,ipmt:0,ppmt:0,leavePpmt:0};
    $scope.loanRepaymentAnalysis.forEach(function(item){
        if(item.year==year){
            result = item;
        }
    });
    return result;
}
/**
 * 获取 税前现金流 数组
 * @param $scope
 * @returns {Array}
 */
function getPreTaxCashFlowInfoList($scope){
    var result = [];

    $scope.incomeExpense.contents.forEach(function(item,index){
        var year = index+1;
        var income = getValue(item.noi,"自动生成"); // 净 营业收入
        var loanRepaymentItem = getLoanRepaymentItemForSpecialYear($scope,year);
        var loanAmount = loanRepaymentItem.ppmt; // 贷款本金
        var loanInterest = loanRepaymentItem.ipmt; // 贷款利息
        var charges = getValue(item.capitalExport,"自动生成"); // 资本支出

        var subtractValue = addNumber([loanAmount,loanInterest,charges],"-");
        var preTaxCashFlow = subtractNumber(income,subtractValue,"自动生成");

        result.push({year:year,income:income,loanAmount:loanAmount,loanInterest:loanInterest,charges:charges,preTaxCashFlow:preTaxCashFlow});

    });
    return result;
}

/**
 * 重新计算 税前现金流
 * @param $scope
 */
function resetPreTaxCashFlowInfo($scope){
    $scope.preTaxCashFlowRecords = getPreTaxCashFlowInfoList($scope);
}

/* ======================================== 销售所得分析 ======================================== */
function getSpecialRate($scope,year){
    var rate = null;

    $scope.parameterInfo.outputCapitalizationRateList.forEach(function(item){
        if(year==item.year){
            rate = item.rate;
        }
    });
    return rate;
}
/**
 * 重新设置 销售所得分析
 * @param $scope
 */
function resetSaleIncomeAnalysisRecords($scope){
    var result = [];
    var maxYear = $scope.incomeExpense.contents.length;

    $scope.incomeExpense.contents.forEach(function(item,index){
        if(index==0){
            return;
        }

        var year = index+1;
        var nextYear = year+1;
        if(nextYear>maxYear){
            nextYear = maxYear;
        }
        var salePrice = "自动生成"; // 第n+1年noi 除以 第n年输出资本化率
        var noi = getValue($scope.incomeExpense.contents[nextYear-1].noi,"-");
        var rate = getValue(getSpecialRate($scope,year),"-");

        if(isNumber(noi)&&isNumber(rate)&&parseFloat(rate)!=0){
            salePrice = parseFloat(noi)/parseFloat(rate)*100;
        }

        var costValue = $scope.parameterInfo.costValue;
        var costPercent = $scope.parameterInfo.costPercent;
        var saleCost = 0;
        if(isNumber(salePrice)&&isNumber(costPercent)){
            saleCost = salePrice*costPercent/100;
        }else{
            saleCost = getValue(costValue,"自动生成");
        }


        var loanBalance = getLoanRepaymentItemForSpecialYear($scope,year).leavePpmt;

        var subtract = addNumber([saleCost,loanBalance],"-");

        var netSalesIncome = subtractNumber(salePrice,subtract, "自动生成");

        result.push({year:year,salePrice:salePrice,saleCost:saleCost,loanBalance:loanBalance,netSalesIncome:netSalesIncome});

    });
    $scope.saleIncomeAnalysisRecords = result;
}

/* ======================================== 收支模拟 ======================================== */
/**
 * 重新设置 收支模拟
 * @param $scope
 */
function recalculateIncomeExpense($scope){
    var firstItem = null;
    var rate = $scope.incomeExpenseYearIncreaseRate;
    if($scope.incomeExpense.contents.length>0){
        firstItem = $scope.incomeExpense.contents[0];
    }

    $scope.incomeExpense.contents.forEach(function(item,index){
        // 计算 收入
        item.rentIncome = powerCalculate(firstItem.rentIncome,rate.rentIncomeRate,index,item.rentIncome);

        item.propertyFeeIncome = powerCalculate(firstItem.propertyFeeIncome,rate.propertyFeeIncomeRate,index,item.propertyFeeIncome);
        item.otherIncome = powerCalculate(firstItem.otherIncome,rate.otherIncomeRate,index,item.otherIncome);
        item.totalIncome = addNumber([item.rentIncome,item.propertyFeeIncome,item.otherIncome],"-");

        // 计算 费用
        item.landValueTax = powerCalculate(firstItem.landValueTax,rate.landValueTaxRate,index,item.landValueTax);

        item.publicConsumptionFee = powerCalculate(firstItem.publicConsumptionFee,rate.publicConsumptionFeeRate,index,item.publicConsumptionFee);

        item.maintenanceFee = powerCalculate(firstItem.maintenanceFee,rate.maintenanceFeeRate,index,item.maintenanceFee);
        item.generalMgtFee = powerCalculate(firstItem.generalMgtFee,rate.generalMgtFeeRate,index,item.generalMgtFee);
        item.marketingExpense = powerCalculate(firstItem.marketingExpense,rate.marketingExpenseRate,index,item.marketingExpense);
        item.wagesRelatedCost = powerCalculate(firstItem.wagesRelatedCost,rate.wagesRelatedCostRate,index,item.wagesRelatedCost);
        item.mgtFee = powerCalculate(firstItem.mgtFee,rate.mgtFeeRate,index,item.mgtFee);
        item.chargeOff = powerCalculate(firstItem.chargeOff,rate.chargeOffRate,index,item.chargeOff);
        item.depreciation = powerCalculate(firstItem.depreciation,rate.depreciationRate,index,item.depreciation);
        item.otherFee = powerCalculate(firstItem.otherFee,rate.otherFeeRate,index,item.otherFee);
        item.totalFee = addNumber([  item.landValueTax,
            item.publicConsumptionFee,
            item.maintenanceFee,
            item.generalMgtFee,
            item.marketingExpense,
            item.wagesRelatedCost,
            item.mgtFee,item.chargeOff,item.depreciation,item.otherFee],"-");

        // 计算税
        item.housePropertyTax = powerCalculate(firstItem.housePropertyTax,rate.housePropertyTaxRate,index,item.housePropertyTax);
        item.businessTax = powerCalculate(firstItem.businessTax,rate.businessTaxRate,index,item.businessTax );
        item.otherTax = powerCalculate(firstItem.otherTax,rate.otherTaxRate,index,item.otherTax);
        item.totalTax = addNumber([item.housePropertyTax,item.businessTax,item.otherTax],"-");

        // 计算 noi
        var totalCost = addNumber([item.totalFee,item.totalTax],"-");
        item.noi = subtractNumber(item.totalIncome,totalCost,"-");
    });
}

/* ======================================== 投资收益的测试指标 ======================================== */
function getCashFlowRangeList($scope,year){
    var result = [];
    $scope.preTaxCashFlowRecords.forEach(function(item,index){
        if(index+1>year){
            return;
        }
        var preTaxCashFlow = item.preTaxCashFlow;
        if(isNumber(preTaxCashFlow)){
            result.push(preTaxCashFlow);
        }

    });
    return result;
}
// 获取指定年的销售价格
function getSaleIncomeAnalysisItemForSpecialYear($scope,year){
    var result = {};
    $scope.saleIncomeAnalysisRecords.forEach(function(item){
        if(item.year==year){
            result = item;
        }
    });
    return result;
}

// 获取税前现金流
function getPreTaxCashFlowItemForSpecialYear($scope,year){
    var result = null;

    $scope.preTaxCashFlowRecords.forEach(function(item){
        if(year==item.year){
            result = item;
        }
    });

    return result;
}

/**
 * 重新设置 投资收益的测试指标
 * @param $scope
 */
function resetTestIndexRecords($scope){
    var result = [];
    var loanYear = $scope.initialAnalysis.loanYear;
    var loan = $scope.initialAnalysis.loan;
    var loanRate = $scope.initialAnalysis.loanRate;

    $scope.incomeExpense.contents.forEach(function(item,index){
        if(index==0){ // 不需要第一年
            return;
        }
        var year = index+1;
        var saleIncomeAnalysisItem = getSaleIncomeAnalysisItemForSpecialYear($scope,year);
        /* 获取增值 */
        var salePrice = saleIncomeAnalysisItem.salePrice; // 销售价格
        var saleCost = saleIncomeAnalysisItem.saleCost; // 销售价格

        var purchasingPrice = $scope.initialAnalysis.purchasingPrice;

        var capitalExportArr = [];
        $scope.incomeExpense.contents.forEach(function(subItem,ind){
            if(ind>index){
                return;
            }
            capitalExportArr.push(subItem.capitalExport);
        });
        var totalCapitalExport = addNumber(capitalExportArr,"-");
        totalCapitalExport = addNumber([totalCapitalExport,purchasingPrice],"-");

        var appreciation = subtractNumber(salePrice,totalCapitalExport,"-");

        if(!appreciationAvailable(salePrice,purchasingPrice,capitalExportArr)){appreciation="-";} // 判断增值是否可计算

        /* 净现值 */
        var netPresentValue = "-";

        var initialBenefit = getValue($scope.initialAnalysis.initialBenefit,"-");// 初始投资
        var benefitRate = getValue($scope.parameterInfo.benefitRate,"-"); // 折现率
        var cashFlowList = getCashFlowRangeList($scope,year);
        var netSalesIncome = saleIncomeAnalysisItem.netSalesIncome; // 净销售所得

        var currentCashFlow = null; // 当年现金流
        if(cashFlowList.length>0){
            currentCashFlow = cashFlowList[cashFlowList.length-1];

            cashFlowList[cashFlowList.length-1] = addNumber([cashFlowList[cashFlowList.length-1],netSalesIncome],null);
        }
        if(isNumber(initialBenefit)&&isNumber(benefitRate)){
            var params = ","+cashFlowList.join(",");
            try{
                netPresentValue = eval("new Finance().NPV("+benefitRate+","+(-1*initialBenefit)+params+")");
            }catch(e){console.log(e);}
        }

         if(!netPresentValueAvailable($scope,year)){console.log("netPresentValue:"+netPresentValue);netPresentValue="-";} // 判断净现值是否可计算

        /* irr */
        var irrPercent = "-";
        if(isNumber(initialBenefit)){
            try{
                var params = ","+cashFlowList.join(",");
                irrPercent = eval("new Finance().IRR("+(-1*initialBenefit)+params+")")+"%";
            }catch(e){
                console.log(e);
            }
        }
          if(!irrAvailable($scope,year)){irrPercent="-";} // 判断IRR是否可计算

        /* 税前现金流/权益 */
        var rate = "-";
        if(isNumber(currentCashFlow)&&isNumber(netSalesIncome)&&netSalesIncome!=0){
            try{
                rate = (parseFloat(currentCashFlow)/parseFloat(netSalesIncome)*100).toFixed(2)+"%";
            }catch(e){console.log(e);}
        }
        var preTaxCashFlowItem = getPreTaxCashFlowItemForSpecialYear($scope,year);
        if(!rateAvailable(preTaxCashFlowItem.income,saleCost,loanYear,loan,loanRate,salePrice,currentCashFlow,netSalesIncome)){rate="-";} // 判断Rate是否可计算

        result.push({yearIndex:year,appreciation:appreciation,netPresentValue:netPresentValue,irrPercent:irrPercent,rate:rate});
    });
    $scope.testIndexRecords = result;
}

/* ======================================== 贷款还款 ======================================== */
/**
 * 重设 贷款还款
 * @param $scope
 */
function resetLoanRepaymentAnalysis($scope){
    var loanYear = $scope.initialAnalysis.loanYear; // 贷款年数
    var nper = loanYear*12; // 还款总周期数
    var pv = $scope.initialAnalysis.loan; // 贷款总额
    var yearRate = $scope.initialAnalysis.loanRate/100;
    if(!isNumber(loanYear)||!isNumber(nper)||!isNumber(pv)||!isNumber(yearRate)||loanYear<1){
        return;
    }
    var result = [];
    var payedPPMT =0; // 已支付的贷款本金
    for(var i=1;i<=loanYear;i++){
        var year = i;
        var yearPmt = 0;
        var yearIpmt = 0;
        var yearPpmt = 0;
        for(var index = 1;index<=12;index++){
            var per = (year-1)*12+index;


            yearPmt += pmt(yearRate/12,nper,pv)*(-1);
            yearIpmt += ipmt(yearRate/12,per,nper,pv)*(-1);

            yearPpmt += ppmt(yearRate/12,per,nper,pv)*(-1);
        }
        payedPPMT+=yearPpmt;

        var leavePpmt = pv-payedPPMT; // 剩余贷款本金


        result.push({year:year,pmt:yearPmt,ipmt:yearIpmt,ppmt:yearPpmt,leavePpmt:leavePpmt});
    }

    $scope.loanRepaymentAnalysis = result;
}