var tag = 0;
layerflag = new Boolean(false);
layerflag_ltb = new Boolean(false);

function positionmenu() {
	move(-215)
}
function getevent2() {
	if (layerflag == false) {
		document.getElementById("rightbig").style.display = "";
		try {
			//灵通宝layer特殊处理
			if (layerflag_ltb == true) {
				move(205);
				document.getElementById("rightltb").style.display = "none";
				document.all("tab1").style.textAlign = "left";
				layerflag_ltb = false;
			}
			document.getElementById("table_ltb").style.display = "none";
		} catch (exception) {
		}
		// document.all("tab2").style.textAlign="right";
		move(-205);
		layerflag = true;
	}
}
function removeevent2() {
	if (layerflag == true) {
		move(205);
		document.getElementById("rightbig").style.display = "none";
		try {
			document.getElementById("table_ltb").style.display = "";
		} catch (exception) {
		}
		// document.all("tab2").style.textAlign="left";
		layerflag = false;
	}
}
function searchsub1(Page_index) {
	var test = document.SearchForm1.searchname.value;
	var re = /[\s]*/;
	var test1 = test.replace(re, "");

	if (test1 == "") {
		if (langlayer == "zh_CN") {
			alert("请输入搜索内容！");
		} else {
			alert("Please input search content!");
		}
		return;
	}
	if (langlayer == "zh_CN") {
		document.SearchForm1.lang.value = '1';
	} else {
		document.SearchForm1.lang.value = '2';
	}
	document.SearchForm1.Page_indextmp.value = Page_index;
	document.SearchForm1.Fanye.value = '-2';
	SearchForm1.submit();
}

function getevent_ltb() {
	if (layerflag_ltb == false) {
		document.getElementById("rightltb").style.display = "";
		document.all("tab1").style.textAlign = "right";
		move(-205);
		layerflag_ltb = true;
		try {//如果被在线客服遮盖，将在线客服向左移动
			var onlineOffsetX = jQuery("#floatdiv").offset().left;
			var eltOffsetX = jQuery("#table_ltb").offset().left;
			if(onlineOffsetX + jQuery("#floatdiv").width() >= eltOffsetX) {
				jQuery("#floatdiv").css({"right":"250px","left":""});
			}
		} catch(e){}
	} else if (layerflag_ltb == true) {
		move(205);
		document.getElementById("rightltb").style.display = "none";
		document.all("tab1").style.textAlign = "left";
		layerflag_ltb = false;
	}
}
function removeevent_ltb() {
	/*
	 * if(layerflag_ltb==true){ move(205);
	 * document.getElementById("rightltb").style.display="none";
	 * document.all("tab1").style.textAlign="left"; layerflag_ltb=false; }
	 */
}