/*该脚本提供给数据显性化用的*/
var left_width=0;
var slicerDirect;
var whoSlicer;
var targetSlicer;


var num=9;//总共有几个
var rownum=3;//默认横列有3个
var rowmargin=5;//间隙为5
var width=(Number(window.document.body.clientWidth)-rowmargin*(rownum+1))/rownum;
width = width - 20;
var chart_div="";


function slicerFunction(widgetOrder, slicerDirect1, whoSlicer1,targetSlicer1){
	slicerDirect=slicerDirect1;
	whoSlicer=whoSlicer1;
	targetSlicer=targetSlicer1;
	if(slicerDirect=='right'){
		left_width=0;
		rightTrans();
	}
	if(slicerDirect=='left'){
		left_width=document.body.clientWidth;
		leftTrans();
	}
	if(widgetOrder!=""&widgetOrder!=null){
		widgetOrderG=widgetOrder;
		setTimeout('iframeSrcAdd('+widgetOrder+')',1000);
		}
}

function rightTrans(){
	document.getElementById(whoSlicer).style.left=Number(document.getElementById(whoSlicer).style.left.substring(0,document.getElementById(whoSlicer).style.left.length-2))+250+"px";
	left_width=left_width+250;
	if(left_width<document.body.clientWidth){
		setTimeout("rightTrans()",80);
	}
	else{
		$('#'+whoSlicer).hide();
		$('#'+targetSlicer).show();
		document.getElementById(targetSlicer).style.left="0px";
		return;
	}
}
	
function leftTrans(){
		document.getElementById(whoSlicer).style.left=Number(document.getElementById(whoSlicer).style.left.substring(0,document.getElementById(whoSlicer).style.left.length-2))-250+"px";
		left_width=left_width-250;
		if(left_width>0){
		  setTimeout("leftTrans()",80);
		}
		else{
			$('#'+whoSlicer).hide();
			$('#'+targetSlicer).show();
		   	document.getElementById(targetSlicer).style.left="0px";
		   	return;
	   	}
	}
function iframeSrcAdd(widgetOrder){
	if($('#ifr').attr("src")==""){
		$('#ifr').attr("src","kpiShowConfig.jsf?widgetOrder="+widgetOrder);
	}
	
}


/*模拟返回的数据，根据数据显示出该用户的自定义首页*/
function showValueToUser(resp,chartWidth,chartHeight){
   var widget = resp;
   paramChart.order=widget.widgetOrder;
   var chart_div = 'widgetId'+paramChart.order;
   paramChart.dataList = widget.kpiValueList;
   if(widget.chartType==4){
   	paramChart.chartTypeInit = '5';
   }
   else{
   	paramChart.chartTypeInit=widget.chartType;
   }
 //  paramChart.chartTitle=widget.kpiName;
//   if(widget.chartType==3){
//   	paramChart.chartMonth=widget.queryDate;
//   }
//   else{
//  		paramChart.chartMonth=null;
//   }
   paramChart.chartUnit=[widget.kpiUnit];
   paramChart.widgetParamList=widget.widgetParamList;
   $("#widgetId"+paramChart.order).html("");
   updateChart(chart_div,paramChart.chartTypeInit,chartWidth,chartHeight);
  $("#widgetId"+paramChart.order).append(" <div style='position:absolute;z-index:1000;right:5px;top:5px;width:40px;height:16px;'>"+
	   "<div style='background-image:url(images/often_option.png);width:16px;height:16px;float:left;margin-right:3px;cursor:pointer;' title='修改' onclick=mergeWidget('"+widget.widgetID+"','"+widget.userID+"','"+widget.widgetOrder+"',"+widget.chartType+",'"+widget.kpiCode+"') onmouseover='optionReplaceBg(this)' onmouseout='optionReplaceBg1(this)'/>"+
	   "<div style='background-image:url(images/often_split.png);float:left;width:1px;height:16px;margin-right:3px;'></div>"+
	   "<div style='background-image:url(images/often_del.png);float:left;width:16px;height:16px;cursor:pointer;' title='删除' onmouseover='deleteReplaceBg(this)' onmouseout='deleteReplaceBg1(this)' onclick=\"delWidget('"+widget.widgetID+"','"+widget.widgetOrder+"');\"/></div>");
	if(paramChart.chartTypeInit=='5'){
	 legendAdd(paramChart.widgetParamList,chart_div);
	 }

}
function optionReplaceBg(A){
	$(A).css("background-image","url('images/often_option_act.png')");
	
}
function optionReplaceBg1(A){
	$(A).css("background-image","url('images/often_option.png')");
	
}

function deleteReplaceBg(A){
	$(A).css("background-image","url('images/often_del_act.png')");
}
function deleteReplaceBg1(A){
	$(A).css("background-image","url('images/often_del.png')");
}
//删除指标图表微件
function delWidget(widgetID, orderId) {
	if(null != widgetID && widgetID.length > 0) {
		var paramObj = {
				widgetID:widgetID
		}
		UserKpiWidgetShowMgmt.delKpiWidget(paramObj, vCode, function(resp){
			if(null != resp && resp) {
				$('#widgetId'+orderId).css('background-color',$('body').css('background-color'));
				$('#widgetId'+orderId).css('cursor','pointer');
				$("#widgetId"+orderId).html("<img src='images/often-add.png' alt='添加' width='100%' height='100%' "
		   		+"onclick=\"slicerFunction("+orderId+",'left','tran1','tran2')\"></img>");
				alert("删除成功！");
			} else {
				alert("删除失败！");
			}
		});
	}
}
function mergeWidget(widgetID,userID,widgetOrder,widgetChartType,kpiCode){
	slicerFunction("","left","tran1","tran3");
	setTimeout('iframeSrcMerge('+widgetID+','+userID+','+widgetOrder+','+widgetChartType+','+kpiCode+')',2000);
	widgetOrderG=widgetOrder;
	//$('#left3').remove();
	//$('#center3').before("<td id='left3' style='height:100%;width:10%;position:relative;cursor: pointer;'  onclick='slicerFunction('"+widgetID+"',\"left\",\"tran3\",\"tran2\")' ><div style='top:expression(document.body.clientHeight/2);width:50px;height:30px; background:url('images/ll.png');float:right;position:absolute; cursor: pointer;right:20px;' ></div></td>");
}
function onclickTreePart(){
	setTimeout('iframeSrcAdd("")',1000);
	slicerFunction("","right","tran3","tran2");
}
function iframeSrcMerge(widgetID,userID,widgetOrder,widgetChartType,kpiCode){
	$('#ifr1').attr("src","");
	$('#ifr1').attr("src","mergeAndConfig.jsf?widgetID="+widgetID+"&userID="+userID+"&kpiCode="+kpiCode+"&widgetChartType="+widgetChartType+"&merge=1&add=0&widgetOrder="+widgetOrder);
	

}
function addDivBackgroundColor(elem){
	$("#"+elem).css("background-color","#EDEDED");
}
function removeDivBackgroundColor(elem){
	$('#'+elem).css("background-color",$('body').css('background-color'));
}
function legendAdd(widgetParamList,obj){//图例的添加
	$('#'+obj).append("<div id=div_tag"+obj+" style='left:10px;top:10px;position:absolute;'></div>");
	for (var i=0;i<widgetParamList.length;i++){
		var paramValue=widgetParamList[i].paramValue;
		var paramValue2=widgetParamList[i].paramValue2;
		$('#div_tag'+obj).append('<div align="left" style="margin-top:5px;"><span id="div_1" align="left" width="40" style="background-color:'+paramValue.split('-')[5]+';"> &nbsp;&nbsp;&nbsp;&nbsp;</span>'+paramValue2+'</div>');
	}
	
	

}


