function isPC(){
    var userAgentInfo = navigator.userAgent.toLowerCase();
    var Agents = new Array("android", "iphone", "symbianos", "windows phone", "ipad", "ipod");
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
    }
    return flag;
}


/* ---------------------------------------- 验证逻辑 start ---------------------------------------- */
function validateAmpInputCollection(selector){
    function isEmpty(val){
        if(val==null||val==""){
            return true;
        }
        return false;
    }
    function isNumber(val){
        if(isEmpty(val)){
            return true;
        }

        if(isNaN(val)){
            return false;
        }
        return true;
    }

    var collectionValidated = true;
    $(selector).each(function(){
        var validateTypeValue = $(this).attr("amp-input-validate");
        var validateArr = validateTypeValue.split(",");
        var inputValue = $(this).find("input").val();
        var errorMsg = null;
        var validateFailure = false;
        validateArr.forEach(function(item){
            if(!validateFailure&&item=="required"&&isEmpty(inputValue)){
                errorMsg = "不能为空!";
                collectionValidated = false;
                validateFailure = true;
            }
            if(!validateFailure&&item=="number"&&!isNumber(inputValue)){
                errorMsg = "请输入数字!";
                collectionValidated = false;
                validateFailure = true;
            }
        });
        if(errorMsg==null){
            $(this).removeClass("amp-input-error");
        }else{
            $(this).find(".error-msg").remove();
            $(this).append("<div class='error-msg'><span>"+errorMsg+"</span></div>");
            $(this).addClass("amp-input-error");
        }
    });
    return collectionValidated;
}
/* ---------------------------------------- 验证逻辑 end ---------------------------------------- */