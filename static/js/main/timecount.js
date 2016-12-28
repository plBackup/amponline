/**
 * Created by limeiting on 16/11/25.
 */
var ampTimeCountDown = function(year,month,day){
    var endDate=Date.UTC(year,month,day);
    var today=new Date();
    var t=today.getTime();

    function turnZero(n){
        if(n>=0 && n<=9){
            n="0"+n.toString();
        }else{
            n=n.toString();
        }
        return n.split("");
    }

    if(endDate>t){
        var count=(endDate-t)/(1000*60*60*24);
        if(count<1){

            $("#countdown-nums").addClass("countdown-lastDay");
            var h=count*24;
            var min=(h-Math.floor(h))*60||0;
            var sec=(min-Math.floor(min))*60||0;
            var hStr=turnZero(Math.floor(h)).join("");
            var minStr=turnZero(Math.floor(min)).join("");
            var secStr=turnZero(Math.floor(sec)).join("");

            var countArray=[hStr,minStr,secStr];
            var curLength=$("#countdown-nums").find("i").length;
            if(countArray.length==curLength){
                $.each(countArray,function(i,e){
                    $("#countdown-nums i").eq(i).text(countArray[i]);
                });
            }else{
                $("#countdown-nums").empty();
                $.each(countArray,function(i,e){
                    if(i==2){
                        $("#countdown-nums").append('<i class="countdown-num">'+e+'</i>');
                    }else{
                        $("#countdown-nums").append('<i class="countdown-num">'+e+'</i>:');
                    }
                });
            }
        }else{
            var count=Math.floor(count);

            var countArray=turnZero(count);
            var curLength=$("#countdown-nums").find("i").length;
            if(countArray.length==curLength){
                $.each(countArray,function(i,e){
                    $("#countdown-nums i").eq(i).text(countArray[i]);
                });
            }else{
                $("#countdown-nums").empty();
                $.each(countArray,function(i,e){
                    $("#countdown-nums").append('<i class="countdown-num">'+e+'</i>');
                });
            }
        }
    }else{
        $("#countdown").remove();
    }
};

