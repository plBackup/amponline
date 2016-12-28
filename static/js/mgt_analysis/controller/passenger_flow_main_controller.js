ampApp.controller("passenger-flow-main-controller",["$scope","$filter","$http","$rootScope",function($scope,$filter,$http,$rootScope){
    /* ======================================== 监听广播事件 ======================================== */

    $scope.info = {};
    $scope.chart = {};

    var currentMonth = new Date().getMonth();
    var prevMonth = new Date();
    prevMonth.setDate(0);

    function getCurrentYearIndexTooltip(){
        var result = 0;
        for(var i=0;i<=currentMonth;i++){
            result+=$scope.chart.real[i];
        }
        return result;
    }


    function getForecastValue(){
        var result = getCurrentYearIndexTooltip();
        for(var i=11;i>currentMonth;i--){
            result+=$scope.chart.budget[i];
        }
        return result;
    }

    function getFullYearIndex(){
        var result = 0;
        for(var i=0;i<=11;i++){
            result+=$scope.chart.budget[i];
        }
        return result;
    }

    function initializeData(data){
        $scope.info.currentMonthDayRate = parseInt(getCurrentDate() / getDayOfMonth(new Date()) * 100);

        $scope.info.currentYearDayRate = parseInt(getFinishedDayOfYear(new Date()) / getDayOfYear(new Date()) * 100);
        $scope.info.currentMonthDayTooltip = getCurrentDate() + "/" + getDayOfMonth(new Date());
        $scope.info.currentYearDayTooltip = getFinishedDayOfYear(new Date()) + "/" + getDayOfYear(new Date());

        $scope.chart = data.chart;

        $scope.info.currentMonthIndexTooltip = $scope.chart.real[currentMonth];
        $scope.info.currentMonthIndexRate = parseInt($scope.chart.real[currentMonth]/$scope.chart.budget[currentMonth]*100);
        if(isNaN($scope.info.currentMonthIndexRate)){
            $scope.info.currentMonthIndexRate = "-";
        }

        $scope.info.currentMonthCount = $scope.chart.real[currentMonth];
        $scope.info.currentYearIndexTooltip = getCurrentYearIndexTooltip();
        $scope.info.currentYearIndexRate = parseInt(getCurrentYearIndexTooltip()/getFullYearIndex()*100);
        if(isNaN($scope.info.currentYearIndexRate)){
            $scope.info.currentYearIndexRate = "-";
        }

        $scope.info.fullYearTotalCount = getCurrentYearIndexTooltip();
        $scope.info.fullYearCount = getForecastValue();
        $scope.info.linkRelative = parseInt(($scope.chart.real[currentMonth-1] - $scope.chart.real[currentMonth-2])/$scope.chart.real[currentMonth-2]*100);
        if(isNaN($scope.info.linkRelative)){
            $scope.info.linkRelative = "-";
        }
        $scope.info.yearToYear = parseInt(($scope.chart.real[currentMonth-1] - $scope.chart.lastYear[currentMonth-1])/$scope.chart.lastYear[currentMonth-1]*100);
        if(isNaN($scope.info.yearToYear)){
            $scope.info.yearToYear = "-";
        }
        $scope.info.targetRate = parseInt(($scope.chart.real[currentMonth-1])/$scope.chart.budget[currentMonth-1]*100);
        if(isNaN($scope.info.targetRate)){
            $scope.info.targetRate="-";
        }
        $scope.info.penetranceRate = $filter("number")($scope.chart.real[currentMonth-1]/data.info.square/getDayOfMonth(prevMonth));
        if(isNaN($scope.info.penetranceRate)){
            $scope.info.penetranceRate = "-";
        }


    }

    $scope.$on("$destroy",function(){destroy();});



    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    function initPageView(){
        container = $("#passenger-flow-main");

        createPassengerFlowChart();

        setTimeout(function(){
            container.find(".amp-progress-bar").each(function(){
                var value = $(this).closest(".amp-progress").attr("data-value");

                $(this).find(".amp-progress-bar-finished").css("width",value+"%");
            });
        },200);

    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){
        container.on("mouseenter",".amp-progress-bar",function(e){
            e.stopPropagation();
            e.preventDefault();
            clearTimeout(leaveTimeout);

            var tooltipWidth = parseInt(container.find(".amp-progress-tooltip").css("width"));

            var x = e.pageX-200-tooltipWidth/2;
            var y = e.pageY-44;

            var tooltip = $(this).closest(".amp-progress").attr("data-tooltip");
            container.find(".amp-progress-tooltip span").html(tooltip);
            container.find(".amp-progress-tooltip").css({
                left:x+"px",
                top:y+"px"
            });

            container.find(".amp-progress-tooltip").fadeIn("fast");
        });

        var leaveTimeout = null;
        container.on("mouseleave",".amp-progress-bar",function(e){
            e.stopPropagation();
            e.preventDefault();
            clearTimeout(leaveTimeout);
            leaveTimeout = setTimeout(function(){
                container.find(".amp-progress-tooltip").fadeOut("fast");
            },500);
        });
    }

    /* ======================================== common methods ======================================== */

    function createPassengerFlowChart(){
        var myChart = echarts.init(container.find(".passenger-flow-chart .passenger-flow-chart-content")[0]);
        var option = {
            color: ["#5AB46E", "#5CD3F5", "#038BD9"],

            tooltip:{show:true},

            legend: {
                orient: 'horizontal', // 'vertical'
                x: 'center', // 'center' | 'left' | {number},
                y: 'bottom', // 'center' | 'bottom' | {number}
                borderWidth: 0,
                padding: 5,    // [5, 10, 15, 20]
                itemGap: 20,
                itemWidth: 15,
                temHeight: 10,
                textStyle: {color: '#9EA8B5'},

                data: [
                    {name: "实际", icon: "rect"},
                    {name: "预算", icon: "rect"},
                    {name: "去年同期", icon: "rect"}

                ]
            },
            xAxis: {
                type: 'category',
                axisLine: {show: true, lineStyle: {color: "#f3f4f8"}},
                axisLabel: {show: true, textStyle: {color: "#737e8c"}},
                splitLine: {show: false},
                axisTick: {show: false},
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']

            },

            yAxis: {
                type: 'value',
                axisTick: {show: false},
                splitLine: {show: false},
                axisLabel: {show: false},
                axisLine: {show: false}
            },
            series: [
                {
                    barWidth: 10,
                    name: '实际',
                    type: 'bar',
                    data: $scope.chart.real
                },
                {
                    barWidth: 10,
                    name: '预算',
                    type: 'bar',
                    data: $scope.chart.budget
                },
                {
                    barWidth: 10,
                    name: '去年同期',
                    type: 'bar',
                    data: $scope.chart.lastYear
                }
            ]
        };


        myChart.setOption(option);
    }

    function destroy(){
    }

    function getCurrentDate(){
        return new Date().getDate();
    }

    function getDayOfMonth(d){
        var date = new Date(d);
        var month = date.getMonth();
        date.setMonth(month+1);
        date.setDate(0);
        return date.getDate();
    }

    function getFinishedDayOfYear(d){
        var month = d.getMonth();
        var year = d.getFullYear();
        var date = d.getDate();
        var result = date;
        for(var i =0;i<month;i++){
            var date = new Date();
            date.setFullYear(year);
            date.setMonth(month);
            result+=getDayOfMonth(date);
        }

        return result;
    }

    function getDayOfYear(d){
        var result = 0;
        var date = new Date(d);
        for(var i=0;i<12;i++){
            date.setMonth(i);
            result+=getDayOfMonth(date);
        }
        return result;
    }

    // 初始化
    function init(){
        var projectId = $rootScope.curProject;
        var url = "../static/js/mgt_analysis/data/"+projectId+"/passenger_flow_main_data.json";
        $http.get(url).success(function(result){
            initializeData(result);
            initPageView();
            bindPageEvents();
        });
    }
    setTimeout(function(){
        init();
    },300);

}]);



