$("body").on("click",".amp-collapse-table .amp-tbody .amp-table-row-content",function(e){
    e.stopPropagation();
    e.preventDefault();
    var that = this;

    if($(this).parent().find(".amp-table-row-collapse").length==0){
        return;
    }

    if($(this).parent().hasClass("amp-table-row-selected")){
        $(this).next(".amp-table-row-collapse").slideUp("fast",function(){
            $(that).parent().removeClass("amp-table-row-selected");
        });
    }else{
        $(this).closest(".amp-tbody").find(".amp-table-row-selected").each(function(){
            var $selectedRow = $(this);
            $selectedRow.find(".amp-table-row-collapse").slideUp("fast",function(){
                $selectedRow.removeClass("amp-table-row-selected");
            });
        });
        $(this).parent().addClass("amp-table-row-selected");
        $(this).next(".amp-table-row-collapse").slideDown("fast");
    }
});

$("body").on("click",".amp-select:not(.amp-select-disabled)",function(e){
    e.stopPropagation();
    e.preventDefault();
    $(this).toggleClass("open");
});

$("body").on("click touchend",".amp-select ul li",function(e){
    e.stopPropagation();
    e.preventDefault();
    var html =  $(this).html();
    $(this).closest(".amp-select").find("input").val(html);
    $(this).closest(".amp-select").removeClass("open");
    $(this).closest(".amp-select").find("li").removeClass("active");
    $(this).addClass("active");
});


$("body").on("click",".amp-input.amp-multiple-input",function(e){
    e.stopPropagation();
    e.preventDefault();

    var that = this;

    $("body").find(".amp-input.amp-multiple-input").each(function(){
        if(that==this){
            return;
        }
        $("body").find(".amp-input.amp-multiple-input").addClass("text-show");
    });

    if($(this).hasClass("text-show")){
        $(this).removeClass("text-show");
        $(this).find("input").focus();
    }

});

$("body").on("click",function(e){
    $("body").find(".amp-input.amp-multiple-input").addClass("text-show");
});