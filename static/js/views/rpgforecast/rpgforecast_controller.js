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
            console.log(e.currentTarget);
            var $columns = $(e.currentTarget).find("td");
            //totalArea计算出来
            var totalArea=7900;
            var ranges = [], total = 0, i, s ="Ranges: ", w;
            for(i = 0; i<$columns.length; i++){
                /*w = $columns.eq(i).width()-10 - (i==0?1:0);*/
                w = $columns.eq(i).width();
                ranges.push(w);
                total+=w;
            }
            $columns.each(function(i,e){
               var range= 100*ranges[i]/total;
                var area= Math.round(range)/100*totalArea;
                $(this).find(".rent-floor-infos").html( area+"m&sup2("+Math.round(range)+"%)");
            });
           /* for(i=0; i<columns.length; i++){
                ranges[i] = 100*ranges[i]/total;
                carriage = ranges[i]-w
                s+=" "+ Math.round(ranges[i]) + "%,";
            }
            s=s.slice(0,-1);
            $("#text").html(s);*/
        }

        //colResize the table
        $("#rent-floor-range").colResizable({
            liveDrag:true,
            draggingClass:"rangeDrag",
            gripInnerHtml:"<div class='rangeGrip'></div>",
            onDrag:onSlide,
            onResize:onSlide,
            minWidth:0
        });
    };

    rpgForecast.popover=function(){

    };

    rpgForecast.dragDrop=function(){

        var $type = $( "#amp-type-draggable" ),
            $according = $( "#amp-accordion" );

        $( "li.amp-type-item", $type ).draggable({
            //cancel: "a.ui-icon", // clicking an icon won't initiate dragging
            revert: "invalid", // when not dropped, the item will revert back to its initial position
            containment: "document",
            helper: "clone",
            cursor: "move"
        });

        $according.droppable({
            accept: "#amp-type-draggable > li",
            classes: {
                "ui-droppable-active": "ui-state-highlight"
            },
            drop: function( event, ui ) {
                console.log(ui);
                dropTypeItem( ui.draggable );
            }
        });

        function dropTypeItem( $item ) {
            var tmpl=$("#popover-tmpl").html();
            var $itemCopy=$('<div class="amp-type-dropped"><li class="amp-type-item">'+$item.text()+'</li> </div>')
            $list=$(".amp-dropable",$according);
            $itemCopy.appendTo($list).popover({
                container:"body",
                title:"主力店",
                content:tmpl,
                html:true,
                placement:"auto",
                trigger:"click"
            }).fadeIn(function(){
                $itemCopy.popover("show");
            });
        }

    };

    rpgForecast.init=function(){
        rpgForecast.areaRateSlide();
        rpgForecast.floorRange();
        rpgForecast.dragDrop();

        var tmpl=$("#popover-tmpl").html();
        $(".amp-type-item").popover({
           container:"body",
            title:"主力店",
            content:tmpl,
            html:true,
            placement:"auto",
            trigger:"click"
        });
      /*  $("#amp-accordion").on("click",".panel",function(e){
            e.preventDefault();
            $(".amp-type-item").eq(0).popover("show")
        })*/
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

        self.presets=angular.copy(self.rpgForecastData.presets);
        self.area_mainInfo=angular.copy(self.rpgForecastData.area_mainInfo);

        console.log("=====rgp forecast data=====");
        console.log(rpgForecastData);

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

        self.setFloorModel=function(type,menu){
            self.area_mainInfo[type].floors=menu;
        };

        self.isActive=function(menu,model){
            return menu==model;
        };

        //页面事件 －－这里table input可以抽象出一个directive;
        $("#rgp-forecast").on("click",function(e){
            if(!$(e.target).hasClass("number-format")){
                $(".table td").removeClass("active");
            }
        });

        $(".table").on("click","td",function(e){
            //e.stopPropagation();
            $(".table td").removeClass("active");
            $(this).addClass("active");
            $(this).find("input").focus();
        });

        function _checkErrot($e){
            var $this=$e;
            var errorInfo="请输入正确的数据格式";
            if($this.hasClass("ng-invalid")){
                if(($this).hasClass("ng-invalid-number")){
                    errorInfo="请输入有效数字";
                }
                $this.parent(".td-input-wrapper").append("<em class='error-msg'>"+errorInfo+"</em>");
            }else{
                $this.parent().find("em.error-msg").remove();
            }
        };

        $(".table").on("change","input",function(e){
            _checkErrot($(e.target));
        });


        rpgForecast.init();
        $scope.$on("$destroy", function() {

        })
    }]);

