(function(){
    var commonService = angular.module("commonService",[]);

    commonService.factory("getPaginationResultFactory",[function(){

        return function(pageNo,pageSize,records){
            var recordCount = records.length;
            var pageCount = 0;
            if(recordCount%pageSize>0){
                pageCount = parseInt(recordCount/pageSize)+1;
            }else{
                pageCount = parseInt(recordCount/pageSize);
            }
            if(pageNo>pageCount){
                pageNo = pageCount;
            }
            if(pageNo<1){
                pageNo=1;
            }
            var newRecords = records.slice((pageNo-1)*pageSize,pageNo*pageSize);
            return {
                recordCount:recordCount,
                pageCount:pageCount,
                records:newRecords,
                pageSize:pageSize,
                pageNo:pageNo
            };
        };
    }]);

})();


