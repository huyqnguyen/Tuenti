function menu(id,title,en_title,isguid,ishaschild,firstlinepos,actionType,secNum,ISUNCUSTOMIZE,leafid,position,IDarray,IDhaschildflagarray)
{
	this.id=id;
	this.title=title;
	this.en_title=en_title;
	this.isguid=isguid;
	this.firstlinepos = firstlinepos;
	this.ishaschild=ishaschild;
	this.actionType = actionType;
	this.menudata = new Array();
	this.add = menu_add;
	this.getmenudatalen = menu_getmenudatalen;
	this.getmenudata = menu_getmenudata;
	this.writesec = menu_writesec;
	this.writethird = menu_writethird;
	this.writeforth = menu_writeforth;
	this.ISUNCUSTOMIZE = ISUNCUSTOMIZE;
	this.secNum = secNum;
	this.leafid = leafid;
	this.position = position;
	this.IDarray = IDarray;
	this.IDhaschildflagarray = IDhaschildflagarray;
}
function menu_add(Menulist)
{
	this.menudata[this.menudata.length]=Menulist;
}
function menu_getmenudata(i)
{
	return this.menudata[i];
}
function menu_getmenudatalen()
{
	return this.menudata.length;
}
function menu_writesec(language){
	var secdes="";
	var titletmp ="";
	if(language=="zh_CN")
		titletmp = this.title;
	else
		titletmp = this.en_title;

	if(this.isguid=="1"){
		secdes = '<tr nowrap class="leftsecondbgandfontold'+this.firstlinepos+'" id="tr'+this.id+'" name="tr'+this.id+'"><a name="#results'+this.id+'"></a><td width="10px" height="25"  ></td><td  width="25px"  height="25" align="center"  ><img id="img'+this.id+'"  src="./images/jian01.png"  height="14"></td><td   width="138px" height="25" ><a id="sa_' + this.id + '"  name="sa_' + this.id + '" href="javascript:onSubleftForm(\''+this.id+'\',\''+this.actionType+'\')" class="left_link'+this.firstlinepos+'"><font id="leftsecfont'+this.id+'">'+ titletmp +'</font></a></td></tr>';
		secdes += '<tr><td class=\"fenggexian\" colspan=3 height="1px"><table id="table'+this.id+'" style="display: " width="100%" border="0" align="center" cellpadding="0" cellspacing="0" ><tr><td class=\"fenggexian\" colspan=3 height="1px"></td>&nbsp;</td></tr></table></td></tr>';
	}else if(this.ishaschild!="0"){
		
		secdes = '<tr nowrap class="leftsecondbgandfontold'+this.firstlinepos+'" id="tr'+this.id+'" name="tr'+this.id+'" onClick="showdv(\''+this.id+'\',\''+this.position+'\',\''+this.secNum+'\',\''+this.IDarray+'\',\''+this.ishaschild+'\',\''+this.IDhaschildflagarray+'\')"><a name="#results'+this.id+'"></a><td width="10px" height="25"  ></td><td  width="25px"  height="25" align="center"  ><img id="img'+this.id+'"  src="./images/jia01.png"  height="14"></td><td width="138px" height="25" ><a id="sa_' + this.id + '"  name="sa_' + this.id + '" href="javascript:void(0);" onClick="return false;" class="left_link'+this.firstlinepos+'"><font id="leftsecfont'+this.id+'">'+ titletmp +'</font></a></td></tr> ';
		secdes += '<tr><td class=\"fenggexian\" colspan=3 height="1px"><table id="table'+this.id+'" style="display:none " width="100%" border="0" align="center" cellpadding="0" cellspacing="0" >';
		//alert("this.menudata[0].Menulitlen()"+this.menudata[0].Menulitlen());
		for(var i=0;i<this.menudata[0].Menulitlen();i++){
			secdes +=this.menudata[0].getdata(i).writethird(language);
			//alert("this.menudata[0].getdata(i)=="+this.menudata[0].getdata(i));
		}
		secdes +='<tr><td class=\"fenggexian\" colspan=3 height="1px"></td>&nbsp;</td></tr></table></td></tr>';
	}else{
		secdes = '<tr nowrap class="leftsecondbgandfontold'+this.firstlinepos+'" id="tr'+this.id+'" name="tr'+this.id+'"><a name="#results'+this.id+'"></a><td width="10px" height="25"  ></td><td  width="25px"  height="25" align="center"  ><img id="img'+this.id+'"  src="./images/jian01.png"  height="14"></td><td width="138px" height="25" ><a id="sa_' + this.id + '"  name="sa_' + this.id + '" href="javascript:showdv(\''+this.id+'\',\''+this.position+'\',\''+this.secNum+'\',\''+this.IDarray+'\',\''+this.ishaschild+'\',\''+this.IDhaschildflagarray+'\');onSubleftForm(\''+this.id+'\',\''+this.actionType+'\')" class="left_link'+this.firstlinepos+'"><font id="leftsecfont'+this.id+'">'+ titletmp +'</font></a></td></tr>';
		secdes += '<tr><td class=\"fenggexian\" colspan=3 height="1px"><table id="table'+this.id+'" style="display:none " width="100%" border="0" align="center" cellpadding="0" cellspacing="0" ><tr><td class=\"fenggexian\" colspan=3 height="1px"></td>&nbsp;</td></tr></table></td></tr>';
	}
	return secdes;
}
function menu_writethird(language){
	var thirddes="";
	var titletmp ="";
	if(language=="zh_CN")
		titletmp = this.title;
	else
		titletmp = this.en_title;
	//alert(this.menudata.length);

	if(this.isguid=="1" || this.ishaschild=="0" ){

		thirddes  = '<tr nowrap onmouseover="mouseoverName(\'ltr'+this.id+'\',\'highlight\')" onmouseout="mouseoutName(\'ltr'+this.id+'\',\'leftthirdbgandfontold'+this.firstlinepos+'\')"  class="leftthirdbgandfontold'+this.firstlinepos+'" id="ltr'+this.id+'" name="ltr'+this.id+'"><td width="35px" height="25"></td><td  height="25"><a id="ta_' + this.id +  '" name="ta_' + this.id + '" href="javascript:onSubleftForm(\''+this.id+'\',\''+this.actionType+'\')" class="left_link'+this.firstlinepos+'"> <font id="leftthrfont'+this.id+'">'+ titletmp +'</font></a></td></tr>';
		thirddes += '<tr><td colspan=3 height="1px"><table id="table'+this.id+'" style="display: " width="100%" border="0" align="center" cellpadding="0" cellspacing="0" ></table></td></tr>';
	}else {

		thirddes = '<tr nowrap onmouseover="mouseoverName(\'ltr'+this.id+'\',\'highlight\')" onmouseout="mouseoutName(\'ltr'+this.id+'\',\'leftthirdbgandfontold'+this.firstlinepos+'\')"  class="leftthirdbgandfontold'+this.firstlinepos+'" id="ltr'+this.id+'" name="ltr'+this.id+'" onClick="showdv(\''+this.id+'\',\''+this.position+'\',\''+this.secNum+'\',\''+this.IDarray+'\',\''+this.ishaschild+'\',\''+this.IDhaschildflagarray+'\')"><td width="35px" height="25"  ></td><td height="25" ><font id="leftthrfont"+this.id+"\">'+ titletmp +'</font></td></tr> ';
		thirddes += '<tr><td colspan=3 height="1px"><table id="table'+this.id+'" style="display: none" width="100%" border="0" align="center" cellpadding="0" cellspacing="0" class="td_L_green">';

		for(var i=0;i<this.menudata[0].Menulitlen();i++){

			thirddes += this.menudata[0].getdata(i).writeforth(language);
		}
		thirddes +='</table></td></tr>';
	}
	return thirddes;
}
function menu_writeforth(language){
		var titletmp ="";

		if(language=="zh_CN")
			titletmp = this.title;
		else
			titletmp = this.en_title;
		var forthdes="";
		forthdes = '<tr onmouseover="mouseoverName(\'ltr'+this.id+'\',\'highlight\')" onmouseout="mouseoutName(\'ltr'+this.id+'\',\'leftthirdbgandfontold'+this.firstlinepos+'\')"  class="leftthirdbgandfontold'+this.firstlinepos+'" id="ltr'+this.id+'"><td width="18%"></td><td  width="10%"  height="20" align="center"  >-</td><td width="72%" height="25"><a name="fa_' + this.id + '" href="javascript:onSubleftForm(\''+this.id+'\',\''+this.actionType+'\')" class="left_link'+this.firstlinepos+'" >'+ titletmp +'</a></td></tr>';

	return forthdes;
}

function Menulist()
{
   this.data=new Array();
   this.add=Menulist_add;
   this.Menulitlen = Menulist_len;
   this.getline = menu_getline;
   this.getdata = Menulist_getdata;
}
//在menu
function Menulist_add(menu)
{
	this.data[this.data.length]=menu;
}
function Menulist_len()
{
	return this.data.length;
}
function Menulist_getdata(i)
{
	return this.data[i];
}
function menu_getline(language){
var temp="";
var temp='<table id="maintable" width="100%" border="0" cellspacing="0" cellpadding="0" >';
temp+="<tr><td class=\"fenggexian\" colspan=3 height=\"1px\">&nbsp;</td></tr>";
	for(var i=0;i<menulist.Menulitlen();i++){//2???menu
	 for(var j=0;j<this.data[i].getmenudatalen();j++){
		temp+=this.data[i].writesec(language);
		//alert("temp"+temp);
	}
	}
	temp+='</table>';
	return temp;
}
var menulist = new Menulist();


function onSubleftForm(id,actionType,leafid){
	var node = MenuInfo.getThisNode(leafid||id);
	var node_name = node.menuName;
	jQuery(".leftthirdbgandfont3").removeClass("leftthirdbgandfont3").addClass("leftthirdbgandfontold2");
	jQuery(".left_link2_choosed").removeClass("left_link2_choosed");
	try{
	    var ob1 = document.getElementById("ltr" + leafid);
		if(ob1 == undefined){
			jQuery("#leftsecfont" + id).addClass("left_link2_choosed");	  
		}else{
			jQuery(ob1).addClass("leftthirdbgandfont3");
			jQuery("#leftthrfont" + leafid).addClass("left_link2_choosed");	 		
		}
		ob1.className = "leftthirdbgandfont3";
	}catch(e){}

	if(actionType == 3) formtocenter.target = "_blank";
	else formtocenter.target = "mainFrame";
	if (leafid==""){return;}
		leftform.id.value =leafid==undefined?id:leafid;
formtocenter.id.value =id;
//leftform.submit();//刷新左侧页面，用来更新menuid，以实现高亮
formtocenter.submit();

}
function welcomepage(){
		parent.hideLeftMenu();
		parent.hideSwitchBar();
		parent.mainFrame.location.replace("./welcomePage.html");
}
function gorealpage(src){
		parent.showLeftMenu();
		parent.showSwitchBar();
		parent.mainFrame.location.replace(src);
}
function normalpage(node_name){
		parent.showLeftMenu();
		parent.showSwitchBar();
		parent.mainFrame.location.replace("./mainframe.html");
		try{
			setTimeout("parent.mainFrame.changeMainpage('" + node_name + "')",100);
		}catch(e){}
}
function showdv(v_ntmp,v_n,num,IDarray,ishaschild,haschildArray)
	{ 
	try{
		var divn;
		var img;
		var mb=parseInt(num);

		for(var bv = 1 ; bv < mb+1 ; bv++){
				var idtmp1=IDarray.indexOf("|");
					var idtmp=IDarray.substring(0,idtmp1);
					IDarray=IDarray.substring(idtmp1+1);

					var idtmp2=haschildArray.indexOf("|");
					var ishaschildnew=haschildArray.substring(0,idtmp2);
					haschildArray=haschildArray.substring(idtmp2+1);

			if(v_ntmp == idtmp){
				divn='table'+v_ntmp;
				img = 'img'+v_ntmp;
				img = eval(img);
				divn=eval(divn);
				if(divn.style.display!='')
				{
					divn.style.display='';
					//location.hash="#results"+v_ntmp;
					if(ishaschild!="0"){
					img.src="./images/jian01.png";
					}
				}
				else
				{
					divn.style.display='none';
					//location.hash="#results"+v_ntmp;
					if(ishaschild!="0"){
					img.src="./images/jia01.png";
					}
				}

			}else{

				divn='table'+idtmp;
				img = 'img'+idtmp;
				img = eval(img);
				divn=eval(divn);

				if(divn.style.display!='none')
				{
					divn.style.display='none';
					//location.hash="#results"+v_ntmp;
					if(ishaschildnew!="0"){
					img.src="./images/jia01.png";
					}
				}else {
					}

			}

		}
	}catch(ept){}
}
//鼠标滑过高亮显示
function mouseoverName(id, dark) {
	/*
    var ob1 = document.getElementById(id);
		if(ob1.className == "leftthirdbgandfont3"){
		//{console.error(ob1.className)}catch(e){}
		return;
		}
    ob1.className = dark;
  */

}

function mouseoutName(id, light) {
  /*
    var ob1 = document.getElementById(id);
		if(ob1.className == "leftthirdbgandfont3"){
		///try{console.error(ob1.className)}catch(e){}
		return;
		}
	if (idtmp!=ob1.id.substring(3)){
    ob1.className = light;
  }

     */
}