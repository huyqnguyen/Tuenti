/*
actionType 0��ѯ 1����
*/
function loginCustInfo(sessionId,actionType){
	var sendParam = {};
	sendParam["SessionId"]=sessionId;
	sendParam["actionType"]=actionType;
	sendParam["tranCode"]="A00404";
	EBDataStruct.sendAjax({
    						data: sendParam,
    						dataType: "json",
    						url: "AsynGetDataServlet",
    						failCallBack: function(result){  loginCustInfoError(result); },
    						successCallBack: function(kc){loginCustInfoSuccsed();},
    						isDisplay: false,
    						displayArea: "pselected"
    					});	
}

function loginCustInfoError(result){}

function loginCustInfoSuccsed(){
}
