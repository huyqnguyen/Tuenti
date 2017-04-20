var onlineServiceCheck = {};
onlineServiceCheck.ajax = function(sessionid,showtime,form,autoFlag_para){
    var sendParam = {};
    sendParam["SessionId"]=sessionid;
    sendParam["tranCode"]="A00431";//per_AjaxServiceCheckOp.xml
    EBDataStruct.sendAjax({
    						data: sendParam,
    						dataType: "json",
    						url: "AsynGetDataServlet",
    						failCallBack: function(result){ onlineServiceCheck.ajax_error(result,form); },
    						successCallBack: function(kc1){
    							onlineServiceCheck.ajax_ok(kc1,showtime,form,autoFlag_para);
                        	},
    						isDisplay: false,
    						displayArea: "pselected"
    					});
			
}
onlineServiceCheck.ajax_error = function(result,form){
	
	var modiForm=eval("document." + form);
	modiForm.submit();
}
onlineServiceCheck.ajax_ok = function(kcoll,showtime_para,form,autoFlag_para){
	
	var TranErrorCode = kcoll.getValueAt("TranErrorCode");
	var newEventFlag = kcoll.getValueAt("newEventFlag");
	var showtime=showtime_para;	
	var salesFlag = 0;
	var rd_size = 0;
	var modiForm=eval("document." + form);
	var autoFlag = autoFlag_para == null ? false : autoFlag_para;
	if(TranErrorCode=="0"){
		//var onlineServiceFlag = kcoll.getValueAt("onlineServiceFlag");
		var rd = kcoll.getIndexedCollection("rd");
		rd_size = rd.size();
		if(rd.size() > 0){
			salesFlag = 1;
		}
	}
	if(rd_size > 0 && (newEventFlag == "1" || showtime)){
		//调用接口显示在线客服
		modiForm.queryprocflag.value = "1";
		modiForm.salesFlag.value=salesFlag;
		modiForm.submit();
		//提交完毕后重置在线客服参数，否则其他入口的提交也会查询营销活动了
		modiForm.queryprocflag.value = "0";		
		modiForm.salesFlag.value="0";
	}else{
		if(!autoFlag){
			
			modiForm.submit();
		}
	}
}