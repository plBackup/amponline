/**
 * Created by limeiting on 16/11/18.
 */
var rpgSet_table=(function($,rpgSet_table){
    var rpgSet_table=rpgSet_table;
    var pin;
    var rpgSet_table_head_swiper,rpgSet_table_main_swiper,swiper_rent_update_table,swiper_rent_affect_table;
    rpgSet_table.swiper_init=function(){
        rpgSet_table_head_swiper = new Swiper('#rpg-set-main-table-head', {
            //scrollbar: '.swiper-scrollbar',
            direction: 'horizontal',
            slidesPerView: 'auto',
            //mousewheelControl: true,
            freeMode: true,
            scrollbarHide:true,
            watchSlidesProgress:true,
        });
        rpgSet_table_main_swiper = new Swiper('#rpg-set-main-table', {
            scrollbar: '.swiper-scrollbar',
            direction: 'horizontal',
            slidesPerView: 'auto',
            //mousewheelControl: true,
            freeMode: true,
            scrollbarHide:false
        });
        rpgSet_table_head_swiper.params.control = rpgSet_table_main_swiper;
        rpgSet_table_main_swiper.params.control = rpgSet_table_head_swiper;

        //这里把swiper实例加入全局的垃圾回收站
        /* ampApp.collector.add_swiper(rpgSet_table_head_swiper);
         ampApp.collector.add_swiper(rpgSet_table_main_swiper);*/

        swiper_rent_affect_table=new Swiper('#rent-affect-main-table', {
            scrollbar: '.swiper-scrollbar-a',
            direction: 'horizontal',
            slidesPerView: 'auto',
            //mousewheelControl: true,
            freeMode: true,
            scrollbarHide:false,
            watchSlidesProgress:true,
        });

        //这里把swiper实例加入全局的垃圾回收站
        //ampApp.collector.add_swiper(swiper_rent_affect_table);

        swiper_rent_update_table=new Swiper('#rent-update-main-table', {
            scrollbar: '.swiper-scrollbar-b',
            direction: 'horizontal',
            slidesPerView: 'auto',
            //mousewheelControl: true,
            freeMode: true,
            scrollbarHide:false
        });

        //这里把swiper实例加入全局的垃圾回收站
        //ampApp.collector.add_swiper(swiper_rent_update_table);

        pin=$(".ys-table-fixed-top").pin({
            containerSelector: "#rpg-set-table-wrapper",
            padding: {top: 88, bottom: 50}
        });
        var defer=null;
        function _swiperUpdate(){
            pin.refresh();
        };

        $(window).resize(function(){
            if(!defer){
                defer=setTimeout(function(){
                    _swiperUpdate();
                    defer=null;
                },200);
            }else{
                clearTimeout(defer);
                defer=setTimeout(function(){
                    _swiperUpdate();
                    defer=null;
                },200);
            }

        });

        rpgSet_table.swipers={
            rpgSet_table_head_swiper: rpgSet_table_head_swiper,
            rpgSet_table_main_swiper:rpgSet_table_main_swiper

        };

        //这里实验tab切换输入的情况
       /* $("#rpg-set-table-wrapper input").on("blur",function(e){
            //console.log("-----------blur-------------");
            //console.log(rpgSet_table_main_swiper.getWrapperTranslate('x'))
        });*/
    };

    rpgSet_table.table_init=function(){
        $(".ys-table-main").on("mouseenter","tr",function(e){
            var index=$(this).index();
            var parentTagName=$(this).parent().get(0).tagName;
            $(this).closest(".ys-table-main").find(".amp-table >"+parentTagName).each(function(i,e){
                $(this).find("tr").eq(index).addClass("hover");
            });
        });

        $(".ys-table-main").on("mouseleave","tr",function(e){
            var index=$(this).index();
            var parentTagName=$(this).parent().get(0).tagName;
            $(this).closest(".ys-table-main").find(".amp-table >"+parentTagName).each(function(i,e){
                $(this).find("tr").eq(index).removeClass("hover");
            });

        });

    };

    rpgSet_table.destroy=function(){
        rpgSet_table_head_swiper.destroy();
        rpgSet_table_main_swiper.destroy();
        swiper_rent_affect_table.destroy();
        swiper_rent_update_table.destroy();
    };

    rpgSet_table.init=function(){

       /* $("#btn-create").on("click",function(e){
            e.preventDefault();
            amp_main.loading_show();
            setTimeout(function(){
                amp_main.loading_hide();
            },1000);

        });*/
        rpgSet_table.swiper_init();
        rpgSet_table.table_init();
        $('#preloader').delay(350).fadeOut(function(){
            //start
            //这里暂时先禁掉 table的 tab键
            $(".table").find("input").attr("tabIndex","-1");
            //$(".table").find("span.span-editable").attr("tabIndex","-1");
        });
    };

    return rpgSet_table;
})(jQuery,rpgSet_table||{});

var rpg_result_table=(function($,rpg_result_table){
    var rpg_result_table=rpg_result_table;
    var pin;
    var rpg_result_table_head_rpg_result,rpg_result_table_main_rpg_result;
    rpg_result_table.rpg_result_init=function(){
        rpg_result_table_head_rpg_result = new Swiper('#rpg-result-table-head', {
            //scrollbar: '.rpg_result-scrollbar',rpg-result-table-wrapper
            direction: 'horizontal',
            slidesPerView: 'auto',
            //mousewheelControl: true,
            freeMode: true,
            scrollbarHide:true
        });
        rpg_result_table_main_rpg_result = new Swiper('#rpg-result-main-table', {
            scrollbar: '.swiper-scrollbar',
            direction: 'horizontal',
            slidesPerView: 'auto',
            //mousewheelControl: true,
            freeMode: true,
            scrollbarHide:false
        });
        rpg_result_table_head_rpg_result.params.control = rpg_result_table_main_rpg_result;
        rpg_result_table_main_rpg_result.params.control = rpg_result_table_head_rpg_result;

       /* //这里把swiper实例加入全局的垃圾回收站
        ampApp.collector.add_swiper(rpg_result_table_head_rpg_result);
        ampApp.collector.add_swiper(rpg_result_table_main_rpg_result);*/

        pin=$(".ys-table-fixed-top").pin({
            containerSelector: "#rpg-result-table-wrapper",
            padding: {top: 88, bottom: 50}
        });

        var defer=null;
        function _rpg_resultUpdate(){
           /* rpg_result_table_head_rpg_result.update();
            rpg_result_table_main_rpg_result.update();*/
            pin.refresh();
        };

        $(window).resize(function(){
            if(!defer){

                defer=setTimeout(function(){
                    _rpg_resultUpdate();
                    defer=null;
                },200);
            }else{
                clearTimeout(defer);
                defer=setTimeout(function(){
                    _rpg_resultUpdate();
                    defer=null;
                },200);
            }

        });
    };

    rpg_result_table.table_init=function(){
        //console.log("....");
        $(".ys-table-main").on("mouseenter","tr",function(e){
            var index=$(this).index();
            var parentTagName=$(this).parent().get(0).tagName;
            //console.log("....");
            $(this).closest(".ys-table-main").find(".amp-table >"+parentTagName).each(function(i,e){
                $(this).find("tr").eq(index).addClass("hover");
            });
        });

        $(".ys-table-main").on("mouseleave","tr",function(e){
            var index=$(this).index();
            var parentTagName=$(this).parent().get(0).tagName;
            $(this).closest(".ys-table-main").find(".amp-table >"+parentTagName).each(function(i,e){
                $(this).find("tr").eq(index).removeClass("hover");
            });
        });
    };

    rpg_result_table.destroy=function(){
        //console.log("result destroy -----------");
        rpg_result_table_head_rpg_result.destroy();
        rpg_result_table_main_rpg_result.destroy();
    };
    rpg_result_table.init=function(){
        rpg_result_table.rpg_result_init();
        rpg_result_table.table_init();
    };

    return rpg_result_table;
})(jQuery,rpg_result_table||{});


var dataSet=angular.module("dataSet",[]);

dataSet.controller("dataSetController",['$rootScope', '$scope',"$location","rpgSetData",
    function($rootScope, $scope,$location,rpgSetData) {
        var self=this;
        self.rpgSetData=rpgSetData[0];
        //self.setData=rpgSetData[0].values;
        self.setSave=function(){

            console.log("set save-----------");
            //console.log(self.rpgSetData)
            if($scope.rpgSetForm.$invalid){
                alert("请输入正确的数据");
                return false;
            }else{
                amp_main.loading_show();
                setTimeout(function(){
                    amp_main.loading_hide();
                },1000);
                $location.path("rpgresult");
                /*ui-sref="rpgresult"  ui-sref-active="active" href="#/rpgresult"*/
            }
        };

        document.onkeydown = function(){
            console.log(event.keyCode);
            if(event.keyCode == 13||event.keyCode == 9) {
                return false;
            }
        };
        //页面事件
        $(".page-main").on("click",function(e){
           // e.stopPropagation();
            if($(e.target).closest("div").hasClass("td-input-wrapper")||$(e.target).closest("div").hasClass("td-range-input")){
                return
            }else{
                $(".table td").removeClass("active");
            }
        });

        /*$(".table").on("click","td",function(e){
            e.stopPropagation();
            $(".table td").removeClass("active");
            $(this).addClass("active");
            $(this).find("input").focus();
        });*/

        $(".table").on("click",".td-input-wrapper",function(e){

            $(".table td").removeClass("active");

            $(this).closest("td").addClass("active");
            $(this).find("input").focus();

        });
        //回车向下输入
        $(".table").on("keydown",function(e){
            console.log("e-------------");
            console.log(e.target);
            if(e.keyCode==13 && e.target.nodeName.toLowerCase()==="input"){
                var $curInput=$(e.target);
                var rowSpan=parseInt($curInput.closest("tr").find("td").eq(0).attr("rowspan"));
                var trIndex= $curInput.closest("tr").index();
                var tdIndex= $curInput.closest("td").index();

                var th_len=parseInt($curInput.closest("tr").find("th").length);

                if(rowSpan>1){
                    console.log(rowSpan);
                    console.log(trIndex+"--"+tdIndex);
                    /*if()*/
                    $curInput.closest(".table").find("tr").eq(trIndex+1).find("td").eq(tdIndex-1-th_len).find(".td-input-wrapper").trigger("click");

                }else{
                    console.log(rowSpan);
                    console.log(trIndex+"--"+tdIndex);
                    /*if()*/
                    if(parseInt($curInput.closest("tbody").find("tr").eq(trIndex+1).find("td").eq(0).attr("rowspan"))>1){
                        $curInput.closest("tbody").find("tr").eq(trIndex+1).find("td").eq(tdIndex-th_len+1).find(".td-input-wrapper").trigger("click");

                    }else{
                        console.log("......")
                        console.log($curInput.closest("tbody").find("tr").eq(trIndex+1).find("td").eq(tdIndex-th_len));
                        $curInput.closest("tbody").find("tr").eq(trIndex+1).find("td").eq(tdIndex-th_len).find(".td-input-wrapper").trigger("click");
                    }

                }
            };
            if(e.keyCode==9&& e.target.nodeName.toLowerCase()==="input"){
                console.log("999")
                var $curInput=$(e.target);
                var trIndex= $curInput.closest("tr").index();
                var tdIndex= $curInput.closest("td").index();
                var th_len=parseInt($curInput.closest("tr").find("th").length);
                console.log($(e.target).closest("td").next("td").find(".td-input-wrapper"))
                $(e.target).closest("td").next("td").find(".td-input-wrapper").trigger("click");

            }

        });

        //这里禁止掉跨页面td的点击事件
        $("#rpg-set-main-table tbody").on("click","td",function(e){
            //e.stopPropagation();
            var td_width=parseInt($(this).css("width"));
            var td_offset=parseInt($(this).position().left);
            var translate=rpgSet_table.swipers.rpgSet_table_main_swiper.translate;
            var cont_width=rpgSet_table.swipers.rpgSet_table_main_swiper.width;
            if(td_offset+td_width+translate>cont_width){
                rpgSet_table.swipers.rpgSet_table_main_swiper.setWrapperTranslate(translate-160);

                return false;
            }else{
                /* $(this).find("span.span-editable").addClass("focus");
                 $(this).find("span.span-editable").focus();*/

            }
           /* if(td_offset+td_width+translate>cont_width){
                return false;
            }else{
               /!* $(this).find("span.span-editable").addClass("focus");
                $(this).find("span.span-editable").focus();*!/

            }*/
        });


        self.affectData =self.rpgSetData.rentCount;
        self.affect_count=[
            {
                "name":"因素权重打分小计",
                "value":"1",
                "projects":[
                    {
                        "name":"项目A",
                        "value":82,
                        "description":""
                    },
                    {
                        "name":"项目B",
                        "value":83.3,
                        "description":""
                    },

                    {
                        "name":"本项目",
                        "value":80.50,
                        "description":""
                    }
                ]
            },
            {
                "name":"参考租金（元/平米/月）GLA",
                "value":"",
                "projects":[
                    {
                        "name":"项目A",
                        "value":253,
                        "description":""
                    },
                    {
                        "name":"项目B",
                        "value":335,
                        "description":""
                    },
                    {
                        "name":"本项目",
                        "value":"",
                        "description":""
                    }
                ]
            },
            {
                "name":"加权租金（元/平米/月，GLA）",
                "value":"",
                "projects":[
                    {
                        "name":"项目A",
                        "value":248.37,
                        "description":""
                    },
                    {
                        "name":"项目B",
                        "value":323.74,
                        "description":""
                    },
                    {
                        "name":"本项目",
                        "value":"",
                        "description":""
                    }
                ]
            },
            {
                "name":"参考权重（近似的比重高）",
                "weight":"",
                "projects":[
                    {
                        "name":"项目A",
                        "value":0.78,
                        "description":""
                    },
                    {
                        "name":"项目B",
                        "value":0.22,
                        "description":""
                    },
                    {
                        "name":"本项目",
                        "value":265,
                        "description":""
                    }
                ]
            }
        ];

        self.shopInfo={
            "mallProportionType":"",
            "streetProportionType":""
        };
        self.proportionType={
            "indoor":"套内面积",
            "floor":"建筑面积"
        };

        self.affect_sum=function(index){
            var ratioArray_0=[];
            $.each(self.affectData,function(k,v){
                $.each(v,function(i,e){
                    var curRatio=parseFloat(e.weight);
                    var value=e.projects[index].value;
                    ratioArray_0.push(curRatio*value);
                });

            });
            var curWeight=0;
                $.each(ratioArray_0,function(i,e){
                    curWeight+=e;
            });
            return curWeight;
        };

        self.updateWeight=function(){
            self.affect_count[0].projects[0]["value"]=self.affect_sum(0);
            self.affect_count[0].projects[1]["value"]=self.affect_sum(1);
            self.affect_count[0].projects[2]["value"]=self.affect_sum(2);
            //加权租金
            self.affect_count[2].projects[0]["value"]=self.affect_count[0].projects[2]["value"]*self.affect_count[1].projects[0]["value"]/self.affect_count[0].projects[0]["value"];
            self.affect_count[2].projects[1]["value"]=self.affect_count[0].projects[2]["value"]*self.affect_count[1].projects[1]["value"]/self.affect_count[0].projects[1]["value"];

            //参考租金
            self.affect_count[3].projects[2]["value"]=self.affect_count[2].projects[0]["value"]*self.affect_count[3].projects[0]["value"]+self.affect_count[2].projects[1]["value"]*self.affect_count[3].projects[1]["value"];
        };

        self.updateWeight();

        self.setModel=function(type,menu){
            self.shopInfo[type]=menu;

            console.log(self.shopInfo);
        };

        self.isActive=function(menu,model){
            return menu==model;
        };


        function _checkErrot($e){
            var $this=$e;
            var errorInfo="请输入正确的数据格式";
            if($this.hasClass("ng-invalid")){
                if(($this).hasClass("ng-invalid-number")){
                    errorInfo="请输入有效数字";
                }
                console.log("input")
                $this.parent(".td-input-wrapper").append("<em class='error-msg'>"+errorInfo+"</em>");
            }else{
                $this.parent().find("em.error-msg").remove();
            }
        };

        $("#rgp-set").on("change","input",function(e){
            console.log("-----change");
            _checkErrot($(e.target));
        });

        //dataSetView.init();
        rpgSet_table.init();

        $scope.$on("$destroy", function() {
            rpgSet_table.destroy();
        })
    }]);

dataSet.controller("dataResultController",['$rootScope', '$scope',"rpgResultData","paginatorService",
    function($rootScope, $scope,rpgResultData,paginatorService) {
        var self=this;
        var shopData=rpgResultData.slice(1);

        self.rpgResultData=shopData;
        self.recordsNum=self.rpgResultData.length;
        self.pageLimit=10;
        self.pageNum=Math.ceil(parseFloat(self.recordsNum)/self.pageLimit);

        self.paginator=paginatorService(self.pageLimit,self.pageNum,self.rpgResultData);

        //pageTarget初始化与pageIndex一致
        //这里演示时简化逻辑，没有http取数据操作，通过一次性取数据， 通过页面过滤器进行页面展示

        self.loadPage=function(targetIndex){
            if(targetIndex>=self.pageNum){
                targetIndex=self.pageNum;
            }else if(targetIndex<=1){
                targetIndex=1;
            }
            self.paginator.setIndex(targetIndex);
        };

        self.dataReCount=function(){
          //console.log("re count data....");

        };
        self.setSave=function(){
            //console.log("save result data------------------");
            //console.log(self.rpgResultData)
        };
        self.setData=function(){
            //console.log("save result data------------------");
            //console.log(self.rpgResultData)
        };

        //dataSetView.init();
        rpg_result_table.init();

        $scope.$on("$destroy", function() {
            rpg_result_table.destroy();
        })
    }]);


