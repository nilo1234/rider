<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
<jsp:include flush="true" page="include.jsp"></jsp:include>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link type="text/css" href="${home}/js/windivui/WindowStyleDIV.CSS" rel="stylesheet"/>
<link type="text/css" rel="stylesheet" href="${home}/js/mask/jquery.loadmask.css" />
<script src="${home}/js/mask/jquery.loadmask.min.js" type="text/javascript"></script>
<script type="text/javascript" src="${home}/js/windivui/win_div.js"  charset="GB2312"></script>
<script type="text/javascript">
  $(document).ready(function(){
/*      $(".cl_s").toggle(
    	function(){
    		$(".tab_1_b").slideUp("fast"); 
    	},
    	function(){
    		$(".tab_1_b").slideDown("fast"); 
    	}
     );	   */
 
     $("#window_0").windowDIV({
    	 width:"800px",
    	 height:"200px",
    	 title:"默认样式"
     });
     
     $("#window_1").windowDIV({
    	 width:"800px",
    	 height:"200px",
    	 title:"可关闭",
    	 isclosed:true
     });
     $("#window_2").windowDIV({
    	 width:"800px",
    	 height:"200px",
    	 title:"带连接",
    	 islink:true,
    	 linktarget:"http://www.baidu.com"
     });
     
     
   $("#submit").click(function(){
	   $.post("login/getCode.do",{operateId:'154',operateName:'operateName',operateCode:'operateCode',operatePasswords:'operatePasswords'},function(result){
		   alert(result.length);
	   });
   }); 
	   
	   $("#submit1").click(function(){
		   $.post("login/getObject.do",{operateId:'154',operateName:'operateName',operateCode:'operateCode',operatePasswords:'operatePasswords'},function(result){
			   alert(result.operateName);
		   }); 
   }); 
     
  });
</script>
<title>福建新大陆软件</title>
<style type="text/css">
</style>
</head>
<body style="width:900px;margin: 100px 40px;">
         <!-- 
           <div class="tab_b" style="width:800px">
                   <div class="tab_1">
                        <div class="tab_h">
                                <span class="cl_s">
                                  <img alt="关闭" src="http://localhost:8181/springmvc/theme/default/images/collapsed_no.gif">
                                </span>
                                <h2><a href="#">标题一</a></h2>
                         </div>
                        <div class="tab_1_b">
                              <table style="width:100%">
                                  <tr>
                                    <td>阿斯顿飞</td>
                                    <td>阿斯顿飞</td>
                                    <td>阿斯顿飞</td>
                                  </tr>
                                    <tr>
                                    <td>阿斯顿飞</td>
                                    <td>阿斯顿飞</td>
                                    <td>阿斯顿飞</td>
                                  </tr>
                              </table>
                        </div>
                   </div>
           </div>
      -->
      
              <div id="window_0" style="margin:20px;">
                <table style="width:100%">
                                  <tr>
                                    <td>阿斯顿飞</td>
                                    <td>阿斯顿飞</td>
                                    <td>阿斯顿飞</td>
                                  </tr>
                                    <tr>
                                    <td>阿斯顿飞</td>
                                    <td>阿斯顿飞</td>
                                    <td>阿斯顿飞</td>
                                  </tr>
                       </table>
           </div>
      
      
      
           <div id="window_1"  style="margin:20px;">
                <table style="width:100%">
                                  <tr>
                                    <td>阿斯顿飞</td>
                                    <td>阿斯顿飞</td>
                                    <td>阿斯顿飞</td>
                                  </tr>
                                    <tr>
                                    <td>阿斯顿飞</td>
                                    <td>阿斯顿飞</td>
                                    <td>阿斯顿飞</td>
                                  </tr>
                       </table>
           </div>
           
            <div id="window_2"  style="margin:20px;">
                <table style="width:100%">
                                  <tr>
                                    <td>阿斯顿飞</td>
                                    <td>阿斯顿飞</td>
                                    <td>阿斯顿飞</td>
                                  </tr>
                                    <tr>
                                    <td>阿斯顿飞</td>
                                    <td>阿斯顿飞</td>
                                    <td>阿斯顿飞</td>
                                  </tr>
                       </table>
           </div>
           
           <input type="button" value="提交" id="submit"/>
           
            <input type="button" value="提交" id="submit1"/>
           
</body>
</html>