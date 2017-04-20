using CsQuery;
using HtmlAgilityPack;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Linq;
using System.Net;
using System.Runtime.InteropServices;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Json;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;
using System.Web.Script.Serialization;
public class Hello
{
    private static string content = @"<!DOCTYPE html PUBLIC ""-//W3C//DTD HTML 4.01 Transitional//EN"" ""http://www.w3.org/TR/html4/loose.dtd""><html xmlns=""http://www.w3.org/1999/xhtml"" lang=""in""><head>







 



















<meta http-equiv=""X-UA-Compatible"" content=""IE=edge"" />

<link href=""L002/consumer/images/favicon.ico"" type=""L002/consumer/images/x-icon"" rel=""shortcut icon"" />





<!-- Portal Changes Start--------( Simant_Verma )  -->

 

 

 







<!-- Portal Changes End--------( Simant_Verma )  -->

<!-- Prafulla_Badguajr Ticket No : 494042 - extra css loading (new_style.css) is removed by commenting following line. -->



 

<!-- Portal Changes Start--------( Simant_Verma )  -->









<script type=""text/javascript"" src=""scripts/common/NFEBAScripts.js?moduleId=accounts,scriptsPath=scripts,isVdtMode=false,nodePath=,ipAddress=116.50.224.90,contextPath=""></script><script type=""text/JavaScript"" src=""scripts/common/NFEBAFunctionLoader.js""></script><script type=""text/JavaScript"" src=""scripts/common/Ncooltree.js""></script><script type=""text/JavaScript"" src=""scripts/ria/ajaxfeatures/jquerymin.js""></script><script type=""text/JavaScript"" src=""scripts/ria/ajaxfeatures/jquery.class.js""></script><script type=""text/JavaScript"" src=""scripts/common/NFEBAJavaScripts.js""></script><script type=""text/JavaScript"" src=""scripts/common/NHWMails.js""></script><script type=""text/JavaScript"" src=""scripts/common/Ntree1_format.js""></script><script type=""text/JavaScript"" src=""scripts/common/Ncalendar1.js""></script><script type=""text/JavaScript"" src=""scripts/common/Ncommon.js""></script><script type=""text/JavaScript"" src=""scripts/common/Nencrypt.js""></script><script type=""text/JavaScript"" src=""scripts/common/Njson2.js""></script><script type=""text/JavaScript"" src=""scripts/common/Ndsprocessor.js""></script><script type=""text/JavaScript"" src=""scripts/common/NMap.js""></script><script type=""text/JavaScript"" src=""scripts/common/Nmessages.js""></script><script type=""text/JavaScript"" src=""scripts/common/NmessageFunctions.js""></script><script type=""text/JavaScript"" src=""scripts/common/NcommonFunctions.js""></script><script type=""text/JavaScript"" src=""scripts/common/Nxregexp.js""></script><script type=""text/JavaScript"" src=""scripts/common/Nxregexp-unicode.js""></script><script type=""text/JavaScript"" src=""scripts/common/NtypeDefinitionVal.js""></script><script type=""text/JavaScript"" src=""scripts/common/NtypeSysValidation.js""></script><script type=""text/JavaScript"" src=""scripts/common/NcookieScript.js""></script><script type=""text/JavaScript"" src=""scripts/common/NgroupletActionHandler.js""></script><script type=""text/JavaScript"" src=""scripts/common/NpageCustom.js""></script><script type=""text/JavaScript"" src=""scripts/common/Ntaglibs.js""></script><script type=""text/JavaScript"" src=""scripts/common/Nxframe.js""></script><script type=""text/JavaScript"" src=""scripts/ria/ajaxfeatures/NFEBAAjaxObjects.js""></script><script type=""text/JavaScript"" src=""scripts/ria/ajaxfeatures/NFEBAWidgets.js""></script><script type=""text/JavaScript"" src=""scripts/ria/ajaxfeatures/Noverlib_mini.js""></script><script type=""text/JavaScript"" src=""scripts/ria/visualeffects/NFEBAVisualEffects.js""></script><script type=""text/JavaScript"" src=""scripts/ria/ajaxfeatures/jquery-ui-custommin.js""></script><script type=""text/JavaScript"" src=""scripts/common/Noptions.js""></script><script type=""text/JavaScript"" src=""scripts/common/NCxpsCallFunctionsResponse.js""></script><script type=""text/JavaScript"" src=""scripts/common/NListingDetails.js""></script><script type=""text/JavaScript"" src=""scripts/ria/ajaxfeatures/jquery.simplemodal-1.4.1.js""></script><script type=""text/JavaScript"" src=""scripts/ria/ajaxfeatures/jquery.autocomplete.js""></script><script type=""text/JavaScript"" src=""scripts/ria/ajaxfeatures/jquery.qtip.js""></script><script type=""text/JavaScript"" src=""scripts/ria/ajaxfeatures/richTextEditor.js""></script><script type=""text/JavaScript"" src=""scripts/ria/ajaxfeatures/jquery.blockUI.js""></script><script type=""text/JavaScript"" src=""scripts/common/Nxregexp-unicode.js""></script><script type=""text/JavaScript"" src=""scripts/common/NtypeDefinitionVal.js""></script><script type=""text/JavaScript"" src=""scripts/common/NtypeSysValidation.js""></script><script type=""text/JavaScript"" src=""scripts/common/NcookieScript.js""></script><script type=""text/JavaScript"" src=""scripts/common/NgroupletActionHandler.js""></script><script type=""text/JavaScript"" src=""scripts/common/NpageCustom.js""></script><script type=""text/JavaScript"" src=""scripts/common/Ntaglibs.js""></script><script type=""text/JavaScript"" src=""scripts/ria/ajaxfeatures/NFEBAAjaxObjects.js""></script><script type=""text/JavaScript"" src=""scripts/ria/ajaxfeatures/NFEBAWidgets.js""></script><script type=""text/JavaScript"" src=""scripts/ria/ajaxfeatures/Noverlib_mini.js""></script><script type=""text/JavaScript"" src=""scripts/ria/visualeffects/NFEBAVisualEffects.js""></script><script type=""text/JavaScript"" src=""scripts/ria/ajaxfeatures/jquery-ui-custommin.js""></script><script type=""text/JavaScript"" src=""scripts/common/Noptions.js""></script><script type=""text/JavaScript"" src=""scripts/common/NEBGCD.js""></script><script type=""text/JavaScript"" src=""scripts/common/NCxpsGDHelper.js""></script><script type=""text/javascript"" src=""scripts/json.js""></script><script type=""text/JavaScript"" src=""scripts/common/NCxpsCallFunctionsResponse.js""></script><script type=""text/JavaScript"" src=""scripts/common/NListingDetails.js""></script><script type=""text/JavaScript"" src=""scripts/ria/ajaxfeatures/jquery.simplemodal-1.4.1.js""></script><script type=""text/JavaScript"" src=""scripts/ria/ajaxfeatures/jquery.autocomplete.js""></script><script type=""text/JavaScript"" src=""scripts/ria/ajaxfeatures/jquery.qtip.js""></script><script type=""text/JavaScript"" src=""scripts/ria/ajaxfeatures/richTextEditor.js""></script><script type=""text/JavaScript"" src=""scripts/ria/ajaxfeatures/jquery.blockUI.js""></script><script type=""text/JavaScript"" src=""scripts/common/NAnalyticsEngine.js""></script><script type=""text/JavaScript"" src=""scripts/ria/visualeffects/NFEBAAccordion.js""></script><script type=""text/JavaScript"" src=""scripts/common/Njquery-jcryption.js""></script><script type=""text/JavaScript"" src=""scripts/ria/visualeffects/NFEBATabs.js""></script><script type=""text/JavaScript"" src=""scripts/ria/visualeffects/NFEBATooltip.js""></script><script type=""text/JavaScript"" src=""scripts/ria/visualeffects/NFEBACalendar.js""></script><script type=""text/JavaScript"" src=""scripts/common/Njquery-jcryption.js""></script><script type=""text/JavaScript"" src=""scripts/ria/visualeffects/NFEBATabs.js""></script><script type=""text/JavaScript"" src=""scripts/ria/visualeffects/NFEBATooltip.js""></script><script type=""text/JavaScript"" src=""scripts/ria/visualeffects/NFEBACalendar.js""></script><script type=""text/JavaScript"" src=""scripts/common/Nmashup.js""></script><script type=""text/JavaScript"" src=""scripts/common/NGeoTagging.js""></script><script type=""text/JavaScript"" src=""scripts/ria/ajaxfeatures/jquery.jcarousel.js""></script><script type=""text/JavaScript"" src=""scripts/common/NFEBAJSConfiguration.js""></script><script type=""text/JavaScript"" src=""scripts/common/Nfacebook-utils.js""></script><script type=""text/JavaScript"" src=""scripts/ria/ajaxfeatures/jquery.jcarousel.js""></script><script type=""text/JavaScript"" src=""scripts/common/Njquery.selectbox-0.5.js""></script><script type=""text/JavaScript"" src=""scripts/common/NPageScript.js""></script><script type=""text/JavaScript"" src=""scripts/common/NFEBAJSConfiguration.js""></script><script type=""text/JavaScript"" src=""scripts/adaptiveauthentication/adaptivecommon.js""></script><script type=""text/JavaScript"" src=""scripts/common/WorkOffline.js""></script>

<script type=""text/javascript"">jQuery.noConflict();</script>

	

















<!-- Portal Changes for 10.3 start by abhishek_agarwal -->



<!--  Check whether request coming is for Portal or for Servlet  -->









<script>

setTreeFormt(1);

</script>

<!-- Changes For Portal Ends here  -->

<!-- Portal Changes for 10.3 start by abhishek_agarwal -->





<link href="" L002/consumer/theme/new_style.css?mtime=0"" rel=""stylesheet"" type=""text/css"" />









<!-- Portal Changes end -->















	 





</head><body oncontextmenu=""return false;"" onload="""" style=""display: block;""><div id=""flashcontent"">

</div>

<script>  

 jQuery(document).ready(function () {

 jQuery('Action.GENERATE_REPORT').attr('value','');

 });

</script> 













<title>BNI Internet Banking:Histori Transaksi</title>
                    <script async="""" src=""https://ds-aksb-a.akamaihd.net/aksb.min.js""></script><script type=""text/javascript"">
                      var w=window;
                      if(w.performance||w.mozPerformance||w.msPerformance||w.webkitPerformance){var d=document,AKSB=AKSB||{};AKSB.q=[];AKSB.mark=function(a,b){AKSB.q.push([""mark"",a,b||(new Date).getTime()])};AKSB.measure=function(a,b,c){AKSB.q.push([""measure"",a,b,c||(new Date).getTime()])};AKSB.done=function(a){AKSB.q.push([""done"",a])};AKSB.mark(""firstbyte"",(new Date).getTime());AKSB.prof={custid:""354258"",ustr:""AES256-GCM-SHA384"",originlat:0,clientrtt:78,ghostip:""23.201.102.180"",
                      ipv6:false,pct:10,clientip:""116.50.224.90"",requestid:""19ccf803"",protocol:"""",blver:10,akM:""b"",akN:""ae"",akTT:""O"",akTX:""1"",akTI:""19ccf803"",ai:""209571"",ra:"""",pmgn:"""",pmgi:"""",pmp:""""};(function(a){var b=
                      d.createElement(""script"");b.async=""async"";b.src=a;a=d.getElementsByTagName(""script"");a=a[a.length-1];a.parentNode.insertBefore(b,a)})((""https:""===d.location.protocol?""https:"":""http:"")+""//ds-aksb-a.akamaihd.net/aksb.min.js"")};
                    </script>
                    
<script type=""text/javascript"">var langID=""002""
var locale=""in_ID""
</script><object id=""oCAPICOM"" classid=""clsid:A996E48C-D3DC-4244-89F7-AFA33EC60679"" codebase=""capicom.cab#version=2,0,0,0"" width=""0"" height=""0""></object><form name=""TransactionHistoryFG"" action=""Finacle;jsessionid=0000DXxMMiBuwvZm9ZZtH8Xtiry:19u1hofd2?bwayparam=k3ln3O%2F9dGB13TiYnWFbVsODAuYtdpD2qgJm9h3aOrE%3D"" method=""post"" autocomplete=""off"" id=""outerTab"" style=""font-size: 1em;""><script type=""text/javascript"">function actionset(){if(document.TransactionHistoryFG.ACTIONSWITCH== ""Y""){document.TransactionHistoryFG.ACTIONSWITCH= ""N""}else{document.TransactionHistoryFG.action= """";document.TransactionHistoryFG.action= """";}}</script>


	

<script type=""text/javascript""> jQuery.noConflict();</script>

 <script src=""scripts/table_row.js"" type=""text/javascript""></script>
  




<div id=""global"" class=""body-style-02"">






	
	<script type=""text/javascript"">
		jQuery(document).ready(function(){
			if (jQuery.browser.msie &amp;&amp; Number(jQuery.browser.version, 10) &lt; 8){
				jQuery('select').not('#header select, #topbar select, #locationbar select')
				.parent().css({""background-image"" : ""url('')"", ""background-color"":""transparent""})
				.parent().css({""background-image"" : ""url('')"", ""background-color"":""transparent""});
			}
		});
	</script>
	<!-- Role is added for DDA to specify logo of the page-->
	<div id=""header"" class="""" role=""banner"">
	<!-- Portal Changes Start--------( Simant_Verma )  -->





<!-- Portal Changes End--------( Simant_Verma )  -->
















<div id=""locationbar"" class=""top_bluetab_r""> 
	


	
	
		
			
	
			
			
				
					
					
					
					
					
					
					
					
					
					
					
					
				
			
		
	
	
	


	
	
		
		
			
				
			
		
	
	
	
		
	
	
	
	

							
							
							
							
			
							
	

<p id=""section32.Ra1"" class=""top_bluetabcontent_1"">
<span id=""""><span class="""" id=""span_HREF_SkipToContent"" title=""Langsung ke Isi""><a <a="""" href=""#skiptomaincontent"" title=""Langsung ke Isi"" id=""HREF_SkipToContent"" name=""HREF_HREF_SkipToContent"" class=""formbtn_link"">Langsung ke Isi</a></span><span class=""top_bluetabdivider_1"" id=""divider2"">|</span><span class=""top_bluetabtxt_1"" id=""custId"" title=""Customer ID"">Nomor ID Pelanggan:</span><span class=""labelColumn_combo""><span class=""labelColumn_combo_brdr""> <select name=""TransactionHistoryFG.SELECTED_CUST_ID__"" class=""dropdownexpandalbe"" id=""TransactionHistoryFG.SELECTED_CUST_ID__""> <option value="""">Semua ID Nasabah</option> <option value=""9312974781"">9312974781</option></select></span></span></span><span id=""prevSessionTimeOut"" class=""prevSessionTimeOut""><span><span class=""simpletext"" style=""color:red;"" id=""expiryMsg"">Sesi anda akan habis dalam <label id=""sessionExpiryTime"">0 hrs: 5 mins</label></span><br /></span><input type=""Submit"" name=""Action.PREVENT_SESSION_TIMEOUT__"" class=""formbtn_session_r"" id=""PREVENT_SESSION_TIMEOUT__"" value=""Cegah Sesi Berakhir"" title=""Cegah Sesi Berakhir"" /><span class=""top_bluetabdivider_1"" id=""divider3"">|</span><span class="""" id=""span_HREF_Logout"" title=""Logout""><a <a="""" href=""Finacle;jsessionid=0000DXxMMiBuwvZm9ZZtH8Xtiry:19u1hofd2?bwayparam=lxXjs%2BNCNkravRuaUc9IsctwkKWNLoPmHxy7ukf68NXDf%2F8MB27WZ8z8gNy6OvkZuBuhJ5hW1%2BCR%0D%0AGJx1vhGoC3NQcjT4m5MGMTH10fEkuLIfDB2h8%2FVndu3sxk0JYyEA"" title=""Logout"" id=""HREF_Logout"" name=""HREF_HREF_Logout"" class=""formbtn_link"">Logout</a></span></span></p>


</div>




<!-- Changes Start for Ticket ID  386724 by Simant_Verma -->
<!-- Portal Changes Start--------( Simant_Verma )   -->

<!-- Portal Changes End--------( Simant_Verma )  -->
<!-- Changes End -->

 

































































	





















































<div id=""header"">

		<div id=""header-main"" class=""header-main"">

			<div id=""wrapper1"">

			<div id=""headerouter"" class=""headerouter_r"">

			<!-- Role is added for DDA to specify logo of the page-->



				<div class=""txt_boxnew"" id="""">

					

						

							

								<div id=""background"" style=""background-color: transparent;"">

								

					



									

										

											

											

												

													

													

												    

												

											

										

											

										

										

									

								





							







								





								<p id="""">
<span id="".row93.C1"" class=""headerWelcomeText""><span class=""headertext_name"" id=""welcome"">Selamat Datang</span><span class=""headertext_name"" id=""salutation"">Bapak</span><span class=""headertext_name"" id=""firstName""> febianto </span></span></p>


</div>





							

								

									

									

									

									

									
									

										

								



							

						



						



							

							





						

							

								

								



							

							 

						





					<p id=""lastLoginMessage_1"" class="" "">
<span id=""lastLoginMessage""><span class=""headertext_lastlog"" id=""logintime"">Login terakhir:</span><span class=""headertext_lastlog"" id=""lastLogin"">07-Nov-2016 10:45:24</span><span class=""headertext_lastlog"" id=""lastLogin1"">WIB</span></span></p>


					

					

<!--Added for Context Switching - BEGIN -->

	

	

	

	

	



	

	

					

						

				

			

		

	</div>


								<div id=""logo_1"" class=""logo_1"" role=""banner"">

			

						<!-- <a><img src= L002/consumer/images/logo-new.png /></a> -->

					</div>

				</div>

			</div>

		</div>



	</div>















</div>









<input type=""Hidden"" name=""sessionTimeout"" value=""300"" id=""sessionTimeout"" /> 
<input type=""Hidden"" name=""sessionAlertTime"" value=""60"" id=""sessionAlertTime"" />
<input type=""Hidden"" name=""sessionImgPath"" value=""L002/consumer/images/loginbtn1.jpg"" id=""sessionImgPath"" />
<input type=""Hidden"" name=""sessionLoginURL"" value=""AuthenticationController?__START_TRAN_FLAG__=Y&amp;FORMSGROUP_ID__=AuthenticationFG&amp;__EVENT_ID__=LOAD&amp;FG_BUTTONS__=LOAD&amp;ACTION.LOAD=Y&amp;AuthenticationFG.LOGIN_FLAG=1&amp;BANK_ID=BNI01&amp;LANGUAGE_ID=002"" id=""sessionLoginURL"" />
<script language=""javascript"" type=""text/javascript"">
sessionTimer(""consumer/theme/new_style.css?mtime=0"", ""L002/consumer/theme/new_style.css?mtime=0"");
</script>



<div id=""topbar"" role=""navigation""><div id=""header""><div class=""header-nav""><div class=""wrapper""><div class=""row""><ul class=""tabs""><li style=""list-style-type:none;""><a class=""floatingleft"" href=""Finacle;jsessionid=0000DXxMMiBuwvZm9ZZtH8Xtiry:19u1hofd2?bwayparam=lxXjs%2BNCNkravRuaUc9IsctwkKWNLoPmHxy7ukf68NUobDsV8x7myLp%2FdY7ZuGTd0GROLOiLfsj9%0D%0ALDfxvRrCF9ssl37TDvaCJ9SRQX7nP54Ul%2Be7xkV5EIQQd73yvhGuCRrwrZLUs8clZpN8M%2B8yR6ydMNqD%0D%0ATm%2FKn%2FPyFVU%2FnXIar%2FuifSU22VbJ%2FvmKz9ybDVu0tiCavk1w4Jr1I7qvHx8MHaHz9Wd27ezGTQljIQA%3D"" id=""BERANDA"" name=""HREF_BERANDA"">BERANDA</a></li><li style=""list-style-type:none;""><a class=""floatingleft"" href=""Finacle;jsessionid=0000DXxMMiBuwvZm9ZZtH8Xtiry:19u1hofd2?bwayparam=lxXjs%2BNCNkravRuaUc9IsctwkKWNLoPmHxy7ukf68NUobDsV8x7myLp%2FdY7ZuGTd0GROLOiLfsj9%0D%0ALDfxvRrCF9ssl37TDvaCJ9SRQX7nP54Ul%2Be7xkV5EIQQd73yvhGuCRrwrZLUs8clZpN8M%2B8yR0klO50g%0D%0A3W%2Bw0o59egh3Ihl%2BjTjerazdxbhV8%2B0s3LDpCWICe%2FG6Nb6p0ZseYkwN5x8MHaHz9Wd27ezGTQljIQA%3D"" id=""FAVORIT"" name=""HREF_FAVORIT"">FAVORIT</a></li><li style=""list-style-type:none;""><a class=""floatingleft"" href=""Finacle;jsessionid=0000DXxMMiBuwvZm9ZZtH8Xtiry:19u1hofd2?bwayparam=lxXjs%2BNCNkravRuaUc9IsctwkKWNLoPmHxy7ukf68NUobDsV8x7myLp%2FdY7ZuGTd0GROLOiLfsj9%0D%0ALDfxvRrCF9ssl37TDvaCJ9SRQX7nP54Ul%2Be7xkV5EIQQd73yvhGuCRrwrZLUs8clZpN8M%2B8yRwHOMdIS%0D%0AU6gCaQtCdHsPm5KVgz0YPCxctQJqQKgyTpoVHc1yglJaEced1GYqTMuyoRxwGx4inE2M6i0peRCKl2Q%3D"" id=""REKENING"" name=""HREF_REKENING"">REKENING</a></li><li style=""list-style-type:none;""><a class=""floatingleft"" href=""Finacle;jsessionid=0000DXxMMiBuwvZm9ZZtH8Xtiry:19u1hofd2?bwayparam=lxXjs%2BNCNkravRuaUc9IsctwkKWNLoPmHxy7ukf68NUobDsV8x7myLp%2FdY7ZuGTd0GROLOiLfsj9%0D%0ALDfxvRrCF9ssl37TDvaCJ9SRQX7nP54Ul%2Be7xkV5EIQQd73yvhGuCRrwrZLUs8clZpN8M%2B8yR8amFbqe%0D%0ATYtNtKjI4%2BdW9tmVgz0YPCxctQJqQKgyTpoVfmXWZVScUOHQQeUBheSLPhxwGx4inE2M6i0peRCKl2Q%3D"" id=""TRANSAKSI"" name=""HREF_TRANSAKSI"">TRANSAKSI</a></li><li style=""list-style-type:none;""><a class=""floatingleft"" href=""Finacle;jsessionid=0000DXxMMiBuwvZm9ZZtH8Xtiry:19u1hofd2?bwayparam=lxXjs%2BNCNkravRuaUc9IsctwkKWNLoPmHxy7ukf68NUobDsV8x7myLp%2FdY7ZuGTd0GROLOiLfsj9%0D%0ALDfxvRrCF9ssl37TDvaCJ9SRQX7nP54Ul%2Be7xkV5EIQQd73yvhGuCRrwrZLUs8clZpN8M%2B8yR5vt9t%2Ba%0D%0AH%2BUF7snP6Rhi0wh%2BjTjerazdxbhV8%2B0s3LDpkLEy4dRRdRi0VMVY0Ax2%2Bh8MHaHz9Wd27ezGTQljIQA%3D"" id=""LAYANAN_LAINNYA"" name=""HREF_LAYANAN LAINNYA"">LAYANAN LAINNYA</a></li><li style=""list-style-type:none;""><a class=""floatingleft"" href=""Finacle;jsessionid=0000DXxMMiBuwvZm9ZZtH8Xtiry:19u1hofd2?bwayparam=lxXjs%2BNCNkravRuaUc9IsctwkKWNLoPmHxy7ukf68NUobDsV8x7myLp%2FdY7ZuGTd0GROLOiLfsj9%0D%0ALDfxvRrCF9ssl37TDvaCJ9SRQX7nP54Ul%2Be7xkV5EIQQd73yvhGuCRrwrZLUs8clZpN8M%2B8yRz1jFamX%0D%0A5jatlYNmdyZ0WmaVgz0YPCxctQJqQKgyTpoVhf00yKhatf1fyUssHa7vMRxwGx4inE2M6i0peRCKl2Q%3D"" id=""PROFIL"" name=""HREF_PROFIL"">PROFIL</a></li><li style=""list-style-type:none;""><a class=""floatingleft"" href=""Finacle;jsessionid=0000DXxMMiBuwvZm9ZZtH8Xtiry:19u1hofd2?bwayparam=lxXjs%2BNCNkravRuaUc9IsctwkKWNLoPmHxy7ukf68NUobDsV8x7myLp%2FdY7ZuGTd0GROLOiLfsj9%0D%0ALDfxvRrCF9ssl37TDvaCJ9SRQX7nP54Ul%2Be7xkV5EIQQd73yvhGuCRrwrZLUs8clZpN8M%2B8yRz859Sbw%0D%0ADbh9K5vAPPqr5W38QsOuo1KqarC%2FGG8gDL6juyhrfh6Hmwm2YoVPXJ28jB8MHaHz9Wd27ezGTQljIQA%3D"" id=""PENGELOLAAN_FINANSIAL_PRIBADI"" name=""HREF_PENGELOLAAN FINANSIAL PRIBADI"">PENGELOLAAN FINANSIAL PRIBADI</a></li></ul></div></div></div></div></div><div id=""main"" role=""main""><div class=""wrapper"" style=""background-color:#FFFFFF"">
 
<!-- menu profile change -->


<!-- Portal Changes for 10.3 start by abhishek_agarwal06 -->




<!--Portal changes end -->







	



	<div class=""row toprow"">








	



	

	</div>

	





 

<link href=""L002/consumer/theme/consumer_navigationbar.css "" rel=""stylesheet"" type=""text/css"" /> 





<!-- Portal Changes Start--------( Simant_Verma ) -->





<!-- Portal Changes End--------( Simant_Verma )  -->



















<!-- Get the user Type -->



	



<script type=""text/javascript""> jQuery.noConflict();</script>



<script type=""text/javascript"">



  jQuery(document).ready(function(){

 

 

try{  

	jQuery('#element-uid-1').FEBAAccordion({node:'li',heading:'a',content:'ul'});		

	var str = jQuery('#HREF_BrdCrmb1').attr('innerHTML').replace('&amp;amp;','').replace('&amp;gt;','').replace('/','').trim().replace(new RegExp("" "", 'g'),""-"");

	str = '#'+str;	

	jQuery(str).click();

	}

	catch(e){	

	}	

});



	

 </script>





 



  <div class=""row bckgrndattr""><div class=""column column-0"" role=""navigation""><div class=""menu menu-nested""><ul id=""element-uid-1"" style=""list-style-type:none;""> <li class=""open""><a data-dontblockui=""true"" href=""Finacle;jsessionid=0000DXxMMiBuwvZm9ZZtH8Xtiry:19u1hofd2?bwayparam=lxXjs%2BNCNkravRuaUc9IsctwkKWNLoPmHxy7ukf68NUobDsV8x7myLp%2FdY7ZuGTd0GROLOiLfsj9%0D%0ALDfxvRrCF9ssl37TDvaCJ9SRQX7nP54Ul%2Be7xkV5EIQQd73yvhGuCRrwrZLUs8clZpN8M%2B8yR1BpOcqe%0D%0AsWt7ChhlBt4DTb2Vgz0YPCxctQJqQKgyTpoVz%2BVS9xDC08bLujUJINoixwSPy3QxbiVPLiEvYCAjH08%3D"" id=""Informasi-Saldo--Mutasi"" style=""cursor: pointer;"">Informasi Saldo &amp; Mutasi</a> <ul style=""list-style-type: none; position: relative;""> <li><a href=""Finacle;jsessionid=0000DXxMMiBuwvZm9ZZtH8Xtiry:19u1hofd2?bwayparam=lxXjs%2BNCNkravRuaUc9IsctwkKWNLoPmHxy7ukf68NUobDsV8x7myLp%2FdY7ZuGTd0GROLOiLfsj9%0D%0ALDfxvRrCF9ssl37TDvaCJ9SRQX7nP54Ul%2Be7xkV5EIQQd73yvhGuCRrwrZLUs8clZpN8M%2B8yR3yQ3mFv%0D%0Ai5WLCtUbuEw7O6FFkZlRCf1tKHEtiux%2FnBV0XQyXpEuE25swHCEydShl5xaD%2FQvk5xy9jw9%2BxQbWw1w%3D"" id=""Informasi-Saldo--Mutasi_Saldo-Rekening"">Saldo Rekening</a></li> <li><a href=""Finacle;jsessionid=0000DXxMMiBuwvZm9ZZtH8Xtiry:19u1hofd2?bwayparam=lxXjs%2BNCNkravRuaUc9IsctwkKWNLoPmHxy7ukf68NUobDsV8x7myLp%2FdY7ZuGTd0GROLOiLfsj9%0D%0ALDfxvRrCF9ssl37TDvaCJ9SRQX7nP54Ul%2Be7xkV5EIQQd73yvhGuCRrwrZLUs8clZpN8M%2B8yR37SZa%2BA%0D%0A5F8QK%2BrKqsUuafyVgz0YPCxctQJqQKgyTpoVpqZ6fvnexHEbgyv525IUjKqt5xFIOeOEZu6mzwiyALs%3D"" id=""Informasi-Saldo--Mutasi_Mutasi-Tabungan--Giro"">Mutasi Tabungan &amp; Giro</a></li> <li><a href=""Finacle;jsessionid=0000DXxMMiBuwvZm9ZZtH8Xtiry:19u1hofd2?bwayparam=lxXjs%2BNCNkravRuaUc9IsctwkKWNLoPmHxy7ukf68NUobDsV8x7myLp%2FdY7ZuGTd0GROLOiLfsj9%0D%0ALDfxvRrCF9ssl37TDvaCJ9SRQX7nP54Ul%2Be7xkV5EIQQd73yvhGuCRrwrZLUs8clZpN8M%2B8yRxT9xCtT%0D%0AtIvG1SEVJJhSXIqVgz0YPCxctQJqQKgyTpoVIsYeELo1QwLO6h3AWgZ8Fqqt5xFIOeOEZu6mzwiyALs%3D"" id=""Informasi-Saldo--Mutasi_Mutasi-Deposito--Tapenas"">Mutasi Deposito &amp; Tapenas</a></li> <li><a href=""Finacle;jsessionid=0000DXxMMiBuwvZm9ZZtH8Xtiry:19u1hofd2?bwayparam=lxXjs%2BNCNkravRuaUc9IsctwkKWNLoPmHxy7ukf68NUobDsV8x7myLp%2FdY7ZuGTd0GROLOiLfsj9%0D%0ALDfxvRrCF9ssl37TDvaCJ9SRQX7nP54Ul%2Be7xkV5EIQQd73yvhGuCRrwrZLUs8clZpN8M%2B8yR2KmQ7gy%0D%0AdKRxwwJ2wubUcTiVgz0YPCxctQJqQKgyTpoVIrGtr2fWXjacdLlX6A9Asaqt5xFIOeOEZu6mzwiyALs%3D"" id=""Informasi-Saldo--Mutasi_Mutasi-Pinjaman"">Mutasi Pinjaman</a></li> <li><a href=""Finacle;jsessionid=0000DXxMMiBuwvZm9ZZtH8Xtiry:19u1hofd2?bwayparam=lxXjs%2BNCNkravRuaUc9IsctwkKWNLoPmHxy7ukf68NUobDsV8x7myLp%2FdY7ZuGTd0GROLOiLfsj9%0D%0ALDfxvRrCF9ssl37TDvaCJ9SRQX7nP54Ul%2Be7xkV5EIQQd73yvhGuCRrwrZLUs8clZpN8M%2B8yR6R%2F9ytc%0D%0AzNRO5EnpJcPYcnqVgz0YPCxctQJqQKgyTpoV27VRIZi2DNIzD1FjzaaQoqqt5xFIOeOEZu6mzwiyALs%3D"" id=""Informasi-Saldo--Mutasi_Mutasi-Dana-Pensiun"">Mutasi Dana Pensiun</a></li> </ul> </li> </ul></div></div><div class=""column column-1"" role=""main"">





























<!-- Portal Changes Start--------( Simant_Verma )  -->



<!-- Portal Changes End--------( Simant_Verma )  -->


  
  
  
  
  
  
  
  
  <div class=""section"" id=""BrdCrumbNImg"">
    
      
        
          
            
              <p><a name=""skiptomaincontent""></a><span class=""bcum"">
<span class=""bcum-bold"" id=""moduleTopBar13558604"">REKENING: <span id=""HREF_BrdCrmb1"">
	Informasi Saldo &amp; Mutasi &gt; </span></span><a href=""Finacle;jsessionid=0000DXxMMiBuwvZm9ZZtH8Xtiry:19u1hofd2?bwayparam=lxXjs%2BNCNkravRuaUc9IsctwkKWNLoPmHxy7ukf68NUobDsV8x7myLp%2FdY7ZuGTd0GROLOiLfsj9%0D%0ALDfxvRrCF9ssl37TDvaCJ9SRQX7nP54Ul%2Be7xkV5EIQQd73yvhGuCRrwrZLUs8clZpN8M%2B8yR37SZa%2BA%0D%0A5F8QK%2BrKqsUuafyVgz0YPCxctQJqQKgyTpoVpqZ6fvnexHEbgyv525IUjKqt5xFIOeOEZu6mzwiyALs%3D"" id=""HREF_BrdCrmb2"" name=""HREF_BrdCrmb2"" class=""bcum-Ulined"">Mutasi Tabungan &amp; Giro</a> &gt; Histori Transaksi</span><a href=""Finacle;jsessionid=0000DXxMMiBuwvZm9ZZtH8Xtiry:19u1hofd2?bwayparam=IYO9ts52gEeBG%2B%2Fht%2BfmmzM2TG6RKGA5OmiGtVFb9hHsLT2DwdaaLXLk%2FvMGxewzf612n5IG7lrX%0D%0AXTekXWTuQGZBDaJyoGXYWKnvlxn6xUtm7tzZmhZFSMLPbL0TK67ZQQ5I8k%2BCMyGy6VZn%2BtFl9xaD%2FQvk%0D%0A5xy9jw9%2BxQbWw1w%3D"" id=""HREF_printPreview"" name=""HREFprintPreview"" data-isexcluded=""true"" onclick=""window.open(this.href,'','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,width=640,height=660 left=200 top=25,resizable=1'); return false;"" target=""new ""><img src=""L002/consumer/images/btn-print.gif"" alt=""Cetak halaman utama"" title=""Cetak halaman utama"" id=""printpreview"" border=""0"" /></a></p>
            
          
        
      
    
  </div>

  <div class=""section"" id=""PgHeading"">
    
      
        
          
            
              
            
            
              
            
            
              
                
                
                
              
            
          <div id=""PgHeading.Ra1"">
<span id=""PgHeading.Ra1.C1"" class=""width10""><img src=""L002/consumer/images/arrow-pageheading.gif?mtime=1359105366000"" alt=""Gambar Panah"" title=""Gambar Panah"" id=""arrowImage"" border=""0"" /></span><div id=""PgHeading.Ra1.C2"" class=""pageheadingcaps""><h1>Histori Transaksi</h1></div></div> 
        
      
    
  </div>

  
  <div class=""section_blackborder"" id=""SearchPanel"">
    
      <!--start of subsection--><div id=""SearchPanel.SubSection1"" class=""width100percent"">
        <div class=""width100percent"" id=""SearchPanel.Rowset1"">
          
            
              
            
            
              
            
          
          
            
              
            
            
              
            
          
          
            
              
            
            
              
            
          
          
            
              
            
            
              
            
          
          
            
              
            
            
              
            
          
          
            
              
            
            
              
            
          
          
            
              
            
            
              
            
          
        </div>

      </div>
<!--end of subsection-->
      <!--start of subsection--><div id=""SearchPanel.SubSection2"" class=""width100percent"">
        
          
          
        <h3 class=""subsectheader"" id=""SearchPanel.Header2""><a href=""javascript:return false"" name=""HREF_null"" class=""collapsiblelink"" onclick=""return expandCollapse('SearchPanel.Header2','SearchPanel#SearchPanel.SubSection2','sectionCollapse','null');""><img src=""L002/consumer/images/minus.gif"" alt=""Minus"" border=""0"" title=""Sembunyikan"" id=""SearchPanel.SubSection2.collapsibleImage"" /><label for=""null"" id=""LabelForControl7047610"" class=""simpletext"">Kriteria Pencarian</label></a></h3> 

        <div class=""width100percent"" id=""SearchPanel.Rowset2"">
          
            
              
            
            
              
            
          <p id=""SearchPanel.Rb1"" class=""formrow"">
<span id=""SearchPanel.Rb1.C1"" class=""querytextleft""><label for=""TransactionHistoryFG.INITIATOR_ACCOUNT"" id=""Accounts"" class=""simpletext"">Rekening :</label></span><span id=""SearchPanel.Rb1.C2"" class=""querytextright""><span class=""labelColumn_combo""><span class=""labelColumn_combo_brdr""> <select name=""TransactionHistoryFG.INITIATOR_ACCOUNT"" class=""dropdownexpandalbe"" id=""TransactionHistoryFG.INITIATOR_ACCOUNT"" title=""Rekening""> <option value=""00000000346984092||SBA"">(IDR)  - 00000000346984092</option></select></span></span></span></p>

          
            
              
                
                
              
            
            
              
            
          <p id=""SearchPanel.Rb2"" class=""formrow"">
<span id=""SearchPanel.Rb2.C1"" class=""querytextleft""><font class=""absmiddletxt""><input type=""radio"" name=""TransactionHistoryFG.SELECTED_RADIO_INDEX"" value=""0"" class=""absmiddle"" id=""TransactionHistoryFG.SELECTED_RADIO_INDEX"" title=""Pilih Tanggal Awal Transaksi"" /></font><label for=""TransactionHistoryFG.FROM_TXN_DATE"" id=""txnDateFromLabel"" class=""simpletext"">Tanggal Awal<span style=""direction: rtl; unicode-bidi: embed"">(dd-MMM-yyyy)</span>:</label></span><span id=""SearchPanel.Rb2.C2"" class=""querytextright""><span class=""datelabelColumn""><span class=""datelabelColumn_border""><input type=""Text"" name=""TransactionHistoryFG.FROM_TXN_DATE"" id=""TransactionHistoryFG.FROM_TXN_DATE"" maxlength=""11"" value="""" data-febatype=""FEBADate"" class=""datetextbox type_FEBADate"" /> <a href=""#"" title=""Kalender"" name=""HREF_TransactionHistoryFG.FROM_TXN_DATE"" id=""HREF_TransactionHistoryFG.FROM_TXN_DATE""><img src=""L002/consumer/images/calenderEndUser.gif"" alt=""Kalender"" id=""TransactionHistoryFG.FROM_TXN_DATE_Calendar_IMG"" border=""0"" class=""absmiddlecalendar"" /></a>  </span></span></span></p>

          
            
              
            
            
              
            
                        			
            
              
            
            
              
            
          <p id=""SearchPanel.Rb3"" class=""formrow"">
<span id=""SearchPanel.Rb3.C1"" class=""querytextleftWithTab""><label for=""TransactionHistoryFG.TO_TXN_DATE"" id=""txnDateToLabel"" class=""simpletext"">Tanggal Akhir<span style=""direction: rtl; unicode-bidi: embed"">(dd-MMM-yyyy)</span>:</label></span><span id=""SearchPanel.Rb3.C2"" class=""querytextright""><span class=""datelabelColumn""><span class=""datelabelColumn_border""><input type=""Text"" name=""TransactionHistoryFG.TO_TXN_DATE"" id=""TransactionHistoryFG.TO_TXN_DATE"" maxlength=""11"" value="""" data-febatype=""FEBADate"" class=""datetextbox type_FEBADate"" /> <a href=""#"" title=""Kalender"" name=""HREF_TransactionHistoryFG.TO_TXN_DATE"" id=""HREF_TransactionHistoryFG.TO_TXN_DATE""><img src=""L002/consumer/images/calenderEndUser.gif"" alt=""Kalender"" id=""TransactionHistoryFG.TO_TXN_DATE_Calendar_IMG"" border=""0"" class=""absmiddlecalendar"" /></a>  </span></span></span><span id=""SearchPanel.Rb3.C3"" class=""querytextleft""><span class=""simpletext"">       </span></span><span id=""SearchPanel.Rb3.C4"" class=""querytextright""><label for=""TranRequestManagerFG.TO_TXN_DATE"" id=""txnDateToLabel1"" class=""simpletext11"">Maksimum rentang Tanggal Awal dan Akhir mutasi adalah 31 hari, dan harus masuk dalam periode 6 bulan transaksi terakhir.</label></span></p>

          
            
              
                
                
              
            
            
              
            
          <p id=""SearchPanel.Rb4"" class=""formrow"">
<span id=""SearchPanel.Rb4.C1"" class=""querytextleft""><font class=""absmiddletxt""><input type=""radio"" name=""TransactionHistoryFG.SELECTED_RADIO_INDEX"" value=""1"" checked=""checked"" class=""absmiddle"" id=""TransactionHistoryFG.SELECTED_RADIO_INDEX"" title=""Pilih Periode Transaksi"" /></font><label for=""TransactionHistoryFG.TXN_PERIOD"" id=""txnPeriodLabel"" class=""simpletext"">Periode :</label></span><span id=""SearchPanel.Rb4.C2"" class=""querytextright""><span class=""labelColumn_combo""><span class=""labelColumn_combo_brdr""> <select name=""TransactionHistoryFG.TXN_PERIOD"" class=""dropdownexpandalbe"" id=""TransactionHistoryFG.TXN_PERIOD"" title=""Periode""> <option value="""">Pilih</option> <option value=""04"">1 Bulan Terakhir</option> <option value=""05"">1 Minggu terakhir</option> <option selected="""" value=""06"">Hari ini</option></select></span></span></span></p>

          
            
              
                
                
              
            
            
              
                
                
              
            
          
          
            
              
                
                
              
            
            
              
            
          <p id=""SearchPanel.Rb6"" class=""formrow"">
<span id=""SearchPanel.Rb6.C1"" class=""querytextleft""><span class=""simpletext"">       </span><label for=""TransactionHistoryFG.TXN_CATEGORY_ID"" id=""Categorylabel"" title=""Kategori"" class=""simpletext"">Kategori:</label></span><span id=""SearchPanel.Rb6.C2"" class=""querytextright""><span class=""labelColumn_combo""><span class=""labelColumn_combo_brdr""> <select name=""TransactionHistoryFG.TXN_CATEGORY_ID"" class=""dropdownexpandalbe"" id=""TransactionHistoryFG.TXN_CATEGORY_ID"" title=""Kategori""> <option value="""">Pilih</option> <option selected="""" value=""-1"">Semua</option> <option value=""0"">Tanpa Kategori</option></select></span></span></span></p>

        </div>

      </div>
<!--end of subsection-->
    
  </div>

  <div class=""section"" id=""NavPanel2"">
    
      
        <div class=""right"" id=""NavPanel2.Rowset1"">
          
            
              
            
            
              
            
            
              
            
            
              
            
            
              
            
          <p id=""NavPanel2.Ra1"">
<span id=""NavPanel2.Ra1.C1""><span class=""simpletextright"" id=""Caption85468"">Atur Template:</span></span><span id=""NavPanel2.Ra1.C2""><span class=""labelColumn_combo_small""><span class=""labelColumn_combo_brdr_small""> <select name=""TransactionHistoryFG.TEMPLATE_ACTION_TYPE"" class=""labelcolumncombosmall"" id=""TransactionHistoryFG.TEMPLATE_ACTION_TYPE"" title=""Atur Template""> <option value="""">Pilih</option> <option value=""Save Template"">Simpan Template</option></select></span></span></span><span id=""NavPanel2.Ra1.C3""><span class=""HW_formbtn""><input type=""Submit"" name=""Action.TEMPLATE_ACTION"" class=""formbtn"" id=""TEMPLATE_ACTION"" value=""OK"" /></span></span><span id=""NavPanel2.Ra1.C4""><input type=""Submit"" name=""Action.SEARCH"" class=""formbtn4"" id=""SEARCH"" value=""Cari"" title=""Cari"" /></span></p>

        </div>

      
    
  </div>

  <div class=""section"" id=""ListTable"">
    
      
        
          
            
              
            
          
        
      
    
  </div>

  
  <div class=""section_fourlinbrd"" id=""ListTableWithCtrls"">
    <div id=""ListTableWithCtrls.SubSectionSet1"" class=""width100percent"">
      <!--start of subsection--><div id=""ListTableWithCtrls.SubSection1"" class=""width100percent"">
        <div class=""width100percent"" id=""ListTableWithCtrls.Rowset1"">
          
            
              
                
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                  
                  
                
                
                
                
                
              
            
          <div id=""ListTableWithCtrls.Ra1"" class=""listingrow"">
<div id=""ListTableWithCtrls.Ra1.C1""><div id=""repeatDiv"" class=""width100percent listingcol""><h3 class=""notopborder listingcol""><span class=""left gradientbgtwolinetxt"">Daftar Transaksi -  BNI TAPLUS-  (IDR) - 00000000346984092</span><span class=""right""><span class=""tablesimpletext"">Menampilkan 1 - 1 dari  1 data</span></span></h3><div class=""tableoverflowwrapper""><table width=""100%"" summary=""Daftar Transaksi"" id=""txnHistoryList"">
<tbody><tr class=""listtopbigbg"">
<th class=""listgreyrowtxtwithoutline""><span>Pilih</span></th><th class=""listboldtxtwithline""><span><a id=""HREF_txnHistoryList_Header2"" name=""HREF_txnHistoryList_Header2"" class=""blacklink"" title=""Klik untuk mengurutkan berdasarkan Tanggal Transaksi"" href=""Finacle;jsessionid=0000DXxMMiBuwvZm9ZZtH8Xtiry:19u1hofd2?bwayparam=IYO9ts52gEeBG%2B%2Fht%2BfmmzM2TG6RKGA5OmiGtVFb9hFDeCjbvbNMk1a4K24qT3gAbmai5rEOMCuz%0D%0AEI5uI%2BRldfgEzvgmECeqgB09TACLjGcheD8q0csoq9jPw%2BgOwkItR8Jmi2Hj7bQF73rvdiu3szlgIPWb%0D%0AWylxXxH9n7sgWaRnKp89q%2BTBaplDsTzKfF4UIgj0EmpXcqweq8%2BG6iBwF4nyaMD%2FqOmws9GVXoBnS5pv%0D%0Afo2uu4rgBVkznfkKqhYpdDFFcQT8EUe9XgnIL6GEfvziyOLh2hySXgRwJX37dNBxaiL0tb4MTXZ777Fg%0D%0AKqgO5qF9Vtw9oEDHz9iBE%2Fr1sw%3D%3D"">Tanggal Transaksi</a></span></th><th class=""listboldtxtwithline""><span><a id=""HREF_txnHistoryList_Header3"" name=""HREF_txnHistoryList_Header3"" class=""blacklink"" title=""Klik untuk mengurutkan berdasarkan Uraian Transaksi"" href=""Finacle;jsessionid=0000DXxMMiBuwvZm9ZZtH8Xtiry:19u1hofd2?bwayparam=IYO9ts52gEeBG%2B%2Fht%2BfmmzM2TG6RKGA5OmiGtVFb9hFDeCjbvbNMk1a4K24qT3gAbmai5rEOMCuz%0D%0AEI5uI%2BRldfgEzvgmECeqgB09TACLjGcheD8q0csoq9jPw%2BgOwkItR8Jmi2Hj7bQF73rvdiu3szlgIPWb%0D%0AWylxXxH9n7sgWaRnKp89q%2BTBaplDsTzKfF4UIgj0EmpXcqweq8%2BG6iBwF40Ay5atn05HpJ3vqI5VoCUP%0D%0AOrvgLVkDIgHFpGjCigzjP86WKjKDFbjXW6OoUqJCivgEzvgmECeqgB09TACLjGfacMenzXDBd1xUeI%2FA%0D%0ACdTCAl82etv4y1%2FIvX5U6XzWhs9bYiaHJzqJjXczZfp5E0Q%3D"">Uraian Transaksi</a></span></th><th class=""listboldtxtwithline""><span><a id=""HREF_txnHistoryList_Header4"" name=""HREF_txnHistoryList_Header4"" class=""blacklink"" title=""Klik untuk mengurutkan berdasarkan Kategori"" href=""Finacle;jsessionid=0000DXxMMiBuwvZm9ZZtH8Xtiry:19u1hofd2?bwayparam=IYO9ts52gEeBG%2B%2Fht%2BfmmzM2TG6RKGA5OmiGtVFb9hFDeCjbvbNMk1a4K24qT3gAbmai5rEOMCuz%0D%0AEI5uI%2BRldfgEzvgmECeqgB09TACLjGcheD8q0csoq9jPw%2BgOwkItR8Jmi2Hj7bQF73rvdiu3szlgIPWb%0D%0AWylxXxH9n7sgWaRnKp89q%2BTBaplDsTzKfF4UIgj0EmpXcqweq8%2BG6iBwF3%2FnQ%2FjxFqbW0xJB3F0NsfBL%0D%0Aq%2F0MUpmNj4DG3ndC35mdP86WKjKDFbjXW6OoUqJCivgEzvgmECeqgB09TACLjGfacMenzXDBd1xUeI%2FA%0D%0ACdTCAl82etv4y1%2FIvX5U6XzWhs9bYiaHJzqJjXczZfp5E0Q%3D"">Kategori</a></span></th><th class=""listboldtxtwithline""><span>Tipe</span></th><th class=""listboldtxtwithline""><span><a id=""HREF_txnHistoryList_Header6"" name=""HREF_txnHistoryList_Header6"" class=""blacklink"" title=""Klik untuk mengurutkan berdasarkan Jumlah Pembayaran"" href=""Finacle;jsessionid=0000DXxMMiBuwvZm9ZZtH8Xtiry:19u1hofd2?bwayparam=IYO9ts52gEeBG%2B%2Fht%2BfmmzM2TG6RKGA5OmiGtVFb9hFDeCjbvbNMk1a4K24qT3gAbmai5rEOMCuz%0D%0AEI5uI%2BRldfgEzvgmECeqgB09TACLjGcheD8q0csoq9jPw%2BgOwkItR8Jmi2Hj7bQF73rvdiu3szlgIPWb%0D%0AWylxXxH9n7sgWaRnKp89q%2BTBaplDsTzKfF4UIgj0EmpXcqweq8%2BG6iBwFz01oxOqUjFZmS2RL8KsLbzY%0D%0AiKo19E7WyDu3WDYLWtcw4CBHmR0dqsZugfJNN8wkh38rMjUNRty8jgXOJMeW4si4fZPzNencTu7OvPlQ%0D%0AIXtOPqW6kDSCpMZLaB3coZvUUQ%3D%3D"">Jumlah Pembayaran</a></span></th><th class=""listboldtxtwithline""><span><a id=""HREF_txnHistoryList_Header7"" name=""HREF_txnHistoryList_Header7"" class=""blacklink"" title=""Klik untuk mengurutkan berdasarkan Saldo"" href=""Finacle;jsessionid=0000DXxMMiBuwvZm9ZZtH8Xtiry:19u1hofd2?bwayparam=IYO9ts52gEeBG%2B%2Fht%2BfmmzM2TG6RKGA5OmiGtVFb9hFDeCjbvbNMk1a4K24qT3gAbmai5rEOMCuz%0D%0AEI5uI%2BRldfgEzvgmECeqgB09TACLjGcheD8q0csoq9jPw%2BgOwkItR8Jmi2Hj7bQF73rvdiu3szlgIPWb%0D%0AWylxXxH9n7sgWaRnKp89q%2BTBaplDsTzKfF4UIgj0EmpXcqweq8%2BG6iBwF%2FvU8ATIotMCGXSlTIRCcX86%0D%0AcyCOv%2BBUU8HF%2BMs5eEnoP86WKjKDFbjXW6OoUqJCivgEzvgmECeqgB09TACLjGfacMenzXDBd1xUeI%2FA%0D%0ACdTCAl82etv4y1%2FIvX5U6XzWhs9bYiaHJzqJjXczZfp5E0Q%3D"">Saldo</a></span></th><th class=""listboldtxtwithline""><span>Pecah Transaksi</span></th></tr>
<tr><td colspan=""8"" class=""linesbg""></td></tr><tr id=""0"" class=""listwhiterow"">
<td>
<input type=""checkbox"" name=""TransactionHistoryFG.SELECTED_INDEX_ARRAY[0]"" id=""TransactionHistoryFG.SELECTED_INDEX_ARRAY[0]"" onclick=""feba.js.common.checkSelectAll('TransactionHistoryFG.SELECTED_INDEX_ARRAY','1','10','1')"" ;="""" value=""0"" /></td><td class=""listgreyrowtxtleftline"">
<span class=""searchsimpletext"" id=""HREF_TransactionHistoryFG.TXN_DATE_ARRAY[0]"">07-Nov-2016</span></td><td class=""listgreyrowtxtleftline"">
<span id=""HREF_TransactionHistoryFG.TXN_REMARKS_ARRAY[0]"">TRANSFER DARI Sdri NIA  AGUSTINA   </span></td><td class=""listgreyrowtxtleftline"">
<span class=""labelColumn_combo""><span class=""labelColumn_combo_brdr""> <select name=""TransactionHistoryFG.CATEGORY_ID_ARRAY[0]"" class=""dropdownexpandalbe"" id=""TransactionHistoryFG.CATEGORY_ID_ARRAY[0]"" title=""Kategori""> <option selected="""" value=""0"">Tanpa Kategori</option></select></span></span></td><td class=""listgreyrowtxtleftline"">
<span class=""searchsimpletext"" id=""HREF_TransactionHistoryFG.AMOUNT_TYPE_ARRAY[0]"">Cr.</span></td><td class=""balanceamountrightalign"">
<span class=""simpletext"" id=""HREF_AmountDisplay24954438[0]"">100,000.00</span></td><td class=""balanceamountrightalign"">
<span class=""searchsimpletext"" id=""HREF_OutputTextbox30437500[0]"">36,660,964.00</span></td><td class=""listgreyrowtxtleftline"">
<span class=""searchsimpletext"" id=""TransactionHistoryFG.IS_MULTI_CATEGORY_ARRAY[0]"">No</span></td></tr>
<tr><td colspan=""8"" class=""linesbg""></td></tr></tbody></table></div></div></div></div> 
        </div>

        
          
            
              
            
            
              
            
          <p id=""ListTableWithCtrls.Rb1"" class=""button_withoutmargin"">
<span id=""ListTableWithCtrls.Rb1.C1""><span class=""HW_formbtn""><input type=""Submit"" name=""Action.OP_SPLIT_TRANSACTION"" class=""formbtn"" id=""SPLIT_TRANSACTION"" value=""Pecah Transaksi"" onclick=""goToLink('OFM/ProtoOpHistMultiCategoryListing.ppdl')"" /></span></span><span id=""ListTableWithCtrls.Rb1.C2""><span class=""HW_formbtn""><input type=""Submit"" name=""Action.OP_UPDATE_TXN_CTG"" class=""formbtn"" id=""UPDATE_TXN"" value=""Ubah"" onclick=""goToLink('Account/OperativeUpdateTxn.ppdl')"" /></span></span></p>

        
      </div>
<!--end of subsection-->
    </div>

  </div>

  <div class=""section"" id=""NavPanel1"">
    
      
        <div class=""right"" id=""NavPanel1.Rowset1"">
          
            
              
                
                
              
            
            
              
            
            
              
            
          <p id=""NavPanel1.Ra1"">
<span id=""NavPanel1.Ra1.C1""><label for=""TransactionHistoryFG.OUTFORMAT"" id=""dwnldDetailsCaption"" class=""greybgtxt"">Format File Unduhan</label><span class=""labelColumn_combo_download""><span class=""labelColumn_combo_brdr_download""> <select name=""TransactionHistoryFG.OUTFORMAT"" class=""dropdownexpandalbe_download"" id=""TransactionHistoryFG.OUTFORMAT"" title=""Format File Unduhan""> <option value="""">Pilih</option> <option selected="""" value=""5"">PDF file</option></select></span></span></span><span id=""NavPanel1.Ra1.C2""><span class=""HW_formbtn""><input type=""Submit"" name=""Action.GENERATE_REPORT"" class=""formbtn_drpdwn"" data-isdownloadbutton=""true"" id=""okButton"" value="" "" onclick=""sendAlert();formResourceAction();"" /></span></span><span id=""NavPanel1.Ra1.C3""><span class=""HW_formbtn""><input type=""Submit"" name=""Action.BACK"" class=""formbtn_last"" id=""BACK"" value=""Kembali"" /></span></span></p>

        </div>

      
    
  </div>

  <input type=""Hidden"" name=""TransactionHistoryFG.CONTROLIDLISTING"" value=""TransactionListing"" id=""TransactionHistoryFG.CONTROLIDLISTING"" />
  <input type=""Hidden"" name=""TransactionHistoryFG.MAPNAME"" value=""OpTransactionListingTpr"" id=""TransactionHistoryFG.MAPNAME"" />
 <input type=""Hidden"" name=""FORMSGROUP_ID__"" value=""TransactionHistoryFG"" id=""FORMSGROUP_ID__"" />
 <input type=""Hidden"" name=""TransactionHistoryFG.REPORTTITLE"" value=""OpTransactionHistoryTpr"" id=""TransactionHistoryFG.REPORTTITLE"" />

	<script src=""scripts/initiate.js"" type=""text/javascript""></script>
<script language=""javascript"">
var tranTitle= document.getElementById(""TranRequestManagerFG.REPORTTITLE"").value;
if(tranTitle ==""InitiatePayment"" || tranTitle ==""AddEntry"")
{
initiate();
 jQuery(""input[name=TranRequestManagerFG.DESTINATION_TYPE]:radio"").change(function()
{
 initiate();
});
}
</script>





	
	<input type=""Hidden"" name=""counterPartyNickName"" value="""" id=""counterPartyNickName"" />
	
    <input type=""Hidden"" name=""amountSendToCxps"" value="""" id=""amountSendToCxps"" />
    
    <input type=""Hidden"" name=""counterPartyTpe"" value="""" id=""counterPartyTpe"" />
    
    <input type=""Hidden"" name=""freqTyp"" value="""" id=""freqTyp"" />
    
    <input type=""Hidden"" name=""tranType"" value="""" id=""tranType"" />
	<input type=""Hidden"" name=""bankId"" value=""BNI01"" id=""bankId"" />
	<input type=""Hidden"" name=""cxpsUserId"" value=""FEBIANTO2785"" id=""cxpsUserId"" />
	<input type=""Hidden"" name=""corpId"" value=""FEBIANTO2785"" id=""corpId"" />
	<input type=""Hidden"" name=""usertype"" value=""1"" id=""usertype"" />
	<input type=""Hidden"" name=""RECEIVED_RESPONSE"" value="""" id=""RECEIVED_RESPONSE"" />







<div id=""CrossSellContainer""></div>
</div>




	
	<!-- Role is added for DDA to specify footer of the page -->
	<div>

	

		
	</div>
	
	</div>





</div>

<div id=""footer"" class=""footer_lg1"">
        <span>
            <br />Copyright ©2013 PT. Bank Negara Indonesia(Persero)Tbk<br />
            Best viewed in 1024 x 768 resolution
        </span>
</div>
<!-- Portal Changes end-->
</div>

<input type=""Hidden"" name=""JS_ENABLED_FLAG"" value=""Y"" id=""JS_ENABLED_FLAG"" /><input type=""Hidden"" name=""CHECKBOX_NAMES__"" value=""TransactionHistoryFG.SELECTED_INDEX_ARRAY[0]"" id=""CHECKBOX_NAMES__"" /><input type=""Hidden"" name=""Requestid"" value=""3"" id=""Requestid"" /><input type=""Hidden"" name=""__SIGNATURE__"" value="""" id=""__SIGNATURE__"" /><script type=""text/javascript"">feba.js.common.checkJS(""JS_ENABLED_FLAG"");</script><input type=""Hidden"" name=""TransactionHistoryFG.__COLLAPSIBLE_IDS__"" value=""SearchPanel.Header2,SearchPanel#SearchPanel.SubSection2,E|--:--undefined|"" id=""COLLAPSIBLE_IDS"" /><script type=""text/javascript"">var imageAltPlus = 'Plus';var imageAltMinus = 'Minus';var imageTitleExpand = 'Tampilkan';var imageTitleCollapse = 'Sembunyikan';var imagePath = 'L002/consumer/images';initHideSeek('null');</script><script type=""text/javascript"">jsVarForControlIds=""TransactionHistoryFG.TXN_CATEGORY_ID=Kategori:@@TransactionHistoryFG.TO_TXN_DATE=Tanggal Akhir:@@TransactionHistoryFG.FROM_TXN_DATE=Tanggal Awal:@@TransactionHistoryFG.INITIATOR_ACCOUNT=Rekening :@@TransactionHistoryFG.TranRequestManagerFG.TO_TXN_DATE=Maksimum rentang Tanggal Awal dan Akhir mutasi adalah 31 hari, dan harus masuk dalam periode 6 bulan transaksi terakhir.@@TransactionHistoryFG.TXN_PERIOD=Periode :@@TransactionHistoryFG.OUTFORMAT=Format File Unduhan@@""</script><script language=""javascript"" type=""text/javascript"">new calendar1('HREF_TransactionHistoryFG.FROM_TXN_DATE',document.getElementById('TransactionHistoryFG.FROM_TXN_DATE'),'dd-MMM-yyyy' ,'L002/consumer/Common/',true, false);</script><script language=""javascript"" type=""text/javascript"">new calendar1('HREF_TransactionHistoryFG.TO_TXN_DATE',document.getElementById('TransactionHistoryFG.TO_TXN_DATE'),'dd-MMM-yyyy' ,'L002/consumer/Common/',true, false);</script><script type=""text/javascript"">jQuery(function(){RedrawAllTrees();jsonObj={""TypesCatalogue"":{""FEBADate"": {""DFT"":""dd-MMM-yyyy"",
""PTY"":""DAT""
},""FEBADate"": {""DFT"":""dd-MMM-yyyy"",
""PTY"":""DAT""
}}};init(jsonObj,null,jsVarForControlIds);
feba.js.common.blockOnButtonClicks(""loadingImage"");
feba.js.common.blockOnHyperlinkClicks(""loadingImage"");
feba.js.common.runPageCustomFunction(""OpTransactionHistoryTpr_onload"");});</script><img src=""L002/consumer/images/widget-loading.gif"" id=""loadingImage"" style=""display:none;"" />

<script id=""f5_cspm"">(function(){var f5_cspm={f5_p:'AGDMMJKJMBGOANNHIJBINKOCMMPPNCKENCDHFGIJIGCBKLOKPKKEBLKIGBOAILDCEFJNCJICPNJHCDPGABLBHFFBHBGJCBNBJCNNNFGJMCHGOFOJLIFICABIBHBKCFBE',setCharAt:function(str,index,chr){if(index&gt;str.length-1)return str;return str.substr(0,index)+chr+str.substr(index+1);},get_byte:function(str,i){var s=(i/16)|0;i=(i&amp;15);s=s*32;return((str.charCodeAt(i+16+s)-65)&lt;&lt;4)|(str.charCodeAt(i+s)-65);},set_byte:function(str,i,b){var s=(i/16)|0;i=(i&amp;15);s=s*32;str=f5_cspm.setCharAt(str,(i+16+s),String.fromCharCode((b&gt;&gt;4)+65));str=f5_cspm.setCharAt(str,(i+s),String.fromCharCode((b&amp;15)+65));return str;},set_latency:function(str,latency){latency=latency&amp;0xffff;str=f5_cspm.set_byte(str,32,(latency&gt;&gt;8));str=f5_cspm.set_byte(str,33,(latency&amp;0xff));str=f5_cspm.set_byte(str,27,2);return str;},wait_perf_data:function(){try{var wp=window.performance.timing;if(wp.loadEventEnd&gt;0){var res=wp.loadEventEnd-wp.navigationStart;if(res&lt;60001){var cookie_val=f5_cspm.set_latency(f5_cspm.f5_p,res);window.document.cookie='f5avraaaaaaaaaaaaaaaa='+encodeURIComponent(cookie_val)+';path=/';}
return;}}
catch(err){return;}
setTimeout(f5_cspm.wait_perf_data,100);return;},go:function(){var chunk=window.document.cookie.split(/\s*;\s*/);for(var i=0;i&lt;chunk.length;++i){var pair=chunk[i].split(/\s*=\s*/);if(pair[0]=='f5_cspm'&amp;&amp;pair[1]=='1234')
{var d=new Date();d.setTime(d.getTime()-1000);window.document.cookie='f5_cspm=;expires='+d.toUTCString()+';path=/;';setTimeout(f5_cspm.wait_perf_data,100);}}}}
f5_cspm.go();}());</script></div></form></body></html>";

    class Program
    {
        public static unsafe void Main()
        {
            var statements = new StatementCollection();

            var doc = new HtmlDocument();
            doc.LoadHtml(content);

            var rows = doc.DocumentNode.SelectNodes("//table[@id=\"txnHistoryList\"]/tbody/tr[position()>2]");
            foreach (var row in rows)
            {
                var fields = row.SelectNodes("./td");
                if (fields != null && fields.Count > 7)
                {

                    var statement = new Statement
                    {
                        Date = MidasUtils.RemoveComma(ContentHelper.Clear(fields[1].InnerText)),
                        Description = MidasUtils.RemoveComma(fields[2].InnerText),
                        Balance = MidasUtils.RemoveComma(ContentHelper.Clear(fields[6].InnerText))
                    };
                    var type = fields[4].InnerText;
                    var amount = fields[5].InnerText;
                    if (type == "\r\nCr.")
                    {
                        statement.Credit = MidasUtils.RemoveComma(ContentHelper.Clear(amount));
                    }
                    else if (type == "\r\nDb.")
                    {
                        statement.Debit = MidasUtils.RemoveComma(ContentHelper.Clear(amount));
                    }
                    statements.Add(statement);
                }
            }

        }
    }
    public class StatementCollection : List<IStatement>
    {

        private static readonly JavaScriptSerializer _serializer = new JavaScriptSerializer();

        public string Balance { get; set; }

        public byte[] ToPostData(string bank, string userName, string accountNumber, DateTime date)
        {
            var postData = new StatementsSerialization()
            {
                bank = bank,
                account = userName,
                number = accountNumber,
                date = date.ToString("yyyy-MM-dd"),
                balance = Balance,
                stmts = new List<string>(Count)
            };
            foreach (var record in this)
            {
                postData.stmts.Add(record.ToString());
            }
            return Encoding.UTF8.GetBytes(_serializer.Serialize(postData));
        }

        public string ToDetails(string bank, string userName, string accountNumber, DateTime date)
        {
            var postData = new StatementsSerialization()
            {
                bank = bank,
                account = userName,
                number = accountNumber,
                date = date.ToString("yyyy-MM-dd"),
                balance = Balance,
                stmts = new List<string>(Count)
            };
            foreach (var record in this)
            {
                postData.stmts.Add(record.ToString());
            }
            return _serializer.Serialize(postData);
            //return MidasUtils.Serialize(postData);
        }
    }

    public interface IStatement
    {
        //string Title { get; }
        IStatement Deserialize(string str);
        string SerializeToCsv(string str);
        decimal GetIncomingFund(string str, DateTime date);
        decimal GetPayOut(string str, DateTime date);
    }

    public class StatementsSerialization
    {
        public string bank { get; set; }
        public string account { get; set; }
        public string number { get; set; }
        public string date { get; set; }
        public string balance { get; set; }
        public List<string> stmts { get; set; }
    }

    [DataContract]
    public class Statement : IStatement
    {
        private const char Quote = '"';
        private static readonly DataContractJsonSerializer Serializer = new DataContractJsonSerializer(typeof(Statement));
        private static readonly char[] SpecialChars = { ',', '"', '\r', '\n', '\u000d', '\u000a' };
        private static readonly string OneQuote = string.Format("{0}", Quote);
        private static readonly string QuotedFormat = string.Format("{0}{{0}}{0}", Quote);
        private static readonly string TwoQuotes = string.Format("{0}{0}", Quote);

        [DataMember(Name = "id", EmitDefaultValue = false)]
        public string ID { get; set; }

        [DataMember(Name = "date", EmitDefaultValue = false)]
        public string Date { get; set; }

        [DataMember(Name = "description", EmitDefaultValue = false)]
        public string Description { get; set; }

        [DataMember(Name = "branch", EmitDefaultValue = false)]
        public string Branch { get; set; }

        /// <summary>
        ///     减钱
        /// </summary>
        [DataMember(Name = "debit", EmitDefaultValue = false)]
        public string Debit { get; set; }

        /// <summary>
        ///     加钱
        /// </summary>
        [DataMember(Name = "credit", EmitDefaultValue = false)]
        public string Credit { get; set; }

        [DataMember(Name = "balance", EmitDefaultValue = false)]
        public string Balance { get; set; }

        public virtual IStatement Deserialize(string str)
        {
            var byteArray = Encoding.UTF8.GetBytes(str);
            using (var ms = new MemoryStream(byteArray))
            {
                var obj = Serializer.ReadObject(ms);
                return obj as Statement;
            }
        }

        public virtual string SerializeToCsv(string str)
        {
            var sb = new StringBuilder();
            var st = Deserialize(str) as Statement;
            sb.Append(st.Date + ",");
            sb.Append(st.ID + ",");
            sb.Append(QuoteStringContainsSpecialCharacters(st.Description));
            sb.Append(st.Debit + ",");
            sb.Append(st.Credit + ",");
            sb.Append(st.Balance);
            return sb.ToString();
        }

        public virtual decimal GetIncomingFund(string str, DateTime date)
        {
            try
            {
                var st = Deserialize(str) as Statement;
                if (DateTime.Parse(st.Date).Date == date.Date)
                {
                    return Convert.ToDecimal(st.Debit);
                }
                return 0;
            }
            catch (Exception)
            {
                return 0;
            }
        }

        public virtual decimal GetPayOut(string str, DateTime date)
        {
            try
            {
                var st = Deserialize(str) as Statement;
                if (DateTime.Parse(st.Date).Date == date.Date)
                {
                    return Convert.ToDecimal(st.Credit);
                }
                return 0;
            }
            catch (Exception)
            {
                return 0;
            }
        }

        public override string ToString()
        {
            using (var ms = new MemoryStream())
            {
                Serializer.WriteObject(ms, this);
                return Encoding.UTF8.GetString(ms.ToArray());
            }
        }

        protected string QuoteStringContainsSpecialCharacters(string value)
        {
            if (string.IsNullOrWhiteSpace(value) || value.IndexOfAny(SpecialChars) == -1)
            {
                return value;
            }
            var formattedDescription = string.Format(QuotedFormat, value.Replace(OneQuote, TwoQuotes));
            formattedDescription = formattedDescription.Replace("\r", "");
            formattedDescription = formattedDescription.Replace("\n", "");
            return formattedDescription;
        }
    }

    public class MidasUtils
    {
        private static char[] DIGITS_LOWER = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f' };
        public static string Serialize(object obj)
        {
            return JsonConvert.SerializeObject(obj);
        }

        public static T Deserialize<T>(string input)
        {
            try
            {
                return JsonConvert.DeserializeObject<T>(input);
            }
            catch (Exception)
            {
                throw;
            }
        }



        public static string GetMd5Hash(string input, bool isEncodeHex = false)
        {
            using (var md5Hash = MD5.Create())
            {
                return GetMd5Hash(md5Hash, input, isEncodeHex);
            }
        }

        public static string GetMd5Hash(MD5 md5Hash, string input, bool isEncodeHex = false)
        {

            // Convert the input string to a byte array and compute the hash.
            byte[] data = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(input));
            StringBuilder sBuilder = new StringBuilder();
            if (!isEncodeHex)
            {
                // Create a new Stringbuilder to collect the bytes
                // and create a string.

                // Loop through each byte of the hashed data 
                // and format each one as a hexadecimal string.
                for (int i = 0; i < data.Length; i++)
                {
                    sBuilder.Append(data[i].ToString("x2"));
                }

                // Return the hexadecimal string.
                return sBuilder.ToString();
            }
            else
            {
                var ar = encodeHex(data, DIGITS_LOWER);
                return new string(ar);
            }
        }

        // Verify a hash against a string.
        public static bool VerifyMd5Hash(string input, string hash)
        {
            using (var md5Hash = MD5.Create())
            {
                // Hash the input.
                string hashOfInput = GetMd5Hash(md5Hash, input);

                // Create a StringComparer an compare the hashes.
                StringComparer comparer = StringComparer.OrdinalIgnoreCase;

                if (0 == comparer.Compare(hashOfInput, hash))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }

        protected static char[] encodeHex(byte[] data, char[] toDigits)
        {
            int l = data.Length;
            char[] ar = new char[l << 1];
            int i = 0;

            for (int j = 0; i < l; ++i)
            {
                ar[j++] = toDigits[(240 & data[i]) >> 4];
                ar[j++] = toDigits[15 & data[i]];
            }

            return ar;
        }

        public static string RemoveComma(string org)
        {
            if (string.IsNullOrWhiteSpace(org))
            {
                return string.Empty;
            }
            return org.Replace(",", "").Trim();
        }

        public static string RemoveDot(string org)
        {
            if (string.IsNullOrWhiteSpace(org))
            {
                return string.Empty;
            }
            return org.Replace(".", "").Trim();
        }

        public static string RemoveCommaAndDot(string org)
        {
            if (string.IsNullOrWhiteSpace(org))
            {
                return string.Empty;
            }
            return org.Replace(",", "").Replace(".", "").Trim();
        }

        public static string RemoveNumberSign(string org)
        {
            if (string.IsNullOrWhiteSpace(org))
            {
                return string.Empty;
            }
            return org.Replace("+", "").Replace("-", "").Trim();
        }

        public static string DecimalToCurrency(decimal? dec, string format = "C2")
        {
            return dec == null ? "" : dec.Value.ToString(format).Remove(0, 1);
        }
    }

    public static class ContentHelper
    {

        private static Regex _replaceNewlinesRegex = new Regex("<br.*?>", RegexOptions.Compiled);
        private static Regex _removeAllTagsRegex = new Regex("<[^>]*>", RegexOptions.Compiled);
        private static Regex _removeWhitespacesRegex = new Regex(@"\s+", RegexOptions.Compiled);

        public static string ReplaceNewlines(string src)
        {
            return _replaceNewlinesRegex.Replace(src, " ");
        }

        public static string Clear(string src, string spaceReplacement = "")
        {
            var tmp = _removeAllTagsRegex.Replace(src, string.Empty);
            tmp = HttpUtility.HtmlDecode(tmp);
            return tmp.Trim();
            //return removeWhitespacesRegex.Replace(tmp, spaceReplacement);
        }

        public static NameValueCollection FindCollections(string source, Regex regex)
        {
            var matchers = regex.Matches(source);
            if (matchers.Count == 0)
            {
                return null;
            }
            var result = new NameValueCollection();
            foreach (Match matcher in matchers)
            {
                if (matcher.Success)
                {
                    result[matcher.Groups[1].Value] = matcher.Groups[2].Value;
                }
            }
            return result;
        }

        //public static Parameters FindCollections2(string source, Regex regex) {
        //    var matchers = regex.Matches(source);
        //    if (matchers.Count == 0) {
        //        return null;
        //    }
        //    var result = new Parameters();
        //    foreach (Match matcher in matchers) {
        //        if (matcher.Success) {
        //            result[matcher.Groups[1].Value] = matcher.Groups[2].Value;
        //        }
        //    }
        //    return result;
        //}

        public static string DefaultMerge(params string[] fields)
        {
            return Merge("@#$", "null", fields);
        }

        public static string DefaultMergeList(List<string> fields)
        {
            return Merge("@#$", "null", fields.ToArray());
        }

        public static string Merge(string sperator, string nil, string[] fields)
        {
            var result = new StringBuilder();
            for (var i = 0; i < fields.Length; i++)
            {
                var field = fields[i];
                if (string.IsNullOrWhiteSpace(field))
                {
                    result.Append(nil);
                }
                else
                {
                    result.Append(EnsureNil(Clear(field), nil));
                }
                if (i < fields.Length - 1)
                    result.Append(sperator);
            }
            return result.ToString();
        }

        public static string EnsureNil(string source, string nil)
        {
            if (string.IsNullOrWhiteSpace(source))
            {
                return nil;
            }
            return source;
        }

        public static string EncodeNonAsciiCharacters(string value)
        {
            StringBuilder sb = new StringBuilder();
            foreach (char c in value)
            {
                if (c > 127)
                {
                    // This character is too big for ASCII
                    string encodedValue = "\\u" + ((int)c).ToString("x4");
                    sb.Append(encodedValue);
                }
                else
                {
                    sb.Append(c);
                }
            }
            return sb.ToString();
        }

        public static string DecodeEncodedNonAsciiCharacters(string value)
        {
            StringBuilder sb = new StringBuilder();
            var arr = value.Split(new string[] { @"\u" }, StringSplitOptions.RemoveEmptyEntries);
            foreach (var item in arr)
            {
                sb.Append(string.Format("&#x{0};", item));
            }

            return WebUtility.HtmlDecode(sb.ToString());
        }
    }
}