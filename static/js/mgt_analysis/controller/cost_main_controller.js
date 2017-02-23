ampApp.controller("cost-main-controller",["$scope","$http","$rootScope",function($scope,$http,$rootScope){
    $scope.records = [];

    function initializeData(data){
        $scope.records = data;
    }

    /* ======================================== 监听广播事件 ======================================== */
    $scope.$on("$destroy",function(){destroy();});



    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    var pin = null;
    function initPageView(){
        container = $("#cost-main");

        var width = $(container).find(".amp-thead").outerWidth();
        $(container).find(".amp-thead").css("width",width+"px");

        pin = $(container).find(".amp-thead").pin({
            containerSelector: $(container).find(".amp-collapse-table"),
            padding: {top: 44, bottom: 0}
        });

        setTimeout(function(){
            pin.refresh();
        },500);


        createCostStackBarChart();

    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){

        container.on("click",".amp-table-row-content",function(e){
            e.stopPropagation();
            e.preventDefault();
            window.location="#/cost_manual_work";
        });
    }

    /* ======================================== common methods ======================================== */
    function destroy(){}

    function getMonths(){
        //var months = [];
        //var date = new Date();
        //var month = date.getMonth()+1;
        //for(var i = month-6;i<month;i++){
        //    months.push(i);
        //}
        //return months;
        return [8,9,10];
    }

    function getLabels(){
        var labels = [];
        getMonths().forEach(function(item){
            labels.push(item+"月");
        });
        return labels
    }

    function getData(key){
        var months = getMonths();
        var minMonth = months.shift();
        var maxMonth = months.pop();

        var result = [];
        $scope.records.forEach(function(item){
            var month = parseInt(item.month);
            if(month<minMonth||month>maxMonth){
                return;
            }
            var value = parseFloat(item[key]);
            result.push(value);
        });
        return result;
    }


    function createCostStackBarChart(){
        // 基于准备好的dom，初始化echarts实例
        var id = "cost-stack-bar-chart";
        var myChart = echarts.init(document.getElementById(id));

        var data1=getData("businessReal");
        console.log(data1);
        var data2=getData("manualWorkReal");
        var data3=getData("mgtFeeReal");
        var data4=getData("projecteal");
        var labels = getLabels();
        console.log(labels);

        // 指定图表的配置项和数据
        var option = {
            color:["#2bd9dd","#038bd8","#a5ee67","#00b2ef"],
            grid: {
                top:"20",
                left: "0",
                right: "0",
                bottom: "0",
                containLabel: true
            },
            tooltip : {
                padding:[5,12],
                position: 'top',
                formatter:function(params){
                    var value = params.value;
                    var seriesName = params.seriesName;
                    var dataIndex = params.dataIndex;
                    var totalValue = data1[dataIndex]+data2[dataIndex]+data3[dataIndex]+data4[dataIndex];
                    var percent = parseInt(value/totalValue*100);
                    if(isNaN(percent)){
                        percent="-";
                    }else{
                        percent+="%";
                    }
                    var result = seriesName+"<br/>金额 : "+value+"<br/>"+"占比 : "+percent;
                    return result;
                }
            },
            xAxis: [
                {
                    axisLabel:{textStyle:{color:"#8592a3"}},
                    type: "category",
                    data: labels,
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
                    minInterval:30,
                    splitLine:{show:true,lineStyle:{color:["#f2f5f7"]}}
                }
            ],
            series: [
                {
                    stack:"总量",
                    name:"营销",
                    type:"bar",
                    barWidth:30,
                    data:data1
                },
                {
                    stack:"总量",
                    name:"人工",
                    type:"bar",
                    barWidth:30,
                    data:data2
                },
                {
                    stack:"总量",
                    name:"管理",
                    type:"bar",
                    barWidth:30,
                    data:data3
                },
                {
                    stack:"总量",
                    name:"工程",
                    type:"bar",
                    barWidth:30,
                    data:data4
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }

    // 初始化
    function init(){
        var projectId = $rootScope.curProject;
        var url = "../static/js/mgt_analysis/data/"+projectId+"/cost_main_data.json";
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



