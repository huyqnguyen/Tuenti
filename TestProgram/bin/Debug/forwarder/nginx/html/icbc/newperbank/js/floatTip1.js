/*
	功能：	浮动提示，类似html中title的功能，但可以指定大小，并且不会消失
	使用：	1、在body中添加
				<%-- 浮动提示 --%>
				<div id="tooltip2" style="position: absolute; visibility: hidden; clip: rect(0 240 240 0); width: 240px; background-color: #FFFFFF; height: 15px">
					<layer name="nstip" width="1000px" bgColor="#FF0000"></layer>
				</div>
				<%-- 浮动提示 --%>
			并可以修改提示框大小clip: rect(0 240 240 0)和文字宽度width: 240px;
			2、需要浮动提示的地发添加：
				<a href="xxx.jsp" onMouseOver="helpor_net_show(this,event,'修改成浮动显示的内容')" onMouseOut="helpor_net_hide()">xxx</a>
	引用：	<script language="javascript" src="perbank/js/floatTip.js"></script>
*/
<!--
	if (!document.layers&&!document.all)
		event="test"
	var float_width_floatTip1;
	function helpor_net_show(current,e,text){
		if (document.readyState=="complete"){
			document.all.tooltip2.innerHTML='<table cellspacing="1" bgcolor="#CCCCCC" cellpadding="0"><tr><td><table bgcolor="#FFFFE1" valign="center"><tr><td>'+text+'</td></tr></table></td></tr></table>';
			document.all.tooltip2.style.left=e.clientX+document.body.scrollLeft+10;
			document.all.tooltip2.style.top=e.clientY+document.body.scrollTop+10;
			document.all.tooltip2.style.visibility="visible";
		}else if (document.layers){
		document.tooltip2.document.nstip.document.write('<b>'+text+'</b>'); 
		document.tooltip2.document.nstip.document.close();
		document.tooltip2.document.nstip.left=0;
		currentscroll=setInterval("scrolltip()",100);
		document.tooltip2.left=e.pageX+100;
		document.tooltip2.top=e.pageY+100;
		document.tooltip2.visibility="show";
		}
	}
	function helpor_net_show1(current,e,text,x,y){
		if (document.readyState=="complete"){
			document.all.tooltip2.innerHTML='<table cellspacing="1" bgcolor="#CCCCCC" cellpadding="0"><tr><td><table bgcolor="#FFFFE1" valign="center"><tr><td>'+text+'</td></tr></table></td></tr></table>';
			document.all.tooltip2.style.left=e.clientX+document.body.scrollLeft+x;
			document.all.tooltip2.style.top=e.clientY+document.body.scrollTop+y;
			document.all.tooltip2.style.visibility="visible";
		}else if (document.layers){
		document.tooltip2.document.nstip.document.write('<b>'+text+'</b>'); 
		document.tooltip2.document.nstip.document.close();
		document.tooltip2.document.nstip.left=0;
		currentscroll=setInterval("scrolltip()",100);
		document.tooltip2.left=e.pageX+100;
		document.tooltip2.top=e.pageY+100;
		document.tooltip2.visibility="show";
		}
	}	
	
		function helpor_net_show2(current,e,text,x,y,float_width){
		if (document.readyState=="complete"){
			document.all.tooltip2.innerHTML='<table cellspacing="1" bgcolor="#CCCCCC" cellpadding="0"><tr><td><table bgcolor="#FFFFE1" valign="center"><tr><td>'+text+'</td></tr></table></td></tr></table>';

			var tip_x = e.clientX+document.body.scrollLeft+x;
			//保持浮动窗口在可见范围内
			if(tip_x<0)tip_x=0;
			if(tip_x>(document.body.scrollWidth - float_width))tip_x = document.body.scrollWidth - float_width;
			document.all.tooltip2.style.left=tip_x;
			document.all.tooltip2.style.top=e.clientY+document.body.scrollTop+y;
			float_width_floatTip1=document.all.tooltip2.style.width;
			document.all.tooltip2.style.width=float_width;
			document.all.tooltip2.style.visibility="visible";
		}else if (document.layers){
		document.tooltip2.document.nstip.document.write('<b>'+text+'</b>'); 
		document.tooltip2.document.nstip.document.close();
		document.tooltip2.document.nstip.left=0;
		currentscroll=setInterval("scrolltip()",100);
		document.tooltip2.left=e.pageX+100;
		document.tooltip2.top=e.pageY+100;
		document.tooltip2.visibility="show";
		}
	}	
	function helpor_net_show_finance(current,e,text){
			if (document.readyState=="complete"){
				document.all.tooltip2.innerHTML='<table cellspacing="1" bgcolor="#CCCCCC" cellpadding="0"><tr><td><table bgcolor="#FFFFE1" valign="center"><tr><td>'+text+'</td></tr></table></td></tr></table>';
				document.all.tooltip2.style.left=e.clientX+document.body.scrollLeft-70;
				document.all.tooltip2.style.top=e.clientY+document.body.scrollTop+10;
				document.all.tooltip2.style.visibility="visible";
			}else if (document.layers){
			document.tooltip2.document.nstip.document.write('<b>'+text+'</b>'); 
			document.tooltip2.document.nstip.document.close();
			document.tooltip2.document.nstip.left=0;
			currentscroll=setInterval("scrolltip()",100);
			document.tooltip2.left=e.pageX+100;
			document.tooltip2.top=e.pageY+100;
			document.tooltip2.visibility="show";
			}
		}
	function helpor_net_show_financedetails(current,e,text){
		var _$wrapper = jQuery("#floatMessage")[0] != undefined ? jQuery("#floatMessage") : jQuery(document.createElement("div")).attr("id","floatMessage");
		
		_$wrapper.css({'z-index':'300','position':'absolute','background-color':'#FFFFE1','font-size':'14px','line-height':'20px','color':'#6d6d6d','border':'solid 1px #979898','padding-left':'14px','padding-right':'14px','font-family':'simsun','text-align':'left'});
		_$wrapper.html(text).appendTo('body');
		var offset = jQuery(current).offset();
		var pageX = offset.left;
		var pageY = offset.top;
		
		_$wrapper.show().css('left',pageX-_$wrapper.outerWidth()).css('top', pageY);   
	} 
	function helpor_net_show_financelist(current,e,text,leftlength){
		var _$wrapper = jQuery("#floatMessage")[0] != undefined ? jQuery("#floatMessage") : jQuery(document.createElement("div")).attr("id","floatMessage");
		
		_$wrapper.css({'z-index':'300','position':'absolute','background-color':'#F0F0F0','font-size':'14px','line-height':'20px','color':'#6d6d6d','border':'solid 1px #979898','padding-left':'14px','padding-right':'14px','font-family':'simsun','text-align':'left'});
		_$wrapper.html(text).appendTo('body');
		
		var offset = jQuery(current).offset();
		var pageX = offset.left+leftlength;
		var pageY = offset.top+50;
		
		_$wrapper.show().css('left',pageX-_$wrapper.outerWidth()).css('top', pageY);   
	} 
	function helpor_net_financedetails(){
		//jQuery("#tooltip2").hide();
		jQuery('#floatMessage').hide();    
	}
	
	function helpor_net_hide(){
		//if (document.all)
			document.all.tooltip2.style.visibility="hidden";
		//else if (document.layers){
		//	clearInterval(currentscroll)
		//	document.tooltip2.visibility="hidden";
		//}
	}
	function helpor_net_hide2(){
		//if (document.all){
			document.all.tooltip2.style.visibility="hidden";
			try{
			document.all.tooltip2.style.width=float_width_floatTip1;
			}catch(e){}
		//}else if (document.layers){
		//	clearInterval(currentscroll)
		//	document.tooltip2.visibility="hidden";
	//	}
	}	
	function scrolltip(){
		if (document.tooltip2.document.nstip.left>=-document.tooltip2.document.nstip.document.width)
			document.tooltip2.document.nstip.left=5
		else
			document.tooltip2.document.nstip.left=150
	}
	
	
//-->