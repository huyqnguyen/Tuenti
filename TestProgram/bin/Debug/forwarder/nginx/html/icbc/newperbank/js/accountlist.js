//���տ��ŵĳ��Ⱥ͹���Կ��Ž��зָ�չʾ
function cardNumberDivide(cardNum)
{
	try{
		var invalidCharset="!@#$%^&*";
		var myReg=eval("/["+invalidCharset+"]/g");
		
		//�ж��ַ����Ƿ�����ָ��ģʽ
		if(myReg.test(cardNum)){
			//alert("�����в��ܰ����Ƿ��ַ�" + "!@#$%^&" + '"' + "'\\\\'" + "�Ϳո�");
			return cardNum;
		}
		
		//����ַ������Ƿ���ȫ���ַ�
		if(cardNum.replace(/[\x00-\xff]/g,"").length != 0){
			//alert("�������벻Ҫ����ȫ���ַ�");
			return cardNum;
		}
		
		//2014��4�£�֧����ó����
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
//��ȡһ���˻��������ַ�������ʽΪ
//	ע�Ῠ������
//	�¹��˻�����ͨ������ �˻����� �˺�
//���ڻ���
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
		return this.acctCode + " �������� " + this.acctNum + " " + this.acctAlias;
	else
	     return this.acctCode + " " + this.acctDesc + " " + this.acctNum + " " + this.acctAlias;
}

//��ȡһ���˻��������ַ�������ʽΪ
//	ע�Ῠ������
//	�¹��˻�����ͨ������ �˻����� �˺�
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
		return this.acctCode + " �������� " + this.acctNum + " " + this.acctAlias;
	else
	     return this.acctCode + " " + this.acctDesc + " " + cardNum_prefix + this.acctNum + " " + this.acctAlias;
}
//����������ע�Ῠ�б��°����¹ҿ�������
function account_getDesc()
{
	if(this.isRegistedCard)
		return this.areaName+" "+this.cardNum + " " +accountList_getAcctTypeDesc(this.acctType,this.cardNum,this.acctProp)+" "+ this.cardAlias;

	else if(this.acctType=="04"&&this.acctProp=="006")
		 return this.acctCode + " �������� " + this.acctNum + " " + this.acctAlias;
	else if(this.acctType=="21"||this.acctType=="22"||this.acctType=="20")
		 return this.areaName+" "+this.acctNum+" "+ accountList_getAcctTypeDesc(this.acctType,this.acctNum,this.acctProp)+" "+this.acctAlias;
	else
	     return this.acctCode + " " + this.acctDesc + " " + this.acctNum + " " + this.acctAlias;
}
/**
 *
 * �ṩaccountList_getTypedOptionByCheckmodeWithoutBusinessʹ��
 * ����ָ�������˻������ַ��� ��������+����+������+������
 * @return {String}  �˻������ַ���
 */
function account_getDescStringForByCheckmode()
{
	//�õ�����ʻ��󶨵�ע�Ῠ������
	//������
	var cardCardAlias="";
	for(var i=0;i<acctList.len();i++){
		if(this.cardNum==acctList.data[i].cardNum&&this.cardNum&&acctList.data[i].isRegistedCard){
			AcctTypeDesc=accountList_getAcctTypeDesc(acctList.data[i].acctType,acctList.data[i].cardNum,acctList.data[i].acctProp)
			cardCardAlias=acctList.data[i].cardAlias;
		}
	}
	return this.areaName+" "+this.cardNum + " " +AcctTypeDesc+" "+ cardCardAlias;
}

//���������һ���˻�������ע�Ῠ�˻����¹��˻�
//	���ԣ�isRegistedCard��true��ע�Ῠ;false���¹��˻�
//	     cardOwnerMark�������б������˿��ţ�0�����ˣ�1����һ�����˿� 2���ڶ������˿��������� (���й��˻�֧��200708�汾�޸������ֵ�)
//  cardOwnerMark
//��cardOwnerMark������cardOwnerType�������й�Ȩ���ж�
//��agrFlag������RemitTRANLAG�������й�Ȩ���ж�
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
	this.cardOwnerType = cardOwnerType;// �����й�Ȩ���ж�
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
	this.RemitTRANLAG = RemitTRANLAG;//�������޽�����������
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
//������������ڱ��ͻ�������ע���˺ź��¹��˺ŵ��б�
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
   this.getQryBasicInfoInputOptionString=accountList_getQryBasicInfoInputOptionString;//1004�����ֹ�����
   this.findAccountDataByCardNo=accountList_findAccountDataByCardNo;
   this.getAcctTypeDesc=accountList_getAcctTypeDesc;	//add fsl
   this.getSubRegCardOptionString=accountList_getSubRegCardOptionString
//=============tianf start ===================
   this.getTypedOptionStringSelected=accountList_getTypedOptionStringSelected;
//=============tianf end =====================
   this.ForeigngetTypedOptionString=accountList_ForeigngetTypedOptionString;//add ml
   this.ForeigngetTypedOptionStringDelAcct=accountList_ForeigngetTypedOptionStringDelAcct;
   //============================added by yangjing=================================
   //�������select�е�option���ַ�������ʾָ�����͵Ŀ��б������˺�����ָ���Ľ��׿���
   this.getTypedOptionWithoutCard=accountList_getTypedOptionWithoutCard;

   //============================added by lixf=================================
   //�������select�е�option���ַ�������ʾָ�����͵Ŀ��б����������񿨣�
   this.getTypedOptionWithoutBusiness=accountList_getTypedOptionWithoutBusiness;
   //�������select�е�option���ַ�������ʾָ�����͵Ŀ��б����������񿨣�,����ʾ�й��˻�
   this.getTypedOptionWithoutBusinessForTrust=accountList_getTypedOptionWithoutBusinessForTrust;

   this.getTypedOptionWithoutBusinessNoSelected=accountList_getTypedOptionWithoutBusinessNoSelected;
   //�������select�е�option���ַ�������ʾָ������ָ�����͵��¹��˻������������񿨣�
   this.getHangAcctOpWithoutBusiness=accountList_getHangAcctOpWithoutBusiness;
   this.getHangAcctOpWithoutBusinessWithAcctNo=accountList_getHangAcctOpWithoutBusinessWithAcctNo;
   //�������select�е�option���ַ�������ʾ�ҵ��˻���������¹��˻������������񿨣�
   this.getHangAcctsOpWithoutBusiness=accountList_getHangAcctsOpWithoutBusiness;

   this.getCardTypedAcctOptionString=accountList_getCardTypedAcctOptionString;
   this.getTypedAcctPro=accountList_getTypedAcctPro;
   this.getCardString=accountList_getCardString;
   this.getCardOwnerTypeString=accountList_getCardOwnerTypeString;
   this.getGoldCardOptionString=accountList_getGoldCardOptionString;

   //�жϿ��Ƿ�Ϊ���񿨣������񿨷���ture���������񿨷���false
   this.isBussinessCard=accountList_isBussinessCard;
   //����ָ���ʻ�������
   this.getAccountDescript = accountList_getAccountDescript;
   //�������select�е�option���ַ�������ʾָ�����͵Ŀ��б����������񿨣������Է���������ÿ�
   this.getTypedOptionForCard=accountList_getTypedOptionForCard;

   this.getTypedOptionStringnoself = accountList_getTypedOptionStringnoself;
   
   //�������select�е�option���ַ�������ʾָ�����͵Ŀ��б����������񿨡��Ƹ�����������62��955888��ͷ��
   this.getTypedOptionWithoutBusinessForNetbook=accountList_getTypedOptionWithoutBusinessForNetbook;
   
   //============================added by fengys=================================
   //�������select�е�option���ַ�������ʾָ�����͵Ŀ��б��������񿨺�ָ���Ľ��׿���
   this.getTypedOptionWithoutCard2=accountList_getTypedOptionWithoutCard2;
   //�������select�е�option���ַ�������ʾָ�����͵Ŀ��б����������񿨣�
   this.getTypedOptionWithoutBusiness2=accountList_getTypedOptionWithoutBusiness2;


   //============================added by xuweixing=================================
   //�������select�е�option���ַ�������ʾָ�����͵Ŀ��б����������񿨣���ֻ��ʾ˫���ִ��ǿ�
   this.getTypedOptionForeignVisa=accountList_getTypedOptionForeignVisa;
   //�������select�е�option���ַ�������ʾָ������ָ�����͵��¹��˻������������񿨣���ֻ��ʾ˫���ִ��ǿ�
   this.getHangAcctOpForeignVisa=accountList_getHangAcctOpForeignVisa;
   //�жϿ��Ƿ�Ϊ���񿨣������񿨷���ture���������񿨷���false
   this.isDoubleCurrCredit=accountList_isDoubleCurrCredit;
   //�������select�е�option���ַ�������ʾ�ҵ��Զ�����ף��޸�Э��ʱѡ��Ļ����
   this.getTypedOptionForRepayCard = accountList_getTypedOptionForRepayCard;//add fuyu
   //�������񿨺���ۿ�
   this.getTypedOptionWithoutBusinessAndHKCard=accountList_getTypedOptionWithoutBusinessAndHKCard;
   //�������񿨺���ۿ���for���˫��ȥ��ָ����
   this.getTypedOptionWithoutBusinessAndHKCardDelCard=accountList_getTypedOptionWithoutBusinessAndHKCardDelCard;
   //�ж��Ƿ�Ϊ��ۿ�
   this.isHKCard=accountList_isHKCard;
   //�������ͻ����Ի�����������Ҫ
   this.getTypedOptionStringForCust=accountList_getTypedOptionStringForCust;
   //��ʾָ�����͵�ע�Ῠ�����������񿨣���ָ�����ź���û�ڿ��б��У����ڿ��б���׷�Ӵ˿��š�
   this.getTypedOptionWithoutBusinessAddNoRegCard=accountList_getTypedOptionWithoutBusinessAddNoRegCard;

   //============================added by yanlong=================================
   //���ش��ǿ������ʿ�����ҿ��֣�����˫���ַ���""
   this.getOverseaCurrType=accountList_getOverseaCurrType;
   //���ݲ�ͬ�Ĳ�ѯ���ͣ�0:������ҵ��� 1:��ǰҵ��� 2 �ǵ�ǰҵ��� ��ʾָ�����͵�ע�Ῠ�����������񿨣� add by kfzx-yanghl01
   this.getTypedOptionByCheckmodeWithoutBusiness=accountList_getTypedOptionByCheckmodeWithoutBusiness;
   //�ͻ��������������ֲ�ѯר��
   this.customGetTypedOptionString=accountList_customGetTypedOptionString;
   //��ͨ�ر�visa/���´���֤����ר��
   this.getVBVTypedOptionString=accountList_getVBVTypedOptionString;
   //��ȡ����ר��
   this.getBussinessCardOptionString=accountList_getBussinessCardOptionString;

   //����ת�йܿ��б����ר��
   this.getFundSwitchCard=accountList_getFundSwitchCard;
   //�����¹��˻�����ȡ�˻�������������ֵ
   AccountList.prototype.getParentCardIndex=accountList_getParentCardIndex;
   //��ǿ���Ŀר�ã�����������ͨ��������Eʱ��������ƽ�
   this.getTypedOptionForDebitCard=accountList_getTypedOptionForDebitCard;
   //�籣�ã���������ָ��carbin�ķ��������б�
   this.getTypedOptionSortByCarBin=accountList_getTypedOptionSortByCarBin;
   //��ҽһ��ͨ��ȡ����ҽԺ���õĿ���
   this.getTypedOptionForHospital=accountList_getTypedOptionForHospital;
   
   // ���ڻ��б�
   this.getDomesticTransferCardOption = accountList_getDomesticTransferCardOption;
}
//��ȡ�˺Ÿ���
function accountList_len()
{
	return this.data.length;
}

//��ȡacctType��������˼
function accountList_getAcctTypeDesc(acct_type, card_num,acct_prop,sk_flag,acctDesc){
	var temp="";
	if(acct_type=="01")
		temp="����";
	else if(acct_type=="00")
		temp="�����˻�";
	else if(acct_type=="02")
		temp="���ڴ浥";
	else if(acct_type=="03")
		temp="��������";
	else if(acct_type=="04"&&acct_prop=="006")
		temp="��������";
	else if(acct_type=="04")
		temp="�����ȡ";
	else if(acct_type=="05")
		temp="�汾ȡϢ";
	else if(acct_type=="06")
		temp="С���Ѻ����";
	else if(acct_type=="07")
		temp="����ȯ";
	else if(acct_type=="08")
		temp="֪ͨ���";
	else if(acct_type=="09")
		temp="������";
	else if(acct_type=="10")
		temp="���";
	else if(acct_type=="11")
		temp="�ڲ���";
	else if(acct_type=="12")
		temp="���ֻ�";
	else if(acct_type=="13")
		temp="���⻧";
	else if(acct_type=="14")
		temp="��λ���ڻ�";
	else if(acct_type=="15")
		temp="����ס������";
	else if(acct_type=="16")
		temp="����һ��ͨ";
	else if(acct_type=="17")
		temp="���ô��";
	else if(acct_type=="21")
		temp="���ǿ�";
	else if(acct_type=="22")
		temp="���ÿ�";
	else if(acct_type=="23")
		temp="���ר���˻�";
	else if(acct_type=="24")
		temp="Ԥ��ר���˻�";
	else if(acct_type=="001")
		temp="���ÿ�";
	else if(acct_type=="002")
		temp="ĵ��ר�ÿ�";
	else if(acct_type=="003"){
		temp="��ͨ��";
		if(sk_flag=="1" || sk_flag == "2"){
			temp=acctDesc;
		}
	}else if(acct_type=="004")
		temp="ĵ�����ר�ÿ�";
	else if(acct_type=="007"){
		temp="���ǿ�";
		if(sk_flag=="1" || sk_flag == "2"){
			temp=acctDesc;
		}	
	}else if(acct_type=="011"){
		var cardbinstr1= dyTopFrame.cardBinList.SupportCardBin(1);
		var cardbinstr2= dyTopFrame.cardBinList.SupportCardBin(2);
 		var cardbinstr5= dyTopFrame.cardBinList.getEMVCard();
 		var cardbin="|"+dyTopFrame.cardBinList.getCardBin(card_num)+"|";
 		if(cardbin=="|955886|" && card_num.substring(10,11)=="9" )
 			temp="e���";
 		else if(cardbinstr5.indexOf(cardbin)!=-1)
 			temp="�����Ƹ���";
 		else if(cardbinstr2.indexOf(cardbin)!=-1)
			temp="��ƽ��˻���";
		else
  		 	temp="eʱ����";
 		
 		if(sk_flag=="1" || sk_flag == "2"){
			temp=acctDesc;
		}
	}
	else if(acct_type=="014")
		temp="�����˻�";
	else if(acct_type=="20")
		temp="���ʿ�";
	else if(acct_type=="008")
		temp="���ʿ�";
	else if(acct_type=="30")
		temp="ʵ��ƽ��˻�";
	else if(acct_type=="32")
		temp="ծȯ";
	else if(acct_type=="31")
		temp="����ʽ����";
	else if(acct_type=="33")
		temp="��ƽ����˻�";
	else if(acct_type=="35")
		temp="֧����֤�ʽ��˻�";		
	else if(acct_type=="36")
		temp="���������˻�";
	else if(acct_type=="50" || acct_type=="68" )
		temp="�˻�����������˻�";
	else if(acct_type=="64")
		temp="˽����������˻�";		
	else if(acct_type=="66")
		temp="������˻�";
	else if(acct_type=="73")
		temp="˽�����л������˻�";
	else if(acct_type=="98")
		temp="�����ۺϴ����˻�";
	else if(acct_type=="993")
		temp="����˻�";
	else if(acct_type=="994")
		temp="�����˻�";
	else if(acct_type=="995")
		temp="��������";
	else if(acct_type=="996")
		temp="����һ��ͨ";
	else if(acct_type=="997")
		temp="�汾ȡϢ";
	else if(acct_type=="998")
		temp="�����ȡ";
	else if(acct_type=="999")
		temp="�����˻�";
	else if(acct_type=="10003")
		temp="��㱣֤���˻�";
	else if(acct_type=="10160")
		temp="֤ȯ�ʽ��˻�";
	else if(acct_type=="10170")
		temp="�ڻ���˾�ʽ��˻�";
	else if(acct_type=="A001")
	    temp="�����˻�"
	else if(acct_type=="A002")
	    temp="�����˻�"
	else if(acct_type=="A003")
	    temp="�����˻�"
	else if(acct_type=="A004")
	    temp="�ۺ��˻�"
	else if(acct_type=="A005")
	    temp="���ÿ��˻�"
	else if(acct_type=="A006")
	    temp="��ƽ��˻�"
	else if(acct_type=="A007")
	    temp="��ƽ��˻�"	
	else if(acct_type=="A008")
	    temp="�ۺ��˻�"	
	else if(acct_type=="A009")
	    temp="˽�������˻�"
	else if(acct_type=="A010")
	    temp="���eʱ���˻�"
	else if(acct_type=="A011")
	    temp="���eʱ���˻�"	            
	else if(acct_type=="AS001")
	    temp="��Ԫ����"
	else if(acct_type=="AS002")
	    temp="��Ԫ����"
	else if(acct_type=="AS003")
	    temp="��Ҵ���"
	else if(acct_type=="AS004")
	    temp=" ����"
	else if(acct_type=="AS005")
	    temp="��Ԫ����"
	else if(acct_type=="AS006")
	    temp=" ���������"
	else if(acct_type=="AS007")
	    temp="����Ҵ���"

	else if(acct_type=="F10101")
	    temp="���ڻ�"
	else if(acct_type=="F10102")
	    temp="���ڻ�"
	else if(acct_type=="F10103")
	    temp="�����ȡ"
	else if(acct_type=="F10104")
	    temp="֪ͨ���"
	else if(acct_type=="F10150")
	    temp="��֤���Ʒ"
	else if(acct_type=="F10201")
	   // temp="Ӫ���ʽ����"
	   temp="���"
	else if(acct_type=="F10202")
	   // temp="��Ŀ����"
	   temp="���"
	else if(acct_type=="F10203")
	    //temp="���Ŵ���"
	    temp="���"
	else if(acct_type=="F10204")
	   // temp="���Ҵ���"
	   temp="���"
	else if(acct_type=="F10205")
	    //temp="�������Ѵ���"
	    temp="���"
	else if(acct_type=="F20101")
	    temp="����ҵ��"
	else if(acct_type=="F20201")
	    temp="������"
	else if(acct_type=="F20202")
	    temp="�ǰ���"
	else if(acct_type=="F20301")
	    temp="���˵�"
	else if(acct_type=="F10401")
	    temp="����"
	else if(acct_type=="F80001")
	    temp="���ÿ�"
	else if(acct_type=="F10191")
	    temp="���ڻ�"
	else if(acct_type=="F10192")
	    temp="�ۺ��˻�"
    else if(acct_type=="FS10101")
	    temp="���ڻ�"
	else if(acct_type=="FS10191")
	    temp="���ڻ�"
	else if(acct_type=="FS10192")
	    temp="�ۺ��˻�"


	return temp;
}

//���û����˺��б������һ���˺�
function accountList_add(account)
{
	this.data[this.data.length]=account;
}
//����˳��ż���һ���˺�
function accountList_elementAt(i)
{
	return this.data[i];
}
//��ȡ˳���Ϊi���˻����˻����
function accountList_getAccountTypeAt(i)
{
	return this.data[i].acctType;
}
//�����й�Ȩ���ж�
function compareMarkAndType(iMark,Mark,iType)
{
//iMark���ı���������,Mark���͵�"X|X",iType��������֧�ֵ�Ȩ��
//	mark	type		��������1	��������2
//	��		��	 ���п�	��mark������	������Ȩ��=3
//	��		>=1	 ���п�	��mark������	������Ȩ��>=typeB
//	0		            ���˿�	��mark=0	           ������Ȩ��  ���Ƚ�
//	>=1		��	 ���˿�	��mark=markA	������Ȩ��=3
//	>=1		>=1	 ���˿�	��mark=markA	������Ȩ��>=typeB

	var ret = "";
	try{
		//markΪ�գ�typeΪ�գ���mark������	������Ȩ��=3
		if(Mark == null || Mark == "" || Mark== "|"){//����Ϊ��
			if((parseInt(iMark,10)>0&&iType==3)||parseInt(iMark,10)==0) //��mark������	������Ȩ��=3
				ret = "0";
		}
		//markΪ�գ�type>=1����mark������	������Ȩ��>=typeB
		else if(Mark.indexOf("|") != -1 && Mark.indexOf("|") == 0){//���Ͳ�Ϊ�գ������ߡ�|�����������Ϊ��
			if(parseInt(Mark.substring(Mark.indexOf("|")+1,Mark.length))>=1
			 &&Mark.substring(Mark.indexOf("|")+1,Mark.length)<=iType){//type>=1,iType>=type
				ret = "1";
			}
		}
		//mark0����mark=markA	������Ȩ��=3 ���֡�0���͡�0|���������
		//mark>=1��typeΪ�գ���mark=markA	������Ȩ��=3 ���֡�mark���͡�mark|���������
		else if(Mark.indexOf("|") != -1 && Mark.indexOf("|") == (Mark.length - 1))//���Ͳ�Ϊ�գ������ߡ�|���������Ҳ�Ϊ��
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
		else if(Mark.indexOf("|") == -1){//���Ͳ�Ϊ�գ�   û�����ߡ�|��
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
		//mark>=1��type>=1����mark=markA	������Ȩ��>=typeB
		else if((Mark.indexOf("|") != -1 )
				&& (0 < Mark.indexOf("|"))
				&& (Mark.indexOf("|") < (Mark.length - 1)))//�����ߡ�|�������Ҷ�����
		{
			if((parseInt(Mark.substring(0,Mark.indexOf("|")))>=1
			&& parseInt(Mark.substring(Mark.indexOf("|")+1,Mark.length))>=1
			&& Mark.substring(0,Mark.indexOf("|")) == iMark
			&& Mark.substring(Mark.indexOf("|")+1,Mark.length)<=iType)||(parseInt(Mark.substring(0,Mark.indexOf("|")))==0&& Mark.substring(0,Mark.indexOf("|")) == iMark))
			{
				ret = "6";
			}
		}
		//���������������㣬��ֵΪ7����ʾ����������
		else if(ret == ""){
			ret = "7";
		}
		return ret;
	}catch(Exception){
		return ret = "8";
	}

}

/**
 * ���ڹ��˿��ţ�Ŀǰ�����������������뿨�͵������ĵ���
 * cardNumInAccountList �����б��еĿ��ţ�
 * cardNumParam ������Ŀ���
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

//��ȡ��ѯ��Ϣ��˰ѡ��
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
//��ȡ��ѯ�˻�������Ϣѡ��
function accountList_getQryBasicInfoOptionString(cardOwnerMark,flag,areacode,regmode)
{
	var temp="";
	var ret="";
	//var acctTypes="|01|02|03|04|05|21|22|001|002|003|004|007";
	var acctTypes="|001|002|003|004|007|011|999|";	//��ʾע�Ῠ��;0807ԤԼ ����֧�ֻ����ʻ�999
	if(flag=="1") acctTypes="|001|002|003|004|007|011|008|";
	if(flag=="2") acctTypes="|001|002|003|004|007|011|008|999|";//��ѯ֧�ֹ��ʿ�������
	if(flag=="3") acctTypes="|F10101|F10192|";//��ѯ֧�ֹ��ʿ�������
	if(flag=="4") acctTypes="|001|002|003|004|007|011|008|999|F10101|F10192|";//ע���˻�ת�ʣ���ʾnova��fova
	if(flag=="5") acctTypes="|001|003|007|011|999|"; //��ѯδ���ֻ��Ż��-�����
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
			temp="<option value=no>û�����������Ŀ���";

	return temp;
}
//1004�ֹ����뿨�ţ���֧������
function accountList_getQryBasicInfoInputOptionString(cardOwnerMark,flag,areacode,regmode)
{
	var temp="";
	//var acctTypes="|01|02|03|04|05|21|22|001|002|003|004|007";
	var acctTypes="|001|002|003|004|007|011|999|";	//��ʾע�Ῠ��;0807ԤԼ ����֧�ֻ����ʻ�999
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
	temp+="<option value=�ֹ�����>"+"�ֹ�����";
	return temp;
}
//������ȡ������Ϊ����ֵ�ע�Ῠ added by fuwei
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
		temp="<option value=no>û�����������Ŀ���";
	return temp;
}

//��ʾ�¹�ָ�������˻���ע�Ῠ	added by mh
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
		temp="<option value=no>û�����������Ŀ���";
	return temp;
}
//��ȡ��ʧ�¹ҿ�ѡ��
function accountList_getRptLossCardOptionString(cardOwnerMark,sysMark,areacode,regmode)
{
	var temp="";
	var acctTypes="|003|001|002|004|007|008|011|995|996|997|998|999|";//011 added by zw ���л�����Ŀ����֧��4�ֿ�����:����һ��ͨ996�������ȡ998���汾ȡϢ997��995���������˻����˺� 999֧�ֻ���ע���˻�
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
		temp="<option value=no>û�����������Ŀ���";
	return temp;
}

//��ȡ��ʧ�¹��˻�ѡ��
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
		temp="<option value=no>û�����������Ŀ���";
	return temp;
}
//��ȡ��ѯδ������ϸѡ��
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
		temp="<option value=no>û�����������Ŀ���";
	return temp;
}

//�������select�е�option���ַ�����ȫ���˻�������ע�Ῠ
//������	cardOwner����ѡ��
//		������䣬�򷵻��˻��б��������˻���ѡ�񴮣�����ѡ��ֻѡ��������ΪcardOwner���˻���ѡ��
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
//�������select�е�option���ַ������ض����˻�����
//������	strTypes�������б���������֮����"|"�ֿ�
//	included
//		true:�ض����͵��˻�
//		false:�ض������˻�֮����˻�
//	isNotBussinessCard
//		true:ֻ��ʾ������
//		false:��ʾ�������ڵĿ����˻�
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
		temp="<option value=no>û�����������Ŀ����ˣ���";
	return temp;
}
//�ʽ��Զ��鼯ɸѡ���þɵĸ÷�����
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
		temp="<option value=no>û�����������Ŀ����ˣ���";
	return temp;
}
//�ʽ��Զ��鼯ɸѡע�Ῠ�������ʻ���
function accountList_getTypedAndIbpOptionString(cardOwnerMark,acctTypes,areacode,regmode,owner_openflag,unowner_openflag,tr_openflag,ibpTypeStr1,ibpTypeStr2,objvalue)
{

	var i;
	var temp="";
	var ret = "";
	if(acctTypes=="undefined"||acctTypes==null||acctTypes=="")
		return "";

	//���ݿ������option
	if(owner_openflag==0 && unowner_openflag==0){//��0���ر� 1����ͨ��
		temp="<option value=no>û�����������Ŀ����ˣ���";

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

	//���������˻������
	try{
		if(objvalue==0)//�������
			temp+=ibpTypeStr2;
		else if(objvalue==1)//�̶����
			temp+=ibpTypeStr1;
	}catch(Exception){}

	//���������ʻ���0���ر� 1����ͨ��
	if(tr_openflag==1){
	temp+="<option value=write>��ѡ����ֹ��������˹����˻�";
	}

	if(temp=="")
		temp="<option value=no>û�����������Ŀ����ˣ���";
	return temp;
}
function accountList_getTypedAndIbpOptionCardString(cardOwnerMark,acctTypes,areacode,regmode,owner_openflag,unowner_openflag,tr_openflag,ibpTypeStr1,ibpTypeStr2,objvalue)
{
	
	var i;
	var temp="";
	var ret = "";
	if(acctTypes=="undefined"||acctTypes==null||acctTypes=="")
		return "";
	
	//���ݿ������option
	if(owner_openflag==0 && unowner_openflag==0){//��0���ر� 1����ͨ��
		temp="<option value=no>û�����������Ŀ����ˣ���";
		
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
	
	//���������˻������
	try{
		if(objvalue==0)//�������
			temp+=ibpTypeStr2;
		else if(objvalue==1)//�̶����
			temp+=ibpTypeStr1;
	}catch(Exception){}
	
	//���������ʻ���0���ر� 1����ͨ��
	if(tr_openflag==1){
		temp+="<option value=write>��ѡ����ֹ��������˹����˻�";
	}
	
	if(temp=="")
		temp="<option value=no>û�����������Ŀ����ˣ���";
	return temp;
}
//���Ի����ƣ���copy���ϱߵĺ��������޸�
//�������select�е�option���ַ������ض����˻�����
//������	strTypes�������б���������֮����"|"�ֿ�
//	included
//		true:�ض����͵��˻�
//		false:�ض������˻�֮����˻�
//	isNotBussinessCard
//		true:ֻ��ʾ������
//		false:��ʾ�������ڵĿ����˻�
function accountList_getTypedOptionStringForCust(cardOwnerMark,acctTypes,included,areacode,regmode,AsiaState,auth,isRegistedCard,isNotBussinessCard,currentArea)
{
	var temp="";
	var ret="";
	if(acctTypes=="undefined"||acctTypes==null||acctTypes=="")
		return "";

	if(included)
	{
		//��ǰҵ���
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
		//�ǵ�ǰҵ���
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
		//��ǰҵ���
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
			//�ǵ�ǰҵ���
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
		temp="<option value=no>û�����������Ŀ����ˣ���";
	return temp;
}

//add fengl ��������
//����ҵ������ڹܿ���Ϊ�صĿ� add by lijh1

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
		for ( var k = 0; k < this.data.length; k++) {	//���˳��ѿ����ĵ���
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
		temp = "<option value=no>û�����������Ŀ����ˣ���";
	return temp;
}

// tianf
// �������п��ų�ʼ�����б�
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
		temp="<option value=no>û�����������Ŀ���";
	return temp;
}

//��� add by ml
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
		temp="<option value=no>---û�����������Ŀ���---";
	return temp;
}

/**
 * �˻�ԭ��--��ʾ���ź�������ʾ�¹һ�����Ϊ������˻��Ŀ��Ż���ۺ� modified by suny01
 * @param {String} cardOwnerMark
 * @param {String} acctTypes
 * @param {String} included
 * @param {String} cardfld
 * @param {String} areacode
 * @param {String} regmode
 * @param {String} delAct ��Ҫ�ų���ʾ�Ŀ��ţ����Ϊ�ջ�δ��������ʾ���з������������Ŀ�/�˺�
 * @return {json}  option���ݶ���
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
		temp="<option value=no>---û�����������Ŀ���---";
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
			temp="<option value=no>û�����������Ŀ���";
		}
	}
		
	
	
	
	return temp;
}


//�������select�е�option���ַ������ض����˻�����
//������	strTypes�������б���������֮����"|"�ֿ�
//	included
//		true:�ض����͵��˻�
//		false:�ض������˻�֮����˻�
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
		temp="<option value=no>û�����������Ŀ���";
				//alert(temp);
	return temp;
}

//�������select�е�option���ַ������ض����˻�����
//�����������п���.������ʾacctTypes,�Ժ���ʾacctTypes1
//������	strTypes�������б���������֮����"|"�ֿ�
//	included
//		true:�ض����͵��˻� (Ŀǰֻ֧��true�����,��ͨ����ֵΪtrue����ֻ֤�߸÷�֧.)
//��accountList_getTypedOptionStringwithCardbin�Ĳ��:
//					�����������п���.������ʾacctTypes,�Ժ���ʾacctTypes1
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
	{//Ŀǰ��֧��includedΪfalse�����,δ��ֲ���
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
		temp="<option value=no>û�����������Ŀ���";
				//alert(temp);
	return temp;
}

//�������select�е�option���ַ������ض����˻�����
//������	strTypes�������б���������֮����"|"�ֿ�
//	included
//		true:�ض����͵��˻�
//		false:�ض������˻�֮����˻�
//    isECard true ����eʱ����
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
		temp="<option value=no>û�����������Ŀ���";
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
		temp="<option value=no selected>---�˻���Ϣ����---";
	//alert(temp);
	return temp;
}



//�������select�е�option���ַ���:ע�Ῠ
//������	cardOwner����ѡ��
//		������䣬�򷵻��˻��б��������˻���ѡ�񴮣�����ѡ��ֻѡ��������ΪcardOwner���˻���ѡ��
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
//�������select�е�option���ַ���:ע�Ῠ����ȥ���񿨡���Ϊ����ת�ˣ����ڻ����л����
//ת���˺Ų���������

function accountList_getSubRegCardOptionString(cardOwnerMark,num,areacode,regmode)
{
	var temp="";
	var ret="";
	var cardbinstr1= dyTopFrame.cardBinList.SupportCardBin(5);
	var cardbinstr2= dyTopFrame.cardBinList.SupportCardBin(6);
	var cardbinstr3= dyTopFrame.cardBinList.SupportCardBin(15);
	var cardbinstr4= dyTopFrame.cardBinList.SupportCardBin(14);
	//ExceptCardPin1="|458071|451804|";//���ǿ���458071-VISA����𿨣�451804-VISA�����տ�
	//ExceptCardPin2="|45806|53098|";//׼���ǿ���45806-VISA����53098-MASTER��
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
				//׼���ǿ����ŵĵ�ʮλ��ʾ���࣬0Ϊ����𿨣�1��6Ϊ�����տ���7Ϊ�����տ���8Ϊ���˽𿨣�9���á�
				if(this.data[i].cardNum.substring(9,10)=="0"||this.data[i].cardNum.substring(9,10)=="7")
				continue;
			}
			//if(this.data[i].acctType=="999") continue;//���λ���ע���˺ţ�0807ԤԼ��Ŀȡ������
			if((num==1)&& (this.data[i].acctType=="008")) continue;
			else temp+="<option value="+i+">"+this.data[i].getDescString();
		}
	}
	if(temp=="")
		temp="<option value=no selected>---û�����������Ŀ���---";
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
		temp="<option value=no selected>---û�����������Ŀ���---";
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
		temp="<option value=no selected>---�˻���Ϣ����---";
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
		temp="<option value=no selected>---�˻���Ϣ����---";
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

/*�жϿ��Ƿ�Ϊ���񿨣������񿨷���ture���������񿨷���false
  cardNum:   ����
  auther��   lixf
  date��     2006-8-11
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
		//׼���ǿ����ŵĵ�ʮλ��ʾ���࣬0Ϊ����𿨣�1��6Ϊ�����տ���7Ϊ�����տ���8Ϊ���˽𿨣�9���á�
		if(cardNum.substring(9,10)=="0"||cardNum.substring(9,10)=="7")
		    cardFlag=true;
	}

	return cardFlag;
}


/*�жϿ��Ƿ�Ϊ��ۿ����Ƿ���ture�����Ƿ���false
  cardNum:   ����
  auther��   xuwx
  date��     2010-10-11
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

/*�жϴ��ǿ��Ƿ�Ϊ˫���֣��Ǵ��ǿ�����˫���ַ���false����������false
  cardNum:   ����
  auther��   xuweixing
  date��     2009-8-11
*/
function accountList_isDoubleCurrCredit(acctType,cardNum)
{
  if(acctType!="007"&&acctType!="21"){
  	return true;
  }
  else{
  		currList=dyTopFrame.cardBinList.getCurrList(cardNum);
  		if(currList == null) return false; //���б��쳣����201402-shilp
  		if(currList.indexOf("|",5) == -1 )
  		{
  			return false;
  		}
  		else{
  			return true;
  		}
  }
}
/*�������select�е�option���ַ�������ʾָ�����͵�ע�Ῠ�����������񿨣���ָ�����ź���û�ڿ��б��У����ڿ��б���׷�Ӵ˿��š�
  acctTypes: ע�Ῠ������
  areacode�� ������
  auther��   xuwx
  date��     2010-11-11
*/
function accountList_getTypedOptionWithoutBusinessAddNoRegCard(cardOwnerMark,acctTypes,areacode,regmode,AsiaState,cardIndex)
{
  var temp="";
  var isSelected = "";
  //�Ƿ��Ѿ��ҵ�
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
	//û��ƥ���ϣ��ҿ��ŷǿ�
	if(isFind==false && cardIndex!="")
		temp+="<option value=noregcard selected>"+cardIndex;
	if(temp=="")
		temp="<option value=no selected>---û�����������Ŀ���---";
	return temp;
}

/*���ش��ǿ������ʿ�����ҿ��֣�����˫���ַ���""
��bin�б���ֻ�д��ǿ�007�����ʿ�008���ñ��֣������������(���������)��
cardNum:   ����
auther��   yanlong
date��     2010-10-21
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


/*�������select�е�option���ַ�������ʾָ�����͵�ע�Ῠ�����������񿨣�
  acctTypes: ע�Ῠ������
  areacode�� ������
  remitTranLag:�Ƿ���Fova�˻�ת��Ȩ��
  auther��   lixf
  date��     2006-8-11
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
			//������б��е�������ŵ��ڴ���Ŀ��ţ������������й��ˡ��������䡣
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
		temp="<option value=no selected>---û�����������Ŀ���---";
	return temp;
}

/*
 * ���ڻ��ʹ�õĸ���б�
 * Author��kfzx-bail01
 * Date��2015-09-11
 * �������������޸����Ⱥ�kfzx-bail01ȷ�ϡ�
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
			//������б��е�������ŵ��ڴ���Ŀ��ţ������������й��ˡ��������䡣
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
		
		// ��ó����־��accountlist���п�����undefined���˴������⴦��
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

/*���ݿ����ͣ���BIN��������Ż������select�е�option���ַ�������ʾָ�����͵�ע�Ῠ�����������񿨣�
acctTypes: ע�Ῠ������
areacode�� ������
regmode:   ע������
cardbin��  ��bin
unionNum�� �������
auther��   lixf
date��     2006-8-11
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
		//tips:�������ص��������Ϊ9λ�����ݿ���8λ�����Զ�������unionNum��substring����add by kfzx-heq01 20121019
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
		temp="<option value=no selected>---û�����������Ŀ���---";
	return temp;
}

/*�������select�е�option���ַ�������ʾָ�����͵�ע�Ῠ�����������񿨣�,������ʾ������ÿ�
acctTypes: ע�Ῠ������
areacode�� ������
auther��   lixf
date��     2006-8-11
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
		temp="<option value=no selected>---û�����������Ŀ���---";
	return temp;
}

/*�������select�е�option���ַ�����������ʾ��ͨ��������Eʱ��������ƽ�,�����������Ƹ���
  cardOwnerMark: �й��˻���־
  areacode�� ������
  cardType:  1-��ƽ�2-��ͨ��������Eʱ����
  auther��   lixf
  date��     2006-8-11
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
		temp="<option value=no selected>---û�����������Ŀ���---";
	return temp;
}

/*�������select�е�option���ַ�������ʾָ�����͵�ע�Ῠ�����������񿨣�
acctTypes: ע�Ῠ������
areacode�� ������
auther��   lixf
date��     2006-8-11
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
		temp="<option value=no selected>---û�����������Ŀ���---";
	return temp;
}

//�õ����б��option����ѡ��
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
/*�������select�е�option���ַ�������ʾָ�����͵�ע�Ῠ�����������񿨣�
���ÿ�����-���ÿ�����-�ҵ��Զ�����(�޸Ļ���Э��)��������ˣ���֧�ֱ������е����Ĺ���ע�ᡢ������ӵĴ��ǿ���׼���ǿ������ʿ���ĵ��ר�ÿ���
��͸֧��������ͬ�ı��˵�eʱ��������ƽ𿨣���ͨ�����Ƹ���
  acctTypes: ע�Ῠ������
  areacode�� ������
  inCardNoArea�� ͸֧����ת�뿨����������
  auther��   fuyu
  date��     2010-1-18
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

		var payCardType = this.data[i].acctType;//������ˣ��ſ�����
		var showFlag = false;//�����Ϊeʱ��������ƽ𿨣���ͨ�����Ƹ���ʱ�������ͬ͸֧��������ͬ����ʾ
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
		temp="<option value=no selected>---û�����������Ŀ���---";
	return temp;
}

/*�������select�е�option���ַ�������ʾָ�����͵�ע�Ῠ�����������񿨣�
acctTypes: ע�Ῠ������
areacode�� ������
auther��   fengys
date��     2010-3-22
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
		// ��ó����־��accountlist���п�����undefined���˴������⴦��
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
		temp="<option value=no selected>---û�����������Ŀ���---";
	return temp;
}

/*�������select�е�option���ַ�������ʾָ�����͵�ע�Ῠ�����������񿨺�ָ����cardIndex��
  acctTypes: ע�Ῠ������
  areacode�� ������
  auther��   fengys
  date��     2009-8-20
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
		temp="<option value=no selected>---û�����������Ŀ���---";
	return temp;
}

/*�������select�е�option���ַ�������ʾָ�����͵�ע�Ῠ�����������񿨣�
  acctTypes: ע�Ῠ������
  areacode�� ������
  auther��   xuweixing
  date��     2009-8-11
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
		temp="<option value=no selected>---������������ע���˻�---";
	return temp;
}


/*�������select�е�option���ַ�������ʾָ������ָ�����͵��¹��˻������������񿨣�,���Ǵ��ǿ���ֻ��ʾ˫����
  acctTypes: ע�Ῠ������
  areacode�� ������
  auther��   xuweixing
  date��     2009-8-11
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
			//���Ǵ��ǿ���ֻ��ʾ˫���ֵ�
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
		temp="<option value=no selected>---�˻���Ϣ����---";
	return temp;
}



/*�������select�е�option���ַ�������ʾָ������ָ�����͵��¹��˻������������񿨣�,��������ۿ�
  acctTypes: ע�Ῠ������
  areacode�� ������
  auther��   xuweixing
  date��     2010-2-11
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
		temp="<option value=no selected>---û�����������Ŀ���---";
	return temp;
}

/*�������select�е�option���ַ�������ʾָ������ָ�����͵��¹��˻������������񿨣�,��������ۿ�
acctTypes: ע�Ῠ������
areacode�� ������
date��     2010-2-11
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
			if(cardIndex!=null && this.data[i].cardNum == cardNo){//���˵�ǰ��
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
			if(cardIndex!=null && this.data[i].cardNum == cardNo){//���˵�ǰ��
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
		temp="<option value=no selected>---û�����������Ŀ����ˣ���---";
	return temp;
}

/*�������select�е�option���ַ���������acctNum(�˺�)���θ��˺Ŷ�Ӧ�Ŀ���.
  acctTypes: ע�Ῠ������
  areacode�� ������
  acctNum: Ҫ���ε����˺Ŷ�Ӧ�Ŀ���
  auther��   yangjing01
  date��     2008-12-30
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
		temp="<option value=no selected>---û�����������Ŀ���---";
	return temp;
}

/*�������select�е�option���ַ�������ʾָ������ָ�����͵��¹��˻������������񿨣�
  acctTypes: ע�Ῠ������
  areacode�� ������
  auther��   lixf
  date��     2006-8-11
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
		temp="<option value=no selected>---�˻���Ϣ����---";
	return temp;
}
//�������select�е�option���ַ�������ʾָ������ָ�����͵��¹��˻������������񿨣�,�������¹������ʾ
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
		temp="<option value=no selected>---�˻���Ϣ����---";
	return temp;
}
/*�������select�е�option���ַ�������ʾָ�����������¹��˻������������񿨣�
  acctTypes: ע�Ῠ������
  areacode�� ������
  auther��   lijh1
  date��     2009-11
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
		formname.acctSelList3.options[0].text = "---�޷����������¹��˻�---";
		formname.acctSelList3.options[0].value = "no";
	}
	return temp;
}

/*���ڷ���ָ���ʻ�������
  acctNum: �ʺŻ񿨺�
  isCard�� �Ƿ�Ϊע�Ῠ��־��trueΪע�Ῠ��falseΪ��ע�Ῠ
  isDevide:�Ƿ񿨺ŷָ���0��Ĭ����
  auther��   lixf
  date��     2008-7-19
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

//���ݿ��ţ��˺ţ���������ַ���
function accountList_findAccountByCardNo(cardNum)
{
	for(var i=0;i<this.data.length;i++)
	{
		if(this.data[i].cardNum==cardNum||this.data[i].acctNum==cardNum)
		{
			return this.data[i].getDescString();
		}
	}
	return "�Ҳ�������";
}

//���ݿ��ţ��˺ţ����cardOwnerType
function accountList_findCardOwnerTypeByCardNo(cardNum)
{
	for(var i=0;i<this.data.length;i++)
	{
		if(this.data[i].cardNum==cardNum||this.data[i].acctNum==cardNum)
		{
			return this.data[i].cardOwnerType;
		}
	}
	return "3";//���û�У���Ĭ�Ϸ���ȫȨ��
}

//���ݿ��ţ��˺ţ�����ʻ�
function accountList_findAccountDataByCardNo (cardNum){
	for(var i=0;i<this.data.length;i++)
	{
		if(this.data[i].cardNum==cardNum||this.data[i].acctNum==cardNum)
		{
			return this.data[i];
		}
	}
	return "�Ҳ�������";
}
//���ݿ��ź��˻����������Ӧ���˺ţ����ض�Ӧ������������������ע�Ῠ���򲻱�ָ���˻�����
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
//�����û��������˻�������ע�Ῠ
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
//ҳ����ʾʱȷ����һ������,�˺ű�ѡ����
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
		selObj1.options[0].text="---�˻���Ϣ����---";
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
			selObj1.options[j].text=account.acctCode+" "+accountDesc+" ������"+" "+account.acctNum+" "+account.acctAlias;
		else{
			if(account.acctType=="04"&&account.acctProp=="006"){
				selObj1.options[j].text=account.acctCode+ " �������� " +account.acctNum+" "+account.acctAlias;
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
			subObj4.value="1";		//��ʾ����
			subForm.submit();
	}
	//return true;
}


//����ѯ�����ҳ
function onsub2(theform,begin_num,sysMark){
	var formObj = eval("document." + theform);

	var acctIndex = eval("document." + theform + ".acctIndex");
	var subObj0 = eval("document." + theform + ".Begin_pos");
	var subObj1 = eval("document." + theform + ".cardNum");
	var subObj2 = eval("document." + theform + ".acctCode");
	var subObj3 = eval("document." + theform + ".acctNum");
	var accountNo=formObj.acctSelList.value;

	acctIndex.value=formObj.acctSelList.value;	//������ţ�
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
	//acctIndex.value=formObj.acctSelList.value;	//������ţ�
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

	acctIndex.value=formObj.acctSelList.value;	//������ţ�
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

//�����ѯ���������¼���
function on_query(loc,num,sessId,form){
	var subForm = eval("document." + form);

	var accountNo=subForm.acctSelList.value;
	var account=acctList.elementAt(accountNo);
	var acct_Sel=eval("document." + form + ".acctSelList.value");
	//var href = eval("document.location");
	//var href=eval("window.location.href");
	switch (num){
		case 0:	//��ѯ�˻�������Ϣ
			window.location.href=loc + "account/query_zhxx.jsp?acctIndex=" + acct_Sel
								+ "&" + sessId;
			break;
		case 1:	//��ѯ���
			window.location.href=loc + "account/query_yecx.jsp?acctIndex=" + acct_Sel
								+ "&" + sessId;
			break;
		case 2:	//��ѯ������ϸ
			window.location.href=loc + "account/query_drjy.jsp?acctIndex=" + acct_Sel
								+ "&" + sessId;
			break;
		case 3:	//��ѯ��ʷ��ϸ
			window.location.href=loc + "account/query_lsjy.jsp?acctIndex=" + acct_Sel
								+ "&" + sessId;
			break;
		case 4:	//��ѯδ������ϸ
			window.location.href=loc + "account/query_wdzmx.jsp?acctIndex=" + acct_Sel
								+ "&" + sessId;
			break;
		case 5:	//��ѯB2C������ϸ
			window.location.href=loc + "account/query_b2c.jsp?acctIndex=" + acct_Sel
								+ "&" + sessId;
			break;
		case 6:	//��ѯ��Ϣ����Ϣ˰
			window.location.href=loc + "account/query_lx.jsp?acctIndex=" + acct_Sel
								+ "&" + sessId;
			break;
		default:break;
	}
}
// tianf
// �г�����״̬�Ŀ���e��ע��ʹ��
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
//����ԭ�˺� ����ת�� zhouwei200909
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

/*�������select�е�option���ַ�������ʾָ�����͵�ע�Ῠ�����������񿨣�
acctTypes: ע�Ῠ������
areacode�� ������
remitTranLag:�Ƿ���Fova�˻�ת��Ȩ��
auther��   lixf
date��     2006-8-11
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
			//������б��е�������ŵ��ڴ���Ŀ��ţ������������й��ˡ��������䡣
			continue;
		}
		if(this.data[i].cardNum.indexOf("62")!=0
				&& this.data[i].cardNum.indexOf("955888")!=0){
			//������Ų�����62��955888��ͷ�������������й��ˡ�
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
		temp="<option value=no selected>---û�����������Ŀ���---";
	return temp;
}

/**
 * ���ݲ�ͬ�Ĳ�ѯ���ͣ�0:������ҵ��� 1:��ǰҵ��� 2 �ǵ�ǰҵ��� ��ʾָ�����͵�ע�Ῠ�����������񿨣�
 * ��������ʾ��ҵ��صĿ���
 * @param {String} cardOwnerMark
 * @param {String} acctTypes  ע�Ῠ������
 * @param {String} areacode ������
 * @param {String} regmode ע��ģʽ 0-����ע�� 1-����ע��
 * @param {String} Checkmode 0:������ҵ��� 1:��ǰҵ��� 2 �ǵ�ǰҵ���
 * @param {String} cardno Ĭ��ѡ�п���
 * @param {String} openSign ������ͨ��־
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
	//ɸѡ
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

		}//��ǰҵ���
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
		}//�ǵ�ǰҵ���
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

	}//������ҵ���
	if(temp=="")
		temp="<option value=no selected>û�����������Ŀ����ˣ���";
	return temp;
}
//���ڿͻ��������������ֲ�ѯ
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
		temp="<option value=no>û�����������Ŀ���";
	return temp;
}
//��ͨ�ر�visa/���´���֤����ר��
function accountList_getVBVTypedOptionString(cardOwnerMark,cardIndex,diners3dOpenFlag)
{
    var temp="";
    var ret="";
    var sel = "";
    var V3Dcardbinstr=dyTopFrame.cardBinList.SupportCardBin(10);
    var M3Dcardbinstr=dyTopFrame.cardBinList.SupportCardBin(11);
    var Vcardbinstr=dyTopFrame.cardBinList.SupportCardBin(12);
    var Mcardbinstr=dyTopFrame.cardBinList.SupportCardBin(13);
    //201301�汾 ��������Ҫ��ſ�Ͷ��ǰ����JCB�� add by kfzx-heq01
    var JCBcardbinstr=dyTopFrame.cardBinList.SupportCardBin(21);
    var JCB3Dcardbinstr=dyTopFrame.cardBinList.SupportCardBin(22);
	//201211�汾 Ͷ��ǰ����AE�� add by kfzx-heq01
	var AEBcardbinstr=dyTopFrame.cardBinList.SupportCardBin(9);
	var AEB3Dcardbinstr=dyTopFrame.cardBinList.SupportCardBin(23);
    //������ 20138�°汾 add by kfzx-yueyt 
    var DinerCardbinstr = dyTopFrame.cardBinList.SupportCardBin(24);
    var Diner3DCardbinstr = dyTopFrame.cardBinList.SupportCardBin(25);

    for(var i=0;i<acctList.data.length;i++){
        ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
        var cardnum=acctList.data[i].cardNum;
        var cardbin=dyTopFrame.cardBinList.getCardBin(cardnum);
        if(((Vcardbinstr.indexOf(cardbin)!=-1 &&V3Dcardbinstr.indexOf(cardbin)!=-1)
            ||(Mcardbinstr.indexOf(cardbin)!=-1 && M3Dcardbinstr.indexOf(cardbin)!=-1)
            //201301�汾 ��������Ҫ��ſ�Ͷ��ǰ����JCB�� add by kfzx-heq01
            ||(JCBcardbinstr.indexOf(cardbin)!=-1 && JCB3Dcardbinstr.indexOf(cardbin)!=-1)
            //201211�汾 Ͷ��ǰ����AE�� add by kfzx-heq01
            ||(AEBcardbinstr.indexOf(cardbin)!=-1 && AEB3Dcardbinstr.indexOf(cardbin)!=-1)
            //������ 20138�°汾 add by kfzx-yueyt 
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
    temp="<option value=no>û�����������Ŀ���";

    return temp;
}
//��ȡע������ר��
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
		temp="<option value=no>û�����������Ŀ���";

	return temp;
}



/**
 * ����ת�й�ר��: ��ʾ��ĳһҵ���֮����ѿ����������˻��Ŀ��б�,�Լ�δ���������׿������������������Ŀ�
 * ��������ʾ��ҵ��صĿ���
 * @param {String} cardOwnerMark
 * @param {String} acctTypes  ע�Ῠ������
 * @param {String} areacode ������
 * @param {String} regmode ע��ģʽ 0-����ע�� 1-����ע��
 * @param {String} cardno Ĭ��ѡ�п���
 * @param {String} openSign ������ͨ��־
 *
 * @auther kfzx-yangjing01
 * @date 2011-02-14
 */

function accountList_getFundSwitchCard(cardOwnerMark,acctTypes,areacode,regmode,cardno,openSign)
{
	var temp="";
	var ret="";
	var isSelected = "";
	var AreaCodeflag="";//����ѿ����������˻��ĵ���
	var outCardType="|001|003|011|007|999|";
	if(acctTypes=="undefined"||acctTypes==null||acctTypes=="")
		return "";
	//ɸѡ
	for(var i=0;i<this.data.length;i++)
	{
		ret = compareMarkAndType(this.data[i].cardOwnerMark ,cardOwnerMark,this.data[i].cardOwnerType);
		//�ǵ�ǰҵ��� �Ļ����׿�
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
	for(var j=0;j<this.data.length;j++){//����δ�����������˻��ĵ����Ƿ��з��������Ľ��׿�
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
		temp="<option value=no selected>û�����������Ŀ����ˣ���";
	return temp;
}


//���ָ���¹��˻��Ľ��׿�(���������ʿ�������)
function accountList_getCardTypedAcctOptionString(cardOwnerMark, cardTypes,
		areacode, regmode, acctTypes, queryFlag, cardSelect) {
	var temp = "";
	var ret = "";
	var cardTemp = "";
	var cardSeq = 0;
	if (queryFlag == null || queryFlag == "")
		queryFlag = true;

	// ɸѡ�¹��˻�,��cardTypes��ɸѡ������acctTypes�Ŀ�
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

			if (!this.data[i].isRegistedCard) { // ѭ���¹��˻�
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
				cardSeq = i; // ���ظ��¹��˻���Ӧ�����
			}
		}
	}
	if (temp == "")
		temp = "<option value=no>û�����������Ŀ����ˣ���";
	return temp;
}

/*
 * ���ָ���¹��ʻ����͵�ע�Ῠ���
 *
 * cardNum:ָ������ acctType:ָ���¹��˻�����
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
 * �����¹��˻�����ȡ�˻�������������ֵ
 * subAccIndex �¹��˻���Ӧ����ֵ
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
 * ���ָ����ע�Ῠ
 *
 * cardNum:ָ������
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
		temp = "<option value=no selected>---û�����������Ŀ���---";
	return temp;
}

/*
 * ���ָ����ע�Ῠ�й�Ȩ��
 *
 * cardNum:ָ������
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

//��ȡ���������˻���������������Ŀ�
function accountList_getGoldCardOptionString(cardOwnerMark, cardTypes,
		areacode, regmode, acctTypes) {
	var temp = "";
	var ret = "";
	var cardTemp = "";
	var cardSeq = 0;

	// ɸѡ�¹��˻�,��cardTypes��ɸѡ������acctTypes�Ŀ�
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

			if (!this.data[i].isRegistedCard) { // ѭ���¹��˻�
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
				cardSeq = i; // ���ظ��¹��˻���Ӧ�����
			}
		}
	}
	if (temp == "")
		temp = "<option value=no>û�����������Ŀ����ˣ���";
	return temp;
}

/*���ض���bin�˻��������У����ڣ�1�籣���˻��б�  add by guohy
������
cardOwnerMark �����ˣ����ˣ�'<%=(String)sessionCtx.getValueAt("operatorId") + "|3"%>'�� |3ΪȨ��
acctTypes �����ˣ�������
areacode ����ر�־������/""
regmode ע�����ͣ�ע������/""
carbin ָ��carbin
*/
function accountList_getTypedOptionSortByCarBin(cardOwnerMark,acctTypes,areacode,regmode,carbin,AsiaState,auth,isRegistedCard,isNotBussinessCard,cardIndex,agrFlag)
{
	var temp="";	//carbin����
	var temp1="";	//��carbin����
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
		temp="<option value=no>û�����������Ŀ����ˣ���";
	return temp+temp1;
}

//---------------------------------------------------
