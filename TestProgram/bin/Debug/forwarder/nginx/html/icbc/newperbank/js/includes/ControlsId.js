<!--
function judgeErrorCode(thefrom,safeEdit){
	var safeEdit1=eval("document."+thefrom+"."+safeEdit);
	var errCode=safeEdit1.GetErrorCode();
	if(errCode==0){
		return;
	}else if(errCode==1){
		alert("请您检查浏览器地址栏的域名是否https://XXX.icbc.com.cn。—XXX根据应用分别设置，如网银设置为mybank或vip。"); 
		return;
	}else if(errCode==2){
		alert("为确保您的计算机安全，建议您使用杀毒软件进行安全检查，然后重新访问网上银行。如果仍然存在此问题，请联系工行95588");	
		return;
	}else if(errCode==3){
		alert("为确保您的计算机安全，建议您使用杀毒软件进行安全检查，然后重新访问网上银行。如果仍然存在此问题，请联系工行95588。");	
		return;
	}else if(errCode==4){
		alert("为确保您的计算机安全，建议您使用杀毒软件进行安全检查，然后重新访问网上银行。如果仍然存在此问题，请联系工行95588。");	
		return;
	}else if(errCode==5){
		alert("安全输入控件安装失败，请您尝试以下解决方法：1、使用计算机管理员账户重新访问网上银行安装安全输入控件；2、确认工行安全输入控件未被计算机安全防护类软件拦截；3、为确保您的计算机安全，建议您使用杀毒软件进行安全检查，然后重新访问网上银行。如果仍然存在此问题，请联系工行95588。");
		return;	
	}else if(errCode==6){
		alert("安全输入控件启动失败，请您尝试以下解决方法：1、使用计算机管理员账户重新访问网上银行；2、确认工行安全输入控件未被计算机安全防护类软件拦截；3、为确保您的计算机安全，建议您使用杀毒软件进行安全检查，然后重新访问网上银行。如果仍然存在此问题，请联系工行95588。");
		return;	
	}else if(errCode==7){
		alert("安全输入控件初始化失败，请您尝试以下解决方法：1、使用计算机管理员账户重新访问网上银行；2、确认工行安全输入控件未被计算机安全防护类软件拦截；3、为确保您的计算机安全，建议您使用杀毒软件进行安全检查，然后重新访问网上银行。如果仍然存在此问题，请联系工行95588。");	
		return;
	}else if(errCode==8){
		alert("用户输入长度小于预期最小长度");
		return;	
	}else if(errCode==9){
		alert("为确保您的计算机安全，建议您使用杀毒软件进行安全检查，然后重新访问网上银行。如果仍然存在此问题，请联系工行95588。");	
		return;
	}else if(errCode==10){//10还是a
		alert("为确保您的计算机安全，建议您使用杀毒软件进行安全检查，然后重新访问网上银行。如果仍然存在此问题，请联系工行95588。");	
		return;
	}else{		
		alert("其他错误"+errCode);
		return;
	}
	
}

function detectCapsLock(theform,safeEdit,x,y,float_width,posObj){
    var capflag=false;
    var safeEdit1; 
    try{
    	safeEdit1 = eval("document." + theform+"."+ safeEdit);
    	capflag = safeEdit1.CapsOnOrNot();
 	 }catch(exception ){
 		try{
 		 safeEdit1 = eval("document.all."+ safeEdit);
 		 capflag = safeEdit1.CapsOnOrNot();
 		}catch(e){
 		  	capflag=false
 		}
  	}
  	
     if (capflag)
      {
     	helpor_net_show2(this,event,'<b>大写锁定打开</b><br>保持大写锁定打开可能会使您错误输入密码。<br><br>在输入密码之前，您应该按“Caps Lock”键来将其关闭。',x,y,float_width);
     	var pos=eval("document.all." + posObj);
 		document.all.tooltip2.style.left=pos.offsetLeft+x; 		
		document.all.tooltip2.style.top=pos.offsetTop+y;
 	}else{
 		
 		try{helpor_net_hide2();}catch(exception){}
 		
 		}		
}
function closeCapTip(theform,safeEdit){
	FocusFlag = false;//控件处于失去焦点状态
	var safeEdit1;// = eval("document." + theform+"."+ safeEdit);
	try{
		safeEdit1 = eval("document." + theform+"."+ safeEdit);
		FocusFlag = safeEdit1.FocusOrNot();
	}catch(Exception){
		try{
			safeEdit1 = eval("document.all."+ safeEdit);
			FocusFlag = safeEdit1.FocusOrNot();
		}catch(e){
			FocusFlag = false;
		}	
	}
	if(!FocusFlag){
		try{helpor_net_hide2();}catch(exception){}
	}
	
}


function XReturnDetectCapsLock(e) {
	try{
		document.getElementById(e).onfocus();
	}catch(e1){
		document.getElementById(e).focus();
	}
}



//是否安装网银助手
function detectAssistComm(){

    var Assistflag=false;//没有装网银助手控件或者没有装网银助手
        
    try{
    	Assistflag = IcbcAssistComm.GetVer();//获取网银助手控件本身版本，判断是否装网银助手控件
  		Assistflag=true    	
 	 }catch(exception ){ 	 
  		Assistflag=false
  	}
  	try{
	  	if(Assistflag){ 
	  		Assistflag = IcbcAssistComm.IsInstalled();//判断是否安装网银助手 TRUE：已经安装，FALSE未安装  
	  	}
  	}catch(exception){	 
  		Assistflag=false
  	}  	
  	return Assistflag;
}

//启动网银助手
function RunAssistComm(bstrParas){
    var result;
  try{  
		if(bstrParas==""){
			result = IcbcAssistComm.Run("");//启动非u盾
		}else{
			result = IcbcAssistComm.Run(bstrParas);//带参数启动
		}    
	}catch(Exception){
  		return false;	
	}	
  		return true;
}

//查看插件是否安装全
function pulginHasInstalledUSB(compulginName,certpulginName) {
	navigator.plugins.refresh(false);
    // 这里的npapidemo Plugin即plugin的name属性
	var pluginsFlag1 = true;
	var pluginsFlag2 = true;
	
	if(compulginName!=""){
		pluginsFlag1 = typeof(navigator.mimeTypes['application/'+compulginName])!="undefined"; 
	}
	
	if(certpulginName!=""){		
		pluginsFlag2 = typeof(navigator.mimeTypes['application/'+certpulginName])!="undefined" &&
    	typeof(navigator.mimeTypes['application/npicbc_infosec_certenroll'])!="undefined";   
	}
	  
    if (pluginsFlag1&&pluginsFlag2) {return true;}
    return false;
}

function compareVersion(inputnames,bttinputnames){
	  var inputArray1=inputnames.split("."); 
	  var inputArray2=bttinputnames.split("."); 
	  
	  var inputvalue1,inputvalue2; 
	  for(i=0;i<inputArray1.length;i++){ 
	    //alert(inputArray[i]); 
	    inputvalue1=inputArray1[i];
	    inputvalue2=inputArray2[i];
	    if(parseInt(inputvalue1,10) < parseInt(inputvalue2,10)){	    
	      return true;
	    }else if(parseInt(inputvalue1,10) > parseInt(inputvalue2,10)){
	      return false;
	    }       
	  }
	  return false;
	}

//对比版本号  chrome  firefox
function checkVersionIsOkUSB(signPluginVersion,keyPluginVersion,errolVersion) {  
	navigator.plugins.refresh(false);
	var des;
	
		  try{
			  des = CertCtrl.GetVersion();
			  
		      if (compareVersion(des, keyPluginVersion)){
		      	if(des!=-333){
		    	  return false;
		    	  }
		      }
		  }catch(exception){if(des!=-333){return false;}}
	  
	  
	  if(signPluginVersion!=""){	  
		  try{
			  des = InfoSecNetSign1.getVersion();	 
		      if (compareVersion(des, signPluginVersion)){		  
		    	  return false;
		      }
		  }catch(exception){return false;} 
		  
	  }
	  
	  
	  if(errolVersion!=""){
		  try{
			  des = firefoxCertEnroll.getVersion();	 
		      if (compareVersion(des, errolVersion)){		  
		    	  return false;
		      }
		  }catch(exception){return false;}
	  }	  
	   
	return true;
  }
  
//判断给出的提示
function AssistMessage(IsIEFlagUSB,netAssistantTollsurl,AssistantType,Errnum,ControllName1,ControllName2,PluginDownloadUrl){
	var ControllNameMessage = ControllName1+"和"+ControllName2;
	
	if(ControllName2==""){
		ControllNameMessage = ControllName1;		
	}
	
	if(IsIEFlagUSB=="4"){
		if(confirm("您尚未安装U盾驱动或者不是最新版本，请点击“确定”按钮进行安装。"))
			window.open(PluginDownloadUrl,"") ;				
	}else{
		if(IsIEFlagUSB=="0"&&Errnum==-333){
			if(detectAssistComm()){
				if(confirm("建议您启动网银助手解决当前问题，通过网银助手卸载并重新安装"+ControllNameMessage+"控件。点击“确定”启动网银助手。"))
				 RunAssistComm("dev="+AssistantType) ;
			}else{
				if(confirm("“网银助手”可一键帮您安装更新网银安全控件及工具，请点击确定开始安装最新版本“网银助手”。"))
				 window.open(netAssistantTollsurl,"") ;
				}				
		}else{
			
			if(detectAssistComm()){
					if(confirm("建议您启动网银助手解决当前问题，点击“确定”启动网银助手。"))
					RunAssistComm("dev="+AssistantType) ;	
			}else{						
					if(confirm("“网银助手”可一键帮您安装更新网银安全控件及工具，请点击确定开始安装最新版本“网银助手”。"))
					window.open(netAssistantTollsurl,"") ;
			}
		}
		
	}
}
//-->