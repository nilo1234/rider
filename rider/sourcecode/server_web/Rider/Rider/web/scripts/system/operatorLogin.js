var inputTip="请输入您的登录名";
var timer_=null;
var timelong1=120;
var timelong = timelong1;
var obj = null;
 $(document).ready(function() {
	$("#send").bind('click', verify);
	$("#reset").bind('click', formReset);
	//$("#_login_user").textRemindAuto({title:inputTip});
	//$("#_login_user").numeral({maxlength:11}); 
	$("#tel_code").numeral({maxlength:6}); //tel_code
	$("#_login_user").focus();
	$("#pwd").val("");
	$("#code").val("");
	$("body").height($(window).height());
	obj=$("#time_text");
	enableEnter();
    //第二次验证
	$("#sendSecond").click(function(){
		checkSec();
	});
	/**
	 * 重新下发验证码
	 */
	$("#sendConfKey").click(function(){
		reSend();
	});
 }); 
 function formReset(){
	 $("#_login_user").val("");
	 reset();
	 $("#_login_user").focus();
 }
 //让所有输入框都失去焦点
 function allBlur(){
	 $("#_login_user").blur();
	 $("#pwd").blur();
	 $("#code").blur();
	 $("#send").blur();
 }
 
 /*启用回车提交请求*/
 function enableEnter(){
	$("body").keydown(function(){
		if(event.keyCode == 13){
			//判断是哪个界面显示。
			if($("#telCheck").css("display")=="none")
			verify();
			else checkSec();
		}
	});
 }
 /*禁用回车提交请求*/
 function unableEnter(){
	$("body").keydown(function(){
		if(event.keyCode == 13){
			return false;
		}
	});
 }
 //重置登录框
 function reset(){
	 ecbpunmask();
	 $("#pwd").val("");
	 $("#code").val("");
     $("#codeImg").click();
 }
 /*按下验证码事件*/
 function codeClick(){
	 $("#codeImg").click();
 }
function verify(){
		//判断是否是IE浏览器
    if(!checkBrowse())
    	return;
	allBlur();
	var user=$.trim($("#_login_user").val());
	var password=$.trim($("#pwd").val());
	var organ_type = $.trim($("#organ_type").val());
	var code=$.trim($("#code").val());
	//验证输入有效性
	if(user==""||user==inputTip){
		reset();
		showError(inputTip);
		return;
	}
	if(password==""){
		reset();
		showError("请输入您的密码");
		return;
	}
	if(isEmpty(code)){
		showError("请输入验证码");
		return;
	}else if(code.length!=4){
		showError("验证码太短");
		return;
	}
	LoginController.verifyCode(code,function(result){
		if(!result){
			reset();
			showError("验证码不正确");
			return;
		}else{//验证码正确了进行账号密码验证
			password = hex_md5(password);
			var portalId = "";
			 //设置成同步
	        DWREngine.setAsync(false);
	            ClientVarConst.getProperty("operator_request_source",function(result){
				portalId = result;
			});
			 //设置成异步
	        DWREngine.setAsync(true);
	        var userinfo={};
            userinfo.login_name=user;
			userinfo.password=password;
			userinfo.organ_type=organ_type;
		    functionId.functionid=10000001;		
			LoginController.login(functionId,userinfo, { 
				callback:function(result) { 
					if(result.resp_result!=0){
						reset();
						showError(result.resp_msg); 
					}else{
					   $(".loginBox").css("display","none");
	                    $("#telCheck").css("display","inline");
	                    $("#tel_code").val();
						 setTimer()
					}
				}, 
				timeout : 20000, // 超时，单位是毫秒，默认为20秒，设置为0代表关闭超时
				errorHandler:function(errorString, exception) {
					reset();
					showError("登录超时");
				} 
			});
		}
	});
}
	/**
	 * 第二次验证
	 */
	function checkSec(){
	var confirmCode = $("#tel_code").val().trim();
	$("#tel_code").val("");
	if(confirmCode==""){
		showError("请输入短信验证码");
		return;
	}
	if(confirmCode.length<6){
		showError("请输入6位短信验证码");
		return;
	}
	functionId.functionid=10000002;	
	LoginController.loginSe(functionId,confirmCode,function(result){
		 if(result.resp_result!=0){
		 showError(result.resp_msg);
		 if(result.resp_result==1||result.resp_result==4){
			 window.location.reload();
		 }else if(result.resp_result==5||result.resp_result==2){
			 $("#tel_code").val("");
		 }		
		 }
	});
   }

     //每隔一秒刷新一次
	function setTimer(){
		$(obj).html(timelong1);
	    timer_=setInterval("setTimer_()",1000);
	}
	
	function setTimer_(){
		$(obj).html(timelong);
		timelong=timelong-1;
		if(timelong==0){
	       reSetConfirmKey();
		}
	}
	/**
	 * 重新下发
	 */
	function reSend(){
		//重新发送短信
	  timelong=timelong1;
	  functionId.functionid=10000003;	
	  LoginController.reSendComfrimKey(functionId,function(result){
		  if(result.resp_result!=0){
		   showError(result.resp_msg);
		   window.location.reload();
		  }else{ 
			showError("成功下发短信验证码，请注意查收");
			displayNone($("#sendConfKey"));
		  	displayNone($("#warn_2"));
            displayInline($("#warn_1"));
            $("#tel_code").val("");
		    setTimer();
		  }
	  });        
	}
/**
 * 重新下发参数设置
 */
function reSetConfirmKey(){
	displayNone($("#warn_1"));
	displayInline($("#warn_2"));
	displayInline($("#sendConfKey"));
    timelong=timelong1;
   clearInterval(timer_);
}

  function toRegist(){
	  window.location.href=home+"/registCommanderController/registerCommander.fordword";
  }
  
  function toGetPassword(type){
	   window.location.href=home+"/registCommanderController/getPasswordBack.fordword?type="+type;
  }
  
  function toCommander(){
	     window.location.href=home+"commander/login.do";
  }
  function toManager(){ 
	     window.location.href=home+"manager/login.do";
  }
  