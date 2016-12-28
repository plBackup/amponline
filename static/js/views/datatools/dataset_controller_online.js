/**
 * Created by limeiting on 16/11/18.
 */
var rpgSet_table=(function($,rpgSet_table){
    var rpgSet_table=rpgSet_table;
    var pin;
    var rpgSet_table_head_swiper,rpgSet_table_main_swiper,swiper_rent_update_table,swiper_rent_affect_table;

    rpgSet_table.swipers={};

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


        swiper_rent_affect_table=new Swiper('#rent-affect-main-table', {
            scrollbar: '.swiper-scrollbar-a',
            direction: 'horizontal',
            slidesPerView: 'auto',
            //mousewheelControl: true,
            freeMode: true,
            scrollbarHide:false,
            watchSlidesProgress:true,
        });


        swiper_rent_update_table=new Swiper('#rent-update-main-table', {
            scrollbar: '.swiper-scrollbar-b',
            direction: 'horizontal',
            slidesPerView: 'auto',
            //mousewheelControl: true,
            freeMode: true,
            scrollbarHide:false
        });

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
            $(".table").find("span.span-editable").attr("tabIndex","-1");
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

dataSet.controller("dataSetController",['$rootScope', '$scope',"$location","rpgSetData","dataSumWeightService","$http",
    function($rootScope, $scope,$location,rpgSetData,dataSumWeightService,$http) {
        var self=this;
        self.sumWeightService=dataSumWeightService();
        if(rpgSetData.code!='0'){
            alert('获取数据错误');
        }

// 如果没有数据 那就初始化一些信息
        if(!rpgSetData.data.rentalSettingsVo){
            rpgSetData.data.rentalSettingsVo=
            {
                "projectName":"项目公司1",
                "openDate":"2016-05-28",
                "rentCount":{
                    "affect_position": [
                        {
                            "name":"区域属性",
                            "weight":"0",
                            "projects":[
                                {
                                    "name":"项目A",
                                    "value":"",
                                    "description":""
                                },
                                {
                                    "name":"项目B",
                                    "value":"",
                                    "description":""
                                },
                                {
                                    "name":"项目c",
                                    "value":"",
                                    "description":""
                                },
                                {
                                    "name":"本项目",
                                    "value":"100",
                                    "description":""
                                }
                            ]
                        },
                        {
                            "name":"交通通达性",
                            "weight":"0",
                            "projects":[
                                {
                                    "name":"项目A",
                                    "value":"",
                                    "description":""
                                },
                                {
                                    "name":"项目B",
                                    "value":"",
                                    "description":""
                                },
                                {
                                    "name":"项目c",
                                    "value":"",
                                    "description":""
                                },

                                {
                                    "name":"本项目",
                                    "value":"100",
                                    "description":""
                                }
                            ]
                        },
                        {
                            "name":"配套完善度",
                            "weight":"0",
                            "projects":[
                                {
                                    "name":"项目A",
                                    "value":"",
                                    "description":""
                                },
                                {
                                    "name":"项目B",
                                    "value":"",
                                    "description":""
                                },
                                {
                                    "name":"项目c",
                                    "value":"",
                                    "description":""
                                },
                                {
                                    "name":"本项目",
                                    "value":"100",
                                    "description":""
                                }
                            ]
                        },
                        {
                            "name":"人口条件",
                            "weight":"0",
                            "projects":[
                                {
                                    "name":"项目A",
                                    "value":"",
                                    "description":""
                                },
                                {
                                    "name":"项目b",
                                    "value":"",
                                    "description":""
                                },
                                {
                                    "name":"项目C",
                                    "value":"",
                                    "description":""
                                },
                                {
                                    "name":"本项目",
                                    "value":"100",
                                    "description":""
                                }
                            ]
                        }
                    ],
                    "affect_product":[
                        {
                            "name":"店型优势",
                            "weight":"0",
                            "projects":[
                                {
                                    "name":"项目A",
                                    "value":"",
                                    "description":""
                                },
                                {
                                    "name":"项目B",
                                    "value":"",
                                    "description":""
                                },
                                {
                                    "name":"项目c",
                                    "value":"",
                                    "description":""
                                },
                                {
                                    "name":"本项目",
                                    "value":"100",
                                    "description":""
                                }
                            ]
                        },
                        {
                            "name":"动线规划",
                            "weight":"0",
                            "projects":[
                                {
                                    "name":"项目A",
                                    "value":"",
                                    "description":""
                                },
                                {
                                    "name":"项目B",
                                    "value":"",
                                    "description":""
                                },
                                {
                                    "name":"项目c",
                                    "value":"",
                                    "description":""
                                },
                                {
                                    "name":"本项目",
                                    "value":"100",
                                    "description":""
                                }
                            ]
                        },
                        {
                            "name":"硬件档次",
                            "weight":"0",
                            "projects":[
                                {
                                    "name":"项目A",
                                    "value":"",
                                    "description":""
                                },
                                {
                                    "name":"项目B",
                                    "value":"",
                                    "description":""
                                },
                                {
                                    "name":"项目c",
                                    "value":"",
                                    "description":""
                                },
                                {
                                    "name":"本项目",
                                    "value":"100",
                                    "description":""
                                }
                            ]
                        },
                        {
                            "name":"停车位置量",
                            "weight":"0",
                            "projects":[
                                {
                                    "name":"项目A",
                                    "value":"",
                                    "description":""
                                },
                                {
                                    "name":"项目B",
                                    "value":"",
                                    "description":""
                                },
                                {
                                    "name":"项目c",
                                    "value":"",
                                    "description":""
                                },
                                {
                                    "name":"本项目",
                                    "value":"100",
                                    "description":""
                                }
                            ]
                        }
                    ],
                    "affect_others":[
                        {
                            "name":"租户品质",
                            "weight":"0",
                            "projects":[
                                {
                                    "name":"项目A",
                                    "value":"",
                                    "description":""
                                },
                                {
                                    "name":"项目B",
                                    "value":"",
                                    "description":""
                                },
                                {
                                    "name":"项目c",
                                    "value":"",
                                    "description":""
                                },
                                {
                                    "name":"本项目",
                                    "value":"100",
                                    "description":""
                                }
                            ]
                        },
                        {
                            "name":"企业品牌度",
                            "weight":"0",
                            "projects":[
                                {
                                    "name":"项目A",
                                    "value":"",
                                    "description":""
                                },
                                {
                                    "name":"项目B",
                                    "value":"",
                                    "description":""
                                },
                                {
                                    "name":"项目c",
                                    "value":"",
                                    "description":""
                                },
                                {
                                    "name":"本项目",
                                    "value":"100",
                                    "description":""
                                }
                            ]
                        },
                        {
                            "name":"免租期",
                            "weight":"0",
                            "projects":[
                                {
                                    "name":"项目A",
                                    "value":"",
                                    "description":""
                                },
                                {
                                    "name":"项目B",
                                    "value":"",
                                    "description":""
                                },
                                {
                                    "name":"项目c",
                                    "value":"",
                                    "description":""
                                },
                                {
                                    "name":"本项目",
                                    "value":"100",
                                    "description":""
                                }
                            ]
                        }
                    ]
                },
                "discount":"100",
                "rent_increase":[
                    {
                        "name":"主力店",
                        "value":{
                            "2016":"",
                            "2017":"",
                            "2018":"",
                            "2019":"",
                            "2020":""
                        }

                    },
                    {
                        "name":"次主力店",
                        "value":{
                            "2016":"0.2",
                            "2017":"",
                            "2018":"",
                            "2019":"",
                            "2020":""
                        }
                    },
                    {
                        "name":"中小商铺",
                        "value":{
                            "2016":"",
                            "2017":"",
                            "2018":"",
                            "2019":"",
                            "2020":""
                        }
                    }
                ],
                "ratios":{
                    "area":[
                        {"name":"0-20","value":""},
                        {"name":"20-40","value":""},
                        {"name":"40-80","value":""},
                        {"name":"80-150","value":"1"},
                        {"name":"150-250","value":""},
                        {"name":"250-400","value":""},
                        {"name":"400-500","value":""},
                        {"name":"500-600","value":""},
                        {"name":"600-800","value":""},
                        {"name":"800-1000","value":""},
                        {"name":"1000-1500","value":""},
                        {"name":"1500-2000","value":""},
                        {"name":"2000-3000","value":""},
                        {"name":"3000以上","value":""}
                    ],
                    "floors":[
                        {"name":"F1","value":""},
                        {"name":"F2","value":""},
                        {"name":"F3","value":""},
                        {"name":"F4","value":""}
                    ],
                    "position":[
                        {"name":"主入口","value":""},
                        {"name":"主立面外街","value":""},
                        {"name":"次入口","value":""},
                        {"name":"主通道","value":"1"},
                        {"name":"侧面外街","value":""},
                        {"name":"后街","value":""}
                    ]
                }

            }





            rpgSetData.data.rentalSettingsVo.openDate=rpgSetData.data.projectVo.openDate;

            var date = new Date(rpgSetData.data.projectVo.openDate);

            //var date=new Date();
            var year=date.getFullYear();//当年
            var yearObjMain={};
            var yearObjMainSecond={};
            var yearObjTHird={};
            for(var i=1;i<=9;i++){
                yearObjMain[(year+i).toString()]='';
            }
            for(var i=1;i<=9;i++){
                yearObjMainSecond[(year+i).toString()]='';
            }
            for(var i=1;i<=9;i++){
                yearObjTHird[(year+i).toString()]='';
            }
            rpgSetData.data.rentalSettingsVo.rent_increase[0].value=yearObjMain;
            rpgSetData.data.rentalSettingsVo.rent_increase[1].value=yearObjMainSecond;
            rpgSetData.data.rentalSettingsVo.rent_increase[2].value=yearObjTHird;
            rpgSetData.data.rentalSettingsVo.ratios.floors= rpgSetData.data.floorListMap;
            rpgSetData.data.rentalSettingsVo.projectName=rpgSetData.data.projectVo.projectName;


            // $("#pname_a").html(rpgSetData.data.rentalSettingsVo.rentCount.affect_position[0].projects[0].name);
            // $("#pname_b").html(rpgSetData.data.rentalSettingsVo.rentCount.affect_position[0].projects[1].name);
            // $("#pname_c").html(rpgSetData.data.rentalSettingsVo.rentCount.affect_position[0].projects[2].name);



        }else{
            $("#pname_a").html(rpgSetData.data.rentalSettingsVo.rentCount.affect_position[0].projects[0].name);
            $("#pname_b").html(rpgSetData.data.rentalSettingsVo.rentCount.affect_position[0].projects[1].name);
            $("#pname_c").html(rpgSetData.data.rentalSettingsVo.rentCount.affect_position[0].projects[2].name);
            $(".table td").find("span.span-editable").next("label").hide();
            $(".table td").find("span.span-editable").css("background-color", "#f3f4f8");


        }
        self.percentSum=function(){

        }

   // ng-model={{Ctrl.percentSum()}}
        self.rpgSetData=rpgSetData.data.rentalSettingsVo;
        self.setData=function () {
            $.each(self.rpgSetData.rentCount,function(k,v){
                $.each(v,function(i,e){
                    $.each(e.projects,function(t,p){
                        if(t==0){
                            p.name=$("#pname_a").html();
                        }
                        else if(t==1){
                            p.name=$("#pname_b").html();
                        }
                        else if(t==2){
                            p.name=$("#pname_c").html();
                        }

                    })
                });

            });

            $.each(self.affect_count,function(i,e){
                $.each(e.projects,function(t,p){
                    if(t==0){
                        p.name=$("#pname_a").html();
                    }
                    else if(t==1){
                        p.name=$("#pname_b").html();
                    }
                    else if(t==2){
                        p.name=$("#pname_c").html();
                    }

                })
            });

            if($scope.rpgSetForm.$invalid){
                alert("请输入正确的数据");
                return false;
            }else{
                //设置标准租金包的值
                self.rpgSetData.standardRent=self.affect_count[3].projects[3]["value"];
                self.rpgSetData.projectId=Project_id;
                var affectArray=new Array();
                affectArray.push(self.affect_count[1]);
                affectArray.push(self.affect_count[3]);
                var transData={ rentalSettings: self.rpgSetData,affectCount:affectArray };
                var req = {
                    method: 'POST',
                    url: dtPath+'/rpgSolo/rentalSettings/save.htm',
                    data: { transData:transData }
                }

                return $http(req).then(function (res) {
                    if(res.status='200') {
                        if (res.data.code == '0') {
                            alert('保存成功')
                            // $location.path("rpgresult");
                            // shopData.unshift(shop);
                            // self.recordsNum=self.indexData.length;
                            // self.pageNum=Math.ceil(parseFloat(self.recordsNum)/self.pageLimit);
                            // self.paginator=paginatorService(self.pageLimit,self.pageNum,self.indexData);
                            // //前段数据model 改变 确定成功后 改变前端数据model
                            // shopData[index] = shop;
                            // amp_main.rightPanel_close();
                        } else {
                            alert('推算租金包出错')
                        }
                    }else{
                        alert('网络不给力请稍候尝试')
                    }
                });
            }
        }
        self.setSave=function(){


            if((!self.affect_count[0].projects[0].value)&&(!self.affect_count[0].projects[1].value)&&(!self.affect_count[0].projects[2].value)){
                alert("请至少输入一个比较项目");
                return false;
            }

            if(!self.affect_count[0].projects[3].value){
                alert("请输入本项目的比较系数");
                return false;
            }

            if(self.affect_count[0].projects[0].value){
                if(!$("#pname_a").html()){
                    alert("请输入第一个比较的项目名称");
                    return false;
                }

            }

            if(self.affect_count[0].projects[1].value){
                if(!$("#pname_b").html()){
                    alert("请输入第二个比较的项目名称");
                    return false;
                }
            }

            if(self.affect_count[0].projects[2].value){
                if(!$("#pname_c").html()){
                    alert("请输入第三个比较的项目名称");
                    return false;
                }
            }



            $.each(self.rpgSetData.rentCount,function(k,v){
                $.each(v,function(i,e){
                    $.each(e.projects,function(t,p){
                        if(t==0){
                            p.name=$("#pname_a").html();
                        }
                        else if(t==1){
                            p.name=$("#pname_b").html();
                        }
                        else if(t==2){
                            p.name=$("#pname_c").html();
                        }

                    })
                });

            });

                $.each(self.affect_count,function(i,e){
                    $.each(e.projects,function(t,p){
                        if(t==0){
                            p.name=$("#pname_a").html();
                        }
                        else if(t==1){
                            p.name=$("#pname_b").html();
                        }
                        else if(t==2){
                            p.name=$("#pname_c").html();
                        }

                    })
                });






            if($scope.rpgSetForm.$invalid){
                alert("请输入正确的数据");
                return false;
            }else{
                if(!self.affect_count[3].projects[3]["value"]){
                       // alert("请填写完整参考租金计算");
                       // return false;
                        if(self.affect_count[0].projects[0].value){
                            if(!self.affect_count[1].projects[0].value){
                                alert("请输入第一个比较的项目的参考租金");
                                return false;
                            }

                            if(!self.affect_count[3].projects[0].value){
                                alert("请输入第一个比较的项目的参考权重");
                                return false;
                            }

                        }

                        if(self.affect_count[0].projects[1].value){
                            if(!self.affect_count[1].projects[1].value){
                                alert("请输入第二个比较的项目的参考租金");
                                return false;
                            }

                            if(!self.affect_count[3].projects[1].value){
                                alert("请输入第二个比较的项目的参考权重");
                                return false;
                            }
                        }

                        if(self.affect_count[0].projects[2].value){
                            if(!self.affect_count[1].projects[2].value){
                                alert("请输入第三个比较的项目的参考租金");
                                return false;
                            }

                            if(!self.affect_count[3].projects[2].value){
                                alert("请输入第三个比较的项目的参考权重");
                                return false;
                            }
                        }


                }
                if(!self.rpgSetData.discount){
                    alert("请填写完整首年租金折扣率");
                    return false;
                }
                var isValidate=true;
                $.each(self.rpgSetData.ratios.area,function(k,v){

                    if(!v.value){
                        alert("请填写完整面积分解系数");
                        isValidate=false;
                        return false;
                    }

                });
                if(!isValidate){
                    return false;
                }

                $.each(self.rpgSetData.ratios.floors,function(k,v){
                    if(!v.value){
                        alert("请填写完整楼层系数");
                        isValidate=false;
                        return false;
                    }
                });

                if(!isValidate){
                    return false;
                }

                $.each(self.rpgSetData.ratios.position,function(k,v){
                    if(!v.value){
                        alert("请填写完整位置系数");
                        isValidate=false;
                        return false;
                    }
                });
                if(!isValidate){
                    return false;
                }



                amp_main.loading_show();
                setTimeout(function(){
                    amp_main.loading_hide();
                },1000);

            //设置标准租金包的值
            self.rpgSetData.standardRent=self.affect_count[3].projects[3]["value"];
            self.rpgSetData.projectId=Project_id;
                var affectArray=new Array();
                affectArray.push(self.affect_count[1]);
                affectArray.push(self.affect_count[3]);
                var transData={ rentalSettings: self.rpgSetData,affectCount:affectArray };
            var req = {
                method: 'POST',
                url: dtPath+'/rpgSolo/rentalSettings/saveAndCaculate.htm',
                data: { transData:transData }
            }

            return $http(req).then(function (res) {
                if(res.status='200') {
                    if (res.data.code == '0') {
                        $location.path("rpgresult");
                        // shopData.unshift(shop);
                        // self.recordsNum=self.indexData.length;
                        // self.pageNum=Math.ceil(parseFloat(self.recordsNum)/self.pageLimit);
                        // self.paginator=paginatorService(self.pageLimit,self.pageNum,self.indexData);
                        // //前段数据model 改变 确定成功后 改变前端数据model
                        // shopData[index] = shop;
                        // amp_main.rightPanel_close();
                    } else {
                        alert('推算租金包出错')
                    }
                }else{
                    alert('网络不给力请稍候尝试')
                }
            });

                /*ui-sref="rpgresult"  ui-sref-active="active" href="#/rpgresult"*/
            }

            // console.log(self.rpgSetData)
        };


        //页面事件
        $(".page-main").on("click",function(e){
            e.stopPropagation();
            $(".table td").removeClass("active");
        });

        $(".table").on("click","td",function(e){
           e.stopPropagation();
            $(".table td").removeClass("active");
            $(this).addClass("active");
            $(this).find("input").focus();

            // $(this).find("span").css("background-color", "white");
            // $(this).find("span").next("label").hide();
        });            // $(this).find("span").next("label").hide();")
        //回车向下输入  只适合当前页面
        $(".table").on("keyup",function(e){
            if(e.keyCode==13 && e.target.nodeName.toLowerCase()==="input"){
                var $curInput=$(e.target);
                var rowSpan=parseInt($curInput.closest("tr").find("td").eq(0).attr("rowspan"));
                var trIndex= $curInput.closest("tr").index();
                var tdIndex= $curInput.closest("td").index();

                var th_len=parseInt($curInput.closest("tr").find("th").length);

                if(rowSpan>1){
                   // console.log(rowSpan);
                    //console.log(trIndex+"--"+tdIndex);
                    /*if()*/
                    $curInput.closest("tbody").find("tr").eq(trIndex+1).find("td").eq(tdIndex-1-th_len).trigger("click");

                }else{
                    //console.log(rowSpan);
                    //console.log(trIndex+"--"+tdIndex);
                    /*if()*/
                    if(parseInt($curInput.closest("tbody").find("tr").eq(trIndex+1).find("td").eq(0).attr("rowspan"))>1){
                        $curInput.closest("tbody").find("tr").eq(trIndex+1).find("td").eq(tdIndex-th_len+1).trigger("click");

                    }else{
                        $curInput.closest("tbody").find("tr").eq(trIndex+1).find("td").eq(tdIndex-th_len).trigger("click");
                    }

                }
            }

        });


        $("#rpg-set-main-table-head thead").on("click","td",function(e){
            e.stopPropagation();
            var td_width=parseInt($(this).css("width"));
            var td_offset=parseInt($(this).position().left);
            var translate=rpgSet_table.swipers.rpgSet_table_head_swiper.translate;
            var cont_width=rpgSet_table.swipers.rpgSet_table_head_swiper.width;

            if(td_offset+td_width+translate>cont_width){
                return false;
            }else{
                $(this).find("span.span-editable").addClass("focus");
                $(this).find("span.span-editable").focus();

            }
        });

        $(".table td").find("span.span-editable").focus(function() {
            $(this).css("background-color", "white");
            $(this).next("label").hide();
            //  background-color: #f3f4f8;
        });

        $(".table td").find("span.span-editable").blur(function() {
            if ($(this).html()) {
                $(this).css("background-color", "#f3f4f8");
            }else{
                $(this).next("label").show();
                $(this).css("background-color", "white");
            }
            //  background-color: #f3f4f8;
        });

        self.affectData =self.rpgSetData.rentCount;
            self.affect_count = [
                {
                    "name": "因素权重打分小计",
                    "value": "1",
                    "projects": [
                        {
                            "name": "项目A",
                            "value": "",
                            "description": ""
                        },
                        {
                            "name": "项目B",
                            "value": "",
                            "description": ""
                        },
                        {
                            "name": "项目c",
                            "value": "",
                            "description": ""
                        },
                        {
                            "name": "本项目",
                            "value": "",
                            "description": ""
                        }
                    ]
                },
                {
                    "name": "参考租金（元/平米/月）GLA",
                    "value": "",
                    "projects": [
                        {
                            "name": "项目A",
                            "value": "",
                            "description": ""
                        },
                        {
                            "name": "项目B",
                            "value": "",
                            "description": ""
                        },
                        {
                            "name": "项目c",
                            "value": "",
                            "description": ""
                        },
                        {
                            "name": "本项目",
                            "value": "",
                            "description": ""
                        }
                    ]
                },
                {
                    "name": "加权租金（元/平米/月，GLA）",
                    "value": "",
                    "projects": [
                        {
                            "name": "项目A",
                            "value": "",
                            "description": ""
                        },
                        {
                            "name": "项目B",
                            "value": "",
                            "description": ""
                        },
                        {
                            "name": "项目c",
                            "value": "",
                            "description": ""
                        },
                        {
                            "name": "本项目",
                            "value": "",
                            "description": ""
                        }
                    ]
                },
                {
                    "name": "参考权重（近似的比重高）",
                    "weight": "",
                    "projects": [
                        {
                            "name": "项目A",
                            "value": "",
                            "description": ""
                        },
                        {
                            "name": "项目B",
                            "value": "",
                            "description": ""
                        },
                        {
                            "name": "项目c",
                            "value": "",
                            "description": ""
                        },
                        {
                            "name": "本项目",
                            "value": "",
                            "description": ""
                        }
                    ]
                }
            ];
        if(rpgSetData.data.rentalSettingAffectCountVo) {
            try {
                self.affect_count[1].projects = rpgSetData.data.rentalSettingAffectCountVo[0].projects;
                self.affect_count[3].projects = rpgSetData.data.rentalSettingAffectCountVo[1].projects;
            }catch (e){

            }
        }
        self.affect_sum=function(index){
            var ratioArray_0=[];
            $.each(self.affectData,function(k,v){
                $.each(v,function(i,e){
                    var curRatio=parseFloat(e.weight)/100;
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

        self.sumWeight=function () {
            var curWeight=0;
            $.each(self.affectData,function(k,v){
                $.each(v,function(i,e){
                    var temp;
                    if(isNaN(e.weight)||e.weight==null){
                        temp=0;
                    }else{
                        temp=parseFloat(e.weight);
                    }
                    curWeight+=temp;
                });

            });
            return curWeight.toFixed(2);
        }


        self.updateWeight=function(){
            self.affect_count[0].projects[0]["value"]=self.affect_sum(0);
            self.affect_count[0].projects[1]["value"]=self.affect_sum(1);
            self.affect_count[0].projects[2]["value"]=self.affect_sum(2);
            self.affect_count[0].projects[3]["value"]=self.affect_sum(3);
            //加权租金
            self.affect_count[2].projects[0]["value"]=(self.affect_count[0].projects[3]["value"]*self.affect_count[1].projects[0]["value"]/self.affect_count[0].projects[0]["value"]).toFixed(2);
            if(!isFinite(self.affect_count[2].projects[0]["value"])){
                self.affect_count[2].projects[0]["value"]='-';
            }
            self.affect_count[2].projects[1]["value"]=(self.affect_count[0].projects[3]["value"]*self.affect_count[1].projects[1]["value"]/self.affect_count[0].projects[1]["value"]).toFixed(2);
            if(!isFinite(self.affect_count[2].projects[1]["value"])){
                self.affect_count[2].projects[1]["value"]='-';
            }
            self.affect_count[2].projects[2]["value"]=(self.affect_count[0].projects[3]["value"]*self.affect_count[1].projects[2]["value"]/self.affect_count[0].projects[2]["value"]).toFixed(2);
            if(!isFinite(self.affect_count[2].projects[2]["value"])){
                self.affect_count[2].projects[2]["value"]='-';
            }
            //参考租金
            if(!isNaN(self.affect_count[2].projects[0]["value"]*(self.affect_count[3].projects[0]["value"]/100))){
                self.affect_count[3].projects[3]["value"]=self.affect_count[2].projects[0]["value"]*(self.affect_count[3].projects[0]["value"]/100);
            }
            if(!isNaN(self.affect_count[2].projects[1]["value"]*(self.affect_count[3].projects[1]["value"]/100))){
                self.affect_count[3].projects[3]["value"]=self.affect_count[3].projects[3]["value"]+self.affect_count[2].projects[1]["value"]*(self.affect_count[3].projects[1]["value"]/100);
            }
            if(!isNaN(self.affect_count[2].projects[2]["value"]*(self.affect_count[3].projects[2]["value"]/100))){
                self.affect_count[3].projects[3]["value"]=self.affect_count[3].projects[3]["value"]+self.affect_count[2].projects[2]["value"]*(self.affect_count[3].projects[2]["value"]/100);
            }
            if(!isFinite(self.affect_count[3].projects[3]["value"])){
                self.affect_count[3].projects[3]["value"]='-';
            }
            //self.affect_count[3].projects[3]["value"]=self.affect_count[2].projects[0]["value"]*self.affect_count[3].projects[0]["value"]+self.affect_count[2].projects[1]["value"]*self.affect_count[3].projects[1]["value"]+self.affect_count[2].projects[2]["value"]*self.affect_count[3].projects[2]["value"]

        }


        self.updateWeight();

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

        $("#rgp-set").on("change","input",function(e){
            _checkErrot($(e.target));
        });

        //dataSetView.init();
        rpgSet_table.init();

        $(".ys-tips").tooltip();
        $scope.$on("$destroy", function() {
            rpgSet_table.destroy();
        })
    }]);

dataSet.controller("dataResultController",['$rootScope', '$scope',"rpgResultData","paginatorService",
    function($rootScope, $scope,rpgResultData,paginatorService) {
        var self=this;
        if(rpgResultData.code!=0){
            //alert("获取数据出错");
        }else{
            var shopData=rpgResultData.data;
            // shopData[0].indoorArea=12.22
        }
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


