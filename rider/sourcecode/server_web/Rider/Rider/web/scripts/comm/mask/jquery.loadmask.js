(function($) {
	$.isBody = true;
	$.classPre = "";
	/**
	 * @param label 遮罩时显示的标题，默认为“请稍后...”
	 * @param param	自定义遮罩的属性，包括 
	 * 				height 遮罩的高度
	 * 				width、遮罩的宽度
	 * 				classPre	遮罩class名称的前缀
	 * @param delay	延迟多少毫秒才遮罩
	 */
	$.fn.mask = function(label,param, delay) {
		if(label!=""){
			label = label ? label: "请稍后...";
		}
		if( param !== undefined &&  param.classPre !== undefined){
			$.classPre = param.classPre;
		}else{
			$.classPre="";
		}
		var b = $(document.body);
		if (this[0] && this[0] != window.document) {
			b = this;
			$.isBody = this[0] == document.body || false;
		}
		$(b).each(function(i) {
			if (delay !== undefined && delay > 0) {
				var element = $(b);
				element.data("_mask_timeout", setTimeout(function() {
					$.maskElement(element, label,param)
				},
				delay));
			} else {
				$.maskElement($(b), label,param);
			}
		});
	};
	$.fn.unmask = function(classPre) {
		if(classPre==undefined){
			classPre = "";
		}
		$.classPre = classPre;
		$(this).each(function() {
			$.unmaskElement($(this));
		});
	};
	$.fn.isMasked = function() {
		return this.hasClass($.classPre+"masked");
	};
	$.maskElement = function(element, label,param) {
		if (element.data("_mask_timeout") !== undefined) {
			clearTimeout(element.data("_mask_timeout"));
			element.removeData("_mask_timeout");
		}
		if (element.isMasked()) {
			$.unmaskElement(element);
		}
		if (element.css("position") == "static") {
			element.addClass($.classPre+"masked-relative");
		}
		element.addClass($.classPre+"masked");
		var maskDiv = $("<div class='"+$.classPre+"loadmask'></div>");
		var h, w;
		if ($.isBody) {
			h = document.documentElement.offsetHeight;
			w = document.documentElement.offsetWidth;
		} else {
			h = element.height() + parseInt(element.css("padding-top")) + parseInt(element.css("padding-bottom"));
			w = element.width() + parseInt(element.css("padding-left")) + parseInt(element.css("padding-right"));
		}
		if (navigator.userAgent.toLowerCase().indexOf("msie") > -1) {
			if(param!== undefined){
				if( param.height !== undefined && param.height > 0){
					h = param.height;
				}
				if(param.width !== undefined && param.width > 0){
					w = param.width;
				}
			}
			maskDiv = $("<div class='"+$.classPre+"loadmask'>" 
					+" <iframe style=\"display: block; z-index: -1; filter: alpha(Opacity='50');"
					+"  left: 0px;"
					+"  width: "+w+"px;"
					+"  position: absolute;"
					+"  top: 0px; "
					+"  height:"+h+"px;\""
					+"  tabIndex=-1 frameBorder=0>"
					+" </iframe>"
					+ "</div>");
			maskDiv.height(h);
			maskDiv.width(w);
		}
		element.append(maskDiv);
		if (label !== undefined&&label != "") {
			var maskMsgDiv = $('<div class="'+$.classPre+'loadmask-msg" style="display:none;"></div>');
			maskMsgDiv.append('<div>' + label + '</div>');
			element.append(maskMsgDiv);
			maskMsgDiv.css("top", Math.round(h / 2 - (maskMsgDiv.height() - parseInt(maskMsgDiv.css("padding-top")) - parseInt(maskMsgDiv.css("padding-bottom"))) / 2) + "px");
			maskMsgDiv.css("left", Math.round(w / 2 - (maskMsgDiv.width() - parseInt(maskMsgDiv.css("padding-left")) - parseInt(maskMsgDiv.css("padding-right"))) / 2) + "px");
			maskMsgDiv.show();
		}
	};
	$.unmaskElement = function(element) {
		if($.classPre==undefined){
			$.classPre = "";
		}
		if (element.data("_mask_timeout") !== undefined) {
			clearTimeout(element.data("_mask_timeout"));
			element.removeData("_mask_timeout");
		}
		element.find("."+$.classPre+"loadmask-msg,."+$.classPre+"loadmask").remove();
		element.removeClass($.classPre+"masked");
		element.removeClass($.classPre+"masked-relative");
		element.find("select").removeClass("masked-hidden");
	};
})(jQuery);
