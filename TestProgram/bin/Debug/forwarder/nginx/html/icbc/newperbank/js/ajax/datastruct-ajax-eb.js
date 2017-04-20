/********************************************/
/*******网银异步通信客户端公共程序1.0v*********/
/********************************************/
//解决jQuery与其它开源框架之间的冲突，使用$j替代默认的$
var $j = jQuery.noConflict();
//解决无法使用$的问题
var $ = jQuery;
//-----------------------------------定义DataStruct类-------------------------------------------//
/**
 * DataStruct电子银行渠道公共数据结构，对应Java中的DataStruct类。此类是一个父类，其中的很多实现方法都要依照子类的实现。
 * @param {Object} data	数据对象
 */
function DataStruct(data){
    if (data) {
        this.data = data;
    }
    else {
        this.data = {};
    }
}

//在此定义一些常量
DataStruct.prototype.DEFAULT_DATATYPE = "json"; //默认传输类型json
DataStruct.prototype.DEFAULT_ASYNC = true; //默认为异步方式
DataStruct.prototype.DEFAULT_REQUESTTYPE = "POST"; //以POST方式上送数据
DataStruct.prototype.DEFAULT_TIMEOUT = 80000; //默认超时时间80秒
/**
 * 按照format格式化数据，需要子类自身实现。
 * 空方法，需要子类进行具体的实现。
 * @param {Object} format	StructFormat对象
 * @return 格式化后的字符串
 */
DataStruct.prototype.formatData = function(format){
};
/**
 * 按照format对unfmtstr字符串进行unformat，需要子类自身实现
 * 空方法，需要子类进行具体的实现。
 * @param {Object} format	StructFormat对象
 * @param {Object} unfmtstr	需要解析的字符串
 */
DataStruct.prototype.umformat = function(format, unfmtstr){
};
/**
 * 向DataStruct中设置值，需要子类自身实现。
 * @param {Object} key		设置的key
 * @param {Object} value	设置的value
 */
DataStruct.prototype.setData = function(key, value){
};
/**
 * 从DataStruct中get值，需要子类自身实现
 * @param {Object} key	获取的key
 * @return Object 获取的对象
 */
DataStruct.prototype.getData = function(key){
};
/**
 * 得到内部引用的reference
 * @return Object 获取的对象
 */
DataStruct.prototype.getRefDataStruct = function(){
    return this.data;
};
/**
 * 设置内部引用的reference
 * @param {Object} mObj	设置的对象
 */
DataStruct.prototype.setRefDataStruct = function(mObj){
    this.data = data;
};
/**
 * 将服务器端返回的结果对象转换成内部引用的对象，视平台情况而定是否重载
 * @param {Object} result	由Ajax请求返回的对象
 * @return Object	转换后的对象
 */
DataStruct.prototype.convertToRef = function(dataType, result){
    return result;
};

/**
 * 发送Ajax请求的方法，传入的对象需要包含以下几种属性：
 * async：是否为异步请求，可选，默认是true
 * data：交易上送的数据，必输，是key-value的对象
 * dataType：返回结果的格式，xml传输/json传输，可选，默认是json
 * timeout：超时时间，可选，默认80秒
 * url：异步请求的URL地址，必输
 * successCallBack：应用成功回调函数，必输
 * failCallBack：应用Exception失败回调函数，在调用函数前，自动显示出现的异常，可选
 * isDisplay：是否显示报文转换错误，可选，默认是不显示
 * displayArea：应用Exception以及报文转换错误显示区域，可选，如果不输入则以alert方式提示
 *
 * @param {Object} param 请参见上述的解释。
 * @return XMLHttpRequest对象
 */
DataStruct.prototype.sendAjax = function(param){
    //默认以json方式进行传输
    if (!param.dataType) {
        param.dataType = DataStruct.prototype.DEFAULT_DATATYPE;
    }
    //默认超时时间为80秒
    if (!param.timeout) {
        param.timeout = DataStruct.prototype.DEFAULT_TIMEOUT;
    }
    //默认是异步发送数据
    if (param.async == null) {
        param.async = DataStruct.prototype.DEFAULT_ASYNC;
    }
    if (param.isDisplay == null) {
        param.isDisplay = false;
    }
 //网银渠道特殊处理
    if( param.url == "AsynGetDataServlet" ){
    	param.url="/servlet/AsynGetDataServlet";
    }
  				
    //判断上送参数是否为数组，如果是数组并且长度是0，将数组中的属性转换为对象
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
    
    //使用jQuery发送异步请求
    var xhr = $j.ajax({
        async: param.async, //同步/异步请求
        cache: false, //禁止浏览器的缓存
        data: sendParam, //异步请求上送的数据
        dataType: param.dataType, //返回的数据格式，
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",	//设置ContentType，重要是设置字符集
        error: function(xhr){ //返回XMLHttpRequest对象
            var msg = [];
            if (xhr.status != 200) { //Http请求失败回调函数（仅针对HttpCode不正确的情况）
                msg.push("send ajax http error!");
                msg.push("status code:" + xhr.status);
                msg.push("status text:" + xhr.statusText);
                
            }
            else { //解析数据失败
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
        success: function(result){ //XMLHttpRequest请求成功回调函数
            //在此先获取ErrorCode和ErrorMsg
            var errorCode = null;
            var errorMsg = null;
            if (param.dataType == "xml") { //以XML方式返回的DOM对象
                errorCode = result.getElementsByTagName("ERRORCODE");
                if (errorCode.length > 0) { //存在ErrorCode
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
            else { //以json方式返回的对象
                errorCode = result["ErrorCode"];
                errorMsg = result["ErrorMsg"];
            }
            if (errorCode != null && errorCode != "") { //判断结果中的ErrorCode是否为空
                //ErrorCode不为空，先进行alert异常信息，然后再调用传入的failCallBack
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
                if (param.failCallBack) { //交易失败回调
                    param.failCallBack(result);
                }
            }
            else { //成功则直接调用成功的信息
                if (param.successCallBack) {
                    param.successCallBack(result);
                }
            }
        },
        timeout: param.timeout, //超时时间
        type: DataStruct.prototype.DEFAULT_REQUESTTYPE, //请求类型
        url: param.url, //请求地址
        global: false
    });
    return xhr;
}
/**
 * 在此重复定义sendAjax为了保证可以像静态方法一样对此方法进行调用
 */
DataStruct.sendAjax = DataStruct.prototype.sendAjax;

//-----------------------------------定义StructFormat类-------------------------------------------//
/**
 * 格式化的抽象类，各个平台依照自身的DataStruct结构进行不同的格式化实现。
 */
function StructFormat(){
}

/**
 * 将对象格fmtObj式化为指定的字符串
 * @param {Object} fmtObj 传入的对象
 * @return 格式化后的字符串
 */
StructFormat.prototype.format = function(fmtObj){
}
/**
 * 将字符串unfmtObj转换为dataStruct结构
 * @param {Object} dataStruct	传入的DataStruct对象
 * @param {Object} unfmtObj		需要unformat的对象
 */
StructFormat.prototype.unformat = function(dataStruct, unfmtObj){
}
//定义一些常量
StructFormat.prototype.TAG_ROOT = "DataStruct";
StructFormat.prototype.TAG_RECORD = "RC";
//-----------------------------------定义XMLUtil解析类-------------------------------------------//
/**
 * 因浏览器对XML实现存在不同方式，在此工具类中屏蔽XML处理的不同
 */
function XMLUtil(){
}

/**在此定义使用微软XML控件的不同版本*/
XMLUtil.prototype.MSXMLVER = ['Msxml2.DOMDocument.6.0', 'Msxml2.DOMDocument.5.0', 'Msxml2.DOMDocument.4.0', 'Msxml2.DOMDocument.3.0', 'Msxml2.DOMDocument', 'Microsoft.XmlDom'];
/**
 * 创建新的XML对象，在此处屏蔽浏览器造成的差异。
 * 在IE浏览器中尽量获取高版本的MSXML
 * @param {Object} rootTagName	根节点的名称
 * @param {Object} namespaceURL	命名控件的URL
 * @return XML Document对象
 */
XMLUtil.newDocument = function(rootTagName, namespaceURL){
    if (!rootTagName) 
        rootTagName = "";
    if (!namespaceURL) 
        namespaceURL = "";
    
    if (document.implementation && document.implementation.createDocument) {
        // W3C标准的做法，FireFox的实现
        return document.implementation.createDocument(namespaceURL, rootTagName, null);
    }
    else {
        // 下面是IE的做法，只能使用ActiveX对象来完成
        var doc;
        // 尝试所有的MSXML版本的，尽量使用最新版本的MSXML
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
        // 如果定义了root tag，初始化XML DOM
        if (rootTagName) {
            // 查找 namespace 前缀
            var prefix = "";
            var tagname = rootTagName;
            var p = rootTagName.indexOf(':');
            if (p != -1) {
                prefix = rootTagName.substring(0, p);
                tagname = rootTagName.substring(p + 1);
            }
            
            // 如果有namespace，那么定义器前缀
            if (namespaceURL) {
                if (!prefix) 
                    prefix = "a0"; // Firefox使用
            }
            else 
                prefix = ""; //否则抛弃前缀
            // 创建root节点文本，然后使用XML DOM解析后成为Root对象
            var text = "<" + (prefix ? (prefix + ":") : "") + tagname +
            (namespaceURL ? (" xmlns:" + prefix + '="' + namespaceURL + '"') : "") +
            "/>";
            // 以root的文本创建XML DOM
            doc.loadXML(text);
        }
        return doc;
    }
};
/**
 * 将XML Document 或者 Element 转换为字符串
 * @param {Object} node	XML中的节点或整个XML
 * @return XML的字符串
 */
XMLUtil.serialize = function(node){
    if (typeof XMLSerializer != "undefined") // 判断XMLSerializer对象是否存在（W3C标准做法）
        return (new XMLSerializer()).serializeToString(node);
    else 
        if (node.xml) 
            return node.xml; // XMLSerializer对象不存在（IE的做法）
        else 
            throw "XML.serialize is not supported or can't serialize " + node;
};
/**
 * 将字符串解析为XML Document对象，并返回。
 * @param {Object} text	XML的字符串
 * @return XML Document对象
 */
XMLUtil.parse = function(text){
    if (typeof DOMParser != "undefined") { // Mozilla，FireFox等浏览器的做法
        return (new DOMParser()).parseFromString(text, "application/xml");
    }
    else 
        if (typeof ActiveXObject != "undefined") { // IE浏览器的实现
            var doc = XMLUtil.newDocument(); // 创建空的XML DOM
            doc.loadXML(text); // 解析字符串到
            return doc; // 返回
        }
        else {
            // 最后一步，如果上述解析方法都失败了，那么将XML作为URL地址，然后通过XMLHttpRequest对象加载后返回
            // 这种方法在Safari浏览器中会生效
            var url = "data:text/xml;charset=utf-8," + encodeURIComponent(text);
            var request = new XMLHttpRequest();
            request.open("GET", url, false);
            request.send(null);
            return request.responseXML;
        }
};
//-----------------------------------网银数据结构-------------------------------------------//
//var KeyedCollection = Class.create();
//KeyedCollection.prototype = {
//    initialize: function(obj){//支持三种数据类型的构造器
    function KeyedCollection(obj){  
	    if (typeof obj == "string") {//支持XML构造器
            this.data = parseXmlToJson(obj);
        }
        else 
            if (obj) {//支持JSON对象构造器
                this.data = obj;
            }
            else {
                this.data = {};//空对象构造器
            }
    };
    //getValueAt: function(key){//通过名字寻找相应的数值
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
    KeyedCollection.prototype.getEnumeration = function(){//获取该层KCOLL的key的集合，可以用与KCOLL的数据遍历
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
    KeyedCollection.prototype.parseXmlToJson = function(xmlString){//将返回的XML格式转换成JSON。
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
            if (child.hasChildNodes && child.firstChild.nodeType == 1) { //是结果集的方式
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
//-----------------------------------定义网银EBDataStruct类-------------------------------------------//
/**
 * 网银对DataStruct的具体实现
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
 * 此处如此赋值是为了能够像静态变量的方法调用sendAjax，对于成功结果调用convertToRef方法进行对象转换，转换为KeyedCollection返回。
 * @param {Object} param	参见DataStruct.sendAjax函数调用说明
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
 * 向EBDataStruct中设置值。
 * @param {Object} key		设置的key
 * @param {Object} value	设置的value
 */
EBDataStruct.prototype.setData = function(key, value){
    if (key == null || key == "" || value == null || value == "") {
        return;
    }
    this.data.addElement(key, value);
};
/**
 * 从EBDataStruct中get值。
 * @param {Object} key	传入的key
 * @return Object 得到的value
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
 * 将sendAjax中的返回的对象转换为KeyedCollection
 * @param {Object} result	由sendAjax返回的对象
 * @return KeyedCollection 转换后的结果
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
 * 按照format格式化数据。
 * @param {Object} format	StructFormat对象
 * @return String 格式化后的字符串
 */
EBDataStruct.prototype.formatData = function(format){
    return format.format(this.data)
};
/**
 * 按照format对unfmtstr字符串进行unformat，将其结果放入EBDataStruct对象中
 * @param {Object} format	StructFormat对象
 * @param {Object} unfmtstr	传入需要转换的字符串
 */
EBDataStruct.prototype.unformat = function(format, unfmtstr){
    format.unformat(this, unfmtstr)
};
//-----------------------------------定义EBXMLStructFormat类-------------------------------------------//
/**
 * 将EBDataStruct结构转换为XML报文
 */
function EBXMLStructFormat(){
    StructFormat.call();
    this.xmlDoc = XMLUtil.newDocument(StructFormat.prototype.TAG_ROOT, null);
}

EBXMLStructFormat.prototype = new StructFormat();
EBXMLStructFormat.prototype.constructor = EBXMLStructFormat;
/**
 * 将对象格fmtObj式化为指定的字符串。
 * @param {Object} fmtObj	KeyedCollection对象
 * @return 格式化后的XML字符串
 */
EBXMLStructFormat.prototype.format = function(fmtObj){
    var root = this.xmlDoc.documentElement;
    this.formatKColl(root, fmtObj.data);
    return XMLUtil.serialize(this.xmlDoc);
}
/**
 * 将KeyedCollection中的data转换为XML中Element对象。
 * @param {Object} element	父节点对象
 * @param {Object} kc	KeyedCollection中的data对象
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
 * 将IndexedCollection中转换为XML中Element对象。
 * @param {Object} element	父节点对象
 * @param {Object} ic	IndexedCollection对象
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
 * 将unfmtObject中的数据转换为对象放入dataStruct中。
 * @param {Object} dataStruct	EBDataStruct对象
 * @param {Object} unfmtObj	字符串或XML DOM对象
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
 * 将XML中根节点下的第一层节点转换
 * @param {Object} EBDataStruct	EBDataStruct结构
 * @param {Object} root	XML中根节点
 */
EBXMLStructFormat.prototype.unformatEBDataStruct = function(EBDataStruct, root){
    var childList = root.childNodes;
    for (var i = 0, j = childList.length; i < j; i++) {
        var child = childList.item(i);
        if (child.hasChildNodes && child.firstChild.nodeType == 1) { //是结果集的方式
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
 * 将XML中的节点element解析到KeyedCollection中。
 * @param {Object} kc	KeyedCollection对象
 * @param {Object} element	XML中的子节点
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
 * 将XML中的节点element解析到IndexedCollection中
 * @param {Object} ic	IndexedCollection对象
 * @param {Object} element	XML中的子节点
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
//-----------------------------------定义EBJSONStructFormat类-------------------------------------------//
/**
 * 将EBDataStruct结构转换为JSON报文。
 */
function EBJSONStructFormat(){
    StructFormat.call();
}

EBJSONStructFormat.prototype = new StructFormat();
EBJSONStructFormat.prototype.constructor = EBJSONStructFormat;
/**
 * 将对象格fmtObj式化为指定的字符串
 * @param {Object} fmtObj	KeyedCollectio对象
 * @param String 格式化后的字符串
 */
EBJSONStructFormat.prototype.format = function(fmtObj){
    var json = {};
    for (var o in fmtObj.data) {
        json[o] = fmtObj.data[o];
    }
    return JSON.stringify(json);
};
/**
 * 将字符串unfmtObj转换为dataStruct结构。
 * @param {Object} dataStruct	EBDataStruct结构
 * @param {Object} unfmtObj	字符串或对象
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
 * Form表单处理工具。
 */
function FormUtil(){
};
FormUtil.form2reqeust = function(formname){
   return $j(formname).serializeArray();
};
