function isAvailable(checkList){
    var available  = true;
    for(var i=0;i<checkList.length;i++){
        var item = checkList[i];
        if(!isNumber(item)){
            available = false;
        }
    }

    return available;
}
/**
 * 是否可以计算增值
 */
function appreciationAvailable(salePrice,purchasingPrice,capitalExportArr){
    var checkList = [];

    checkList.push(salePrice);
    checkList.push(purchasingPrice);
    // scheckList = checkList.concat(capitalExportArr);

    
    var available = isAvailable(checkList);


    return available;
}

/**
 * 净现值是否可以计算
 */
function netPresentValueAvailable($scope,year){
    var checkList = [];
    checkList.push($scope.initialAnalysis.initialBenefit);// 初始投资
    checkList.push($scope.parameterInfo.benefitRate);// 折现率

    var saleIncomeAnalysisItem = getSaleIncomeAnalysisItemForSpecialYear($scope,year); // 销售所得分析
    checkList.push(saleIncomeAnalysisItem.salePrice);
    // checkList.push(saleIncomeAnalysisItem.saleCost);
    checkList.push(saleIncomeAnalysisItem.loanBalance);
    checkList.push(saleIncomeAnalysisItem.netSalesIncome);

    $scope.preTaxCashFlowRecords.forEach(function(item,index){
        if(index+1>year){
            return;
        }
        checkList.push(item.income);
        checkList.push(item.loanAmount);
        checkList.push(item.loanInterest);
        // checkList.push(item.charges);
        checkList.push(item.preTaxCashFlow);
    });

    var available = isAvailable(checkList);
    return available;
}

/**
 * 判断 IRR 是否可以计算
 * @param $scope
 * @param year
 * @returns {boolean}
 */
function irrAvailable($scope,year){
    var checkList = [];
    checkList.push($scope.initialAnalysis.initialBenefit);// 初始投资

    var saleIncomeAnalysisItem = getSaleIncomeAnalysisItemForSpecialYear($scope,year); // 销售所得分析
    checkList.push(saleIncomeAnalysisItem.salePrice);
    // checkList.push(saleIncomeAnalysisItem.saleCost);
    checkList.push(saleIncomeAnalysisItem.loanBalance);
    checkList.push(saleIncomeAnalysisItem.netSalesIncome);

    $scope.preTaxCashFlowRecords.forEach(function(item,index){
        if(index+1>year){
            return;
        }
        checkList.push(item.income);
        checkList.push(item.loanAmount);
        checkList.push(item.loanInterest);
        // checkList.push(item.charges);
        checkList.push(item.preTaxCashFlow);
    });

    var available = isAvailable(checkList);
    return available;
}

function rateAvailable(noi,saleCost,loanYear,loan,loanRate,salePrice,currentCashFlow,netSalesIncome){
    var checkList = [];
    checkList.push(noi);
    // checkList.push(saleCost);
    checkList.push(salePrice);
    //checkList.push(loanYear);
    //checkList.push(loan);
    //checkList.push(loanRate);
    checkList.push(currentCashFlow);
    checkList.push(netSalesIncome);
    var available = isAvailable(checkList);
    return available;
}

