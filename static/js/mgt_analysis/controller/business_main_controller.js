ampApp.controller("business-main-controller",["$scope","$filter","$http","$rootScope",function($scope,$filter,$http,$rootScope){

    var rentData = [];
    var propertyData = [];
    $scope.records = rentData;
    $scope.dataType = "租金";
    $scope.deductRentStoreRateTable = [];

    function initializeData(data){
        rentData = data.rentData;
        propertyData = data.propertyData;
        $scope.records = rentData;
        $scope.dataType = "租金";

        $scope.deductRentStoreRateTable = data.deductRentStoreRateTable;
    }



    /* ======================================== 监听广播事件 ======================================== */

    $scope.$on("business-main.query",function(event,params){
        if(params.businessType=="租金"){
            $scope.records = rentData;
        }else if(params.businessType=="物管费"){
            $scope.records = propertyData;
        }
        $scope.dataType = params.businessType;
        createRentIncomeBarChart();



        $scope.$apply();
    });

    $scope.$on("$destroy",function(){destroy();});


    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    var pin = null;
    function initPageView(){
        container = $("#business-main");
        createRentIncomeBarChart();
        createDeductRentStoreRateChart();

        var width = $(container).find(".dept-table-head").outerWidth();
        $(container).find(".dept-table-head").css("width",width+"px");

        pin = $(container).find(".dept-table-head").pin({
            containerSelector: $(container).find(".cost-manual-work-pin-wrapper"),
            padding: {top: 44, bottom: 0}
        });

        setTimeout(function(){
            pin.refresh();
        },500);
    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){
        container.on("click",".parent-record",function(e){
            e.stopPropagation();
            e.preventDefault();

            var group = $(this).attr("data-group");
            $(container).find("tr[data-group=" + group + "]:not(.parent-record)").toggleClass("amp-display-hide");
            $(this).find("a.collapse-btn").toggleClass("collapsed");
        });

        container.on("click",".table-block tbody tr:not(.parent-record,.empty-record) td:first-child",function(e){
            e.stopPropagation();
            e.preventDefault();
            var type = $(this).attr("data-type");
            if(type=="餐饮"){
                type = "catering";
            }else if(type=="配套"){
                type = "mating";
            }else if(type=="服装"){
                type = "clothing";
            }else if(type=="儿童"){
                type = "children";
            }else if(type=="影院"){
                type = "cinema";
            }else{
                return;
            }

            globalStorage.setSessionData("select_commercial_type",type);

            window.location="#/business_merchant_list";
        });
    }

    /* ======================================== common methods ======================================== */
    function destroy(){
    }

    function createRentIncomeBarChart(){
        // 基于准备好的dom，初始化echarts实例
        var id = "rent-income-bar-chart";
        var myChart = echarts.init(document.getElementById(id));

        var labels = [];
        var data = [];

        $scope.records.forEach(function(item){
            if(item.hide==true){
                labels.push(item.commercialType);
                data.push(item.curOfficialReceipts);
            }
        });

        // 指定图表的配置项和数据
        var option = {
            color:["#5ab46e"],
            grid: {
                top:"20",
                left: "0",
                right: "0",
                bottom: "0",
                containLabel: true
            },
            tooltip:{show:true,formatter:function(params){
                return params.name+" : "+$filter("numberFormatDefault")(params.value,2);
            }},
            xAxis: [
                {
                    axisLabel:{textStyle:{color:"#8592a3"}},
                    type: "category",
                    data:labels ,
                    axisLine:{
                        show:false
                    },
                    axisTick:{
                        show:false
                    },
                    splitLine:{
                        show:false
                    }
                }
            ],
            yAxis: [
                {
                    axisLabel:{textStyle:{color:"#8592a3"}},
                    type: "value",
                    axisTick:{
                        show:false
                    },
                    axisLine:{
                        show:false
                    },
                    splitNumber:3
                }
            ],
            series: [
                {
                    name:"实际收入",
                    type:"bar",
                    barWidth:24,
                    data:data
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }

    function createDeductRentStoreRateChart(){
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init($(container).find(".deduct-rent-store-rate-block .chart-block")[0]);

        var labels = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];
        var data1 = [0,0,7,0,0,2,2,2,2,3,3,17];
        var data2 = [19,19,12,19,19,17,17,17,17,16,16,4];
        var data3 = [];
        var minValue = data1[0];
        for(var i=0;i<12;i++){

            data3.push(data1[i]+data2[i]);

            if(data1[i]<minValue){
                minValue = data1[i];
            }
            if(data2[i]<minValue){
                minValue = data2[i];
            }
        }

        minValue=2;

        // 指定图表的配置项和数据
        var option = {
            color:["#627d9b","#00b1f0","transparent"],
            grid: {
                top:"30",
                left: "50",
                right: "35",
                bottom: "20",
                containLabel: true
            },
            tooltip:{
                show:true
            },
            xAxis: [
                {
                    axisLabel:{textStyle:{color:"#8592a3"}},
                    type: "category",
                    data:labels,
                    axisLine:{
                        show:false
                    },
                    axisTick:{
                        show:false
                    },
                    splitLine:{
                        show:false
                    }
                }
            ],
            yAxis: [
                {
                    axisLabel:{textStyle:{color:"#8592a3"}},
                    type: "value",
                    axisTick:{
                        show:false
                    },
                    axisLine:{
                        show:true,
                        lineStyle:{color:"#ccc"}
                    }
                }
            ],
            series: [

                {
                    stack:"租金",
                    name:"取到提成的提成租金商家数",
                    type:"bar",
                    barWidth:34,
                    label:{
                        normal:{
                            show:true,
                            position:"insideTop"
                        }
                    },
                    data:data2
                },
                {
                    stack:"租金",
                    name:"保底租金",
                    type:"bar",
                    barWidth:34,
                    label:{
                        normal:{
                            show:true,
                            position:"insideBottom"
                        }
                    },
                    data:data1
                },
                {
                    stack:"租金",
                    name:"合成",
                    type:"bar",
                    barWidth:34,
                    silent:true,
                    label:{
                        normal:{
                            show:true,
                            position:"insideBottom",
                            formatter:function(params){
                                var dataIndex = params.dataIndex;
                                return data3[dataIndex];
                            },
                            textStyle:{
                                color:"#333"
                            }
                        }
                    },
                    data:[minValue,minValue,minValue,minValue,minValue,minValue,minValue,minValue,minValue,minValue,minValue,minValue]
                }
            ]
        };
        console.log(minValue);
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }

    // 初始化
    function init(){
        var projectId = $rootScope.curProject;
        var url = "../static/js/mgt_analysis/data/"+projectId+"/business_main_data.json";
        $http.get(url).success(function(result){
            initializeData(result);
            initPageView();
            bindPageEvents();
        });
    }
    setTimeout(function(){
        init();
    },300)
}]);



