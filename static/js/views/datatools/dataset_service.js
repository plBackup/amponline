/**
 * Created by limeiting on 16/11/18.
 */
angular.module('dataSet').service('dataSetService', ["$rootScope","$http",function($rootScope,$http) {

    var service = {
        getData: function () {
            return $http.get('../data/data_'+$rootScope.curProject+'/rent_setup.json', {cache: true}).then(function (res) {
                return res.data;
            });
        },
    };
    return service;

}]);

angular.module('dataSet').service('dataResultService', ["$rootScope","$http",function($rootScope,$http) {

    var service = {
        getData: function () {
            return $http.get('../data/data_'+$rootScope.curProject+'/shopInfo.json', {cache: true}).then(function (res) {
                return res.data;
            });
        },
    };
    return service;

}]);

/*angular.module('dataSet').service('dataSimService', ["$http",function($http) {

    var service = {
        getData: function () {
            return $http.get('../data/shopInfo.json', {cache: true}).then(function (res) {
                return res.data;
            });
        },
    };
    return service;

}]);*/


angular.module('dataSet').factory('paginatorService', [function() {
    return function(pageLimit,pageNum,data){
        var service = {
            //hasNextVar:false,
            next:function(){
                if(this.hasNext()){
                    this.currentOffset+=pageLimit;
                    this.curPageIndex+=1;
                    //this._load(this.currentOffset,pageLimit);
                    this.pageTarget=this.curPageIndex;

                }
            },

            hasNext:function(){
                return parseInt(this.curPageIndex)< pageNum;
            },
            prev:function(){

                if(this.hasPrevious()){
                    this.currentOffset -=pageLimit;
                    this.curPageIndex -=1;
                    this.pageTarget=this.curPageIndex;
                    //this._load(this.currentOffset,pageLimit);
                }

            },
            hasPrevious:function(){
                return this.currentOffset !==0;
            },
            _load:function(){
                var self=this;
                self.currentPageItems=data.slice(self.currentOffset,pageLimit);
            },
            setIndex:function(targetIndex){
                var self=this;
                self.curPageIndex=targetIndex;
                self.currentOffset=(targetIndex-1)*pageLimit;
                self.pageTarget=targetIndex;
            },
            currentPageItems:[],
            currentOffset:0,
            curPageIndex:1,
            pageTarget:1
        };
        return service;
    }
}]);