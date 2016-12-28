/**
 * Created by limeiting on 16/11/11.
 */
/**
 * Created by limeiting on 16/11/4.
 */
var rpg_rpanel=(function($,rr){
    var rpg_rpanel=rr;

    //item-select-filter
    rpg_rpanel.dropdownSelector=function(){
        $(".input-wrapper-select").each(function(i,e){
            var curVal=$(this).find("input").val().trim();
            if(curVal!=""){
                $(this).find("button.dropdown-toggle>em").text(curVal);
                $(this).find(".dropdown-menu a").each(function(i,e){
                    if($(this).text().trim()==curVal){
                        $(this).closest("li").addClass("active");
                    }
                });
            }
        });

        $(".input-wrapper-select").on("click",".dropdown-menu a",function(e){
            var $select=$(this).closest(".input-wrapper-select");
            var $this=$(this);
            e.preventDefault();
            var curSelect=$this.text().trim();
            $this.closest("ul.dropdown-menu").find("li").removeClass("active");
            $this.parent("li").addClass("active");

            $select.find("button.dropdown-toggle>em").text(curSelect);
            $select.find("input").val(curSelect);

        });
    };

    rpg_rpanel.init=function(){
        $("input").on("focus",function(){
            $(this).closest(".input-wrapper-select").addClass("out-ring");
        });
        $("input").on("blur",function(){
            $(this).closest(".input-wrapper-select").removeClass("out-ring");
        });
        $("#rent-package-rpanel").on("click",".btn-wrapper>a",function(e){
            e.preventDefault();
            amp_main.rightPanel_close();
        });
    };

    return rpg_rpanel;
})(jQuery,rpg_rpanel||{});

