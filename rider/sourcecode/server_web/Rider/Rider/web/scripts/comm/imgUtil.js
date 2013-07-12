//图片预览
var imgtypes=["JPG","PNG","GIF"];
var imgTypeStr='JPG,PNG,GIF';
/**
 * 
 * @param thisObj  file
 * @param targetObj  image
 * @param divId div
 * @returns {Boolean}
 */

function setImagePreview(fileObj, previewObj, localImg) {
    var docObj=document.getElementById(fileObj);
    var imgObjPreview=document.getElementById(previewObj);
 
        //IE下，使用滤镜
  docObj.select();
  var imgSrc = document.selection.createRange().text;
  if(!isEmpty(imgSrc)){
	var b=false;
	var filetype = imgSrc.substr(imgSrc.lastIndexOf(".")+1,imgSrc.length).toUpperCase();
	for(var i=0;i<imgtypes.length;i++){
		if(filetype==imgtypes[i]){
			 b=true;
			 break;
		}
	}
	if(!b){
	cleanFile(docObj);
	parent.showMessage("仅支持   "+imgTypeStr+"  图片类型");
	return;
	}
   }
  
    var localImagId = document.getElementById(localImg);
    //必须设置初始大小
    //图片异常的捕捉，防止用户修改后缀来伪造图片
    try{
        localImagId.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
        localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
    }catch(e){
        alert("您上传的图片格式不正确，请重新选择!");
        return false;
    }
    imgObjPreview.style.display = 'none';
        document.selection.empty();
  
    return true;
}

function clearFilter(divId){
	 $("#"+divId).attr("style","");
}

function cleanFile(_file){
 if(_file.files){
     _file.value = "";
 }else{
     if (typeof _file != "object"){ return null; }
     var _span = document.createElement("span");
     _span.id = "__tt__";
     _file.parentNode.insertBefore(_span,_file);
     var tf = document.createElement("form");
     tf.appendChild(_file);
     document.getElementsByTagName("body")[0].appendChild(tf);
     tf.reset();
     _span.parentNode.insertBefore(_file,_span);
     _span.parentNode.removeChild(_span);
     _span = null;
     tf.parentNode.removeChild(tf);
 }
 }