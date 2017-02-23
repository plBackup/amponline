/**
 * Created by whobird on 17/2/15.
 */
//租金包推算
var rpgForecast=(function($,rf){
    var rpgForecast=rf;

    rpgForecast.areaRateSlide=function(){
        function refreshRate() {
            var rateValue = $("#area-rate-slider").slider( "value" );
            $("#area-rate-slider+.td-addon" ).text(rateValue+"%");
        }

        $("#area-rate-slider").slider({
            orientation: "horizontal",
            range: "min",
            max: 100,
            value: 80,
            slide: refreshRate,
            change: refreshRate
        });
    };

    rpgForecast.floorRange=function(){
        //callback function
        var onSlide = function(e){
            var columns = $(e.currentTarget).find("td");
            var ranges = [], total = 0, i, s ="Ranges: ", w;
            for(i = 0; i<columns.length; i++){
                w = columns.eq(i).width()-10 - (i==0?1:0);
                ranges.push(w);
                total+=w;
            }
            for(i=0; i<columns.length; i++){
                ranges[i] = 100*ranges[i]/total;
                carriage = ranges[i]-w
                s+=" "+ Math.round(ranges[i]) + "%,";
            }
            s=s.slice(0,-1);
            $("#text").html(s);
        }

        //colResize the table
        $("#rent-floor-range").colResizable({
            liveDrag:true,
            draggingClass:"rangeDrag",
            gripInnerHtml:"<div class='rangeGrip'></div>",
            onDrag:onSlide,
            minWidth:0
        });
    };

    rpgForecast.popover=function(){

    };

    rpgForecast.dragDrop=function(){

    };

    rpgForecast.init=function(){
        rpgForecast.areaRateSlide();
        rpgForecast.floorRange();
        $(".amp-type-item").popover({
           container:"body",
            title:"主力店",
            content:"test",
            html:true,
            placement:"auto",
            trigger:"click"
        });
        $("#amp-accordion").on("click",".panel",function(e){
            e.preventDefault();
            $(".amp-type-item").eq(0).popover("show")
        })
    };

    rpgForecast.destroy=function(){

    };

    return rpgForecast;
})(jQuery,rpgForecast||{});

dataSet.controller("rpgForecastController",['$rootScope', '$scope',"$location","rpgForecastData",
    function($rootScope, $scope,$location,rpgForecastData) {
        var self=this;
        $rootScope.rentFuncName="租金包粗算";
        self.rpgForecastData=rpgForecastData;


        /*menu select*/
        self.form_menu={
            projects:["商业公司A","商业公司B","商业公司C","商业公司D"],
            floors:["B1","F1","F2","F3","F4","F5","F6"],
            positions:["主入口","主立面外墙","次入口","主通道","侧面面街","后街"],
            form:["超市","影院","服装","餐饮","娱乐","配套","儿童","其他"],
            property:["自持","销售","销售返租"],
            type:["MAll","商业街"]
        };

        self.shopInfo={};

        self.setModel=function(type,menu){
            self.shopInfo[type]=menu;
        };

        self.isActive=function(menu,model){
            return menu==model;
        };

        rpgForecast.init();
        $scope.$on("$destroy", function() {

        })
    }]);

