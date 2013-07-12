<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" " http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<jsp:include flush="true" page="../WEB-INF/jsp/include.jsp"></jsp:include>
<!-- 引用NL组件开始 -->
<!-- 这里还需要引入jquery-1.5.2.min.js，如果用include.jsp中的jquery会报错 -->
<script src="${home}/NLComponentsV3.2/js/jquery-1.5.2.min.js" type="text/javascript"></script>
<script src="${home}/NLComponentsV3.2/js/validator/formValidator.min.js" type="text/javascript"></script>
<link type="text/css" rel="stylesheet"	href="${home}/NLComponentsV3.2/js/validator/style/validator.css"/>
<link type="text/css" rel="stylesheet"	href="${home}/NLComponentsV3.2/js/validator/formValidator.css"/>
<script	src="${home}/NLComponentsV3.2/js/validator/formValidatorRegex.js" type="text/javascript"></script>
<!-- 引用NL组件结束 -->

<!-- 警告框 开始 -->
<link type="text/css" href="${home}/NLComponentsV3.2/js/dialog/css/com.newland.dialog.NLDialog.css"	rel="stylesheet" />
<script type="text/javascript" src="${home}/NLComponentsV3.2/js/dialog/com.newland.dialog.NLDialog.min.js"></script>
<!-- 警告框结束 -->
<!-- 密码验证强度JS -->
<script type="text/javascript"	src="${home}/scripts/member/pwdAuthentication.js"></script>
<!-- 密码验证强度JS -->
<!-- DWR 开始 -->
<%-- <script type='text/javascript'  src='${home}/dwr/engine.js'></script>
<script type="text/javascript" src='${home}/dwr/util.js'></script> --%>
<script type='text/javascript'  src='${home}/scripts/dwr/engine.min.js'></script>
<script type="text/javascript" src='${home}/scripts/dwr/util.min.js'></script>
<script type='text/javascript' src='${home}/dwr/interface/ModifyPwdController.js'></script>
<script type='text/javascript' src='${home}/dwr/interface/ClientVarConst.js'></script>
<!-- DWR 结束 -->
<link type="text/css" href="${home}/styles/login/css.css" rel="stylesheet"/>
<link type="text/css" href="${home}/styles/password/step.css" rel="stylesheet" />
<script type="text/javascript" src="${home}/scripts/util/util.js"></script>
<script type="text/javascript" src="${home}/scripts/util/md5.js"></script>
<style type="text/css">
.error{
	width: 300px;display: block;
}
html{ overflow:hidden;}
body{
	font: 12px/1.5 宋体;/*因为charset为UTF-8，首页字体用宋体更美观。charset为UTF-8是因为防止NL组件中文乱码*/
}
.operatorBg{ overflow:hidden; vertical-align:top; background:url(${home}/images/login/oper/SystemLogin_BG.jpg) #FFFFFF repeat-x top}

</style>
<script type="text/javascript">
var j$ = jQuery.noConflict();
var inputTip="请输入登录名";
var rs = "";//标识从哪个登录页面来的， 商户 或者 运营商，便于 重置密码成功后返回源登录页面
var currentSetup = "first";
var referrerUrl = "";//上一个地址
var request_source = "";//请求资源序号
var login_name = "";//登录名
var sendCodeType = {//发送校验码的操作类型
	resend:"1"//重发验证码
}
var opType = {
	send :"1",//发送验证码
	reset:"2"//重置密码
}
var reqObj = {};//请求对象
var InterValObj;//重发校验码的倒计时
var succInterValObj;//重置成功后，跳转登陆页面的倒计时
j$(document).ready(function() {
	initFirstSetup();
	initSecondSetup();
});

/**************输入登录名	开始**********************/

/*初始化第一步操作*/
function initFirstSetup(){
	j$("#loginName").textRemindAuto({title:inputTip});
	j$("#loginName").focus();
	referrerUrl = document.referrer;
	if(!referrerUrl){//如果地址为空，则跳转默认地址
		referrerUrl = "${home}/merchant/login.do?rs=merchant";
	}
	rs = queryString("rs");
	if(rs=="operator"){//运营商
		//j$("body").removeClass("LoBody_bg");
		//j$("body").addClass("operatorBg");
		j$("#borderDiv").css({"border-bottom":"1px solid #898989"});
		j$("#copy").hide();
	}else{//商户
		//j$("body").removeClass("operatorBg");
		//j$("body").addClass("LoBody_bg");
		j$("#borderDiv").css({"border-bottom":"none"});
		j$("#copy").show();
	}
	j$("#tip").hide()
	j$("#next").click(sendToValidate);
	enableEnter();
	firstSetup();
}
/*更新界面为第一步操作*/
function firstSetup(){
	j$("#inputLoginName").show();
	j$("#inputCode").hide();
	j$("#succ").hide();
	j$("#one").removeClass("done");
	j$("#one").addClass("current");
	j$("#two").removeClass("current");
	currentSetup = "first";
	clearInterval(InterValObj);
	clearInterval(succInterValObj);
	j$("#resend").hide();
	j$("#sendBtn").html("重新发送手机验证码").attr("disabled","disabled").hide();
}
/*更新界面为第二步操作*/
function secondSetup(){
	j$("._reset").val("");
	j$("#inputLoginName").hide();
	j$("#inputCode").show();
	j$("#check_code").focus();
	j$("#check_code").blur();
	j$("#succ").hide();
	j$("#one").removeClass("current");
	j$("#one").addClass("done");
	j$("#two").addClass("current");
	currentSetup = "second";
	j$("#resend").hide();
	j$("#sendBtn").attr("disabled","disabled").hide();
	clearInterval(InterValObj);
	clearInterval(succInterValObj);
	//initPwdValidateInput();
	//initSecondSetup();
	send();
}
/*更新界面为第三步操作*/
function thirdSetup(){
	j$("#inputLoginName").hide();
	j$("#inputCode").hide();
	j$("#succ").show();
	j$("#one").removeClass("current");
	j$("#one").removeClass("done");
	j$("#one").addClass("done1");
	j$("#two").removeClass("current");
	j$("#two").addClass("done");
	j$("#three").addClass("current");
	currentSetup = "third";
	clearInterval(InterValObj);
	clearInterval(succInterValObj);
	j$("#resend").hide();
	j$("#sendBtn").attr("disabled","disabled").hide();
	succ();
}
/*启用回车提交请求*/
function enableEnter(){
	j$("body").keydown(function(){
		if(event.keyCode == 13){
			if(currentSetup=="first"){
				sendToValidate();
			}else if(currentSetup=="second"){
				return false;
			}
		}
	});
}
/*返回登录页面*/
function backLogin(){
	window.location.href=referrerUrl;
}
/*发送请求进行验证*/
function sendToValidate(){
	if(!validateForm()){
		return false;
	}
	login_name = j$("#loginName").val();
	DWREngine.setAsync(false);
	ClientVarConst.getProperty(rs+"_request_source",function(result){
		request_source =  result;
	})
	reqObj.op_type=opType.send;//发送验证码
	reqObj.login_name = login_name;
	reqObj.request_source = request_source;
	j$("#tip").hide()
	ModifyPwdController.getCheckCode(reqObj,function(result){
		if(result.response.resp_result == RESP_SUCCESS){
			//window.location.href = "${home}/password/validate.jsp?rs="+rs+"&ln="+reqObj.login_name+"&refer="+encodeURIComponent(referrerUrl);
			secondSetup();
		}else{//应答失败
			var str = result.response.resp_desc;
			if(str == ""){
				str = "发生未知错误，创建失败，错误代码：" + result.response.resp_result;
			}
			j$("#tip").text(str).show();
		}
	});
	DWREngine.setAsync(true);
}
/**
 * 获取url地址请求中的参数
 * @param url	完整地址
 * @param paras 需要获取的参数
 */
function request(url,paras){ 
	var paraString = url.substring(url.indexOf("?")+1,url.length).split("&"); 
	var paraObj = {} 
	for (i=0; j=paraString[i]; i++){ 
		paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length); 
	} 
	var returnValue = paraObj[paras.toLowerCase()]; 
		if(typeof(returnValue)=="undefined"){ 
		return ""; 
	}else{ 
		return returnValue; 
	} 
}

/*表单验证*/
function validateForm(){
	j$("#tip").hide()
	var loginName = j$("#loginName").val().trim();
	if(loginName==""||loginName==inputTip){
		j$("#tip").show().text("登录名不能为空");
		return false;
	}
	return true;
}
/**************输入登录名	结束**********************/


/**************输入验证码	开始**********************/
	var time = 2;//重发验证码的间隔时间
	var codeInputTip="请输入您手机中校验码";
	var key;
	function RSA() {
		setMaxDigits(130);
		key = new RSAKeyPair(
				"10001",
				"",
				"912e3be0e9420d6c2c9ccccae5cfb747e440ffcdc1ce8acb3c99be54c8d542714d14449eb6692e2139207e15df4c863719527931805490a3f935bc05cfd6a6e4860aac5a9e39390ef8b5cb9e0af3fcc028d4aef5183317235d898b90b8ab5111b4846e591a46c25a561e59766351eb759bd93e385fc2b882ec2c7937ce059af9");
	}
	/*初始化第二步操作*/
	function initSecondSetup(){
		j$("input[type=password],input[type=text]").width("150");//统一输入框的宽度
		j$("#check_code").textRemindAuto({title:codeInputTip});
		j$("#pwdStrongDis").hide();
		j$("#sendBtn").click(function(){//定义重发校验码按钮点击事件
			send(sendCodeType.resend);
		}).submit(function(){
			return false;
		});
		j$.formValidator.initConfig({
			formid : "resetForm",
			errorfocus: false,
			onerror : function(msg) {
				getTopFrame(window).NLAlert(msg);

			},
			onsuccess : function() {
				if(!validateResetForm()){
					return false;
				}
				var pwd_strong = ratingMsgs[rating];
				if (pwd_strong == "强度：弱") {
					getTopFrame(window).NLAlert('密码强度弱，请重新输入！', '提示信息',
							250, 150);
					return false;
				}

				//设置成同步
				DWREngine.setAsync(false);
				var newPwd = j$("#new_pwd").val();
				newPwd = hex_md5(newPwd);
				//oldPwd = encryptedString(key, encodeURIComponent(oldPwd));暂时不用RSA加密
				//newPwd = encryptedString(key, encodeURIComponent(newPwd));
				reqObj.op_type=opType.reset;//密码重置
				reqObj.check_code = j$("#check_code").val();
				reqObj.new_pwd = newPwd;
				
				ModifyPwdController.resetPwd(reqObj, function(result){
					if(result.response.resp_result == RESP_SUCCESS){
						thirdSetup();
					}else{//应答失败
						j$("input[type=password]").val("");
						j$("#pwdStrongDis").hide();
						initPwdValidateInput();
						var str = result.response.resp_desc;
						if(str == ""){
							str = "发生未知错误，创建失败，错误代码：" + result.response.resp_result;
						}
						getTopFrame(window).NLMaskAlert({
							msg:str,
							titleType:result.response.resp_result
						});
					}
				});
				//设置成异步
				DWREngine.setAsync(true);
				return false;//阻止表单提交
			}
		});
		initPwdValidateInput();
	}
	/*初始化密码验证输入框*/
	function initPwdValidateInput(){
		/*新密码验证提示设置*/
		j$("#new_pwd").formValidator({
			onshow : "请输入新密码",
			onfocus : "密码由6-10位的数字和字符组成",
			oncorrect : ""
		}).inputValidator({
			min : 6,
			max : 10,
			empty : {
				leftempty : false,
				centerempty : false,
				rightempty : false,
				emptyerror : "密码不能包含空格"
			},
			onerror : "新密码由6-10位的数字和字符组成"
		});
		/*验证密码验证提示设置*/
		j$("#confim_pwd").formValidator({
			onshow : "请输入确认密码",
			onfocus : "两次输入的密码必须一致",
			oncorrect : "密码一致"
		}).inputValidator({
			min : 6,
			max : 10,
			empty : {
				leftempty : false,
				rightempty : false,
				emptyerror : "密码不能包含空格"
			},
			onerror : "确认密码由6-10位的数字和字符组成"
		}).compareValidator({
			desid : "new_pwd",
			operateor : "=",
			onerror : "两次输入的密码不一致,请确认"
		});
	}
	
	/*重发请求校验码*/	
	function send(sendType){
		time=120;
		j$("#resend").show();
		j$("#sendBtn").show();
		InterValObj = window.setInterval(remainTime, 1000);
		if(sendType==sendCodeType.resend){
			reqObj.op_type=opType.send;//发送验证码
			ModifyPwdController.getCheckCode(reqObj,function(result){
				if(result.response.resp_result != RESP_SUCCESS){
					var str = result.response.resp_desc;
					if(str == ""){
						str = "发生未知错误，创建失败，错误代码：" + result.response.resp_result;
					}
					getTopFrame(window).NLMaskAlert({
						msg:str,
						titleType:result.response.resp_result
					});
				}
			});
		}
		
	}
	/*显示剩余时间*/
	function remainTime() {
		if (time > 0) {
			time = time - 1;
			j$("#sendBtn").html("在"+time+"秒后，重新发送").attr("disabled","disabled");
		} else {//剩余时间小于或等于0的时候，就停止间隔函数
		   clearInterval(InterValObj);
		   j$("#sendBtn").html("重新发送手机验证码").attr("disabled",false);
		}
	}
	
	function validateResetForm(){
		var checkCode = j$("#check_code").val().trim();
		if(checkCode==""||checkCode==codeInputTip){
			getTopFrame(window).NLAlert('校验码不能为空', '提示信息',
					250, 150);
			return false;
		}
		return true;
	}
/**************输入验证码	结束**********************/


/**************密码重置成功	开始**********************/
	function succ(){
		time = 5;
		succInterValObj = window.setInterval(succRemainTime, 1000);
	}
	
	/*显示剩余时间*/
	function succRemainTime() {
		if (time > 1) {
			time = time - 1;
			j$("#succInfo").html("恭喜您，密码重置成功，页面将在"+time+"秒后跳转至登录页面。");
		} else {//剩余时间小于或等于0的时候，就跳转到登陆页面
			clearInterval(succInterValObj);
			window.location.href="${home}/"+rs+"/login.do";
		}
	}
/**************密码重置成功	结束**********************/

</script>
</head>
<body class="LoBody_bg" style="overflow:hidden;" id="content">
  <table class="Login" align="center" cellspacing="0" cellpadding="0"  border="0">
  <tr style="height:41px;">
  </tr>
  <tr>
    <td >
    <div id="borderDiv" style="height:350px;border:1px solid #898989;">
    	<table width="860" class="center" border="0" cellspacing="0"
			cellpadding="0">
			<tr>
				<td height="23">
					<table width="660" align="center" border="0"
						cellspacing="0" cellpadding="0">
							<tr>
								<td>
									<ul class="flow-steps">
										<li class="current" id="one"><strong class="first">1. 填写登录名</strong>
										</li>
										<li id="two"><span>2. 输入校验码</span>
										</li>
										<li class="last" id="three"><span>3. 重置成功</span>
										</li>
									</ul>
								</td>
							</tr>
					</table>
				</td>
			</tr>
			<!-- 第一步 输入登录名	开始 -->
			<tr id="inputLoginName" align="center">
				<td>
					<div >
						<form method="post" name="form" id="form">
							<ul>
								<li>
									<div style="margin-bottom:12px;">
										<span><font color="red" id="tip">登录名不存在</font></span>
									</div>
								</li>
								<li class="field">
									<div class="input">
										<label>登录名：</label><input type="text" id="loginName"
											name="loginName" value="" />
									</div>
								</li>
								<li>
									<div style="height:20px;"></div>
								</li>
								<li >
									<div >
										<input  class="button" id="next" type="button" value="下一步"></input><input  class="button" type="button" onclick="backLogin()" value="返回登录页面"></input>
									</div>
								</li>
							</ul>
						</form>
					</div>
				</td>
			</tr>
			<!-- 第一步 输入登录名	结束 -->
			<!-- 第二步 输入验证码	开始 -->
			<tr id="inputCode" align="center">
				<td>
					<div  style="align:center;" >
						<form method="post" 
							name="resetForm" id="resetForm" style="align:center">
							<div id="resend" style="margin-bottom:12px;">
									如果您在2分钟内没有收到校验码，请：<button id="sendBtn" class="button" disabled="disabled" >重新发送手机验证码</button>
							</div>
							<table border="0">
								<tr>
									<td align="right">校验码：</td>
									<td align="left" width="150px"><input class="_reset" type="text" maxlength="10" id="check_code" value=""/></td>
									<td width="60px">&nbsp;</td>
								</tr>
								<tr style="height:12px;"></tr>
								<tr>
									<td align="right">新密码：</td>
									<td  width="150px" align="left">
										<input type="password" class="_reset" onpaste="return false" oncontextmenu="return false" oncopy="return false" oncut="return false" 
											maxlength="10" id="new_pwd" onkeyup="CreateRatePasswdReq(this,function(){j$('#pwdStrongDis').css({display:'block'});});" />
									</td>
									<td width="60px">&nbsp;</td>
								</tr>
								<tr id="strongDiv">
									<td></td>
									<td>
										<table id="pwdStrongDis" cellSpacing="0" cellPadding="0"
											style="float: left; display: none;">
											<tbody>
												<tr>
													<td valign="top" noWrap align="right"><font
														face="Arial, sans-serif" size=1px color="#808080" size="-1"><strong>
																<div id="passwdRating"></div> </strong> </font>
													</td>
												</tr>
												<tr>
													<td colspan="2">
														<table id="passwdBar" cellspacing="0" border=""
															cellpadding="0" width="130" bgcolor="#ffffff">
															<tbody>
																<tr>
																	<td id="posBar" width="0%" bgcolor="#e0e0e0" height="3"></td>
																	<td id="negBar" width="100%" bgcolor="#e0e0e0" height="3"></td>
																</tr>
															</tbody>
														</table></td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
								<tr>
									<td></td>
									<td colspan="2"><div id="new_pwdTip" style="float: left; width: 200; text-align: left;"></div></td>
								</tr>
								<tr>
									<td align="right">确认密码：</td>
									<td  width="150px" align="left"><input class="_reset" type="password" id="confim_pwd" maxlength="10"  onpaste="return false" oncontextmenu="return false" oncopy="return false" oncut="return false"/></td>
									<td width="60px">&nbsp;</td>
								</tr>
								<tr>
									<td></td>
									<td colspan="2"><div id="confim_pwdTip" style="float: left; width: 200; text-align: left;"></div></td>
								</tr>
								<tr>
									<td colspan="3" align="center"><input type="submit" 
										name="button" id="update" class="button" value="确认修改" />
									<input  class="button" type="button" onclick="backLogin()" value="返回登录页面"></input>
										<!-- <input type="button"  name="button"
										onclick="firstSetup()" id="back" class="button" value="返回上一页" /> -->
									</td>
								</tr>
							</table>
						</form>
					</div>
				</td>
			</tr>
			<!-- 第二步 输入验证码	结束 -->
			<!-- 第二步 密码重置成功	开始 -->
			<tr id="succ">
			    <td>
			    	<div id="succInfo">
						恭喜您，密码重置成功。
					</div>
			    </td>
		   </tr>
		   <!-- 第二步 密码重置成功	结束 -->
		</table>
    </div>
    </td>
  </tr>
  <tr id="copy">
    <td colspan="3" align="center">
    	<div style="border:1px solid #898989;border-top:none">
    	<table class="NoteTd" cellspacing="0" cellpadding="0">
	      <tr>
	        <td><div class="note">中国移动通信集团新疆有限公司</div></td>
	        <td width="30"></td>
	        <td class="note2">版权所有&nbsp;&nbsp;&nbsp;Copyright @ 2011 ,All Rights Reserved</td>
	      </tr>
	    </table>
    	</div>
    </td>
    </tr>
</table>
</body>
</html>

