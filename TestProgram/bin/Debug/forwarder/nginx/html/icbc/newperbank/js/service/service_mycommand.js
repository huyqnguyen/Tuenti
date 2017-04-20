
function command_onsubmitProtocalForm(productid,productname)
{
	protocalForm.productid.value=productid;
	protocalForm.productname.value=productname;
	document.protocalForm.submit();
}
function command_getPayinfo(message)
{
 var guruWindow = window.open("","","width=400,height=250,innerHeight=250,innerWidth=380");
 var windowHTML = "<html><head><link rel=\"stylesheet\" href=\"/icbc/newperbank/css/css.css\" type=\"text/css\"><title>中国工商银行新一代网上银行</title>";
 windowHTML+= "</head>";
 windowHTML+= "<body text='#000000' leftmargin='0' topmargin='0' marginheight='0' scroll=yes><table width=380><tr><td width=\"95% \" align=\"center\" valign=\"top\"><div align=\"center\"><img src=\"/icbc/newperbank/images/logo.gif\" width=\"278\" height=\"48\"></div></td></tr><tr><td >";
 windowHTML+=  "<font size='2'>"+message+"</font></td></tr></table><h1 align='center'></h1><hr><center></body><form>";
 windowHTML+=  "<A href='javascript:self.close();'><img src='/icbc/newperbank/nbt/small/bt_close.gif'  border='0'></a>";
 windowHTML+= "</form></center></html>";
 guruWindow.document.write(windowHTML);
 guruWindow.focus();
 return;


}

function command_goto(param,campeventid1,campeventid2,campeventid3,campeventid4,campeventid5,proCode1,datadate,sessionId,nowDate){
	command_recode(proCode1,campeventid1,campeventid2,campeventid3,campeventid4,campeventid5,datadate,sessionId,nowDate,"1");
	window.location="/servlet/ICBCINBSCenterServlet?dse_sessionId=" + sessionId +"&"+param;	
}
function AD_goto(param,campeventid1,campeventid2,campeventid3,campeventid4,campeventid5,proCode1,datadate,sessionId,nowDate){
	command_recode(proCode1,campeventid1,campeventid2,campeventid3,campeventid4,campeventid5,datadate,sessionId,nowDate,"2");
	if(param.indexOf("http") != -1){
		window.open(param);
	}else{
		window.location="/servlet/ICBCINBSCenterServlet?dse_sessionId=" + sessionId +"&"+param;	
	}
}
	function command_goError(param,campeventid1,campeventid2,campeventid3,campeventid4,campeventid5,proCode1,datadate,sessionId,nowDate){
		command_recode(proCode1,campeventid1,campeventid2,campeventid3,campeventid4,campeventid5,datadate,sessionId,nowDate,"1");
		window.location="/servlet/ICBCINBSCenterServlet?id=0101&" + 
		"ActionUrl=/icbc/newperbank/service/myStarLevel/service_mystartlevel_error3.jsp" +
		"&dse_sessionId=" + sessionId;
	}
	//异步记录日志
	function command_recode(proCode1,campeventid1,campeventid2,campeventid3,campeventid4,campeventid5,datadate,sessionId,nowDate,temp9_flag){
	  var campeventid = '';
	  var temp9 = temp9_flag==undefined?"1":temp9_flag;
	  campeventid = campeventid1 ;
	  if(campeventid2!=''){
	  	campeventid = campeventid +  '|' +campeventid2;
	  	if(campeventid3!=''){
	  		campeventid = campeventid +  '|' +campeventid3;
	  		if(campeventid4!=''){
	  			campeventid = campeventid +  '|' +campeventid4;
				if(campeventid5!=''){
	  				campeventid = campeventid +  '|' +campeventid5;
	  			}	  		
	  		}
	  	}
	  }
	  var sendParam = {};
	  sendParam["SessionId"]=sessionId;
	  sendParam["nowDateRec"]=nowDate;
	  sendParam["proCode1"]=proCode1;
	  sendParam["datadate"]=datadate;
	  sendParam["campeventid"]=campeventid;
	  sendParam["temp9"]=temp9;	
	  sendParam["tranCode"]="A00133";
	  
	  EBDataStruct.sendAjax({
	  						data: sendParam,
	  						dataType: "json",
	  						url: "AsynGetDataServlet",
	  						isDisplay: false,
	  						displayArea: "pselected"
	  });   	
	}
	