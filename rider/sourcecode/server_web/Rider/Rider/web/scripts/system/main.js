 var containWidth = null;//切片容器宽度
 var containHeight = null;
 var currentObj = null;//当前选中的切
 var currentBut = null;//对应的按钮类
 var tableObj = null;//表格
 var pieNum=null;
 var mainMenuNum=null;
 var menuMap=null;//用来记录切片的 menuid和url对应关系
 var indexMap = null;//记录 menuid和index的关系
 var maxCard = 13;//最大可以打开的滑动切片数量，其中主菜单的切片数量一定存在
 var moveInObj=null;//即将关闭的but
 var list=null;//堆栈，用来记录用户操作，便于返回操作
 var nav=null;//导航框对象
 var warn="请先关闭一些暂时没有用的功能";
$(document).ready(function(){
	//窗口关闭事件监听
		window.onbeforeunload=function(){
		if(event.clientY < 0){ //关闭
		 //return "退出前，请确认保存数据";
		}else{ 
		 
		} 
	}
    //初始化
    initScroller();
    var isCheck=true;

     $("#left").click(function(){
	   leftClick();
   });
   $("#right").click(function(){
	     rightClick();
   });
   //初始化导航信息
    nav = $("#navTitle");
    nav.html($(".currentBut").attr("menu_name"));
   //浮动菜单  菜单名称 浮动框
    var menu_name_float=null;
    $(".menu_name_target").bind("mouseenter",function(){
    	var menu_name=$(this).attr("menu_name");
    	 if(menu_name_float==null){
    		 menu_name_float=$("#menu_name");
    	 }
    	 $(this).addClass("Mores");
    	 menu_name_float.html(menu_name);
    	 var position = $(this).offset();
    	  menu_name_float.css("display","inline").css("left",position.left).css("top",position.top+$(this).height()+10);
    }).bind("mouseleave",function(){
    	menu_name_float.css("display","none");
    	 $(this).removeClass("Mores");
    });
   
   //menu
   var menu_list=null;
     var timer1_=null;
     //浮动菜单  
   $(".MenuSty_Float_").live("mouseenter",function(){
	   clearTimeout(timer1_);
	   var menuid=($(this).attr("menuid"));
	   	$(this).addClass("Mores");
	   var d=document.getElementById("OpenMenuDv"+menuid);
	  if(d==null){
	      $(menu_list).css("display","none")
	       return;
	  } 
	    menu_list=d;
	    var liNum = $(menu_list).find("li").length-3;
	    $(d).width((liNum*70+50)+"px");
	    var index = $(menu_list).attr("index");
        var position = $(this).offset();
        var thisHeight = $(this).height();
         menu_list.style.display="inline";
         var lastLeft=$(d).width()/2;
         if((position.left-lastLeft)<0){
        	 menu_list.style.left=(index-1)*containWidth
         }else{
            menu_list.style.left=(index-1)*containWidth+position.left- ($(d).width()/2)+40;
         }
          menu_list.style.top=position.top-35;
   }).live("mouseleave",function(){
	    $(this).removeClass("Mores");
	    timer1_=setTimeout(function(){ $(menu_list).css("display","none");},50);
   });
 
     
    $(".OpenMenuDv").mouseenter(function(){
      clearTimeout(timer1_);
    }).mouseleave(function(){
       $(menu_list).css("display","none");
    })
   
    var timer_=null;
     $("#floatImageDiv").mouseenter(function(){
    	 clearTimeout(timer_);
    }).mouseleave(function(){
    	floatImageDiv.css("display","none");
    }).click(function(){
    	var id = ""+$(moveInObj).attr("id");
    	var index = id.substring(3,id.length);
    	deleteSlices(index,$(moveInObj).attr("menuid"));
    	floatImageDiv.css("display","none");
    });
    
     //浮动
    var floatImageDiv=null;
    $(".pageTd").live("mouseenter",function(){
    	moveInObj = $(this);
    	clearTimeout(timer_);
    	if(floatImageDiv==null)
	    floatImageDiv = $("#floatImageDiv");
        var position = $(this).offset();
        var thisHeight = $(this).height();
        floatImageDiv.css("display","inline").css("left",position.left+$(this).width()-20).css("top",position.top-20);
    }).live("mouseleave",function(){
	   timer_=setTimeout(function(){floatImageDiv.css("display","none");},300);
   });
    
});
//初始化滑动框
function initScroller(){
   mainMenuNum=$(".navTab").length;//主菜单的个数
   pieNum=$(".scrollTD").length;//切片的数量
   //计算切片的宽度
   var p = ((100/pieNum));
   $(".scrollTD").attr("width",p+"%");
   containWidth = document.getElementById("scontainTableDiv").clientWidth;
   containHeight= document.getElementById("scontainTableDiv").clientHeight;
   $("#scontainTable").width(containWidth*pieNum+pieNum);
   $("#ComTdSty").width(containWidth);
   tableObj=$("#scontainTable");
   currentBut = $("#bt_1");//这里写死，如果要调整顺序，请修改数据库表中
   currentObj=$("#1");//这里写死，如果要调整顺序，请修改数据库表中
   currentObj.addClass("current");
   menuMap = new Map();
   indexMap = new Map();
   list = new List();//堆栈
}
  
  //重新计算宽度
 function flashScroll(){
	 pieNum=$(".scrollTD").length;
	 $("#scontainTable").width(containWidth*pieNum);
    var p = (100/pieNum);
    $(".scrollTD").attr("width",p+"%");
 }
   
  //左移
  function leftClick(){
  $(".hiddenTD").removeClass("hiddenTD");
   var index = $(currentObj).attr("id");
   if(index==pieNum)
   return;
   //设置
   var next=parseInt(index)+1;
   var nav= $("#"+next).attr("nav");
   setNavTitle(nav);
   jumpTo(next);
  }
  
  //又移
  function rightClick(){
    $(".hiddenTD").removeClass("hiddenTD");
   	var index = $(currentObj).attr("id");
   	index = parseInt(index);
   	if(index==1)
   	return;
   var next=parseInt(index)-1;
   var nav= $("#"+next).attr("nav");
   setNavTitle(nav);
   jumpTo(next);
  }
  
   //左移动   原来宽度，宽度值
  function move(width1,zhen,index,zon,yu,to){
	  $(tableObj).css("left","-"+(width1));
	  if(index==zon-1){
	   var s=width1+zhen+yu;
	   if(s<0)//调整误差，救命稻草
	   s=0;
       setTimeout("move("+(s)+","+zhen+","+(1+index)+","+zon+","+yu+","+to+")",60);
	  }else if(index<zon-1){
		setTimeout("move("+(width1+zhen)+","+zhen+","+(1+index)+","+zon+","+yu+","+to+")",60);
	  }else if(index==10){
		$(tableObj).css("left","-"+(to-1)*containWidth);
	  }
  }
 

  //添加 一个切片
  function addSlices(menuid,url,title,parentName){
	  var buff = new StringBuffer();
	    pieNum = pieNum+1;
	     url=home+url
	     buff.append('<td   id='+pieNum+' class="scrollTD" nav="'+parentName+'_'+title+'">');
        buff.append('<iframe id="iframe'+menuid+'" class="ifarame"  name="ifarame'+menuid+'"  src="'+url+'" width="100%" height="480"  border=0    marginWidth=0 frameSpacing=0 marginHeight=0 frameBorder=0></iframe>');
        buff.append('</td>');
        $("#scontainTableTr").append($(buff.toString()));
        flashScroll();
        //添加一个按钮
        createBut(pieNum,menuid,title,parentName);//创建与之相对应的  bt_
         jumpTo(pieNum);
          
  }
  
  //删除指定的切片第index个切片
  function  deleteSlices(index,menuid){
	 // 这个值  如何确定呢|||晕，如何回退,堆栈？？？哎....
   var _index = $(currentObj).attr("id");//当前切片id
	$("#"+index).remove();
	$("#bt_"+index).remove();
	menuid=parseInt(menuid);
	menuMap.remove(menuid);
	indexMap.remove(menuid);
	list.remove(index);
		var k=parseInt(index);
		for(var i=k;i<=pieNum;i++){
			$("#"+i).attr("id",(i-1));
		    var bt = $("#bt_"+i);
		 	$(bt).attr("id","bt_"+(i-1));
		 	//调整 indexMap
		}
		var len = indexMap.size();
		for(var i=0;i<len;i++){
		var obj = indexMap.getIndex(i);
		   if(obj.value>index){
				 indexMap.getIndex(i).value=obj.value-1;
			 }
		}
		len = list.length();//
		for(var i=0;i<len;i++){
		  var l = list.getIndex(i);
		  if(l>index){
			  list.setValue(i,l-1);
		  }
		}
	 if(_index==index){//删除当前选中切片,默认转到 index-1 的切片上去
		var m = list.getIndex(list.length()-1);
        currentObj=$("#"+m);
        currentBut = $("#bt_"+m);
	  }
		  index = $(currentObj).attr("id");//调整后的index
	      flashScroll();
	      jumpTo(index);
  }
  //切片之间跳转to 是 id 1,2,3,4,5
  function jumpTo(to){
   $(".hiddenTD").removeClass("hiddenTD");
   var index = $(currentObj).attr("id");
   if(parseInt(to)==index){
	
	 $(tableObj).css("left","-"+(to-1)*containWidth);
     $(currentObj).removeClass("current");
     currentObj=$("#"+to);
     index=$(currentObj).attr("id");
     currentObj.addClass("current");
     changeBut(to);
     list.add(to);
	return;
   }
   var divWidth = containWidth*(index-1);//预订位置
   var moveWidth=containWidth*(parseInt(to)-index);//偏移量
    var yu = moveWidth%10;
    var zhen = (moveWidth/10);
    setTimeout("move("+(divWidth+zhen*1)+","+zhen+","+1+","+10+","+yu+","+to+")",0);
     $(currentObj).removeClass("current");
     currentObj=$("#"+to);
     index=$(currentObj).attr("id");
     currentObj.addClass("current");
     changeBut(to);
      list.add(to);
     //alert("add="+list.join("|"));
  }
  
  //改变but的样式
  function changeBut(to){
	 var type = currentBut.attr("type");
	 if(type=="mainMenu"){
		 $(currentBut).find("a").removeClass("RedF").removeClass("currentBut");
	 }else{
		$(currentBut).find('.pageSedL').addClass("pageL").removeClass('pageSedL');
		$(currentBut).find('.pageSedC').addClass("pageC").removeClass('pageSedC');
		$(currentBut).find('.pageSedR').addClass("pageR").removeClass('pageSedR');
		$(currentBut).removeClass("currentBut");
	 }
	   currentBut=$("#bt_"+to);
	   type = currentBut.attr("type");
	if(type=="mainMenu"){
	    $(currentBut).find("a").addClass("RedF");
	}else{
		$(currentBut).find('.pageL').addClass("pageSedL").removeClass('pageL');
		$(currentBut).find('.pageC').addClass("pageSedC").removeClass('pageC');
		$(currentBut).find('.pageR').addClass("pageSedR").removeClass('pageR');
	}
	    $(currentBut).addClass("currentBut");
  }

  //主菜单点击  to=1,2,3,4,5....
  function mainMenuTextHandle(to,menuid,menuName){
	  jumpTo(to);
	  setNavTitle(menuName); 
  }
  //按钮菜单点击事件  ,将menu和url 存放在一个Map中
  function butMenu(menuid,url,title,parentName){
	  var is =menuMap.get(menuid);
	   if(maxCard<=pieNum){
		  showMessage(warn);
		  return;
	  }
	 
	  indexMap.put(menuid+"",pieNum);
	  if(is==null){//不存在,打开一个切片menuMap
		  addSlices(menuid,url+"?pid="+menuid,title,parentName);
	      menuMap.put(menuid,url);
	      indexMap.put(menuid,pieNum);
	       setNavTitle(parentName+"_"+title);
	      return;
	  }
	   setNavTitle(parentName+"_"+title);
	  //如果已经存在，则jumpTo();
     var index =indexMap.get(menuid);
	    jumpTo(index);
     }
  
  function createBut(index,menuid,title,parentName){
	    var buff = new StringBuffer();
	    parentName=parentName+"_"+title;
		buff.append('<table class="pageTd" type="But" menuid="'+menuid+'"  nav="'+parentName+'"  onclick="menuJumpTo(this,menuid)" id="bt_'+index+'">');
		buff.append('<tr>');
		buff.append(' <td class="pageSedL"></td>');
		buff.append('<td class="pageSedC">'+title+'</td>');
		 buff.append('<td class="pageSedR"></td>');
		buff.append('</tr>');
		buff.append('</table>');
		$("#butList").append($(buff.toString()));
  }
  
  function menuJumpTo(even,menuid){
	     var id = $(even).attr("id");
	      if(id!=null){
	    	  var idar=id.split("_");
	         id = idar[1];
	      }
	        var navTitle = $(even).attr("nav");
	        setNavTitle(navTitle);
	         jumpTo(parseInt(id));
  }
  
  function setNavTitle(navTitle){
	      navTitle=navTitle.replace(new RegExp("_","g"),"-->");
	      nav.html(navTitle);
  }
  
  //退出系统
  function loginOut(){
	  if(confirm("您确定要退出系统吗?")){
		  LoginController.loginOut(function(){
		  });
	  }
  }
  //刷新ifram  由iframe调用
  function  reflashIframe(iframName){
	  frames[iframName].location.reload();  
  }
  //在jsonObj中添加 top和left属性
  function  addLeftAndTop(jsonObj){
	  var tostr =JSON.stringify(jsonObj);
  }
  //子页面编辑区有限，所有弹出得在父页面弹出
  //节约资源，仅仅初始化一边，之后通过改变属性，来适应不同的要求
  //paramter 为json对象，包括各种jquery ui的各种属性,在包括，function_id
	  var iframeObj=null;
      var back_value=null;
	  function showTopWindow(paramter){
        $("#topWindow").window(paramter.w_p);
        $("#topWindow").window ("center");
        $("#top_window_iframe").attr("src",paramter.url);
        $("#top_window_iframe").css("display",'inline');
	  }
	  //关闭window
	  function closeTopWindow(){
		  $("#topWindow").window("close");
		  $("#top_window_iframe").attr("src","");
	  }
     //返回给iframe容器的高度，便于调整iframe高度
	 function getParentHeight(){
		 return containHeight;
	 }
	 function getParentWidth(){
		 return containWidth;
	 }
    
     //父窗口中弹出confrim界面
   function showConfirm(paramter){
	    $.messager.confirm(paramter.title,paramter.content,paramter.handle);
   }
    
   function  showMessage(message){
	    $.messager.alert("提示",message);
   }  
   function showTip(message){
	    $.messager.show({
            title:'提示',  
            msg:message,
            timeout:3000,
            showType:'show'
        }); 
   }  
   //修改密码
   function modifyPass(){
	  back_value=0;
	 var parmter={};
	 parmter.url="commanderInfoController/toModifyPasswordView.fordword";
	 width=360;
     height=250;
	 parmter.w_p={
	 title:"修改密码",
	 width:width,
	 height:height,
	modal:true,
	minimizable:false,
	maximizable:false,
	collapsible:false,
	draggable:false,
   onClose:function(){
	  if(back_value==1)
	  showMessage("密码修改成功!");	
	}
	}
	 showTopWindow(parmter);
   }
     