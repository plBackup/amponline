/**
 * Created by limeiting on 16/11/10.
 */

/**
 * Created by limeiting on 16/11/6.
 */
var swiper_table=(function($,swiper_table){
    var swiper_table=swiper_table;
    var pin;
    var swiper_table_head_swiper,swiper_table_main_swiper;
    swiper_table.swiper_init=function(){
        swiper_table_head_swiper = new Swiper('#rpg-set-main-table-head', {
            //scrollbar: '.swiper-scrollbar',
            direction: 'horizontal',
            slidesPerView: 'auto',
            //mousewheelControl: true,
            freeMode: true,
            scrollbarHide:true
        });
        swiper_table_main_swiper = new Swiper('#rpg-set-main-table', {
            scrollbar: '.swiper-scrollbar',
            direction: 'horizontal',
            slidesPerView: 'auto',
            //mousewheelControl: true,
            freeMode: true,
            scrollbarHide:false
        });
        swiper_table_head_swiper.params.control = swiper_table_main_swiper;
        swiper_table_main_swiper.params.control = swiper_table_head_swiper;

        //这里把swiper实例加入全局的垃圾回收站
        ampApp.collector.add_swiper(swiper_table_head_swiper);
        ampApp.collector.add_swiper(swiper_table_main_swiper);

        pin=$(".ys-table-fixed-top").pin({
            containerSelector: "#rpg-set-table-wrapper",
            padding: {top: 44, bottom: 50}
        });

        var defer=null;
        function _swiperUpdate(){
            /*swiper_table_head_swiper.update();
            swiper_table_main_swiper.update();*/
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

    swiper_table.table_init=function(){
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

    swiper_table.destory=function(){
        swiper_table_head_swiper.destory();
        swiper_table_main_swiper.destory();
    };
    swiper_table.init=function(){
        
        swiper_table.swiper_init();
        swiper_table.table_init();
        $('#preloader').delay(350).fadeOut(function(){
            //start
        });
    };

    return swiper_table;
})(jQuery,swiper_table||{});


jQuery(document).ready(function(){
    alert("...");
    swiper_table.init();
});
























