var current_menuid_lv1 = "";	//ѡ�еĶ�����Ŀid
var current_menuid_lv2 = "";	//ѡ�еĶ�����Ŀid
var current_menuid_lv1_temp = "";	//ѡ�еĶ�����Ŀid
var first_menuid = "";		//ʵ�ʶ�����Ŀ�ĵ�һ��id
var first_menuid_temp = "";//�����Ķ�����Ŀ��һ��id

//һ����Ŀ����

function moveArrow(menuid){
		return;
		/*
		var arrow_img = jQuery("#menu_arrow");
		if(menuid==undefined ||menuid === ""){
				arrow_img.hide();
				return;
		}else{
		//�ƶ��α�
		var menu_div = 	jQuery("#headspan_LV1_" + menuid);
		var positon_left = menu_div.position().left;
		arrow_img.animate({"left":(positon_left+1) + "px"},200);
		arrow_img.show();
		*/
	}

//������Ŀ����
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
//���һ����Ŀ��ʾ������Ŀ
function onSubtoplv2Form(menuid,childmenuid){
	var classname = "ebanktopdualNumLine_li_hover_lV1";
	var ebanktopdualNumLine_LV2 = "ebanktopdualNumLine_LV2";
	first_menuid = childmenuid;
	current_menuid_lv1 = menuid;
	if(menuid==undefined ||menuid === ""){//���ڻ�ӭҳ��û��menuid����Ŀ��Ҫ���ض�����Ŀ
		onSubtopForm("","");
	}else{

		topColor(menuid);
		//������ɫ���⴦��
		if("33"==menuid){
			document.fenghants.id.value = menuid;
			document.fenghants.submit();
			return;
		}
		showMenuLV2(ebanktopdualNumLine_LV2,childmenuid);
		//onSubtopForm(childmenuid,MenuInfo.getChildMenuid(MenuInfo.getThisNode(childmenuid)));
	}
}
//���������Ŀ��ʾ������Ŀ
function onSubtopForm(menuid,childmenuid){
	var classname = "ebanktopdualNumLine_li_hover_lV2";
	//ȡ���������Ŀ�ĵ�һ����Ŀid
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
	//��ʾ������Ŀ
		try{parent.downFrame.leftFrame.showMenuLV3(menuid,childmenuid);}catch(e){}
		parent.downFrame.mainFrame.location.replace("/servlet/ICBCINBSCenterServlet?id="+menuid+"&dse_sessionId="+sessionid_js);

	}
}
//������Ŀ������ʾ
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
//������Ŀ��������
function hideMenuLV2TEMP(){
		var ebanktopdualNumLine_LV2 = "ebanktopdualNumLine_LV2";
		var classname_LV2 = "ebanktopdualNumLine_li_hover_lV2";
		moveArrow(current_menuid_lv1);
		if(current_menuid_lv1 == ""){
			jQuery("#ebanktopdualNumLine_LV2_td").hide();
		}else{
		//���»�������Ŀ
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
current_menuid_lv1 = "";	//ѡ�еĶ�����Ŀid
current_menuid_lv2 = "";	//ѡ�еĶ�����Ŀid
current_menuid_lv1_temp = "";	//ѡ�еĶ�����Ŀid
first_menuid = "";		//ʵ�ʶ�����Ŀ�ĵ�һ��id
first_menuid_temp = "";//�����Ķ�����Ŀ��һ��id
	moveArrow("");
	onSubtoplv2Form("","");
}

function showTip(event,title,pic){
		var ev = event||window.event;
		var obj = ev.srcElement?event.srcElement:ev.target;
		var $obj = jQuery(obj);
		$obj.attr("src","/icbc/newperbank/newmenu/images/mytools/" + pic);
		//���������Ļ��������ʾ
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
	//�������ϰ汾������
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
			current_menuid_lv1 = "";	//ѡ�еĶ�����Ŀid
			current_menuid_lv2 = "";	//ѡ�еĶ�����Ŀid
			current_menuid_lv1_temp = "";	//ѡ�еĶ�����Ŀid
			first_menuid = "";		//ʵ�ʶ�����Ŀ�ĵ�һ��id
			first_menuid_temp = "";//�����Ķ�����Ŀ��һ��id
			moveArrow("");
			
			switch(cmd){
			case 1://��ӭҳ
				parent.downFrame.mainFrame.location.replace("/servlet/ICBCINBSCenterServlet?id=0101&"+sid);
				break;
			case 2://����
				gotoMall();
				break;
			case 3://�տ���
				payeeForm.submit();
				break;
			case 4://վ����
				parent.downFrame.mainFrame.location.replace("/servlet/ICBCINBSCenterServlet?id=321301&ActionUrl=icbc/newperbank/service/service_email_query_recodelist.jsp&"+sid);
				break;
			case 5://���߿ͷ�
				document.onLineServiceForm.submit();
				break;
			case 6://��ȫ����
				window.open(sid);
				break;
			case 7://�Ƹ�����
				consultantForm.submit();
				break;
			case 8://�ͻ�����
				parent.downFrame.mainFrame.location.replace("/servlet/ICBCINBSCenterServlet?id=120802&"+sid);
				break;	
			}
		}