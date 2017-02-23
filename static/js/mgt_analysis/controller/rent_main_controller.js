ampApp.controller("rent-main-controller",["$scope","$http","$rootScope","$filter",function($scope,$http,$rootScope,$filter){
    $scope.records = [];

    $scope.saleRatePie = [];

    $scope.squareRatePie = [];

    $scope.rentList = [];

    $scope.investmentList = [];

    var collapseTableCommercialType = [];
    var collapseTableFloor = [];
    $scope.collapseTable=[]; //


    function initializeData(data){
        $scope.records = data.records;
        $scope.saleRatePie = data.saleRatePie;
        $scope.squareRatePie = data.squareRatePie;
        $scope.rentList = data.rentList;
        $scope.investmentList = data.investmentList;
        collapseTableCommercialType = data.collapseTableCommercialType;
        collapseTableFloor = data.collapseTableFloor;
        $scope.collapseTable = collapseTableCommercialType;

        $scope.hasRentedSquare = parseFloat($scope.collapseTable[$scope.collapseTable.length-1].rentSquare);
        $scope.notRentedSquare = parseFloat($scope.collapseTable[$scope.collapseTable.length-1].totalRentSquare)-parseFloat($scope.collapseTable[$scope.collapseTable.length-1].rentSquare);
        $scope.rentContractCount = parseFloat($scope.collapseTable[$scope.collapseTable.length-1].rentCount);
    }

    /* ======================================== 监听广播事件 ======================================== */
    $scope.$on("$destroy",function(){destroy();});



    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    var pin = null;
    function initPageView(){
        container = $("#rent-main");

        var width = $(container).find(".dept-table-head").outerWidth();
        $(container).find(".dept-table-head").css("width",width+"px");
        
        pin = $(container).find(".dept-table-head").pin({
            containerSelector: $(container).find(".rent-main-pin-wrapper"),
            padding: {top: 44, bottom: 0}
        });

        setTimeout(function(){
            pin.refresh();
        },500);

        // 设置浮动条宽度
        var deptTableHeadWidth = $(container).find(".dept-table-head").css("width");
        $(container).find(".dept-table-head").css("width",deptTableHeadWidth);


        createSalePercentPie();
        createMerchantPercentPie();
        createLeaseExpiredBarChart();

        createInvestmentLineChart();


    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){

        container.on("click",".amp-rent-btn-group a",function(e){
            e.stopPropagation();
            e.preventDefault();
            $(this).parent().find("a").removeClass("active");
            $(this).addClass("active");

            var dataName = $(this).attr("data-name");
            if(dataName=="commercial-type"){
                $scope.collapseTable = collapseTableCommercialType;
            }else if(dataName=="floor"){
                $scope.collapseTable = collapseTableFloor;
            }
            $scope.$apply();
        });

        container.on("click", ".collapsed-record", function (e) {
            e.stopPropagation();
            e.preventDefault();

            var dataId = $(this).attr("data-id");

            $(this).closest("table").find("[data-parent-id="+dataId+"]").each(function(){
                $(this).toggleClass("amp-display-hide");
                if($(this).find("td:first-child").hasClass("padding-level-2")){
                    var subDataId = $(this).attr("data-id");
                    $(this).closest("table").find("[data-parent-id="+subDataId+"]").addClass("amp-display-hide");
                    $(this).find("a.collapse-btn").removeClass("collapsed");
                }
            });

            $(this).find("a.collapse-btn").toggleClass("collapsed");

            pin.refresh();
        });

        container.on("click",".assets-table.amp-table-2 tr:not(.collapsed-record) td:first-child",function(e){
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
    function destroy(){}

    /* ======================================== common methods ======================================== */
    var pieColorArr = ["#0389db","#00b1f0","#2bdadb","#f3f3f3","#a6ed66","#dcf8a1","#47e6a7","#3d4d5f"];
    function createSalePercentPie() {
        var chartContainer = $(container).find(".rent-income-percent-pie-chart .amp-chart-content");
        var myChart = echarts.init(chartContainer[0]);
        var option = {
            color:pieColorArr,
            tooltip:{show:true,formatter:"{b} : {d}%"},
            series: [
                {
                    type:"pie",
                    radius: ["70px", "100px"],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {show: false}
                    },
                    startAngle:90,
                    data: $scope.saleRatePie,
                    hoverAnimation:false
                }
            ]
        };

        myChart.setOption(option);

        chartContainer.append("<div class='pie-text'>收入占比<br/>(租金收入)</div>");
    }

    function createMerchantPercentPie() {
        var chartContainer = $(container).find(".square-percent-pie-chart .amp-chart-content");
        var myChart = echarts.init(chartContainer[0]);
        var option = {
            color:pieColorArr,
            tooltip:{show:true,formatter:"{b} : {d}%"},
            series: [
                {
                    type:"pie",
                    radius: ["70px", "100px"],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {show: false}
                    },
                    startAngle:90,
                    data: $scope.squareRatePie,
                    hoverAnimation: false
                }
            ]
        };

        myChart.setOption(option);

        chartContainer.append("<div class='pie-text'>面积占比<br/>(计租面积)</div>");
    }

    function createLeaseExpiredBarChart(){
        var chartContainer = $(container).find(".lease-expired-bar-chart .amp-chart-content");
        var myChart = echarts.init(chartContainer[0]);

        // 指定图表的配置项和数据
        var option = {
            color:["#5cd4f4","#5ab46d"],
            grid: {
                top:"40",
                left: "0",
                right: "0",
                bottom: "40",
                containLabel: false
            },
            xAxis: [
                {
                    type: "category",
                    data: ["2016","2017","2018","2019","2020","2020后"],
                    axisLine:{show:true,lineStyle:{color:"#dee6eb"}},
                    axisTick:{show:false},
                    splitLine:{show:false},
                    axisLabel:{show:true,textStyle:{color:"#8592a3"}}
                }
            ],
            yAxis: [
                {
                    type: "value",
                    axisTick:{show:false},
                    axisLine:{show:false},
                    axisLabel:{show:false},
                    splitLine:{show:false}
                }
            ],
            series: [
                {
                    label:{normal:{show:true,position:"top",textStyle:{color:"#373c42"},formatter:function(params){
                        return $filter("number")(params.value);
                    }}},
                    name:"租金",
                    type:"bar",
                    barGap:"40%",
                    barWidth:20,
                    data:[parseInt(1777/10000),parseInt(157771/10000),parseInt(5248804/10000),parseInt(18017489/10000),parseInt(38174069/10000),parseInt(17235143/10000)]
                },
                {
                    label:{normal:{show:true,position:"top",textStyle:{color:"#373c42"},formatter:function(params){
                        return $filter("number")(params.value);
                    }}},
                    name:"面积",
                    type:"bar",
                    barWidth:20,
                    data:[ 2029,47,2343,9149,24203,17467 ]
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }

    function createInvestmentLineChart(){
        var rentRate_opt = {
            grid: {
                top:"40",
                left: "50",
                right: "20",
                bottom: "40",
                containLabel: false
            },
            xAxis: [
                {
                    boundaryGap:false,
                    type: 'category',
                    data: [" ","7月", "8月", "9月", "10月", "11月", "12月"],
                    axisTick: {show: false},
                    axisLine: {
                        show:false
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {color: "#eaeaea"}
                    },
                    axisLabel:{textStyle:{fontSize:14,color:"#8592a3"}}
                }
            ],
            yAxis: [
                {
                    max:500,
                    type: 'value',
                    axisTick: {
                        show: false,
                        alignWithLabel: true
                    },
                    axisLine: {
                        show:false
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {color: "#eaeaea"}
                    },

                    axisLabel:{
                        formatter:function(value){
                            if(value==0){
                                return "";
                            }
                            return (value+"").replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
                        },
                        textStyle:{fontSize:14,color:"#8592a3"}
                    }
                }

            ],
            series: [
                {
                    type: 'line',
                    symbolSize:6,
                    lineStyle: {normal: {color: "#5ab46e"}},
                    itemStyle: {normal: {color: "#5ab46e",borderWidth:2}},
                    data: [,160, 250, 220,350,380,]
                },
                {
                    type: 'line',
                    symbolSize:6,
                    lineStyle: {normal: {color: "#5ab46e", type: "dashed"}},
                    itemStyle: {normal: {color: "#5ab46e",borderWidth:2}},
                    data: [,, ,   , , 380, 360]
                },
                {
                    type: 'line',
                    silent: true,
                    tooltip: {
                        show: false
                    },
                    data: [],
                    markLine: {
                        symbol: 'circle',
                        silent: true,
                        symbolSize: 5,
                        label: {
                            normal: {
                                show: true,
                                position: 'middle',
                                formatter: '{b}'
                            }
                        },
                        lineStyle: {
                            normal: {
                                color: "#8493a3",
                                width: 1,
                                type: "solid"
                            }
                        },
                        data: [
                            [
                                {
                                    name: "7月平均线",
                                    coord: [1, 200]
                                },
                                {
                                    coord: [2, 200]
                                }
                            ],
                            [
                                {
                                    name: "8月平均线",
                                    coord: [2, 300]
                                },
                                {
                                    coord: [3, 300]
                                }
                            ],
                            [
                                {
                                    name: "9月平均线",
                                    coord: [3, 200]
                                },
                                {
                                    coord: [4, 200]
                                }
                            ],
                            [
                                {
                                    name: "10月平均线",
                                    coord: [4, 300]
                                },
                                {
                                    coord: [5, 300]
                                }
                            ],
                            [
                                {
                                    name: "11月平均线",
                                    coord: [5, 400]
                                },
                                {
                                    coord: [6, 400]
                                }
                            ]
                        ]
                    }//markline
                }
            ]
        };


        var chartContainer = $(container).find(".investment-line-chart .amp-chart-content");
        var myChart = echarts.init(chartContainer[0]);
        myChart.setOption(rentRate_opt)
    }


    // 初始化
    function init(){
        var projectId = $rootScope.curProject;
        var url = "../static/js/mgt_analysis/data/"+projectId+"/rent_main_data.json";
        $http.get(url).success(function(result){
            initializeData(result);
            initPageView();
            bindPageEvents();
        });
    }


    init();




}]);



