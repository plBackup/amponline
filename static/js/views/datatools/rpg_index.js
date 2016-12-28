/**
 * Created by limeiting on 16/11/10.
 */

/**
 * Created by limeiting on 16/11/6.
 */
var rpgIndex_table=(function($,rpgIndex_table){
    var rpgIndex_table=rpgIndex_table;
    var pin;
    rpgIndex_table.swiper_init=function(){
        pin=$(".ys-table-fixed-top").pin({
            containerSelector: "#noi-main-table-wrapper",
            padding: {top: 44, bottom: 50}
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
    };

    rpgIndex_table.show_right=function(){
        $("#rent-package").on("click",".ys-table-main tr",function(e){
            e.preventDefault();
            amp_main.rightPanel_open();
        });
    }
    rpgIndex_table.init=function(){
        rpgIndex_table.swiper_init();
        rpgIndex_table.show_right();
        $('#preloader').delay(350).fadeOut(function(){
            //start
        });
    };

    return rpgIndex_table;
})(jQuery,rpgIndex_table||{});

























