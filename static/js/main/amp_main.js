/**
 * Created by user on 2016/10/18.
 */

var amp_main=(function($,menu,am){
    var amp_main=am;

    var menu_list=menu;
    var left_panel_scroll;
    if(typeof menu_list==="undefined"){
        alert("请先配置页面功能目录");
        return false;
    }

    amp_main.menu_init=function(sys){
        var menu=menu_list[sys];
        var $main_nav_container=$(".nav-bracket");
        var main_navs=[];
        $.each(menu,function(i,e){

                var main_nav_name= e.name;
                var main_nav_target= e.target;
                var main_nav_links= e.links;
                var boolean_show_sub= e.show_sub_menu;
                var boolean_re_locate= e.re_locate;
                var boolean_show_header=e.show_page_header;
                var sub_menu= e.sub_menu;
                var sub_menu_length=sub_menu.length;
                var main_index= e.index;
                var main_id=i;
                var icon= e.icon;
                if(boolean_show_sub==false){
                   var li_item=[
                       '<li>',
                       '<a ui-sref="'+main_nav_links,
                       '" href="#/'+main_nav_links,
                        '" class="ys-menu-link"',
                       ' id="'+main_index+'"',
                       ' data-show-header="'+boolean_show_header+'"',
                       ' data-relocate="'+boolean_re_locate+'">',
                        '<em class="ys-icon-spirit '+icon+'"></em>',
                        '<span>'+main_nav_name+'</span>',
                           '</a></li>'
                   ].join("");

                    main_navs.push(li_item);
                }else{
                    var sub_ul=[];
                    if(sub_menu_length>=1){
                        $.each(sub_menu,function(i,e){
                            var sub_id=i;
                            var sub_li=[
                                '<li>',
                                    '<a ui-sref="'+ e.links+'" target="'+ e.target+'" data-show-header="'+e.show_page_header+'" data-relocate="'+ e.re_locate+'" id="sub-'+ main_id+'-'+sub_id+'">'+ e.name+'</a>',
                                '</li>'
                            ].join("");
                            sub_ul.push(sub_li);
                        });
                    }

                    var li_item=[
                        '<li class="nav-parent">',
                        '<a ui-sref="#header-tabs-'+i+'" class="ys-menu-link" id="'+main_index+'">',
                         '<em class="ys-icon-spirit '+icon+'"></em>',
                         '<span>'+main_nav_name+'</span>',
                        '</a>',
                          '<ul class="children">',
                               sub_ul.join(""),
                            '</ul>',
                        '</li>'
                    ].join("");

                    main_navs.push(li_item);
                }
        });

        $main_nav_container.empty().append(main_navs.join(""));
    };

    amp_main.header_tab_init=function(sys){
        var menu=menu_list[sys];
        var $header_tab_container=$(".head-main-menu");
        var tab_navs=[];

        $.each(menu,function(i,e){
            var main_nav_target= e.target;
            var sub_menu= e.sub_menu;
            var sub_menu_length=sub_menu.length;
            var main_index=i;
            var sub_li=[];

            $.each(sub_menu,function(i,e){
               var sub_index=i;
               var li_item=[
                   '<li role="presentation" id="nav-tabs-item-'+main_index+'-'+sub_index+'">',
                   '<a ui-sref="'+e.links+'" href="#/'+e.links+'" role="tab" data-toggle="tab-temp" data-show-header="'+e.show_page_header+'" data-href="'+ e.links+'" data-relocate="'+ e.re_locate+'" id="nav-'+main_index+'-'+sub_index+'">'+ e.name+'</a>',
                   '</li>',
               ];
                sub_li.push(li_item.join(""));
            });
            var sub_menu_item=[
                '<ul class="nav nav-tabs animated" role="tablist" id="'+'header-tabs-'+main_index+'">',
                    sub_li.join(""),
                '</ul>'
            ];
            tab_navs.push(sub_menu_item.join(""));
        });

        $header_tab_container.empty().append(tab_navs.join(""));
    };




    function closeVisibleSubMenu() {
        $('.nav-parent').each(function() {
            var $item = $(this);
            if($item.hasClass('nav-active')) {
                $item.find('> ul').slideUp(200, function(){
                    $item.removeClass('nav-active');
                });
            }
        });
    }

    function adjustmainpanelheight() {
        // 展开子菜单检查页面高度
        var docHeight = $(document).height();
        if(docHeight > $('.mainpanel').height())
            $('.mainpanel').height(docHeight);
    }

    amp_main.sideNav_init=function(){
        // hover
        $('.nav-bracket > li').hover(function(){
            $(this).addClass('nav-hover');
        }, function(){
            $(this).removeClass('nav-hover');
        });
        // Toggle 展开
        $('.nav-parent > a').click(function(e) {
            //e.preventDefault();
            var $parent = $(this).parent();
            var $sub = $parent.find('> ul');

            // Dropdown works only when leftpanel is not collapsed
            if(!$('body').hasClass('leftpanel-collapsed')) {
                if($sub.is(':visible')) {
                    $sub.slideUp(200, function(){
                        $parent.removeClass('nav-active');
                        $('.mainpanel').css({height: ''});
                        adjustmainpanelheight();
                    });
                } else {
                    closeVisibleSubMenu();
                    $parent.addClass('nav-active');
                    $sub.slideDown(200, function(){
                        adjustmainpanelheight();
                    });
                }
            }
            return false;
        });

    };

    /*逻辑是根据 根据遍历时的index定位相应元素*/
    function render_menu(id){
        var id_array=id.split("-");
        if(!$("#"+id).hasClass("active")){
            if(id_array[0]=="main"){
                $(".head-main-menu .nav-tabs").removeClass("active fadeIn");
                $("#header-tabs-"+id_array[1]).addClass("active fadeIn").find("li").removeClass("active");
                $("#nav-tabs-item-"+id_array[1]+"-"+0).addClass("active");

            }else if(id_array[0]=="sub"){

                if(!$("#"+id).closest(".nav-parent").hasClass("active")) {
                    $(".head-main-menu .nav-tabs").removeClass("active fadeIn");
                    $("#header-tabs-"+id_array[1]).addClass("active fadeIn").find("li").removeClass("active");

                }else{
                    $("#header-tabs-"+id_array[1]).find("li").removeClass("active");
                }
                    $("#nav-tabs-item-"+id_array[1]+"-"+id_array[2]).addClass("active");
            }
        }
    }

    function re_locate(id,href){
        //alert(href);
        var boolean_re_locate=$("#"+id).data("relocate");
        //alert(boolean_re_locate);
        if(boolean_re_locate==true){
            $(".ys-amp").trigger("relocate",[id,href]);
        }else if(typeof boolean_re_locate==="undefined"){
            $("#"+"id").addClass("active");
            $(".ys-amp").trigger("relocate",[id,href]);
        }

    }

    amp_main.sideNav_nav=function(){
        $('.nav-bracket  a').on("click touchend",function(e){
            //e.preventDefault();
            if($(this).hasClass("ys-menu-link")){
                //一级目录
                var $parent=$(this).parent("li");
                if(!$parent.hasClass("active") &&  !$parent.hasClass("nav-parent")){
                   // $(".nav-parent").removeClass("nav-active");
                    $(".nav-bracket li").removeClass("active");
                    $(this).parent("li").addClass("active");
                    $(".nav-active>ul").slideUp(200, function(){
                        $(this).parent().removeClass('nav-active');
                        $('.mainpanel').css({height: ''});
                        adjustmainpanelheight();
                    });
                    //relocate & render menu
                    var href=$(this).attr("href");
                    var id=$(this).attr("id");
                    render_menu(id);
                    re_locate(id,href);

                }
            }else{
                //二级目录
                var href=$(this).attr("href");
                var id=$(this).attr("id");
                render_menu(id);
                re_locate(id,href);

                if(!$(this).closest("li.nav-parent").hasClass("active")){
                    $(".nav-bracket li").removeClass("active");
                    //$(".nav-parent").removeClass("nav-active");
                    $(this).parent("li").addClass("active").closest(".nav-parent").addClass("active");
                    //relocate & render menu
                }else{
                    if(!$(this).parent("li").hasClass("active")){
                        $("ul.children li").removeClass("active");
                        $(this).parent("li").addClass("active");
                        //relocate & render menu
                      /*  var href=$(this).attr("href");
                        var id=$(this).attr("id");
                        render_menu(id);
                        re_locate(id,href);*/
                    }
                }
            }
        });
    };

    amp_main.subNav_init=function(){
        $(".head-main-menu").on("click touchend","a",function(e){
            //e.preventDefault();
            $this=$(this);
            if(!$this.parent("li").hasClass("active")){
                $this.closest("ul").find("li").removeClass("active");
                $this.parent("li").addClass("active");
                var id=$this.attr("id");
                var href=$(this).attr("href");
                re_locate(id,href);
            }else{
                return;
            }
        });
    };
    amp_main.collapse_init=function(){
        // Menu Toggle
        $('.menutoggle').on("click touchend",function(e){
            e.preventDefault();

            var $body = $('body');
            var bodypos = $body.css('position');

            if(!$body.hasClass('leftpanel-collapsed')) {
                $body.addClass('leftpanel-collapsed');
                $('.nav-bracket ul').attr('style','');
                $(this).addClass('menu-collapsed');
            } else {
                $body.removeClass('leftpanel-collapsed');
                $('.nav-bracket li.active ul').css({display: 'block'});
                $(this).removeClass('menu-collapsed');
            }
        });

    };

    amp_main.leftPanel_init=function(){
        var h=parseInt($(window).height());
         $(".leftpanelinner").css({
             height:(h-100)+"px",
             "overflow":"hidden"
         });
         left_panel_scroll = new IScroll('.leftpanelinner', {
            mouseWheel: true,
            scrollbars: false
        });

        var defer=null;
        var scrollUpdate=function(){
            var h=parseInt($(window).height());
            $(".leftpanelinner").css({
                height:(h-100)+"px",
                "overflow":"hidden"
            });
            left_panel_scroll.refresh();
        };

        $(window).resize(function(){
            if(!defer){
                defer=setTimeout(function(){
                    scrollUpdate();
                    defer=null;
                },200);
            }else{
                clearTimeout(defer);
                defer=setTimeout(function(){
                    scrollUpdate();
                    defer=null;
                },200);
            }

        });
        setTimeout(scrollUpdate,300);
    };

    amp_main.leftPanel_update=function(){
        var h=parseInt($(window).height());
        $(".leftpanelinner").css({
            height:(h-100)+"px",
            "overflow":"hidden"
        });
        left_panel_scroll.refresh();
    };
    /*right panel 调用*/
    amp_main.rightPanel_open=function(){
        $("body,html").css("overflow","hidden");
        $("body").addClass("open open-panel");
        $(".ys-amp").trigger("right_panel_open");
    };

    amp_main.rightPanel_close=function(){
        $("body,html").css("overflow","auto");
        $("body").removeClass("open open-panel");
        $(".ys-amp").trigger("right_panel_close");
    };
    amp_main.rightPanel_init=function(){
        $(".rightpanel").on("click touchend",".closebtn",function(e){
            e.preventDefault();
            amp_main.rightPanel_close();
        })
    };

    amp_main.loading_show=function(){
        $("body,html").css("overflow","hidden");
        $(".amp-loading").fadeIn();
    };

    amp_main.loading_hide=function(){
        $("body,html").css("overflow","auto");
        $(".amp-loading").fadeOut();
    };

    amp_main.placeholder_init=function(){
        // Page Preloader
        $('#preloader').delay(350).fadeOut(function(){
           // $('body').delay(350).css({'overflow':'visible'});
        });
    };

    function _isPC()
    {
        var userAgentInfo = navigator.userAgent;
        var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
        var isPC= true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) { isPC = false; break; }
        }
        return isPC;
    }
    amp_main.init=function(sys){
        if(!sys){
            sys="amp_menu";
        }
        amp_main.menu_init(sys);
        amp_main.header_tab_init(sys);
        amp_main.collapse_init();
        amp_main.sideNav_init();
        amp_main.sideNav_nav();
        amp_main.subNav_init();
        amp_main.leftPanel_init();
        amp_main.rightPanel_init();
        //$("#main-0").trigger("click");

        /*$(".head-main-menu").on("click","a",function(e){
            e.preventDefault();
            //判断是否显示工具栏
            $(".pageheader").removeClass("active");
            if($(this).data("show-header")==true){
                $(".pageheader").addClass("active");
            }
           if($(this).data("relocate")==true){
               var href=$(this).data("href");
               var id=$(this).attr("id");
               re_locate(id,href);
           }
        });*/
        var is_pc=_isPC();
        if(!is_pc){
            $(".menutoggle").click();
        }
    };
    return amp_main;
})(jQuery,menu_list,amp_main||{});

