/**
* ���ܣ�Ϊ���������ݶ���������ڴ��ļ��з�װ�ж���������ͣ�����js hack�Ĺ���js����
* 
*/

function BrowserCompatible(){
}


/**
*��ȡ���������
*@return ��������ͣ�MSIE;Safari;Firefox
*/
BrowserCompatible.prototype.getBrowserType = function(){
	var ua = navigator.userAgent;
	if (ua.indexOf("MSIE")>-1) {
		return 'MSIE';
	}else if (ua.indexOf("Chrome/")>-1) {
		return 'Chrome';
	}else if (ua.indexOf("Safari")>-1) {
		return 'Safari';
	}else if (ua.indexOf("Firefox")>-1) {
		return 'Firefox';
	}
}

/**
*�ж��Ƿ���IE
*@return true/false
*/
BrowserCompatible.prototype.isIE = function(){
	if(this.getBrowserType()==='MSIE') return true;
	else return false;
}
/**
*�ж��Ƿ���Chrome
*@return true/false
*/
BrowserCompatible.prototype.isChrome = function(){
	if(this.getBrowserType()==='Chrome') return true;
	else return false;
}
/**
*�ж��Ƿ���Safari
*@return true/false
*/
BrowserCompatible.prototype.isSafari = function(){
	if(this.getBrowserType()==='Safari') return true;
	else return false;
}
/**
*�ж��Ƿ���Firefox
*@return true/false
*/
BrowserCompatible.prototype.isFirefox = function(){
	if(this.getBrowserType()==='Firefox') return true;
	else return false;
}
/**
*��ȡkeycode
*@return true/false
*/
BrowserCompatible.prototype.getKeycode = function(e){
	if(this.isIE()) {
		return window.event.keyCode;
	}else if(this.isFirefox() || this.isChrome()) {
		var keyCode = window.event?e.keyCode:e.which;
		//ctrl��������,tab�����ˣ����ذ�back������
		if(e.ctrlKey == true || keyCode==0){
		keyCode = 8;}
		return keyCode;
	}else {return e.which;}
}
/**
*��ֹĬ���¼�
*@return true/false
*/
BrowserCompatible.prototype.eventPreventDefault = function(e){
	if(this.isIE()) {
		 window.event.returnValue = false;
	}else {
		 e.preventDefault();
	}
}
/**
*��ֹ�¼�ð��
*@return true/false
*/
BrowserCompatible.prototype.eventStopPropagation = function(e){
	if(this.isIE()) {
		 window.event.cancelBubble = true;
	}else {
		 e.stopPropagation();
	}
}
/**
*��ֹ�¼�ð��
*@return true/false
*/
BrowserCompatible.prototype.eventFromElement = function(e){
	if(this.isIE()) {
		 window.event.cancelBubble = true;
	}else {
		 e.preventDefault();
	}
}
/**
*event��ȡ�¼�Դ
*@return �¼�Դ����
*/
BrowserCompatible.prototype.getEventFromElement = function(e){
	if(this.isIE()) {
		 return window.event.fromElement;
	}else {
		 return e.relatedTarget;
	}
}
/**
*event��ȡ�¼�Դ
*@return �¼�Դ����
*/
BrowserCompatible.prototype.getEventSrcElement = function(e){
	if(this.isIE()) {
		 return window.event.srcElement;
	}else{
		 return e.target;
	}
}
/**
*��ȡԪ�ص�innerText
*@return Ԫ�ص�innerText��ֵ
*/
BrowserCompatible.prototype.getDomInnerText = function(dom){
	if(this.isIE()) {
		 return dom.innerText;
	}else {
		 return dom.textContent;
	}
}
/**
*��ȡ������汾��
*@return version
*/
BrowserCompatible.prototype.getBrowserVersion = function(dom){
	var ua = navigator.userAgent;
	var version;
	if(this.isSafari()) {
		var index = ua.indexOf("Version");
		version = ua.substr(index+8,5);
	}
	return version;
}

BrowserCompatible.prototype.setInputAutocomplete = function(){
	if(document.readyState=="complete"){
		var inputs = document.body.getElementsByTagName("input");
		var textareas = document.body.getElementsByTagName("TEXTAREA");		
		
		var ADoms = document.body.getElementsByTagName("A");
		var coverDiv = "<div id='float-input-cover-div' style='background-color:rgba(0,0,0,0);position:absolute;width:100%;height:100%;top:0;left:0;z-index:2;display:none;' onclick='window.blurTimes=0;'></div>";
		document.body.insertAdjacentHTML('afterBegin', coverDiv);
		var replaceNameAppend=0;
		function setInputFloat(input1) {
			if (input1.style.position != 'absolute') {
				input1.style.position = 'absolute';
				input1.style.zIndex = 10;
				input1.style.left = GetAbsoluteLocationEx(input1).absoluteLeft-2;
				input1.style.top = GetAbsoluteLocationEx(input1).absoluteTop-2;
				setTimeout(function(){input1.select()}, 0);
			}
		}
		function replaceInputWithDiv(input1,i) {
			var holdDivId = "float-input-hold-div-" + replaceNameAppend++;
			if(document.getElementById(holdDivId)==null){
				var newinput = input1.cloneNode(false);
				newinput.disabled=true;
				newinput.setAttribute("type","search");
				newinput.id=holdDivId;
				newinput.name=holdDivId;
				input1.insertAdjacentElement('afterEnd',newinput);
			}
		}
		function GetAbsoluteLocationEx(element) {
			if (arguments.length != 1 || element == null) {
				return null;
			}
			var elmt = element;
			var offsetTop = elmt.offsetTop;
			var offsetLeft = elmt.offsetLeft;
			var offsetWidth = elmt.offsetWidth;
			var offsetHeight = elmt.offsetHeight;
			while (elmt = elmt.offsetParent) {
				if (elmt.style.position == 'absolute'
						|| elmt.style.position == 'relative'
						|| (elmt.style.overflow != 'visible' && elmt.style.overflow != '')) {
					break;
				}
				offsetTop += elmt.offsetTop;
				offsetLeft += elmt.offsetLeft;
			}
			return {
				absoluteTop : offsetTop,
				absoluteLeft : offsetLeft,
				offsetWidth : offsetWidth,
				offsetHeight : offsetHeight
			};
		}
		function BindEventForFloatInput(inputDom){
			inputDom.addEventListener("focus", function(){
				document.getElementById('float-input-cover-div').style.display = '';
				document.getElementById("float-input-cover-div").style.height=document.body.scrollHeight;
			});
			inputDom.addEventListener("blur", function(){
				document.getElementById('float-input-cover-div').style.display = 'none';
			});
		}
		for(var i=0;i<inputs.length;i++){
			if(inputs[i].type.toLowerCase()=="text"){
				inputs[i].setAttribute("autocomplete","off");
				inputs[i].setAttribute("autocorrect","off");
				inputs[i].setAttribute("autocapitalize","off");
				inputs[i].setAttribute("spellcheck","false");
				this.blurOneTime(inputs[i]);
				//replaceInputWithDiv(inputs[i], i);
				//setInputFloat(inputs[i]);
				//BindEventForFloatInput(inputs[i]);
			}
			if((window.name=='topFrame'||parent.name=='topFrame')&&inputs[i].name=="randomIdAppendToFormForMacSafari"){
				//console.log("************top frame remove append");
				inputs[i].parentNode.removeChild(inputs[i]);
			}
		}
		for(var i=0;i<textareas.length;i++){
			if(textareas[i].getAttribute("type") != "search"){
				textareas[i].setAttribute("autocomplete", "off");
				textareas[i].setAttribute("autocorrect", "off");
				textareas[i].setAttribute("autocapitalize", "off");
				textareas[i].setAttribute("spellcheck", "false");
				this.blurOneTime(textareas[i]);
				//replaceInputWithDiv(textareas[i], i);
				//setInputFloat(textareas[i]);
				//BindEventForFloatInput(textareas[i]);
			}
		}
		function noOnClickOnAlert(adom){
			var preClickHandler = adom.onclick;
			adom.onclick=function(){
				if(window.alertTimes>0)
						event.preventDefault();
				else{
					if(preClickHandler!=null)
						preClickHandler();
				}
			}
		}
		for(var i=0;i<ADoms.length;i++){
			if(ADoms[i].getAttribute("href") != null
				||ADoms[i].getAttribute("onclick") != null){
				noOnClickOnAlert(ADoms[i]);
				
			}
		}
		//this.alertWithLimitTimes();
	}else{
		setTimeout("pebankBrowserCompatible.setInputAutocomplete()","200");
	}
	
} 
/**
 * һ�ε��ֻ�ܴ���һ��blurʱ��
 */
window.blurTimes=0;
window.alertTimes=0;
function setTimesTo0_browsercompatible(){window.blurTimes=0;}
BrowserCompatible.prototype.blurOneTime = function(inputDom){
	var blurTimes=0;
	var blurHandlerBefore = inputDom.onblur;
	if(blurHandlerBefore!=null){
		inputDom.onblur=function(){
			if(window.blurTimes<1){
				window.blurTimes++;
				blurHandlerBefore();
				setTimeout("setTimesTo0_browsercompatible()",100);
			}	
		}
	}
/*	document.body.addEventListener("click",function(){
		window.blurTimes=0;
		window.alertTimes=0;
		});*/
}

BrowserCompatible.prototype.setFormAppendTimestamp = function(){
	if(document.readyState=="complete"){
		if(window.name!='topFrame'&&window.name!='leftFrame'){//������Ŀ�е�form�����ʱ���
		var forms = document.body.getElementsByTagName("form");
		for(var i=0;i<forms.length;i++){
			var formTarget=forms[i].getAttribute("target");
			if((formTarget==null||formTarget=="_self")&&forms[i].outerHTML.indexOf("randomIdAppendToFormForMacSafari")==-1&&forms[i].action.indexOf("ICBCBaseReqServletNoSession")==-1){
				var timestamp=new Date().getTime()+i;
				var newInput=document.createElement("input");
				newInput.name="randomIdAppendToFormForMacSafari";
				newInput.value=timestamp;
				newInput.type="hidden";
				//var newInput="<input name=\"randomIdAppendToFormForMacSafari\" value=\""+timestamp+"\"/>";
				forms[i].appendChild(newInput);
			}else if((formTarget!=null&&formTarget!="_self")&&forms[i].outerHTML.indexOf("randomIdAppendToFormForMacSafari")!=-1){//��targetΪ������form��ʱ���ȥ��
				forms[i].removeChild(forms[i].randomIdAppendToFormForMacSafari);
				
			}
		}
		}
	}else{
		setTimeout("pebankBrowserCompatible.setFormAppendTimestamp()",200);
	}
} 
/**
 * safari��ͬһformͬһaction�����ظ�����ҳ������
 */
BrowserCompatible.prototype.action_blankformSubmit = function(formObj){
	var newDate = new Date();
	var tempRandom = newDate.getTime();
	var actionBak = formObj.action;
	var index = actionBak.indexOf("?");
	//safari
	if(this.isSafari())
	{
		//�в���
		if(index>-1)
		{
			var indexTempRandom = actionBak.indexOf("actionBlankFormSubmitTimeStamp=");
			//���б���
			if(indexTempRandom > -1)
			{
				formObj.action= actionBak.substring(0,indexTempRandom) + "actionBlankFormSubmitTimeStamp="+ tempRandom;
			}
			else
			{
				formObj.action= actionBak +"&actionBlankFormSubmitTimeStamp=" + tempRandom;
			}
		}
		else
		{	//�޲���
			formObj.action= actionBak +"?actionBlankFormSubmitTimeStamp=" + tempRandom;
		}
	}
	formObj.submit();
}


/**
*��sessionId��localStorage�У���½ҳ������ǩ�˲���
*/
BrowserCompatible.prototype.setContentToLocalStorage = function(sid){
		try{window.localStorage.setItem("sid",sid);}catch(exception){}
}
/**
*���localStorage�б����sessionid
*/
BrowserCompatible.prototype.clearLocalStorage = function(){
		try{window.localStorage.removeItem("sid");}catch(exception){}
}
/**
*��ȡlocalStorage�б����sessionid
*/
BrowserCompatible.prototype.getLocalStorage = function(){
		try{return window.localStorage.getItem("sid");}catch(exception){}
}

BrowserCompatible.prototype.setInnerText = function(){
	   HTMLElement.prototype.__defineGetter__(     "innerText", 
			    function(){
			     var anyString = "";
			     var childS = this.childNodes;
			     for(var i=0; i<childS.length; i++) {
			      if(childS[i].nodeType==1)
			       anyString += childS[i].tagName=="BR" ? '\n' : childS[i].innerText;
			      else if(childS[i].nodeType==3)
			       anyString += childS[i].nodeValue;
			     }
			     return anyString;
			    } 
			   ); 
			   HTMLElement.prototype.__defineSetter__(     "innerText", 
			    function(sText){ 
			     this.textContent=sText; 
			    } 
			   ); 
}
var _inputf =null;
var _textareaf =null;
var checkbyid = 0;
var _focus=new Array();
BrowserCompatible.prototype.setInputBlurTimeout = function (){
	_inputf = document.getElementsByTagName("input");
	_textareaf = document.getElementsByTagName("textarea");
	//����input�Ľ���
	for(var _inputi=0;_inputi<_inputf.length;_inputi++){
	if(_inputf[_inputi].type != 'text')continue;
	_focus[_focus.length] = {"blur":_inputf[_inputi].onblur,"name":_inputf[_inputi].name,"id":_inputf[_inputi].id};
	var _inputblur =  _inputf[_inputi].onblur;
	if(_inputblur!=null){
	_inputf[_inputi].onblur = function(){
		var checkbyid1 = checkbyid ==1?1:0;
		if(window.blurTimes<1){
				window.blurTimes++;
  	var _focusname = this.name; 
  	var _focusid = this.id;   	
  	  	if(_focusname.indexOf("-Suggest") != -1){
  		_focusname = _focusname.substr(0,_focusname.indexOf("-Suggest"));
  	}  	
  	var _focusindex = -1;
  	var hasmore=0;
  	if(checkbyid1 == 0){//�Ȱ���name��ѯ
  	for(var _inputi2=0;_inputi2<_focus.length;_inputi2++){
  		//�ж��Ƿ���������input��
  		if(_focusname == null || _focusname == ""){checkbyid1 = 1;}else{
  		if(_focusname==_focus[_inputi2].name || (_focusname+"-Suggest")==_focus[_inputi2].name){
  			if(hasmore ==0){
  			hasmore = 1;
  			_focusindex = _inputi2; 	
  			continue;	
  			}else{
  				_focusindex = -1;
  				checkbyid1 = 1;
  				hasmore = 2;
  	  			break;
  			}
 
  		}}
  	}}
  	if(checkbyid1 == 1){//����id��ѯ
  	for(var _inputi3=0;_inputi3<_focus.length;_inputi3++){
 		if(checkbyid1 == 1 && _focusid != null && _focusid != "" && _focusid==_focus[_inputi3].id){
  			_focusindex = _inputi3;
  			break;
  		}  	
  	}	}
  	if(_focusindex == -1) {	setTimeout("setTimesTo0_browsercompatible()",100);return;}
	setTimeout("setTimesTo0_browsercompatible()",100);
  	setTimeout("_focus[" + _focusindex + "].blur()",0);
	}
   	setTimeout("setTimesTo0_browsercompatible()",100); 
  }

	}
	}
	//����textarea�Ľ���
	for(var _inputt=0;_inputt<_textareaf.length;_inputt++){
		_focus[_focus.length] = {"blur":_textareaf[_inputi].onblur,"name":_textareaf[_inputi].name};
		var _inputblurt =  _inputf[_inputi].onblur;
		if(_inputblurt!=null){
			_textareaf[_inputt].onblur = function(){
						if(window.blurTimes<1){
				window.blurTimes++;
	  	var _focustname = this.name; 
	  	var _focustindex = 0;
	  	for(var _inputt2=0;_inputt2<_focus.length;_inputt2++){
	  		if(_focustname==_focus[_inputt2].name){
	  			_focustindex = _inputt2;
	  			break;
	  		}
	  }
	  	setTimeout("_focus[" + _focustindex + "].blur()",0);}
   		setTimeout("setTimesTo0_browsercompatible()",100); 	  	
	  	};
		}
		}	
}
var _formsub= new Array();
BrowserCompatible.prototype.setSubmitTimeout = function(){
	if(document.readyState=="complete"){
		_formf = document.getElementsByTagName("form");
		//����input�Ľ���
		for(var _formi=0;_formi<_formf.length;_formi++){
		_formsub[_formsub.length] = _formf[_formi].submit;
		var _inputblur =  _formf[_formi].submit;
		if(_inputblur!=null){
		_inputf[_formi].onblur = function(){
	  	var _formname = this.name; 
	  	var _formindex = 0;
	  	for(var _formi2=0;_formi2<_formf.length;_formi2++){
	  		if(_formname==_formf[_formi2].name)
	  			_formindex = _formi2;
	  }
	  	
	  	 setTimeout("_focus[" + _formindex + "]()",500);};
		}
		}
		}else{
		setTimeout("pebankBrowserCompatible.setSubmitTimeout()","200");}
}
var pebankBrowserCompatible = new BrowserCompatible();

//��ֹ���������input��textarea�����빦��
try{
	if(pebankBrowserCompatible.isIE()){
		window.attachEvent("onload",function(){
			try{
				var _inputs = document.getElementsByTagName("input");
				var textareas = document.body.getElementsByTagName("TEXTAREA");		
				for(var _inputi=0;_inputi<_inputs.length;_inputi++){
				    if(_inputs[_inputi].type.toLowerCase() == 'text' && _inputs[_inputi].name.indexOf("-Suggest")==-1){
				    	_inputs[_inputi].ondrop = function(){return false;}
				    	_inputs[_inputi].ondragenter = function(){return false;}
				    	_inputs[_inputi].ondragover = function(){return false;}
				    }
				}
				for(var i=0;i<textareas.length;i++){
					textareas[i].ondrop = function(){return false;}
					textareas[i].ondragenter = function(){return false;}
					textareas[i].ondragover = function(){return false;}
				}
			}catch(e){}
		},false); 
	}else{
		window.addEventListener("load",function(){
			try{
				var _inputs = document.getElementsByTagName("input");
				var textareas = document.body.getElementsByTagName("TEXTAREA");		
				for(var _inputi=0;_inputi<_inputs.length;_inputi++){
				    if(_inputs[_inputi].type.toLowerCase() == 'text' && _inputs[_inputi].name.indexOf("-Suggest")==-1){
				    	_inputs[_inputi].ondrop = function(){return false;}
				    	_inputs[_inputi].ondragenter = function(){return false;}
				    	_inputs[_inputi].ondragover = function(){return false;}
				    }
				}
				for(var i=0;i<textareas.length;i++){
					textareas[i].ondrop = function(){return false;}
					textareas[i].ondragenter = function(){return false;}
					textareas[i].ondragover = function(){return false;}
				}
			}catch(e){}
		},false); 
	}
}catch(e_drag){}

/**
 * �����safari����������Ұ汾����5.1�Ļ��������λ��˰�ť����Ϊsafari��history.go��bug
 * ��history.go������д��alert��ʾ
 */
if(pebankBrowserCompatible.isSafari()){
	/*Safari input:empty��ʽ*/
	var safariCSS = "<style type=\"text/css\">"+
		"input:empty{font-size:12px;font-family:Helvetica;} "+
		"table,td{border-color:rgb(236,233,216);}"+
		"</style>";
	document.write(safariCSS);
	//���λ��˰�ť
	//if(pebankBrowserCompatible.getBrowserVersion().substr(0,3)<5.1){
		history.go=function(){
			//alert("��������Safari������汾���ͣ����˲�����ʹ��ֱ���˳��������������������°�Safari�������");
			pebankBrowserCompatible.alertHistoryTip();
		}
		history.back=function(){
			//alert("��������Safari������汾���ͣ����˲�����ʹ��ֱ���˳��������������������°�Safari�������");
			pebankBrowserCompatible.alertHistoryTip();
		}
		
	//}
	//safari������ر�input���Զ���书��
	pebankBrowserCompatible.setInputAutocomplete();
	pebankBrowserCompatible.setFormAppendTimestamp();
	
}
if(pebankBrowserCompatible.isFirefox()){
	var _alert=window.alert;
	window.alert=function(t){try{_alert(t + '\n\n\n\n' + '��ʾ��Ϊ������������������ѡ����ֹ��ҳ�洴�������Ի���');}catch(e){}};	
	var _confirm=window.confirm;
	window.confirm=function(t){try{return _confirm(t + '\n\n\n\n' + '��ʾ��Ϊ������������������ѡ����ֹ��ҳ�洴�������Ի���');}catch(e){return false;}};		
	pebankBrowserCompatible.setInnerText();
	window.addEventListener("load",function(){
				try{
		pebankBrowserCompatible.setInputBlurTimeout();
			}catch(e){}
		try{
		getStorepageinfo();
	}catch(e){}
				
	},false); 
	
	window.addEventListener("unload",function(){
	//			alert("������event��onunload");
					try{
		storePageInfo();
			}catch(e){}
	},false);
	
//try{	console.error("��ʷ��¼��" + history.length + "==href��" + window.location.href + "==name" + window.name);}catch(e){}

}
/*Chrome���⴦��*/
if(pebankBrowserCompatible.isChrome()){
	/*Chrome����CSS�޷�����Safari(ͬ�ں�)������js��̬���ã�����CSS�ļ�������*/
	var chromeCSS = "<style type=\"text/css\">"+
					"body{font-family:����;}"+
					"select{font-size:13px;font-family:����;margin-left:0px;}"+
					"textarea{font-size:12px;font-family:����;margin-left:0px;}"+
					"input:empty{font-size:13px;font-family:����;margin-left:0px;margin-top:0px;}"+
					"html,body{-webkit-text-size-adjust:none;}"+
					"table,td{border-color:rgb(236,233,216);}"+
					"input[type='text'],input[type='file'],input[type='reset'],input[type='submit'],input[type='button'],input[type='password']{margin-left:0px;margin-top:0px;}"+
					"input[type='radio'],input[type='checkbox']{vertical-align:-2px;margin-top:0px;}"+
					/*���input�Բ�������⣬����td��߾�Ϊ2,checkbox��radio������ֱ���������־���*/
					/*"a:active,a:focus{outline:1px dotted #FF6600;}"+*/
					"</style>";
	document.write(chromeCSS);
	history.go=function(){
		pebankBrowserCompatible.alertHistoryTip();
	}
	history.back=function(){
		pebankBrowserCompatible.alertHistoryTip();
	}
	var _alert=window.alert;
	window.alert=function(t){try{_alert(t + '\n\n\n\n' + '��ʾ��Ϊ������������������ѡ����ֹ��ҳ����ʾ�Ի���');}catch(e){}};	
	var _confirm=window.confirm;
	window.confirm=function(t){try{return _confirm(t + '\n\n\n\n' + '��ʾ��Ϊ������������������ѡ����ֹ��ҳ����ʾ�Ի���');}catch(e){return false;}};		
	pebankBrowserCompatible.setInnerText();
	window.addEventListener("load",function(){
		try{
			//ȥ��chrome�Դ���¼����
			var _inputs = document.getElementsByTagName("input");
			var textareas = document.body.getElementsByTagName("TEXTAREA");		
			for(var _inputi=0;_inputi<_inputs.length;_inputi++){
			    if(_inputs[_inputi].type.toLowerCase() == 'text'){
			    	//ȥ���������Զ���������
			    	_inputs[_inputi].setAttribute("autocomplete","off");
			    	_inputs[_inputi].setAttribute("autocorrect","off");
			    	_inputs[_inputi].setAttribute("autocapitalize","off");
			    	_inputs[_inputi].setAttribute("spellcheck","false");
			    }
			}
			for(var i=0;i<textareas.length;i++){
				if(textareas[i].getAttribute("type").toLowerCase() != "search"){
					textareas[i].setAttribute("autocomplete", "off");
					textareas[i].setAttribute("autocorrect", "off");
					textareas[i].setAttribute("autocapitalize", "off");
					textareas[i].setAttribute("spellcheck", "false");
				}
			}
		}catch(e){}
		try{
			pebankBrowserCompatible.setInputBlurTimeout();
		}catch(e){}
		try{
			getStorepageinfo();
		}catch(e){}
					
		},false); 
	window.addEventListener("unload",function(){//��ֹ��ֱֹ�ӹر������ʱ���޷�ǩ��
	},false);
	window.addEventListener("beforeunload",function(){
		try{
			storePageInfo();
		}catch(e){}
	},false);
	//try{console.error("��ʷ��¼��" + history.length + "==href��" + window.location.href + "==name" + window.name);}catch(e){}
}
/**
*������֧��������汾���͵���ʾ
*
*/
BrowserCompatible.prototype.alertHistoryTip = function(){
	scroll(0,0);
	var safariUpdateUrl = "http://www.apple.com/safari/download";
	if(document.getElementById("alerthistorytip-outbackground")==null){
		var html = "<div id='alerthistorytip-outbackground' style='z-index:1000;width:100%;height:100%;position:absolute;top:0px;left:0px;background-color:rgba(0,0,0,0.25);'>";
		html = html + "<div id='alerthistorytip-innerbackground' style='width:500px;height:250px;margin:50px auto 0px;background-color:rgb(238,238,255);-webkit-box-shadow:0px 0px 6px #000;'>";
		html = html + "<div id='alerthistorytip-inner-content' style='float:left;height:190px;margin-top:5%;margin-left:5%;margin-right:5%;border:3px solid #D9D9D9;background-color:#FFFFFF;'>";
		html = html + "<div id='alerthistorytip-inner-content-left' style='width:121px;height:135px;float:left;background-image:url(/icbc/newperbank/images/back.gif);'>";
		html=html+"</div>";
		html = html + "<div id='alerthistorytip-inner-content-right' style='width:320px;height:135px;float:left;'>";
		html = html + "<div id='alerthistorytip-inner-titile'  style='margin-left:2em;padding-top:20px;font-size:14px;font-weight:bold;text-align:left;'>";
		html=html+"��ܰ��ʾ";
		html=html+"<hr color='#CCCCCC' width='90%' align='left' size='0'>";
		html=html+"</div>";
		html = html + "<div id='alerthistorytip-inner-text' style='margin-left:2em;top:20px;height:150px;font-size:12px;text-align:left;'>";
		if(pebankBrowserCompatible.isSafari()){
			html=html+"�Բ����ݲ�֧�ָò�����ͬʱ������Safari��������˰�ť��DELETE�Ȼᵼ��ҳ����˵Ĳ������������ܻᵼ�½����ظ��ύ���������Ӳ˵�������ѡ���ס�";
		}else if(pebankBrowserCompatible.isChrome()){
			html=html+"�Բ����ݲ�֧�ָò�����ͬʱ������Chrome��������˰�ť��Backspace�Ȼᵼ��ҳ����˵Ĳ������������ܻ�Ӱ�����Ŀͻ����顣�������Ӳ˵�������ѡ���ס�";
		}
		html=html+"</div>";
		html=html+"</div>";
		html = html + "<div id='alerthistorytip-inner-bottom' style='text-align:center;float:left;width:100%;margin-top:15px;'>";
		html=html+"<a href='javascript:pebankBrowserCompatible.hideTip()'><img src='/icbc/newperbank/nbt/small/bt44.gif' border='0'/></a>";
		html=html+"</div>";
		html=html+"</div>";
		html=html+"</div>";
		html=html+"</div>";
		document.body.insertAdjacentHTML('afterBegin',html);
		document.getElementById("alerthistorytip-innerbackground").style.marginTop=document.body.scrollTop+50;
		document.getElementById("alerthistorytip-outbackground").style.height=document.body.scrollHeight;
		var bodyWidth=document.body.clientWidth;
		if(bodyWidth<500){
			document.getElementById("alerthistorytip-innerbackground").style.width=bodyWidth;
			if(pebankBrowserCompatible.isSafari()){
				document.getElementById("alerthistorytip-inner-content-right").style.width=bodyWidth*0.9-126;
			}else if(pebankBrowserCompatible.isChrome()){
				document.getElementById("alerthistorytip-inner-content-right").style.width=bodyWidth*0.9-138;
			}
		}
	}else{
		document.getElementById("alerthistorytip-outbackground").style.display="";
	}
}
BrowserCompatible.prototype.hideTip = function(){
		document.getElementById("alerthistorytip-outbackground").style.display="none";
	} 
/**
 * iframe�е����´���ʱ���´����е���window.opener.focus()�޷�ʹopener��ý���
 * ����ʹ��window.opener.top.focus();
 */
if(!pebankBrowserCompatible.isIE()){
	document.addEventListener("DOMContentLoaded",function(){
		 var beforeWindowFocus=window.focus;
		 window.focus=function(){
			 	if(window.top!=window){
			 		window.top.focus();
			 	}else{
			 		beforeWindowFocus();	
			 	}
		 	}
	},false);
}
if(pebankBrowserCompatible.isSafari()){
	document.addEventListener("DOMContentLoaded",function(){
		 document.body.addEventListener("click",function(){
			 	console.log("body click");
			 	window.blurTimes=0;
			 	window.alertTimes=0;
				});	
			var alertBefore_pebankCompare = window.alert;
			window.alert= function(x){
				if(window.blurTimes>0)window.alertTimes=1;
				alertBefore_pebankCompare(x);	
			}
	},false);

}

/*
 * firefox go-1�Զ������ط���
 * */
//onunloadʱ�����������ֵ
function storePageInfo(){
			if(document.all.saveFiledValueFirefox == undefined){return;}
	var inputf = document.getElementsByTagName("input");
	var textareaf = document.getElementsByTagName("textarea");
	var selectf = document.getElementsByTagName("select");
	var inputs = new Array();
	//input
	for(var m=0;m<inputf.length;m++){
		if(inputf[m].type == "hidden")continue;
		if(inputf[m].name == "")continue;//����δ����
		inputs.push(inputf[m]);
	}
	for(var m=0;m<textareaf.length;m++){
		if(textareaf[m].name == "")continue;//����δ����
		inputs.push(textareaf[m]);
	}
	for(var m=0;m<selectf.length;m++){
		if(selectf[m].name == "select_layer")continue;//���˿���ͨ��
		if(selectf[m].name == "")continue;//����δ����
		inputs.push(selectf[m]);
	}			
	GoBackSaveValueFirfox(inputs,"1");			
}
//onloadʱ��ȡ�������ֵ
function getStorepageinfo(){
			if(document.all.saveFiledValueFirefox == undefined){return;}
	var inputf = document.getElementsByTagName("input");
	var textareaf = document.getElementsByTagName("textarea");
	var selectf = document.getElementsByTagName("select");
	var inputs = new Array();
	//input
	for(var m=0;m<inputf.length;m++){
		if(inputf[m].type == "hidden")continue;
		if(inputf[m].name == "")continue;//����δ����
		inputs.push(inputf[m]);
	}
	for(var m=0;m<textareaf.length;m++){
		if(textareaf[m].name == "")continue;//����δ����
		inputs.push(textareaf[m]);
	}
	for(var m=0;m<selectf.length;m++){
		if(selectf[m].name == "select_layer")continue;//���˿���ͨ��
		if(selectf[m].name == "")continue;//����δ����
		inputs.push(selectf[m]);
	}			
	GoBackSaveValueFirfox(inputs,"2");			
}
//���or��ȡ������ 1��䣬2��ȡ
function GoBackSaveValueFirfox(savefmtList,flag)
{
	var delim = "$%#";
	var selObj;
	if(flag=="1"){
			document.all.saveFiledValueFirefox.value="";
			var s = ""
			var n = "";
			for( var i=0;i<savefmtList.length;i++)
			{
				try{
					selObj = savefmtList[i];
					n = n + delim + selObj.name;
					if(selObj.value == undefined){
						throw new Error("��ȡdom����ʧ��");
					}
					if(selObj.type == 'radio'){
						if(selObj.checked == true){
					s = s + delim + "checked"}else{
					s = s + delim + "";
					}
					continue
					}
					if(selObj.type == 'checkbox'){
						if(selObj.checked == true){
					s = s + delim + "checked"}else{
					s = s + delim + "";
					}
					continue
					}
					selObj.value;//����������������Ƿ��쳣
				}catch(e){
					try{
					selObj = savefmtList[i];
					selObj = selObj.getSuggestInput();
					}catch(e1){
						s = s + delim + 'null';
						continue;
					}
				}
					s = s + delim + selObj.value;
					
			}
			s = s.substring(delim.length);
			document.all.saveFiledValueFirefox.value = s;
			
	}else{
		var saveValue = document.all.saveFiledValueFirefox.value;
		if(saveValue=='')
			return;
		var saveValueList = saveValue.split(delim);
			for( var j=0;j<savefmtList.length;j++)
			{
				try{
					forselFirefox(savefmtList[j],saveValueList[j]);
				}catch(e){
					continue;
				}
				try{GoBackOtherProcessFirefox(savefmtList[j],saveValueList[j]);}catch(exception){} //�����Ҫ�������������Լ������ж���÷����ķ����塣
			}
	}
}
//����������ֵ
function forselFirefox(selename,selenamevalue){
	var obj1 = selename;
	try{
		if(obj1.value == undefined){
			throw new Error("��ȡdom����ʧ��");
		}
		obj1.value;//��������������쳣
		if(obj1.type == 'radio'){
			if(selenamevalue == 'checked'){
				obj1.checked = true;
		}
		return;
		}
				if(obj1.type == 'checkbox'){
			if(selenamevalue == 'checked'){
				obj1.checked = true;
		}
		return;
		}
		try{
			var i=0;
			for (i=0;i<obj1.length;i++){
				if (obj1.options[i].value == selenamevalue ){
					obj1.options[i].selected=true;
		    	break;
				}
			}
			try{obj1.value=selenamevalue;}catch(exception){}
		}catch(exception){
			
		}
	}
	catch(e){
		try{
			selObj = eval(selename);
			selObj.getSuggestInput().value  = selenamevalue;
			selObj.getSuSuggestKeyInput().value = selenamevalue;
		}catch(e1){	
			}	
		
	}

}
//��ĳһ��ȡֵ����ʱ����
function getSaveValueAtFirefox(index){
	var delim = "$%#";
	try{
		var saveValue = document.all.saveFiledValueFirefox.value;
		if(saveValue=='') return "";
		var saveValueList = saveValue.split(delim);
		return saveValueList[index];
	}catch(exception){}
}


/*
 * firefox�ؼ���ط���
 * */
//�ȽϿؼ��汾
var pluginInputVersion;
var pluginSubmitVersion;
var pluginFullScreenVersion;
var pluginClientBindingVersion;
var pluginCLCacheVersion;
function cmpVersion(s, d, deli)
{
	var s1 = s.split(deli);
	var d1 = d.split(deli);
		for(var i = 0; i < s1.length; i++ )
		{
			if(Number(s1[i]) > Number(d1[i]));
			else if (Number(s1[i]) < Number(d1[i]))return -1;
		}
		return 0;
}
//�״����ذ汾,����¿ؼ���û��װ����ѯ
	function checkPlugin() {
	navigator.plugins.refresh(false);
    // �����npapidemo Plugin��plugin��name����
    if (pulginHasInstalled()) {
      window.location.reload();
    } else {
      setTimeout("checkPlugin()", 1000);
    }
  }
//���°汾,����¿ؼ���û��װ����ѯ
function checkPluginUpdate() {
	  navigator.plugins.refresh(false);
	  if(checkVersionIsOk()){
		  window.location.reload();
	  }else{
	      setTimeout("checkPluginUpdate()", 1000);		  
	  }
  }

//�鿴����Ƿ�װȫ
function pulginHasInstalled() {
	navigator.plugins.refresh(false);
    // �����npapidemo Plugin��plugin��name����
	var pluginsFlag;
	if(pebankBrowserCompatible.isFirefox()){
		pluginsFlag =  
		typeof(navigator.mimeTypes['application/x-icbcnpxxin-plugin-input'])!="undefined" &&
    	typeof(navigator.mimeTypes['application/x-icbc-plugin-submit'])!="undefined" &&
    	typeof(navigator.mimeTypes['application/x-icbc-ClientBinding'])!="undefined" &&
    	typeof(navigator.mimeTypes['application/x-npFullScreen-plugin'])!="undefined" &&
    	typeof(navigator.mimeTypes['application/x-npClCache-plugin'])!="undefined";
	}else if(pebankBrowserCompatible.isChrome()){
		pluginsFlag = 
		typeof(navigator.mimeTypes['application/x-icbc-plugin-chrome-npxxin-input'])!="undefined" &&
    	typeof(navigator.mimeTypes['application/x-icbc-plugin-chrome-npsubmit'])!="undefined" &&
    	typeof(navigator.mimeTypes['application/x-icbc-plugin-chrome-npclientbinding'])!="undefined" &&
    	typeof(navigator.mimeTypes['application/x-icbc-plugin-chrome-npfullscreen'])!="undefined" &&
    	typeof(navigator.mimeTypes['application/x-icbc-plugin-chrome-npclcache'])!="undefined";
	}
    if (pluginsFlag) {return true;}
    return false;
  }
//�ԱȰ汾��
function checkVersionIsOk() {
	navigator.plugins.refresh(false);
	var des;
	  try{
		  if(pebankBrowserCompatible.isFirefox()){
			  des = navigator.mimeTypes['application/x-icbcnpxxin-plugin-input'].enabledPlugin['description'].split("_");
		  }else if(pebankBrowserCompatible.isChrome()){
			  des = navigator.mimeTypes['application/x-icbc-plugin-chrome-npxxin-input'].enabledPlugin['description'].split("_");
		  }
	      if (typeof(des[3]) == "undefined" || cmpVersion(des[3], pluginInputVersion, ".") != 0){	//һ�º�ˢ��ҳ�棬���������µĲ��
	    	  return false;
	      }
	  }catch(exception){return false;}
	  try{
		  if(pebankBrowserCompatible.isFirefox()){
			  des = navigator.mimeTypes['application/x-icbc-plugin-submit'].enabledPlugin['description'].split("_");
		  }else if(pebankBrowserCompatible.isChrome()){
			  des = navigator.mimeTypes['application/x-icbc-plugin-chrome-npsubmit'].enabledPlugin['description'].split("_");
		  }
		  if (typeof(des[3]) == "undefined" || cmpVersion(des[3], pluginSubmitVersion, ".") != 0){	//һ�º�ˢ��ҳ�棬���������µĲ��
			  return false;
		  }
	  }catch(exception){return false;}
	  
	  try{
		  if(pebankBrowserCompatible.isFirefox()){
			  des = navigator.mimeTypes['application/x-icbc-ClientBinding'].enabledPlugin['description'].split("_");
		  }else if(pebankBrowserCompatible.isChrome()){
			  des = navigator.mimeTypes['application/x-icbc-plugin-chrome-npclientbinding'].enabledPlugin['description'].split("_");
		  }
		  if (typeof(des[3]) == "undefined" || cmpVersion(des[3], pluginClientBindingVersion, ".") != 0){	//һ�º�ˢ��ҳ�棬���������µĲ��
			  return false;
		  }
	  }catch(exception){
		  return false;
	  }

	  try{
		  if(pebankBrowserCompatible.isFirefox()){
			  des = navigator.mimeTypes['application/x-npFullScreen-plugin'].enabledPlugin['description'].split("_");
		  }else if(pebankBrowserCompatible.isChrome()){
			  des = navigator.mimeTypes['application/x-icbc-plugin-chrome-npfullscreen'].enabledPlugin['description'].split("_");
		  }
		  if (typeof(des[3]) == "undefined" || cmpVersion(des[3], pluginFullScreenVersion, ".") != 0){	//һ�º�ˢ��ҳ�棬���������µĲ��
			  return false;
		  }
	  }catch(exception){return false;}		
	  
	  try{
		  if(pebankBrowserCompatible.isFirefox()){
			  des = navigator.mimeTypes['application/x-npClCache-plugin'].enabledPlugin['description'].split("_");
		  }else if(pebankBrowserCompatible.isChrome()){
			  des = navigator.mimeTypes['application/x-icbc-plugin-chrome-npclcache'].enabledPlugin['description'].split("_");
		  }
		  if (typeof(des[3]) == "undefined" || cmpVersion(des[3], pluginCLCacheVersion, ".") != 0){	//һ�º�ˢ��ҳ�棬���������µĲ��
			  return false;
		  }
	  }catch(exception){return false;}     
	  
	return true;
  }