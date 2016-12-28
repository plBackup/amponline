/**
 * Created by limeiting on 16/11/10.
 */

/**
 * Created by limeiting on 16/11/6.
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
        ampApp.collector.add_swiper(irr_plan_head_swiper);
        ampApp.collector.add_swiper(irr_plan_main_swiper);

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

    irr_plan.destory=function(){
        irr_plan_head_swiper.destory();
        irr_plan_main_swiper.destory();
    };
    irr_plan.init=function(){
        
        irr_plan.swiper_init();
        irr_plan.table_init();
        $('#preloader').delay(350).fadeOut(function(){
            //start
        });
    };

    return irr_plan;
})(jQuery,irr_plan||{});


























