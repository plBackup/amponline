/**
 * Created by user on 2016/3/10.
 */

//菜单操作－－与svgeditor的curMode绑定，以实现不同的操作；
$(document).ready(function(){
  window.lastOpt=null;

    //拆铺操作
    $("#split-button").on("click",function(e){
        e.preventDefault();

        if($("#compressed-show").hasClass("active")){
            alert("每次只能对单一合铺进行拆铺！");
            return;
        }
        var $cur_select=$(".cur-select");

        if($cur_select.length>0 && $cur_select.get(0).classList.contains("compressed")){
           var compressed_class="compressed-"+$cur_select.data("compressed");
            $cur_select.each(function(i,e){
                this.classList.remove("compressed");
                this.classList.remove(compressed_class);
                this.classList.remove("cur-select");
            });
            alert("拆铺完成");
        }else{
            alert("没有可进行的拆铺操作");
        }
    });

    $("#compressed-show").on("click",function(e){
        e.preventDefault();
        if($(this).hasClass("active")){
            $(".compressed").each(function(i,e){
                this.classList.remove("cur-select");
            });
            $(this).removeClass("active");
        }else{
           $(this).addClass("active");
            $(".compressed").each(function(i,e){
                this.classList.add("cur-select");
            });
        }
    });

   //合铺操作
  $("#compressed-button").on("click",function(e){
      e.preventDefault();
      console.log("compress---------------");
      var set_class=$("#compressed-info input").val();
      var cur_select_set=$(".cur-select");
      if(set_class=="" ||set_class==null){
          alert("请先输入合铺ID");
          return;
      }
      if(cur_select_set.length <=1){
          alert("至少选择两个独立店铺进行合铺");
          return;
      }
      $(".cur-select").each(function(i,e){
          $(this).attr("data-compressed",set_class);
          var curClassList=this.classList;
          curClassList.add("compressed");
          curClassList.add("compressed-"+set_class);
          curClassList.remove("cur-select");
      });

      //合铺id input 归零
      $("#compressed-info input").val("");
  });



});