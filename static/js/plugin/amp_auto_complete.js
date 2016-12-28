(function(){
    var ampDirectiveCollection = null;
    try{
        ampDirectiveCollection = angular.module("amp-directive-collection");
    }catch(e){
        ampDirectiveCollection = ampDirectiveCollection||angular.module("amp-directive-collection",[]);
    }

    $(document).on("click",function(e){
        e.stopPropagation();
        $(".amp-auto-complete").removeClass("open");
    });
    // 自动匹配
    ampDirectiveCollection.directive("ampAutoComplete",["$timeout",function($timeout){
        return {
            restrict:"C",
            template:"<input type='text'/><ul></ul>",
            scope:{
                reload:"&",
                source:"="
            },
            link:function(scope,ele,attrs){
                scope.$watchCollection("source",function(newVal,oldVal){
                    if(newVal==null||!newVal instanceof Array||newVal.length==0){
                        return;
                    }
                    var html = "";
                    newVal.forEach(function(item){
                        var id = item.id;
                        var name = item.name;
                        html+="<li data-id='"+id+"' data-name='"+name+"'>"+name+"</li>";
                    });
                    $(ele).find("ul").html(html);
                    $(ele).addClass("open");
                });

                var loadTimeout = null;
                $(ele).on("keydown","input",function(e){
                    e.stopPropagation();
                    $timeout.cancel(loadTimeout);

                    var that = this;

                    loadTimeout = $timeout(function(){
                        var inputValue = $(that).val();
                        scope.reload({inputMsg:inputValue});
                    },1000);
                });

                $(ele).on("click","ul li",function(e){
                    e.stopPropagation();
                    e.preventDefault();
                    var id = $(this).attr("data-id");
                    var name = $(this).attr("data-name");
                    $(this).closest("ul").prev().val(name);
                    $(ele).attr("data-selected-id",id);
                    $(ele).attr("data-selected-name",name);
                    $(ele).removeClass("open");
                });

            }
        }
    }]);



})();