
	function channelChange(){
	if (document.formChannel.select_layer.value==0){
		if (langgreen=="zh_CN"){
			alert("请选择网银功能列表!");
		}else{
			alert("Choose the list of Functions!");
		}		
		return;
	}
		document.formChannel.id.value=document.formChannel.select_layer.value;
		document.formChannel.submit();
	
	}
	function channelSubmit(id){
	
		document.formChannel.id.value=id;
		document.formChannel.submit();
	
	}
//以下用来实现当鼠标点击层上的下拉框时，使onmouse事件失效
//通过layer.jsp中定义的bool型变量layerflag来控制move的先后顺寻
	function InitEvent()
{
var desk=document.getElementById("object1");

desk.onmouseover=mover;
desk.onmouseout=mout;
}
function mover()
{
var desk=document.getElementById("object1");
desk.onclick = getevent;
}
function mout()
{
var desk=document.getElementById("object1");
desk.onclick = removeevent;
}
function getevent()
{

}
function removeevent()
{

}
//以下用来实现当鼠标焦点离开层上的下拉框时，使onmouse事件生效
		function InitEvent1()
{
var desk=document.getElementById("layerimg");
var desk1=document.getElementById("object1");
desk.onmouseover=getevent1;
desk1.onmouseout=removeevent1;
if(layerflag==true){
		
		//move(205); //专门注释掉，解决未选中任何栏目时层控制有误问题，
		//layerflag=false;
		}
}
function mover1()
{
var desk=document.getElementById("object1");
desk.onclick = getevent1;
}
function mout1()
{
var desk=document.getElementById("object1");
desk.onclick = removeevent1;
}
function getevent1()
{
if(layerflag==false){
		move(-205);
		layerflag=true;
		}
}
function removeevent1()
{
if(layerflag==true){
		move(205);
		layerflag=false;
		}
}