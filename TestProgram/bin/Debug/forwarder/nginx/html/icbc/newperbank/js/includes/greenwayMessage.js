
	function channelChange(){
	if (document.formChannel.select_layer.value==0){
		if (langgreen=="zh_CN"){
			alert("��ѡ�����������б�!");
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
//��������ʵ�ֵ���������ϵ�������ʱ��ʹonmouse�¼�ʧЧ
//ͨ��layer.jsp�ж����bool�ͱ���layerflag������move���Ⱥ�˳Ѱ
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
//��������ʵ�ֵ���꽹���뿪���ϵ�������ʱ��ʹonmouse�¼���Ч
		function InitEvent1()
{
var desk=document.getElementById("layerimg");
var desk1=document.getElementById("object1");
desk.onmouseover=getevent1;
desk1.onmouseout=removeevent1;
if(layerflag==true){
		
		//move(205); //ר��ע�͵������δѡ���κ���Ŀʱ������������⣬
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