/**
 * Created by limeiting on 16/11/18.
 */

var irr_plan=(function($,irr_plan){
    var irr_plan=irr_plan;
    var pin;
    var irr_plan_head_swiper,irr_plan_main_swiper;


    irr_plan.swiper_init=function(){
        irr_plan_head_swiper = new Swiper('#irr-plan-table-head', {
            //scrollbar: '.swiper-scrollbar',
            direction: 'horizontal',
            slidesPerView: 'auto',
            //mousewheelControl: true,
            freeMode: true,
            scrollbarHide:true
        });
        irr_plan_main_swiper = new Swiper('#irr-plan-main-table', {
            scrollbar: '.swiper-scrollbar',
            direction: 'horizontal',
            slidesPerView: 'auto',
            //mousewheelControl: true,
            freeMode: true,
            scrollbarHide:false
        });

        irr_plan_head_swiper.params.control = irr_plan_main_swiper;
        irr_plan_main_swiper.params.control = irr_plan_head_swiper;

        //这里把swiper实例加入全局的垃圾回收站
        /*ampApp.collector.add_swiper(irr_plan_head_swiper);
        ampApp.collector.add_swiper(irr_plan_main_swiper);*/

        pin=$(".ys-table-fixed-top").pin({
            containerSelector: "#irr-plan-table-wrapper",
            padding: {top: 44, bottom: 50}
        });

        var defer=null;
        function _swiperUpdate(){
            /* irr_plan_head_swiper.update();
             irr_plan_main_swiper.update();*/
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
    };

    irr_plan.irr_plan_swiper_reset=function(){
        irr_plan_head_swiper = new Swiper('#irr-plan-table-head', {
            //scrollbar: '.swiper-scrollbar',
            direction: 'horizontal',
            slidesPerView: 'auto',
            //mousewheelControl: true,
            freeMode: true,
            scrollbarHide:true
        });
        irr_plan_main_swiper = new Swiper('#irr-plan-main-table', {
            scrollbar: '.swiper-scrollbar',
            direction: 'horizontal',
            slidesPerView: 'auto',
            //mousewheelControl: true,
            freeMode: true,
            scrollbarHide:false
        });
     /*   irr_plan_head_swiper.update(true);
        irr_plan_main_swiper.update(true);*/
        irr_plan_head_swiper.params.control = irr_plan_main_swiper;
        irr_plan_main_swiper.params.control = irr_plan_head_swiper;

    };

    irr_plan.swiper_update=function(){
        irr_plan.destroy();
    };

    irr_plan.table_init=function(){
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

    irr_plan.destroy=function(){
        irr_plan_head_swiper.destroy(true,true);
        irr_plan_main_swiper.destroy(true,true);
    };
    irr_plan.init=function(){

        irr_plan.swiper_init();
        irr_plan.table_init();
        /*  $('#preloader').delay(350).fadeOut(function(){
         //start
         });*/
    };

    return irr_plan;
})(jQuery,irr_plan||{});
var amp_datePicker=(function($,amp_datePicker){
    var amp_datePicker=amp_datePicker;

    function gd(year, month, day) {
        return new Date(year, month, day).getTime();
    }

    function DateAdd(interval,number,dateStr)
    {

        // DateAdd(interval,number,date)
        var date = new Date(dateStr);
        var d="";
        switch(interval)
        {
            case   "y"   :   {
                date.setFullYear(date.getFullYear()+number);
                break;
            }
            case   "q"   :   {
                date.setMonth(date.getMonth()+number*3);
                break;
            }
            case   "m"   :   {
                date.setMonth(date.getMonth()+number);
                d=  date.getFullYear()+"-"+(date.getMonth()<9?("0"+(date.getMonth()+1)):(date.getMonth()+1));
                break;
            }
            case   "w"   :   {
                date.setDate(date.getDate()+number*7);
                d =date.getFullYear()+"-"+(date.getMonth()<9?("0"+(date.getMonth()+1)):(date.getMonth()+1))+"-"+(date.getDate()<9?("0"+date.getDate()):date.getDate());
                break;
            }
            case   "d"   :   {
                date.setDate(date.getDate()+number);
                break;
            }
            case   "h"   :   {
                date.setHours(date.getHours()+number);
                break;

            }
            case   "mi"   :   {
                date.setMinutes(date.getMinutes()+number);
                break;
            }
            case   "s"   :   {
                date.setSeconds(date.getSeconds()+number);
                break;
            }
            default   :   {
                date.setDate(date.getDate()+number);
                break;
            }

        }//end switch
        if(d!=""){
            return d;
        }else{
            return date.getFullYear()+"-"+(date.getMonth()<9?("0"+(date.getMonth()+1)):(date.getMonth()+1))+"-"+(date.getDate()<9?("0"+date.getDate()):date.getDate());
        }
    };
    //daterange Selector
    amp_datePicker.dp_Array=[];
    amp_datePicker.daterangeSelector=function(){
        var curDate=new Date();
        var start_date=$("#daterange input#date-range-filter-start").val() || curDate.getFullYear()+"-"+(curDate.getMonth()+1)+"-"+(curDate.getDate());
        var end_date=$("#daterange input#date-range-filter-end").val()
        var startDate,endDate;
        var dateStart=$("#daterange input#date-range-filter-start").datetimepicker({
            format:"yyyy-mm-dd",
            todayBtn:"linked",
            startView:2,
            minView:2,
            autoclose: true,
            language:"zh-CN"
        }).on("changeDate",function(e){
            var curDateStr= DateAdd("d",0,e.date);
            startDate=e.timeStamp;
            if(endDate){
                if(startDate>endDate){
                    endDate=null;
                    $("#daterange input#date-range-filter-end").val("");
                }
            }
            $("#daterange input#date-range-filter-end").datetimepicker('setStartDate',curDateStr);
        });
        var dateEnd=$("#daterange input#date-range-filter-end").datetimepicker({
            format:"yyyy-mm-dd",
            todayBtn:"linked",
            startView:2,
            minView:2,
            autoclose: true,
            language:"zh-CN",
        }).on("changeDate",function(e){
            endDate=e.timeStamp;
        });

        $("#daterange input#date-range-filter-start").val(start_date);
        $("#daterange input#date-range-filter-end").val(end_date);

        //这里把日期实例加入全局的垃圾回收站
        amp_datePicker.dp_Array.push(dateStart);
        amp_datePicker.dp_Array.push(dateEnd);
    };
    amp_datePicker.dateSelector=function(){
        var curDate=new Date();
        var start_date=$("#datepicker input").val()||curDate.getFullYear()+"-"+(curDate.getMonth()+1)+"-"+(curDate.getDate());

        var dpicker=$("#datepicker input").datetimepicker({
            format:"yyyy-mm-dd",
            todayBtn:"linked",
            startView:2,
            minView:2,
            autoclose: true,
            language:"zh-CN"
        });

        $("#datepicker input").val(start_date);

        //这里把日期实例加入全局的垃圾回收站
        amp_datePicker.dp_Array.push(dpicker);
    };
    amp_datePicker.destroy=function(){
        $.each(amp_datePicker.dp_Array,function(i,e){
            $(e.selector).datetimepicker("remove");
        });
        amp_datePicker.dp_Array=[];
    };
    return amp_datePicker;
})(jQuery,amp_datePicker||{})
var dataTool=angular.module("dataTool",[]);
dataTool.controller("dataIndexController",['$rootScope', '$scope',"dataIndexData","paginatorService","$timeout","$location","$filter",
    function($rootScope, $scope,dataIndexData,paginatorService,$timeout,$location,$filter) {
        var self=this;
        var shopData=dataIndexData.slice(1);

        self.indexData=shopData;
        self.recordsNum=self.indexData.length;
        self.pageLimit=10;
        self.pageNum=Math.ceil(parseFloat(self.recordsNum)/self.pageLimit);

        self.paginator=paginatorService(self.pageLimit,self.pageNum,self.indexData);

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

        self.shopEdit=function(index,shop){
            //self.indexData[index].shopIndex+="###";
            $rootScope.$broadcast("shopEdit",{shopData:shop,index:index})
        };

        self.shopUpdate=function(index,shop){
            shopData[index]=shop;
        };

        $scope.$on("shopUpdate",function(e,data){
            self.shopUpdate(data.index,data.shop);
        });

        self.shopAdd=function(index,shop){
            if(index=="add"){
                shopData.unshift(shop);
                self.recordsNum=self.indexData.length;
                self.pageNum=Math.ceil(parseFloat(self.recordsNum)/self.pageLimit);
                self.paginator=paginatorService(self.pageLimit,self.pageNum,self.indexData);
            }else if(index=="new"){
                //shopData[0]=shop;
            }
        };

        $scope.$on("shopAdd",function(e,data){
            self.shopAdd(data.index,data.shop);
        });

        $scope.$on("shopUpdateAdd",function(e,data){
            self.shopAdd(data.index,data.shop);

        });

        self.filters={};
        $scope.$on("datatool_filter",function(e,data){
           var curFilter={};
           $.each(data.filters,function(k,v){
               if(k!=="project" && v!=="" ){
                   curFilter[k]=v;
               }
           });

           self.indexData=$filter("filter")(shopData,curFilter);
           //self.filters=curFilter;
           self.recordsNum=self.indexData.length;
           self.pageNum=Math.ceil(parseFloat(self.recordsNum)/self.pageLimit);
           self.paginator=paginatorService(self.pageLimit,self.pageNum,self.indexData);
       });


    }]);

dataTool.controller("dataRightController",['$rootScope', '$scope',
    function($rootScope, $scope) {
        var self=this;

        self.form_menu={
            projects:["商业公司A","商业公司B","商业公司C","商业公司D"],
            floors:["B1","F1","F2","F3","F4","F5","F6"],
            positions:["主入口","主立面外墙","次入口","主通道","侧面面街","后街"],
            form:["超市","影院","服装","餐饮","娱乐","配套","儿童","其他"],
            property:["自持","销售","销售返租"],
            type:["MAll","商业街"]
        };
        self.index="add";
        self.shopInfo={};
        $scope.$on("shopEdit",function(e,data){
            amp_main.rightPanel_open();
            self.index=data.index;
            self.shopInfo=data.shopData;
        });

        self.save=function(){
            if(typeof self.shopInfo.shopIndex==="undefined" || self.shopInfo.shopIndex==""){
                return;
            }
            if(self.index=="add"){
                $rootScope.$broadcast("shopAdd",{
                    index:self.index,
                    shop:self.shopInfo
                });
                //amp_main.rightPanel_close();
                //self.shopInfo={};
                self.index="new";
            }else if(self.index=="new"){
                $rootScope.$broadcast("shopUpdateAdd",{
                    index:self.index,
                    shop:self.shopInfo
                });
                //amp_main.rightPanel_close();
                //self.shopInfo={};
                self.index="new";
            }else{
                $rootScope.$broadcast("shopUpdate",{
                    index:self.index,
                    shop:self.shopInfo
                });
                amp_main.rightPanel_close();
                self.shopInfo={};
                self.index="add";
            }

        };

        self.next=function(){
            self.index="add";
            self.shopInfo={};
        }

        self.setModel=function(type,menu){
            self.shopInfo[type]=menu;
        };

        self.isActive=function(menu,model){
            return menu==model;
        };

        self.reset=function(){

            self.index="add";
            self.shopInfo={
            };

        };

        amp_main.leftPanel_update();

        $(".ys-tips").tooltip();

    }]);

dataTool.controller("dataSetController",['$rootScope', '$scope',"rpgSetData",
    function($rootScope, $scope,rpgSetData) {
        var self=this;
        self.setData=rpgSetData[0].values;

        amp_main.leftPanel_update();
    }]);

dataTool.controller("irrPlanController",['$rootScope', '$scope',"irrPlanData","$timeout","$location",
    function($rootScope, $scope,irrPlanData,$timeout,$location) {
        var self=this;
        self.irrData=irrPlanData;

        self.save=function(){
            amp_main.loading_show();
            $timeout(function(){
                amp_main.loading_hide();
                $location.path("noi");
            },1000);
        };
        var skip=2;
        //这里出于性能考虑 不采用$watch 直接在触发元素上绑定change事件，触发
        var curQuitYear;
        $scope.years=["第1年","第2年","第3年","第4年","第5年","第6年","第7年","第8年","第9年","第10年"];
        self.quitYear=irrPlanData[31].values[1].value;
        curQuitYear=self.quitYear;
        self.quitRRate=irrPlanData[32].values[1].value;
        self.quitFee=self.irrData[33].values[1].value;

       /* $scope.$watch('irrData', function(newValue, oldValue) {
            /!*if (newValue === oldValue) { return; }*!/
        },true);*/
        self.count=function(){
            var skip=2;
            var watchData={
                subEmptyRate:self.irrData[5].values,
                anchorManageFee:self.irrData[7].values,
                manageFeeUpdate:self.irrData[10].values,
                multiIncomeRatio:self.irrData[13].values[1],
                propertyTaxes:self.irrData[16].values[1],
                salesTaxes:self.irrData[17].values[1],
                runCostRate:self.irrData[19].values,
                quitYear:self.irrData[31].values[1],
                quitRRate:self.irrData[32].values[1],
                quitFee:self.irrData[33].values[1],

                valOfYear:self.irrData[41].values[1],
                loanYears:self.irrData[42].values[1],
                loanPP:self.irrData[42].values[1],

                loanInterest:self.irrData[49].values[1]
            };

            var countData={
                rentIncome:self.irrData[5].values.slice(2),
                manageFeeUpdate:self.irrData[10].values.slice(2),
                manageFeeIncome:self.irrData[11].values.slice(2),
                multiIncome:self.irrData[13].values.slice(2),
                totleRevenue:self.irrData[14].values.slice(2),

                propertyTaxes:self.irrData[16].values.slice(2),
                salesTaxes:self.irrData[17].values.slice(2),

                runCost:self.irrData[20].values.slice(2),//经营费用
                expenseRatio:self.irrData[21].values.slice(2),//总经营费用占比
                expense:self.irrData[22].values.slice(2), //总经营费用

                noi:self.irrData[24].values.slice(2),
                roi:self.irrData[25].values.slice(2),
                roiRes:self.irrData[26].values.slice(2),

                quitRRate:self.irrData[32].values.slice(2),
                quitFee:self.irrData[33].values.slice(2),
                quitIncome:self.irrData[34].values.slice(2), //退出收益

                unleveredCashFlow:self.irrData[35].values.slice(2),//无杠杆现金流
                unleveredNRR:self.irrData[36].values.slice(2),//净回报率
                unleveredIRR:self.irrData[37].values.slice(2),//无杠杆内部收益率
                unleveredProfits:self.irrData[38].values.slice(2),//无杠杆利润
                unleveredRMBPP:self.irrData[39].values.slice(2),//人民币利润倍数
                //杠杆现金流
                leveredValue:self.irrData[41].values.slice(2),//当年估值
                loanPP:self.irrData[43].values.slice(2),//贷款额

                loanMoney:self.irrData[45].values.slice(2),//贷款金额
                mortgageCashFlow:self.irrData[46].values.slice(2),//按揭现金流
                quitPayment:self.irrData[47].values.slice(2),//退出时还债
                endLoan:self.irrData[48].values.slice(2),//尾期余额
                loanRate:self.irrData[49].values.slice(2),//贷款利息

                leveredCashFlow:self.irrData[50].values.slice(2),//无杠杆现金流
                leveredNRR:self.irrData[51].values.slice(2),//净回报率
                leveredIRR:self.irrData[52].values.slice(2),//无杠杆内部收益率
                leveredProfits:self.irrData[53].values.slice(2),//无杠杆利润
                leveredRMBPP:self.irrData[54].values.slice(2),//人民币利润倍数

            };

           /* var countSum={
                noiSum:self.irrData[24].values[1]
            };*/
            if(typeof parseInt(self.irrData[31].values[1].value)!=="number"){
                alert("请输入正确的退出年");
                self.irrData[31].values[1].value=10;
            }else{
                if(parseInt(self.irrData[31].values[1].value)>10 || parseInt(self.irrData[31].values[1].value)<=1){
                    alert("请输入2-10年为退出年");
                    self.irrData[31].values[1].value=10;
                }
            }

            self.quitYear=Math.abs(parseInt(self.irrData[31].values[1].value));

            function _updateTableHead(quitYear){
                curQuitYear=quitYear;
                var y=parseInt(quitYear);
                var irr_width=150*y;

                var $irrYear=$("#irr-year");
                $irrYear.empty();
                for(i=0;i<y;i++){
                    $irrYear.append('<th>第'+(i+1)+'年</th>');
                }
                $(".swiper-wrapper table").css("width",irr_width+"px");

              /*  $timeout(function(){
                    irr_plan.destroy();
                   irr_plan.irr_plan_swiper_reset();
                },1000);*/
            }
            //_updateTableHead(self.quitYear);
            //更改表头
            if(curQuitYear!==self.quitYear){
                 _updateTableHead(self.quitYear);
             }


            //租金总收入
            $.each(countData.rentIncome,function(i,e){
                e.value=self.irrData[2].values[i+skip].value+self.irrData[3].values[i+skip].value*(1-self.irrData[4].values[i+skip].value);
            });

            //物业管理费
            $.each(countData.manageFeeIncome,function(i,e){
                e.value=parseFloat(self.irrData[7].values[i+skip].value)+self.irrData[8].values[i+skip].value*(1-self.irrData[4].values[i+skip].value);
            });
            //物业管理费递增率
            $.each(countData.manageFeeUpdate,function(i,e){
                if(i==0){
                    e.value=0;
                }else{
                    e.value=parseFloat(self.irrData[11].values[i+skip].value)/parseFloat(self.irrData[11].values[i+skip-1].value)-1;
                }
            });

            //多经收入
            $.each(countData.multiIncome,function(i,e){
                e.value=self.irrData[5].values[i+skip].value*self.irrData[13].values[1].value;
            });
            //经营总收入
            $.each(countData.totleRevenue,function(i,e){
                e.value=self.irrData[5].values[i+skip].value+self.irrData[11].values[i+skip].value+self.irrData[13].values[i+skip].value;
            });
            //房产税－暂无输入
            //self.propertyTaxesNum=12000;
            $.each(countData.propertyTaxes,function(i,e){
               // e.value=self.irrData[5].values[i+skip].value+self.irrData[11].values[i+skip].value+self.irrData[13].values[i+skip].value;
                e.value=self.irrData[5].values[i+skip].value*self.irrData[16].values[1].value
            });
            //营业税
            $.each(countData.salesTaxes,function(i,e){
                 e.value=self.irrData[14].values[i+skip].value*self.irrData[17].values[1].value;
            });

            //经营费用runCost
            //self.runCostInit=2868.80;
            $.each(countData.runCost,function(i,e){
                if(i==0){
                    e.value=parseFloat(self.irrData[20].values[1].value)*(parseFloat(self.irrData[2].values[1].value)+parseFloat(self.irrData[3].values[1].value))/10000;
                    console.log(e.value);
                }else{
                    e.value=parseFloat(self.irrData[20].values[i+skip-1].value)*(1+parseFloat(self.irrData[19].values[i+skip].value));
                    console.log(e.value);
                }

            });

            //总经营费用
            $.each(countData.expense,function(i,e){
                e.value=parseFloat(self.irrData[20].values[i+skip].value)+parseFloat(self.irrData[16].values[i+skip].value)+parseFloat(self.irrData[17].values[i+skip].value)
            });
            //总费用占比
            $.each(countData.expenseRatio,function(i,e){
                e.value=parseFloat(self.irrData[20].values[i+skip].value)/parseFloat(self.irrData[11].values[i+skip].value)
            });

            //noi 总收入－总费用
            $.each(countData.noi,function(i,e){
                e.value=parseFloat(self.irrData[14].values[i+skip].value)-parseFloat(self.irrData[22].values[i+skip].value)
            });
            //roi 每一年的noi/总投入
            $.each(countData.roi,function(i,e){
                e.value=parseFloat(Math.abs(self.irrData[24].values[i+skip].value))/parseFloat(Math.abs(self.irrData[24].values[1].value))
            });
            //roiRes 无杠杆现金流
            $.each(countData.roiRes,function(i,e){
                if(i==0){
                    e.value=parseFloat(Math.abs(self.irrData[24].values[i+skip].value))-parseFloat(Math.abs(self.irrData[24].values[1].value))
                }else{
                    e.value=parseFloat(Math.abs(self.irrData[24].values[i+skip].value))-parseFloat(Math.abs(self.irrData[26].values[i+skip-1].value))
                }
            });

            //退出收益率
            self.quitRRate=irrPlanData[32].values[1].value;
            self.quitFee=self.irrData[33].values[1].value;
            $.each(countData.quitRRate,function(i,e){
                if(i==(self.quitYear-1)){
                    e.value=parseFloat(Math.abs(self.irrData[24].values[i+skip].value))/parseFloat(self.quitRRate)
                }else{

                }
            });
            //退出费用
            $.each(countData.quitFee,function(i,e){
                if(i==(self.quitYear-1)){
                    e.value=parseFloat(Math.abs(self.irrData[32].values[i+skip].value))*parseFloat(self.quitFee);
                }else{

                }
            });
            //退出收益
            $.each(countData.quitIncome,function(i,e){
                if(i==(self.quitYear-1)){
                    e.value=parseFloat(Math.abs(self.irrData[32].values[i+skip].value))-parseFloat(Math.abs(self.irrData[33].values[i+skip].value))
                }else{
                    e.value=0;
                }
            });

            //无杠杆现金流unleveredCashFlow
            $.each(countData.unleveredCashFlow,function(i,e){
                if(i==(self.quitYear-1)){
                    e.value=parseFloat(Math.abs(self.irrData[24].values[i+skip].value))+parseFloat(Math.abs(self.irrData[34].values[i+skip].value))
                }else{
                    e.value=parseFloat(Math.abs(self.irrData[24].values[i+skip].value));
                }
            });

            //净回报率
            $.each(countData.unleveredNRR,function(i,e){
                e.value=parseFloat(Math.abs(self.irrData[24].values[i+skip].value))/parseFloat(Math.abs(self.irrData[35].values[1].value));
            });
            var av=0;
            var qy=self.quitYear;
            for(i=0;i<qy;i++){
                av+=parseFloat(self.irrData[36].values[i+skip].value);
            }
            self.irrData[36].values[1].value=av/qy;
            //无杠杆内部收益率
            //self.irrData[35].values[1] finance.IRR(initial investment, [cash flows]);
            /*finance.IRR(-500000, 200000, 300000, 200000);
            => 18.82*/
            var finance = new Finance();

            var irrArgs=[];
            irrArgs.push(Math.abs(self.irrData[35].values[1].value)*(-1));
            for(i=0;i<qy;i++){
               /* if(i==(qy-1)){
                    irrArgs.push(Math.abs(self.irrData[24].values[i].value));
                }else{
                    irrArgs.push(Math.abs(self.irrData[24].values[i].value));
                }*/
                irrArgs.push(Math.abs(self.irrData[35].values[i+skip].value));
            }
            var unleaveredIRR=finance.IRRAMP(irrArgs);
            self.irrData[37].values[1].value=unleaveredIRR/100;

            //无杠杆利润unleveredProfits

            var unleveredCF=self.irrData[35].values.slice(2);
            var unleveredProfitsSum=0;
            for(i=0;i<qy;i++){
                unleveredProfitsSum+=parseFloat(unleveredCF[i].value);
            }
            self.irrData[38].values[1].value=unleveredProfitsSum-parseFloat(Math.abs(self.irrData[35].values[1].value));

            //人民币利润倍数unleveredRMBPP
            self.irrData[39].values[1].value= parseFloat(self.irrData[38].values[1].value)/parseFloat(Math.abs(self.irrData[35].values[1].value));

            /*========== 杠杆现金流 ===========*/
            //当年估值 leveredValue
            for(i=0;i<qy;i++){
                if(i==(qy-1)){
                    self.irrData[41].values[i+skip].value=parseFloat(Math.abs(self.irrData[24].values[i+skip].value))/parseFloat(Math.abs(self.irrData[32].values[1].value));
                }else {
                    self.irrData[41].values[i+skip].value= parseFloat(Math.abs(self.irrData[24].values[i + skip + 1].value)) / parseFloat(Math.abs(self.irrData[32].values[1].value));
                }
            }


            //贷款额loanPP
            //self.irrData[43].values[2].value=parseFloat(Math.abs(self.irrData[35].values[1].value))*parseFloat(Math.abs(self.irrData[43].values[1].value));
            self.irrData[43].values[2].value=parseFloat(Math.abs(self.irrData[41].values[2].value))*parseFloat(Math.abs(self.irrData[43].values[1].value));
            //贷款金额loanMoney
            self.irrData[45].values[1].value=self.irrData[43].values[2].value*(-1);
            $.each(countData.loanMoney,function(i,e){
                e.value= self.irrData[45].values[1].value;
            });

            //按揭现金流mortgageCashFlow


            //退出时还债
            $.each(countData.quitPayment,function(i,e){
                if(i==(qy-1)){
                    e.value= self.irrData[45].values[1].value;
                }else{
                    e.value=0;
                }

            });

            //尾期余额
            self.irrData[48].values[1].value=self.irrData[45].values[1].value;
            $.each(countData.endLoan,function(i,e){
                if(i==(qy-1)){
                    e.value=0;
                }else{
                    e.value= self.irrData[45].values[1].value;
                }
            });

            //贷款利息
            var loanRate=self.irrData[49].values[1].value;
            var loan=self.irrData[45].values[1].value;

            $.each(countData.loanRate,function(i,e){
                e.value=loanRate*loan;
            });

            //无杠杆现金流

            self.irrData[50].values[1].value=parseFloat(Math.abs(self.irrData[24].values[1].value))-parseFloat(Math.abs(self.irrData[43].values[2].value));
            $.each(countData.leveredCashFlow,function(i,e){
                if(i==(qy-1)){
                    e.value= self.irrData[24].values[i+skip].value+self.irrData[34].values[i+skip].value-Math.abs(self.irrData[49].values[i+skip].value)-Math.abs(self.irrData[45].values[1].value);
                }else{
                    e.value=self.irrData[24].values[i+skip].value-Math.abs(self.irrData[49].values[i+skip].value);
                }
            });

            //净回报率
            var v=parseFloat(Math.abs(self.irrData[24].values[1].value))-parseFloat(Math.abs(self.irrData[43].values[2].value));

            $.each(countData.leveredNRR,function(i,e){
                e.value=(parseFloat((self.irrData[50].values[i+skip].value))+parseFloat(Math.abs(self.irrData[47].values[i+skip].value)||0)-parseFloat(Math.abs(self.irrData[34].values[i+skip].value))||0)/v;
            });

            var avr=0;
            for(i=0;i<qy;i++){
                avr+=parseFloat(self.irrData[51].values[i+skip].value)
            }
            console.log(avr);
            self.irrData[51].values[1].value=avr/qy;

            //杠杆内部收益率
            //self.irrData[35].values[1] finance.IRR(initial investment, [cash flows]);
            /*finance.IRR(-500000, 200000, 300000, 200000);
             => 18.82*/

            var leveredirrArgs=[];
            console.log("irr-----------"+Math.abs(self.irrData[35].values[1].value)*(-1));
            leveredirrArgs.push(Math.abs(self.irrData[35].values[1].value)*(-1));
            for(i=0;i<qy;i++){

                leveredirrArgs.push(Math.abs(self.irrData[50].values[i+skip].value));
            }
            var leaveredIRR=finance.IRRAMP(leveredirrArgs);
            self.irrData[52].values[1].value=leaveredIRR/100;


            //杠杆利润
            var leveredCF=self.irrData[50].values.slice(2);
            var leveredProfitsSum=0;
            for(i=0;i<qy;i++){
                leveredProfitsSum+=parseFloat(leveredCF[i].value);
            }
            self.irrData[53].values[1].value=leveredProfitsSum-parseFloat(Math.abs(self.irrData[35].values[1].value));




            //人民币利润倍数
            self.irrData[54].values[1].value= parseFloat(self.irrData[53].values[1].value)/parseFloat(Math.abs(self.irrData[35].values[1].value));

            //更改表头
            /*if(curQuitYear!==self.quitYear){
                _updateTableHead(self.quitYear);
            }*/
        };

        $(".table").on("click","td",function(){
            $(".table td").removeClass("active");
            $(this).addClass("active");
            $(this).find("input").focus();
        });

        $(".table").on("change","input",function(e){
            $scope.$apply(
                function(){
                    self.count();
                }
            );
        });

        irr_plan.init();
        self.count();
        amp_main.leftPanel_update();
        $(".ys-tips").tooltip();
        $scope.$on("$destroy", function() {
            irr_plan.destroy();
        });
    }]);

dataTool.controller("dataFeeController",['$rootScope','$scope',function($rootScope,$scope){
    var self=this;
    console.log("data fee controller");


}]);

dataTool.controller("dataSimController",['$rootScope', '$scope',"simData","simChartData","$location","$timeout",
    function($rootScope, $scope,simData,simChartData,$location,$timeout) {
        var self=this;
        self.chartData=simChartData["chart"];
        self.shops=simData.slice(1);
        self.index=0;

        self.form_menu={
            form:["超市","影院","服装","餐饮","娱乐","配套","儿童","其他"],
            property:["自持","销售","销售返租"],
            payRange:["月付","季付"]
        };
        self.shopInfo=self.shops[self.index];

        self.setShopInfo=function(){

            $scope.$apply(function(){
                self.index+=1;
                self.shopInfo=self.shops[self.index];
            });

        };
        self.setModel=function(type,menu){
            self.shopInfo[type]=menu;
        };

        self.isActive=function(menu,model){
            return menu==model;
        };

        self.dismiss=function(){
            var dismiss=window.confirm("确定解约？")

        };
         self.checkReturn=function(){
             amp_main.loading_show();
             $timeout(function(){
                amp_main.loading_hide();
                 $location.path("irrplan");
             },1000);
         };
        //页面事件

        $(".table").on("click","td",function(e){
             //e.stopPropagation();
             $(".table td").removeClass("active");
             $(this).addClass("active");
             $(this).find("input").focus();
         });
        amp_datePicker.daterangeSelector();
        amp_datePicker.dateSelector();
        var iscroll_init=function(){
            var h=parseInt($(window).height());

            $(".col-xs-6").css({
                "overflow-y":"hidden",
                "height":(h-88)+"px"
            });

            var datasim_floor_scroll = new IScroll('#datatool-sim-floor-table', {
                mouseWheel: true,
                scrollbars: true
            });
            var datasim_main_scroll= new IScroll('#datatool-sim-main-table', {
                mouseWheel: true,
                scrollbars: true
            });


            var defer=null;
            var scrollUpdate=function(){
                var h=parseInt($(window).height());

                $(".col-xs-6").css({
                    "overflow-y":"hidden",
                    "height":(h-88)+"px"
                });

                datasim_floor_scroll.refresh();
                datasim_main_scroll.refresh();
            };

            $(window).resize(function(){
                if(!defer){
                    defer=setTimeout(function(){
                        scrollUpdate();
                        defer=null;
                    },200);
                }else{
                    clearTimeout(defer);
                    defer=setTimeout(function(){
                        scrollUpdate();
                        defer=null;
                    },200);
                }

            });
            setTimeout(scrollUpdate,300);

        };
        var add_svg=function(){
            $.get("floors.svg",function(data,status){
                var importedSVGRootElement = document.importNode(data.documentElement,true);
                $("#ys-svg").append(importedSVGRootElement);
            });
        };
        iscroll_init();
        add_svg();

        var s=Snap("#ys-svg");
        var curElement;
        var $container=$("#ys-svg");

        s.click(function(e){
            curElement=s.select("#"+e.target.id);
            if(s.select(".cur-select")){
                s.select(".cur-select").removeClass("cur-select");
            }
            curElement.addClass("cur-select");
            if(curElement.data("shopid")){
                self.setShopInfo()
            }else{
                self.setShopInfo();
            }
        });

        $scope.$on("$destroy", function() {
            amp_datePicker.destroy();
        });
        $(".ys-tips").tooltip();
        amp_main.leftPanel_update();
    }]);


