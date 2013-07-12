/**
 * 
 */
//定义图标chart的类型
var chartsType = {
	//二维堆栈多序列柱状图，带有线图
	MSStackedColumn2DLineDY: home+"/FusionCharts/Charts/MSStackedColumn2DLineDY.swf",
	//多序列线图
	MSLine: home+"/FusionCharts/Charts/MSLine.swf",
	//单序列3D饼图
	SSPie3D: home+"/FusionCharts/Charts/Pie3D.swf",
	//单序列2D饼图
	SSPie2D: home+"/FusionCharts/Charts/Pie2D.swf",
	//单序列3D饼图
	SSDoughnut3D: home+"/FusionCharts/Charts/Doughnut3D.swf",
	//单序列2D饼图
	SSDoughnut2D: home+"/FusionCharts/Charts/Doughnut2D.swf",
	//带滚动条的组合2d柱状图，带有线图
	ScrollCombi2D: home+"/FusionCharts/Charts/ScrollCombi2D.swf"
}

//导出图表  和 其div容器 都 是动态创建的
var exportChartIdPrefix = "fcExporter_";//导出图表id的前缀，
var exportChartDivIdPrefix = "fcexp_";//容纳导出图表的容器的div Id的前缀

/**
 * @function	创建图表的方法
 * @param	chartType	图表的类型，参考chartsType对象
 * @param	chartId		图表的id[String]
 * @param	width		图表的宽度[String]
 * @param	height		图表的高度[String]
 * @param	divId		展示图表的div的id[String]
 * @param	chartXMLData		展示的图表数据，为xml格式的字符串[String]
 * @param 	needExport	是否需要导出操作
 */
function createCharts(chartType,chartId,width,height,divId,chartXMLData,needExport){
	var fceId = exportChartIdPrefix+chartId;
	var id = exportChartDivIdPrefix+divId;
	var myChart = FusionCharts(chartId);
	if(myChart){//如果已经存在就先清除掉
		myChart.dispose();
	}
	myChart = new FusionCharts(chartType,chartId,width,height, "0", "1","FFFFFF","exactFit");
	if(chartType == chartsType.MSStackedColumn2DLineDY ||chartType ==chartsType.ScrollCombi2D)
	{
		chartXMLData = showLegendOrNot(chartXMLData);
	}
	if(needExport){
		if(j$("#"+id).size()==0){
			j$("#"+divId).after('<div id="'+id+'" align="center"></div>')
		}
		if(FusionCharts(fceId)){//如果已经存在就先清除掉
			FusionCharts(fceId).dispose();
		}
		createFCExporter(fceId,id);//创建导出功能的图表
		
		/*FusionCharts V3核心导出功能相关的属性 
		exportEnabled Boolean (0/1)  图表是否允许导出images/PDFs?  
		exportShowMenuItem Boolean (0/1)  是否将导出图片等按钮出现在图表右键菜单中 
		exportFormats String 	格式的列表图表将显示在上下文菜单中，同时为每一个标签。
								该属性的值应该分开键值对。分隔符字符将要采用的'|'（分字符）。
								该属性值的语法如下：
									KEY=Value[|KEY=Value]*
								例如：自定义上下文菜单PNG和PDF格式。
									exportType=”PNG=Export as High Quality Image;JPG;PDF=Export as PDF File”
		exportAtClient Boolean (0/1)  导出到客户端还是服务器端 
		exportHandler String 在服务器导出方面而言，这指的是服务器端输出处理程序（已经可以使用的脚本，我们提供的路径）。
							   在客户导出方面而言，这指的是DOM的组成部分的FusionCharts的导出是在你的网页嵌入，随着图表同上。
		exportAction 'save' or 'download'  在服务器端的情况下导出，行动指定是否导出的图像将被发送回客户端的下载，或者是否会在服务器上保存。 
		exportTargetWindow _self or _blank  在服务器端的情况下使用时，导出作为行动的下载，这个左派配置是否返回图片/ PDF格式将在同一窗口中打开作为附件下载（），或是否会打开一个新窗口。 
		exportCallback String 			名称的JavaScript函数将被调用时返回进程的情况下导出成品：
										客户端的导出
										批量导出
										服务器端导出使用'保存'的行动
		exportFileName String 利用输出（导出）您可以指定此属性的名称（不包括扩展名）文件。 
		导出对话框配置相关的属性： 
		showExportDialog Boolean (0/1)  是否要显示在捕获阶段的出口对话框。如果没有，开始捕获过程，但没有图表对话框可见。 
		exportDialogMessage String 该消息被显示在对话框中。默认为“捕捉数据：” 
		exportDialogColor Hex Color  对话框背景颜色。 
		exportDialogBorderColor Hex Color  对话框前景颜色。 
		exportDialogFontColor Hex Color  对话框文本的字体颜色。 
		exportDialogPBColor Hex Color  对话框进度条的颜色。 */
		/*用fusioncharts提供的js方法更改chart属性，会导致MSStackedColumn2DLineDY类型只能支持一条线。
		 myChart.setChartAttribute({
			'exportEnabled': '1',
			'exportAtClient': '1',
			'exportShowMenuItem': '1',
			'exportDialogMessage': '正在捕获数据，请稍候...',
			'exportFormats': 'JPG=导出为JPG图片|PNG=导出为PNG图片|PDF=导出为PDF格式文件',
			'exportHandler': fceId
		});*/
		var insertStr = 'exportEnabled="1" exportAtClient= "1"	exportShowMenuItem= "1"	exportDialogMessage= "正在捕获数据，请稍候..." exportFormats= "JPG=导出为JPG图片|PNG=导出为PNG图片|PDF=导出为PDF格式文件"	exportHandler= "'+fceId+'"';
		//var insertStr = 'exportEnabled="1" exportAction="download" exportAtClient= "0"	exportShowMenuItem= "1"	exportDialogMessage= "正在捕获数据，请稍候..." exportFormats= "JPG=导出为JPG图片|PNG=导出为PNG图片|PDF=导出为PDF格式文件"	exportHandler= "'+home+'/FCExporter.jsp"';
		chartXMLData = insertToChartNode(chartXMLData,insertStr);
	}
	/* 原提示信息
	 PBarLoadingText		 Loading Chart. Please Wait. 
	 XMLLoadingText		 Retrieving Data. Please Wait. 
	 ParsingDataText		 Reading Data. Please Wait. 
	 ChartNoDataText		 No data to display. 
	 RenderingChartText	 Rendering Chart. Please Wait. 
	 LoadDataErrorText	 Error in loading data. 
	 InvalidXMLText		 Invalid data. */
	myChart.configure( { 
	    "ChartNoDataText" : "没有数据展示" ,
	    "InvalidXMLText"  : "数据格式错误",
	    "LoadDataErrorText": "加载数据错误",
	    "PBarLoadingText":"加载图表中，请稍等",// Loading Chart. Please Wait. 
		"XMLLoadingText":"正在检索数据，请稍等",//	 Retrieving Data. Please Wait. 
		"ParsingDataText":"正在读取数据，请稍等",//		 Reading Data. Please Wait. 
		"RenderingChartText":"正在展现图表，请稍等"//	 Rendering Chart. Please Wait
	 });
	myChart.setDataXML(chartXMLData);
	myChart.render(divId);
	
	return myChart;
}
/**
 *  更新chartXMLData
 *  @param chartXMLData原chart的xml数据
 *  @param	insertStr 需要插入的属性数据
 */
function insertToChartNode(chartXMLData,insertStr){
	var index = chartXMLData.indexOf(">");
	return chartXMLData.substring(0,index)+insertStr+chartXMLData.substring(index);
}

function showLegendOrNot(chartXMLData){
	if(!chartXMLData||chartXMLData.length<=0){
		return chartXMLData;
	}
	var categoryReg = new RegExp('<category','gi');
	var categoryTotal = 1;
	var category = chartXMLData.match(categoryReg);
	if(category){
		categoryTotal = category.length;
	}
	var datasetReg = new RegExp('<dataset ','gi');
	var datasetTotal = 1;
	var dataset = chartXMLData.match(datasetReg);
	if(dataset){
		datasetTotal = dataset.length;
	}
	var total = categoryTotal * datasetTotal;
	if(total >= 10)
	{
		insertStr = 'showLegend="0"';
		return insertToChartNode(chartXMLData,insertStr);
	}
	return chartXMLData
}

/**
 * @function	创建导出图表
 * @param	fceId		导出图表的id[String]
 * @param	divId		展示图表的div的id[String]
 */
function createFCExporter(fceId,divId){
	var myExportComponent = new FusionChartsExportObject(fceId, home+"/FusionCharts/Charts/FCExporter.swf");
	myExportComponent.debugMode = false;
	
	//Customize the component properties  自定义组件的属性
	//Width and height  宽、高
	myExportComponent.componentAttributes.width = '400';
	myExportComponent.componentAttributes.height = '50';
	//Background color  背景颜色
	//myExportComponent.componentAttributes.bgColor = 'ffffdd';
	//Border properties  边框属性
	myExportComponent.componentAttributes.borderThickness = '2';
	myExportComponent.componentAttributes.borderColor = '0372AB';
	//Font properties 	字体属性
	myExportComponent.componentAttributes.fontFace = 'Arial';
	myExportComponent.componentAttributes.fontColor = '0372AB';
	myExportComponent.componentAttributes.fontSize = '12';
	//Message - caption of export component      消息——导出组件的标题
	//myExportComponent.componentAttributes.showMessage = '1';
	//myExportComponent.componentAttributes.message = 'Export the chart first, and then click on this button to save';
	//Button visual configuration   按钮可视化配置
	myExportComponent.componentAttributes.btnWidth = '200';
	myExportComponent.componentAttributes.btnHeight= '25';
	myExportComponent.componentAttributes.btnColor = 'E1f5ff';
	myExportComponent.componentAttributes.btnBorderColor = '0372AB';
	//Button font properties	按钮字体属性
	myExportComponent.componentAttributes.btnFontFace = 'Verdana';
	myExportComponent.componentAttributes.btnFontColor = '0372AB';
	myExportComponent.componentAttributes.btnFontSize = '15';
	//Title of button	按钮的名称
	myExportComponent.componentAttributes.btnsavetitle = '导出图表'
	myExportComponent.componentAttributes.btndisabledtitle = '请先右击图表选择导出的类型'; 
	//Render the exporter SWF in our DIV fcexpDiv	设置 导出组件 的div容器
	myExportComponent.Render(divId);
	return myExportComponent;
}

/**
 * @function	清空图表
 * @param	chartId		图表的id[String]
 */
function clearCharts(chartId){
	var fceId = exportChartIdPrefix+chartId;
	var myChart = FusionCharts(chartId);
	if(myChart){//如果已经存在就清除掉
		myChart.dispose();
	}
	var myExportChart = FusionCharts(fceId);
	if(myExportChart){//如果已经存在就清除掉
		myExportChart.dispose();
	}
}
