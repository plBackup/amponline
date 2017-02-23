/**
 * Created by plocc on 16/3/24.
 */
svg_editor.default={
    name:"legend",
    //"超市","影院","服装","餐饮","娱乐","配套","儿童","其他"
    labels:[
        {"name":"未签署", "class":"default",  "color":"#a4b5bd"},
        {"name":"超市", "class":"super-market",  "color":"#f1dcbd"},
        {"name":"影院", "class":"cinema",  "color":"#f1dcbd"},
        {"name":"服饰", "class":"suit",  "color":"#ffabd4"},
        {"name":"配套", "class":"mating",  "color":"#b56d00"},
        {"name":"餐饮", "class":"food",  "color":"#ffe700"},
        {"name":"娱乐", "class":"playful",  "color":"#f1dcbd"},
        {"name":"儿童", "class":"children",  "color":"#f1dcbd"},
        {"name":"其他", "class":"others",  "color":"#f1dcbd"},
    ]
};
svg_editor.legend={
    render_style:function(labels){
        /**
         * 根据id=svg-legend-style判断是否已经存在相应的style，如果存在，先删除，再添加
         */
        var legend_style=$("#svg-legend-style");
        console.log("=======legend-style=======");
        console.log(legend_style);
        console.log(legend_style.length);
        if(legend_style.length>0){
            console.log("........")
            $("#svg-legend-style").remove();
        }

        var style_elm_before='<style type="text/css" id="svg-legend-style">' ;

        var style_elm_end= ".cur-select{stroke:black;strokeWidth: 5;fill:red;stroke-dasharray:12;fill-opacity:0.8;color:red;cursor:pointer;}"
        var style_elm_after='</style>';

        $.each(labels,function(i,label){
            var style_item=render_style_item(label['name'],label["class"],label["color"],label);
            style_elm_before+=style_item;
        });
        svg_editor.legendStyle=style_elm_before+style_elm_end+style_elm_after;

        console.log( svg_editor.legendStyle);
        function render_style_item(name,cls,color,label) {
            var style_template = [
                ".",
                cls,
                '{fill:',
                color,
                ';fill-opacity:',
                 label["fill-opacity"]?label['fill-opacity']:1,
                /*';stroke-width:',
                 label["stroke-width"]?label["stroke-width"]:1,*/
               /* ";stroke:",
                label["stroke"]?label["stroke"]: "none",
                ";stroke-dasharray:",
                label["stroke-dasharray"]?label["stroke-dasharray"]:"none",*/
                ";cursor:",
                label["cursor"]?label["cursor"]:"default",
                ';}'
            ];
            return style_template.join("");
        };
    }//end render_style
};

svg_editor.legend_init=function(url){
    var sv=svg_editor;
    var legend=svg_editor.legend;
    var legend_data= svg_editor.default;
    //扩展定制时code
    /*$.getJSON(url,function(data){
        console.log(data);
        var legend_data= $.extend(svg_editor.default,data);
        console.log(legend_data);
        legend.render_style(legend_data.labels);
    });*/

    legend.render_style(legend_data.labels);
};
//扩展定制时code
/*
svg_editor.legend_init("legend_json.json");*/
//amp svg是后加载，所以legend_init放入svg_editor.refresh里调用
//svg_editor.legend_init();