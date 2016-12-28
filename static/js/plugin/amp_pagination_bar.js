(function(){
    // 获取 amp-directive-collection 模块
    var ampDirectiveCollection = null;
    try{
        ampDirectiveCollection = angular.module("amp-directive-collection");
    }catch(e){
        ampDirectiveCollection = ampDirectiveCollection||angular.module("amp-directive-collection",[]);
    }


    // 自动匹配
    ampDirectiveCollection.directive("ampPaginationToolbar",["$timeout",function($timeout){
        return {
            restrict:"C",
            template:   "<span>共{{paginationInfo.recordCount}}条记录,当前{{paginationInfo.pageNo}}/{{paginationInfo.pageCount}}页</span>"+
                        "<div class='pagination-nav-group'>                                  "+
                        "	<a class='pagination-prev-btn'>&lt;</a>                          "+
                        "	<a class='pagination-next-btn'>&gt;</a>                          "+
                        "	<input type='number' ng-model='paginationInfo.pageNo'/>                        "+
                        "</div>                                                              "+
                        "<input type='hidden' value='{{paginationInfo.pageSize}}'/>"+
                        "<a class='pagination-ok-btn'>确定</a>                               ",
            scope:{
                paginationInfo:"=",
                fetchData:"&"

            },
            link:function(scope,ele,attrs) {

                $(ele).on("click","a.pagination-prev-btn",function(e){
                    e.stopPropagation();
                    e.preventDefault();
                    if(scope.paginationInfo.pageNo==1){
                        return;
                    }
                    scope.paginationInfo.pageNo--; // 往前翻页
                    scope.fetchData();
                });

                $(ele).on("click","a.pagination-next-btn",function(e){
                    e.stopPropagation();
                    e.preventDefault();
                    scope.paginationInfo.pageNo++; // 往后翻页
                    scope.fetchData();
                });

                $(ele).on("click","a.pagination-ok-btn",function(e){
                    e.stopPropagation();
                    e.preventDefault();
                    var goToPage = $(ele).find(".pagination-nav-group input[type=number]").val();
                    if(!isNaN(goToPage)){
                        scope.paginationInfo.pageNo=parseInt(goToPage); // 往后翻页
                    }

                    scope.fetchData();
                });
            }
        }
    }]);



})();