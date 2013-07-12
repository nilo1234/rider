/**
 * 根据地市给县市下拉框填值
 * @param countyId 县市下拉框对象id
 * @param homeCityId 地市编号
 * @param defCountyVal 默认县市值(可选)
 * @return
 */
function setHomeCounty(countyId, homeCityVal, defCountyVal) {
    $.post(home+'dictData/getHomeCountyList.fordword',{entry_id:homeCityVal},function(data){
        if(data && data.success) {
            if(data.rows && data.rows!=null) {
                var countyOpt = jQuery("#" + countyId)[0];
                for(var i=0; i<data.rows.length; i++) {
                    dataObj = data.rows[i];
                    countyOpt.options[countyOpt.options.length] = new Option(dataObj.entry_name,dataObj.entry_id);
                }
                if(defCountyVal && defCountyVal.length>0) {
                    $("#"+countyId).val(defCountyVal);
                }
            }
        }
    },'json');
}

function homeCityChange(cityId,countyId,title){
    var homeCityId = jQuery("#" + cityId).val();
    jQuery("#" + countyId).empty(); 
    if(title!=null)
        jQuery("<option value='9999'>"+title+"</option>").appendTo(jQuery("#" + countyId)); 
    else 
        jQuery("<option value='9999'>所有</option>").appendTo(jQuery("#" + countyId));
    setHomeCounty(countyId, homeCityId);
}
/**
 * 修改的时候，县市完地市后，接着加载对应的县市
 * @param homeCityId  地市（团购管理员）
 * @param defCountyVal    县市默认值（团购管理员）
 * @param countyId    县市id
 * @param title
 */
function homeCounty(homeCityVal,defCountyVal,countyId,title){
    jQuery("#" + countyId).empty(); 
    if(title!=null)
        jQuery("<option value='9999'>"+title+"</option>").appendTo(jQuery("#" + countyId));
    else 
        jQuery("<option value='9999'>所有</option>").appendTo(jQuery("#" + countyId));
    setHomeCounty(countyId, homeCityVal, defCountyVal);
    /*DictData.getHomeCountyList(homeCityId,function(list){
    dwr.util.addOptions(countyId,list,"entry_id","entry_name"); 
    $("#"+countyId).val(county_id);
    });*/
}
/**
* 判断是否禁止使用归属地市和县市,新建时候调用
* @param city_id  记录的city_id
* @param county_id   记录的county_id
* @param cityId   input id
* @param countyid  input id
*/ 
function newDisabledCityCounty(cityId,countyId,title){
    if(s_city_id!='9999'){
        $("#"+cityId).val(s_city_id);
        homeCounty(s_city_id,s_county_id,countyId,title);
        $("#"+countyId).val(s_county_id);
        $("#"+cityId).attr("disabled","disabled");
        if(s_county_id!="9999"){
            $("#"+countyId).attr("disabled","disabled");
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
function modifyDisabledCityCounty(cityId,countyid,defCityVal,defCountyVal,title){
    $("#"+cityId).val(defCityVal);// 复制
    homeCounty(defCityVal,defCountyVal,countyid,title);
    // 判断是否可用
    if(s_city_id!="9999"){
        $("#"+cityId).attr("disabled","disabled");
    }
    if(s_county_id!='9999'){
      $("#"+countyid).attr("disabled","disabled");
    }
}

function getDictDef(dict_type, dict_class, callFunc) {
    var jsonInfo = {"dict_type":dict_type,"dict_class":dict_class};
    var url = home+'dictData/queryDict.fordword';
    $.post(url,jsonInfo,callFunc,'json');
}

       
function getTopIframe(parent){
    while(!parent&&parent!=window.parent){
        parent=window.parent;
    }
    return parent;
}
/**
 * 对str进行url编码
 * @param str
 * @return
 */
function encodeUrl(str) {
    return encodeURIComponent(encodeURIComponent(str))
}

function initFormData(formClass, params) {
    var fields = $('.'+formClass); //自动序列化表单元素为JSON对象
    if(!params || params=='') {
        params = {};
    }
    $.each( fields, function(i, field){
        params[field.id]=field.value; //设置查询参数
    });
    return params;
}
var functionId={};
var pager=null;
// 当前页数
var pageNum=1;
//
var pageSize=50;// 每页行数
