	/*
	 * 用于输入框提示信息,用法jQuery(#id).textRemindAuto()
	 */
	jQuery.fn.textRemindAuto = function(options){
		options = options || {};
		var defaults = {
			blurColor: "#999",
			focusColor: "#333",
			notEmptyColor: "#333",
			auto: true,
			chgClass: "",
			title:"请输入"
		};
		var settings = jQuery.extend(defaults,options);
		jQuery(this).each(function(){
			if(defaults.auto){
				jQuery(this).css("color",settings.blurColor);
				jQuery(this).val(settings.title);
			}
			var v = jQuery.trim(jQuery(this).val());
			if(v){
				jQuery(this).focus(function(){
					if(jQuery.trim(jQuery(this).val()) === v){
						jQuery(this).val("");
					}
					jQuery(this).css("color",settings.focusColor);
					if(settings.chgClass){
						jQuery(this).toggleClass(settings.chgClass);
					}
				}).blur(function(){
					if(jQuery.trim(jQuery(this).val()) === ""){
						jQuery(this).val(v);
						jQuery(this).css("color",settings.blurColor);
					}else{
						jQuery(this).css("color",settings.notEmptyColor);
					}
					if(settings.chgClass){
						jQuery(this).toggleClass(settings.chgClass);
					}
				});	
			}
		});
	};
	
	//禁止输入非数字
	jQuery.fn.numeral = function(options) {  
		options = options || {};
			var defaults = {
		   maxlength:9,
		   minlength:0
		};
	    var settings = jQuery.extend(defaults,options);
	    jQuery(this).css("ime-mode", "disabled");  
	    this.bind("keypress",function(e) {
	    var value=$(this).val();
	    var code = (e.keyCode ? e.keyCode : e.which);  //兼容火狐 IE   
	        if(!jQuery.browser.msie&&(e.keyCode==0x8)){  //火狐下 不能使用退格键  
	             return ;  
	        }
	        if(value.length>settings.maxlength-1){
	     //   value=value.substring(0,value.length-1);
	   // 	this.value= value;
	    	return false
	        }
	        return code >= 48 && code<= 57;  
	    });  
	    this.bind("blur", function() {  
	       if (this.value.lastIndexOf(".") == (this.value.length - 1)) {  
	            this.value = this.value.substr(0, this.value.length - 1);  
	        } else if (isNaN(this.value)) {  
	            this.value = "";  
	        }  
	    });  
	    this.bind("paste", function() {  
	        var s = clipboardData.getData('text');  
	        if (!/^\d+$/.test(s)){
	        	return false;//this.value = s.replace(/^0*/, '');  //允许以0开头
	         }
	    });  
	    this.bind("dragenter", function() {  
	        return false;  
	    });  
	    this.bind("keyup", function() {  
	    	//if (/(^0+)/.test(this.value)) {  允许以0开头
	    	//	this.value = this.value.replace(/^0*/, '');  
	        //}
	    });  
	};  

	//得到字符串的真实长度（双字节换算为两个单字节）
	function getStrActualLen(sChars)
	{
		return sChars.replace(/[^\x00-\xff]/g,"xx").length;
	}
	
	String.prototype.trim = function() { 
		return this.replace(/(^\s*)|(\s*$)/g, ""); 
	} 
	String.prototype.ltrim = function() { 
		return this.replace(/(^\s*)/g, ""); 
	} 
	String.prototype.rtrim = function() { 
		return this.replace(/(\s*$)/g, ""); 
	} 
	String.prototype.trimAll= function() { 
		return this.replace(/\s+/g, ""); 
	}
	//全部替换
String.prototype.replaceAll = function(old_sChars,new_sChars){
	return this.replace(new RegExp(old_sChars,"g"),new_sChars);
}
	
	/**将字符串包裹在<![CDATA[]]>里*/
	function getStringInCDATA(str)
	{
		var resultStr = "<![CDATA[" + str + "]]>";
		return resultStr;
	}
	
	/**将字符串的<![CDATA[]]>标签去掉*/
	function delCDATAFromStr(str)
	{
		if(str.indexOf("<![CDATA[")>=0){
			str = str.substring(9,str.length-3);
		}
		return str;
	}
	
	/*验证是否是手机号码*/
	function isMobileNo(msisdn){
		var reg = /^(13|14|15|18)[0-9]{9}$/;
		return reg.test(msisdn);
	}
	/*邮件地址验证*/
	function isEmail(email){
	 var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      return myreg.test(email);
	}
	/*固定电话正则表达式*/
	function isTelphoneNo(tel){
		var myreg =/\d{3}-\d{8}|\d{4}-\d{7}$/;
		return myreg.test(tel);
	}
	
	/*邮编*/
	function isPostCard(postCard){
		 var myreg =/^[1-9][0-9]{5}$/;
		   return myreg.test(postCard);
	}
	//判断是否是自然数
	function isNumber(str){
		if (/[^\d]/.test(str)){
			return false;
		}
		return true;
	}
	
	function checkDate(s){
		try{
		a = s.split("-");
		 y = parseInt(a[0],10);
		 m = parseInt(a[1],10)-1;
		 d = parseInt(a[2],10);
		dt = new Date(y,m,d);
		 if(dt.getFullYear()!=y || dt.getMonth()!=m || dt.getDate()!=d) {
			 return false;
		 }
		    return true;
		}catch (e) {
			return false;
		}

	}

	
	/**
	 * 将对象设置为readonly
	 * @param jQueryObj
	 */
	function readonly(jQueryObj){
		jQueryObj.removeAttr("disabled");
		jQueryObj.attr("readonly",true)//将元素设置为readonly
		jQueryObj.css({"color":"#a0a0a0"});//设置元素字体颜色为灰色
	}
	/**
	 * 取消对象的readonly属性
	 * @param jQueryObj
	 */
	function unReadonly(jQueryObj){
		jQueryObj.removeAttr("readonly");//去除元素的readonly属性
		jQueryObj.css({"color":"#000000"});//设置元素字体颜色为黑色
	}
	/**
	 * 不可见
	 */
	function displayNone(obj){
		$(obj).css("display","none");
	}
	
	function displayInline(obj){
		$(obj).css("display","inline");
	}

function getCurrentDate(){
	var date = new Date();
	return timeFormate2(date);
}
//yyyy-mm-dd格式
function addDateY(date,num){
	var date1 = date.split("-");
	return (date1[0]*1+num)+"-"+date1[1]+"-"+date1[2];
}
 

/**
 * 
 * @param type
 * @param num
 */
function getDate(type,num){
	var mdate = new Date();
	if(type==1){
		mdate.setYear(mdate.getYear()+num);
	}else if(type==2){
       mdate.setMonth(mdate.getMonth()+num);
	}else{
		 mdate.setDate(mdate.getDate+num) 
	}
 
 	return timeFormate2(mdate);
}
 
function isEmpty(value){
	if(value==null)
		return true;
	if(!(value instanceof Object)){
		if(value.trim()==""||value.trim()=='null')
			return true;
	}
	 return false;
}

function isNull(value){
	return value==null?true:false;
}


//比较两个日期大小 前者 减去后者
function compareDate(date1,date2){
	var date1_;
	 if(!(date1   instanceof Array)){
		date1_= getDateforStr(date1);
	 }
	 var date2_;
	 if(!(date2   instanceof Array)){
		date2_= getDateforStr(date2);
	 }
   return  date1_>date2_;
}
 
function getDateforStr(dateStr){
	      date=dateStr.split("-");
		 return date;
}
     //ui  的时间格式化 原来时间格式：2012-12-02 00:00:00.0aler
     //转化为：2012-12-02
    function  timeFormate(value,rowData,rowIndex){
    	 if(value==null)
    		 return "";
    	 //以空格为分隔符
    	 var k=value.split(" ");
    	 if(k.length>0)
    		 return k[0];
    	 else return "";
     }
       //mybatis取出的日期型 会有一个 ".0"这里去掉
        function  fullTimeFormate(value,rowData,rowIndex){
    	  if(!isEmpty(value)&&value.length>=19){
    		  return value.substr(0,19);
    	  }else{
    		  return value;
    	  }
     }
    
    /**ui 日期日期控件数据格式化**/
   function timeFormate2(date){
	      var m=date.getMonth()+1;
	      if(m<10)
	    	  m="0"+m;
	      var d = date.getDate();
	      if(d<10)
	    	  d="0"+d;
	       return date.getFullYear()+'-'+(m)+'-'+d;
   }
   
    
   
   /**
    *判断字符串非空
    */
   function isNotNull(str){
   	return typeof(str)!='undefined' && str!=null && str!="null" && (str+'')!='';
   }
   
   
   function numberInputKeyUp(value){
	   return value.replace(/[^\d]/g,'') 
   }
   
    /**
    *验证输入(粘贴、拖动)的是否数字(8,46)
    */
   function chkNumberInput(){
	    switch(event.type){
	    	case "keypress":
	    			return (event.keyCode>=48 && event.keyCode <=57)||event.keyCode==8||event.keyCode==46;
	    			break;
	    	case "paste":
	    		if(isNaN(window.clipboardData.getData('Text')))
	       			return false;
	    			break;
	    	case "drop":
	    		if(isNaN(event.dataTransfer.getData('Text')))
	      			return false;
	    			break;
	    	default:
	    			return true;
	    }
   }
// 对Date的扩展，将 Date 转化为指定格式的String 
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function(fmt) 
{ //author: meizz 
  var o = { 
    "M+" : this.getMonth()+1,                 //月份 
    "d+" : this.getDate(),                    //日 
    "h+" : this.getHours(),                   //小时 
    "m+" : this.getMinutes(),                 //分 
    "s+" : this.getSeconds(),                 //秒 
    "q+" : Math.floor((this.getMonth()+3)/3), //季度 
    "S"  : this.getMilliseconds()             //毫秒 
  }; 
  if(/(y+)/.test(fmt)) 
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
  for(var k in o) 
    if(new RegExp("("+ k +")").test(fmt)) 
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
  return fmt; 
}
