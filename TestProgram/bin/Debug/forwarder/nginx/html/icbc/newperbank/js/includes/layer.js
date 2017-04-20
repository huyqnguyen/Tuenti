function init(x) {
	try{
		if(document.all.object1){//防止页面未加载完成时，窗口大小发生变化，导致js错误
			object1.style.left = (document.body.clientWidth - 20);
		    object1.style.visibility = "visible";
		    if (document.all) {
		    	try{
		    	object1.style.left = (document.body.clientWidth - 20);
		        object1.style.visibility = "visible";

		        }catch(e){}
		    } else if (document.layers) {

		    	document.object1.left =parseInt(document.object1.left) + x;
		        document.object1.visibility = "show";
		    }
		}
	}catch(Exception){}
}
function move(x) {
	 	if(tag==0){
       	object1.style.left = parseInt(object1.style.left) + x;
        } else{
        	object1.style.left = parseInt(object1.style.left) + 0;
        	tag=0;
        }
        object1.style.visibility = "visible";


 /*   if (document.all) {

 		if(tag==0){

       	object1.style.left += x;
        } else{object1.style.left += 0;tag=0;}
        object1.style.visibility = "visible";


        }
    else if (document.layers) {

        document.object1.left += x;
        document.object1.visibility = "show";

        }
        */

}
function makeStatic() { 
    if (document.all) {
    
        object1.style.top=document.body.scrollTop+20
    }
    else {

        eval(document.object1.top=eval(window.pageYOffset+20));
    }
    setTimeout("makeStatic()",0);
}
function resize() {
   setTimeout( "init()",50);
    try{
	   //灵通宝layer特殊处理
	   document.getElementById("rightltb").style.display = "none";
	   document.all("tab1").style.textAlign = "left";
	   layerflag_ltb = false;
	}catch(e){}
    try{
    if(document.body.clientWidth<1000){
    	document.all["mainbody"].style="";
    	document.body.onscroll="javascript:init()";
    	}
    else{
    document.all.style="overflow-x:hidden";
    }
    }catch(Exception)
   {}
}