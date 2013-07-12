var inputTip="请输入您的账号";
 j$(document).ready(function() {
	j$("#send").bind('click', verify);
	j$("#_login_user").textRemindAuto({title:inputTip});
	j$("#_login_user").focus();
	j$("#pwd").val("");
	j$("#code").val("");
	j$("body").height(j$(window).height());
	enableEnter();
 }); 
 //让所有输入框都失去焦点
 function allBlur(){
	 j$("#_login_user").blur();
	 j$("#pwd").blur();
	 j$("#code").blur();
	 j$("#send").blur();
 }
 /*启用回车提交请求*/
 function enableEnter(){
	j$("body").keydown(function(){
		if(event.keyCode == 13){
			verify();
		}
	});
 }
 /*禁用回车提交请求*/
 function unableEnter(){
	j$("body").keydown(function(){
		if(event.keyCode == 13){
			return false;
		}
	});
 }
 //重置登录框
 function reset(){
	ecbpunmask();
	j$("#pwd").val("");
	j$("#code").val("");
	j$("#codeImg").click();
 }
 /*按下验证码事件*/
 function codeClick(){
	 j$("#codeImg").click();
 }
function verify(){
		//判断是否是IE浏览器
    if(!checkBrowse())
    	return;
	allBlur();
	var user=j$("#_login_user").val();
	var password=j$("#pwd").val();
	var code=j$("#code").val();
	//验证输入有效性
	if(user==""||user==inputTip){
		reset();
		NLAlert("请输入您的帐号");
		//j$("#_login_user").focus();
		return;
	}
	if(password==""){
		reset();
		NLAlert("请输入您的密码");
		return;
	}
 
	LoginController.verifyCode(code,function(result){
		
		if(!result){
			reset();
			NLAlert("验证码不正确");
			return;
		}else{//验证码正确了进行账号密码验证
			password = hex_md5(password);
			var portalId = "";
			 //设置成同步
	        DWREngine.setAsync(false);
	        ClientVarConst.getProperty("merchant_request_source",function(result){
				portalId = result;
			});
			 //设置成异步
	        DWREngine.setAsync(true);
	    
			LoginController.login({
					login_name:user,
					password:password,
					portal_id:portalId 
				}, { 
				callback:function(result) { 
		 
						NLAlert(result.home_city); 
 
				}, 
				timeout : 20000, // 超时，单位是毫秒，默认为20秒，设置为0代表关闭超时
				errorHandler:function(errorString, exception) {
					reset();
					alert(errorString+"    "+exception);
					NLAlert("登录超时");
				} 
			});
		}
	});
}