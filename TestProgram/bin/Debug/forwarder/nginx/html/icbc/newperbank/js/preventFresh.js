
<!--
//½ûÖ¹ctrl+nºÍ ½ûÖ¹ctrl+rºÍ ½ûÖ¹shift+f10 ½ûÖ¹Êó±êÓÒ¼üor×óÓÒ¼ü ºÍ½ûÖ¹f5
var oLastBtn = 0,bIsMenu = false

if (window.Event)
		{
			try{//ie10ÒÔÉÏ£¬¿ØÖÆÌ¨»á±¨´í
			document.captureEvents(Event.MOUSEUP);
		}catch(eee){}
		}
 
function nocontextmenu(event) {
	try{
	 	pebankBrowserCompatible.eventStopPropagation(event);
	 	pebankBrowserCompatible.eventPreventDefault(event);
	 	return false;
	}catch(ex){} 	
}
 
function norightclick(event) {
	try{
	 	if (window.Event)
				{
					if (event.which != 1)
					{
						pebankBrowserCompatible.eventStopPropagation(event);
						pebankBrowserCompatible.eventPreventDefault(event);
						return false;
					}
				}
				else
				if (event.button != 1)
				{
					pebankBrowserCompatible.eventStopPropagation(event);
					pebankBrowserCompatible.eventPreventDefault(event);
					return false;
				}
  	}catch(ex){}
}
 
document.oncontextmenu = nocontextmenu;  // for IE5+
document.onmousedown = norightclick;  // for all others


function KeyDown(){	
		try{
	//ÆÁ±Î shift+F10
	if ((event.shiftKey)&&(pebankBrowserCompatible.getKeycode(event)==121)) pebankBrowserCompatible.eventPreventDefault(event);
	//ÆÁ±Î shift ¼ÓÊó±ê×ó¼üÐÂ¿ªÒ»ÍøÒ³
	if (pebankBrowserCompatible.getEventSrcElement(event).tagName == "A" && event.shiftKey) 
		pebankBrowserCompatible.eventPreventDefault(event); 	
	
	//ÆÁ±Î Alt+ ·½Ïò¼ü ¡û Alt+ ·½Ïò¼ü ¡úÆÁ±ÎÍË¸ñÉ¾³ý¼üÆÁ±Î F5 Ë¢ÐÂ¼üCtrl + R Ctrl+n

				if ((event.altKey) || ((pebankBrowserCompatible.getKeycode(event) == 8) && (pebankBrowserCompatible.getEventSrcElement(event).type != "application/x-npinput-plugin" && pebankBrowserCompatible.getEventSrcElement(event).type != "text" && pebankBrowserCompatible.getEventSrcElement(event).type != "textarea" && pebankBrowserCompatible.getEventSrcElement(event).type != "password")) || ((event.ctrlKey) && ((pebankBrowserCompatible.getKeycode(event) == 78) || (pebankBrowserCompatible.getKeycode(event) == 82))) || (pebankBrowserCompatible.getKeycode(event) == 116))
				{
					pebankBrowserCompatible.getKeycode(event) = 0;
					pebankBrowserCompatible.eventPreventDefault(event);
				}
			}catch(ex){}
}
function KeyDownforFirefox(event){	
	try{
//ÆÁ±Î shift+F10
if ((event.shiftKey)&&(event.keyCode==121)) pebankBrowserCompatible.eventPreventDefault(event);
//ÆÁ±Î shift ¼ÓÊó±ê×ó¼üÐÂ¿ªÒ»ÍøÒ³
/*
if ((pebankBrowserCompatible.getEventSrcElement(event).tagName == "BODY" || pebankBrowserCompatible.getEventSrcElement(event).tagName == "A")&& event.shiftKey) {
	try{console.error("here");}catch(e){}
	event.preventDefault();
	event.stopPropagation();
	return false;
}
*/
//ÆÁ±Î Alt+ ·½Ïò¼ü ¡û Alt+ ·½Ïò¼ü ¡úÆÁ±ÎÍË¸ñÉ¾³ý¼üÆÁ±Î F5 Ë¢ÐÂ¼üCtrl + R Ctrl+n

			if ((event.altKey) || ((event.ctrlKey) && ((event.keyCode == 78) || (event.keyCode == 82))) || (event.keyCode == 116))
			{
				event.keyCode = 0;
				pebankBrowserCompatible.eventPreventDefault(event);
			}
		}catch(ex){}
}
function MouseDownforFirefox(event){	
//ÆÁ±Î shift ¼ÓÊó±ê×ó¼üÐÂ¿ªÒ»ÍøÒ³
	var _tagname = pebankBrowserCompatible.getEventSrcElement(event).tagName;
if ((_tagname == "A" || _tagname == "FONT") && event.shiftKey) {
	event.preventDefault();
	event.stopPropagation();
	return false;
}}
if (navigator.userAgent.indexOf("Firefox")>-1 || navigator.userAgent.indexOf("Chrome/")>-1) {
		document.onkeypress=banbackspace;	
		document.onkeydown=KeyDownforFirefox;
		document.onclick=MouseDownforFirefox;		
}else{
	document.onkeydown=KeyDown;
}
function banbackspace(event){
	var ev = event||window.event;
	var obj = ev.target||ev.srcElement;
	var t = obj.type||obj.getAttribute('type');
	var vReadonly = obj.readOnly;
	var vDisabled = obj.disabled;
	vReadonly = (vReadonly == undefined)?false:vReadonly;
	vDisabled = (vDisabled == undefined)?false:vDisabled;
	var flag1 = ev.keyCode ==8 && (t=="application/x-npinput-plugin" && t=="text"&& t=="textarea"&& t=="password") && (vReadonly == true || vDisabled==true);
	var flag2 = ev.keyCode ==8 && (t!="application/x-npinput-plugin" && t!="text"&& t!="textarea"&& t!="password")
	if(flag2 || flag1){return false;}
}
function stopDefault(e){
	if(e && e.preventDefault)
	e.preventDefault();
	else
		window.event.returnValue=false;
		return false;
	}
//-->