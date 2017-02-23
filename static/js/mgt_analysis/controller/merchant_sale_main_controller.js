ampApp.controller("merchant-sale-main-controller",["$scope","$filter","$http","$rootScope",function($scope,$filter,$http,$rootScope){
    $scope.records = [];

    function initializeData(data){
        $scope.records = data;
    }

    /* ======================================== 监听广播事件 ======================================== */



    $scope.$on("$destroy",function(){destroy();});



    /* ======================================== 初始化页面 ======================================== */
    var container = null;
    var pin = null;
    function initPageView(){
        container = $("#merchant-sale-main");

        createSalePercentPie();
        createMerchantPercentPie();

        var width = $(container).find(".dept-table-head").outerWidth();
        $(container).find(".dept-table-head").css("width",width+"px");

        pin = $(container).find(".dept-table-head").pin({
            containerSelector: $(container).find(".cost-manual-work-pin-wrapper"),
            padding: {top: 44, bottom: 0}
        });

        setTimeout(function(){
            pin.refresh();
        },500);
    }

    /* ======================================== 绑定事件 ======================================== */
    function bindPageEvents(){
        container.on("click",".pie-text",function(e){
            e.stopPropagation();
            e.preventDefault();
            window.location = "#/shop_sale_rank";
        });

        container.on("click",".parent-record",function(e){
            e.stopPropagation();
            e.preventDefault();

            var group = $(this).attr("data-group");
            $(container).find("tr[data-group=" + group + "]:not(.parent-record)").toggleClass("amp-display-hide");
            $(this).find("a.collapse-btn").toggleClass("collapsed");
        });

        container.on("click",".table-block tbody tr:not(.parent-record) td:first-child",function(e){
            e.stopPropagation();
            e.preventDefault();
            var type = $(this).attr("data-type");
            if(type=="餐饮"){
                type = "catering";
            }else if(type=="配套"){
                type = "mating";
            }else if(type=="服装"){
                type = "clothing";
            }else if(type=="儿童"){
                type = "children";
            }else if(type=="影院"){
                type = "cinema";
            }else{
                return;
            }
            globalStorage.setSessionData("select_commercial_type_for_sale",type);

            window.location = "#/shop_sale_type_list";
        });
    }

    /* ======================================== common methods ======================================== */
    function destroy(){
    }
    function createSalePercentPie() {
        var id = "sale-percent-pie";
        var myChart = echarts.init(document.getElementById(id));
        var option = {
            color:["#5ab46e","#d9dedf"],
            tooltip:{show:true,formatter:"{b}:{d}%"},
            series: [
                {
                    type:"pie",
                    radius: ["70px", "100px"],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {show: false}
                    },
                    startAngle:90,
                    data:[{name:"排名前10%的商家销售占比",value:16251462.38},{name:"其他商家",value:17696209.62}],
                    silent: false,
                    hoverAnimation:false
                }
            ]
        };

        myChart.setOption(option);

        $("#"+id).append("<div class='pie-text'>销售占比</div>");
    }

    function createMerchantPercentPie() {
        var id = "merchant-percent-pie";
        var myChart = echarts.init(document.getElementById(id));
        var option = {
            color:["#5ab46e","#d9dedf"],
            tooltip:{show:true,formatter:"{b}:{d}%"},
            series: [
                {
                    type:"pie",
                    radius: ["70px", "100px"],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {show: false}
                    },
                    startAngle:90,
                    data:[{name:"90%销售贡献的商家占比",value:93},{name:"10%销售贡献的商家占比",value:117}],
                    silent: false,
                    hoverAnimation:false
                }
            ]
        };

        myChart.setOption(option);

        $("#"+id).append("<div class='pie-text'>商家占比</div>");
    }

    // 初始化
    function init(){
        var projectId = $rootScope.curProject;
        var url = "../static/js/mgt_analysis/data/"+projectId+"/merchant_sale_main_data.json";
        $http.get(url).success(function(result){
            initializeData(result);
            initPageView();
            bindPageEvents();
        });
    }
    setTimeout(function(){
        init();
    },300);
}]);



