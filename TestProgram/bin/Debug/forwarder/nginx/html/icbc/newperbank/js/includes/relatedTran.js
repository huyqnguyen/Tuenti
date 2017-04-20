(function(){
	var _icommadList = [];
	var _show_num = 5;
	var _qeuryOver = "0";
	function _ajax_icommandList(sessionId,nowDate,isFilterMenuId){
		var isFilterMenuId_1 = isFilterMenuId||"1";
		var sendParam = {};
		sendParam["SessionId"] = sessionId;
		sendParam["isAJAX"] = "1";
		sendParam["isFilterMenuId"] = isFilterMenuId_1;		
		sendParam["tranCode"] = "A00324";
	
		EBDataStruct.sendAjax( {
			data :sendParam,
			dataType :"json",
			url :"AsynGetDataServlet",
			failCallBack : function() {		
				_qeuryOver = "1";
				showIcon(_icommadList);
			},
			successCallBack : function(kc) {
				deal(kc,sessionId,nowDate,isFilterMenuId_1);
			},
			isDisplay :false,
			displayArea :"pselected"
		});		
		
	}
	function deal(KColl,sessionId,nowDate,isFilterMenuId){

		var TranErrorCode = KColl.getValueAt("TranErrorCode");
		var TranErrorDisplayMsg = KColl.getValueAt("TranErrorDisplayMsg");		
		var ik = KColl.getIndexedCollection("rd");	
		var rownum = ik.size();
		if (TranErrorCode == "0") {
			for(var i=0; i<rownum;i++){

			var koll = ik.getElementAt(i);
	  		var showFlag = koll.getValueAt("showFlag")==null?"":koll.getValueAt("showFlag");
	  		
	  		if(showFlag == "0" && isFilterMenuId =="1"){
	  			continue;
	  		}
	  		
 			var proSubItemname = koll.getValueAt("proSubItemname");    
  			var id = koll.getValueAt("id")==null?"":formatStr(koll.getValueAt("id"));
  			var para = koll.getValueAt("para")==null?"":formatStr(koll.getValueAt("para"));
  var datadate = koll.getValueAt("datadate")==null?"":koll.getValueAt("datadate");
   var proCode1=koll.getValueAt("proCode1")==null?"":koll.getValueAt("proCode1");  
   var proName1=koll.getValueAt("proName1")==null?"":formatStr(koll.getValueAt("proName1"));   
   var prosource1=koll.getValueAt("prosource1")==null?"":formatStr(koll.getValueAt("prosource1"));   
   
  var campeventid1 = koll.getValueAt("campeventid1")==null?"":koll.getValueAt("campeventid1");
  var campeventnm1 = koll.getValueAt("campeventnm1")==null?"":koll.getValueAt("campeventnm1");
  var campeventid2 = koll.getValueAt("campeventid2")==null?"":koll.getValueAt("campeventid2");
  var campeventnm2 = koll.getValueAt("campeventnm2")==null?"":koll.getValueAt("campeventnm2");
  var campeventid3 = koll.getValueAt("campeventid3")==null?"":koll.getValueAt("campeventid3");
  var campeventnm3 = koll.getValueAt("campeventnm3")==null?"":koll.getValueAt("campeventnm3");
  var campeventid4 = koll.getValueAt("campeventid4")==null?"":koll.getValueAt("campeventid4");
  var campeventnm4 = koll.getValueAt("campeventnm4")==null?"":koll.getValueAt("campeventnm4");
  var campeventid5 = koll.getValueAt("campeventid5")==null?"":koll.getValueAt("campeventid5");
  var campeventnm5 = koll.getValueAt("campeventnm5")==null?"":koll.getValueAt("campeventnm5");		
  var url = "";	  			  			
  			//取menuid
  			if(id.indexOf("&")>-1){
  				id = id.substr(0,id.indexOf("&"));
  			}
  			//判断id为空则转到报错页面
  			if(""!=id){
  				url = "javascript:command_goto('";

  			}else{
  				url = "javascript:command_goError('";  			
  			}
  			url = url + para + "','" +
 						campeventid1 + "','" + 		
 						campeventid2 + "','" + 	 								
 						campeventid3 + "','" + 		
 						campeventid4 + "','" + 
 						campeventid5 + "','" + 		
 						proCode1 + "','" +  						
 						datadate + "','" +  
 						sessionId + "','" + 
 						nowDate + "','" +  						
 					  "');";
			var iCommandCell={}; 			
			iCommandCell['proName'] = proName1==""?"查询推荐产品":proName1;
			iCommandCell['id']=  id==""?"3215":id;
			iCommandCell['url']=  url;					
			iCommandCell['prosource1']=  prosource1;					
			_icommadList.push(iCommandCell);
			}
		}	
		_qeuryOver = "1";
		showIcon(_icommadList);
	}
	function _getIcommadList(){
		return _icommadList;		
	}	
	function _getShownum(){
		return _show_num;		
	}
	function _getQeuryOver(){
		return _qeuryOver;		
	}
	function _setQeuryOver(flag){
		_qeuryOver = flag;		
	}		
	function formatStr(s){
		return decodeURIComponent(s);
	}
	window.relatedTran = {
			_ajax_icommandList:_ajax_icommandList,
			_getIcommadList:_getIcommadList,
			_getShownum:_getShownum,
			_getQeuryOver:_getQeuryOver,			
			_setQeuryOver:_setQeuryOver	
	};
})();