/*
	���ܣ�	������ʾ������html��title�Ĺ��ܣ�������ָ����С�����Ҳ�����ʧ
	ʹ�ã�	1����body�����
				<%-- ������ʾ --%>
				<div id="tooltip2" style="position: absolute; visibility: hidden; clip: rect(0 240 240 0); width: 240px; background-color: #FFFFFF; height: 15px">
					<layer name="nstip" width="1000px" bgColor="#FF0000"></layer>
				</div>
				<%-- ������ʾ --%>
			�������޸���ʾ���Сclip: rect(0 240 240 0)�����ֿ��width: 240px;
			2����Ҫ������ʾ�ĵط���ӣ�
				<a href="xxx.jsp" onMouseOver="helpor_net_show(this,event,'�޸ĳɸ�����ʾ������')" onMouseOut="helpor_net_hide()">xxx</a>
	���ã�	<script language="javascript" src="perbank/js/floatTip.js"></script>
*/
<!--
	if (!document.layers&&!document.all)
		event="test"
		
	function helpor_net_show(current,e,text){
		if (document.readyState=="complete"){
			document.all.tooltip2.innerHTML='<table cellspacing="1" bgcolor="#CCCCCC" cellpadding="0"><tr><td><table bgcolor="#FFFFCC" valign="center"><tr><td>'+text+'</td></tr></table></td></tr></table>';
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
	
	function helpor_net_hide(){
		//if (document.all)
			document.all.tooltip2.style.visibility="hidden";
		//else if (document.layers){
	//		clearInterval(currentscroll)
	//		document.tooltip2.visibility="hidden";
	//	}
	}
	
	function scrolltip(){
		if (document.tooltip2.document.nstip.left>=-document.tooltip2.document.nstip.document.width)
			document.tooltip2.document.nstip.left=5
		else
			document.tooltip2.document.nstip.left=150
	}
//-->