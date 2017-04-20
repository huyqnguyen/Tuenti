var cardBinList = new CardBinList();
function CardBin(cardBin,cardType,cardAreaRule,cardLen,func,currlist)
{
   this.cardBin=cardBin;
   this.cardType=cardType;
   this.cardAreaRule=cardAreaRule;
   this.cardLen = cardLen;
   this.func = func;
   this.currlist = currlist;
}

function CardBin(cardBin,cardType,cardAreaRule,cardLen,func,currlist,EMVCard)
{
   this.cardBin=cardBin;
   this.cardType=cardType;
   this.cardAreaRule=cardAreaRule;
   this.cardLen = cardLen;
   this.func = func;
   this.currlist = currlist;
   this.EMVCard = EMVCard;
}

function CardBinList() 
{
	this.list=new Array();  
	this.add=cardBinList_add;
	this.getCardBin=cardBinList_getCardBin;
	this.getCardBinNoValid=cardBinList_getCardBinNoValid;
	this.getCardType=cardBinList_getCardType;
	this.Acct19Check=Acct19Check;
	this.getCardAreaRule=cardBinList_getCardAreaRule;
	this.getCardArea=cardBinList_getCardArea;
	this.InUseNow=cardBinList_InUseNow;
	this.SupportCardBin=cardBinList_SupportCardBin;
	this.getCurrList=cardBinList_getCurrList;
	this.getEMVCard=cardBinList_getEMVCard;
	this.isHSYHCardOrAcc=cardBinList_isHSYHCardOrAcc;
}

function cardBinList_add(cardBinInfo){
 	this.list[this.list.length] = cardBinInfo;
}

function cardBinList_getCardType(cardNum){
   var cardType = "N";
   var len = 5;
   var cardBinTmp;
   if(isValidCard1(cardNum)){
    for(var i=0;i<this.list.length;i++){
   	    cardBinTmp = this.list[i].cardBin;
   	    len = cardBinTmp.length;
   	    if(cardNum>=len && cardNum.substring(0,len)==cardBinTmp && cardNum.length == this.list[i].cardLen) {
   	    	return this.list[i].cardType;
   	    }
    	}   
   	if(cardNum.length==16)	
   	   return "003";
   }	
   return cardType;	
}

function cardBinList_getCardBin(cardNum){
   var cardBin = "N";
   var len = 5;
   var cardBinTmp;
   if(isValidCard1(cardNum)){
    for(var i=0;i<this.list.length;i++){
   	    cardBinTmp = this.list[i].cardBin;
   	    len = cardBinTmp.length;
   	    if(cardNum>=len && cardNum.substring(0,len)==cardBinTmp && cardNum.length == this.list[i].cardLen) {
   	    	return this.list[i].cardBin;
   	    }
    	}
   }   
   return cardBin;	
}

function cardBinList_getCardBinNoValid(cardNum){
	var cardBin = "N";
	var len = 5;
	var cardBinTmp;
	for(var i=0;i<this.list.length;i++){
		cardBinTmp = this.list[i].cardBin;
   	    len = cardBinTmp.length;
   	    if(cardNum>=len && cardNum.substring(0,len)==cardBinTmp && cardNum.length == this.list[i].cardLen) {
   	    	return this.list[i].cardBin;
   	    }
	}
	return cardBin;	
}


function cardBinList_getCardAreaRule(cardNum){ 
/*   var cardRule = "";
   var len = 5;
   var cardBinTmp;
   if(isValidCard1(cardNum)){
        for(var i=0;i<this.list.length;i++){
   	    cardBinTmp = this.list[i].cardBin;
   	    len = cardBinTmp.length;
   	    if(cardNum>=len && cardNum.substring(0,len)==cardBinTmp && cardNum.length = this.list[i].cardLen) {
   	    	return this.list[i].cardAreaRule;
   	    }
   	}   
   	if(cardNum.length==16)	
   	   return "B";
   }	
   return cardRule;	*/
}

function cardBinList_getCardArea(cardNum,bankAreaList){
/*  var cardRule = this.getCardAreaRule(cardNum);
  if(cardRule==""){
  			return "";
  }if(cardRule=="B"){ 
				return cardNum.substring(0,4);
  }else if(cardRule=="C"){
				return cardNum.substring(6,10);
  }else if(cardRule=="U"){
				return '0';	
  }else if(cardRule=="Z"){
				return bankAreaList.getAreaCode("2"+cardNum.substring(5,9));	
  }else if(cardRule=="T"){
				return bankAreaList.getAreaCode("2"+cardNum.substring(6,10));	
  }else{
       return "";
  }*/
}

function isValidCard1(cardNum){
    if(cardNum.length == 19 && Card19Check2112(cardNum)){
        return true;
    }
    else if(cardNum.length == 16 && Card16Check2112(cardNum)){
        return true;
    }
    else if(cardNum.length == 15 && Card15Check2121(cardNum)){
		return true;
    }
    else if(cardNum.length == 14 && Card14Check2121(cardNum)){
		return true;
    }else{
        return false;
    }
}

function Card16Check2112(num)
{
	var intSum21=0;
	var intSum12=0;
	for (var i=0;i<15;i++)
	{
		var intCardNoDigits=parseInt(num.charAt(i));
		intSum21+=parseInt(intCardNoDigits*((i+1)%2+1)/10)+intCardNoDigits*((i+1)%2+1)%10;
		intSum12+=parseInt(intCardNoDigits*(i%2+1)/10)+intCardNoDigits*(i%2+1)%10;
	}
	var intCardNoLastDigits=parseInt(num.charAt(15));
	if (((intSum21%10-(10-intCardNoLastDigits)%10)==0)||
		((intSum12%10-(10-intCardNoLastDigits)%10)==0))
	{
	return true;
	}
	else
	{
	return false;
	}
}

function Card15Check2121(num)
{      
	var even=0;
	var evenSingleSum=0;
	var evenSum=0;
	var oddSum=0;
	var sum=0;	
	var checkdigit=0;
	
	for (var i=0;i<7;i++)
	{
		even=(parseInt(num.charAt(2*i+1)))*2;
		if(even>9){	
			even=String(even);		
			evenSingleSum=parseInt(even.charAt(0))+parseInt(even.charAt(1));
			evenSum=evenSum+evenSingleSum;
			}
		else{
			evenSum=evenSum+even;
		}
		
	}	
	for(var j=0;j<7;j++)
	{
		oddSum=oddSum+parseInt(num.charAt(2*j));			
	}	
	sum=oddSum+evenSum;
	
	if(sum%10==0){
		if(parseInt(num.charAt(14))==0){
			return true;
		}
		else{
			return false;	
		} 
	}
	else{
		checkdigit=10-sum%10;
		
		if(parseInt(num.charAt(14))==checkdigit){
			return true;
		}
		else{
			
			return false;
				
		}	
	}
}
function Card14Check2121(num)
{      
	var intSum21=0;
	var intSum12=0;
	for (var i=0;i<13;i++)
	{
		var intCardNoDigits=parseInt(num.charAt(i));
		intSum21+=parseInt(intCardNoDigits*((i+1)%2+1)/10)+intCardNoDigits*((i+1)%2+1)%10;
		intSum12+=parseInt(intCardNoDigits*(i%2+1)/10)+intCardNoDigits*(i%2+1)%10;
	}
	var intCardNoLastDigits=parseInt(num.charAt(13));
	/*
	if (((intSum21%10-(10-intCardNoLastDigits)%10)==0)||
		((intSum12%10-(10-intCardNoLastDigits)%10)==0))
	{
		return true;
	}
	*/
	if ((intSum21%10-(10-intCardNoLastDigits)%10)==0)
	{
		return true;
	}	
	else
	{
		return false;
	}
}
function Card19Check2112(num)
{
	var intSum21=0;
	for (var i=0;i<18;i++)
	{
		var intCardNoDigits=parseInt(num.charAt(17-i));
		intSum21+=parseInt(intCardNoDigits*((i+1)%2+1)/10)+intCardNoDigits*((i+1)%2+1)%10;
	}
	var intCardNoLastDigits=parseInt(num.slice(18,19));
	if ((intSum21%10-(10-intCardNoLastDigits)%10)==0)//
	{
		return true;
	}
	else
	{
		return false;
	}
}

function Acct19Check(num){
	var p = new Array("11","13","17","19","23","29","31","37","41","43","47","53","59","61","67","71","73");
	var sum=0;
	for( var i=0;i<17;i++){
        var num1 =p[i];
        var num2 = num.charAt(i); 
		sum += num1*num2;
	}
	sum=97-sum%97;
	var account1=parseInt(sum/10);
	var account2=sum%10;
    if ((account1.toString()!=num.charAt(17))||(account2.toString()!=num.charAt(18))){
      return false;
    }else{
	  return true;
	} 
 }
 
function cardBinList_SupportCardBin(funcNo){
	var temp="|";
	for(var i=0;i<this.list.length;i++){
		if(this.list[i].func.substr(funcNo,1)=="1")
		{	
			temp+= this.list[i].cardBin + "|";
		}
	}
	return temp;
}

function cardBinList_getEMVCard(){
	var temp="|";
	for(var i=0;i<this.list.length;i++){
		if(this.list[i].EMVCard=="3")
		{	
			temp+= this.list[i].cardBin + "|";
		}
	}
	return temp;
}
/*
 * 根据btt配置HSYHCardBinList和HSYHCardBinList,判断卡号或账户是否是华商
 * add by guohy
 * 2016年1月版
 * return:0-非工行（华商）卡/账户，1-工行卡/账户，2-华商银行卡/账户
 */
function cardBinList_isHSYHCardOrAcc(accOrCardNum){
	var isCard = this.getCardType(accOrCardNum);
	var acctFlag = this.Acct19Check(accOrCardNum);
	if(isCard!="N"){ //accOrCardNum为卡
		var cardBin = this.getCardBin(accOrCardNum);
		if(cardBin!="N"){
			if(("|"+cardbinfo_HSYHCardBinList+"|").indexOf("|" + cardBin + "|")>-1){ //此卡的卡bin在btt配置中，故属于华商卡
				return "2";
			}
			// 符合工行卡BIN，不是华商卡BIN，返回标志1.
			return "1";
		} else {
			// 是卡号，但是搜索不到卡BIN，返回0-非工行（华商）卡/账户
			return "0";
		}		
	}else if(acctFlag){ //accOrCardNum为账号
		try{
			var subaccOrCardNum = accOrCardNum.substring(0,4);
			if(("|"+cardbinfo_HSYHAcctList+"|").indexOf("|" + subaccOrCardNum + "|")>-1){ //此账户开始4位，符合华商账户开头，故属于华商账户
				return "2";
			}
		}catch(ee){}
		// 是工行账户，前四位非华商地区号，返回标志1.
		return "1";
	}
	// 0-非工行（华商）卡/账户
	return "0";
}

function cardBinList_InUseNow(acctNum,pos){
	
 if(isValidCard1(acctNum)){
	for(var i=0;i<this.list.length;i++){
		var tempcardbin=this.list[i].cardBin;
		var length =tempcardbin.length;
		if(acctNum.substr(0,length)==tempcardbin)
		{	
			return this.list[i].func.substr(pos,1);
		}
	}
	return 0;
 }
  return -1;
}

function cardBinList_getCurrList(cardNum){
	var temp = null;
	if(cardNum != "null"&&cardNum != ""&&cardNum != null){
	if(isValidCard1(cardNum)){
    for(var i=0;i<this.list.length;i++){
   	    var cardBinTmp = this.list[i].cardBin;
   	    var len = cardBinTmp.length;
   	    if(cardNum>=len && cardNum.substring(0,len)==cardBinTmp && cardNum.length == this.list[i].cardLen) {
   	    	temp = this.list[i].currlist;
   	    }
   	}
	}
	}
  return temp;
}

//========== added for currType ================
var currTypeList = new currTypeList();

function CurrType(currCode,currCName,currEName,currFunc,currAmtAvail,currSymbol,currShort)  
{
   this.currCode=currCode;
   this.currCName=currCName;
   this.currEName=currEName;
   this.currFunc=currFunc;
   this.currAmtAvail=currAmtAvail;
   this.currSymbol=currSymbol;
   this.currShort=currShort;
}

function currTypeList() 
{
	this.list=new Array();  
	this.add=currTypeList_add;
	this.elementAt=currTypeList_elementAt;
	this.getcurrCName=currTypeList_getcurrCName;
	this.getcurrEName=currTypeList_getcurrEName;
	this.getCurrFunc=currTypeList_getCurrFunc;
	this.getCurrAmtAvail=currTypeList_getCurrAmtAvail;
	this.getCurrCNames=currTypeList_getCurrCNames;
	this.getCurrENames=currTypeList_getCurrENames;
}

function currTypeList_add(CurrType){
 	this.list[this.list.length] = CurrType;
}

function currTypeList_elementAt(i)
{
	return this.list[i];
}

function currTypeList_getcurrCName(currCode){
   var currCName = "N";
   for(var i=0;i<this.list.length;i++){
 	    if(currCode == this.list[i].currCode) {
   	    	currCName = this.list[i].currCName;
   	    }
    	} 
   return currCName;  
}

function currTypeList_getcurrEName(currCode){
   var currEName = "N";
   for(var i=0;i<this.list.length;i++){
 	    if(currCode == this.list[i].currCode) {
   	    	currEName = this.list[i].currEName;
   	    }
    	} 
   return currEName;  
}

function currTypeList_getCurrFunc(currCode){
   var currFunc = "N";
   for(var i=0;i<this.list.length;i++){
 	    if(currCode == this.list[i].currCode) {
   	    	currFunc = this.list[i].currFunc;
   	    }
    	} 
   return currFunc;  
}
//currAmtAvail(通过币种取小数有效位)
function currTypeList_getCurrAmtAvail(currCode){
	var currAmtAvail = "N";
	for(var i=0;i<this.list.length;i++){
		if(currCode == this.list[i].currCode) {
			currAmtAvail = this.list[i].currAmtAvail;
		}
	} 
	return currAmtAvail;  
}
//通过币种串取币种名称(不包括人民币)，若传入"|001|014|013|",则返回如："/美元/港币"
function currTypeList_getCurrCNames(currCodes){
	var currNames = "";
	var currArry = currCodes.split("|");
	for(var i=0;i<currArry.length;i++)
	{
		if(currArry[i] == "" || currArry[i]=="001")continue;
		currNames = currNames + "/" +  this.getcurrCName(currArry[i]);
	} 
	return currNames;  
}
//通过币种串取币种名称(不包括人民币)，若传入"|001|014|013|",则返回如："/USD/HKD"
function currTypeList_getCurrENames(currCodes){
	var currNames = "";
	var currArry = currCodes.split("|");
	for(var i=0;i<currArry.length;i++)
	{
		if(currArry[i] == "" || currArry[i]=="001")continue;
		currNames = currNames + "/" +  this.getcurrEName(currArry[i]);
	} 
	return currNames;  
}
