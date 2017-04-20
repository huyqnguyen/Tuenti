//按照卡号的长度和规则对卡号进行分割展示
function cardNumberDivide(cardNum)
{
	try{
		var invalidCharset="!@#$%^&*";
		var myReg=eval("/["+invalidCharset+"]/g");
		
		//判断字符串是否满足指定模式
		if(myReg.test(cardNum)){
			//alert("卡号中不能包含非法字符" + "!@#$%^&" + '"' + "'\\\\'" + "和空格");
			return cardNum;
		}
		
		//检查字符串中是否有全角字符
		if(cardNum.replace(/[\x00-\xff]/g,"").length != 0){
			//alert("卡号中请不要包含全角字符");
			return cardNum;
		}
		
		//2014年4月，支持自贸区卡
		var prefix = "";
		var pattern = new RegExp("^(FTU|FTE|FTN|FTF|FTI)\\d{19}$");
		if(pattern.test(cardNum)) {
			index = cardNum.search(/\d{19}/);
			prefix = cardNum.substring(0, index);
			cardNum = cardNum.substring(index);
		}
		
		cardNum=cardNum.replace(/(^\s*)|(\s*$)/g, "");
		if(cardNum.length == 13){
			cardNum = cardNum.substr(0,4) + " " + cardNum.substr(4,5) + " " + cardNum.substr(9,4);
		}else if(cardNum.length == 14){
			cardNum = cardNum.substr(0,4) + " " + cardNum.substr(4,6) + " " + cardNum.substr(10,4);
		}else if(cardNum.length == 15){
			cardNum = cardNum.substr(0,4) + " " + cardNum.substr(4,7) + " " + cardNum.substr(11,4);
		}else if(cardNum.length == 16){
			cardNum = cardNum.substr(0,4)
			 + " " + cardNum.substr(4,4)
			 + " " + cardNum.substr(8,4)
			 + " " + cardNum.substr(12,4);
		}else if(cardNum.length == 17){
			cardNum = cardNum.substr(0,6) + " " + cardNum.substr(6,7) + " " + cardNum.substr(13,4);
		}else if(cardNum.length == 18){
			cardNum = cardNum.substr(0,6) + " " + cardNum.substr(6,12);
		}else if(cardNum.length == 19){
			cardNum = cardNum.substr(0,6) + " " + cardNum.substr(6,13);
			//alert(cardNum);
		}else{
			return cardNum;
		}
		return prefix + cardNum;
	}
	catch(Exception){
		return cardNum;
	}
}
//获取一个账户的描述字符串，格式为
//	注册卡：卡号
//	下挂账户：灵通卡卡号 账户代码 账号
//用于回显
function account_getDescStringForShow(isDevide)
{
	var cardNum_prefix = "";
	if(this.ftFlag == "5")
	{
		cardNum_prefix = "FTI";
	}
	else if(this.ftFlag == "6")
	{
		cardNum_prefix = "FTF";
	}
	if(this.acctType=="R"){
		if(isDevide==0){
		return this.areaName +" "+cardNum_prefix + this.cardNum+" "+this.acctDesc+" " + this.cardAlias + " " + this.regMode;
		}else{
		return this.areaName +" "+cardNumberDivide(cardNum_prefix + this.cardNum)+" "+this.acctDesc+" " + this.cardAlias + " " + this.regMode;
		}
	}
	else if(this.isRegistedCard){
		if(isDevide==0){
		return this.areaName+" "+cardNum_prefix + this.cardNum + " " +accountList_getAcctTypeDesc(this.acctType,this.cardNum,this.acctProp)+" "+ this.cardAlias;	
		}else{
		return this.areaName+" "+cardNumberDivide(cardNum_prefix + this.cardNum) + " " +accountList_getAcctTypeDesc(this.acctType,this.cardNum,this.acctProp)+" "+ this.cardAlias;
		}
	}
	else if(this.acctType=="04"&&this.acctProp=="006")
		return this.acctCode + " 教育储蓄 " + this.acctNum + " " + this.acctAlias;
	else
	     return this.acctCode + " " + this.acctDesc + " " + this.acctNum + " " + this.acctAlias;
}

//获取一个账户的描述字符串，格式为
//	注册卡：卡号
//	下挂账户：灵通卡卡号 账户代码 账号
function account_getDescString()
{
	var cardNum_prefix = "";
	if(this.ftFlag == "5")
	{
		cardNum_prefix = "FTI";
	}
	else if(this.ftFlag == "6")
	{
		cardNum_prefix = "FTF";
	}
	
	if(this.acctType=="R")
		return this.areaName +" "+cardNum_prefix+this.cardNum+" "+this.acctDesc+" " + this.cardAlias + " " + this.regMode;
	else if(this.isRegistedCard)
	{
		if((this.acctType).indexOf("F")!=-1){
			return this.areaName+" "+cardNum_prefix+this.cardNum + " " +accountList_getAcctTypeDesc(this.acctType,this.cardNum,this.acctProp);
		}
		return this.areaName+" "+cardNum_prefix+this.cardNum + " " +accountList_getAcctTypeDesc(this.acctType,this.cardNum,this.acctProp,this.skFlag,this.acctDesc)+" "+ this.cardAlias;
	}
	else if(this.acctType=="04"&&this.acctProp=="006")
		return this.acctCode + " 教育储蓄 " + this.acctNum + " " + this.acctAlias;
	else
	     return this.acctCode + " " + this.acctDesc + " " + cardNum_prefix + this.acctNum + " " + this.acctAlias;
}
//多渠道定制注册卡列表下包括下挂卡的问题
function account_getDesc()
{
	if(this.isRegistedCard)
		return this.areaName+" "+this.cardNum + " " +accountList_getAcctTypeDesc(this.acctType,this.cardNum,this.acctProp)+" "+ this.cardAlias;

	else if(this.acctType=="04"&&this.acctProp=="006")
		 return this.acctCode + " 教育储蓄 " + this.acctNum + " " + this.acctAlias;
	else if(this.acctType=="21"||this.acctType=="22"||this.acctType=="20")
		 return this.areaName+" "+this.acctNum+" "+ accountList_getAcctTypeDesc(this.acctType,this.acctNum,this.acctProp)+" "+this.acctAlias;
	else
	     return this.acctCode + " " + this.acctDesc + " " + this.acctNum + " " + this.acctAlias;
}
/**
 *
 * 提供accountList_getTypedOptionByCheckmodeWithoutBusiness使用
 * 返回指定条件账户描述字符串 开户地区+卡号+卡类型+卡别名
 * @return {String}  账户描述字符串
 */
function account_getDescStringForByCheckmode()
{
	//得到与此帐户绑定的注册卡的描述
	//卡别名
	var cardCardAlias="";
	for(var i=0;i<acctList.len();i++){
		if(this.cardNum==acctList.data[i].cardNum&&this.cardNum&&acctList.data[i].isRegistedCard){
			AcctTypeDesc=accountList_getAcctTypeDesc(acctList.data[i].acctType,acctList.data[i].cardNum,acctList.data[i].acctProp)
			cardCardAlias=acctList.data[i].cardAlias;
		}
	}
	return this.areaName+" "+this.cardNum + " " +AcctTypeDesc+" "+ cardCardAlias;
}

//本对象代表一个账户，包括注册卡账户和下挂账户
//	属性：isRegistedCard：true：注册卡;false：下挂账户
//	     cardOwnerMark：空所有本人他人卡号，0：本人；1：第一个他人卡 2：第二个他人卡依次类推 (对托管账户支持200708版本修改数据字典)
//  cardOwnerMark
//在cardOwnerMark后增加cardOwnerType，用于托管权限判断
//在agrFlag后新增RemitTRANLAG，用于托管权限判断
function Account(isRegistedCard, cardNum, acctCode, acctNum, cardOwnerMark,
		cardOwnerType, acctType, acctDesc, isQryAcctList, cardAlias, acctAlias,
		acctProp, areacode, areaname, regMode, auth, cityCard,
		acctlist_openregsign, dcrFlag,jointlyAcct,unionNum,agrFlag,RemitTRANLAG,
		MGACCNO,YJPHONE,CLFLAG,FUNDNO,OPENDATE,skFlag,skNo,ftFlag) {
	this.isRegistedCard = isRegistedCard;
	this.cardNum = cardNum;
	this.acctCode = acctCode;
	this.acctNum = acctNum;
	this.cardOwnerMark = cardOwnerMark;
	this.cardOwnerType = cardOwnerType;// 用于托管权限判断
	this.acctType = acctType;
	this.acctDesc = acctDesc;
	this.isQryAcctList = isQryAcctList;

	this.cardAlias = cardAlias;
	this.acctAlias = acctAlias;
	this.acctProp = acctProp;
	this.areaCode = areacode;
	this.areaName = areaname;
	this.regMode = regMode;
	this.acctlist_openregsign = acctlist_openregsign;
	this.getDescString = account_getDescString;
	this.getDesc = account_getDesc;
	this.auth = auth;
	this.cityCard = cityCard;
	this.dcrFlag = dcrFlag;
	this.jointlyAcct = jointlyAcct;
	this.unionNum = unionNum;
	this.agrFlag = agrFlag;
	this.RemitTRANLAG = RemitTRANLAG;//工银亚洲紧急补丁增加
	this.MGACCNO = MGACCNO;
	this.YJPHONE = YJPHONE;
	this.CLFLAG = CLFLAG;
	this.FUNDNO = FUNDNO;
	this.OPENDATE = OPENDATE;
	this.skFlag = skFlag;
	this.skNo = skNo;
	this.ftFlag = ftFlag;
	this.getDescStringForByCheckmode= account_getDescStringForByCheckmode;
	this.getDescStringForShow = account_getDescStringForShow;
}
//本对象代表属于本客户的所有注册账号和下挂账号的列表
//
//
function AccountList()
{
   this.data=new Array();
   this.add=accountList_add;
   this.len=accountList_len;
   this.getOptionString=accountList_getOptionString;
   this.getRegCardOptionString=accountList_getRegCardOptionString;
//============ added by lujian =======================
   this.getHangAccountOpString=accountList_getHangAccountOpString;
   this.getSpHangAccountOpString=accountList_getSpHangAccountOpString;//add by liupan
   this.getHangAccountOpStringTZCK=accountList_getHangAccountOpStringTZCK;
   this.getHangAccountOpStringExcRemit=accountList_getHangAccountOpStringExcRemit;//added by fuwei
   this.getHangAccountOpStringDing=accountList_getHangAccountOpStringDing;
   this.getSameCardHangAcctOpString=accountList_getSameCardHangAcctOpString;
//============= end by lujian ========================
   this.getTypedOptionString=accountList_getTypedOptionString;
   this.getTypedOptionString_old=accountList_getTypedOptionString_old;//add by suny
   this.getTypedOptionStringDelAcct=accountList_getTypedOptionStringDelAcct;
   
   this.getTypedAndIbpOptionString=accountList_getTypedAndIbpOptionString;//add by suny
   this.getTypedAndIbpOptionCardString=accountList_getTypedAndIbpOptionCardString;//add by yanhui
   this.getGoldTypedOptionString=accountList_getGoldTypedOptionString;
   this.getTypedOptionStringwithCardbin=accountList_getTypedOptionStringwithCardbin;//added by jinsuo
   this.getTypedOptionStringwithCardbin1=accountList_getTypedOptionStringwithCardbin1;//added by jinsuo
   this.getSpecialOptionString=accountList_getSpecialOptionString;
   this.getUnprintOptionString=accountList_getUnprintOptionString;
   this.elementAt=accountList_elementAt;
   this.getAccountTypeAt=accountList_getAccountTypeAt;
   this.findAccount=accountList_findAccount;
   this.findAccountByCardNo=accountList_findAccountByCardNo;
   this.findCardOwnerTypeByCardNo=accountList_findCardOwnerTypeByCardNo;
   this.getRptLossAccountOptionString=accountList_getRptLossAccountOptionString;
   this.getRptLossCardOptionString=accountList_getRptLossCardOptionString;
   this.getQryInterestOptionString=accountList_getQryInterestOptionString;
   this.getQryBasicInfoOptionString=accountList_getQryBasicInfoOptionString;
   this.getQryBasicInfoInputOptionString=accountList_getQryBasicInfoInputOptionString;//1004增加手工输入
   this.findAccountDataByCardNo=accountList_findAccountDataByCardNo;
   this.getAcctTypeDesc=accountList_getAcctTypeDesc;	//add fsl
   this.getSubRegCardOptionString=accountList_getSubRegCardOptionString
//=============tianf start ===================
   this.getTypedOptionStringSelected=accountList_getTypedOptionStringSelected;
//=============tianf end =====================
   this.ForeigngetTypedOptionString=accountList_ForeigngetTypedOptionString;//add ml
   this.ForeigngetTypedOptionStringDelAcct=accountList_ForeigngetTypedOptionStringDelAcct;
   //============================added by yangjing=================================
   //获得用于select中的option的字符串：显示指定类型的卡列表（根据账号屏蔽指定的交易卡）
   this.getTypedOptionWithoutCard=accountList_getTypedOptionWithoutCard;

   //============================added by lixf=================================
   //获得用于select中的option的字符串：显示指定类型的卡列表（不包括商务卡）
   this.getTypedOptionWithoutBusiness=accountList_getTypedOptionWithoutBusiness;
   //获得用于select中的option的字符串：显示指定类型的卡列表（不包括商务卡）,仅显示托管账户
   this.getTypedOptionWithoutBusinessForTrust=accountList_getTypedOptionWithoutBusinessForTrust;

   this.getTypedOptionWithoutBusinessNoSelected=accountList_getTypedOptionWithoutBusinessNoSelected;
   //获得用于select中的option的字符串：显示指定卡的指定类型的下挂账户（不包括商务卡）
   this.getHangAcctOpWithoutBusiness=accountList_getHangAcctOpWithoutBusiness;
   this.getHangAcctOpWithoutBusinessWithAcctNo=accountList_getHangAcctOpWithoutBusinessWithAcctNo;
   //获得用于select中的option的字符串：显示我的账户贵金属的下挂账户（不包括商务卡）
   this.getHangAcctsOpWithoutBusiness=accountList_getHangAcctsOpWithoutBusiness;

   this.getCardTypedAcctOptionString=accountList_getCardTypedAcctOptionString;
   this.getTypedAcctPro=accountList_getTypedAcctPro;
   this.getCardString=accountList_getCardString;
   this.getCardOwnerTypeString=accountList_getCardOwnerTypeString;
   this.getGoldCardOptionString=accountList_getGoldCardOptionString;

   //判断卡是否为商务卡，是商务卡返回ture，不是商务卡返回false
   this.isBussinessCard=accountList_isBussinessCard;
   //返回指定帐户的描述
   this.getAccountDescript = accountList_getAccountDescript;
   //获得用于select中的option的字符串：显示指定类型的卡列表（不包括商务卡），可以返回异地信用卡
   this.getTypedOptionForCard=accountList_getTypedOptionForCard;

   this.getTypedOptionStringnoself = accountList_getTypedOptionStringnoself;
   
   //获得用于select中的option的字符串：显示指定类型的卡列表（不包括商务卡、财富卡，且需以62或955888开头）
   this.getTypedOptionWithoutBusinessForNetbook=accountList_getTypedOptionWithoutBusinessForNetbook;
   
   //============================added by fengys=================================
   //获得用于select中的option的字符串：显示指定类型的卡列表（屏蔽商务卡和指定的交易卡）
   this.getTypedOptionWithoutCard2=accountList_getTypedOptionWithoutCard2;
   //获得用于select中的option的字符串：显示指定类型的卡列表（不包括商务卡）
   this.getTypedOptionWithoutBusiness2=accountList_getTypedOptionWithoutBusiness2;


   //============================added by xuweixing=================================
   //获得用于select中的option的字符串：显示指定类型的卡列表（不包括商务卡），只显示双币种贷记卡
   this.getTypedOptionForeignVisa=accountList_getTypedOptionForeignVisa;
   //获得用于select中的option的字符串：显示指定卡的指定类型的下挂账户（不包括商务卡），只显示双币种贷记卡
   this.getHangAcctOpForeignVisa=accountList_getHangAcctOpForeignVisa;
   //判断卡是否为商务卡，是商务卡返回ture，不是商务卡返回false
   this.isDoubleCurrCredit=accountList_isDoubleCurrCredit;
   //获得用于select中的option的字符串：显示我的自动还款交易，修改协议时选择的还款卡号
   this.getTypedOptionForRepayCard = accountList_getTypedOptionForRepayCard;//add fuyu
   //屏蔽商务卡和香港卡
   this.getTypedOptionWithoutBusinessAndHKCard=accountList_getTypedOptionWithoutBusinessAndHKCard;
   //屏蔽商务卡和香港卡，for外汇双向，去除指定卡
   this.getTypedOptionWithoutBusinessAndHKCardDelCard=accountList_getTypedOptionWithoutBusinessAndHKCardDelCard;
   //判断是否为香港卡
   this.isHKCard=accountList_isHKCard;
   //多渠道客户个性化定制特殊需要
   this.getTypedOptionStringForCust=accountList_getTypedOptionStringForCust;
   //显示指定类型的注册卡（不包括商务卡），指定卡号后，若没在卡列表中，则在卡列表中追加此卡号。
   this.getTypedOptionWithoutBusinessAddNoRegCard=accountList_getTypedOptionWithoutBusinessAddNoRegCard;

   //============================added by yanlong=================================
   //返回贷记卡、国际卡的外币卡种，不是双币种返回""
   this.getOverseaCurrType=accountList_getOverseaCurrType;
   //根据不同的查询类型，0:不区分业务地 1:当前业务地 2 非当前业务地 显示指定类型的注册卡（不包括商务卡） add by kfzx-yanghl01
   this.getTypedOptionByCheckmodeWithoutBusiness=accountList_getTypedOptionByCheckmodeWithoutBusiness;
   //客户服务下联名积分查询专用
   this.customGetTypedOptionString=accountList_customGetTypedOptionString;
   //开通关闭visa/万事达验证服务专用
   this.getVBVTypedOptionString=accountList_getVBVTypedOptionString;
   //获取商务卡专用
   this.getBussinessCardOptionString=accountList_getBussinessCardOptionString;

   //基金转托管卡列表过滤专用
   this.getFundSwitchCard=accountList_getFundSwitchCard;
   //根据下挂账户索引取账户所属卡的索引值
   AccountList.prototype.getParentCardIndex=accountList_getParentCardIndex;
   //借记卡栏目专用，用于区分灵通卡（包括E时代）和理财金
   this.getTypedOptionForDebitCard=accountList_getTypedOptionForDebitCard;
   //社保用，根据优先指定carbin的符合条件列表
   this.getTypedOptionSortByCarBin=accountList_getTypedOptionSortByCarBin;
   //银医一卡通，取符合医院配置的卡号
   this.getTypedOptionForHospital=accountList_getTypedOptionForHospital;
   
   // 境内汇款卡列表
   this.getDomesticTransferCardOption = accountList_getDomesticTransferCardOption;
}
//获取账号个数
function accountList_len()
{
	return this.data.length;
}

//获取acctType的中文意思
function accountList_getAcctTypeDesc(acct_type, card_num,acct_prop,sk_flag,acctDesc){
	var temp="";
	if(acct_type=="01")
		temp="活期";
	else if(acct_type=="00")
		temp="特殊账户";
	else if(acct_type=="02")
		temp="定期存单";
	else if(acct_type=="03")
		temp="定活两便";
	else if(acct_type=="04"&&acct_prop=="006")
		temp="教育储蓄";
	else if(acct_type=="04")
		temp="零存整取";
	else if(acct_type=="05")
		temp="存本取息";
	else if(acct_type=="06")
		temp="小额抵押贷款";
	else if(acct_type=="07")
		temp="国库券";
	else if(acct_type=="08")
		temp="通知存款";
	else if(acct_type=="09")
		temp="往来户";
	else if(acct_type=="10")
		temp="贷款户";
	else if(acct_type=="11")
		temp="内部户";
	else if(acct_type=="12")
		temp="贴现户";
	else if(acct_type=="13")
		temp="表外户";
	else if(acct_type=="14")
		temp="单位定期户";
	else if(acct_type=="15")
		temp="个人住房贷款";
	else if(acct_type=="16")
		temp="定期一本通";
	else if(acct_type=="17")
		temp="两得存款";
	else if(acct_type=="21")
		temp="贷记卡";
	else if(acct_type=="22")
		temp="信用卡";
	else if(acct_type=="23")
		temp="借记专用账户";
	else if(acct_type=="24")
		temp="预付专用账户";
	else if(acct_type=="001")
		temp="信用卡";
	else if(acct_type=="002")
		temp="牡丹专用卡";
	else if(acct_type=="003"){
		temp="灵通卡";
		if(sk_flag=="1" || sk_flag == "2"){
			temp=acctDesc;
		}
	}else if(acct_type=="004")
		temp="牡丹借记专用卡";
	else if(acct_type=="007"){
		temp="贷记卡";
		if(sk_flag=="1" || sk_flag == "2"){
			temp=acctDesc;
		}	
	}else if(acct_type=="011"){
		var cardbinstr1= dyTopFrame.cardBinList.SupportCardBin(1);
		var cardbinstr2= dyTopFrame.cardBinList.SupportCardBin(2);
 		var cardbinstr5= dyTopFrame.cardBinList.getEMVCard();
 		var cardbin="|"+dyTopFrame.cardBinList.getCardBin(card_num)+"|";
 		if(cardbin=="|955886|" && card_num.substring(10,11)=="9" )
 			temp="e理财";
 		else if(cardbinstr5.indexOf(cardbin)!=-1)
 			temp="工银财富卡";
 		else if(cardbinstr2.indexOf(cardbin)!=-1)
			temp="理财金账户卡";
		else
  		 	temp="e时代卡";
 		
 		if(sk_flag=="1" || sk_flag == "2"){
			temp=acctDesc;
		}
	}
	else if(acct_type=="014")
		temp="财智账户";
	else if(acct_type=="20")
		temp="国际卡";
	else if(acct_type=="008")
		temp="国际卡";
	else if(acct_type=="30")
		temp="实物黄金账户";
	else if(acct_type=="32")
		temp="债券";
	else if(acct_type=="31")
		temp="开放式基金";
	else if(acct_type=="33")
		temp="理财交易账户";
	else if(acct_type=="35")
		temp="支付保证资金账户";		
	else if(acct_type=="36")
		temp="如意金积存账户";
	else if(acct_type=="50" || acct_type=="68" )
		temp="账户贵金属交易账户";
	else if(acct_type=="64")
		temp="私人银行理财账户";		
	else if(acct_type=="66")
		temp="积存金账户";
	else if(acct_type=="73")
		temp="私人银行基金交易账户";
	else if(acct_type=="98")
		temp="个人综合贷款账户";
	else if(acct_type=="993")
		temp="借记账户";
	else if(acct_type=="994")
		temp="贷记账户";
	else if(acct_type=="995")
		temp="教育储蓄";
	else if(acct_type=="996")
		temp="定期一本通";
	else if(acct_type=="997")
		temp="存本取息";
	else if(acct_type=="998")
		temp="零存整取";
	else if(acct_type=="999")
		temp="活期账户";
	else if(acct_type=="10003")
		temp="外汇保证金账户";
	else if(acct_type=="10160")
		temp="证券资金账户";
	else if(acct_type=="10170")
		temp="期货公司资金账户";
	else if(acct_type=="A001")
	    temp="储蓄账户"
	else if(acct_type=="A002")
	    temp="往来账户"
	else if(acct_type=="A003")
	    temp="定期账户"
	else if(acct_type=="A004")
	    temp="综合账户"
	else if(acct_type=="A005")
	    temp="信用卡账户"
	else if(acct_type=="A006")
	    temp="理财金账户"
	else if(acct_type=="A007")
	    temp="理财金账户"	
	else if(acct_type=="A008")
	    temp="综合账户"	
	else if(acct_type=="A009")
	    temp="私人银行账户"
	else if(acct_type=="A010")
	    temp="理财e时代账户"
	else if(acct_type=="A011")
	    temp="理财e时代账户"	            
	else if(acct_type=="AS001")
	    temp="港元往来"
	else if(acct_type=="AS002")
	    temp="港元储蓄"
	else if(acct_type=="AS003")
	    temp="外币储蓄"
	else if(acct_type=="AS004")
	    temp=" 定期"
	else if(acct_type=="AS005")
	    temp="美元往来"
	else if(acct_type=="AS006")
	    temp=" 人民币往来"
	else if(acct_type=="AS007")
	    temp="人民币储蓄"

	else if(acct_type=="F10101")
	    temp="活期户"
	else if(acct_type=="F10102")
	    temp="定期户"
	else if(acct_type=="F10103")
	    temp="零存整取"
	else if(acct_type=="F10104")
	    temp="通知存款"
	else if(acct_type=="F10150")
	    temp="保证金产品"
	else if(acct_type=="F10201")
	   // temp="营运资金贷款"
	   temp="贷款户"
	else if(acct_type=="F10202")
	   // temp="项目贷款"
	   temp="贷款户"
	else if(acct_type=="F10203")
	    //temp="银团贷款"
	    temp="贷款户"
	else if(acct_type=="F10204")
	   // temp="按揭贷款"
	   temp="贷款户"
	else if(acct_type=="F10205")
	    //temp="其他消费贷款"
	    temp="贷款户"
	else if(acct_type=="F20101")
	    temp="代理业务"
	else if(acct_type=="F20201")
	    temp="余额调剂"
	else if(acct_type=="F20202")
	    temp="智按易"
	else if(acct_type=="F20301")
	    temp="对账单"
	else if(acct_type=="F10401")
	    temp="基金"
	else if(acct_type=="F80001")
	    temp="信用卡"
	else if(acct_type=="F10191")
	    temp="定期户"
	else if(acct_type=="F10192")
	    temp="综合账户"
    else if(acct_type=="FS10101")
	    temp="活期户"
	else if(acct_type=="FS10191")
	    temp="定期户"
	else if(acct_type=="FS10192")
	    temp="综合账户"


	return temp;
}

//在用户的账号列表中添加一个账号
function accountList_add(account)
{
	this.data[this.data.length]=account;
}
//根据顺序号检索一个账号
function accountList_elementAt(i)
{
	return this.data[i];
}
//获取顺序号为i的账户的账户类别
function accountList_getAccountTypeAt(i)
{
	return this.data[i].acctType;
}
//用于托管权限判断
function compareMarkAndType(iMark,Mark,iType)
{
//iMark卡的本他人属性,Mark上送的"X|X",iType卡属性所支持的权限
//	mark	type		过滤条件1	过滤条件2
//	空		空	 所有卡	卡mark不控制	卡属性权限=3
//	空		>=1	 所有卡	卡mark不控制	卡属性权限>=typeB
//	0		            本人卡	卡mark=0	           卡属性权限  不比较
//	>=1		空	 他人卡	卡mark=markA	卡属性权限=3
//	>=1		>=1	 他人卡	卡mark=markA	卡属性权限>=typeB

	var ret = "";
	try{
		//mark为空，type为空，卡mark不控制	卡属性权限=3
		if(Mark == null || Mark == "" || Mark== "|"){//上送为空
			if((parseInt(iMark,10)>0&&iType==3)||parseInt(iMark,10)==0) //卡mark不控制	卡属性权限=3
				ret = "0";
		}
		//mark为空，type>=1，卡mark不控制	卡属性权限>=typeB
		else if(Mark.indexOf("|") != -1 && Mark.indexOf("|") == 0){//上送不为空，有竖线“|”，竖线左侧为空
			if(parseInt(Mark.substring(Mark.indexOf("|")+1,Mark.length))>=1
			 &&Mark.substring(Mark.indexOf("|")+1,Mark.length)<=iType){//type>=1,iType>=type
				ret = "1";
			}
		}
		//mark0，卡mark=markA	卡属性权限=3 。分“0”和“0|”两种情况
		//mark>=1，type为空，卡mark=markA	卡属性权限=3 。分“mark”和“mark|”两种情况
		else if(Mark.indexOf("|") != -1 && Mark.indexOf("|") == (Mark.length - 1))//上送不为空，有竖线“|”，竖线右侧为空
		{
			if(parseInt(Mark.substring(0,Mark.indexOf("|")))==0
					&& parseInt(iMark)==0){
				ret = "2";
			}
			if(parseInt(Mark.substring(0,Mark.indexOf("|")))>=1
					&& Mark.substring(0,Mark.indexOf("|"))==iMark
					&& parseInt(iType)==3){
				ret = "4";
			}
		}
		else if(Mark.indexOf("|") == -1){//上送不为空，   没有竖线“|”
			if(parseInt(Mark)==0
					&& parseInt(iMark)==0){
				ret = "3";
			}
			if(parseInt(Mark)>=1
					&& Mark == iMark
					&& parseInt(iType)==3){
				ret = "5";
			}
		}
		//mark>=1，type>=1，卡mark=markA	卡属性权限>=typeB
		else if((Mark.indexOf("|") != -1 )
				&& (0 < Mark.indexOf("|"))
				&& (Mark.indexOf("|") < (Mark.length - 1)))//有竖线“|”，左右都不空
		{
			if((parseInt(Mark.substring(0,Mark.indexOf("|")))>=1
			&& parseInt(Mark.substring(Mark.indexOf("|")+1,Mark.length))>=1
			&& Mark.substring(0,Mark.indexOf("|")) == iMark
			&& Mark.substring(Mark.indexOf("|")+1,Mark.length)<=iType)||(parseInt(Mark.substring(0,Mark.indexOf("|")))==0&& Mark.substring(0,Mark.indexOf("|")) == iMark))
			{
				ret = "6";
			}
		}
		//以上条件都不满足，则赋值为7，表示不满足条件
		else if(ret == ""){
			ret = "7";
		}
		return ret;
	}catch(Exception){
		return ret = "8";
	}

}

/**
 * 用于过滤卡号，目前用于销户操作，调入卡和调出卡的调整
 * cardNumInAccountList ：卡列表中的卡号；
 * cardNumParam ：传入的卡号
 * return true  false
 * author:kfzx-zhangyt
 * date:2011-12-12
 * ***/
function filterCardNumber(cardNumInAccountList,cardNumParam){
	try{
		if(cardNumParam=="undefined"||cardNumParam==null||cardNumParam==""){
			return false;
		}else if(cardNumInAccountList == cardNumParam){		
			return true;
		}
		return false;
	}catch(e){
		return false;
	}
}

//获取查询利息及税选择串
function accountList_getQryInterestOptionString(cardOwnerMark, areacode, regmode) {
	var temp = "";
	var ret = "";
	// var acctTypes="|003|001|002|004|007|01|02|04|05|16|21|22|";
	var acctTypes = "|011|003|001|002|004|007|";
	for ( var i = 0; i < this.data.length; i++) {
		ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
		if (acctTypes.indexOf("|" + this.data[i].acctType + "|") != -1
				&& (areacode == "" || (this.data[i].areaCode == areacode))
				&& (regmode == null || regmode == "" || (this.data[i].regMode == regmode))
				&& ( ret == "0"
						|| ret == "1" || ret == "2" || ret == "3"
						|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))

			// if(this.data[i].acctCode!="000")
			temp += "<option value=" + i + ">" + this.data[i].getDescString();
	}
	return temp;
}
//获取查询账户基本信息选择串
function accountList_getQryBasicInfoOptionString(cardOwnerMark,flag,areacode,regmode)
{
	var temp="";
	var ret="";
	//var acctTypes="|01|02|03|04|05|21|22|001|002|003|004|007";
	var acctTypes="|001|002|003|004|007|011|999|";	//显示注册卡号;0807预约 增加支持活期帐户999
	if(flag=="1") acctTypes="|001|002|003|004|007|011|008|";
	if(flag=="2") acctTypes="|001|002|003|004|007|011|008|999|";//查询支持国际卡，活期
	if(flag=="3") acctTypes="|F10101|F10192|";//查询支持国际卡，活期
	if(flag=="4") acctTypes="|001|002|003|004|007|011|008|999|F10101|F10192|";//注册账户转帐：显示nova和fova
	if(flag=="5") acctTypes="|001|003|007|011|999|"; //查询未绑定手机号汇款-付款交易
	for(var i=0;i<this.data.length;i++)
	{
		ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
		if(acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
				&&(areacode==""||(this.data[i].areaCode==areacode))
				&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
				&&( ret == "0"
						|| ret == "1" || ret == "2" || ret == "3"
						|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
		{
				if(flag=="5" && accountList_isBussinessCard(this.data[i].cardNum))
					continue;
				temp+="<option value="+i+">"+this.data[i].getDescString();
		}
	}
		if(temp=="")
			temp="<option value=no>没有满足条件的卡号";

	return temp;
}
//1004手工输入卡号，不支持商务卡
function accountList_getQryBasicInfoInputOptionString(cardOwnerMark,flag,areacode,regmode)
{
	var temp="";
	//var acctTypes="|01|02|03|04|05|21|22|001|002|003|004|007";
	var acctTypes="|001|002|003|004|007|011|999|";	//显示注册卡号;0807预约 增加支持活期帐户999
	if(flag=="1") acctTypes="|001|002|003|004|007|011|008|";
	for(var i=0;i<this.data.length;i++)
	{
		var ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
		if(acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
				&&(areacode==""||(this.data[i].areaCode==areacode))
				&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
				&&!accountList_isBussinessCard(this.data[i].cardNum)
				&&( ret == "0"
						|| ret == "1" || ret == "2" || ret == "3"
						|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
			//if(this.data[i].acctCode!="000")
				temp+="<option value="+i+">"+this.data[i].getDescString();
	}
	temp+="<option value=手工输入>"+"手工输入";
	return temp;
}
//外汇汇款获取基本户为多币种的注册卡 added by fuwei
function accountList_getHangAccountOpStringExcRemit(cardOwnerMark,acctTypes,areacode,regmode)
{
	var temp="";

	for(var i=0;i<this.data.length;i++)
	{
		var ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
		if((this.data[i].isRegistedCard==true)
				&&(acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1)
				&&(this.data[i].isQryAcctList=="1")
				&&(areacode==""||(this.data[i].areaCode==areacode))
				&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
				&&( ret == "0"
						|| ret == "1" || ret == "2" || ret == "3"
						|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
		{
			if(this.data[i+1].acctProp!="001"){
			 	temp+="<option value="+i+">"+this.data[i].getDescString();
		}
			 i++;

		}else if(this.data[i].isRegistedCard==true
				&& acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
		        && this.data[i].isQryAcctList=="0"
		        &&(areacode==""||(this.data[i].areaCode==areacode))
		        &&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
		        &&( ret == "0"
						|| ret == "1" || ret == "2" || ret == "3"
						|| ret == "4" || ret == "5" || ret == "6" || ret == "8")){
			 temp+="<option value="+i+">"+this.data[i].getDescString();

		}

	}
	if(temp=="")
		temp="<option value=no>没有满足条件的卡号";
	return temp;
}

//显示下挂指定类型账户的注册卡	added by mh
function accountList_getHangAccountOpStringDing(cardOwnerMark,acctTypes,areacode,regmode)
{
	var temp="";
	var card_array = new Array();
	var j=0;
	var ret;
	for(var i=0;i<this.data.length;i++){
		ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
		if((this.data[i].isRegistedCard==false)
				&&(acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1)
				&&(areacode==""||(this.data[i].areaCode==areacode))
				&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
				&&( ret == "0"
						|| ret == "1" || ret == "2" || ret == "3"
						|| ret == "4" || ret == "5" || ret == "6" || ret == "8")){
		card_array[0]=this.data[i].cardNum;
				break;}
		}
	for(var k=0;k<this.data.length;k++)
	{	var flag=1;
		ret = compareMarkAndType(this.data[k].cardOwnerMark ,cardOwnerMark,this.data[k].cardOwnerType);
		if((this.data[k].isRegistedCard==false)
				&&(acctTypes.indexOf("|"+this.data[k].acctType+"|")!=-1)
				&&(areacode==""||(this.data[k].areaCode==areacode))
				&&(regmode==null||regmode==""||(this.data[k].regMode==regmode))
				&&( ret == "0"
						|| ret == "1" || ret == "2" || ret == "3"
						|| ret == "4" || ret == "5" || ret == "6" || ret == "8")){
		for(var m=0;m<card_array.length;m++){
		if(this.data[k].cardNum==card_array[m]){
		flag=0;
		}
		}
		if(flag==1){
		m=card_array.length;
		card_array[m]=this.data[k].cardNum;}
		}
	}
		for(var n=0;n<this.data.length;n++)	{
			for(var l=0;l<card_array.length;l++){
					if((this.data[n].isRegistedCard==true)&&(this.data[n].cardNum==card_array[l]))
			 			temp+="<option value="+n+">"+this.data[n].getDescString();
				}
				}
	var acctTypes1="|996|997|";
	for(var o=0;o<this.data.length;o++)
	{
		ret = compareMarkAndType(this.data[o].cardOwnerMark ,cardOwnerMark,this.data[o].cardOwnerType);
		if(acctTypes1.indexOf("|"+this.data[o].acctType+"|")!=-1
				&&(areacode==""||(this.data[o].areaCode==areacode))
				&&(regmode==null||regmode==""||(this.data[o].regMode==regmode))
				&&( ret == "0"
						|| ret == "1" || ret == "2" || ret == "3"
						|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
			temp+="<option value="+o+">"+this.data[o].getDescString();
	}
	if(temp=="")
		temp="<option value=no>没有满足条件的卡号";
	return temp;
}
//获取挂失下挂卡选择串
function accountList_getRptLossCardOptionString(cardOwnerMark,sysMark,areacode,regmode)
{
	var temp="";
	var acctTypes="|003|001|002|004|007|008|011|995|996|997|998|999|";//011 added by zw 银行户口项目增加支持4种卡类型:定期一本通996、零存整取998、存本取息997、995教育储蓄账户的账号 999支持活期注册账户
	if(!(sysMark=="00"||sysMark=="10"))
		acctTypes="|001|002|004|007|008|011|";//011 added by zw

	var cardbinstr= dyTopFrame.cardBinList.SupportCardBin(4);
	var cardbin="";
	for(var i=0;i<this.data.length;i++)
	{
		var ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
		cardbin="|"+dyTopFrame.cardBinList.getCardBin(this.data[i].cardNum)+"|";
		if(acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
				&& cardbinstr.indexOf(cardbin)==-1
				&&(areacode==""||(this.data[i].areaCode==areacode))
				&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
				&&( ret == "0"
						|| ret == "1" || ret == "2" || ret == "3"
						|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
			temp+="<option value="+i+">"+this.data[i].getDescString();
	}
	if(temp=="")
		temp="<option value=no>没有满足条件的卡号";
	return temp;
}

//获取挂失下挂账户选择串
function accountList_getRptLossAccountOptionString(cardOwnerMark,areacode,regmode)
{
	var temp="";
	var acctTypes="|01|02|03|04|05|07|08|16|21|22|";
	for(var i=0;i<this.data.length;i++)
	{
		var ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
		if(this.data[i].acctType=="003"
				&&this.data[i].isQryAcctList=="0"
				&& this.data[i].isRegistedCard==true
				&&(areacode==""||(this.data[i].areaCode==areacode))
				&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
				&&( ret == "0"
						|| ret == "1" || ret == "2" || ret == "3"
						|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
			//if(this.data[i].acctCode!="000")
				temp+="<option value="+i+">"+this.data[i].getDescString();
		if(this.data[i].isRegistedCard==false)
			if(acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
					&&(areacode==""||(this.data[i].areaCode==areacode))
					&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
					&&( ret == "0"
							|| ret == "1" || ret == "2" || ret == "3"
							|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
				temp+="<option value="+i+">"+this.data[i].getDescString();
	}
	if(temp=="")
		temp="<option value=no>没有满足条件的卡号";
	return temp;
}
//获取查询未登折明细选择串
function accountList_getUnprintOptionString(cardOwnerMark,sysMark,isReg,areacode,regmode)
{
	var temp="";
	var acctTypes="|003|01|04|05|";
	if(sysMark!="00"&&sysMark!="10"){
		acctTypes="|003|";
	}else if(sysMark=="00"||sysMark=="10"){
		if(isReg=="0")
			acctTypes="|003|";
		else
			acctTypes="|01|04|05|";
	}
	for(var i=0;i<this.data.length;i++)
	{
		var ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
		if(acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
				&&(areacode==""||(this.data[i].areaCode==areacode))
				&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
				&&( ret == "0"
						|| ret == "1" || ret == "2" || ret == "3"
						|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
				temp+="<option value="+i+">"+this.data[i].getDescString();
	}
	if(temp=="")
		temp="<option value=no>没有满足条件的卡号";
	return temp;
}

//获得用于select中的option的字符串：全部账户，包括注册卡
//参数：	cardOwner：可选项
//		如果不输，则返回账户列表中所有账户的选择串，否则选择只选择所有者为cardOwner的账户的选择串
//
function accountList_getOptionString(cardOwnerMark,cardOwner,areacode,regmode)
{
	var temp="";
	var ret="";
	if(cardOwner=="undefined"||cardOwner==null||cardOwner=="")
	{
		for(var i=0;i<this.data.length;i++){
			//if(this.data[i].acctCode!="000")
			ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
			if(areacode==""||(this.data[i].areaCode==areacode)
					&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
					&&( ret == "0"
							|| ret == "1" || ret == "2" || ret == "3"
							|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
				temp+="<option value="+i+">"+this.data[i].getDescString();
	}
	}
	else
	{
		for(var j=0;j<this.data.length;j++)
		{
			if(this.data[j].cardOwnerMark!=cardOwner)
				continue;
			//if(this.data[i].acctCode!="000")
			ret = compareMarkAndType(this.data[j].cardOwnerMark ,cardOwnerMark,this.data[j].cardOwnerType);
			if(areacode==""||(this.data[j].areaCode==areacode)
					&&(regmode==null||regmode==""||(this.data[j].regMode==regmode))
					&&( ret == "0"
							|| ret == "1" || ret == "2" || ret == "3"
							|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
				temp+="<option value="+j+">"+this.data[j].getDescString();
		}
	}
	return temp;
}
//获得用于select中的option的字符串：特定的账户类型
//参数：	strTypes：类型列表，各种类型之间用"|"分开
//	included
//		true:特定类型的账户
//		false:特定类型账户之外的账户
//	isNotBussinessCard
//		true:只显示非商务卡
//		false:显示商务卡在内的卡或账户
function accountList_getTypedOptionString(cardOwnerMark,acctTypes,included,areacode,regmode,AsiaState,auth,isRegistedCard,isNotBussinessCard,cardIndex,agrFlag)
{
	var temp="";
	var ret="";
	if(acctTypes=="undefined"||acctTypes==null||acctTypes=="")
		return "";

	if(included)
	{
		for(var i=0;i<this.data.length;i++){
			ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
			if(this.data[i].acctType.indexOf("A")==-1
					&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
					&&(areacode==""||(this.data[i].areaCode==areacode))
					&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
					&&( ret == "0"
							|| ret == "1" || ret == "2" || ret == "3"
							|| ret == "4" || ret == "5" || ret == "6" || ret == "8")
					&&(isRegistedCard==null||isRegistedCard==""||(this.data[i].isRegistedCard==isRegistedCard))
					&&(isNotBussinessCard==null
							||isNotBussinessCard==""
							||isNotBussinessCard==false
							||(accountList_isBussinessCard(this.data[i].cardNum)!=isNotBussinessCard))
					&&(agrFlag==null||agrFlag==""||(this.data[i].agrFlag==agrFlag))){
   			    if(cardIndex!=null && this.data[i].cardNum == cardIndex){
			    	isSelected = "selected";
			    }else{
			    	isSelected = "";
			    }
			    temp+="<option value="+i+" "+isSelected+">"+this.data[i].getDescString();
			}else if(this.data[i].acctType.indexOf("A")!=-1
		    		&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
		    		&&(AsiaState!=null&&AsiaState.indexOf("|"+this.data[i].acctProp+"|")!=-1)
		    		&&(auth==null||auth==""||((this.data[i].auth).substring(0,2)==auth))
		    		&&(agrFlag==null||agrFlag==""||(this.data[i].agrFlag==agrFlag))){
			    if(cardIndex!=null && this.data[i].cardNum == cardIndex){
			    	isSelected = "selected";
			    }else{
			    	isSelected = "";
			    }
			    temp+="<option value="+i+" "+isSelected+">"+this.data[i].getDescString();
			}
		}

	}
	else
	{
		for(var j=0;j<this.data.length;j++){
			ret = compareMarkAndType(this.data[j].cardOwnerMark ,cardOwnerMark,this.data[j].cardOwnerType);
			if(this.data[j].acctType.indexOf("A")==-1
					&&acctTypes.indexOf("|"+this.data[j].acctType+"|")==-1
					&&(areacode==""||(this.data[j].areaCode==areacode))
					&&(regmode==null||regmode==""||(this.data[j].regMode==regmode))
					&&( ret == "0"
							|| ret == "1" || ret == "2" || ret == "3"
							|| ret == "4" || ret == "5" || ret == "6" || ret == "8")
					&&(isRegistedCard==null||isRegistedCard==""||(this.data[j].isRegistedCard==isRegistedCard))
					&&(isNotBussinessCard==null
							||isNotBussinessCard==""
							||isNotBussinessCard==false
							||(accountList_isBussinessCard(this.data[j].cardNum)!=isNotBussinessCard))){
			    if(cardIndex!=null && this.data[j].cardNum == cardIndex){
			    	isSelected = "selected";
			    }else{
			    	isSelected = "";
			    }
			    temp+="<option value="+j+" "+isSelected+">"+this.data[j].getDescString();
		   } else if(this.data[j].acctType.indexOf("A")!=-1
		    		&&acctTypes.indexOf("|"+this.data[j].acctType+"|")==-1
		    		&&(AsiaState!=null&&AsiaState.indexOf("|"+this.data[j].acctProp+"|")!=-1)
		    		&&(auth==null||auth==""||((this.data[j].auth).substring(0,2)==auth))){
			    if(cardIndex!=null && this.data[j].cardNum == cardIndex){
			    	isSelected = "selected";
			    }else{
			    	isSelected = "";
			    }
			    temp+="<option value="+j+" "+isSelected+">"+this.data[j].getDescString();
			}
	}
	}

	if(temp=="")
		temp="<option value=no>没有满足条件的卡（账）号";
	return temp;
}
//资金自动归集筛选调用旧的该方法。
function accountList_getTypedOptionString_old(cardOwnerMark,acctTypes,included,areacode,regmode,AsiaState,auth,isRegistedCard,isNotBussinessCard)
{
	var temp="";
	if(acctTypes=="undefined"||acctTypes==null||acctTypes=="")
		return "";

	if(included)
	{
		for(var i=0;i<this.data.length;i++)
			if(this.data[i].acctType.indexOf("A")==-1&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1&&(areacode==""||(this.data[i].areaCode==areacode))&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))&&(cardOwnerMark==null||cardOwnerMark==""||(this.data[i].cardOwnerMark==cardOwnerMark))&&(isRegistedCard==null||isRegistedCard==""||(this.data[i].isRegistedCard==isRegistedCard))&&(isNotBussinessCard==null||isNotBussinessCard==""||isNotBussinessCard==false||(accountList_isBussinessCard(this.data[i].cardNum)!=isNotBussinessCard)))
		        temp+="<option value="+i+">"+this.data[i].getDescString();
		    else if(this.data[i].acctType.indexOf("A")!=-1&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1&&(AsiaState!=null&&AsiaState.indexOf("|"+this.data[i].acctProp+"|")!=-1)&&(auth==null||auth==""||((this.data[i].auth).substring(0,2)==auth)))
		        temp+="<option value="+i+">"+this.data[i].getDescString();

	}
	else
	{
		for(var i=0;i<this.data.length;i++)
			if(this.data[i].acctType.indexOf("A")==-1&&acctTypes.indexOf("|"+this.data[i].acctType+"|")==-1&&(areacode==""||(this.data[i].areaCode==areacode))&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))&&(cardOwnerMark==null||cardOwnerMark==""||(this.data[i].cardOwnerMark==cardOwnerMark))&&(isRegistedCard==null||isRegistedCard==""||(this.data[i].isRegistedCard==isRegistedCard))&&(isNotBussinessCard==null||isNotBussinessCard==""||isNotBussinessCard==false||(accountList_isBussinessCard(this.data[i].cardNum)!=isNotBussinessCard)))
		        temp+="<option value="+i+">"+this.data[i].getDescString();
		    else if(this.data[i].acctType.indexOf("A")!=-1&&acctTypes.indexOf("|"+this.data[i].acctType+"|")==-1&&(AsiaState!=null&&AsiaState.indexOf("|"+this.data[i].acctProp+"|")!=-1)&&(auth==null||auth==""||((this.data[i].auth).substring(0,2)==auth)))
		        temp+="<option value="+i+">"+this.data[i].getDescString();
	}

	if(temp=="")
		temp="<option value=no>没有满足条件的卡（账）号";
	return temp;
}
//资金自动归集筛选注册卡及他行帐户卡
function accountList_getTypedAndIbpOptionString(cardOwnerMark,acctTypes,areacode,regmode,owner_openflag,unowner_openflag,tr_openflag,ibpTypeStr1,ibpTypeStr2,objvalue)
{

	var i;
	var temp="";
	var ret = "";
	if(acctTypes=="undefined"||acctTypes==null||acctTypes=="")
		return "";

	//根据开关添加option
	if(owner_openflag==0 && unowner_openflag==0){//（0：关闭 1：开通）
		temp="<option value=no>没有满足条件的卡（账）号";

	}else{


		if(1==unowner_openflag && 1==owner_openflag){
			cardOwnerMark="";
			for(i=0;i<this.data.length;i++){
				ret = compareMarkAndType(this.data[i].cardOwnerMark,cardOwnerMark,this.data[i].cardOwnerType);

				if(this.data[i].acctType.indexOf("A")==-1
						&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
						&&(areacode==""||(this.data[i].areaCode==areacode))
						&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
						&&( ret == "0"
							|| ret == "1" || ret == "2" || ret == "3"
							|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
			      temp+="<option value="+i+">"+this.data[i].getDescString();
				else if(this.data[i].acctType.indexOf("A")!=-1
						&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1)
			      temp+="<option value="+i+">"+this.data[i].getDescString();
			}

		}else if(1==owner_openflag){
			cardOwnerMark=0;
			for(i=0;i<this.data.length;i++){
				ret = compareMarkAndType(this.data[i].cardOwnerMark,cardOwnerMark,this.data[i].cardOwnerType);

				if(this.data[i].acctType.indexOf("A")==-1
						&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
						&&(areacode==""||(this.data[i].areaCode==areacode))
						&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
						&&( ret == "0"
								|| ret == "1" || ret == "2" || ret == "3"
								|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
				      temp+="<option value="+i+">"+this.data[i].getDescString();
				else if(this.data[i].acctType.indexOf("A")!=-1
						&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1)
				      temp+="<option value="+i+">"+this.data[i].getDescString();
			}

		}else if(1==unowner_openflag){
			cardOwnerMark=0;
			for(i=0;i<this.data.length;i++){
				ret = compareMarkAndType(this.data[i].cardOwnerMark,cardOwnerMark,this.data[i].cardOwnerType);

				if(this.data[i].acctType.indexOf("A")==-1
						&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
						&&(areacode==""||(this.data[i].areaCode==areacode))
						&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
						&&( ret == "0"
								|| ret == "1" || ret == "2" || ret == "3"
								|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
				      temp+="<option value="+i+">"+this.data[i].getDescString();
				else if(this.data[i].acctType.indexOf("A")!=-1
						&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1)
				      temp+="<option value="+i+">"+this.data[i].getDescString();
			}
		}
	}

	//网银互联账户的添加
	try{
		if(objvalue==0)//保留余额
			temp+=ibpTypeStr2;
		else if(objvalue==1)//固定金额
			temp+=ibpTypeStr1;
	}catch(Exception){}

	//加入他人帐户（0：关闭 1：开通）
	if(tr_openflag==1){
	temp+="<option value=write>请选择或手工输入他人工行账户";
	}

	if(temp=="")
		temp="<option value=no>没有满足条件的卡（账）号";
	return temp;
}
function accountList_getTypedAndIbpOptionCardString(cardOwnerMark,acctTypes,areacode,regmode,owner_openflag,unowner_openflag,tr_openflag,ibpTypeStr1,ibpTypeStr2,objvalue)
{
	
	var i;
	var temp="";
	var ret = "";
	if(acctTypes=="undefined"||acctTypes==null||acctTypes=="")
		return "";
	
	//根据开关添加option
	if(owner_openflag==0 && unowner_openflag==0){//（0：关闭 1：开通）
		temp="<option value=no>没有满足条件的卡（账）号";
		
	}else{
		
		
		if(1==unowner_openflag && 1==owner_openflag){
			cardOwnerMark="";
			for(i=0;i<this.data.length;i++){
				ret = compareMarkAndType(this.data[i].cardOwnerMark,cardOwnerMark,this.data[i].cardOwnerType);
				
				if(this.data[i].acctType.indexOf("A")==-1
						&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
						&&(areacode==""||(this.data[i].areaCode==areacode))
						&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
						&&( ret == "0"
							|| ret == "1" || ret == "2" || ret == "3"
								|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
					temp+="<option value="+i+">"+this.data[i].cardNum;
				else if(this.data[i].acctType.indexOf("A")!=-1
						&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1)
					temp+="<option value="+i+">"+this.data[i].cardNum;
			}
			
		}else if(1==owner_openflag){
			cardOwnerMark=0;
			for(i=0;i<this.data.length;i++){
				ret = compareMarkAndType(this.data[i].cardOwnerMark,cardOwnerMark,this.data[i].cardOwnerType);
				
				if(this.data[i].acctType.indexOf("A")==-1
						&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
						&&(areacode==""||(this.data[i].areaCode==areacode))
						&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
						&&( ret == "0"
							|| ret == "1" || ret == "2" || ret == "3"
								|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
					temp+="<option value="+i+">"+this.data[i].cardNum;
				else if(this.data[i].acctType.indexOf("A")!=-1
						&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1)
					temp+="<option value="+i+">"+this.data[i].cardNum;
			}
			
		}else if(1==unowner_openflag){
			cardOwnerMark=0;
			for(i=0;i<this.data.length;i++){
				ret = compareMarkAndType(this.data[i].cardOwnerMark,cardOwnerMark,this.data[i].cardOwnerType);
				
				if(this.data[i].acctType.indexOf("A")==-1
						&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
						&&(areacode==""||(this.data[i].areaCode==areacode))
						&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
						&&( ret == "0"
							|| ret == "1" || ret == "2" || ret == "3"
								|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
					temp+="<option value="+i+">"+this.data[i].cardNum;
				else if(this.data[i].acctType.indexOf("A")!=-1
						&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1)
					temp+="<option value="+i+">"+this.data[i].cardNum;
			}
		}
	}
	
	//网银互联账户的添加
	try{
		if(objvalue==0)//保留余额
			temp+=ibpTypeStr2;
		else if(objvalue==1)//固定金额
			temp+=ibpTypeStr1;
	}catch(Exception){}
	
	//加入他人帐户（0：关闭 1：开通）
	if(tr_openflag==1){
		temp+="<option value=write>请选择或手工输入他人工行账户";
	}
	
	if(temp=="")
		temp="<option value=no>没有满足条件的卡（账）号";
	return temp;
}
//个性化定制，而copy的上边的函数进行修改
//获得用于select中的option的字符串：特定的账户类型
//参数：	strTypes：类型列表，各种类型之间用"|"分开
//	included
//		true:特定类型的账户
//		false:特定类型账户之外的账户
//	isNotBussinessCard
//		true:只显示非商务卡
//		false:显示商务卡在内的卡或账户
function accountList_getTypedOptionStringForCust(cardOwnerMark,acctTypes,included,areacode,regmode,AsiaState,auth,isRegistedCard,isNotBussinessCard,currentArea)
{
	var temp="";
	var ret="";
	if(acctTypes=="undefined"||acctTypes==null||acctTypes=="")
		return "";

	if(included)
	{
		//当前业务地
		for(var i=0;i<this.data.length;i++){
			ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
			if(this.data[i].acctType.indexOf("A")==-1
					&& acctTypes.indexOf("|" + this.data[i].acctType + "|") != -1
					&& (areacode == "" || (this.data[i].areaCode == areacode))
					&& (regmode == null || regmode == "" || (this.data[i].regMode == regmode))
					&& ( ret == "0"
							|| ret == "1" || ret == "2" || ret == "3"
							|| ret == "4" || ret == "5" || ret == "6" || ret == "8")
					&& (isRegistedCard == null
							|| isRegistedCard == ""
							|| (this.data[i].isRegistedCard == isRegistedCard))
					&& (isNotBussinessCard == null
							|| isNotBussinessCard == ""
							|| isNotBussinessCard == false
							|| (accountList_isBussinessCard(this.data[i].cardNum) != isNotBussinessCard))
					&& (this.data[i].areaCode == currentArea))
		        temp+="<option value="+i+">"+this.data[i].getDesc();
		    else if(this.data[i].acctType.indexOf("A")!=-1
		    		&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
		    		&&(AsiaState!=null&&AsiaState.indexOf("|"+this.data[i].acctProp+"|")!=-1)
		    		&&(auth==null||auth==""||((this.data[i].auth).substring(0,2)==auth))
		    		&&(this.data[i].areaCode==currentArea))
		        temp+="<option value="+i+">"+this.data[i].getDesc();
		}
		//非当前业务地
		for(var j=0;j<this.data.length;j++){
			ret = compareMarkAndType(this.data[j].cardOwnerMark ,cardOwnerMark,this.data[j].cardOwnerType);
			if(this.data[j].acctType.indexOf("A")==-1
					&&acctTypes.indexOf("|"+this.data[j].acctType+"|")!=-1
					&&(areacode==""||(this.data[j].areaCode==areacode))
					&&(regmode==null||regmode==""||(this.data[j].regMode==regmode))
					&&( ret == "0"
							|| ret == "1" || ret == "2" || ret == "3"
							|| ret == "4" || ret == "5" || ret == "6" || ret == "8")
					&&(isRegistedCard==null||isRegistedCard==""||(this.data[j].isRegistedCard==isRegistedCard))
					&&(isNotBussinessCard==null
							||isNotBussinessCard==""
							||isNotBussinessCard==false
							||(accountList_isBussinessCard(this.data[j].cardNum)!=isNotBussinessCard))
					&&(this.data[j].areaCode!=currentArea))
		        temp+="<option value="+j+">"+this.data[j].getDesc();
		    else if(this.data[j].acctType.indexOf("A")!=-1
		    		&&acctTypes.indexOf("|"+this.data[j].acctType+"|")!=-1
		    		&&(AsiaState!=null&&AsiaState.indexOf("|"+this.data[j].acctProp+"|")!=-1)
		    		&&(auth==null||auth==""||((this.data[j].auth).substring(0,2)==auth))
		    		&&(this.data[j].areaCode!=currentArea))
		        temp+="<option value="+j+">"+this.data[j].getDesc();
	}
	}
	else
	{
		//当前业务地
		for(var m=0;m<this.data.length;m++){
			ret = compareMarkAndType(this.data[m].cardOwnerMark ,cardOwnerMark,this.data[m].cardOwnerType);
			if(this.data[m].acctType.indexOf("A")==-1
					&&acctTypes.indexOf("|"+this.data[m].acctType+"|")==-1
					&&(areacode==""||(this.data[m].areaCode==areacode))
					&&(regmode==null||regmode==""||(this.data[m].regMode==regmode))
					&&( ret == "0"
							|| ret == "1" || ret == "2" || ret == "3"
							|| ret == "4" || ret == "5" || ret == "6" || ret == "8")
					&&(isRegistedCard==null||isRegistedCard==""||(this.data[m].isRegistedCard==isRegistedCard))
					&&(isNotBussinessCard==null
							||isNotBussinessCard==""
							||isNotBussinessCard==false
							||(accountList_isBussinessCard(this.data[m].cardNum)!=isNotBussinessCard))
					&&(this.data[m].areaCode==currentArea))
		        temp+="<option value="+m+">"+this.data[m].getDesc();
		    else if(this.data[m].acctType.indexOf("A")!=-1
		    		&&acctTypes.indexOf("|"+this.data[m].acctType+"|")==-1
		    		&&(AsiaState!=null&&AsiaState.indexOf("|"+this.data[m].acctProp+"|")!=-1)
		    		&&(auth==null||auth==""||((this.data[m].auth).substring(0,2)==auth))
		    		&&(this.data[m].areaCode==currentArea))
		        temp+="<option value="+m+">"+this.data[m].getDesc();
		}
			//非当前业务地
		for(var n=0;n<this.data.length;n++){
			ret = compareMarkAndType(this.data[n].cardOwnerMark ,cardOwnerMark,this.data[n].cardOwnerType);
			if(this.data[n].acctType.indexOf("A")==-1
					&&acctTypes.indexOf("|"+this.data[n].acctType+"|")==-1
					&&(areacode==""||(this.data[n].areaCode==areacode))
					&&(regmode==null||regmode==""||(this.data[n].regMode==regmode))
					&&( ret == "0"
							|| ret == "1" || ret == "2" || ret == "3"
							|| ret == "4" || ret == "5" || ret == "6" || ret == "8")
					&&(isRegistedCard==null||isRegistedCard==""||(this.data[n].isRegistedCard==isRegistedCard))
					&&(isNotBussinessCard==null
							||isNotBussinessCard==""
							||isNotBussinessCard==false
							||(accountList_isBussinessCard(this.data[n].cardNum)!=isNotBussinessCard))
					&&(this.data[n].areaCode!=currentArea))
		        temp+="<option value="+n+">"+this.data[n].getDesc();
		    else if(this.data[n].acctType.indexOf("A")!=-1&&acctTypes.indexOf("|"+this.data[n].acctType+"|")==-1&&(AsiaState!=null&&AsiaState.indexOf("|"+this.data[n].acctProp+"|")!=-1)&&(auth==null||auth==""||((this.data[n].auth).substring(0,2)==auth))&&(this.data[n].areaCode!=currentArea))
		        temp+="<option value="+n+">"+this.data[n].getDesc();
	}
	}

	if(temp=="")
		temp="<option value=no>没有满足条件的卡（账）号";
	return temp;
}

//add fengl 屏蔽商务卡
//屏蔽业务地区内管开关为关的卡 add by lijh1

function accountList_getGoldTypedOptionString(cardOwnerMark,acctTypes,areacode,regmode,isRegist,registAcctType,AsiaState,auth,isRegistedCard)
 {
	var temp = "";
	if (isRegist == null || isRegist == ''
			|| isRegist == 'undefined')
		isRegist = false;
	else if(isRegist && (registAcctType == null || registAcctType == ''))
			return "";

	if (acctTypes == "undefined" || acctTypes == null || acctTypes == "")
		return "";
	var cardSeq = 0;
	var areacodes = "";
	if(isRegist){
		for ( var k = 0; k < this.data.length; k++) {	//过滤出已开户的地区
			ret = compareMarkAndType(this.data[k].cardOwnerMark, cardOwnerMark,
					this.data[k].cardOwnerType);
			if(!this.data[k].isRegistedCard && (ret == "0" || ret == "1" || ret == "2" || ret == "3"
				|| ret == "4" || ret == "5" || ret == "6" || ret == "8")){
				if(this.data[k].acctType == registAcctType){
					areacodes = this.data[cardSeq].areaCode;
					areacodes = "|"+areacodes+"|";
				}
			}else
				cardSeq = k;
		}
	}

	for ( var i = 0; i < this.data.length; i++) {
		ret = compareMarkAndType(this.data[i].cardOwnerMark, cardOwnerMark,
				this.data[i].cardOwnerType);
		if (this.data[i].acctType.indexOf("A") == -1
				&& (areacodes == null || areacodes == "" || (areacodes
						.indexOf("|" + this.data[i].areaCode + "|") == -1))
				&& !accountList_isBussinessCard(this.data[i].cardNum)
				&& acctTypes.indexOf("|" + this.data[i].acctType + "|") != -1
				&& (areacode == null||areacode == "" || (this.data[i].areaCode == areacode))
				&& (regmode == null || regmode == "" || (this.data[i].regMode == regmode))
				&& (ret == "0" || ret == "1" || ret == "2" || ret == "3"
						|| ret == "4" || ret == "5" || ret == "6" || ret == "8")
				&& (isRegistedCard == null || isRegistedCard == "" || (this.data[i].isRegistedCard == isRegistedCard))
				&& this.data[i].acctProp != "001")
			temp += "<option value=" + i + ">" + this.data[i].getDescString();
		else if (this.data[i].acctType.indexOf("A") != -1
				&& (areacodes == null || areacodes == "" || areacodes
						.indexOf("|" + this.data[i].areaCode + "|") == -1)
				&& !accountList_isBussinessCard(this.data[i].cardNum)
				&& acctTypes.indexOf("|" + this.data[i].acctType + "|") != -1
				&& (AsiaState != null && AsiaState.indexOf("|"
						+ this.data[i].acctProp + "|") != -1)
				&& (auth == null || auth == "" || ((this.data[i].auth)
						.substring(0, 2) == auth)))
			temp += "<option value=" + i + ">" + this.data[i].getDescString();
	}

	if (temp == "")
		temp = "<option value=no>没有满足条件的卡（账）号";
	return temp;
}

// tianf
// 根据已有卡号初始化卡列表
function accountList_getTypedOptionStringSelected(cardOwnerMark,acctTypes,selValue,areacode,regmode)
{
	var temp="";
	if(acctTypes=="undefined"||acctTypes==null||acctTypes=="")
		return "";


	for(var i=0;i<this.data.length;i++)
	{
		var ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
		if(acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
				&&(areacode==""||(this.data[i].areaCode==areacode))
				&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
				&&( ret == "0"
						|| ret == "1" || ret == "2" || ret == "3"
						|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
		{
			if(this.data[i].getDescString()==selValue)
			temp+="<option value="+i+" selected>"+this.data[i].getDescString();
			else
			temp+="<option value="+i+">"+this.data[i].getDescString();
		}
	}


	if(temp=="")
		temp="<option value=no>没有满足条件的卡号";
	return temp;
}

//外汇 add by ml
function accountList_ForeigngetTypedOptionString(cardOwnerMark,acctTypes,included,cardfld,areacode,regmode)
{
	var temp="";
	var ret="";
	if(acctTypes=="undefined"||acctTypes==null||acctTypes=="")
		return "";

	if(included)
	{
		for(var i=0;i<this.data.length;i++)
		{
			ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
			if((acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1)
				&&(areacode==""||(this.data[i].areaCode==areacode))
				&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
				&&( ret == "0"
						|| ret == "1" || ret == "2" || ret == "3"
						|| ret == "4" || ret == "5" || ret == "6" || ret == "8")){
			for(var j=0;j<this.data.length;j++)
			{
			//	if((this.data[j].cardNum==this.data[i].cardNum)
			//	&&(((this.data[j].acctCode=='000')||(this.data[j].acctCode=='00000')
		//			&&(this.data[j].acctProp!='001'))||this.data[j].acctType=='999')){
		if(!this.data[j].isRegistedCard&&this.data[j].cardNum==this.data[i].cardNum&&this.data[j].acctType=='01'&&this.data[j].acctProp!='001'
				   ||this.data[j].acctType=='999'){
				if(this.data[i].cardNum==cardfld)
				temp+="<option selected value="+i+">"+this.data[i].getDescString();
				else
				temp+="<option value="+i+">"+this.data[i].getDescString();
	break;
			 }
		}
	}
		}
	}
	else
	{
		for(var m=0;m<this.data.length;m++)
		{
			ret = compareMarkAndType(this.data[m].cardOwnerMark ,cardOwnerMark,this.data[m].cardOwnerType);
			if((acctTypes.indexOf("|"+this.data[m].acctType+"|")==-1)
					&&(areacode==""||(this.data[m].areaCode==areacode))
					&&(regmode==null||regmode==""||(this.data[m].regMode==regmode))
					&&( ret == "0"
							|| ret == "1" || ret == "2" || ret == "3"
							|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
			{
				if(this.data[m].cardNum==cardfld)
				temp+="<option selected value="+m+">"+this.data[m].getDescString();
			  else
				temp+="<option value="+m+">"+this.data[m].getDescString();
			}
		}
	}
	if(temp=="")
		temp="<option value=no>---没有满足条件的卡号---";
	return temp;
}

/**
 * 账户原油--显示卡号函数，显示下挂基本户为多币种账户的卡号或存折号 modified by suny01
 * @param {String} cardOwnerMark
 * @param {String} acctTypes
 * @param {String} included
 * @param {String} cardfld
 * @param {String} areacode
 * @param {String} regmode
 * @param {String} delAct 需要排除显示的卡号，如果为空或未定义则显示所有符合其他条件的卡/账号
 * @return {json}  option内容对象
 */
function accountList_ForeigngetTypedOptionStringDelAcct(cardOwnerMark,acctTypes,included,cardfld,areacode,regmode,delAct)
{
	var temp="";
	var ret="";
	if(acctTypes=="undefined"||acctTypes==null||acctTypes=="")
		return "";
	for(var i=0;i<this.data.length;i++)
	{
		ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
		if((acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1)
			&&(areacode==""||(this.data[i].areaCode==areacode))
			&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
			&&( ret == "0"
					|| ret == "1" || ret == "2" || ret == "3"
					|| ret == "4" || ret == "5" || ret == "6" || ret == "8")) {
			for(var j=0;j<this.data.length;j++)
			{
				if((this.data[j].cardNum==this.data[i].cardNum)
						&&(((this.data[j].acctCode=='000'||this.data[j].acctCode=='00000')&&(this.data[j].acctProp!='001'))||this.data[j].acctType=='999') 
						&&(delAct == "" || delAct == undefined || delAct == null  || this.data[j].cardNum != delAct))
				{
					if(this.data[i].cardNum==cardfld)
						temp+="<option selected value="+i+">"+this.data[i].getDescString();
					else
						temp+="<option value="+i+">"+this.data[i].getDescString();
				 }
			}
		}
	}
	if(temp=="")
		temp="<option value=no>---没有满足条件的卡号---";
	return temp;
}




function accountList_getTypedOptionStringDelAcct(cardOwnerMark,acctTypes,included,areacode,delAct,nullflag,delAct1,regmode,AsiaState,auth,isRegistedCard,isNotBussinessCard,cardIndex,agrFlag)
{
	var temp="";
	var ret="";
	if(acctTypes=="undefined"||acctTypes==null||acctTypes=="")
		return "";

	if(included)
	{
		for(var i=0;i<this.data.length;i++){
			ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
			if(this.data[i].acctType.indexOf("A")==-1
					&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
					&&(areacode==""||(this.data[i].areaCode==areacode))
					&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
					&&( ret == "0"
							|| ret == "1" || ret == "2" || ret == "3"
							|| ret == "4" || ret == "5" || ret == "6" || ret == "8")
					&&(isRegistedCard==null||isRegistedCard==""||(this.data[i].isRegistedCard==isRegistedCard))
					&&(isNotBussinessCard==null
							||isNotBussinessCard==""
							||isNotBussinessCard==false
							||(accountList_isBussinessCard(this.data[i].cardNum)!=isNotBussinessCard))
					&&(agrFlag==null||agrFlag==""||(this.data[i].agrFlag==agrFlag))
					&&(delAct == "" || delAct == undefined || delAct == null  || this.data[i].cardNum != delAct)
					&&(delAct1 == "" || delAct1 == undefined || delAct1 == null  || this.data[i].cardNum != delAct1)
			){
   			    if(cardIndex!=null && this.data[i].cardNum == cardIndex){
			    	isSelected = "selected";
			    }else{
			    	isSelected = "";
			    }
			    temp+="<option value="+i+" "+isSelected+">"+this.data[i].getDescString();
			}else if(this.data[i].acctType.indexOf("A")!=-1
		    		&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
		    		&&(AsiaState!=null&&AsiaState.indexOf("|"+this.data[i].acctProp+"|")!=-1)
		    		&&(auth==null||auth==""||((this.data[i].auth).substring(0,2)==auth))
		    		&&(agrFlag==null||agrFlag==""||(this.data[i].agrFlag==agrFlag))){
			    if(cardIndex!=null && this.data[i].cardNum == cardIndex){
			    	isSelected = "selected";
			    }else{
			    	isSelected = "";
			    }
			    temp+="<option value="+i+" "+isSelected+">"+this.data[i].getDescString();
			}
		}

	}
	else
	{
		for(var j=0;j<this.data.length;j++){
			ret = compareMarkAndType(this.data[j].cardOwnerMark ,cardOwnerMark,this.data[j].cardOwnerType);
			if(this.data[j].acctType.indexOf("A")==-1
					&&acctTypes.indexOf("|"+this.data[j].acctType+"|")==-1
					&&(areacode==""||(this.data[j].areaCode==areacode))
					&&(regmode==null||regmode==""||(this.data[j].regMode==regmode))
					&&( ret == "0"
							|| ret == "1" || ret == "2" || ret == "3"
							|| ret == "4" || ret == "5" || ret == "6" || ret == "8")
					&&(isRegistedCard==null||isRegistedCard==""||(this.data[j].isRegistedCard==isRegistedCard))
					&&(isNotBussinessCard==null
							||isNotBussinessCard==""
							||isNotBussinessCard==false
							||(accountList_isBussinessCard(this.data[j].cardNum)!=isNotBussinessCard))
					&&(delAct == "" || delAct == undefined || delAct == null  || this.data[j].cardNum != delAct)		
			){
			    if(cardIndex!=null && this.data[j].cardNum == cardIndex){
			    	isSelected = "selected";
			    }else{
			    	isSelected = "";
			    }
			    temp+="<option value="+j+" "+isSelected+">"+this.data[j].getDescString();
		   } else if(this.data[j].acctType.indexOf("A")!=-1
		    		&&acctTypes.indexOf("|"+this.data[j].acctType+"|")==-1
		    		&&(AsiaState!=null&&AsiaState.indexOf("|"+this.data[j].acctProp+"|")!=-1)
		    		&&(auth==null||auth==""||((this.data[j].auth).substring(0,2)==auth))){
			    if(cardIndex!=null && this.data[j].cardNum == cardIndex){
			    	isSelected = "selected";
			    }else{
			    	isSelected = "";
			    }
			    temp+="<option value="+j+" "+isSelected+">"+this.data[j].getDescString();
			}
	}
	}

	if(temp=="" ){
		
		if( nullflag == "" || nullflag == undefined || nullflag == null){
			temp="";
		}
		else{
			temp="<option value=no>没有满足条件的卡号";
		}
	}
		
	
	
	
	return temp;
}


//获得用于select中的option的字符串：特定的账户类型
//参数：	strTypes：类型列表，各种类型之间用"|"分开
//	included
//		true:特定类型的账户
//		false:特定类型账户之外的账户
//
function accountList_getTypedOptionStringwithCardbin(cardOwnerMark,acctTypes,included,subcardType,cardbinlist,pos,areacode,regmode)
{
	var temp="";
	var ret="";
	if(acctTypes=="undefined"||acctTypes==null||acctTypes=="")
		return "";
	if(included)
	{
		for(var i=0;i<this.data.length;i++)
		{
			ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
			if(acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
					&&(areacode==""||(this.data[i].areaCode==areacode))
					&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
					&&( ret == "0"
							|| ret == "1" || ret == "2" || ret == "3"
							|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
			{
				if(this.data[i].acctType==subcardType)
				{
					for(var j=0;j<cardbinlist.list.length;j++)
					{
						var len = cardbinlist.list[j].cardBin.length;
						var Nowcardbin=this.data[i].cardNum.substr(0,len);
						if ((cardbinlist.list[j].cardBin==Nowcardbin)&&(cardbinlist.list[j].func.substr(pos-1,1)==1))
						{
							temp+="<option value="+i+">"+this.data[i].getDescString();
							//alert(temp);
							break;
						}
					}
				}
				else
					temp+="<option value="+i+">"+this.data[i].getDescString();
			}
		}
	}
	else
	{
		for(var m=0;m<this.data.length;m++)
			ret = compareMarkAndType(this.data[m].cardOwnerMark ,cardOwnerMark,this.data[m].cardOwnerType);
			if(acctTypes.indexOf("|"+this.data[m].acctType+"|")==-1
					&&(areacode==""||(this.data[m].areaCode==areacode))
					&&(regmode==null||regmode==""||(this.data[m].regMode==regmode))
					&&( ret == "0"
							|| ret == "1" || ret == "2" || ret == "3"
							|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
				temp+="<option value="+m+">"+this.data[m].getDescString();
	}
	if(temp=="")
		temp="<option value=no>没有满足条件的卡号";
				//alert(temp);
	return temp;
}

//获得用于select中的option的字符串：特定的账户类型
//排序下拉框中卡号.优先显示acctTypes,稍后显示acctTypes1
//参数：	strTypes：类型列表，各种类型之间用"|"分开
//	included
//		true:特定类型的账户 (目前只支持true的情况,且通过赋值为true来保证只走该分支.)
//与accountList_getTypedOptionStringwithCardbin的差别:
//					排序下拉框中卡号.优先显示acctTypes,稍后显示acctTypes1
function accountList_getTypedOptionStringwithCardbin1(cardOwnerMark,acctTypes,acctTypes1,included,subcardType,cardbinlist,pos,areacode,regmode,cardIndex)
{
	included="true";
	var temp="";
	var temp1="";
	var ret="";
	if((acctTypes=="undefined"||acctTypes==null||acctTypes=="")&&(acctTypes1=="undefined"||acctTypes1==null||acctTypes1==""))
		return "";
	if(included)
	{
		for(var i=0;i<this.data.length;i++)
		{
			ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
			if(acctTypes1.indexOf("|"+this.data[i].acctType+"|")!=-1
					&&(areacode==""||(this.data[i].areaCode==areacode))
					&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
					&&( ret == "0"
							|| ret == "1" || ret == "2" || ret == "3"
							|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
			{
				if(this.data[i].acctType==subcardType)
				{
					for(var j=0;j<cardbinlist.list.length;j++)
					{
						var len = cardbinlist.list[j].cardBin.length;
						var Nowcardbin=this.data[i].cardNum.substr(0,len);
						if ((cardbinlist.list[j].cardBin==Nowcardbin)&&(cardbinlist.list[j].func.substr(pos-1,1)==1))
						{
							temp1+="<option value="+i+">"+this.data[i].getDescString();
							break;
						}
					}
				}
				else
				{
	   			    if(cardIndex!=null && this.data[i].cardNum == cardIndex){
				    	isSelected = "selected";
				    }else{
				    	isSelected = "";
				    }					
					temp1+="<option value="+i+" " + isSelected + ">"+this.data[i].getDescString();
				}
			}else{
			if(acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
					&&(areacode==""||(this.data[i].areaCode==areacode))
					&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
					&&( ret == "0"
							|| ret == "1" || ret == "2" || ret == "3"
							|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
				{
				if(this.data[i].acctType==subcardType)
				{
					for(var m=0;m<cardbinlist.list.length;m++)
					{
						var lenth = cardbinlist.list[m].cardBin.length;
						var CardBin=this.data[i].cardNum.substr(0,lenth);
						if ((cardbinlist.list[m].cardBin==CardBin)&&(cardbinlist.list[m].func.substr(pos-1,1)==1))
						{
							temp+="<option value="+i+">"+this.data[i].getDescString();
							break;
						}
					}
				}
				else
				{
	   			    if(cardIndex!=null && this.data[i].cardNum == cardIndex){
				    	isSelected = "selected";
				    }else{
				    	isSelected = "";
				    }							
					temp+="<option value="+i+" " + isSelected + ">"+this.data[i].getDescString();
				}
			}
			}
		}
	}
	else
	{//目前不支持included为false的情况,未充分测试
		for(var n=0;n<this.data.length;n++){
			ret = compareMarkAndType(this.data[n].cardOwnerMark ,cardOwnerMark,this.data[n].cardOwnerType);
			if(acctTypes.indexOf("|"+this.data[n].acctType+"|")==-1
					&&(areacode==""||(this.data[n].areaCode==areacode))
					&&(regmode==null||regmode==""||(this.data[n].regMode==regmode))
					&&( ret == "0"
							|| ret == "1" || ret == "2" || ret == "3"
							|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
				temp+="<option value="+n+">"+this.data[n].getDescString();
			else{
				if(acctTypes1.indexOf("|"+this.data[n].acctType+"|")==-1
						&&(areacode==""||(this.data[n].areaCode==areacode))
						&&(regmode==null||regmode==""||(this.data[n].regMode==regmode))
						&&( ret == "0"
								|| ret == "1" || ret == "2" || ret == "3"
								|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
					temp1+="<option value="+n+">"+this.data[n].getDescString();
			}
	}
	}
	temp+=temp1;
	if(temp=="")
		temp="<option value=no>没有满足条件的卡号";
				//alert(temp);
	return temp;
}

//获得用于select中的option的字符串：特定的账户类型
//参数：	strTypes：类型列表，各种类型之间用"|"分开
//	included
//		true:特定类型的账户
//		false:特定类型账户之外的账户
//    isECard true 包含e时代卡
function accountList_getSpecialOptionString(cardOwnerMark,acctTypes,included,isECard,areacode,regmode)
{
	var temp="";
	if(acctTypes=="undefined"||acctTypes==null||acctTypes=="")
		return "";
	var cardbinstr= dyTopFrame.cardBinList.SupportCardBin(1);
	var eCardFlag = false;
	var oldCardType = "";
    var newCradType = "";
    var ret="";

	if(included)
	{
	    if(isECard){
		     for(var i=0;i<this.data.length;i++){
		    ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
			if(acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
					&&(areacode==""||(this.data[i].areaCode==areacode))
					&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
					&&( ret == "0"
							|| ret == "1" || ret == "2" || ret == "3"
							|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
				temp+="<option value="+i+">"+this.data[i].getDescString();
		     }

		}else{
		     var cardbin = "";
		     for(var j=0;j<this.data.length;j++){
		    	ret = compareMarkAndType(this.data[j].cardOwnerMark ,cardOwnerMark,this.data[j].cardOwnerType);
		     	cardbin="|"+dyTopFrame.cardBinList.getCardBin(this.data[j].cardNum)+"|";
		     	oldCardType = dyTopFrame.cardBinList.getCardType(this.data[j].cardNum);
		     	newCradType = this.data[j].acctType;
		     	if(oldCardType!=null&&newCradType!=null&&oldCardType=="003"&&newCradType=="011"){
		     	    eCardFlag = true;
		     	}else{
		     	    eCardFlag = false;
		     	}
			    if(acctTypes.indexOf("|"+this.data[j].acctType+"|")!=-1
			    		&&cardbinstr.indexOf(cardbin)==-1
			    		&&!eCardFlag
			    		&&(areacode==""||(this.data[j].areaCode==areacode))
			    		&&(regmode==null||regmode==""||(this.data[j].regMode==regmode))
			    		&&( ret == "0"
								|| ret == "1" || ret == "2" || ret == "3"
								|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
				    temp+="<option value="+j+">"+this.data[j].getDescString();
		     }
		}
	}
	else
	{
		if(isECard){
		   for(var m=0;m<this.data.length;m++){
			ret = compareMarkAndType(this.data[m].cardOwnerMark ,cardOwnerMark,this.data[m].cardOwnerType);
			if(acctTypes.indexOf("|"+this.data[m].acctType+"|")==-1
					&&(areacode==""||(this.data[m].areaCode==areacode))
					&&(regmode==null||regmode==""||(this.data[m].regMode==regmode))
					&&( ret == "0"
							|| ret == "1" || ret == "2" || ret == "3"
							|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
				temp+="<option value="+m+">"+this.data[m].getDescString();
		    }
	    }else{
	         var CardBin = "";
	         for(var n=0;n<this.data.length;n++){
	        	ret = compareMarkAndType(this.data[n].cardOwnerMark ,cardOwnerMark,this.data[n].cardOwnerType);
	           	CardBin="|"+dyTopFrame.cardBinList.getCardBin(this.data[n].cardNum)+"|";
	           	oldCardType = dyTopFrame.cardBinList.getCardType(this.data[n].cardNum);
		     	newCradType = this.data[n].acctType;
		     	if(oldCardType!=null&&newCradType!=null&&oldCardType=="003"&&newCradType=="011"){
		     	    eCardFlag = true;
		     	}else{
		     	    eCardFlag = false;
		     	}
			    if(acctTypes.indexOf("|"+this.data[n].acctType+"|")==-1
			    		&&cardbinstr.indexOf(CardBin)==-1
			    		&&!eCardFlag
			    		&&(areacode==""||(this.data[n].areaCode==areacode))
			    		&&(regmode==null||regmode==""||(this.data[n].regMode==regmode))
			    		&&( ret == "0"
								|| ret == "1" || ret == "2" || ret == "3"
								|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
				    temp+="<option value="+n+">"+this.data[n].getDescString();
			}
		}
	}
	if(temp=="")
		temp="<option value=no>没有满足条件的卡号";
	return temp;
}

function accountList_getSpHangAccountOpString(cardOwnerMark,num,card_num,areacode,regmode){

	var temp="";
	var acctTypes="|01|04|05|16|21|22|00|02|";
	var cardbinstr= dyTopFrame.cardBinList.SupportCardBin(1);
	var ret="";
	if(num==0){
		var cardbin = "";
		for(var m=0;m<this.data.length;m++){
			ret = compareMarkAndType(this.data[m].cardOwnerMark ,cardOwnerMark,this.data[m].cardOwnerType);
			cardbin="|"+dyTopFrame.cardBinList.getCardBin(this.data[m].cardNum)+"|";
			if(((this.data[m].acctType=="011"|| this.data[m].acctType=="003")
					&&cardbinstr.indexOf(cardbin)==-1)
					&&(areacode==""||(this.data[m].areaCode==areacode))
					&&(regmode==null||regmode==""||(this.data[m].regMode==regmode))
					&&( ret == "0"
							|| ret == "1" || ret == "2" || ret == "3"
							|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
				temp+="<option value="+m+">"+this.data[m].getDescString();
		}
		return temp;
	}
	if(num==1){
		var CardBin = "";
		for(var n=0;n<this.data.length;n++){
			ret = compareMarkAndType(this.data[n].cardOwnerMark ,cardOwnerMark,this.data[n].cardOwnerType);
			cardbin="|"+dyTopFrame.cardBinList.getCardBin(this.data[n].cardNum)+"|";
			if(((this.data[n].acctType=="011"
				&&cardbinstr.indexOf(cardbin)==-1)
					|| this.data[n].acctType=="003"
					|| this.data[n].acctType=="008")
				&&(areacode==""||(this.data[n].areaCode==areacode))
				&&(regmode==null||regmode==""||(this.data[n].regMode==regmode))
				&&( ret == "0"
						|| ret == "1" || ret == "2" || ret == "3"
						|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
				temp+="<option value="+n+">"+this.data[n].getDescString();
		}
		return temp;
	}
	for(var i=0;i<this.data.length;i++){
		//if(this.data[i].isQryAcctList=="0" && this.data[i].acctType=="003")
			//temp+="<option value="+i+">"+this.data[i].getDescString();
		ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
		if(this.data[i].isQryAcctList=="1"
			&& this.data[i].isRegistedCard==false
			&& this.data[i].cardNum==card_num
			&&(areacode==""||(this.data[i].areaCode==areacode))
			&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
			&&( ret == "0"
					|| ret == "1" || ret == "2" || ret == "3"
					|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
		{
			//alert("|"+this.data[i].acctType+"|");
			//alert(acctTypes.indexOf("|"+this.data[i].acctType+"|"));
			if(acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1)
			{
				//alert("|"+this.data[i].acctType+"|");
				temp+="<option value="+i+">"+this.data[i].getDescString();
			}
		}
	}
	if(temp=="")
		temp="<option value=no selected>---账户信息待查---";
	//alert(temp);
	return temp;
}



//获得用于select中的option的字符串:注册卡
//参数：	cardOwner：可选项
//		如果不输，则返回账户列表中所有账户的选择串，否则选择只选择所有者为cardOwner的账户的选择串
//
function accountList_getRegCardOptionString(cardOwnerMark,cardOwner,areacode,regmode)
{
	var temp="";
	var ret="";
	if(cardOwner=="undefined"||cardOwner==null||cardOwner=="")
	{
		for(var i=0;i<this.data.length;i++){
			ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
			if(this.data[i].isRegistedCard==true
					&&this.data[i].acctType!="999"
					&&(areacode==""||(this.data[i].areaCode==areacode))
					&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
					&&( ret == "0"
							|| ret == "1" || ret == "2" || ret == "3"
							|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
				temp+="<option value="+i+">"+this.data[i].getDescString();
		}
	}
	else
	{
		for(var j=0;j<this.data.length;j++)
		{
			ret = compareMarkAndType(this.data[j].cardOwnerMark ,cardOwnerMark,this.data[j].cardOwnerType);
			if((this.data[j].isRegistedCard==false||this.data[j].cardOwnerMark!=cardOwner)
					&&(areacode==""||(this.data[j].areaCode==areacode))
					&&(regmode==null||regmode==""||(this.data[j].regMode==regmode))
					&&( ret == "0"
							|| ret == "1" || ret == "2" || ret == "3"
							|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
				continue;
			//if(this.data[i].acctCode!="000")
				temp+="<option value="+j+">"+this.data[j].getDescString();
		}
	}
	return temp;
}
//获得用于select中的option的字符串:注册卡，除去商务卡。因为对外转账，行内汇款，跨行汇款中
//转出账号不能是商务卡

function accountList_getSubRegCardOptionString(cardOwnerMark,num,areacode,regmode)
{
	var temp="";
	var ret="";
	var cardbinstr1= dyTopFrame.cardBinList.SupportCardBin(5);
	var cardbinstr2= dyTopFrame.cardBinList.SupportCardBin(6);
	var cardbinstr3= dyTopFrame.cardBinList.SupportCardBin(15);
	var cardbinstr4= dyTopFrame.cardBinList.SupportCardBin(14);
	//ExceptCardPin1="|458071|451804|";//贷记卡：458071-VISA商务金卡；451804-VISA商务普卡
	//ExceptCardPin2="|45806|53098|";//准贷记卡：45806-VISA卡；53098-MASTER卡
	for(var i=0;i<this.data.length;i++){
		ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
		if(this.data[i].isRegistedCard==true
				&&(areacode==""||(this.data[i].areaCode==areacode))
				&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
				&&( ret == "0"
						|| ret == "1" || ret == "2" || ret == "3"
						|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))	{
			//var cardPin = this.data[i].cardNum.substring(0,6);
			var cardbin="|"+dyTopFrame.cardBinList.getCardBin(this.data[i].cardNum)+"|";
			if (cardbinstr1.indexOf(cardbin)!=-1) continue;
			if (cardbinstr3.indexOf(cardbin)!=-1) continue;
			if (cardbinstr4.indexOf(cardbin)!=-1) continue;
			//var cardPin = this.data[i].cardNum.substring(0,5);
			if (cardbinstr2.indexOf(cardbin)!=-1) {
				//准贷记卡卡号的第十位显示卡类，0为商务金卡，1至6为个人普卡，7为商务普卡，8为个人金卡，9待用。
				if(this.data[i].cardNum.substring(9,10)=="0"||this.data[i].cardNum.substring(9,10)=="7")
				continue;
			}
			//if(this.data[i].acctType=="999") continue;//屏蔽活期注册账号，0807预约项目取消屏蔽
			if((num==1)&& (this.data[i].acctType=="008")) continue;
			else temp+="<option value="+i+">"+this.data[i].getDescString();
		}
	}
	if(temp=="")
		temp="<option value=no selected>---没有满足条件的卡号---";
	return temp;
}
function accountList_getHangAccountOpString(cardOwnerMark,num,card_num,areacode,regmode){

	var temp="";
	var ret="";
	var acctTypes="|01|04|05|16|21|22|00|02|";

	if(num==0){
		for(var m=0;m<this.data.length;m++){
			ret = compareMarkAndType(this.data[m].cardOwnerMark ,cardOwnerMark,this.data[m].cardOwnerType);
			if((this.data[m].acctType=="011" || this.data[m].acctType=="003")
					&&(areacode==""||(this.data[m].areaCode==areacode))
					&&(regmode==null||regmode==""||(this.data[m].regMode==regmode))
					&&( ret == "0"
							|| ret == "1" || ret == "2" || ret == "3"
							|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
				temp+="<option value="+m+">"+this.data[m].getDescString();
		}
	if(temp=="")
		temp="<option value=no selected>---没有满足条件的卡号---";
		return temp;
	}
	for(var i=0;i<this.data.length;i++){
		//if(this.data[i].isQryAcctList=="0" && this.data[i].acctType=="003")
			//temp+="<option value="+i+">"+this.data[i].getDescString();
		ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
		if(this.data[i].isQryAcctList=="1"
			&& this.data[i].isRegistedCard==false
			&& this.data[i].cardNum==card_num
			&&(areacode==""||(this.data[i].areaCode==areacode))
			&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
			&&( ret == "0"
					|| ret == "1" || ret == "2" || ret == "3"
					|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
		{
			//alert("|"+this.data[i].acctType+"|");
			//alert(acctTypes.indexOf("|"+this.data[i].acctType+"|"));
			if(acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1)
			{
				//alert("|"+this.data[i].acctType+"|");
				temp+="<option value="+i+">"+this.data[i].getDescString();
			}
		}
	}
	if(temp=="")
		temp="<option value=no selected>---账户信息待查---";
	//alert(temp);
	return temp;
}

function accountList_getHangAccountOpStringTZCK(cardOwnerMark,num,card_num,acctTypes,areacode,regmode){

	var temp="";
	var ret="";
	if(num==0){
		for(var m=0;m<this.data.length;m++){
			ret = compareMarkAndType(this.data[m].cardOwnerMark ,cardOwnerMark,this.data[m].cardOwnerType);
			if((this.data[m].acctType=="011" || this.data[m].acctType=="003")
					&&(areacode==""||(this.data[m].areaCode==areacode))
					&&(regmode==null||regmode==""||(this.data[m].regMode==regmode))
					&&( ret == "0"
							|| ret == "1" || ret == "2" || ret == "3"
							|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
				temp+="<option value="+m+">"+this.data[m].getDescString();
		}
		return temp;
	}
	for(var i=0;i<this.data.length;i++){
		//if(this.data[i].isQryAcctList=="0" && this.data[i].acctType=="003")
			//temp+="<option value="+i+">"+this.data[i].getDescString();
		ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
		if(this.data[i].isQryAcctList=="1"
			&& this.data[i].isRegistedCard==false
			&& this.data[i].cardNum==card_num
			&&(areacode==""||(this.data[i].areaCode==areacode))
			&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
			&&( ret == "0"
					|| ret == "1" || ret == "2" || ret == "3"
					|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
		{
			//alert("|"+this.data[i].acctType+"|");
			//alert(acctTypes.indexOf("|"+this.data[i].acctType+"|"));
			if(acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1)
			{
				//alert("|"+this.data[i].acctType+"|");
				temp+="<option value="+i+">"+this.data[i].getDescString();
			}
		}
	}
	if(temp=="")
		temp="<option value=no selected>---账户信息待查---";
	//alert(temp);
	return temp;
}

function accountList_getSameCardHangAcctOpString(cardOwnerMark,cardNumber,areacode,regmode){
	var acctTypes="|01|04|05|16|21|22|00|";
	var temp="";
	var ret="";
	for(var i=0;i<this.data.length;i++){
		ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
		if(this.data[i].cardNum==cardNumber
				&& this.data[i].isRegistedCard==false
				&&(areacode==""||(this.data[i].areaCode==areacode))
				&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
				&&( ret == "0"
						|| ret == "1" || ret == "2" || ret == "3"
						|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
			//if(!(this.data[i].acctCode=="000"))
		{
			if(acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1)
				temp+="<option value="+i+">"+this.data[i].getDescString();
		}
	}

	return temp;
}

/*判断卡是否为商务卡，是商务卡返回ture，不是商务卡返回false
  cardNum:   卡号
  auther：   lixf
  date：     2006-8-11
*/
function accountList_isBussinessCard(cardNum)
{
    var cardFlag=false;
    var cardbinstr1= dyTopFrame.cardBinList.SupportCardBin(5);
	var cardbinstr2= dyTopFrame.cardBinList.SupportCardBin(6);
	var cardbinstr3= dyTopFrame.cardBinList.SupportCardBin(15);
	var cardbinstr4= dyTopFrame.cardBinList.SupportCardBin(14);
	var cardbin="|"+dyTopFrame.cardBinList.getCardBin(cardNum)+"|";
	if(cardbinstr1.indexOf(cardbin)!=-1||cardbinstr3.indexOf(cardbin)!=-1||cardbinstr4.indexOf(cardbin)!=-1)
	{
	    cardFlag=true;
	}
	else if (cardbinstr2.indexOf(cardbin)!=-1)
	{
		//准贷记卡卡号的第十位显示卡类，0为商务金卡，1至6为个人普卡，7为商务普卡，8为个人金卡，9待用。
		if(cardNum.substring(9,10)=="0"||cardNum.substring(9,10)=="7")
		    cardFlag=true;
	}

	return cardFlag;
}


/*判断卡是否为香港卡，是返回ture，不是返回false
  cardNum:   卡号
  auther：   xuwx
  date：     2010-10-11
*/
function accountList_isHKCard(cardNum)
{
  var cardFlag=false;
  var acct_type =dyTopFrame.cardBinList.getCardType(cardNum);
  if(acct_type == '008'){
  	  var cardbinstr1= dyTopFrame.cardBinList.SupportCardBin(7);
			var cardbinstr2= dyTopFrame.cardBinList.SupportCardBin(8);
			var cardbin="|"+dyTopFrame.cardBinList.getCardBin(cardNum)+"|";
			if(cardbinstr1.indexOf(cardbin)!=-1||cardbinstr2.indexOf(cardbin)!=-1)
			{
	    	cardFlag=true;
			}
  	}

	return cardFlag;
}

/*判断贷记卡是否为双币种，是贷记卡不是双币种返回false，其他返回false
  cardNum:   卡号
  auther：   xuweixing
  date：     2009-8-11
*/
function accountList_isDoubleCurrCredit(acctType,cardNum)
{
  if(acctType!="007"&&acctType!="21"){
  	return true;
  }
  else{
  		currList=dyTopFrame.cardBinList.getCurrList(cardNum);
  		if(currList == null) return false; //卡列表异常处理201402-shilp
  		if(currList.indexOf("|",5) == -1 )
  		{
  			return false;
  		}
  		else{
  			return true;
  		}
  }
}
/*获得用于select中的option的字符串：显示指定类型的注册卡（不包括商务卡），指定卡号后，若没在卡列表中，则在卡列表中追加此卡号。
  acctTypes: 注册卡的类型
  areacode： 地区码
  auther：   xuwx
  date：     2010-11-11
*/
function accountList_getTypedOptionWithoutBusinessAddNoRegCard(cardOwnerMark,acctTypes,areacode,regmode,AsiaState,cardIndex)
{
  var temp="";
  var isSelected = "";
  //是否已经找到
  var isFind = false;
	if(acctTypes=="undefined"||acctTypes==null||acctTypes=="")
		return "";
	for(var i=0;i<this.data.length;i++)
	{
		if(this.data[i].acctType.indexOf("A")==-1&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1&&(areacode==""||(this.data[i].areaCode==areacode))&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))&&!accountList_isBussinessCard(this.data[i].cardNum)&&(cardOwnerMark==null||cardOwnerMark==""||(this.data[i].cardOwnerMark==cardOwnerMark)))
		{
		    if(cardIndex!=null && this.data[i].cardNum == cardIndex){
		    	isSelected = "selected";
		    	isFind=true;
		    }else{
		    	isSelected = "";
		    }
		    temp+="<option value="+i+" "+isSelected+">"+this.data[i].getDescString();

		}
		else if(this.data[i].acctType.indexOf("A")!=-1&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1&&(AsiaState!=null&&AsiaState.indexOf("|"+this.data[i].acctProp+"|")!=-1))
		{
		    if(cardIndex!=null && this.data[i].cardNum == cardIndex){
		    	isSelected = "selected";
		    	isFind=true;
		    }else{
		    	isSelected = "";
		    }
		    temp+="<option value="+i+" "+isSelected+">"+this.data[i].getDescString();
		}

	}
	//没有匹配上，且卡号非空
	if(isFind==false && cardIndex!="")
		temp+="<option value=noregcard selected>"+cardIndex;
	if(temp=="")
		temp="<option value=no selected>---没有满足条件的卡号---";
	return temp;
}

/*返回贷记卡、国际卡的外币卡种，不是双币种返回""
卡bin列表中只有贷记卡007、国际卡008设置币种，最多设置两个(包括人民币)，
cardNum:   卡号
auther：   yanlong
date：     2010-10-21
*/
function accountList_getOverseaCurrType(acctType,cardNum)
{
	var currSet = "";
	var overseaCurr  = "";
	if(acctType=="007"||acctType=="21"||acctType=="008"||acctType=="20")
	{
		currList=dyTopFrame.cardBinList.getCurrList(cardNum);
		if(currList!=null && currList!="")
		{
			currSet = currList.split("|");
			if(currSet.length==4)
			{
				overseaCurr = currSet[2];
				if("001"==overseaCurr)
				{
					overseaCurr = currSet[1];
				}
			}
		}
	}
	return overseaCurr;
}


/*获得用于select中的option的字符串：显示指定类型的注册卡（不包括商务卡）
  acctTypes: 注册卡的类型
  areacode： 地区码
  remitTranLag:是否检查Fova账户转帐权限
  auther：   lixf
  date：     2006-8-11
*/
function accountList_getTypedOptionWithoutBusiness(cardOwnerMark,acctTypes,areacode,regmode,AsiaState,cardIndex,cardNum,remitTranLag)
{
    var temp="";
    var ret="";
    var isSelected = "";
	if(acctTypes=="undefined"||acctTypes==null||acctTypes=="")
		return "";
	for(var i=0;i<this.data.length;i++)
	{
		if(filterCardNumber(this.data[i].cardNum,cardNum)){
			//如果卡列表中的这个卡号等于传入的卡号，就跳过，进行过滤。其它不变。
			continue;
		}
		if(this.data[i].acctType=="R"){
			ret="0";
		}
		else{
			ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
		}
		if(this.data[i].acctType.indexOf("A")==-1
				&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
				&&(areacode==""||(this.data[i].areaCode==areacode))
				&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
				&&!accountList_isBussinessCard(this.data[i].cardNum)
				&&( ret == "0"
						|| ret == "1" || ret == "2" || ret == "3"
						|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
		{

			if((remitTranLag =='1') && (this.data[i].RemitTRANLAG == '0' )){
				continue;
			}

		    if(cardIndex!=null && this.data[i].cardNum == cardIndex){
		    	isSelected = "selected";
		    }else{
		    	isSelected = "";
		    }
		    temp+="<option value="+i+" "+isSelected+">"+this.data[i].getDescString();

		}
		else if(this.data[i].acctType.indexOf("A")!=-1
				&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
				&&(AsiaState!=null&&AsiaState.indexOf("|"+this.data[i].acctProp+"|")!=-1))
		{
		    if(cardIndex!=null && this.data[i].cardNum == cardIndex){
		    	isSelected = "selected";
		    }else{
		    	isSelected = "";
		    }
		    temp+="<option value="+i+" "+isSelected+">"+this.data[i].getDescString();
		}

	}
	if(temp=="")
		temp="<option value=no selected>---没有满足条件的卡号---";
	return temp;
}

/*
 * 境内汇款使用的付款卡列表
 * Author：kfzx-bail01
 * Date：2015-09-11
 * 其他交易需如修改请先和kfzx-bail01确认。
 */
function accountList_getDomesticTransferCardOption(cardOwnerMark, acctTypes, areacode, regmode, AsiaState, cardIndex, cardNum, ftFlag, acctName)
{
    var temp="";
    var ret="";
    var isSelected = "";
    var cardFt = "0";
    
	if(acctTypes == "undefined" || acctTypes == null || acctTypes=="")
	{
		return "";
	}
	for(var i=0; i < this.data.length; i++)
	{
		if(filterCardNumber(this.data[i].cardNum, cardNum))
		{
			//如果卡列表中的这个卡号等于传入的卡号，就跳过，进行过滤。其它不变。
			continue;
		}
		if(this.data[i].acctType == "R")
		{
			ret="0";
		}
		else
		{
			ret = compareMarkAndType(this.data[i].cardOwnerMark, cardOwnerMark, this.data[i].cardOwnerType);
		}
		
		// 自贸区标志在accountlist中有可能是undefined，此处做特殊处理
		cardFt = this.data[i].ftFlag;
		if(cardFt == null || cardFt == undefined || cardFt == "undefined" || cardFt == "")
		{
			cardFt = "0";
		}
		
		if(this.data[i].acctType.indexOf("A") == -1
			&& acctTypes.indexOf("|"+this.data[i].acctType+"|") != -1
			&& (areacode == "" || (this.data[i].areaCode == areacode))
			&& (regmode == null || regmode == "" || (this.data[i].regMode == regmode))
			&& !accountList_isBussinessCard(this.data[i].cardNum)
			&& (ret == "0" || ret == "1" || ret == "2" || ret == "3" || ret == "4" || ret == "5" || ret == "6" || ret == "8")
			&& (ftFlag == "" || (cardFt == ftFlag)))
		{
		    if((cardIndex != null) && (cardIndex != "") && (this.data[i].cardNum == cardIndex))
		    {
		    	isSelected = "selected";
		    }
		    else
		    {
		    	isSelected = "";
		    }
		    temp += "<option value=" + i + " " + isSelected + ">" + acctName + this.data[i].getDescString() + "</option>";

		}
		else if(this.data[i].acctType.indexOf("A") != -1
				&& acctTypes.indexOf("|" + this.data[i].acctType + "|") != -1
				&& (AsiaState !=null && AsiaState.indexOf("|" + this.data[i].acctProp + "|") != -1))
		{
		    if(cardIndex != null && this.data[i].cardNum == cardIndex)
		    {
		    	isSelected = "selected";
		    }
		    else
		    {
		    	isSelected = "";
		    }
		    temp += "<option value=" + i + " " + isSelected + ">" + acctName + this.data[i].getDescString() + "</option>";
		}

	}

	return temp;
}

/*跟据卡类型，卡BIN，联名编号获得用于select中的option的字符串：显示指定类型的注册卡（不包括商务卡）
acctTypes: 注册卡的类型
areacode： 地区码
regmode:   注册类型
cardbin：  卡bin
unionNum： 联名编号
auther：   lixf
date：     2006-8-11
*/
function accountList_getTypedOptionForHospital(cardOwnerMark,acctTypes,areacode,regmode,cardbin,unionNum,cardIndex,AsiaState)
{
	var temp="";
	var ret="";
	var isSelected = "";
	var currCardBin = "";
	if(acctTypes=="undefined"||acctTypes==null||acctTypes=="")
		return "";
	for(var i=0;i<this.data.length;i++)
	{
		if(this.data[i].acctType=="R"){
			ret="0";
		}
		else{
			ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
		}
		currCardBin = dyTopFrame.cardBinList.getCardBin(this.data[i].cardNum);
		//tips:主机返回的联名编号为9位，数据库是8位，所以对主机的unionNum做substring处理，add by kfzx-heq01 20121019
		if(this.data[i].acctType.indexOf("A")==-1
				&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
				&&(areacode==""||(this.data[i].areaCode==areacode))
				&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
				&&(cardbin==null||cardbin==""||(currCardBin==cardbin))
				&&(unionNum==null||unionNum==""||(this.data[i].unionNum.substring(1,9)==unionNum))
				&&!accountList_isBussinessCard(this.data[i].cardNum)
				&&( ret == "0"
						|| ret == "1" || ret == "2" || ret == "3"
						|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
		{
		    if(cardIndex!=null && this.data[i].cardNum == cardIndex){
		    	isSelected = "selected";
		    }else{
		    	isSelected = "";
		    }
		    temp+="<option value="+i+" "+isSelected+">"+this.data[i].getDescString();

		}
		else if(this.data[i].acctType.indexOf("A")!=-1
				&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
				&&(AsiaState!=null&&AsiaState.indexOf("|"+this.data[i].acctProp+"|")!=-1))
		{
		    if(cardIndex!=null && this.data[i].cardNum == cardIndex){
		    	isSelected = "selected";
		    }else{
		    	isSelected = "";
		    }
		    temp+="<option value="+i+" "+isSelected+">"+this.data[i].getDescString();
		}

	}
	if(temp=="")
		temp="<option value=no selected>---没有满足条件的卡号---";
	return temp;
}

/*获得用于select中的option的字符串：显示指定类型的注册卡（不包括商务卡）,可以显示异地信用卡
acctTypes: 注册卡的类型
areacode： 地区码
auther：   lixf
date：     2006-8-11
*/
function accountList_getTypedOptionForCard(cardOwnerMark,acctTypes,areacode,regmode,AsiaState,cardIndex)
{
  var temp="";
  var isSelected = "";
	if(acctTypes=="undefined"||acctTypes==null||acctTypes=="")
		return "";
	for(var i=0;i<this.data.length;i++)
	{
		ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
		if(this.data[i].acctType.indexOf("A")==-1
		&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
		&&(areacode==""||(this.data[i].areaCode==areacode||"|001|007|008|".indexOf("|"+this.data[i].acctType+"|")!=-1))
		&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
		&&!accountList_isBussinessCard(this.data[i].cardNum)
		&&( ret == "0" || ret == "1" || ret == "2" || ret == "3"
			|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
		{
		    if(cardIndex!=null && this.data[i].cardNum == cardIndex){
		    	isSelected = "selected";
		    }else{
		    	isSelected = "";
		    }
		    temp+="<option value="+i+" "+isSelected+">"+this.data[i].getDescString();

		}
		else if(this.data[i].acctType.indexOf("A")!=-1
			&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
			&&(AsiaState!=null&&AsiaState.indexOf("|"+this.data[i].acctProp+"|")!=-1))
		{
		    if(cardIndex!=null && this.data[i].cardNum == cardIndex){
		    	isSelected = "selected";
		    }else{
		    	isSelected = "";
		    }
		    temp+="<option value="+i+" "+isSelected+">"+this.data[i].getDescString();
		}

	}
	if(temp=="")
		temp="<option value=no selected>---没有满足条件的卡号---";
	return temp;
}

/*获得用于select中的option的字符串：用于显示灵通卡（包括E时代）和理财金卡,不包括工银财富卡
  cardOwnerMark: 托管账户标志
  areacode： 地区码
  cardType:  1-理财金，2-灵通卡（包括E时代）
  auther：   lixf
  date：     2006-8-11
*/
function accountList_getTypedOptionForDebitCard(cardOwnerMark,areacode,cardType)
{
    var temp="";
    var ret="";
    var isSelected = "";
    var cardbin = "";
	if(cardType=="undefined"||cardType==null||cardType=="")
		return "";
	var cardbinstr1= dyTopFrame.cardBinList.SupportCardBin(1);
	var cardbinstr2= dyTopFrame.cardBinList.SupportCardBin(2);
 	var cardbinstr5= dyTopFrame.cardBinList.getEMVCard();
 	for(var i=0;i<this.data.length;i++)
	{
		ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
		cardbin = "|"+dyTopFrame.cardBinList.getCardBin(this.data[i].cardNum)+"|";
		if((this.data[i].acctType.indexOf("A")==-1 && this.data[i].isRegistedCard==true
				&&(((cardType=="1" && this.data[i].acctType=="011" && cardbinstr2.indexOf(cardbin)!=-1)
				   || (cardType=="2" && (this.data[i].acctType=="003" || this.data[i].acctType=="011" && cardbinstr2.indexOf(cardbin)==-1)))
				   && cardbinstr5.indexOf(cardbin)==-1)
			&&(areacode==""||(this.data[i].areaCode==areacode))
			&&( ret == "0" || ret == "1" || ret == "2" || ret == "3"
				|| ret == "4" || ret == "5" || ret == "6" || ret == "8")
		)||(this.data[i].acctType.indexOf("A")==-1 && this.data[i].isRegistedCard==true
				&&(((cardType=="3" &&(( this.data[i].acctType=="011" && cardbinstr2.indexOf(cardbin)!=-1)||(this.data[i].acctType=="003" || this.data[i].acctType=="011" && cardbinstr2.indexOf(cardbin)==-1))
						   && cardbinstr5.indexOf(cardbin)==-1))
					&&(areacode==""||(this.data[i].areaCode==areacode))
					&&( ret == "0" || ret == "1" || ret == "2" || ret == "3"
						|| ret == "4" || ret == "5" || ret == "6" || ret == "8")))
						)
		{

		    temp+="<option value="+i+" "+isSelected+">"+this.data[i].getDescString();

		}
	}
 	if(temp=="")
		temp="<option value=no selected>---没有满足条件的卡号---";
	return temp;
}

/*获得用于select中的option的字符串：显示指定类型的注册卡（不包括商务卡）
acctTypes: 注册卡的类型
areacode： 地区码
auther：   lixf
date：     2006-8-11
*/
function accountList_getTypedOptionWithoutBusinessForTrust(cardOwnerMark,acctTypes,areacode,regmode,AsiaState,cardIndex)
{
  var temp="";
  var isSelected = "";
	if(acctTypes=="undefined"||acctTypes==null||acctTypes=="")
		return "";
	for(var i=0;i<this.data.length;i++)
	{
		if(this.data[i].acctType.indexOf("A")==-1&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1&&(areacode==""||(this.data[i].areaCode==areacode))&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))&&!accountList_isBussinessCard(this.data[i].cardNum)&&(cardOwnerMark==null||cardOwnerMark==""||(this.data[i].cardOwnerMark!=cardOwnerMark)))
		{
		    if(cardIndex!=null && this.data[i].cardNum == cardIndex){
		    	isSelected = "selected";
		    }else{
		    	isSelected = "";
		    }
		    temp+="<option value="+i+" "+isSelected+">"+this.data[i].getDescString();

		}
		else if(this.data[i].acctType.indexOf("A")!=-1&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1&&(AsiaState!=null&&AsiaState.indexOf("|"+this.data[i].acctProp+"|")!=-1))
		{
		    if(cardIndex!=null && this.data[i].cardNum == cardIndex){
		    	isSelected = "selected";
		    }else{
		    	isSelected = "";
		    }
		    temp+="<option value="+i+" "+isSelected+">"+this.data[i].getDescString();
		}

	}
	if(temp=="")
		temp="<option value=no selected>---没有满足条件的卡号---";
	return temp;
}

//得到卡列表的option，不选择
function accountList_getTypedOptionWithoutBusinessNoSelected(cardOwnerMark,acctTypes,areacode,regmode,AsiaState,cardIndex)
{
    var temp="";
    var ret="";
	if(acctTypes=="undefined"||acctTypes==null||acctTypes=="")
		return "";
	for(var i=0;i<this.data.length;i++)
	{
		ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
		if(this.data[i].acctType.indexOf("A")==-1
				&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
				&&(areacode==""||(this.data[i].areaCode==areacode))
				&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
				&&!accountList_isBussinessCard(this.data[i].cardNum)
				&&( ret == "0"
						|| ret == "1" || ret == "2" || ret == "3"
						|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
		{
		    temp+="<option value="+i+">"+this.data[i].getDescString();

		}
		else if(this.data[i].acctType.indexOf("A")!=-1
				&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
				&&(AsiaState!=null&&AsiaState.indexOf("|"+this.data[i].acctProp+"|")!=-1))
		{
		    temp+="<option value="+i+">"+this.data[i].getDescString();
		}

	}
	return temp;
}
/*获得用于select中的option的字符串：显示指定类型的注册卡（不包括商务卡）
信用卡服务-信用卡还款-我的自动还款(修改还款协议)：还款卡（账）号支持本人所有地区的柜面注册、自助添加的贷记卡、准贷记卡、国际卡、牡丹专用卡；
与透支卡地区相同的本人的e时代卡，理财金卡，灵通卡、财富卡
  acctTypes: 注册卡的类型
  areacode： 地区码
  inCardNoArea： 透支卡（转入卡）地区代码
  auther：   fuyu
  date：     2010-1-18
*/
function accountList_getTypedOptionForRepayCard(cardOwnerMark,acctTypes,areacode,regmode,AsiaState,cardIndex,inCardNoArea)
{
    var temp="";
    var ret="";
    var isSelected = "";
	if(acctTypes=="undefined"||acctTypes==null||acctTypes=="")
		return "";
	for(var i=0;i<this.data.length;i++)
	{

		var payCardType = this.data[i].acctType;//还款卡（账）号卡类型
		var showFlag = false;//当还款卡为e时代卡，理财金卡，灵通卡、财富卡时，其地区同透支卡地区相同才显示
		if("003" ==payCardType || "011" ==payCardType || "999" ==payCardType){
			if(inCardNoArea ==this.data[i].areaCode) showFlag = true;
		}else{
			showFlag = true;
		}
		ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
		if(this.data[i].acctType.indexOf("A")==-1
				&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
				&&(areacode==""||(this.data[i].areaCode==areacode))
				&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
				&&!accountList_isBussinessCard(this.data[i].cardNum)
				&&( ret == "0"
						|| ret == "1" || ret == "2" || ret == "3"
						|| ret == "4" || ret == "5" || ret == "6" || ret == "8")
				&&showFlag==true)
		{
		    if(cardIndex!=null && this.data[i].cardNum == cardIndex){
		    	isSelected = "selected";
		    }else{
		    	isSelected = "";
		    }
		    temp+="<option value="+i+" "+isSelected+">"+this.data[i].getDescString();

		}
		else if(this.data[i].acctType.indexOf("A")!=-1
				&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
				&&(AsiaState!=null&&AsiaState.indexOf("|"+this.data[i].acctProp+"|")!=-1))
		{
		    if(cardIndex!=null && this.data[i].cardNum == cardIndex){
		    	isSelected = "selected";
		    }else{
		    	isSelected = "";
		    }
		    temp+="<option value="+i+" "+isSelected+">"+this.data[i].getDescString();
		}

	}
	if(temp=="")
		temp="<option value=no selected>---没有满足条件的卡号---";
	return temp;
}

/*获得用于select中的option的字符串：显示指定类型的注册卡（不包括商务卡）
acctTypes: 注册卡的类型
areacode： 地区码
auther：   fengys
date：     2010-3-22
*/
function accountList_getTypedOptionWithoutBusiness2(cardOwnerMark,acctTypes,areacode,regmode,AsiaState,cardIndex,acctName,ftFlag)
{
	var temp="";
	var ret="";
	var isSelected = "";
	var cardFt = "0";
	if(acctTypes=="undefined"||acctTypes==null||acctTypes=="")
		return "";

	for(var i=0;i<this.data.length;i++)
	{
		// 自贸区标志在accountlist中有可能是undefined，此处做特殊处理
		cardFt = this.data[i].ftFlag;
		if(cardFt == null || cardFt == undefined || cardFt == "undefined" || cardFt == "")
		{
			cardFt = "0";
		}
		
		ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
		if(this.data[i].acctType.indexOf("A")==-1
				&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
				&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
				&&!accountList_isBussinessCard(this.data[i].cardNum)
				&&(ret == "0" || ret == "1" || ret == "2" || ret == "3" || ret == "4" || ret == "5" || ret == "6" || ret == "8")
				&& (ftFlag == null || ftFlag == "" || (cardFt == ftFlag)))
		{
			if(this.data[i].acctType == "008" || (areacode=="" || (this.data[i].areaCode==areacode))){
			    if(cardIndex!=null && this.data[i].cardNum == cardIndex){
			    	isSelected = "selected";
			    }else{
			    	isSelected = "";
			    }
			    temp+="<option value="+i+" "+isSelected+">"+acctName+" "+this.data[i].getDescString();
			}
		}
		else if(this.data[i].acctType.indexOf("A")!=-1
				&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
				&&(AsiaState!=null&&AsiaState.indexOf("|"+this.data[i].acctProp+"|")!=-1))
		{
		    if(cardIndex!=null && this.data[i].cardNum == cardIndex){
		    	isSelected = "selected";
		    }else{
		    	isSelected = "";
		    }
		    temp+="<option value="+i+" "+isSelected+">"+this.data[i].getDescString();
		}

	}
	if(temp=="")
		temp="<option value=no selected>---没有满足条件的卡号---";
	return temp;
}

/*获得用于select中的option的字符串：显示指定类型的注册卡（不包括商务卡和指定的cardIndex）
  acctTypes: 注册卡的类型
  areacode： 地区码
  auther：   fengys
  date：     2009-8-20
*/
function accountList_getTypedOptionWithoutCard2(cardOwnerMark,acctTypes,areacode,regmode,AsiaState,cardIndex)
{
    var temp="";
    var ret="";
    var isSelected = "";
	if(acctTypes=="undefined"||acctTypes==null||acctTypes=="")
		return "";
	for(var i=0;i<this.data.length;i++)
	{
		ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
		if(this.data[i].acctType.indexOf("A")==-1
				&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
				&&(areacode==""||(this.data[i].areaCode==areacode))
				&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
				&&!accountList_isBussinessCard(this.data[i].cardNum)
				&&( ret == "0"
						|| ret == "1" || ret == "2" || ret == "3"
						|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
		{
		    if( this.data[i].cardNum != cardIndex ){
				temp+="<option value="+i+" "+isSelected+">"+this.data[i].getDescString();
		    }
		}
		else if(this.data[i].acctType.indexOf("A")!=-1
				&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
				&&(AsiaState!=null&&AsiaState.indexOf("|"+this.data[i].acctProp+"|")!=-1))
		{
		    if( this.data[i].cardNum != cardIndex){
				temp+="<option value="+i+" "+isSelected+">"+this.data[i].getDescString();
		    }
		}
	}

	if(temp=="")
		temp="<option value=no selected>---没有满足条件的卡号---";
	return temp;
}

/*获得用于select中的option的字符串：显示指定类型的注册卡（不包括商务卡）
  acctTypes: 注册卡的类型
  areacode： 地区码
  auther：   xuweixing
  date：     2009-8-11
*/
function accountList_getTypedOptionForeignVisa(cardOwnerMark,acctTypes,areacode,regmode,AsiaState,cardIndex)
{
    var temp="";
    var ret="";
    var isSelected = "";
	if(acctTypes=="undefined"||acctTypes==null||acctTypes=="")
		return "";
	for(var i=0;i<this.data.length;i++)
	{
		ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
		if(this.data[i].acctType.indexOf("A")==-1
				&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
				&&(areacode==""||(this.data[i].areaCode==areacode))
				&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
				&&!accountList_isBussinessCard(this.data[i].cardNum)
				&&( ret == "0"
						|| ret == "1" || ret == "2" || ret == "3"
						|| ret == "4" || ret == "5" || ret == "6" || ret == "8")
				&&(accountList_isDoubleCurrCredit(this.data[i].acctType,this.data[i].cardNum)))
		{
		    if(cardIndex!=null && this.data[i].cardNum == cardIndex){
		    	isSelected = "selected";
		    }else{
		    	isSelected = "";
		    }
		    temp+="<option value="+i+" "+isSelected+">"+this.data[i].getDescString();

		}
		else if(this.data[i].acctType.indexOf("A")!=-1
				&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
				&&(AsiaState!=null&&AsiaState.indexOf("|"+this.data[i].acctProp+"|")!=-1))
		{
		    if(cardIndex!=null && this.data[i].cardNum == cardIndex){
		    	isSelected = "selected";
		    }else{
		    	isSelected = "";
		    }
		    temp+="<option value="+i+" "+isSelected+">"+this.data[i].getDescString();
		}

	}
	if(temp=="")
		temp="<option value=no selected>---无满足条件的注册账户---";
	return temp;
}


/*获得用于select中的option的字符串：显示指定卡的指定类型的下挂账户（不包括商务卡）,若是贷记卡，只显示双币种
  acctTypes: 注册卡的类型
  areacode： 地区码
  auther：   xuweixing
  date：     2009-8-11
*/
function accountList_getHangAcctOpForeignVisa(cardOwnerMark,cardNum,acctTypes,areacode,regmode)
{
    var temp="";
    var ret="";
	for(var i=0;i<this.data.length;i++)
	{
		ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
		if(this.data[i].isQryAcctList=="1"
			&& this.data[i].isRegistedCard==false
			&& this.data[i].cardNum==cardNum
			&&(areacode==""||(this.data[i].areaCode==areacode))
			&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
			&&( ret == "0"
					|| ret == "1" || ret == "2" || ret == "3"
					|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
		{
			//若是贷记卡，只显示双币种的
			if(!accountList_isDoubleCurrCredit(this.data[i].acctType,this.data[i].acctNum))
				continue;
			if(acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
					&&!accountList_isBussinessCard(this.data[i].acctNum))
			{
				temp+="<option value="+i+">"+this.data[i].getDescString();
			}
		}
	}
	if(temp=="")
		temp="<option value=no selected>---账户信息待查---";
	return temp;
}



/*获得用于select中的option的字符串：显示指定卡的指定类型的下挂账户（不包括商务卡）,且屏蔽香港卡
  acctTypes: 注册卡的类型
  areacode： 地区码
  auther：   xuweixing
  date：     2010-2-11
*/
function accountList_getTypedOptionWithoutBusinessAndHKCard(cardOwnerMark,acctTypes,areacode,regmode,AsiaState,cardIndex)
{
  var temp="";
  var ret="";
  var isSelected = "";
	if(acctTypes=="undefined"||acctTypes==null||acctTypes=="")
		return "";

	for(var i=0;i<this.data.length;i++)
	{
		ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
		if(this.data[i].acctType.indexOf("A")==-1
				&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
				&&(areacode==""||(this.data[i].areaCode==areacode))
				&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
				&&!accountList_isBussinessCard(this.data[i].cardNum)
				&&( ret == "0"
						|| ret == "1" || ret == "2" || ret == "3"
						|| ret == "4" || ret == "5" || ret == "6" || ret == "8")
				&& (accountList_isHKCard(this.data[i].cardNum)== false))
		{
		    if(cardIndex!=null && this.data[i].cardNum == cardIndex){
		    	isSelected = "selected";
		    }else{
		    	isSelected = "";
		    }
		    temp+="<option value="+i+" "+isSelected+">"+this.data[i].getDescString();

		}
		else if(this.data[i].acctType.indexOf("A")!=-1
				&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
				&&(AsiaState!=null&&AsiaState.indexOf("|"+this.data[i].acctProp+"|")!=-1))
		{
		    if(cardIndex!=null && this.data[i].cardNum == cardIndex){
		    	isSelected = "selected";
		    }else{
		    	isSelected = "";
		    }
		    temp+="<option value="+i+" "+isSelected+">"+this.data[i].getDescString();
		}

	}
	if(temp=="")
		temp="<option value=no selected>---没有满足条件的卡号---";
	return temp;
}

/*获得用于select中的option的字符串：显示指定卡的指定类型的下挂账户（不包括商务卡）,且屏蔽香港卡
acctTypes: 注册卡的类型
areacode： 地区码
date：     2010-2-11
*/
function accountList_getTypedOptionWithoutBusinessAndHKCardDelCard(cardOwnerMark,acctTypes,areacode,regmode,AsiaState,cardIndex,cardNo)
{
	var temp="";
	var ret="";
	var isSelected = "";
	if(acctTypes=="undefined"||acctTypes==null||acctTypes=="")
		return "";

	for(var i=0;i<this.data.length;i++)
	{
		ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
		if(this.data[i].acctType.indexOf("A")==-1
				&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
				&&(areacode==""||(this.data[i].areaCode==areacode))
				&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
				&&!accountList_isBussinessCard(this.data[i].cardNum)
				&&( ret == "0"
						|| ret == "1" || ret == "2" || ret == "3"
						|| ret == "4" || ret == "5" || ret == "6" || ret == "8")
				&& (accountList_isHKCard(this.data[i].cardNum)== false))
		{
			if(cardIndex!=null && this.data[i].cardNum == cardNo){//过滤当前卡
		    	continue;
		    }
		    if(cardIndex!=null && this.data[i].cardNum == cardIndex){
		    	isSelected = "selected";
		    }else{
		    	isSelected = "";
		    }
		    temp+="<option value="+i+" "+isSelected+">"+this.data[i].getDescString();

		}
		else if(this.data[i].acctType.indexOf("A")!=-1
				&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
				&&(AsiaState!=null&&AsiaState.indexOf("|"+this.data[i].acctProp+"|")!=-1))
		{
			if(cardIndex!=null && this.data[i].cardNum == cardNo){//过滤当前卡
		    	continue;
		    }
		    if(cardIndex!=null && this.data[i].cardNum == cardIndex){
		    	isSelected = "selected";
		    }else{
		    	isSelected = "";
		    }
		    temp+="<option value="+i+" "+isSelected+">"+this.data[i].getDescString();
		}

	}
	if(temp=="")
		temp="<option value=no selected>---没有满足条件的卡（账）号---";
	return temp;
}

/*获得用于select中的option的字符串：根据acctNum(账号)屏蔽该账号对应的卡号.
  acctTypes: 注册卡的类型
  areacode： 地区码
  acctNum: 要屏蔽掉此账号对应的卡号
  auther：   yangjing01
  date：     2008-12-30
*/
function accountList_getTypedOptionWithoutCard(cardOwnerMark,acctTypes,areacode,regmode,acctNum)
{
    var temp="";
    var ret="";
	if(acctTypes=="undefined"||acctTypes==null||acctTypes=="")
		return "";
	var cardNum="";
	for(var i=0;i<this.data.length;i++)
	{
		var accounts=this.data[i];
		ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
		if(this.data[i].isRegistedCard == false && accounts.acctNum==acctNum){
			cardNum=accounts.cardNum;
			for(var j=0;j<this.data.length;j++){
				if(this.data[j].acctType.indexOf("A")==-1
						&&acctTypes.indexOf("|"+this.data[j].acctType+"|")!=-1
						&&(areacode==""||(this.data[j].areaCode==areacode))
						&&(regmode==null||regmode==""||(this.data[j].regMode==regmode))
						&&!accountList_isBussinessCard(this.data[j].cardNum)
						&&( ret == "0"
								|| ret == "1" || ret == "2" || ret == "3"
								|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
				{
					if(cardNum!=null && this.data[j].cardNum != cardNum){
		    			temp+="<option value="+j+">"+this.data[j].getDescString();
	 				}else{
						continue;
					}
				}
			}
		}else{
			continue;
		}
	}
	if(temp=="")
		temp="<option value=no selected>---没有满足条件的卡号---";
	return temp;
}

/*获得用于select中的option的字符串：显示指定卡的指定类型的下挂账户（不包括商务卡）
  acctTypes: 注册卡的类型
  areacode： 地区码
  auther：   lixf
  date：     2006-8-11
*/
function accountList_getHangAcctOpWithoutBusiness(cardOwnerMark,cardNum,acctTypes,areacode,regmode)
{
    var temp="";
    var ret="";
	for(var i=0;i<this.data.length;i++)
	{
		ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
		if(this.data[i].isQryAcctList=="1"
			&& this.data[i].isRegistedCard==false
			&& this.data[i].cardNum==cardNum &&(areacode==""||(this.data[i].areaCode==areacode))
			&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
			&&( ret == "0"
					|| ret == "1" || ret == "2" || ret == "3"
					|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
		{
			if(acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
					&&!accountList_isBussinessCard(this.data[i].acctNum))
			{
				temp+="<option value="+i+">"+this.data[i].getDescString();
			}
		}
	}
	if(temp=="")
		temp="<option value=no selected>---账户信息待查---";
	return temp;
}
//获得用于select中的option的字符串：显示指定卡的指定类型的下挂账户（不包括商务卡）,并根据下挂序号显示
function accountList_getHangAcctOpWithoutBusinessWithAcctNo(cardOwnerMark,cardNum,acctTypes,areacode,regmode,acctCode)
{
	var isSelected = "";
    var temp="";
    var ret="";
	for(var i=0;i<this.data.length;i++)
	{
		ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
		if(this.data[i].isQryAcctList=="1"
			&& this.data[i].isRegistedCard==false
			&& this.data[i].cardNum==cardNum
			&&(areacode==""||(this.data[i].areaCode==areacode))
			&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
			&&( ret == "0"
					|| ret == "1" || ret == "2" || ret == "3"
					|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
		{
			if(acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
					&&!accountList_isBussinessCard(this.data[i].acctNum))
			{
				 if(acctCode!=null && this.data[i].acctCode==acctCode){
				    	isSelected = "selected";
				    }else{
				    	isSelected = "";
				    }
				temp+="<option value="+i+" "+isSelected+">"+this.data[i].getDescString();
			}
		}
	}
	if(temp=="")
		temp="<option value=no selected>---账户信息待查---";
	return temp;
}
/*获得用于select中的option的字符串：显示指定卡的所有下挂账户（不包括商务卡）
  acctTypes: 注册卡的类型
  areacode： 地区码
  auther：   lijh1
  date：     2009-11
*/
function accountList_getHangAcctsOpWithoutBusiness(cardOwnerMark, cardNum,
		areacode, regmode, form1, acctSelect, acctTypes) {
	var temp = "";
	var ret = "";
	var j = 0;
	var formname = eval('document.' + form1);
	for ( var i = 0; i < this.data.length; i++) {
		ret = compareMarkAndType(this.data[i].cardOwnerMark, cardOwnerMark,
				this.data[i].cardOwnerType);
		if (this.data[i].isQryAcctList == "1"
				&& !this.data[i].isRegistedCard
				&& this.data[i].cardNum == cardNum
				&& (areacode == "" || (this.data[i].areaCode == areacode))
				&& (regmode == null || regmode == "" || (this.data[i].regMode == regmode))
				&& (ret == "0" || ret == "1" || ret == "2" || ret == "3"
						|| ret == "4" || ret == "5" || ret == "6" || ret == "8")
				&& !accountList_isBussinessCard(this.data[i].acctNum)
				&& (acctTypes == "" || acctTypes == null || acctTypes
						.indexOf("|" + this.data[i].acctType + "|") != -1)) {

			temp = this.data[i].getDescString();
			if (temp != "") {
				formname.acctSelList3.length = j + 1;
				formname.acctSelList3.options[j].text = temp;
				formname.acctSelList3.options[j].value = i;
				if (acctSelect!=null && acctSelect == this.data[i].acctType)
					formname.acctSelList3.options[j].selected = true;
				j++;
			}

		}
	}
	if (temp == "") {
		formname.acctSelList3.length = 1;
		formname.acctSelList3.options[0].text = "---无符合条件的下挂账户---";
		formname.acctSelList3.options[0].value = "no";
	}
	return temp;
}

/*用于返回指定帐户的描述
  acctNum: 帐号获卡号
  isCard： 是否为注册卡标志，true为注册卡，false为非注册卡
  isDevide:是否卡号分隔，0否，默认是
  auther：   lixf
  date：     2008-7-19
*/
function accountList_getAccountDescript(acctNum,isCard,isDevide){
	var temp = "";
	for(var i=0;i<this.data.length;i++){
		var accounts=this.data[i];
		if(isCard){
			if(this.data[i].isRegistedCard == true && accounts.cardNum==acctNum){
				temp = accounts.getDescStringForShow(isDevide);
				break;
			}
		}else{
			if(this.data[i].isRegistedCard == false && accounts.acctNum==acctNum){
				temp = accounts.getDescStringForShow(isDevide);
				break;
			}
		}
	}
	return temp;
}

//根据卡号（账号）获得描述字符串
function accountList_findAccountByCardNo(cardNum)
{
	for(var i=0;i<this.data.length;i++)
	{
		if(this.data[i].cardNum==cardNum||this.data[i].acctNum==cardNum)
		{
			return this.data[i].getDescString();
		}
	}
	return "找不到卡号";
}

//根据卡号（账号）获得cardOwnerType
function accountList_findCardOwnerTypeByCardNo(cardNum)
{
	for(var i=0;i<this.data.length;i++)
	{
		if(this.data[i].cardNum==cardNum||this.data[i].acctNum==cardNum)
		{
			return this.data[i].cardOwnerType;
		}
	}
	return "3";//如果没有，则默认返回全权限
}

//根据卡号（账号）获得帐户
function accountList_findAccountDataByCardNo (cardNum){
	for(var i=0;i<this.data.length;i++)
	{
		if(this.data[i].cardNum==cardNum||this.data[i].acctNum==cardNum)
		{
			return this.data[i];
		}
	}
	return "找不到卡号";
}
//根据卡号和账户代码查找相应的账号，返回对应卡的索引，如果想查找注册卡，则不必指定账户代码
//
//
//
function accountList_findAccount(cardNum,acctCode)
{
	for(var i=0;i<this.data.length;i++)
	{
		if(this.data[i].cardNum==cardNum)
		{
			if(acctCode=="undefined"||acctCode==null||acctCode=="")
			{
				return i;
			}
			if(this.data[i].acctCode==acctCode)
			{
				return i;
			}
		}
	}
	return -1;
}
//--------------------------fsl add---------------------
function acctNum_load(accts,acctSel,acctNum,theform){
	var subForm= eval("document." + theform);
	var subObj0=eval("document." + theform + "." + acctSel);
	var subObj1=eval("document." + theform + "." + acctNum);
	var accountNo = subObj0.value;
	var account = acctList.elementAt(accountNo);
	var card_sel = account.cardNum;
	var acct_array = new Array();
	var temp = "";
	for(var i=0;i<acctList.len();i++){
		account=acctList.elementAt(i);
		if(account.isRegistedCard==false&&account.cardNum==card_sel&&accts.indexOf("|"+account.acctType+"|")!=-1){
			temp=temp + "<option value=\"" + i + "\">" + account.getDescString();
		}
	}
	if(temp=="") subObj1.disabled=true;
	return temp;
}
//保存用户的所有账户，包括注册卡
var acctList=new AccountList();
function cardListSelChange(cardListForm)
{
	var accountNo=cardListForm.acctSelList.value;
	var account=acctList.elementAt(accountNo);
	if(account.isQryAcctList=="0")
		cardListForm.qryAcctList.disabled=false;
	else
		cardListForm.qryAcctList.disabled=true;
}
//------------------------------add by fsl 0822--------------------------------
//------------------------------add by fsl 0822--------------------------------
//---------------------------the below is added by fsl-----------------------------------
function acctSel_Load(form,acct_Index){
	var selObj = eval("document." + form + ".acctSelList");
	var accountNo=0;
	var account=acctList.elementAt(accountNo);
	for(var i=0;i<selObj.length;i++){
		accountNo=selObj.options[i].value;
		if(accountNo==acct_Index){
			selObj.options[i].selected=true;
		}

	}
}
//页面显示时确定哪一个卡号,账号被选定；
function card_acctSel_Load(form,acctTypes,acctSel,acctSel2,acct_Index,sysMark){

	var selObj0 = eval("document." + form + "." + acctSel);
	var selObj1 = eval("document." + form + "." + acctSel2);
	var accountNo=0;
	var acct_array=new Array();
	var account=acctList.elementAt(acct_Index);
	var accountDesc;
	//alert(acount.cardNum);
	if(selObj0.value=="no")
		return;
	for(var i=0;i<selObj0.length;i++){
		if(acctList.elementAt(selObj0.options[i].value).cardNum==account.cardNum)
			selObj0.options[i].selected=true;
	}
	var count=0;
	var first=true;
	for(var j=0;j<acctList.len();j++){
		var accounts=acctList.elementAt(j);
		if(accounts.isRegistedCard==false&&acctTypes.indexOf("|"+accounts.acctType+"|")!=-1&&accounts.cardNum==account.cardNum){
			if(accounts.acctCode=="000"){
				if(first){
					first=false;
					acct_array[count]=j;
				}else
					continue;
			}else
				acct_array[count]=j;
			count++;
		}
	}
	if(count==0){
		selObj1.length=1;
		selObj1.options[0].value="no";
		selObj1.options[0].text="---账户信息待查---";
		selObj1.options[0].selected=true;
		return;
	}
	selObj1.length=count;
	for(j=0;j<count;j++){
		account=acctList.elementAt(acct_array[j]);
		accountDesc=account.acctDesc;
		if(accountDesc==null||accountDesc=="null"){
		    var tempType=account.acctType;
		    accountDesc=acctList.getAcctTypeDesc(tempType);
		}
		if(account.acctCode=="000" ||account.acctCode=="00000")
			selObj1.options[j].text=account.acctCode+" "+accountDesc+" 基本户"+" "+account.acctNum+" "+account.acctAlias;
		else{
			if(account.acctType=="04"&&account.acctProp=="006"){
				selObj1.options[j].text=account.acctCode+ " 教育储蓄 " +account.acctNum+" "+account.acctAlias;
			}else{
				selObj1.options[j].text=account.acctCode+" "+accountDesc+" "+account.acctNum+" "+account.acctAlias;
			}
        }
		selObj1.options[j].value=acct_array[j];
		if(selObj1.options[j].value==acct_Index)
		    selObj1.options[j].selected=true;
	}
}

function onsub1(form,tranFlag){
	var subForm = eval("document." + form);

	var accountNo=subForm.acctSelList.value;
	//alert(accountNo);
	var account=acctList.elementAt(accountNo);

	var subObj0 = eval("document." + form + ".acctIndex");
	var subObj1 = eval("document." + form + ".cardNum");
	var subObj2 = eval("document." + form + ".acctCode");
	var subObj3 = eval("document." + form + ".acctNum");
	var subObj4 = eval("document." + form + ".Tran_flag");
	var cardbinstr= dyTopFrame.cardBinList.SupportCardBin(2);
	var cardbin="|"+dyTopFrame.cardBinList.getCardBin(account.cardNum)+"|";
	//modified by fangxiaoqing 20030517
	//if(account.cardNum.substr(0,6)=="955886"||account.cardNum.substr(0,6)=="955888")
	if(cardbinstr.indexOf(cardbin)!=-1)
	{
		var accountNo1=subForm.acctSelList2.value;
		var account1=acctList.elementAt(accountNo1);
		subObj0.value = subForm.acctSelList2.value;
		subObj1.value = account1.cardNum;
		subObj2.value = account1.acctNum;
		subObj3.value = account1.acctNum;
		//alert(account1.acctType);
		//alert(account1.acctNum);
		subForm.acctType.value=account1.acctType;

	}
	else
	{

		subObj0.value = subForm.acctSelList.value;
		subObj1.value = account.cardNum;
		subObj2.value = account.acctCode;
		subObj3.value = account.acctNum;
	}
	if(tranFlag=="1"){
			subObj4.value="1";		//表示下载
			subForm.submit();
	}
	//return true;
}


//余额查询点击翻页
function onsub2(theform,begin_num,sysMark){
	var formObj = eval("document." + theform);

	var acctIndex = eval("document." + theform + ".acctIndex");
	var subObj0 = eval("document." + theform + ".Begin_pos");
	var subObj1 = eval("document." + theform + ".cardNum");
	var subObj2 = eval("document." + theform + ".acctCode");
	var subObj3 = eval("document." + theform + ".acctNum");
	var accountNo=formObj.acctSelList.value;

	acctIndex.value=formObj.acctSelList.value;	//传递序号；
	if(sysMark=="00"||sysMark=="01"){
		//if(formObj.acctSelList2.disabled==false)
		if(formObj.acctSelList2.value!="no")
			acctIndex.value=formObj.acctSelList2.value;
	}
	accountNo=acctIndex.value;
	//alert(accountNo);
	var account=acctList.elementAt(accountNo);
	subObj0.value = begin_num;
	subObj1.value = account.cardNum;
	subObj2.value = account.acctCode;
	subObj3.value = account.acctNum;
	formObj.submit();
}
function onsubb2c(theform,begin_num){
	var formObj = eval("document." + theform);
	var acctIndex = eval("document." + theform + ".acctIndex");
	var subObj0 = eval("document." + theform + ".Begin_pos");
	//acctIndex.value=formObj.acctSelList.value;	//传递序号；
	subObj0.value = begin_num;
	formObj.submit();
}
function onsubunprint(theform,begin_num){
	var formObj = eval("document." + theform);
	var accountNo=formObj.acctSelList.value;
	var account=acctList.elementAt(accountNo);
	var acctIndex = eval("document." + theform + ".acctIndex");
	var subObj0 = eval("document." + theform + ".Begin_pos");
	var subObj1 = eval("document." + theform + ".cardNum");
	var subObj2 = eval("document." + theform + ".acctCode");

	acctIndex.value=formObj.acctSelList.value;	//传递序号；
	subObj0.value = begin_num;
	subObj1.value = account.cardNum;
	subObj2.value = account.acctCode;
	formObj.submit();
}

function acctlist_change(form1){
	var subForm = eval("document." + form1);
	var accountNo=subForm.acctSelList.value;
	var account=acctList.elementAt(accountNo);

	if(account.isQryAcctList=="0")		//isQryAcctList??
		subForm.all.qryChildAccts.innerHTML="";
	else
		subForm.all.qryChildAccts.innerHTML="<img src=querysubaccount.jpg width=74 height=19 align=absbottom>";
}

//点击查询超链触发事件：
function on_query(loc,num,sessId,form){
	var subForm = eval("document." + form);

	var accountNo=subForm.acctSelList.value;
	var account=acctList.elementAt(accountNo);
	var acct_Sel=eval("document." + form + ".acctSelList.value");
	//var href = eval("document.location");
	//var href=eval("window.location.href");
	switch (num){
		case 0:	//查询账户基本信息
			window.location.href=loc + "account/query_zhxx.jsp?acctIndex=" + acct_Sel
								+ "&" + sessId;
			break;
		case 1:	//查询余额
			window.location.href=loc + "account/query_yecx.jsp?acctIndex=" + acct_Sel
								+ "&" + sessId;
			break;
		case 2:	//查询当日明细
			window.location.href=loc + "account/query_drjy.jsp?acctIndex=" + acct_Sel
								+ "&" + sessId;
			break;
		case 3:	//查询历史明细
			window.location.href=loc + "account/query_lsjy.jsp?acctIndex=" + acct_Sel
								+ "&" + sessId;
			break;
		case 4:	//查询未登折明细
			window.location.href=loc + "account/query_wdzmx.jsp?acctIndex=" + acct_Sel
								+ "&" + sessId;
			break;
		case 5:	//查询B2C购物明细
			window.location.href=loc + "account/query_b2c.jsp?acctIndex=" + acct_Sel
								+ "&" + sessId;
			break;
		case 6:	//查询利息及利息税
			window.location.href=loc + "account/query_lx.jsp?acctIndex=" + acct_Sel
								+ "&" + sessId;
			break;
		default:break;
	}
}
// tianf
// 列出正常状态的卡，e卡注销使用
function listNormalCards(arrstat,arrcode,arrtype,arrareaCode,arrtypevalue,mainAreaCode)
{

	var size=(arrcode.split(",")).length-1;

	var result="";

	for(var i=0;i<size;i++)
	{
		var stat=arrstat.split(",")[i];

		var code=arrcode.split(",")[i];

		var type=arrtype.split(",")[i];
		var areaCode=arrareaCode.split(",")[i];

		for(var j=0;j<arrtypevalue.length;j++)
		{
			if(stat!=null && stat=="0" && type!=null && type == arrtypevalue[j] && areaCode != null && areaCode == mainAreaCode)
			{
				result=result+"<option value=" + code + ">" + code + "</option>"
				continue;
			}
		}

	}

	return result;
}

function accountList_getTypedOptionStringnoself(acctno,cardOwnerMark,acctTypes,included,areacode,regmode,AsiaState,auth,isRegistedCard,isNotBussinessCard)
//屏蔽原账号 银期转账 zhouwei200909
{//alert("js"+acctno);
	var temp="";
	var ret="";
	if(acctTypes=="undefined"||acctTypes==null||acctTypes=="")
		return "";

	if(included)
	{
		for(var i=0;i<this.data.length;i++){
			ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
			if(this.data[i].acctType.indexOf("A")==-1
					&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
					&&(areacode==""||(this.data[i].areaCode==areacode))
					&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
					&&( ret == "0"
							|| ret == "1" || ret == "2" || ret == "3"
							|| ret == "4" || ret == "5" || ret == "6" || ret == "8")
					&&(isRegistedCard==null||isRegistedCard==""||(this.data[i].isRegistedCard==isRegistedCard))
					&&(isNotBussinessCard==null
							||isNotBussinessCard==""
								||isNotBussinessCard==false
								||(accountList_isBussinessCard(this.data[i].cardNum)!=isNotBussinessCard)))
		        {
		        if(this.data[i].cardNum!=acctno)
		          temp+="<option value="+i+">"+this.data[i].getDescString();

		        }
		    else if(this.data[i].acctType.indexOf("A")!=-1
		    		&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
		    		&&(AsiaState!=null&&AsiaState.indexOf("|"+this.data[i].acctProp+"|")!=-1)
		    		&&(auth==null||auth==""||((this.data[i].auth).substring(0,2)==auth)))
		        {
		        if(this.data[i].cardNum!=acctno)
		        temp+="<option value="+i+">"+this.data[i].getDescString();
		       }
	}
	}
	else
	{
		for(var j=0;j<this.data.length;j++){
			ret = compareMarkAndType(this.data[j].cardOwnerMark ,cardOwnerMark,this.data[j].cardOwnerType);
			if(this.data[j].acctType.indexOf("A")==-1
					&&acctTypes.indexOf("|"+this.data[j].acctType+"|")==-1
					&&(areacode==""||(this.data[j].areaCode==areacode))
					&&(regmode==null||regmode==""||(this.data[j].regMode==regmode))
					&&( ret == "0"
							|| ret == "1" || ret == "2" || ret == "3"
							|| ret == "4" || ret == "5" || ret == "6" || ret == "8")
					&&(isRegistedCard==null||isRegistedCard==""||(this.data[j].isRegistedCard==isRegistedCard))
					&&(isNotBussinessCard==null
							||isNotBussinessCard==""
								||isNotBussinessCard==false
								||(accountList_isBussinessCard(this.data[j].cardNum)!=isNotBussinessCard)))
		         {
		        if(this.data[j].cardNum!=acctno)
		        temp+="<option value="+j+">"+this.data[j].getDescString();
		      }
		    else if(this.data[j].acctType.indexOf("A")!=-1
		    		&&acctTypes.indexOf("|"+this.data[j].acctType+"|")==-1
		    		&&(AsiaState!=null&&AsiaState.indexOf("|"+this.data[j].acctProp+"|")!=-1)
		    		&&(auth==null||auth==""||((this.data[j].auth).substring(0,2)==auth)))
		         {
		        if(this.data[j].cardNum!=acctno)
		        temp+="<option value="+j+">"+this.data[j].getDescString();
		         }
	}
	}


	return temp;
}

/*获得用于select中的option的字符串：显示指定类型的注册卡（不包括商务卡）
acctTypes: 注册卡的类型
areacode： 地区码
remitTranLag:是否检查Fova账户转帐权限
auther：   lixf
date：     2006-8-11
*/
function accountList_getTypedOptionWithoutBusinessForNetbook(cardOwnerMark,acctTypes,areacode,regmode,AsiaState,cardIndex,cardNum,remitTranLag)
{
  var temp="";
  var ret="";
  var isSelected = "";
	if(acctTypes=="undefined"||acctTypes==null||acctTypes=="")
		return "";
	var cardbinstr5 = dyTopFrame.cardBinList.getEMVCard();
	for(var i=0;i<this.data.length;i++)
	{
		if(filterCardNumber(this.data[i].cardNum,cardNum)){
			//如果卡列表中的这个卡号等于传入的卡号，就跳过，进行过滤。其它不变。
			continue;
		}
		if(this.data[i].cardNum.indexOf("62")!=0
				&& this.data[i].cardNum.indexOf("955888")!=0){
			//如果卡号不是以62或955888开头，就跳过，进行过滤。
			continue;
		}
		var cardbin = "|"+dyTopFrame.cardBinList.getCardBin(this.data[i].cardNum)+"|";
		
		if(cardbinstr5.indexOf(cardbin)!=-1){
			continue;
		}
		
		if(this.data[i].acctType=="R"){
			ret="0";
		}
		else{
			ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
		}
		if(this.data[i].acctType.indexOf("A")==-1
				&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
				&&(areacode==""||(this.data[i].areaCode==areacode))
				&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
				&&!accountList_isBussinessCard(this.data[i].cardNum)
				&&( ret == "0"
						|| ret == "1" || ret == "2" || ret == "3"
						|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
		{

			if((remitTranLag =='1') && (this.data[i].RemitTRANLAG == '0' )){
				continue;
			}

		    if(cardIndex!=null && this.data[i].cardNum == cardIndex){
		    	isSelected = "selected";
		    }else{
		    	isSelected = "";
		    }
		    temp+="<option value="+i+" "+isSelected+">"+this.data[i].getDescString();

		}
		else if(this.data[i].acctType.indexOf("A")!=-1
				&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
				&&(AsiaState!=null&&AsiaState.indexOf("|"+this.data[i].acctProp+"|")!=-1))
		{
		    if(cardIndex!=null && this.data[i].cardNum == cardIndex){
		    	isSelected = "selected";
		    }else{
		    	isSelected = "";
		    }
		    temp+="<option value="+i+" "+isSelected+">"+this.data[i].getDescString();
		}

	}
	if(temp=="")
		temp="<option value=no selected>---没有满足条件的卡号---";
	return temp;
}

/**
 * 根据不同的查询类型，0:不区分业务地 1:当前业务地 2 非当前业务地 显示指定类型的注册卡（不包括商务卡）
 * 并优先显示本业务地的卡号
 * @param {String} cardOwnerMark
 * @param {String} acctTypes  注册卡的类型
 * @param {String} areacode 地区码
 * @param {String} regmode 注册模式 0-柜面注册 1-网银注册
 * @param {String} Checkmode 0:不区分业务地 1:当前业务地 2 非当前业务地
 * @param {String} cardno 默认选中卡号
 * @param {String} openSign 地区开通标志
 *
 * @auther kfzx-yangjing01
 * @date 2011-02-14
 */

function accountList_getTypedOptionByCheckmodeWithoutBusiness(cardOwnerMark,acctTypes,areacode,regmode,Checkmode,cardno,openSign)
{	
	var temp="";
	var ret="";
	var isSelected = "";
	if(acctTypes=="undefined"||acctTypes==null||acctTypes=="")
		return "";
	//筛选
	var str = "|";
	for(var i=0;i<this.data.length;i++)
	{
		ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
		if(Checkmode=="0"&&this.data[i].acctType.indexOf("A")==-1
				&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
				&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
				&&!accountList_isBussinessCard(this.data[i].cardNum)
				&&( ret == "0"
					|| ret == "1" || ret == "2" || ret == "3"
					|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
		{
			var openRegsign="";
			for(var j=0;j<this.data.length;j++){
				if(this.data[i].cardNum==this.data[j].cardNum&&this.data[j].isRegistedCard){
					openRegsign=this.data[j].acctlist_openregsign;
					openRegsign=openRegsign.charAt(openSign);
				}
			}
			if(openRegsign=="2") continue;
		    if(cardno!=null && this.data[i].cardNum == cardno){
		    	isSelected = "selected";
		    }else{
		    	isSelected = "";
		    }
		    if(str.indexOf("|"+this.data[i].cardNum+"|") == -1)
		    {
		    	temp+="<option value="+acctList.getParentCardIndex(i)+" "+isSelected+">"+this.data[i].getDescStringForByCheckmode();
		    	str = str + this.data[i].cardNum + "|";
		    }
		    //alert(str)

		}//当前业务地
		else if(Checkmode=="1"&&this.data[i].acctType.indexOf("A")==-1
				&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
				&&(areacode==""||(this.data[i].areaCode==areacode))
				&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
				&&!accountList_isBussinessCard(this.data[i].cardNum)
				&&( ret == "0"
					|| ret == "1" || ret == "2" || ret == "3"
					|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
		{
			var openRegsign1="";
			for(var jj=0;jj<this.data.length;jj++){
				if(this.data[i].cardNum==this.data[jj].cardNum&&this.data[jj].isRegistedCard){
					openRegsign1=this.data[jj].acctlist_openregsign;
					openRegsign1=openRegsign1.charAt(openSign);
				}
			}
			if(openRegsign1=="2") continue;
		    if(cardno!=null && this.data[i].cardNum == cardno){
		    	isSelected = "selected";
		    }else{
		    	isSelected = "";
		    }
		    
		    
			if(str.indexOf("|"+this.data[i].cardNum+"|") == -1)
			{
				temp+="<option value="+acctList.getParentCardIndex(i)+" "+isSelected+">"+this.data[i].getDescStringForByCheckmode();
				str = str + this.data[i].cardNum + "|";
			}
		}//非当前业务地
		else if(Checkmode=="2"&&this.data[i].acctType.indexOf("A")==-1
				&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
				&&(areacode==""||(this.data[i].areaCode!=areacode))
				&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
				&&!accountList_isBussinessCard(this.data[i].cardNum)
				&&( ret == "0"
					|| ret == "1" || ret == "2" || ret == "3"
					|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
		{
			var openRegsign3="";
			for(var jjj=0;jjj<this.data.length;jjj++){
				if(this.data[i].cardNum==this.data[jjj].cardNum&&this.data[jjj].isRegistedCard){
					openRegsign3=this.data[jjj].acctlist_openregsign;
					openRegsign3=openRegsign3.charAt(openSign);
				}
			}
			if(openRegsign3=="2") continue;
		    if(cardno!=null && this.data[i].cardNum == cardno){
		    	isSelected = "selected";
		    }else{
		    	isSelected = "";
		    }
		    if(str.indexOf("|"+this.data[i].cardNum+"|") == -1)
			{
		    	temp+="<option value="+acctList.getParentCardIndex(i)+" "+isSelected+">"+this.data[i].getDescStringForByCheckmode();
		    	str = str + this.data[i].cardNum + "|";
			}
		}

	}//不区分业务地
	if(temp=="")
		temp="<option value=no selected>没有满足条件的卡（账）号";
	return temp;
}
//用于客户服务下联名积分查询
function accountList_customGetTypedOptionString(cardOwnerMark,acctTypes,included,areacode)
{
	var temp="";
	var ret="";
	if(acctTypes=="undefined"||acctTypes==null||acctTypes=="")
		return "";

	if(included)
	{
		for(var i=0;i<acctList.data.length;i++)
		{
		    ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
			var cardbinstr= dyTopFrame.cardBinList.SupportCardBin(3);
			var cardbinstr1= dyTopFrame.cardBinList.SupportCardBin(4);

			var cardbin="|"+ dyTopFrame.cardBinList.getCardBin(acctList.data[i].cardNum)+"|";

			if((cardOwnerMark==null||cardOwnerMark==""||(acctList.data[i].cardOwnerMark==cardOwnerMark))
					&&(areacode==""||(acctList.data[i].areaCode==areacode))&&acctTypes.indexOf("|"+acctList.data[i].acctType+"|")!=-1
					&& (cardbinstr.indexOf(cardbin)==-1||(cardbinstr1.indexOf(cardbin)!=-1&&(acctList.data[i].cardNum.substring(9,10) != "7"||acctList.data[i].cardNum.substring(9,10) != "8" )))
    				&&( ret == "0"
    					|| ret == "1" || ret == "2" || ret == "3"
    					|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
				temp+="<option value="+i+">"+acctList.data[i].getDescString();
		}
	}
	else
	{
		for(var j=0;j<acctList.data.length;j++)
			{
            ret = compareMarkAndType(this.data[j].cardOwnerMark ,cardOwnerMark,this.data[j].cardOwnerType);
			var cardbinstr= dyTopFrame.cardBinList.SupportCardBin(3);
			var cardbinstr1= dyTopFrame.cardBinList.SupportCardBin(4);
			var cardbin="|"+ dyTopFrame.cardBinList.getCardBin(acctList.data[j].cardNum)+"|";
			if((cardOwnerMark==null||cardOwnerMark==""||(acctList.data[j].cardOwnerMark==cardOwnerMark))&&(areacode==""||(acctList.data[j].areaCode==areacode))&&acctTypes.indexOf("|"+acctList.data[j].acctType+"|")==-1  && (cardbinstr.indexOf(cardbin)==-1||(cardbinstr1.indexOf(cardbin)!=-1&&(acctList.data[j].cardNum.substring(9,10) != "7"||acctList.data[j].cardNum.substring(9,10) != "8" )))
    				&&( ret == "0"
    					|| ret == "1" || ret == "2" || ret == "3"
    					|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
				temp+="<option value="+j+">"+acctList.data[j].getDescString();
	}
	}
	if(temp=="")
		temp="<option value=no>没有满足条件的卡号";
	return temp;
}
//开通关闭visa/万事达验证服务专用
function accountList_getVBVTypedOptionString(cardOwnerMark,cardIndex,diners3dOpenFlag)
{
    var temp="";
    var ret="";
    var sel = "";
    var V3Dcardbinstr=dyTopFrame.cardBinList.SupportCardBin(10);
    var M3Dcardbinstr=dyTopFrame.cardBinList.SupportCardBin(11);
    var Vcardbinstr=dyTopFrame.cardBinList.SupportCardBin(12);
    var Mcardbinstr=dyTopFrame.cardBinList.SupportCardBin(13);
    //201301版本 测试中心要求放开投产前屏蔽JCB卡 add by kfzx-heq01
    var JCBcardbinstr=dyTopFrame.cardBinList.SupportCardBin(21);
    var JCB3Dcardbinstr=dyTopFrame.cardBinList.SupportCardBin(22);
	//201211版本 投产前屏蔽AE卡 add by kfzx-heq01
	var AEBcardbinstr=dyTopFrame.cardBinList.SupportCardBin(9);
	var AEB3Dcardbinstr=dyTopFrame.cardBinList.SupportCardBin(23);
    //大来卡 20138月版本 add by kfzx-yueyt 
    var DinerCardbinstr = dyTopFrame.cardBinList.SupportCardBin(24);
    var Diner3DCardbinstr = dyTopFrame.cardBinList.SupportCardBin(25);

    for(var i=0;i<acctList.data.length;i++){
        ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
        var cardnum=acctList.data[i].cardNum;
        var cardbin=dyTopFrame.cardBinList.getCardBin(cardnum);
        if(((Vcardbinstr.indexOf(cardbin)!=-1 &&V3Dcardbinstr.indexOf(cardbin)!=-1)
            ||(Mcardbinstr.indexOf(cardbin)!=-1 && M3Dcardbinstr.indexOf(cardbin)!=-1)
            //201301版本 测试中心要求放开投产前屏蔽JCB卡 add by kfzx-heq01
            ||(JCBcardbinstr.indexOf(cardbin)!=-1 && JCB3Dcardbinstr.indexOf(cardbin)!=-1)
            //201211版本 投产前屏蔽AE卡 add by kfzx-heq01
            ||(AEBcardbinstr.indexOf(cardbin)!=-1 && AEB3Dcardbinstr.indexOf(cardbin)!=-1)
            //大来卡 20138月版本 add by kfzx-yueyt 
            ||(parseInt(diners3dOpenFlag,10) == 1 && DinerCardbinstr.indexOf(cardbin)!=-1 && Diner3DCardbinstr.indexOf(cardbin)!=-1)
            )
            &&(acctList.data[i].isRegistedCard==true)
            &&(acctList.data[i].acctType== "007" ||acctList.data[i].acctType =="008")
            &&(cardOwnerMark==null||cardOwnerMark==""||(acctList.data[i].cardOwnerMark==cardOwnerMark))
			&&( ret == "0"
				|| ret == "1" || ret == "2" || ret == "3"
				|| ret == "4" || ret == "5" || ret == "6" || ret == "8")){
                if(acctList.data[i].cardNum==cardIndex)
                {
                    sel = "selected";
                }
                else
                {
                    sel = "";
                }
                temp+="<option value="+i+" " + sel + ">"+acctList.data[i].getDescString();
            }
    }
    if(temp=="")
    temp="<option value=no>没有满足条件的卡号";

    return temp;
}
//获取注册商务卡专用
function accountList_getBussinessCardOptionString(cardOwnerMark,cardIndex)
{
    var ret="";
	var temp="";
	for(var i=0;i<acctList.data.length;i++)
	{
	    ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
		var cardnum=acctList.data[i].cardNum;
		if(accountList_isBussinessCard(cardnum)&&(cardOwnerMark==null||cardOwnerMark==""||(acctList.data[i].cardOwnerMark==cardOwnerMark))
			&&( ret == "0"
				|| ret == "1" || ret == "2" || ret == "3"
				|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
		{
            if(acctList.data[i].cardNum==cardIndex)
            {
                sel = "selected";
            }
            else
            {
                sel = "";
            }
            temp+="<option value="+i+" " + sel + ">"+acctList.data[i].getDescString();
		}
	}
	if(temp=="")
		temp="<option value=no>没有满足条件的卡号";

	return temp;
}



/**
 * 基金转托管专用: 显示除某一业务地之外的已开立基金交易账户的卡列表,以及未开立基金交易卡地区所有满足条件的卡
 * 并优先显示本业务地的卡号
 * @param {String} cardOwnerMark
 * @param {String} acctTypes  注册卡的类型
 * @param {String} areacode 地区码
 * @param {String} regmode 注册模式 0-柜面注册 1-网银注册
 * @param {String} cardno 默认选中卡号
 * @param {String} openSign 地区开通标志
 *
 * @auther kfzx-yangjing01
 * @date 2011-02-14
 */

function accountList_getFundSwitchCard(cardOwnerMark,acctTypes,areacode,regmode,cardno,openSign)
{
	var temp="";
	var ret="";
	var isSelected = "";
	var AreaCodeflag="";//标记已开立基金交易账户的地区
	var outCardType="|001|003|011|007|999|";
	if(acctTypes=="undefined"||acctTypes==null||acctTypes=="")
		return "";
	//筛选
	for(var i=0;i<this.data.length;i++)
	{
		ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
		//非当前业务地 的基金交易卡
		if(this.data[i].acctType.indexOf("A")==-1
				&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
				&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
				&&!accountList_isBussinessCard(this.data[i].cardNum)
				&&( ret == "0"
					|| ret == "1" || ret == "2" || ret == "3"
					|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
		{
			var openRegsign="";
			for(var jjj=0;jjj<this.data.length;jjj++){
				if(this.data[i].cardNum==this.data[jjj].cardNum&&this.data[jjj].isRegistedCard){
					openRegsign=this.data[jjj].acctlist_openregsign;
					openRegsign=openRegsign.charAt(openSign);
				}
			}
			AreaCodeflag+=this.data[i].areaCode+"|";
			if(openRegsign=="2"||this.data[i].areaCode==areacode) continue;
		    if(cardno!=null && this.data[i].cardNum == cardno){
		    	isSelected = "selected";
		    }else{
		    	isSelected = "";
		    }
		    temp+="<option value="+acctList.getParentCardIndex(i)+" "+isSelected+">"+this.data[i].getDescStringForByCheckmode();
		}
	}
	for(var j=0;j<this.data.length;j++){//查找未开立基金交易账户的地区是否有符合条件的交易卡
		ret = compareMarkAndType(this.data[j].cardOwnerMark ,cardOwnerMark,this.data[j].cardOwnerType);
		if(outCardType.indexOf("|"+this.data[j].acctType+"|")!=-1
				&&AreaCodeflag.indexOf(this.data[j].areaCode)==-1
				&&!accountList_isBussinessCard(this.data[j].cardNum)
				&&( ret == "0"
						|| ret == "1" || ret == "2" || ret == "3"
						|| ret == "4" || ret == "5" || ret == "6" || ret == "8"))
		{
			for(var k=0;k<this.data.length;k++){
				if(this.data[j].cardNum==this.data[k].cardNum&&this.data[k].isRegistedCard){
					openRegsign4=this.data[k].acctlist_openregsign;
					openRegsign4=openRegsign4.charAt(openSign);
				}
			}
			if(openRegsign4=="2") continue;
		    if(cardno!=null && this.data[j].cardNum == cardno){
		    	isSelected = "selected";
		    }else{
		    	isSelected = "";
		    }
		    temp+="<option value="+acctList.getParentCardIndex(j)+" "+isSelected+">"+this.data[j].getDescString();
		}

	}
	if(temp=="")
		temp="<option value=no selected>没有满足条件的卡（账）号";
	return temp;
}


//获得指定下挂账户的交易卡(不包含国际卡和商务卡)
function accountList_getCardTypedAcctOptionString(cardOwnerMark, cardTypes,
		areacode, regmode, acctTypes, queryFlag, cardSelect) {
	var temp = "";
	var ret = "";
	var cardTemp = "";
	var cardSeq = 0;
	if (queryFlag == null || queryFlag == "")
		queryFlag = true;

	// 筛选下挂账户,从cardTypes中筛选出包含acctTypes的卡
	for ( var i = 0; i < this.data.length; i++) {
		ret = compareMarkAndType(this.data[i].cardOwnerMark, cardOwnerMark,
				this.data[i].cardOwnerType);
		if (this.data[i].acctType.indexOf("A") == -1
				&& !accountList_isBussinessCard(this.data[i].cardNum)
				&& (cardTypes == "" || cardTypes == null || cardTypes
						.indexOf("|" + this.data[cardSeq].acctType + "|") != -1)
				&& (areacode == "" || areacode == null || (this.data[i].areaCode == areacode))
				&& (regmode == null || regmode == "" || (this.data[i].regMode == regmode))
				&& (ret == "0" || ret == "1" || ret == "2" || ret == "3"
						|| ret == "4" || ret == "5" || ret == "6" || ret == "8")) {

			if (!this.data[i].isRegistedCard) { // 循环下挂账户
				if ((acctTypes == null
						|| !acctTypes
						|| acctTypes == ''
						|| acctTypes.indexOf("|" + this.data[i].acctType + "|") != -1 || (this.data[cardSeq].acctType == "999" && !queryFlag))
						&& (this.data[i].acctType == "68" || this.data[i].acctProp != "001")) {
					if (cardTemp.indexOf(this.data[i].cardNum) != -1)
						continue;
					if(cardSelect == this.data[i].cardNum)
						temp += "<option value=" + cardSeq + " selected>"
							+ this.data[cardSeq].getDescString();
					else
						temp += "<option value=" + cardSeq + ">"
						+ this.data[cardSeq].getDescString();
						

					cardTemp = cardTemp + "|" + this.data[cardSeq].cardNum;

				}

			} else {
				cardSeq = i; // 返回该下挂账户对应卡序号
			}
		}
	}
	if (temp == "")
		temp = "<option value=no>没有满足条件的卡（账）号";
	return temp;
}

/*
 * 获得指定下挂帐户类型的注册卡序号
 *
 * cardNum:指定卡号 acctType:指定下挂账户类型
 */
function accountList_getTypedAcctPro(cardNum, acctType) {
	var seq = "no";
	for ( var i = 0; i < this.data.length; i++) {
		if (this.data[i].cardNum == cardNum
				&& this.data[i].acctType == acctType
				&& !this.data[i].isRegistedCard) {

			seq = i;
			break;
		}
	}
	return seq;
}
/**
 * 根据下挂账户索引取账户所属卡的索引值
 * subAccIndex 下挂账户对应索引值
 */
function accountList_getParentCardIndex(subAccIndex) {
	if(this.data[subAccIndex].isRegistedCard==true)
		return subAccIndex;
	else if(subAccIndex<this.data.length){
		for ( var i = 0; i < this.data.length; i++) {
			if( this.data[i].isRegistedCard==true && this.data[i].cardNum==this.data[subAccIndex].cardNum ){
				return i;
			}
		}
	}
	return subAccIndex;
}


/*
 * 获得指定的注册卡
 *
 * cardNum:指定卡号
 */
function accountList_getCardString(cardNum) {
	var temp = "";
	for ( var i = 0; i < this.data.length; i++) {
		if (this.data[i].cardNum == cardNum && this.data[i].isRegistedCard) {
			temp += "<option value=" + i + " selected" + ">"
					+ this.data[i].getDescString();
			break;
		}
	}
	if (temp == "")
		temp = "<option value=no selected>---没有满足条件的卡号---";
	return temp;
}

/*
 * 获得指定的注册卡托管权限
 *
 * cardNum:指定卡号
 */
function accountList_getCardOwnerTypeString(cardNum) {
	var type = "";
	for ( var i = 0; i < this.data.length; i++) {
		if (this.data[i].cardNum == cardNum && this.data[i].isRegistedCard) {
			type = this.data[i].cardOwnerType;
			break;
		}
	}
	return type;
}

//获取所有满足账户贵金属交易条件的卡
function accountList_getGoldCardOptionString(cardOwnerMark, cardTypes,
		areacode, regmode, acctTypes) {
	var temp = "";
	var ret = "";
	var cardTemp = "";
	var cardSeq = 0;

	// 筛选下挂账户,从cardTypes中筛选出包含acctTypes的卡
	for ( var i = 0; i < this.data.length; i++) {
		ret = compareMarkAndType(this.data[i].cardOwnerMark, cardOwnerMark,
				this.data[i].cardOwnerType);
		if (this.data[i].acctType.indexOf("A") == -1
				&& !accountList_isBussinessCard(this.data[i].cardNum)
				&& (cardTypes == "" || cardTypes == null || cardTypes
						.indexOf("|" + this.data[cardSeq].acctType + "|") != -1)
				&& (areacode == "" || areacode == null || (this.data[i].areaCode == areacode))
				&& (regmode == null || regmode == "" || (this.data[i].regMode == regmode))
				&& (ret == "0" || ret == "1" || ret == "2" || ret == "3"
						|| ret == "4" || ret == "5" || ret == "6" || ret == "8")) {

			if (!this.data[i].isRegistedCard) { // 循环下挂账户
				if (this.data[i].acctProp != "001" && (acctTypes == null
						|| !acctTypes
						|| acctTypes == ''
						|| acctTypes.indexOf("|" + this.data[i].acctType + "|") != -1)) {
					if (cardTemp.indexOf(this.data[i].cardNum) != -1)
						continue;
					temp += "<option value=" + cardSeq + ">"
							+ this.data[cardSeq].getDescString();

					cardTemp = cardTemp + "|" + this.data[cardSeq].cardNum;

				}

			}else if(this.data[cardSeq].acctType == '999'){
				if (cardTemp.indexOf(this.data[i].cardNum) != -1)
					continue;
				temp += "<option value=" + cardSeq + ">"
						+ this.data[cardSeq].getDescString();

				cardTemp = cardTemp + "|" + this.data[cardSeq].cardNum;
				cardSeq = i;
			}else {
				cardSeq = i; // 返回该下挂账户对应卡序号
			}
		}
	}
	if (temp == "")
		temp = "<option value=no>没有满足条件的卡（账）号";
	return temp;
}

/*对特定卡bin账户优先排列，用于：1社保卡账户列表  add by guohy
参数：
cardOwnerMark 本他人，本人（'<%=(String)sessionCtx.getValueAt("operatorId") + "|3"%>'） |3为权限
acctTypes 卡（账）户类型
areacode 本异地标志，本地/""
regmode 注册类型，注册类型/""
carbin 指定carbin
*/
function accountList_getTypedOptionSortByCarBin(cardOwnerMark,acctTypes,areacode,regmode,carbin,AsiaState,auth,isRegistedCard,isNotBussinessCard,cardIndex,agrFlag)
{
	var temp="";	//carbin卡串
	var temp1="";	//非carbin卡串
	var ret="";
	if(acctTypes=="undefined"||acctTypes==null||acctTypes=="")
		return "";
	for(var i=0;i<this.data.length;i++){
			ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
			if(this.data[i].acctType.indexOf("A")==-1
					&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
					&&(areacode==""||(this.data[i].areaCode==areacode))
					&&(regmode==null||regmode==""||(this.data[i].regMode==regmode))
					&&( ret == "0"
							|| ret == "1" || ret == "2" || ret == "3"
							|| ret == "4" || ret == "5" || ret == "6" || ret == "8")
					&&(isRegistedCard==null||isRegistedCard==""||(this.data[i].isRegistedCard==isRegistedCard))
					&&(isNotBussinessCard==null
							||isNotBussinessCard==""
							||isNotBussinessCard==false
							||(accountList_isBussinessCard(this.data[i].cardNum)!=isNotBussinessCard))
					&&(agrFlag==null||agrFlag==""||(this.data[i].agrFlag==agrFlag))){
   			    if(cardIndex!=null && this.data[i].cardNum == cardIndex){
			    	isSelected = "selected";
			    }else{
			    	isSelected = "";
			    }
   			    if(dyTopFrame.cardBinList.getCardBin(this.data[i].cardNum) == carbin)
   			    	temp+="<option value="+i+" "+isSelected+">"+this.data[i].getDescString();
   			    else
   			    	temp1+="<option value="+i+" "+isSelected+">"+this.data[i].getDescString();
			}else if(this.data[i].acctType.indexOf("A")!=-1
		    		&&acctTypes.indexOf("|"+this.data[i].acctType+"|")!=-1
		    		&&(AsiaState!=null&&AsiaState.indexOf("|"+this.data[i].acctProp+"|")!=-1)
		    		&&(auth==null||auth==""||((this.data[i].auth).substring(0,2)==auth))
		    		&&(agrFlag==null||agrFlag==""||(this.data[i].agrFlag==agrFlag))){
			    if(cardIndex!=null && this.data[i].cardNum == cardIndex){
			    	isSelected = "selected";
			    }else{
			    	isSelected = "";
			    }
   			    if(dyTopFrame.cardBinList.getCardBin(this.data[i].cardNum) == carbin)
   			    	temp+="<option value="+i+" "+isSelected+">"+this.data[i].getDescString();
   			    else
   			    	temp1+="<option value="+i+" "+isSelected+">"+this.data[i].getDescString();
			}
	}
	
	if(temp==""&&temp1=="")
		temp="<option value=no>没有满足条件的卡（账）号";
	return temp+temp1;
}

//---------------------------------------------------
