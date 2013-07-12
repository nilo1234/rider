<%@ page contentType="text/html; charset=UTF-8" %>
<jsp:include page='../../include.jsp'></jsp:include>
<html>
<head>
<title>用户查询</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
	<meta http-equiv="description" content="用户查询"/>
	<script type='text/javascript' src='<%=request.getContextPath()%>/dwr/interface/UserController.js'></script>
	
	<script language="javascript" type="text/javascript">
		function btn_click(){
			var user_id = document.getElementById("user_id").value;
			var user ={"user_id":user_id}
			UserController.queryUser(user,function(as){
				alert(as.user_id);
			});
		}
	</script>
</head>
<body>
	user_id:<input type="text" id="user_id" /><br>
	<input type="button" value="查询" onclick ="btn_click();">
</body>

</html>