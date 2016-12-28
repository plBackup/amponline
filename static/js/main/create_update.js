/**
 * Created by limeiting on 16/11/16.
 */
var project_create=(function($,pc){
    var project_create=pc;

    project_create.init=function(){
        $("#open-date").datetimepicker({
            format: "yyyy-mm-dd",
            autoclose: true,
            todayBtn: true,
            pickerPosition: "bottom-left",
            startView:3,
            minView:2,
            maxView:4,
            language:"zh-CN"
        });
        $(".input-select").each(function(i,e){
            var curVal=$(this).find("input").val();
            if(curVal!=""){
                $(this).find("button.dropdown-toggle>em").text(curVal);
                $(this).find(".dropdown-menu a").each(function(i,e){
                    if($(this).text().trim()==curVal){
                        $(this).closest("li").addClass("active");
                    }
                });
            }
        });

        $(".input-select").on("click touchend",".dropdown-menu a",function(e){
           /* alert("click touchend");*/
            var $select=$(this).closest(".input-select");
            var $this=$(this);
            e.preventDefault();
            var curSelect=$this.text().trim();
            $this.closest("ul.dropdown-menu").find("li").removeClass("active");
            $this.parent("li").addClass("active");

            $select.find("button.dropdown-toggle>em").text(curSelect);
            $select.find("input").val(curSelect);

        });
    };

    return project_create;
})(jQuery,project_create||{})