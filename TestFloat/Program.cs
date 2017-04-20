////using HtmlAgilityPack;
////using System;
////using System.Collections;
////using System.Collections.Generic;
////using System.Collections.Specialized;
////using System.IO;
////using System.Linq;
////using System.Net;
////using System.Net.Http;
////using System.Net.Http.Headers;
////using System.Runtime.Serialization;
////using System.Runtime.Serialization.Json;
////using System.Text;
////using System.Text.RegularExpressions;
////using System.Threading.Tasks;
////using System.Web;
////using System.Web.Script.Serialization;
////using KPV = System.Collections.Generic.KeyValuePair<string, string>;

////namespace TestFloat
////{
////    class Program
////    {

////        private static readonly string URL_HOST = "https://www.isacombank.com.vn";
////        private static readonly string URL_VISIT_LOGIN = string.Format("{0}/corp/AuthenticationController?FORMSGROUP_ID__=AuthenticationFG&__START_TRAN_FLAG__=Y&__FG_BUTTONS__=LOAD&ACTION.LOAD=Y&AuthenticationFG.LOGIN_FLAG=1&BANK_ID=303&AuthenticationFG.PREFERRED_LANGUAGE=003&LANGUAGE_ID=003", URL_HOST);

////        private static Regex REGEX_LOGIN_POST = new Regex(@"form  name=""AuthenticationFG"" action =""(AuthenticationController.+?)""", RegexOptions.Compiled);
////        private static Regex REGEX_CAPTCHA_URL = new Regex(@"id=""LoginBanner.Rb9.C1"" ><img src=""(AuthenticationController.+?)""", RegexOptions.Compiled);
////        private static Regex REGEX_JS_ENCRYPT_KEY = new Regex(@"<INPUT TYPE='HIDDEN' id='__JS_ENCRYPT_KEY__' name='__JS_ENCRYPT_KEY__' value='(.+?)'");
////        private static Regex REGEX_ACCOUNT_URL = new Regex(@"""(.+?)""id=""Ti_khon""", RegexOptions.Compiled);
////        private static Regex REGEX_ACC_DETAILS_URL = new Regex(@"""(.+?)"" id=""Thng-tin-s-d-v-giao-dch_Ti-khon-tin-gi-khng-k-hn""", RegexOptions.Compiled);
////        private static Regex REGEX_SPECIFIC_ACC_MAIN = new Regex(@"id=""CUSTOM_VIEW_STATEMENT\[0\]4"" href=""(.+?)""", RegexOptions.Compiled);
////        private static Regex REGEX_SPECIFIC_STATEMENT_URL = new Regex(@"name=""CustomViewStatementFG"" action =""(.+?)""", RegexOptions.Compiled);
////        private static Regex REGEX_CLOSING_BALANCE = new Regex(@"id=""HREF_CustomViewStatementFG.CLOSING_BALANCE"">(.+?)</span>", RegexOptions.Compiled);

////        private static Regex REGEX_TEST = new Regex(@"baseUrl: ""(.+?)""", RegexOptions.Compiled);

////        private static string urlLoginPost = "";
////        private static string urlCaptcha = "";
////        private static string urlAccount = "";
////        private static string urlAccountDetails = "";
////        private static string urlSpecificAccMain = "";
////        private static string urlStatements = "";
////        private static string jsEncryptKey = "";
////        private static string accountId = "";
////        private static string lastUrl = "";
////        private static string currentUrl = "";
////        public static CookieContainer Cookies;
////        private static string lastPage = "";
////        private static Random _rnd = new Random();

////        static void Main(string[] args)
////        {
////            Cookies = new CookieContainer();
////            Cookies.Add(new Uri(URL_HOST), new Cookie("txtReSzType", "normal"));
////            Cookies.Add(new Uri(URL_HOST), new Cookie("tree1Selected", ""));
////            Cookies.Add(new Uri(URL_HOST), new Cookie("tree1State", ""));

////            var Client = new HttpClient(new HttpClientHandler { CookieContainer = Cookies, AllowAutoRedirect = true })
////            {
////                Timeout = new TimeSpan(0, 3, 0)
////            };
////            Client.DefaultRequestHeaders.Add("Upgrade-Insecure-Requests", "1");
////            Client.DefaultRequestHeaders.UserAgent.TryParseAdd(Request.UserAgents.Chrome);


////            using (var rsp = Client.GetAsync(URL_VISIT_LOGIN).Result)
////            {
////                var page = lastPage = rsp.Content.ReadAsStringAsync().Result;

////                urlLoginPost = REGEX_LOGIN_POST.Match(page).Groups[1].Value;
////                Console.WriteLine("Login Post 1 : " + urlLoginPost);
////                urlCaptcha = REGEX_CAPTCHA_URL.Match(page).Groups[1].Value;
////                //jsEncryptKey = REGEX_JS_ENCRYPT_KEY.Match(page).Groups[1].Value;

////                if (string.IsNullOrWhiteSpace(urlLoginPost) || string.IsNullOrWhiteSpace(urlCaptcha))
////                {
////                    Console.WriteLine("Parsed failed");
////                }
////            }

////            string CaptchaMidasService = string.Format("{0}/Captcha/GetCaptchaResult", "http://192.168.102.247:8001");
////            //var deviceDNA = @"{""VERSION"":""1.0"",""MFP"":{""System"":{""Platform"":""Win32"",""Language"":""en-US"",""Timezone"":-480,""Fonts"":""},""Screen"":{""FullHeight"":1080,""AvlHeight"":1040,""FullWidth"":1920,""AvlWidth"":1920,""BufferDepth"":"",""ColorDepth"":24,""PixelDepth"":24,""DeviceXDPI"":"",""DeviceYDPI"":"",""FontSmoothing"":"",""UpdateInterval"":""},""Browser"":{""UserAgent"":""Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36"",""Vendor"":""Google Inc."",""VendorSubID"":"",""BuildID"":"",""CookieEnabled"":true},""Camera"":"",""Microphone"":""},""MAC"":"",""ExternalIP"":""116.50.224.90"",""InternalIP"":"",""MESC"":""mi=2;cd=200;id=50;mesc=1089693;ldi=200;mesc=978102;ldi=200"",""DESC"":""}";
////            //var fingerPrint = @"{""VERSION"":""1.0"",""MFP"":{""System"":{""Platform"":""Win32"",""Language"":""en-US"",""Timezone"":-480,""Fonts"":""},""Screen"":{""FullHeight"":1080,""AvlHeight"":1040,""FullWidth"":1920,""AvlWidth"":1920,""BufferDepth"":"",""ColorDepth"":24,""PixelDepth"":24,""DeviceXDPI"":"",""DeviceYDPI"":"",""FontSmoothing"":"",""UpdateInterval"":""},""Browser"":{""UserAgent"":""Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36"",""Vendor"":""Google Inc."",""VendorSubID"":"",""BuildID"":"",""CookieEnabled"":true},""Camera"":"",""Microphone"":""},""MAC"":"",""ExternalIP"":""116.50.224.90"",""InternalIP"":"",""MESC"":""mi=2;cd=200;id=50;mesc=1089693;ldi=200;mesc=978102;ldi=200"",""DESC"":""}";
////            var fingerPrint = @"{""VERSION"":""1.0"",""MFP"":{""System"":{""Platform"":""Win32"",""Language"":""en-US"",""Timezone"":-480,""Fonts"":""""},""Screen"":{""FullHeight"":1080,""AvlHeight"":1040,""FullWidth"":1920,""AvlWidth"":1920,""BufferDepth"":"""",""ColorDepth"":24,""PixelDepth"":24,""DeviceXDPI"":"""",""DeviceYDPI"":"""",""FontSmoothing"":"""",""UpdateInterval"":""""},""Browser"":{""UserAgent"":""Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36"",""Vendor"":""Google Inc."",""VendorSubID"":"""",""BuildID"":"""",""CookieEnabled"":true},""Camera"":"""",""Microphone"":""""},""MAC"":"""",""ExternalIP"":""116.50.224.90"",""InternalIP"":"""",""MESC"":""mi=2;cd=200;id=50;mesc=957159;ldi=203;mesc=970879;ldi=200"",""DESC"":""""}";
////            var captcha = RecognizeCaptchaAsync(Client, string.Format("{0}/corp/{1}", URL_HOST, urlCaptcha), CaptchaMidasService);
////            if (captcha.Error)
////            {
////                Console.WriteLine("Captcha Failed");
////            }

////            //Referer: 
////            Client.DefaultRequestHeaders.Referrer = new Uri(@"https://www.isacombank.com.vn/corp/AuthenticationController?FORMSGROUP_ID__=AuthenticationFG&__START_TRAN_FLAG__=Y&__FG_BUTTONS__=LOAD&ACTION.LOAD=Y&AuthenticationFG.LOGIN_FLAG=1&BANK_ID=303&AuthenticationFG.PREFERRED_LANGUAGE=003&LANGUAGE_ID=003");

////            var deviceDNA1 = @"{""VERSION"":""1.0"",""MFP"":{""System"":{""Platform"":""Win32"",""Language"":""en-US"",""Timezone"":-480,""Fonts"":""""},""Screen"":{""FullHeight"":1080,""AvlHeight"":1040,""FullWidth"":1920,""AvlWidth"":1920,""BufferDepth"":"""",""ColorDepth"":24,""PixelDepth"":24,""DeviceXDPI"":"""",""DeviceYDPI"":"""",""FontSmoothing"":"""",""UpdateInterval"":""""},""Browser"":{""UserAgent"":""Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36"",""Vendor"":""Google Inc."",""VendorSubID"":"""",""BuildID"":"""",""CookieEnabled"":true},""Camera"":"""",""Microphone"":""""},""MAC"":"""",""ExternalIP"":""116.50.224.90"",""InternalIP"":"""",""MESC"":""mi=2;cd=200;id=50;mesc=1421221;ldi=201;mesc=1497061;ldi=201"",""DESC"":""""}";
////            var loginForm1 = Substring(lastPage ,@"<form  name=""AuthenticationFG""", "</form>");
////            loginForm1 = loginForm1.Replace("Hidden", "hidden");
////            var loginForm1Collection = GetHiddenFormCollection(loginForm1);
////            loginForm1Collection["AuthenticationFG.USER_PRINCIPAL"] = "trinhthi71";
////            loginForm1Collection["AuthenticationFG.VERIFICATION_CODE"] = captcha.Data;
////            loginForm1Collection["Action.STU_VALIDATE_CREDENTIALS"] = "Tiếp tục";
////            loginForm1Collection["JS_ENABLED_FLAG"] = "Y";
////            loginForm1Collection["deviceDNA"] = deviceDNA1;
////            loginForm1Collection["executionTime"] = "1143";
////            loginForm1Collection["desc"] = "";
////            loginForm1Collection["mesc"] = "mi=2;cd=200;id=50;mesc=1421221;ldi=201;mesc=1497061;ldi=201";
////            loginForm1Collection["dnaError"] = "";
////            loginForm1Collection["mescIterationCount"] = "2";
////            loginForm1Collection["isDNADone"] = "true";
////            loginForm1Collection["arcotFlashCookie"] = "";
////            loginForm1Collection["DEVICE_ID"] = "";
////            loginForm1Collection["DEVICE_TYPE"] = "DEVICEID.FLASH";
////            loginForm1Collection["MACHINE_FINGER_PRINT"] = deviceDNA1;

////            var url1 = string.Format("{0}/corp/{1}", URL_HOST, urlLoginPost);
////            string urlLoginPost2 = "";
////            using (var rsp = Client.PostAsync(url1, CreateFormEncodedData(loginForm1Collection)).Result)
////            {
////                var page = lastPage = rsp.Content.ReadAsStringAsync().Result;

////                File.WriteAllText("page1.html", page);

////                var test = REGEX_LOGIN_POST.Matches(page);
////                for (int i = 0; i < test.Count; i++)
////                {
////                    urlLoginPost2 = test[i].Groups[1].Value;
////                }
////                Console.WriteLine("Login Post 2 : " + urlLoginPost2);
////                jsEncryptKey = REGEX_JS_ENCRYPT_KEY.Match(page).Groups[1].Value;
////            }

////            // Login second time
////            var urlAction2 = REGEX_LOGIN_POST.Match(lastPage).Groups[1].Value;
////            jsEncryptKey = REGEX_JS_ENCRYPT_KEY.Match(lastPage).Groups[1].Value;
////            var authenticationCode = Encrypt(jsEncryptKey, string.Format("password={0}_SALT_COMPONENT_={1}", "batm3485", _rnd.NextDouble()));
////            var urlLogin2 = string.Format("{0}/corp/{1}", URL_HOST, urlAction2);
////            Client.DefaultRequestHeaders.Referrer = new Uri(url1);
////            Cookies.Add(new Uri(URL_HOST), new Cookie("tree1Selected", ""));
////            Cookies.Add(new Uri(URL_HOST), new Cookie("tree1State", ""));

////            var deviceDNA2 =
////                @"{""VERSION"":""1.0"",""MFP"":{""System"":{""Platform"":""Win32"",""Language"":""en-US"",""Timezone"":-480,""Fonts"":""""},""Screen"":{""FullHeight"":1080,""AvlHeight"":1040,""FullWidth"":1920,""AvlWidth"":1920,""BufferDepth"":"""",""ColorDepth"":24,""PixelDepth"":24,""DeviceXDPI"":"""",""DeviceYDPI"":"""",""FontSmoothing"":"""",""UpdateInterval"":""""},""Browser"":{""UserAgent"":""Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36"",""Vendor"":""Google Inc."",""VendorSubID"":"""",""BuildID"":"""",""CookieEnabled"":true},""Camera"":"""",""Microphone"":""""},""MAC"":"""",""ExternalIP"":""116.50.224.90"",""InternalIP"":"""",""MESC"":""mi=2;cd=200;id=50;mesc=1509419;ldi=203;mesc=1481036;ldi=200"",""DESC"":""""}";
////            var loginForm2 = Substring(lastPage,@"<form  name=""AuthenticationFG""", "</form>");
////            loginForm2 =
////                loginForm2.Replace("Hidden", "hidden")
////                    .Replace("HIDDEN", "hidden")
////                    .Replace("INPUT", "input")
////                    .Replace("TYPE", "type");
////            var loginForm2Collection = GetHiddenFormCollection(loginForm2);
////            loginForm2Collection["AuthenticationFG.TARGET_CHECKBOX"] = "Y";
////            loginForm2Collection["AuthenticationFG.ACCESS_CODE"] = authenticationCode;
////            loginForm2Collection["Action.VALIDATE_STU_CREDENTIALS"] = "Đăng nhập";
////            loginForm2Collection["AuthenticationFG.MENU_ID"] = "0";
////            loginForm2Collection["JS_ENABLED_FLAG"] = "Y";
////            loginForm2Collection["deviceDNA"] = deviceDNA2;
////            loginForm2Collection["executionTime"] = "1115";
////            loginForm2Collection["desc"] = "";
////            loginForm2Collection["mesc"] = "mi=2;cd=200;id=50;mesc=1509419;ldi=203;mesc=1481036;ldi=200";
////            loginForm2Collection["dnaError"] = "";
////            loginForm2Collection["mescIterationCount"] = "2";
////            loginForm2Collection["isDNADone"] = "true";
////            loginForm2Collection["arcotFlashCookie"] = "";
////            loginForm2Collection["DEVICE_ID"] = "";
////            loginForm2Collection["DEVICE_TYPE"] = "DEVICEID.FLASH";
////            loginForm2Collection["MACHINE_FINGER_PRINT"] = deviceDNA2;

////            using (var rsp = Client.PostAsync(urlLogin2, CreateFormEncodedData(loginForm2Collection)).Result)
////            {
////                lastPage = rsp.Content.ReadAsStringAsync().Result;
////                if (lastPage.Contains("Mật khẩu đăng nhập"))
////                {
////                    Console.WriteLine("Login failed, can't access to details page");
////                }
////            }


////            urlAccount = NormalizeUrl(REGEX_ACCOUNT_URL.Match(lastPage).Groups[1].Value);

////            if (string.IsNullOrWhiteSpace(urlAccount))
////            {
////                Console.WriteLine("Parsed Failed");
////            }


////            if (!Client.DefaultRequestHeaders.Contains("Referer"))
////                Client.DefaultRequestHeaders.Add("Referer", url1);

////            var url2 = string.Format("{0}/corp/{1}", URL_HOST, urlAccount);
////            using (var rsp = Client.GetAsync(url2).Result)
////            {
////                var page = rsp.Content.ReadAsStringAsync().Result;

////                urlAccountDetails = NormalizeUrl(REGEX_ACC_DETAILS_URL.Match(page).Groups[1].Value);

////                if (string.IsNullOrWhiteSpace(urlAccountDetails))
////                {
////                    Console.WriteLine("Parsed Failed, Can't find login url");
////                }
////            }

////            Client.DefaultRequestHeaders.Remove("Referer");
////            Client.DefaultRequestHeaders.Add("Referer", url2);
////            var url3 = string.Format("{0}/corp/{1}", URL_HOST, urlAccountDetails);
////            using (var rsp = Client.GetAsync(url3).Result)
////            {
////                var page = rsp.Content.ReadAsStringAsync().Result;

////                urlSpecificAccMain = REGEX_SPECIFIC_ACC_MAIN.Match(page).Groups[1].Value;

////                if (string.IsNullOrWhiteSpace(urlSpecificAccMain))
////                {
////                    Console.WriteLine("Parsed Failed");
////                }
////            }

////            Client.DefaultRequestHeaders.Remove("Referer");
////            Client.DefaultRequestHeaders.Add("Referer", url3);
////            var url4 = string.Format("{0}/corp/{1}", URL_HOST, urlSpecificAccMain);
////            using (var rsp = Client.GetAsync(url4).Result)
////            {
////                var page = rsp.Content.ReadAsStringAsync().Result;

////                urlStatements = NormalizeUrl(REGEX_SPECIFIC_STATEMENT_URL.Match(page).Groups[1].Value);

////                Regex REGEX_ACCOUNT_ID = new Regex(string.Format(@"<option selected value=""(.+?)"">.+?{0}</option>", "060113412898"), RegexOptions.Compiled);
////                accountId = REGEX_ACCOUNT_ID.Match(page).Groups[1].Value;

////                if (string.IsNullOrWhiteSpace(accountId) || string.IsNullOrWhiteSpace(urlStatements))
////                {
////                    Console.WriteLine("Parsed Failed");
////                }
////            }

////            lastUrl = url4;
////            currentUrl = string.Format("{0}/corp/{1}", URL_HOST, urlStatements);

////                 var deviceDNA = @"{""VERSION"":""1.0"",""MFP"":{""System"":{""Platform"":""Win32"",""Language"":""en-US"",""Timezone"":-480,""Fonts"":""},""Screen"":{""FullHeight"":1080,""AvlHeight"":1040,""FullWidth"":1920,""AvlWidth"":1920,""BufferDepth"":"",""ColorDepth"":24,""PixelDepth"":24,""DeviceXDPI"":"",""DeviceYDPI"":"",""FontSmoothing"":"",""UpdateInterval"":""},""Browser"":{""UserAgent"":""Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36"",""Vendor"":""Google Inc."",""VendorSubID"":"",""BuildID"":"",""CookieEnabled"":true},""Camera"":"",""Microphone"":""},""MAC"":"",""ExternalIP"":""122.53.126.226"",""InternalIP"":"",""MESC"":""mi=2;cd=200;id=50;mesc=1089693;ldi=200;mesc=978102;ldi=200"",""DESC"":""}";
////            var fingerPrint2 = @"{""VERSION"":""1.0"",""MFP"":{""System"":{""Platform"":""Win32"",""Language"":""en-US"",""Timezone"":-480,""Fonts"":""},""Screen"":{""FullHeight"":1080,""AvlHeight"":1040,""FullWidth"":1920,""AvlWidth"":1920,""BufferDepth"":"",""ColorDepth"":24,""PixelDepth"":24,""DeviceXDPI"":"",""DeviceYDPI"":"",""FontSmoothing"":"",""UpdateInterval"":""},""Browser"":{""UserAgent"":""Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36"",""Vendor"":""Google Inc."",""VendorSubID"":"",""BuildID"":"",""CookieEnabled"":true},""Camera"":"",""Microphone"":""},""MAC"":"",""ExternalIP"":""122.53.126.226"",""InternalIP"":"",""MESC"":""mi=2;cd=200;id=50;mesc=1089693;ldi=200;mesc=978102;ldi=200"",""DESC"":""}";

////                Client.DefaultRequestHeaders.Remove("Referer");
////                Client.DefaultRequestHeaders.Add("Referer", lastUrl);

////                var pp = new KPV[]
////                {
////                    new KPV("CustomViewStatementFG.SELECTED_CUST_ID__", ""),
////                    new KPV("CustomViewStatementFG.TIME_ZONE__", "GMT_PLUS_9:30"),
////                    new KPV("CustomViewStatementFG._SKIN_CHANGE_", "SKIN3"),
////                    new KPV("sessionTimeout", "600"),
////                    new KPV("sessionAlertTime", "60"),
////                    new KPV("sessionImgPath", "L003/consumer/images/loginbtn1.jpg"),
////                    new KPV("sessionLoginURL", "AuthenticationController?__START_TRAN_FLAG__=Y&FORMSGROUP_ID__=AuthenticationFG&__EVENT_ID__=LOAD&FG_BUTTONS__=LOAD&ACTION.LOAD=Y&AuthenticationFG.LOGIN_FLAG=1&BANK_ID=303&LANGUAGE_ID=003"),
////                    new KPV("CustomViewStatementFG.INITIATOR_ACCOUNT", accountId),
////                    new KPV("CustomViewStatementFG.TRANSACTION_DATE_FROM", FormatDate(DateTime.Now)),
////                    new KPV("CustomViewStatementFG.TRANSACTION_DATE_TO", FormatDate(DateTime.Now)),
////                    new KPV("Action.SEARCH", "Tìm kiếm"),
////                    new KPV("CustomViewStatementFG.OUTFORMAT", "5"),
////                    new KPV("FORMSGROUP_ID__", "CustomViewStatementFG"),
////                    new KPV("CustomViewStatementFG.REPORTTITLE", "ViewStatement"),
////                    new KPV("counterPartyNickName", ""),
////                    new KPV("amountSendToCxps", ""),
////                    new KPV("counterPartyTpe", ""),
////                    new KPV("freqTyp", ""),
////                    new KPV("tranType", ""),
////                    new KPV("bankId", "303"),
////                    new KPV("cxpsUserId", "trinhthi71".ToUpper()),
////                    new KPV("corpId", "trinhthi71".ToUpper()),
////                    new KPV("usertype", "1"),
////                    new KPV("RECEIVED_RESPONSE", ""),
////                    new KPV("ENABLE_CXPS", "Y"),
////                    new KPV("CXPS_ENABLE_JS_FLOW", "N"),
////                    new KPV("RIA_TARGETS", "null"),
////                    new KPV("JS_ENABLED_FLAG", "Y"),
////                    new KPV("CHECKBOX_NAMES__", ""),
////                    new KPV("Requestid", "2"),
////                    new KPV("__SIGNATURE__", ""),
////                    new KPV("CustomViewStatementFG.__COLLAPSIBLE_IDS__", "|"),
////                    new KPV("deviceDNA", deviceDNA),
////                    new KPV("executionTime", "1105"),
////                    new KPV("desc", ""),
////                    new KPV("mesc", "mi=2;cd=200;id=50;mesc=998585;ldi=217;mesc=1026655;ldi=203"),
////                    new KPV("dnaError", ""),
////                    new KPV("mescIterationCount", "2"),
////                    new KPV("isDNADone", "true"),
////                    new KPV("arcotFlashCookie", ""),
////                    new KPV("DEVICE_ID", ""),
////                    new KPV("DEVICE_TYPE", "DEVICEID.FLASH"),
////                    new KPV("MACHINE_FINGER_PRINT", fingerPrint2)
////                };

////                using (var rsp = Client.PostAsync(currentUrl, new FormUrlEncodedContent(pp)).Result)
////                {
////                    var page = rsp.Content.ReadAsStringAsync().Result;


////                    var statements = Parse(page);

////                    // next url
////                    var nextSearch = new Regex(@"<form  name=""CustomViewStatementFG"" action =""(.+?)""", RegexOptions.Compiled);
////                    lastUrl = currentUrl;
////                    currentUrl = nextSearch.Match(page).Groups[1].Value;

////                    if (string.IsNullOrWhiteSpace(currentUrl))
////                    {
////                        //IsCancelled = true;
////                    }

////                    currentUrl = string.Format("{0}/corp/{1}", URL_HOST, currentUrl);
////                }


////            Console.ReadLine();
////        }

////        public class StatementsSerialization
////        {
////            public string bank { get; set; }
////            public string account { get; set; }
////            public string number { get; set; }
////            public string date { get; set; }
////            public string balance { get; set; }
////            public List<string> stmts { get; set; }
////        }

////        public class StatementCollection : List<IStatement>
////        {

////            private static readonly JavaScriptSerializer _serializer = new JavaScriptSerializer();

////            public string Balance { get; set; }

////            public byte[] ToPostData(string bank, string userName, string accountNumber, DateTime date)
////            {
////                var postData = new StatementsSerialization()
////                {
////                    bank = bank,
////                    account = userName,
////                    number = accountNumber,
////                    date = date.ToString("yyyy-MM-dd"),
////                    balance = Balance,
////                    stmts = new List<string>(Count)
////                };
////                foreach (var record in this)
////                {
////                    postData.stmts.Add(record.ToString());
////                }
////                return Encoding.UTF8.GetBytes(_serializer.Serialize(postData));
////            }

////            public string ToDetails(string bank, string userName, string accountNumber, DateTime date)
////            {
////                var postData = new StatementsSerialization()
////                {
////                    bank = bank,
////                    account = userName,
////                    number = accountNumber,
////                    date = date.ToString("yyyy-MM-dd"),
////                    balance = Balance,
////                    stmts = new List<string>(Count)
////                };
////                foreach (var record in this)
////                {
////                    postData.stmts.Add(record.ToString());
////                }
////                return _serializer.Serialize(postData);
////                //return MidasUtils.Serialize(postData);
////            }
////        }


////        public interface IStatement
////        {
////            //string Title { get; }
////            IStatement Deserialize(string str);
////            string SerializeToCsv(string str);
////            decimal GetIncomingFund(string str, DateTime date);
////            decimal GetPayOut(string str, DateTime date);
////        }

////        [DataContract]
////        public class Statement : IStatement
////        {
////            private const char Quote = '"';
////            private static readonly DataContractJsonSerializer Serializer = new DataContractJsonSerializer(typeof(Statement));
////            private static readonly char[] SpecialChars = { ',', '"', '\r', '\n' };
////            private static readonly string OneQuote = string.Format("{0}", Quote);
////            private static readonly string QuotedFormat = string.Format("{0}{{0}}{0}", Quote);
////            private static readonly string TwoQuotes = string.Format("{0}{0}", Quote);

////            [DataMember(Name = "id", EmitDefaultValue = false)]
////            public string ID { get; set; }

////            [DataMember(Name = "date", EmitDefaultValue = false)]
////            public string Date { get; set; }

////            [DataMember(Name = "description", EmitDefaultValue = false)]
////            public string Description { get; set; }

////            [DataMember(Name = "branch", EmitDefaultValue = false)]
////            public string Branch { get; set; }

////            /// <summary>
////            ///     减钱
////            /// </summary>
////            [DataMember(Name = "debit", EmitDefaultValue = false)]
////            public string Debit { get; set; }

////            /// <summary>
////            ///     加钱
////            /// </summary>
////            [DataMember(Name = "credit", EmitDefaultValue = false)]
////            public string Credit { get; set; }

////            [DataMember(Name = "balance", EmitDefaultValue = false)]
////            public string Balance { get; set; }

////            public virtual IStatement Deserialize(string str)
////            {
////                var byteArray = Encoding.UTF8.GetBytes(str);
////                using (var ms = new MemoryStream(byteArray))
////                {
////                    var obj = Serializer.ReadObject(ms);
////                    return obj as Statement;
////                }
////            }

////            public virtual string SerializeToCsv(string str)
////            {
////                var sb = new StringBuilder();
////                var st = Deserialize(str) as Statement;
////                sb.Append(st.Date + ",");
////                sb.Append(st.ID + ",");
////                sb.Append(QuoteStringContainsSpecialCharacters(st.Description));
////                sb.Append(st.Debit + ",");
////                sb.Append(st.Credit + ",");
////                sb.Append(st.Balance);
////                return sb.ToString();
////            }

////            public virtual decimal GetIncomingFund(string str, DateTime date)
////            {
////                try
////                {
////                    var st = Deserialize(str) as Statement;
////                    if (DateTime.Parse(st.Date).Date == date.Date)
////                    {
////                        return Convert.ToDecimal(st.Debit);
////                    }
////                    return 0;
////                }
////                catch (Exception)
////                {
////                    return 0;
////                }
////            }

////            public virtual decimal GetPayOut(string str, DateTime date)
////            {
////                try
////                {
////                    var st = Deserialize(str) as Statement;
////                    if (DateTime.Parse(st.Date).Date == date.Date)
////                    {
////                        return Convert.ToDecimal(st.Credit);
////                    }
////                    return 0;
////                }
////                catch (Exception)
////                {
////                    return 0;
////                }
////            }

////            public override string ToString()
////            {
////                using (var ms = new MemoryStream())
////                {
////                    Serializer.WriteObject(ms, this);
////                    return Encoding.UTF8.GetString(ms.ToArray());
////                }
////            }

////            protected string QuoteStringContainsSpecialCharacters(string value)
////            {
////                if (string.IsNullOrWhiteSpace(value) || value.IndexOfAny(SpecialChars) == -1)
////                {
////                    return value;
////                }
////                var formattedDescription = string.Format(QuotedFormat, value.Replace(OneQuote, TwoQuotes));
////                return formattedDescription;
////            }
////        }

////        public static StatementCollection Parse(string content)
////        {
////            var statements = new StatementCollection();

////            var doc = new HtmlDocument();
////            doc.LoadHtml(content);

////            var rawStatements = doc.DocumentNode.SelectNodes(@"//table[@summary='Chi tiết lịch sử giao dịch']/tr");

////            if (rawStatements != null)
////            {
////                foreach (var stmt in rawStatements)
////                {
////                    var tds = stmt.SelectNodes("./td");
////                    if (tds != null && tds.Count >= 7)
////                    {
////                        statements.Add(new Statement()
////                        {
////                            ID = RemoveComma(tds[0].SelectSingleNode("./span").InnerText),
////                            Date = RemoveComma(tds[1].SelectSingleNode("./span").InnerText),
////                            Description = RemoveComma(tds[3].SelectSingleNode("./span").InnerText),
////                            Debit = RemoveCommaAndDot(tds[4].SelectSingleNode("./span").InnerText),
////                            Credit = RemoveCommaAndDot(tds[5].SelectSingleNode("./span").InnerText),
////                            Balance = RemoveCommaAndDot(tds[6].SelectSingleNode("./span").InnerText)
////                        });
////                    }
////                }

////                statements.Balance = RemoveCommaAndDot(REGEX_CLOSING_BALANCE.Match(content).Groups[1].Value);
////            }

////            return statements;
////        }

////        public static string RemoveCommaAndDot(string org)
////        {
////            if (string.IsNullOrWhiteSpace(org))
////            {
////                return string.Empty;
////            }
////            return org.Replace(",", "").Replace(".", "").Trim();
////        }

////        public static string RemoveComma(string org)
////        {
////            if (string.IsNullOrWhiteSpace(org))
////            {
////                return string.Empty;
////            }
////            return org.Replace(",", "").Trim();
////        }

////        private static string FormatDate(DateTime date)
////        {
////            return date.ToString("dd-MM-yyyy");
////        }

////        public static StringContent CreateFormEncodedData(NameValueCollection keyValues)
////        {
////            return CreateFormEncodedData(keyValues, Encoding.UTF8);
////        }

////        public static StringContent CreateFormEncodedData(NameValueCollection keyValues, Encoding encoding)
////        {
////            return CreateFormEncodedData(keyValues.ToQueryString(encoding));
////        }

////        public static StringContent CreateFormEncodedData(string queryString)
////        {
////            return CreateFormEncodedData(queryString, Encoding.UTF8);
////        }

////        public static StringContent CreateFormEncodedData(string queryString, Encoding encoding)
////        {
////            return new StringContent(queryString, encoding, Request.MediaTypes.FormEncodedData);
////        }

////        internal static StringContent CreateFormEncodedData(Parameters parameters)
////        {
////            return CreateFormEncodedData(parameters, Encoding.UTF8);
////        }

////        internal static StringContent CreateFormEncodedData(Parameters parameters, Encoding encoding)
////        {
////            return CreateFormEncodedData(parameters.ToQueryString(encoding));
////        }

////        public class Parameters : Dictionary<string, object>
////        {
////            public StringContent ToFormEncodedData()
////            {
////                return ToFormEncodedData(Encoding.UTF8);
////            }

////            public StringContent ToFormEncodedData(Encoding encoding)
////            {
////                return CreateFormEncodedData(this, encoding);
////            }
////        }

////        private static string Encrypt(string publicKey, string plaintext)
////        {
////            var tokens = publicKey.Split(new char[] { ',' });

////            if (tokens.Length != 3)
////                throw new Exception("Token is invalid.");

////            var encryptionExponent = tokens[0];
////            var modulus = tokens[1];
////            var maxdigits = tokens[2];

////            var nilcontext = new NiL.JS.Core.Context();
////            var currentScript = File.ReadAllText(@"SACOM.js");
////            nilcontext.Eval(currentScript);
////            nilcontext.Eval(string.Format("var keys = new jCryptionKeyPair('{0}', '{1}', '{2}');", encryptionExponent, modulus, maxdigits));
////            nilcontext.Eval(string.Format("var cipher = rsaEncrypt('{0}', keys);", plaintext));
////            var cipher = nilcontext.GetVariable("cipher");
////            return (string)cipher.Value;

////            //using (var jsNetEngine = new Noesis.Javascript.JavascriptContext())
////            //{
////            //    var currentScript = File.ReadAllText("SACOM.js");
////            //    jsNetEngine.Run(currentScript);
////            //    jsNetEngine.Run(string.Format("var keys = new jCryptionKeyPair('{0}', '{1}', '{2}');", encryptionExponent, modulus, maxdigits));
////            //    jsNetEngine.Run(string.Format("var cipher = rsaEncrypt('{0}', keys);", plaintext));
////            //    var cipher = (string)jsNetEngine.GetParameter("cipher");
////            //    return cipher;
////            //}

////            //using (var engine = new V8ScriptEngine())
////            //{
////            //    var f = File.ReadAllText("SACOM.js");
////            //    engine.Execute(f);

////            //    engine.Execute(string.Format("var keys = new jCryptionKeyPair('{0}', '{1}', '{2}');", encryptionExponent, modulus, maxdigits));
////            //    Console.WriteLine(engine.Script.keys);

////            //    engine.Execute(string.Format("var cipher = rsaEncrypt('{0}', keys);", plaintext));
////            //    return engine.Script.cipher;
////            //}
////        }

////        public static NameValueCollection GetHiddenFormCollection(string form)
////        {
////            var doc = new HtmlDocument();
////            doc.LoadHtml(form);
////            var collection = new NameValueCollection();
////            foreach (var input in doc.DocumentNode.SelectNodes(@"//input[@type=""hidden""]"))
////            {
////                var name = WebUtility.HtmlDecode(input.Attributes["name"].Value);
////                var valueAttribute = input.Attributes["value"];
////                collection.Add(name, valueAttribute != null ? WebUtility.HtmlDecode(valueAttribute.Value) : "");
////            }
////            return collection;
////        }

////        public static string Substring(string source, string a, string b)
////        {
////            var subStringFromA = source.Substring(source.IndexOf(a, StringComparison.Ordinal));
////            var indexBFromA = subStringFromA.IndexOf(b, StringComparison.Ordinal);
////            var substringFromAtoB = subStringFromA.Substring(0, indexBFromA + b.Length);
////            return substringFromAtoB;
////        }

////        private static string NormalizeUrl(string url)
////        {
////            var tokens = url.Split(new char[] { '"' });
////            return tokens[tokens.Length - 1];
////        }

////        public static CaptchaResult RecognizeCaptchaAsync(HttpClient client, string captchaUrl, string captchaServiceUrl)
////        {
////            try
////            {
////                var captcha = string.Empty;

////                using (var rsp = client.GetAsync(captchaUrl).Result)
////                {
////                    using (var img = CreateMultipartContent(rsp.Content.ReadAsStreamAsync().Result))
////                    {
////                        using (var rsp2 = client.PostAsync(captchaServiceUrl, img).Result)
////                        {
////                            var str = rsp2.Content.ReadAsStringAsync().Result;
////                            var result = CaptchaResult.Deserialize(str);
////                            if (result.Status == 1)
////                            {
////                                return result;
////                            }
////                            else
////                            {
////                                return new CaptchaResult()
////                                {
////                                    Status = 0
////                                };
////                            }
////                        }
////                    }
////                }
////            }
////            catch (Exception ex)
////            {
////                return new CaptchaResult()
////                {
////                    Status = 0,
////                    Data = ex.Message
////                };
////            }
////            //return new CaptchaResult();
////        }

////        public static MultipartFormDataContent CreateMultipartContent(Stream stream)
////        {
////            var content = new MultipartFormDataContent();
////            var image = new StreamContent(stream);
////            //var fileStream = new FileStream("captcha.png", FileMode.Create, FileAccess.Write);
////            //stream.CopyTo(fileStream);
////            //fileStream.Dispose();

////            image.Headers.ContentDisposition = new ContentDispositionHeaderValue("form-data")
////            {
////                Name = "\"captcha\"",
////                FileName = "\"captcha.jpg\""
////            };
////            content.Add(image);
////            return content;
////        }
////    }



////     [DataContract]
////    public class CaptchaResult
////    {

////        private static readonly DataContractJsonSerializer _serializer = new DataContractJsonSerializer(typeof(CaptchaResult));

////        [DataMember(Name = "status")]
////        public int Status { get; set; }

////        [DataMember(Name = "data")]
////        public string Data { get; set; }

////        public bool Error
////        {
////            get { return (int)Status < 1; }
////        }

////        public string Serialize()
////        {
////            using (var ms = new MemoryStream())
////            {
////                _serializer.WriteObject(ms, this);
////                return Encoding.UTF8.GetString(ms.ToArray());
////            }
////        }

////        public static CaptchaResult Deserialize(string json)
////        {
////            using (var stream = new MemoryStream(Encoding.UTF8.GetBytes(json)))
////            {
////                return _serializer.ReadObject(stream) as CaptchaResult;
////            }
////        }
////    }

////    public class Request : IDisposable
////    {

////        private HttpClient _client;
////        private HttpRequestMessage _requestMessage;

////        private Request(HttpRequestMessage requestMessage, CookieContainer cookieContainer, bool autoRedirect, IWebProxy proxy, TimeSpan timeout)
////        {
////            _requestMessage = requestMessage;
////            _client = new HttpClient(new HttpClientHandler { CookieContainer = cookieContainer, AllowAutoRedirect = autoRedirect, Proxy = proxy, UseProxy = proxy != null });
////        }

////        public Task<HttpResponseMessage> SendAsync()
////        {
////            return _client.SendAsync(_requestMessage);
////        }

////        public void Dispose()
////        {
////            _requestMessage.Dispose();
////            _client.Dispose();
////        }

////        public class MediaTypes
////        {
////            public const string TextualData = "text/plain";
////            public const string FormEncodedData = "application/x-www-form-urlencoded";
////            public const string JavaScriptObjectNotation = "application/json";
////        }

////        public class UserAgents
////        {
////            public const string Chrome = "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36";
////        }

////        public class Builder
////        {

////            private HttpRequestMessage requestMessage;
////            private CookieContainer cookieContainer;
////            private bool autoRedirect = true;
////            private string requestUri;
////            private NameValueCollection queries;
////            private IWebProxy proxy;
////            private TimeSpan timeout;

////            public Builder()
////            {
////                requestMessage = new HttpRequestMessage();
////                requestMessage.Method = HttpMethod.Get;
////                timeout = new TimeSpan(0, 0, 100);
////                Header("User-Agent", Request.UserAgents.Chrome);
////            }

////            public Builder Timeout(TimeSpan timeout)
////            {
////                this.timeout = timeout;
////                return this;
////            }

////            public Builder Timeout(int seconds)
////            {
////                return Timeout(new TimeSpan(0, 0, seconds));
////            }

////            public Builder Url(string url)
////            {
////                requestUri = url;
////                return this;
////            }

////            public Builder Parameter(string name, object value)
////            {
////                if (queries == null)
////                {
////                    queries = new NameValueCollection();
////                }
////                queries[name] = value.ToString();
////                return this;
////            }

////            public Builder Header(string name, string value)
////            {
////                if (!requestMessage.Headers.Contains(name))
////                    requestMessage.Headers.Add(name, value);
////                return this;
////            }

////            public Builder Header(string name, IEnumerable<string> values)
////            {
////                requestMessage.Headers.Add(name, values);
////                return this;
////            }

////            public Builder Cookie(CookieContainer cookies)
////            {
////                cookieContainer = cookies;
////                return this;
////            }

////            public Builder Get()
////            {
////                requestMessage.Method = HttpMethod.Get;
////                return this;
////            }

////            public Builder Post()
////            {
////                if (queries == null)
////                    return Post(string.Empty);
////                return Post(queries.ToQueryString(Encoding.UTF8));
////            }

////            public Builder Post(object param)
////            {
////                return Post(param.ToQueryString(Encoding.UTF8));
////            }

////            public Builder Post(object param, Encoding encoding)
////            {
////                return Post(param.ToQueryString(Encoding.UTF8), encoding);
////            }

////            public Builder Post(object param, Encoding encoding, string mediaType)
////            {
////                return Post(param.ToQueryString(Encoding.UTF8), encoding, mediaType);
////            }

////            public Builder Post(byte[] body)
////            {
////                return Post(body, MediaTypes.TextualData);
////            }

////            public Builder Post(byte[] body, string mediaType)
////            {
////                return Post(body, mediaType, "utf-8");
////            }

////            public Builder Post(byte[] body, string mediaType, string charSet)
////            {
////                requestMessage.Method = HttpMethod.Post;
////                requestMessage.Content = new ByteArrayContent(body);
////                requestMessage.Content.Headers.ContentType = new MediaTypeHeaderValue(mediaType)
////                {
////                    CharSet = charSet
////                };
////                return this;
////            }

////            public Builder Post(string body)
////            {
////                return Post(body, Encoding.UTF8);
////            }

////            public Builder Post(string body, Encoding encoding)
////            {
////                return Post(body, encoding, MediaTypes.FormEncodedData);
////            }

////            public Builder Post(string body, Encoding encoding, string mediaType)
////            {
////                requestMessage.Method = HttpMethod.Post;
////                requestMessage.Content = new StringContent(body, encoding, mediaType);
////                return this;
////            }

////            public Builder AutoRedirect(bool allow)
////            {
////                autoRedirect = allow;
////                return this;
////            }

////            public Builder Proxy(IWebProxy proxy)
////            {
////                this.proxy = proxy;
////                return this;
////            }

////            public Request Build()
////            {
////                if (cookieContainer == null)
////                    cookieContainer = new CookieContainer();
////                if (requestMessage.Method == HttpMethod.Get && queries != null)
////                {
////                    requestMessage.RequestUri = new Uri(requestUri + "?" + queries.ToQueryString(Encoding.UTF8));
////                }
////                else
////                {
////                    requestMessage.RequestUri = new Uri(requestUri);
////                }
////                return new Request(requestMessage, cookieContainer, autoRedirect, proxy, timeout);
////            }
////        }
////    }


////    public static class Extensions
////    {
////        public static string ToQueryString(this NameValueCollection collection)
////        {
////            return ToQueryString(collection, Encoding.UTF8);
////        }

////        public static string ToQueryString(this NameValueCollection collection, Encoding encoding)
////        {
////            var array = (from key in collection.AllKeys
////                         from value in collection.GetValues(key)
////                         select string.Format("{0}={1}", HttpUtility.UrlEncode(key), HttpUtility.UrlEncode(value, encoding))).ToArray();
////            return string.Join("&", array);
////        }

////        public static string ToQueryString(this Dictionary<string, object> dictionary)
////        {
////            return ToQueryString(dictionary, Encoding.UTF8);
////        }

////        public static string ToQueryString(this Dictionary<string, object> dictionary, Encoding encoding)
////        {
////            var array = (from key in dictionary.Keys
////                         select string.Format("{0}={1}", HttpUtility.UrlEncode(key), HttpUtility.UrlEncode(dictionary[key].ToString(), encoding))).ToArray();
////            return string.Join("&", array);
////        }

////        public static string ToQueryString(this object obj)
////        {
////            return ToQueryString(obj, Encoding.UTF8);
////        }

////        public static string ToQueryString(this object obj, Encoding encoding)
////        {
////            var array = (from kv in obj.ToKeyValuePairs()
////                         select string.Format("{0}={1}", HttpUtility.UrlEncode(kv.Key), HttpUtility.UrlEncode(kv.Value, encoding)));
////            return string.Join("&", array);
////        }

////        public static IEnumerable<KeyValuePair<string, string>> ToKeyValuePairs(this object obj)
////        {
////            if (obj == null)
////                throw new ArgumentNullException("obj");

////            if (obj is IDictionary)
////            {
////                foreach (DictionaryEntry kv in (IDictionary)obj)
////                    yield return new KeyValuePair<string, string>(kv.Key.ToString(), kv.Value.ToString());
////            }
////            else
////            {
////                foreach (var prop in obj.GetType().GetProperties())
////                {
////                    yield return new KeyValuePair<string, string>(prop.Name, prop.GetValue(obj, null).ToString());
////                }
////            }
////        }

////        public static decimal ToDecimal(this string str)
////        {
////            var d = default(decimal);
////            if (!decimal.TryParse(str, out d))
////            {
////                d = default(decimal);
////            }
////            return d;
////        }
////    }
////}
