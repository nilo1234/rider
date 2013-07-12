
function homeCityChange(cityId,countryId,title){
	var homeCityId = jQuery("#" + cityId).val();
	jQuery("#" + countryId).empty(); 
	    if(title!=null)
		jQuery("<option value=''>"+title+"</option>").appendTo(jQuery("#" + countryId)); 
	    else 
	    	jQuery("<option value=''>所有</option>").appendTo(jQuery("#" + countryId)); 	
	        DictData.getHomeCountryList(homeCityId,function(list){
			dwr.util.addOptions(countryId,list,"entry_id","entry_name"); 
	});
}
/**
 * 修改的时候，县市完地市后，接着加载对应的县市
 * @param homeCityId  地市（团购管理员）
 * @param county_id    县市（团购管理员）
 * @param countryId    县市id
 * @param title
 */
function homeCountry(homeCityId,county_id,countryId,title){
	jQuery("#" + countryId).empty(); 
	    if(title!=null)
		jQuery("<option value=''>"+title+"</option>").appendTo(jQuery("#" + countryId)); 
	    else 
	    	jQuery("<option value=''>所有</option>").appendTo(jQuery("#" + countryId)); 	
	        DictData.getHomeCountryList(homeCityId,function(list){
			dwr.util.addOptions(countryId,list,"entry_id","entry_name"); 
			$("#"+countryId).val(county_id);
	});
}
   /**
    * 判断是否禁止使用归属地市和县市,新建时候调用
    * @param city_id  记录的city_id
    * @param county_id   记录的county_id
    * @param cityId   input id
    * @param countyid  input id
    */ 
	function newDisabledCityCounty(cityId,countyid,title){
	    if(s_city_id!='9999'){
	    	$("#"+cityId).val(s_city_id);
	    	homeCountry(s_city_id,s_county_id,countyid,title);
	        $("#"+countyid).val(s_county_id);
	        $("#"+cityId).attr("disabled","disabled");
	        if(s_county_id!="9999"){
	          $("#"+countyid).attr("disabled","disabled");
	        }
	    }
	}
/**
 * 
 * @param cityId  id
 * @param countyid
 * @param city_id  （记录city_id）
 * @param county_id  (记录county_id)
 * @param title
 */
		function modifyDisabledCityCounty(cityId,countyid,city_id,county_id,title){
	    $("#"+cityId).val(city_id);//复制
	    homeCountry(city_id,county_id,countyid,title);
	    //判断是否可用
        if(s_city_id!="9999"){
        	$("#"+cityId).attr("disabled","disabled");
        }
        if(s_county_id!='9999'){
	      $("#"+countyid).attr("disabled","disabled");
        }
	}

    //DWR	下载文件  这边是下载 模板，所有模板下载掉这个方法。传入模板名称 即可，指定从模板路径下载
	function downloadFile(fileName){
	    	RegistInfoController.downloadFile(fileName,function (data){
	    		dwr.engine.openInDownload(data);
	    	});
	    }
     //文件校验错误，返回错误文件,两个方法差不多，和上面的方法就差在  文件存放的路径。模板有特定的路径.而错误路径就在temp下，这个方法比较通用
     function downLoadError(fileName){
    	DownLoadController.downloadFile(fileName,function (data){
	    		dwr.engine.openInDownload(data);
	    });
    }

     
     /**
      * 一定要配合DWR否则无效
      * 获取文件对象
      * @param id
      */
    function getUploadFile(id,types){
   var uploadFile = dwr.util.getValue(id);   
    var uploadFilePath =document.getElementById(id).value;
    var uploadFileuploadFile_temp = uploadFilePath.replace(/\\/g,"/");   
    var filenames = uploadFileuploadFile_temp.split(/\//g);   
    var filename = filenames[filenames.length-1];   
     filename = filename.trim();
     if(isEmpty(filename)){
    	 return;
     }
     if(!checkType(filename,types)){
    	return null;
     }
    var file={};
    file.uploadFile = uploadFile;
    file.fileName = filename;
    return file;
    } 
	   function showError(msg){
		     alert(msg);
	   }
	   function showWarn(msg){
		   alert(msg);
	   }
   
	  function checkType(fileName,types){
		  var fileType = fileName.substring(fileName.lastIndexOf(".")+1,fileName.length);
		  if(isEmpty(types)){
			  parent.showMessage("文件类型不能为空");
			  return false;
		  }
		  var typeA = types.split(",");
         for(var i=0;i<typeA.length;i++){
        	  if(fileType.toUpperCase()==typeA[i].toUpperCase()){
        		  return true;
        	  }
         }
         getTopIframe().showMessage(fileName+"的文件检验类型错误，仅支持："+types+" 类型 文件上传");
         return false;
	  } 
	   
  function getTopIframe(parent){
	 while(!parent&&parent!=window.parent){
		  parent=window.parent;
	  }
	    return parent;
  }
	  
   var functionId={};
     var pager=null;
	//当前页数
	var pageNum=1;
	//
	var pageSize=50;//每页行数
	
	function  getTableHeight(){
		return parent.getParentHeight()-$("#searchTable").height()-7;
	}
		function  getTableHeight2(){
		return parent.getParentHeight();
	}
		
   function  getTableWidth(){
	   return parent.getParentWidth();
   }		
