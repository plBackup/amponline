ampApp.controller("simulation-calculation-main-controller",["$scope","$http","$rootScope",function($scope,$http,$rootScope){
    var projectId = $rootScope.curProject;
    var CASE_INFO_KEY = "PROJECT_"+projectId+"_CASE_INFO_";// 案例信息
    var LAST_CASE_SEQUENCE = "PROJECT_"+projectId+"_LAST_CASE_SEQUENCE";// 最新的case sequence
    var CURRENT_CASE_ID = "PROJECT_"+projectId+"_CURRENT_CASE_ID";// 当前 case id
    var CURRENT_CASE_NAME = "PROJECT_"+projectId+"_CURRENT_CASE_NAME";// 当前 case name



    $scope.records = [];

    $scope.hideAdd = false;

    function initializeData(data){
        var result = [];

        data.forEach(function(item){
            var caseId = item.caseId;
            var caseInfo = globalStorage.getLocalData(CASE_INFO_KEY+caseId);
            if(caseInfo==null){ // 如果缓存中有数据,则取缓存中的数据。否则取原始数据
                result.push(item);
            }else{
                result.push(caseInfo);
            }
        });

        var startSequenceNo = 1;

        if(result.length>0){
            var lastCaseId  = result[result.length-1].caseId;
            startSequenceNo = parseInt(lastCaseId.replace("case",""))+1;
        }

        var endSequenceNo = globalStorage.getLocalData(LAST_CASE_SEQUENCE);

        // 检测缓存中是否有其他新增数据
        for(var sequenceNo=startSequenceNo;sequenceNo<=endSequenceNo;sequenceNo++){
            var caseId = "case"+sequenceNo;
            var caseInfo = globalStorage.getLocalData(CASE_INFO_KEY+caseId);
            if(caseInfo==null) {
                continue;
            }
            result.push(caseInfo);
        }

        $scope.records = result;

        if(result.length>=3){// 如果已经有3个案例了 则隐藏添加按钮
            $scope.hideAdd = true;
        }
    }
    /* ======================================== 监听广播事件 ======================================== */
    $scope.$on("$destroy",function(){destroy();});

    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    function initPageView(){
        container = $("#simulation-calculation-main");

    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){
        container.on("click",".case-content:not(.case-add-btn)",function(e){
            e.stopPropagation();
            e.preventDefault();
            var projectId = $rootScope.curProject;
            var caseId = $(this).attr("data-case-id");
            var caseName = $(this).attr("data-case-name");

            globalStorage.setLocalData(CURRENT_CASE_ID,caseId);
            globalStorage.setLocalData(CURRENT_CASE_NAME,caseName);

            window.open("../investment_analysis/simulation_calculation.html?projectId="+projectId);
        });

        container.on("click",".case-content.case-add-btn",function(e){
            e.stopPropagation();
            e.preventDefault();
            var projectId = $rootScope.curProject;

            var recordsLength = $scope.records.length;

            if(recordsLength>=3){
                return;
            }



            var sequence = 1;

            if($scope.records.length>0){
                var lastCaseId  = $scope.records[$scope.records.length-1].caseId;
                sequence = parseInt(lastCaseId.replace("case",""))+1;
            }

            var caseId = "case"+sequence;
            var caseName = "方案"+sequence;

            globalStorage.setLocalData(LAST_CASE_SEQUENCE,sequence);
            globalStorage.setLocalData(CURRENT_CASE_ID,caseId);
            globalStorage.setLocalData(CURRENT_CASE_NAME,caseName);

            window.open("../investment_analysis/simulation_calculation.html?projectId="+projectId);
        });
    }

    /* ======================================== common methods ======================================== */
    function destroy(){
    }

    // 初始化
    function init(){

        var url = "../static/js/investment_analysis/data/"+projectId+"/simulation_calculation_main_data.json";
        $http.get(url).success(function(result){
            initializeData(result);
            initPageView();
            bindPageEvents();
        });
    }
    init();

}]);



