var ctrl_module=(function($,cm){
	var ctrl_module=cm;
	ctrl_module.init=function(){
//		var bodywidth=parseInt($("#riskctrl").css("width"));
//		var tablewidth=(bodywidth-40)/2;
//		$(".risk-roi>div").css("width",tablewidth+"px");
          
	}
	return ctrl_module;
})(jQuery,ctrl_module||{})



ampApp.controller("riskctrl_controller",["$scope","$http","$rootScope",function($scope,$http,$rootScope){
	 	var vm = $scope.vm = {};
        vm.value = 3/8*100;
        vm.style = 'progress-bar-success';
        vm.showLabel = false;
        vm.striped = false;
    	$scope.records = [];
     	$scope.noi = [];
      	$scope.roi = [];
       	$scope.roe = [];
        $scope.records = [];  
    function initializeData(data){
        $scope.records = data;
    }

    /* ======================================== 监听广播事件 ======================================== */

	 
    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    function initPageView(){
       container = $("#riskctrl");
       
    }
    /* ======================================== 绑定事件 ======================================== */

    /* ======================================== common methods ======================================== */
 

    
    // 初始化
    var url = "../static/js/riskctrl/data/riskctrl_data.json";
    function init(){
        $http.get(url).success(function(result){
            initializeData(result);
            initPageView();
            $scope.records =result.records;
     		$scope.noi = result.noi;
      		$scope.roi = result.roi;
       		$scope.roe = result.roe;
        	$scope.forecast =result.forecast;
    
        });
    }
    init();
    $scope.noiType="NoiBudget";
    $scope.setType=function(type,model){
    	switch(model){
    		case "recodes":
    			break;
    			
    		case "noi":
    			$scope.noiType=type;
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
                return 'arrow-up';
            }else if(a<b){
                return 'arrow-down';
            }else{
            	return 'padding-right'
            }
            
    }
	

ctrl_module.init();
}]);
		

          