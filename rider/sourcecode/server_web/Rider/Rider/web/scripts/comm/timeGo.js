(function($){     
  //插件主要内容     
  $.fn.timeGo = function(options) {        
    var opts = $.extend({},$.fn.timeGo.defaults, options);         
	function caculateDate(seconds){
		  var objDate = {};
		  objDate.second = Math.floor(seconds % 60)+"";             // 计算秒
		  objDate.minite = Math.floor((seconds/60) % 60)+"";      //计算分
          objDate.hour = Math.floor((seconds / 3600) % 24)+"";      //计算小时
          objDate.day = Math.floor((seconds / 3600) / 24)+"";        //计算天
		  return objDate;
	  }
    return this.each(function() {
	  $this = $(this);
      var sysSecond,interValObj;
      var $mainSeconds=$this.attr(opts.mainSeconds);
	  sysSecond = parseInt($mainSeconds);
	  var date =caculateDate(sysSecond);
      var innerHtml = "<div class='miao-timeBack'>  <div class='remainTime'><span class='day'>"+date.day.replace(/^\d$/g,"0$&")+"</span><span class='hour'>"+date.hour.replace(/^\d$/g,"0$&")+"</span><span class='mini'>"+date.minite.replace(/^\d$/g,"0$&")+"</span><span class='sec'>"+date.second.replace(/^\d$/g,"0$&")+"</span> </div></div><div class='message'></div>";
      
	  $(this).prepend(innerHtml);
      var $mainTime=$(opts.mainTimeShow,$this);
      var $message=$(opts.message,$this);
      var callBackFunction=opts.callBackFunction;
      interValObj = window.setInterval(setRemainTime, 1000);
      function setRemainTime()
      {
         if (sysSecond > 0)
         {
           sysSecond = sysSecond - 1;
		   date = caculateDate(sysSecond);
           var second = date.second;
           var minite = date.minite;
           var hour = date.hour;
           var day = date.day;
           if (second>=0&&second<10) {second="0"+second};
           if (day>=0&&day<10) {day="0"+day};
           if (hour>=0&&hour<10) {hour="0"+hour};
           if (minite>=0&&minite<10) {minite="0"+minite};
           $mainTime.html("<span class='day'>" + day + "</span><span class='hour'>" + hour + "</span><span class='mini'>" + minite + "</span><span class='sec'>" + second + "</span>");
           
          }
          else if (sysSecond == -1){}
          else
           {//剩余时间小于或等于0的时候，就停止间隔函数
             window.clearInterval(interValObj);
             if(typeof callBackFunction == "function")callBackFunction($this,$message);
           }
      }
    });
  };
   //插件主要内容结束
    
  // 插件的defaults     
  $.fn.timeGo.defaults = {
      mainSeconds:"spareTime",//剩余时间获取对象
      mainTimeShow:".remainTime",//时间显示区域对象
      message:'.message',//时间结束后的信息显示对象
      callBackFunction:''
  };     
// 闭包结束     
})(jQuery);