(function(){
	var _iMenuList = [];
	var REAR = "REAR";
	var PRE = "PRE";
	var NIL = "NIL";

	var UNDEFINED = undefined;
	function MenuNode(){
		this.menuId = null;			//对应的菜单ID
		this.menuName = null;		//对应的菜单名称
		this.level = null;			//对应的层级 从0开始
		this.preNode = null;		//前节点
		this.nextNode= null;		//后节点
		this.parentNode = null;	//父节点
		this.childNode = null;		//子节点
		this.actionType = null;		//打开方式
	}
	function creatNode(menuId,menuName,level,preNode,nextNode,parentNode,childNode,actionType){
		var menunode = new MenuNode();
		menunode.menuId = menuId;
		menunode.menuName = menuName;
		menunode.level = level;
		menunode.preNode = preNode;
		menunode.nextNode = nextNode;
		menunode.parentNode = parentNode;
		menunode.childNode = childNode;
		menunode.actionType = actionType;
		return menunode;
	}
	function getThisNode(menuid){
		var node ;
		if(menuid==REAR || menuid==PRE || menuid==NIL)
			return node;

		for(var i = 0; i<_iMenuList.length ; i++){
			var node_temp = _iMenuList[i];
			if(node_temp.menuId == menuid){
				node = node_temp;
			}else{
				continue;
			}
		}
		return node;
	}
	function getPreNode(node){
		//var thisnode = getThisNode(menuid);
		return getThisNode(node.preNode);
	}
	function getOldBrotherNode(menuid){
		var thisnode = getThisNode(menuid);
		var firstmenuid = "";
		while(true){
			//prenode = this.getPreNode(thisnode);
			if(thisnode.preNode == "PRE"){
				firstmenuid = thisnode.menuId;
				break;
			}else{
				thisnode = getThisNode(thisnode.preNode);
			}
		}
		return firstmenuid;
	}
	function getNextNode(node){
		//var thisnode = getThisNode(menuid);
		return getThisNode(node.nextNode);
	}
	function getChildMenuid(node){
		return node.childNode;
	}
	function getParentNode(node){
		return getThisNode(node.parentNode);
	}
	function childNode(node){
		return getThisNode(node.childNode);
	}
	function getFirstNode(){
		var node;
		for(var i = 0; i<_iMenuList.length ; i++){
			var node_temp = _iMenuList[i];
			if(node_temp.preNode == PRE && node_temp.parentNode == NIL ){
				node = node_temp;
				break;
			}else{
				continue;
			}
		}
		return node;
	}
	function getNodehtml(node){
		var s = "";
		if(node == undefined){return s;}
		var href = node.parentNode== NIL?"JavaScript:onSubtoplv2Form":"JavaScript:onSubtopForm";
		var mouseover="JavaScript:showMenuLV2TEMP";
		var mouseoverLV2="JavaScript:showMenuLV2hover";
		var LV = node.parentNode== NIL?"1":"2";
		s += "<li class=\"ebanktopdualNumLine_li_LV" + LV + "\" id=\"headtd" + node.menuId + "\" ";
		//s +=LV=="1"?"onmouseover=\""+mouseover + "('" + node.menuId + "','" + node.childNode + "')\" ":"";
		s +=LV=="2"?"onmouseover=\"showMenuLV2hover(event)\" onmouseout=\"showMenuLV2normal(event)\"":"";

		s += ">";
		s += "<div id=\"headspan_LV" +LV + "_" + node.menuId + "\" class=\"font_nomal_LV" + LV + "\" onclick=\""+href + "('" + node.menuId + "','" + node.childNode + "')\" ";
		//s +=LV=="1"?"onmouseover=\""+mouseover + "('" + node.menuId + "','" + node.childNode + "')\" ":"";
		s += ">";
		s += node.menuName;
		s += "</div></li>\n";

		return s;
	}
	function showMenuHTML(node){
		var s = "";
		var node_html = "";
		while(true){
			if(node == undefined) break;
			node_html += getNodehtml(node);
			node = getNextNode(node);
		}
		return node_html;
	}
	function showMenuLV1(parentid){
		var node = 	getFirstNode();
		var node_html = showMenuHTML(node);
		jQuery("#" + parentid).append(node_html);
	}

	function showMenuLV2(parentid,menuid){
		var node = getThisNode(menuid);
		var node_html = showMenuHTML(node);

		var parent_html_jquery = jQuery("#" + parentid);
		parent_html_jquery.hide();
		parent_html_jquery.empty();
		parent_html_jquery.append(node_html);
		parent_html_jquery.show();
		var $ebanktopdualNumLine_li_LV2 = jQuery(".ebanktopdualNumLine_li_LV2");
		var count = $ebanktopdualNumLine_li_LV2.length;
		margin_width = 36;
		var ebanktopdualNumLine_width = 0;
		//计算每个块的长度
			for(var i = 0; i< count; i++){
				ebanktopdualNumLine_width += jQuery($ebanktopdualNumLine_li_LV2[i]).width();
			}
			var padding_left = {};
			try{
				padding_left.width_css = jQuery("#ebanktopdualNumLine_LV2").css("padding-left");
				padding_left.width = parseInt(padding_left.width_css.substr(0,padding_left.width_css.indexOf("px")),10);
			}catch(e){padding_left.width = 60;}
		//计算块之间需要的间隔
			var margin_width_temp = (jQuery(".fixwidth").width() - ebanktopdualNumLine_width - padding_left.width)/count;

			margin_width = margin_width_temp < margin_width?margin_width_temp:margin_width;
		//jQuery(".ebanktopdualNumLine_li_LV2").css("margin-left",margin_width + "px");
		jQuery(".ebanktopdualNumLine_li_LV2").css("margin-right",margin_width + "px");
			//销毁对象
			padding_left = null;

	}

	function showMenuLV3(parentid,menuid){
		var node = getThisNode(menuid);
	}

	function init(){

	}

	//字符串左补字符操作
	//s为需要补位的字符串
	//MaxLength为需要补到的位数
	//bychar 补位用到的字符
	//举例：将12补位为00012，则paddingLeftByChars('12',5,'a');
	function paddingLeftByChars(s,MaxLength,bychar)
	{
		var l = s.length;
		var paddingLeftByChars = s;
		var bychars = "";
		if(l<parseInt(MaxLength,10)){
			for(var _left_length = MaxLength - l;_left_length > 0; _left_length--){
				bychars = bychars + bychar;
			}
		}
		return bychars + paddingLeftByChars;
	}
	function addmenuId(menuLV)
	{
		var menuLV_temp = menuLV==PRE?parseInt(0,10):parseInt(menuLV,10);
		var s = menuLV_temp+1;
		return paddingLeftByChars(s+"",3,'0');
	}
	function iMenuListPush(menuId,menuName,level,preNode,nextNode,parentNode,childNode,actionType){
		_iMenuList.push(creatNode(menuId,menuName,level,preNode,nextNode,parentNode,childNode,actionType));
	}
	window.MenuInfo = {
			init:init,
			iMenuListPush:iMenuListPush,
			childNode:childNode,
			getParentNode:getParentNode,
			getNextNode:getNextNode,
			getPreNode:getPreNode,
			getOldBrotherNode:getOldBrotherNode,
			getThisNode:getThisNode,
			showMenuLV1:showMenuLV1,
			showMenuLV2:showMenuLV2,
			showMenuLV3:showMenuLV3,
			getChildMenuid:getChildMenuid
	};
})();