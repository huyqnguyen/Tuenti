<!--
function judgeErrorCode(thefrom,safeEdit){
	var safeEdit1=eval("document."+thefrom+"."+safeEdit);
	var errCode=safeEdit1.GetErrorCode();
	if(errCode==0){
		return;
	}else if(errCode==1){
		alert("��������������ַ���������Ƿ�https://XXX.icbc.com.cn����XXX����Ӧ�÷ֱ����ã�����������Ϊmybank��vip��"); 
		return;
	}else if(errCode==2){
		alert("Ϊȷ�����ļ������ȫ��������ʹ��ɱ��������а�ȫ��飬Ȼ�����·����������С������Ȼ���ڴ����⣬����ϵ����95588");	
		return;
	}else if(errCode==3){
		alert("Ϊȷ�����ļ������ȫ��������ʹ��ɱ��������а�ȫ��飬Ȼ�����·����������С������Ȼ���ڴ����⣬����ϵ����95588��");	
		return;
	}else if(errCode==4){
		alert("Ϊȷ�����ļ������ȫ��������ʹ��ɱ��������а�ȫ��飬Ȼ�����·����������С������Ȼ���ڴ����⣬����ϵ����95588��");	
		return;
	}else if(errCode==5){
		alert("��ȫ����ؼ���װʧ�ܣ������������½��������1��ʹ�ü��������Ա�˻����·����������а�װ��ȫ����ؼ���2��ȷ�Ϲ��а�ȫ����ؼ�δ���������ȫ������������أ�3��Ϊȷ�����ļ������ȫ��������ʹ��ɱ��������а�ȫ��飬Ȼ�����·����������С������Ȼ���ڴ����⣬����ϵ����95588��");
		return;	
	}else if(errCode==6){
		alert("��ȫ����ؼ�����ʧ�ܣ������������½��������1��ʹ�ü��������Ա�˻����·����������У�2��ȷ�Ϲ��а�ȫ����ؼ�δ���������ȫ������������أ�3��Ϊȷ�����ļ������ȫ��������ʹ��ɱ��������а�ȫ��飬Ȼ�����·����������С������Ȼ���ڴ����⣬����ϵ����95588��");
		return;	
	}else if(errCode==7){
		alert("��ȫ����ؼ���ʼ��ʧ�ܣ������������½��������1��ʹ�ü��������Ա�˻����·����������У�2��ȷ�Ϲ��а�ȫ����ؼ�δ���������ȫ������������أ�3��Ϊȷ�����ļ������ȫ��������ʹ��ɱ��������а�ȫ��飬Ȼ�����·����������С������Ȼ���ڴ����⣬����ϵ����95588��");	
		return;
	}else if(errCode==8){
		alert("�û����볤��С��Ԥ����С����");
		return;	
	}else if(errCode==9){
		alert("Ϊȷ�����ļ������ȫ��������ʹ��ɱ��������а�ȫ��飬Ȼ�����·����������С������Ȼ���ڴ����⣬����ϵ����95588��");	
		return;
	}else if(errCode==10){//10����a
		alert("Ϊȷ�����ļ������ȫ��������ʹ��ɱ��������а�ȫ��飬Ȼ�����·����������С������Ȼ���ڴ����⣬����ϵ����95588��");	
		return;
	}else{		
		alert("��������"+errCode);
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
     	helpor_net_show2(this,event,'<b>��д������</b><br>���ִ�д�����򿪿��ܻ�ʹ�������������롣<br><br>����������֮ǰ����Ӧ�ð���Caps Lock����������رա�',x,y,float_width);
     	var pos=eval("document.all." + posObj);
 		document.all.tooltip2.style.left=pos.offsetLeft+x; 		
		document.all.tooltip2.style.top=pos.offsetTop+y;
 	}else{
 		
 		try{helpor_net_hide2();}catch(exception){}
 		
 		}		
}
function closeCapTip(theform,safeEdit){
	FocusFlag = false;//�ؼ�����ʧȥ����״̬
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



//�Ƿ�װ��������
function detectAssistComm(){

    var Assistflag=false;//û��װ�������ֿؼ�����û��װ��������
        
    try{
    	Assistflag = IcbcAssistComm.GetVer();//��ȡ�������ֿؼ�����汾���ж��Ƿ�װ�������ֿؼ�
  		Assistflag=true    	
 	 }catch(exception ){ 	 
  		Assistflag=false
  	}
  	try{
	  	if(Assistflag){ 
	  		Assistflag = IcbcAssistComm.IsInstalled();//�ж��Ƿ�װ�������� TRUE���Ѿ���װ��FALSEδ��װ  
	  	}
  	}catch(exception){	 
  		Assistflag=false
  	}  	
  	return Assistflag;
}

//������������
function RunAssistComm(bstrParas){
    var result;
  try{  
		if(bstrParas==""){
			result = IcbcAssistComm.Run("");//������u��
		}else{
			result = IcbcAssistComm.Run(bstrParas);//����������
		}    
	}catch(Exception){
  		return false;	
	}	
  		return true;
}

//�鿴����Ƿ�װȫ
function pulginHasInstalledUSB(compulginName,certpulginName) {
	navigator.plugins.refresh(false);
    // �����npapidemo Plugin��plugin��name����
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

//�ԱȰ汾��  chrome  firefox
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
  
//�жϸ�������ʾ
function AssistMessage(IsIEFlagUSB,netAssistantTollsurl,AssistantType,Errnum,ControllName1,ControllName2,PluginDownloadUrl){
	var ControllNameMessage = ControllName1+"��"+ControllName2;
	
	if(ControllName2==""){
		ControllNameMessage = ControllName1;		
	}
	
	if(IsIEFlagUSB=="4"){
		if(confirm("����δ��װU���������߲������°汾��������ȷ������ť���а�װ��"))
			window.open(PluginDownloadUrl,"") ;				
	}else{
		if(IsIEFlagUSB=="0"&&Errnum==-333){
			if(detectAssistComm()){
				if(confirm("�����������������ֽ����ǰ���⣬ͨ����������ж�ز����°�װ"+ControllNameMessage+"�ؼ��������ȷ���������������֡�"))
				 RunAssistComm("dev="+AssistantType) ;
			}else{
				if(confirm("���������֡���һ��������װ����������ȫ�ؼ������ߣ�����ȷ����ʼ��װ���°汾���������֡���"))
				 window.open(netAssistantTollsurl,"") ;
				}				
		}else{
			
			if(detectAssistComm()){
					if(confirm("�����������������ֽ����ǰ���⣬�����ȷ���������������֡�"))
					RunAssistComm("dev="+AssistantType) ;	
			}else{						
					if(confirm("���������֡���һ��������װ����������ȫ�ؼ������ߣ�����ȷ����ʼ��װ���°汾���������֡���"))
					window.open(netAssistantTollsurl,"") ;
			}
		}
		
	}
}
//-->