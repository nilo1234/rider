//获取表格的指定class的值，特殊的input请特殊处理
function  init_Data_Table(classArray){
	var value = {};
	if(classArray instanceof Array){
		for(var i=0;i<classArray.length;i++){
	       initValue(classArray[i],value);
		}
	}else{
	    initValue(classArray,value);
	}
	 return value;
}

//这边设定不同的类型，适用于不同的控件取值方法
function initValue(className,value){
	var objs = $("."+className);
		$(objs).each(function(){
			 var id = $(this).attr("id");
			 var value_ = "";
			 if($(this).attr("date_type")=='date_box'){
				 value_=$(this).datebox("getValue");
			 }
			 else
			 value_=$(this).val().trim();
			 value[id] = value_;
		});
  }

 //设置值
function formSetValue(jsonObj,className){
	var objs = $("."+className);
	objs.each(function(){
      var id = $(this).attr("id");
      var value=eval("jsonObj."+id);
      if(value!=null){
     if($(this).attr("date_type")=='date_box'){
    	 value=timeFormate(value);
    	 $(this).datebox("setValue",value);
     }else
    	$(this).val(value);
      }
	});
}

 //符合展现详细信息的字段设置值设置值
function formSetValueDetail(jsonObj,className){
	var objs = $("."+className);
	objs.each(function(){
      var id = $(this).attr("id");
      var value=eval("jsonObj."+id);
      if(value!=null){
    	$(this).html(value);
	}else{
		$(this).html("");
	}
	});
}

function reSetValue(className){
    var objs = $("."+className);
    objs.each(function(){
    	$(this).val("");
    });
}

/**
* 将Textarea中的空格和回车替换为html标签
* @param str 需要替换的字符串
* @return
*/
function repTextareaToHtml(str){
   var reg=new RegExp("\r\n","g");
   var reg1=new RegExp(" ","g");
   str = str.replace(reg,"<br>");
   str = str.replace(reg1,"<p>");
   return str;
}

/**
* 将html标签替换为Textarea中的空格和回车
* @param str 需要替换的字符串
* @return
*/
function repHtmlToTextarea(str){
   var reg=new RegExp("<br>","g");
   var reg1=new RegExp("<p>","g");
   str = str.replace(reg,"\r\n");
   str = str.replace(reg1," ");
   return str;
}
