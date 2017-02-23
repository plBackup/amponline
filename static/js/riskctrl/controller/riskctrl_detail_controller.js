ampApp.controller("ctrl-detail",["$scope","$http","$rootScope",function($scope,$http,$rootScope){
	$scope.collapseTable = function(item) {
		if(item.hasCollapseBtn) {
			item.collapsed = !item.collapsed;
			var groupId = item.dataGroup;

			$scope.cost[$scope.costType].forEach(function(itemRecord) {
				if(groupId == itemRecord.dataGroup && !itemRecord.hasCollapseBtn) {
					itemRecord.hide = !itemRecord.hide;
					if(!itemRecord.hide){
						$("#riskctrl-detail #cost .risk-detail-table-1 tbody tr:nth-child(2) td:first-child").addClass("btn-up");
					}else{
						$("#riskctrl-detail #cost .risk-detail-table-1 tbody tr:nth-child(2) td:first-child").removeClass("btn-up");
					}
					
				}
			});
			$scope.salesvolume[$scope.saleType].forEach(function(itemRecord) {
				if(groupId == itemRecord.dataGroup && !itemRecord.hasCollapseBtn) {
					itemRecord.hide = !itemRecord.hide;
					if(!itemRecord.hide){
						$("#riskctrl-detail #salesvolume .risk-detail-table-2 tbody tr:nth-child(2) td:first-child").addClass("btn-up");
					}else{
						$("#riskctrl-detail #salesvolume .risk-detail-table-2 tbody tr:nth-child(2) td:first-child").removeClass("btn-up");
					}
				}
			});
			$scope.efficient[$scope.efficientType].forEach(function(itemRecord) {
				if(groupId == itemRecord.dataGroup && !itemRecord.hasCollapseBtn) {
					itemRecord.hide = !itemRecord.hide;
					if(!itemRecord.hide && groupId==1){
						$("#riskctrl-detail #efficient .risk-detail-table-2 tbody tr:nth-child(2) td:first-child").addClass("btn-up");
					}else if(itemRecord.hide && groupId==1){
						$("#riskctrl-detail #efficient .risk-detail-table-2 tbody tr:nth-child(2) td:first-child").removeClass("btn-up");
					};
					if(!itemRecord.hide && groupId==2){
						$("#riskctrl-detail #efficient .risk-detail-table-2 tbody tr:nth-child(10) td:first-child").addClass("btn-up");
					}else if(itemRecord.hide && groupId==2){
						$("#riskctrl-detail #efficient .risk-detail-table-2 tbody tr:nth-child(10) td:first-child").removeClass("btn-up");
					};
				}
			});
		}
	};

    		$scope.collectionrate =[];
     		$scope.cost = [];
      		$scope.efficient = [];
       		$scope.investment = [];
        	$scope.passenger =[];
        	$scope.records =[];
        	$scope.salesvolume =[];
    		$scope.lease =[];	
    		$scope.chart =[];

    function initializeData(data){
        $scope.records = data;
        
    }
	function createPassengerFlowChart(){
		var myChart = echarts.init(container.find("#leasechart")[0]);

    // 指定图表的配置项和数据 
        var option = {
            color: ["#5AB46E", "#5CD3F5"],
            tooltip:{show:true},
            legend: {
                orient: 'horizontal', // 'vertical'
                x: 'right', // 'center' | 'left' | {number},
                y: 'top', // 'center' | 'bottom' | {number}
                borderWidth: 0,
                padding: 5,    // [5, 10, 15, 20]
                itemGap: 10,
                itemWidth: 15,
                temHeight: 10,
                textStyle: {color: '#9EA8B5'},

                data: [
                    {name: "租金（万元）", icon: "rect"},
                    {name: "面积（m²）", icon: "rect"},
                ]
            },


 xAxis: {
            type: 'category',
            axisLine: {show: true, lineStyle: {color: "#f3f4f8"}},
            axisLabel: {show: true, textStyle: {color: "#737e8c"}},
            splitLine: {show: false},
            axisTick: {show: false},
            data: ['2016', '2017', '2018', '2019', '2020', '2020后']

            },
        yAxis: {
        	type: 'value',
                axisTick: {show: false},
                splitLine: {show: false},
                axisLabel: {show: false},
                axisLine: {show: false}
        	
        },
        series: [{
        	 label:{normal:{show:true,position:"top",textStyle:{color:"#373c42"}}},
            barWidth:"20",
            name: '租金（万元）',
            type: 'bar',
            data:[parseInt(1777/10000),parseInt(157771/10000),parseInt(5248804/10000),parseInt(18017489/10000),parseInt(38174069/10000),parseInt(17235143/10000)]
        },
        {
        	label:{normal:{show:true,position:"top",textStyle:{color:"#373c42"}}},
            barWidth:"20",
            name: '面积（m²）',
            type: 'bar',
            data: [ 2029,47,2343,9149,24203,17467 ]
        }
        
        ]
        };


        myChart.setOption(option);
    }
    /* ======================================== 监听广播事件 ======================================== */

	
	 
    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    function initPageView(){
       container = $("#riskctrl-detail");
        createPassengerFlowChart();
    }
    /* ======================================== 绑定事件 ======================================== */
    
    /* ======================================== common methods ======================================== */

    // 初始化
    var url = "../static/js/riskctrl/data/riskctrl_detail_data.json";
    function init(){
        
        $http.get(url).success(function(result){
            initializeData(result);
            initPageView();

            $scope.collectionrate =result.collectionrate;
     		$scope.cost = result.cost;
      		$scope.efficient = result.efficient;
       		$scope.investment = result.investment;
        	$scope.passenger =result.passenger;
        	$scope.records =result.records;
        	$scope.salesvolume =result.salesvolume;
			$scope.lease =result.lease;
			$scope.chart = result.chart;
        });
    }
    init();
    $scope.costType="Budget";
    $scope.collectType="Budget";
    $scope.saleType="Budget";
    $scope.efficientType="Budget";
    $scope.passengerType="Budget";
    $scope.investmentType="Budget";
    $scope.setType=function(type,model){
    	switch(model){
    		case "collectionrate":
    		$scope.collectType=type;
    			break;
    		case "salesvolume":
    		$scope.saleType=type;
    			break;	
    		case "efficient":
    		$scope.efficientType=type;
    			break;	
    		case "investment":
    		$scope.investmentType=type;
    			break;		
    		case "passenger":
    		$scope.passengerType=type;
    			break;		
    		case "cost":
    			$scope.costType=type;
    			break;
    			
    		default:
    			return;
    	}
    }
       $scope.setStyleText = function(a){
            if(a>=0){
                return 'text-red'
            }else{
                return 'text-green'
            }
            
    }
    $scope.setStyleIcon = function(a,b){
            if(a>b){
                return 'arrow-up'
            }else if(a<b){
                return 'arrow-down'
            }else{
            	return 'padding-right'
            }
            
    }
    $scope.setFont = function(td){
    	if(td){
    		return "text-bold"
    	}
    	
    }
    
}]);
	

