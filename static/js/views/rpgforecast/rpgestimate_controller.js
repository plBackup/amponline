/**
 * Created by whobird on 17/2/22.
 */
dataTool.controller("rpgEstimateController",['$rootScope', '$scope','$timeout',"rpgSetData","rpgresultData",
    function($rootScope, $scope,$timeout,rpgSetData,rpgresultData) {
        var self=this;
        self.setData=rpgSetData[0].values;

        self.rpgResultData=rpgresultData.rpgResultData;
        console.log(rpgresultData);

        self.getAvg=function(data){
            var sum=0;
            var len=data.yearly.length;
            if(len>=1){
                $.each(data.yearly,function(i,e){
                    sum+=e;
                });
                data.gla=sum/len;
                return data.gla;
            }else{
                data.gla=0;
                return 0;
            }

        };
        self.getColAvg=function(index,name){
            var sum=0;
            var data=self.rpgResultData[name];

            if(typeof data!=="undefined"&&data.length>=1){
                if(index=="avg"){
                    $.each(data,function(k,v){
                        var picked=v.gla;
                        sum+=picked;
                    });
                }else{
                    $.each(data,function(k,v){
                        var picked=v.yearly[index];
                        sum+=picked;
                    });
                }

            }
            return sum;
        };


        $timeout(function(){
            rpg_set.init();
            amp_main.leftPanel_update();
        },200)


        $scope.$on("$destroy", function() {
            rpg_set.destroy();
        });

    }]);
