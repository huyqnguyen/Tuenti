/********************************************/
/*******�����첽ͨ�ſͻ��˹�������1.0v*********/
/********************************************/
//���jQuery��������Դ���֮��ĳ�ͻ��ʹ��$j���Ĭ�ϵ�$
var $j = jQuery.noConflict();
//����޷�ʹ��$������
var $ = jQuery;
//-----------------------------------����DataStruct��-------------------------------------------//
/**
 * DataStruct�������������������ݽṹ����ӦJava�е�DataStruct�ࡣ������һ�����࣬���еĺܶ�ʵ�ַ�����Ҫ���������ʵ�֡�
 * @param {Object} data	���ݶ���
 */
function DataStruct(data){
    if (data) {
        this.data = data;
    }
    else {
        this.data = {};
    }
}

//�ڴ˶���һЩ����
DataStruct.prototype.DEFAULT_DATATYPE = "json"; //Ĭ�ϴ�������json
DataStruct.prototype.DEFAULT_ASYNC = true; //Ĭ��Ϊ�첽��ʽ
DataStruct.prototype.DEFAULT_REQUESTTYPE = "POST"; //��POST��ʽ��������
DataStruct.prototype.DEFAULT_TIMEOUT = 80000; //Ĭ�ϳ�ʱʱ��80��
/**
 * ����format��ʽ�����ݣ���Ҫ��������ʵ�֡�
 * �շ�������Ҫ������о����ʵ�֡�
 * @param {Object} format	StructFormat����
 * @return ��ʽ������ַ���
 */
DataStruct.prototype.formatData = function(format){
};
/**
 * ����format��unfmtstr�ַ�������unformat����Ҫ��������ʵ��
 * �շ�������Ҫ������о����ʵ�֡�
 * @param {Object} format	StructFormat����
 * @param {Object} unfmtstr	��Ҫ�������ַ���
 */
DataStruct.prototype.umformat = function(format, unfmtstr){
};
/**
 * ��DataStruct������ֵ����Ҫ��������ʵ�֡�
 * @param {Object} key		���õ�key
 * @param {Object} value	���õ�value
 */
DataStruct.prototype.setData = function(key, value){
};
/**
 * ��DataStruct��getֵ����Ҫ��������ʵ��
 * @param {Object} key	��ȡ��key
 * @return Object ��ȡ�Ķ���
 */
DataStruct.prototype.getData = function(key){
};
/**
 * �õ��ڲ����õ�reference
 * @return Object ��ȡ�Ķ���
 */
DataStruct.prototype.getRefDataStruct = function(){
    return this.data;
};
/**
 * �����ڲ����õ�reference
 * @param {Object} mObj	���õĶ���
 */
DataStruct.prototype.setRefDataStruct = function(mObj){
    this.data = data;
};
/**
 * ���������˷��صĽ������ת�����ڲ����õĶ�����ƽ̨��������Ƿ�����
 * @param {Object} result	��Ajax���󷵻صĶ���
 * @return Object	ת����Ķ���
 */
DataStruct.prototype.convertToRef = function(dataType, result){
    return result;
};

/**
 * ����Ajax����ķ���������Ķ�����Ҫ�������¼������ԣ�
 * async���Ƿ�Ϊ�첽���󣬿�ѡ��Ĭ����true
 * data���������͵����ݣ����䣬��key-value�Ķ���
 * dataType�����ؽ���ĸ�ʽ��xml����/json���䣬��ѡ��Ĭ����json
 * timeout����ʱʱ�䣬��ѡ��Ĭ��80��
 * url���첽�����URL��ַ������
 * successCallBack��Ӧ�óɹ��ص�����������
 * failCallBack��Ӧ��Exceptionʧ�ܻص��������ڵ��ú���ǰ���Զ���ʾ���ֵ��쳣����ѡ
 * isDisplay���Ƿ���ʾ����ת�����󣬿�ѡ��Ĭ���ǲ���ʾ
 * displayArea��Ӧ��Exception�Լ�����ת��������ʾ���򣬿�ѡ���������������alert��ʽ��ʾ
 *
 * @param {Object} param ��μ������Ľ��͡�
 * @return XMLHttpRequest����
 */
DataStruct.prototype.sendAjax = function(param){
    //Ĭ����json��ʽ���д���
    if (!param.dataType) {
        param.dataType = DataStruct.prototype.DEFAULT_DATATYPE;
    }
    //Ĭ�ϳ�ʱʱ��Ϊ80��
    if (!param.timeout) {
        param.timeout = DataStruct.prototype.DEFAULT_TIMEOUT;
    }
    //Ĭ�����첽��������
    if (param.async == null) {
        param.async = DataStruct.prototype.DEFAULT_ASYNC;
    }
    if (param.isDisplay == null) {
        param.isDisplay = false;
    }
 //�����������⴦��
    if( param.url == "AsynGetDataServlet" ){
    	param.url="/servlet/AsynGetDataServlet";
    }
  				
    //�ж����Ͳ����Ƿ�Ϊ���飬��������鲢�ҳ�����0���������е�����ת��Ϊ����
    var sendParam = {};
    if (param.data instanceof Array && param.data.length == 0) {
        for (var p in param.data) {
            if (!$j.isFunction(param.data[p])) {
                sendParam[p] = param.data[p];
            }
        }
    }
    else {
        sendParam = param.data;
    }
    
    //ʹ��jQuery�����첽����
    var xhr = $j.ajax({
        async: param.async, //ͬ��/�첽����
        cache: false, //��ֹ������Ļ���
        data: sendParam, //�첽�������͵�����
        dataType: param.dataType, //���ص����ݸ�ʽ��
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",	//����ContentType����Ҫ�������ַ���
        error: function(xhr){ //����XMLHttpRequest����
            var msg = [];
            if (xhr.status != 200) { //Http����ʧ�ܻص������������HttpCode����ȷ�������
                msg.push("send ajax http error!");
                msg.push("status code:" + xhr.status);
                msg.push("status text:" + xhr.statusText);
                
            }
            else { //��������ʧ��
                msg.push("parse ajax response error!");
                msg.push("responseText=" + xhr.responseText);
            }
            
            if (param.displayArea && param.isDisplay) {
                $j("#" + param.displayArea).html(msg.join("<br/>"));
            }
            else 
                if (param.isDisplay) {
                    console.error(msg.join("\n"));
                }
                else 
                    if (param.displayArea) {
                        $j("#" + param.displayArea).html(msg[0]);
                    }
                    else {
                        console.error(msg[0]);
                    }
            return xhr;
        },
        success: function(result){ //XMLHttpRequest����ɹ��ص�����
            //�ڴ��Ȼ�ȡErrorCode��ErrorMsg
            var errorCode = null;
            var errorMsg = null;
            if (param.dataType == "xml") { //��XML��ʽ���ص�DOM����
                errorCode = result.getElementsByTagName("ERRORCODE");
                if (errorCode.length > 0) { //����ErrorCode
                    errorCode = errorCode.item(0).firstChild.nodeValue;
                    errorMsg = result.getElementsByTagName("ERRORMSG");
                    if (errorMsg.length > 0) {
                        errorMsg = errorMsg.item(0).firstChild.nodeValue;
                    }
                    else {
                        errorMsg = null;
                    }
                }
                else {
                    errorCode = null;
                }
            }
            else { //��json��ʽ���صĶ���
                errorCode = result["ErrorCode"];
                errorMsg = result["ErrorMsg"];
            }
            if (errorCode != null && errorCode != "") { //�жϽ���е�ErrorCode�Ƿ�Ϊ��
                //ErrorCode��Ϊ�գ��Ƚ���alert�쳣��Ϣ��Ȼ���ٵ��ô����failCallBack
                var msg = [];
                msg.push("AppServer Transaction Exception!");
                msg.push("ErrorCode:" + errorCode);
                msg.push("ErrorMsg:" + errorMsg);
                if (param.displayArea) {
                    $j("#" + param.displayArea).html(msg.join("<br/>"));
                }
                else {
                    console.error(msg.join("\n"));
                }
                if (param.failCallBack) { //����ʧ�ܻص�
                    param.failCallBack(result);
                }
            }
            else { //�ɹ���ֱ�ӵ��óɹ�����Ϣ
                if (param.successCallBack) {
                    param.successCallBack(result);
                }
            }
        },
        timeout: param.timeout, //��ʱʱ��
        type: DataStruct.prototype.DEFAULT_REQUESTTYPE, //��������
        url: param.url, //�����ַ
        global: false
    });
    return xhr;
}
/**
 * �ڴ��ظ�����sendAjaxΪ�˱�֤������̬����һ���Դ˷������е���
 */
DataStruct.sendAjax = DataStruct.prototype.sendAjax;

//-----------------------------------����StructFormat��-------------------------------------------//
/**
 * ��ʽ���ĳ����࣬����ƽ̨���������DataStruct�ṹ���в�ͬ�ĸ�ʽ��ʵ�֡�
 */
function StructFormat(){
}

/**
 * �������fmtObjʽ��Ϊָ�����ַ���
 * @param {Object} fmtObj ����Ķ���
 * @return ��ʽ������ַ���
 */
StructFormat.prototype.format = function(fmtObj){
}
/**
 * ���ַ���unfmtObjת��ΪdataStruct�ṹ
 * @param {Object} dataStruct	�����DataStruct����
 * @param {Object} unfmtObj		��Ҫunformat�Ķ���
 */
StructFormat.prototype.unformat = function(dataStruct, unfmtObj){
}
//����һЩ����
StructFormat.prototype.TAG_ROOT = "DataStruct";
StructFormat.prototype.TAG_RECORD = "RC";
//-----------------------------------����XMLUtil������-------------------------------------------//
/**
 * ���������XMLʵ�ִ��ڲ�ͬ��ʽ���ڴ˹�����������XML����Ĳ�ͬ
 */
function XMLUtil(){
}

/**�ڴ˶���ʹ��΢��XML�ؼ��Ĳ�ͬ�汾*/
XMLUtil.prototype.MSXMLVER = ['Msxml2.DOMDocument.6.0', 'Msxml2.DOMDocument.5.0', 'Msxml2.DOMDocument.4.0', 'Msxml2.DOMDocument.3.0', 'Msxml2.DOMDocument', 'Microsoft.XmlDom'];
/**
 * �����µ�XML�����ڴ˴������������ɵĲ��졣
 * ��IE������о�����ȡ�߰汾��MSXML
 * @param {Object} rootTagName	���ڵ������
 * @param {Object} namespaceURL	�����ؼ���URL
 * @return XML Document����
 */
XMLUtil.newDocument = function(rootTagName, namespaceURL){
    if (!rootTagName) 
        rootTagName = "";
    if (!namespaceURL) 
        namespaceURL = "";
    
    if (document.implementation && document.implementation.createDocument) {
        // W3C��׼��������FireFox��ʵ��
        return document.implementation.createDocument(namespaceURL, rootTagName, null);
    }
    else {
        // ������IE��������ֻ��ʹ��ActiveX���������
        var doc;
        // �������е�MSXML�汾�ģ�����ʹ�����°汾��MSXML
        $j.each(XMLUtil.prototype.MSXMLVER, function(i, n){
            try {
                doc = new ActiveXObject(n);
                return false;
            } 
            catch (e) {
            }
        });
        if (doc == null) {
            throw Error("Your Internet Explorer do not support MSXML!");
        }
        // ���������root tag����ʼ��XML DOM
        if (rootTagName) {
            // ���� namespace ǰ׺
            var prefix = "";
            var tagname = rootTagName;
            var p = rootTagName.indexOf(':');
            if (p != -1) {
                prefix = rootTagName.substring(0, p);
                tagname = rootTagName.substring(p + 1);
            }
            
            // �����namespace����ô������ǰ׺
            if (namespaceURL) {
                if (!prefix) 
                    prefix = "a0"; // Firefoxʹ��
            }
            else 
                prefix = ""; //��������ǰ׺
            // ����root�ڵ��ı���Ȼ��ʹ��XML DOM�������ΪRoot����
            var text = "<" + (prefix ? (prefix + ":") : "") + tagname +
            (namespaceURL ? (" xmlns:" + prefix + '="' + namespaceURL + '"') : "") +
            "/>";
            // ��root���ı�����XML DOM
            doc.loadXML(text);
        }
        return doc;
    }
};
/**
 * ��XML Document ���� Element ת��Ϊ�ַ���
 * @param {Object} node	XML�еĽڵ������XML
 * @return XML���ַ���
 */
XMLUtil.serialize = function(node){
    if (typeof XMLSerializer != "undefined") // �ж�XMLSerializer�����Ƿ���ڣ�W3C��׼������
        return (new XMLSerializer()).serializeToString(node);
    else 
        if (node.xml) 
            return node.xml; // XMLSerializer���󲻴��ڣ�IE��������
        else 
            throw "XML.serialize is not supported or can't serialize " + node;
};
/**
 * ���ַ�������ΪXML Document���󣬲����ء�
 * @param {Object} text	XML���ַ���
 * @return XML Document����
 */
XMLUtil.parse = function(text){
    if (typeof DOMParser != "undefined") { // Mozilla��FireFox�������������
        return (new DOMParser()).parseFromString(text, "application/xml");
    }
    else 
        if (typeof ActiveXObject != "undefined") { // IE�������ʵ��
            var doc = XMLUtil.newDocument(); // �����յ�XML DOM
            doc.loadXML(text); // �����ַ�����
            return doc; // ����
        }
        else {
            // ���һ���������������������ʧ���ˣ���ô��XML��ΪURL��ַ��Ȼ��ͨ��XMLHttpRequest������غ󷵻�
            // ���ַ�����Safari������л���Ч
            var url = "data:text/xml;charset=utf-8," + encodeURIComponent(text);
            var request = new XMLHttpRequest();
            request.open("GET", url, false);
            request.send(null);
            return request.responseXML;
        }
};
//-----------------------------------�������ݽṹ-------------------------------------------//
//var KeyedCollection = Class.create();
//KeyedCollection.prototype = {
//    initialize: function(obj){//֧�������������͵Ĺ�����
    function KeyedCollection(obj){  
	    if (typeof obj == "string") {//֧��XML������
            this.data = parseXmlToJson(obj);
        }
        else 
            if (obj) {//֧��JSON��������
                this.data = obj;
            }
            else {
                this.data = {};//�ն�������
            }
    };
    //getValueAt: function(key){//ͨ������Ѱ����Ӧ����ֵ
	KeyedCollection.prototype.getValueAt = function(key){
		var listArray = key.split(".");
		var ret = this.data;
		for(var i=0,j=listArray.length;i<j;i++){
	        ret = ret[listArray[i]];
			if (ret == undefined) {
	            ret = "";
	        }
		}
		if(typeof ret == "object"){
				ret = new KeyedCollection(ret);
		}
		return ret;
    };
    KeyedCollection.prototype.setValueAt = function(key, value){
        if (key != null && key != "" && value != null && value != "") {
            this.data[key] = value;
        }
    };
    KeyedCollection.prototype.addElement = function(key, value){
        if (key != null && key != "" && value != null && value != "") {
            this.data[key] = value;
        }
    };
    KeyedCollection.prototype.getEnumeration = function(){//��ȡ�ò�KCOLL��key�ļ��ϣ���������KCOLL�����ݱ���
        var i = 0;
        var ret = {};
        for (o in this.data) {
            ret[i] = o;
            i++;
        }
        return ret;
    };
    KeyedCollection.prototype.getIndexedCollection = function(key){
        var ret = this.data[key];
        if (ret == undefined) {
            ret = new Array();
        }
        return new IndexedCollection(ret);
    };
    KeyedCollection.prototype.parseXmlToJson = function(xmlString){//�����ص�XML��ʽת����JSON��
        var xmlDoc;
        if (typeof xmlString == "string") {
            xmlDoc = XMLUtil.parse(xmlString);
        }
        else {
            xmlDoc = xmlString;
        }
        var root = xmlDoc.documentElement;
        var json = {};
        this.parseSingle(root, json);
        return json;
    };
    KeyedCollection.prototype.parseSingle = function(element, jsonObject){
        var childList = element.childNodes;
        for (var i = 0, j = childList.length; i < j; i++) {
            var child = childList.item(i);
            if (child.hasChildNodes && child.firstChild.nodeType == 1) { //�ǽ�����ķ�ʽ
                var record = [];
                this.parseMulti(child, record);
                jsonObject[child.nodeName] = record;
            }
            else {
                var key = child.nodeName;
                var value = child.firstChild.nodeValue;
                jsonObject[key] = value;
            }
        }
    };
    
    KeyedCollection.prototype.parseMulti = function(element, record){
        var childList = element.childNodes;
        for (var i = 0, j = childList.length; i < j; i++) {
            var child = childList.item(i);
            var single = {};
            this.parseSingle(child, single);
            record.push(single);
        }
    };
    KeyedCollection.prototype.toString = function(){
        return JSON.stringify(this.data);
    };
//}

//var IndexedCollection = Class.create();
//IndexedCollection.prototype = {
//    initialize: function(listData){
    function IndexedCollection(listData){  
        if (listData) {
            this.listData = listData;
        }
        else {
            this.listData = [];
        }
    };
    IndexedCollection.prototype.size = function(){
        return this.listData.length;
    };
    IndexedCollection.prototype.getElementAt = function(index){
        return new KeyedCollection(this.listData[index]);
    };
    IndexedCollection.prototype.addElement = function(kc){
        this.listData.push(kc.data);
    };
    IndexedCollection.prototype.toString = function(){
        return JSON.stringify(this.listData);
    };
//}
//-----------------------------------��������EBDataStruct��-------------------------------------------//
/**
 * ������DataStruct�ľ���ʵ��
 * @param {Object} kc KeyedCollection
 */
function EBDataStruct(kc){
    DataStruct.call(kc);
    if (kc) {
        this.data = kc;
    }
    else {
        this.data = new KeyedCollection();
    }
}

EBDataStruct.prototype = new DataStruct();
EBDataStruct.prototype.constructor = EBDataStruct;
/**
 * �˴���˸�ֵ��Ϊ���ܹ���̬�����ķ�������sendAjax�����ڳɹ��������convertToRef�������ж���ת����ת��ΪKeyedCollection���ء�
 * @param {Object} param	�μ�DataStruct.sendAjax��������˵��
 */
EBDataStruct.sendAjax = function(param){
    if (param.successCallBack) {
        var tmpCallBack = param.successCallBack;
        param.successCallBack = function(result){
            result = EBDataStruct.prototype.convertToRef(param.dataType, result);
            tmpCallBack(result);
        }
    }
    DataStruct.prototype.sendAjax(param);
}
/**
 * ��EBDataStruct������ֵ��
 * @param {Object} key		���õ�key
 * @param {Object} value	���õ�value
 */
EBDataStruct.prototype.setData = function(key, value){
    if (key == null || key == "" || value == null || value == "") {
        return;
    }
    this.data.addElement(key, value);
};
/**
 * ��EBDataStruct��getֵ��
 * @param {Object} key	�����key
 * @return Object �õ���value
 */
EBDataStruct.prototype.getData = function(key){
    if (key == null || key == "") {
        return "";
    }
    else {
        return this.data.getValueAt(key);
    }
};
/**
 * ��sendAjax�еķ��صĶ���ת��ΪKeyedCollection
 * @param {Object} result	��sendAjax���صĶ���
 * @return KeyedCollection ת����Ľ��
 */
EBDataStruct.prototype.convertToRef = function(dataType, result){
    var eb = new EBDataStruct();
    if (dataType == "json") {
        eb.unformat(new EBJSONStructFormat(), result);
    }
    else {
        eb.unformat(new EBXMLStructFormat(), result);
    }
    return eb.data;
};
/**
 * ����format��ʽ�����ݡ�
 * @param {Object} format	StructFormat����
 * @return String ��ʽ������ַ���
 */
EBDataStruct.prototype.formatData = function(format){
    return format.format(this.data)
};
/**
 * ����format��unfmtstr�ַ�������unformat������������EBDataStruct������
 * @param {Object} format	StructFormat����
 * @param {Object} unfmtstr	������Ҫת�����ַ���
 */
EBDataStruct.prototype.unformat = function(format, unfmtstr){
    format.unformat(this, unfmtstr)
};
//-----------------------------------����EBXMLStructFormat��-------------------------------------------//
/**
 * ��EBDataStruct�ṹת��ΪXML����
 */
function EBXMLStructFormat(){
    StructFormat.call();
    this.xmlDoc = XMLUtil.newDocument(StructFormat.prototype.TAG_ROOT, null);
}

EBXMLStructFormat.prototype = new StructFormat();
EBXMLStructFormat.prototype.constructor = EBXMLStructFormat;
/**
 * �������fmtObjʽ��Ϊָ�����ַ�����
 * @param {Object} fmtObj	KeyedCollection����
 * @return ��ʽ�����XML�ַ���
 */
EBXMLStructFormat.prototype.format = function(fmtObj){
    var root = this.xmlDoc.documentElement;
    this.formatKColl(root, fmtObj.data);
    return XMLUtil.serialize(this.xmlDoc);
}
/**
 * ��KeyedCollection�е�dataת��ΪXML��Element����
 * @param {Object} element	���ڵ����
 * @param {Object} kc	KeyedCollection�е�data����
 */
EBXMLStructFormat.prototype.formatKColl = function(element, kc){
    for (o in kc) {
        if (kc[o] instanceof IndexedCollection) {
            var vlElement = this.xmlDoc.createElement(o.toString());
            this.formatIColl(vlElement, kc[o]);
            element.appendChild(vlElement);
        }
        else 
            if (typeof kc[o] != "function") {
                var keyElement = this.xmlDoc.createElement(o.toString());
                var valueElement = this.xmlDoc.createTextNode(kc[o].toString());
                keyElement.appendChild(valueElement);
                element.appendChild(keyElement);
            }
    }
}
/**
 * ��IndexedCollection��ת��ΪXML��Element����
 * @param {Object} element	���ڵ����
 * @param {Object} ic	IndexedCollection����
 */
EBXMLStructFormat.prototype.formatIColl = function(element, ic){
    for (var i = 0, j = ic.size(); i < j; i++) {
        var kc = ic.getElementAt(i);
        var record = this.xmlDoc.createElement(this.TAG_RECORD);
        this.formatKColl(record, kc.data);
        element.appendChild(record);
    }
}
/**
 * ��unfmtObject�е�����ת��Ϊ�������dataStruct�С�
 * @param {Object} dataStruct	EBDataStruct����
 * @param {Object} unfmtObj	�ַ�����XML DOM����
 */
EBXMLStructFormat.prototype.unformat = function(dataStruct, unfmtObj){
    if (typeof unfmtObj == "string") {
        this.xmlDoc = XMLUtil.parse(unfmtObj);
    }
    else {
        this.xmlDoc = unfmtObj;
    }
    var root = this.xmlDoc.documentElement;
    this.unformatEBDataStruct(dataStruct, root);
}
/**
 * ��XML�и��ڵ��µĵ�һ��ڵ�ת��
 * @param {Object} EBDataStruct	EBDataStruct�ṹ
 * @param {Object} root	XML�и��ڵ�
 */
EBXMLStructFormat.prototype.unformatEBDataStruct = function(EBDataStruct, root){
    var childList = root.childNodes;
    for (var i = 0, j = childList.length; i < j; i++) {
        var child = childList.item(i);
        if (child.hasChildNodes && child.firstChild.nodeType == 1) { //�ǽ�����ķ�ʽ
            var ic = new IndexedCollection();
            this.unformatIColl(ic, child);
            EBDataStruct.setData(child.nodeName, ic.listData);
        }
        else {
            var key = child.nodeName;
            var value = child.firstChild.nodeValue;
            EBDataStruct.setData(key, value);
        }
    }
}
/**
 * ��XML�еĽڵ�element������KeyedCollection�С�
 * @param {Object} kc	KeyedCollection����
 * @param {Object} element	XML�е��ӽڵ�
 */
EBXMLStructFormat.prototype.unformatKColl = function(kc, element){
    var childList = element.childNodes;
    for (var i = 0, j = childList.length; i < j; i++) {
        var child = childList.item(i);
        if (child.hasChildNodes && child.firstChild.nodeType == 1) {
            var ic = new IndexedCollection();
            this.unformatIColl(ic, child);
            kc.addElement(child.nodeName, ic.listData);
        }
        else {
            kc.addElement(child.nodeName, child.firstChild.nodeValue);
        }
    }
}
/**
 * ��XML�еĽڵ�element������IndexedCollection��
 * @param {Object} ic	IndexedCollection����
 * @param {Object} element	XML�е��ӽڵ�
 */
EBXMLStructFormat.prototype.unformatIColl = function(ic, element){
    var childList = element.childNodes;
    for (var i = 0, j = childList.length; i < j; i++) {
        var child = childList.item(i);
        var kc = new KeyedCollection();
        this.unformatKColl(kc, child);
        ic.addElement(kc);
    }
}
//-----------------------------------����EBJSONStructFormat��-------------------------------------------//
/**
 * ��EBDataStruct�ṹת��ΪJSON���ġ�
 */
function EBJSONStructFormat(){
    StructFormat.call();
}

EBJSONStructFormat.prototype = new StructFormat();
EBJSONStructFormat.prototype.constructor = EBJSONStructFormat;
/**
 * �������fmtObjʽ��Ϊָ�����ַ���
 * @param {Object} fmtObj	KeyedCollectio����
 * @param String ��ʽ������ַ���
 */
EBJSONStructFormat.prototype.format = function(fmtObj){
    var json = {};
    for (var o in fmtObj.data) {
        json[o] = fmtObj.data[o];
    }
    return JSON.stringify(json);
};
/**
 * ���ַ���unfmtObjת��ΪdataStruct�ṹ��
 * @param {Object} dataStruct	EBDataStruct�ṹ
 * @param {Object} unfmtObj	�ַ��������
 */
EBJSONStructFormat.prototype.unformat = function(dataStruct, unfmtObj){
    var json = {};
    if (typeof unfmtObj == "string") {
        json = JSON.parse(unfmtObj);
    }
    else {
        json = unfmtObj;
    }
    for (o in json) {
        dataStruct.setData(o, json[o]);
    }
};
/**
 * Form�������ߡ�
 */
function FormUtil(){
};
FormUtil.form2reqeust = function(formname){
   return $j(formname).serializeArray();
};
