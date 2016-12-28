/**
 * Created by limeiting on 16/11/10.
 */

/**
 * Created by limeiting on 16/11/6.
 */
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

        //这里把swiper实例加入全局的垃圾回收站
        ampApp.collector.add_swiper(rpg_result_table_head_rpg_result);
        ampApp.collector.add_swiper(rpg_result_table_main_rpg_result);

        pin=$(".ys-table-fixed-top").pin({
            containerSelector: "#rpg-result-table-wrapper",
            padding: {top: 88, bottom: 50}
        });

        var defer=null;
        function _rpg_resultUpdate(){
            rpg_result_table_head_rpg_result.update();
            rpg_result_table_main_rpg_result.update();
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

    rpg_result_table.destory=function(){
        rpg_result_table_head_rpg_result.destory();
        rpg_result_table_main_rpg_result.destory();
    };
    rpg_result_table.init=function(){

        rpg_result_table.rpg_result_init();
        rpg_result_table.table_init();
        $('#preloader').delay(350).fadeOut(function(){
            //start
        });
    };

    return rpg_result_table;
})(jQuery,rpg_result_table||{});
























