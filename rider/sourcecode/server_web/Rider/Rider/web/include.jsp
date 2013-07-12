<%@ page contentType="text/html;charset=UTF-8" %>
<%
	request.setAttribute("home",request.getContextPath());
    System.out.println("ssssssssss"+request.getContextPath());
    String city_id =  session.getAttribute("city_id")==null?"":String.valueOf(session.getAttribute("city_id"));
    String county_id= session.getAttribute("county_id")==null?"":String.valueOf(session.getAttribute("county_id"));
    String user_id = session.getAttribute("user_id")==null?"":String.valueOf(session.getAttribute("user_id"));
    String user_name = session.getAttribute("user_name")==null?"":String.valueOf(session.getAttribute("user_name"));
    String organ_type = session.getAttribute("user_id")==null?"":String.valueOf(session.getAttribute("organ_type"));
    String tel = session.getAttribute("tel")==null?"":String.valueOf(session.getAttribute("tel"));
%>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8"/>
<title>MoneyCome项目</title>
<!--公用css-->
<jsp:include  flush="true" page="cache.jsp"></jsp:include>
<link type="text/css" href="${home}/css/common.css" rel="stylesheet" />	
<link type="text/css" rel="stylesheet" href="${home}/scripts/comm/mask/jquery.loadmask.css" />

<link rel="stylesheet" type="text/css" href="${home}/jquery-easyui/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="${home}/jquery-easyui/themes/icon.css">

 <!-- 加载DWR引擎 开始 -->
  <script type='text/javascript' src='${home}/dwr/engine.js'></script>
<script type='text/javascript' src='${home}/dwr/util.js'></script>
 <!-- 加载DWR引擎 结束 -->

<script src="${home}/scripts/comm/jquery-1.8.0.min.js" type="text/javascript"></script>
<script src="${home}/scripts/comm/mask/jquery.loadmask.min.js" type="text/javascript"></script>
<script src="${home}/scripts/comm/jquery.easyui.min.js" type="text/javascript" ></script>
<script src="${home}/scripts/comm/easyui-lang-zh_CN.js" type="text/javascript"></script> 

<script src="${home}/scripts/comm/String.js" type="text/javascript"></script>
<script src="${home}/scripts/comm/Map.js" type="text/javascript"></script>
<script src="${home}/scripts/comm/Stack.js" type="text/javascript"></script>
<script src="${home}/scripts/comm/List.js" type="text/javascript"></script>
<script src="${home}/scripts/comm/json.js" type="text/javascript"></script>
<script src="${home}/scripts/comm/commonjs.js" type="text/javascript"></script>

<script src="${home}/scripts/util/util.js" type="text/javascript"></script> 
<script src="${home}/scripts/util/formUtil.js" type="text/javascript"></script>

<script type="text/javascript">
var home = "${home}"+"/";//表示工程根目录
var s_city_id='${city_id}';
var s_county_id='${county_id}';
var s_user_id = '${user_id}';
var s_organ_level = '${organ_level}';
dwr.engine.setPreHook(function() {ecbpmask()});
dwr.engine.setPostHook(function() {ecbpunmask()});
dwr.engine.setErrorHandler(dwrErorHandler);
var DWREngine =dwr.engine;
var default_column_num=100;
var defaultImgSrc = "${home}/images/comm/default.png";
//打开遮罩
function ecbpmask(title){
	var _title = '正在处理中，请稍等...';
	if(title){
		_title = title;
	}
	 $("body").mask(_title);
}
//关闭遮罩
function ecbpunmask(){
	 $("body").unmask();
}
//dwr 请求异常 执行
function dwrErorHandler(errorString, exception){
	alert(errorString+"  "+exception+"服务请求异常,请稍后尝试，或者直接联系维护人员!");
}
function prohibitBack()
{
	document.onkeydown = function(e){
		var e=e||window.event
		var evs=e.srcElement?e.srcElement:e.target;
		if(evs.type!="password" && evs.type!="text" && evs.type!="textarea" || $(evs).attr("readonly")==true){
			if(e.keyCode==8){
				if(window.event){
					e.keyCode=0; 
					e.returnValue=false;
				}else{
					e.preventDefault();
				}
			}else if(e.altKey && ((e.keyCode==37)||(e.keyCode==39))){
				if(window.event){
					e.returnValue=false;
				}else{
					e.preventDefault();
				}
			}
		}
	}
}
 prohibitBack();
//全局的dwr失效时，调用的函数
function logout(){ 
	var parent = window;
	while(!parent&&parent!=window.parent){
		      parent=window.parent;
	  }
    parent.document.location.reload(); 
    self.opener.location.reload(); 
} 

 //判断浏览器类型，目前仅支持IE内核浏览器
function checkBrowse() { 
    var OsObject = ""; 
    var b =null;
   if(navigator.userAgent.indexOf("MSIE")>0) { 
        b= "MSIE"; 
   }
    if(b!='MSIE'){
	    alert("目前系统仅支持 IE内核浏览器，请您更换IE浏览器访问系统!");
	    return false;
    }
    return true;
} 
</script>
<html>
 <body>
 <div id="modifyPwd" style="display:none;" ></div></body>
</html>
