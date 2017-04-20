var current_menuid_lv1 = "";	//选中的二级栏目id
var current_menuid_lv2 = "";	//选中的二级栏目id
var current_menuid_lv1_temp = "";	//选中的二级栏目id
var first_menuid = "";		//实际二级栏目的第一个id
var first_menuid_temp = "";//浮出的二级栏目第一个id

//一级栏目高亮

function moveArrow(menuid){
		return;
		/*
		var arrow_img = jQuery("#menu_arrow");
		if(menuid==undefined ||menuid === ""){
				arrow_img.hide();
				return;
		}else{
		//移动游标
		var menu_div = 	jQuery("#headspan_LV1_" + menuid);
		var positon_left = menu_div.position().left;
		arrow_img.animate({"left":(positon_left+1) + "px"},200);
		arrow_img.show();
		*/
	}

//二级栏目高亮
function topColorLV2(menuid,classname)
{
	if(menuid==undefined ||menuid === ""){
		jQuery("." + classname).removeClass(classname);
	}else{
		jQuery("." + classname).removeClass(classname);
		jQuery(".font_hover_LV2").removeClass("font_hover_LV2").addClass("font_nomal_LV2");;
		jQuery("#headspan_LV2_" + menuid).addClass(classname);
		jQuery("#headspan_LV2_" + menuid).removeClass("font_nomal_LV2");
		jQuery("#headspan_LV2_" + menuid).addClass("font_hover_LV2");
	}
}
//点击一级栏目显示二级栏目
function onSubtoplv2Form(menuid,childmenuid){
	var classname = "ebanktopdualNumLine_li_hover_lV1";
	var ebanktopdualNumLine_LV2 = "ebanktopdualNumLine_LV2";
	first_menuid = childmenuid;
	current_menuid_lv1 = menuid;
	if(menuid==undefined ||menuid === ""){//对于欢迎页等没有menuid的栏目需要隐藏二级栏目
		onSubtopForm("","");
	}else{

		topColor(menuid);
		//分行特色特殊处理
		if("33"==menuid){
			document.fenghants.id.value = menuid;
			document.fenghants.submit();
			return;
		}
		showMenuLV2(ebanktopdualNumLine_LV2,childmenuid);
		//onSubtopForm(childmenuid,MenuInfo.getChildMenuid(MenuInfo.getThisNode(childmenuid)));
	}
}
//点击二级栏目显示三级栏目
function onSubtopForm(menuid,childmenuid){
	var classname = "ebanktopdualNumLine_li_hover_lV2";
	//取这个二级栏目的第一个栏目id
	first_menuid = first_menuid_temp;
	current_menuid_lv1 = current_menuid_lv1_temp;
	var ebanktopdualNumLine_LV2 = "ebanktopdualNumLine_LV2";
	current_menuid_lv2 = menuid;

	//topColor(current_menuid_lv1);
	topColorLV2(menuid,classname);
	if(menuid==undefined ||menuid === ""){
		jQuery(".font_hover_LV1").removeClass("font_hover_LV1");		
		jQuery("#" + ebanktopdualNumLine_LV2).empty();
		jQuery("#ebanktopdualNumLine_LV2_td").hide();
	}else{
	//显示三级栏目
		try{parent.downFrame.leftFrame.showMenuLV3(menuid,childmenuid);}catch(e){}
		parent.downFrame.mainFrame.location.replace("/servlet/ICBCINBSCenterServlet?id="+menuid+"&dse_sessionId="+sessionid_js);

	}
}
//二级栏目浮出显示
function showMenuLV2TEMP(menuid,childmenuid){
		var ebanktopdualNumLine_LV2 = "ebanktopdualNumLine_LV2";
		var classname_LV2 = "ebanktopdualNumLine_li_hover_lV2";
		//moveArrow(menuid);
		//showMenuLV2(ebanktopdualNumLine_LV2,childmenuid);
	if(menuid == current_menuid_lv1){
		//topColorLV2(current_menuid_lv2,classname_LV2);
	}else{
		first_menuid_temp = childmenuid;
		current_menuid_lv1_temp = menuid;
	}
}
//二级栏目浮出隐藏
function hideMenuLV2TEMP(){
		var ebanktopdualNumLine_LV2 = "ebanktopdualNumLine_LV2";
		var classname_LV2 = "ebanktopdualNumLine_li_hover_lV2";
		moveArrow(current_menuid_lv1);
		if(current_menuid_lv1 == ""){
			jQuery("#ebanktopdualNumLine_LV2_td").hide();
		}else{
		//重新画二级栏目
		showMenuLV2(ebanktopdualNumLine_LV2,first_menuid);
		topColorLV2(current_menuid_lv2,classname_LV2);
	}

}
function showMenuLV2(ebanktopdualNumLine_LV2,first_menuid){
			jQuery("#ebanktopdualNumLine_LV2_td").show();
			MenuInfo.showMenuLV2(ebanktopdualNumLine_LV2,first_menuid);
			var classname = "ebanktopdualNumLine_li_hover_lV2";			
			topColorLV2(current_menuid_lv2,classname);			
}

function initEBANKTopMenu(){
current_menuid_lv1 = "";	//选中的二级栏目id
current_menuid_lv2 = "";	//选中的二级栏目id
current_menuid_lv1_temp = "";	//选中的二级栏目id
first_menuid = "";		//实际二级栏目的第一个id
first_menuid_temp = "";//浮出的二级栏目第一个id
	moveArrow("");
	onSubtoplv2Form("","");
}

function showTip(event,title,pic){
		var ev = event||window.event;
		var obj = ev.srcElement?event.srcElement:ev.target;
		var $obj = jQuery(obj);
		$obj.attr("src","/icbc/newperbank/newmenu/images/mytools/" + pic);
		//如果超出屏幕则往左显示
		var left_offset = 0
		if($obj.offset().left - 8 + 65 >= screen.width)	{
			left_offset = screen.width - 70;
		}else{
			left_offset = $obj.offset().left - 8;
		}
		if(title.length>6){
			jQuery("#title_tip").css("width", "130px");
			jQuery("#title_tip").css("background", "url('/icbc/newperbank/newmenu/images/title_tip_l.png')");
		}else{
			jQuery("#title_tip").css("width", "65px");
			jQuery("#title_tip").css("background", "url('/icbc/newperbank/newmenu/images/title_tip.png')");
		}
		jQuery("#title_tip").css("left",left_offset + "px");
		jQuery("#title_tip").css("top",($obj.offset().top + 30) + "px");
		jQuery("#title_tip").text(title);
		jQuery("#title_tip").show();
}
function hideTip(event,pic){
	showpic(event,pic);
	jQuery("#title_tip").hide();
}
function showOhterPage(event,pic){
	showpic(event,pic);
}
function shownormal(event,pic){
	showpic(event,pic);
}
function showpic(event,pic){
			var ev = event||window.event;
		var obj = ev.srcElement?event.srcElement:ev.target;
		var $obj = jQuery(obj);
	$obj.attr("src","/icbc/newperbank/newmenu/images/mytools/" + pic);
	}
function showMenuLV2hover(event){
		var ev = event||window.event;
		var obj = ev.srcElement?event.srcElement:ev.target;
		var $obj = jQuery(obj);
		$obj.addClass("font_hover_LV2_temp");
}
function showMenuLV2normal(event){
		var ev = event||window.event;
		var obj = ev.srcElement?event.srcElement:ev.target;
		var $obj = jQuery(obj);
		$obj.removeClass("font_hover_LV2_temp");
}
function startclock(){
	//保持与老版本兼容性
	}

function  swichtonormal(sid) {
      	isClose=false;
      	witchflag=true;
      	parent.location.href="/icbc/newperbank/includes/frameset.jsp?swichflag=0&"+sid

}

function  swichtonew(sid) {
		isClose=false;
		witchflag=true;
		parent.location.href="/icbc/newperbank/includes/frameset.jsp?swichflag=1&"+sid
}


function toolClick(cmd,sid){
			current_menuid_lv1 = "";	//选中的二级栏目id
			current_menuid_lv2 = "";	//选中的二级栏目id
			current_menuid_lv1_temp = "";	//选中的二级栏目id
			first_menuid = "";		//实际二级栏目的第一个id
			first_menuid_temp = "";//浮出的二级栏目第一个id
			moveArrow("");
			
			switch(cmd){
			case 1://欢迎页
				parent.downFrame.mainFrame.location.replace("/servlet/ICBCINBSCenterServlet?id=0101&"+sid);
				break;
			case 2://电商
				gotoMall();
				break;
			case 3://收款人
				payeeForm.submit();
				break;
			case 4://站内信
				parent.downFrame.mainFrame.location.replace("/servlet/ICBCINBSCenterServlet?id=321301&ActionUrl=icbc/newperbank/service/service_email_query_recodelist.jsp&"+sid);
				break;
			case 5://在线客服
				document.onLineServiceForm.submit();
				break;
			case 6://安全中心
				window.open(sid);
				break;
			case 7://财富顾问
				consultantForm.submit();
				break;
			case 8://客户经理
				parent.downFrame.mainFrame.location.replace("/servlet/ICBCINBSCenterServlet?id=120802&"+sid);
				break;	
			}
		}