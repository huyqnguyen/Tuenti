using HtmlAgilityPack;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Interactions;
using OpenQA.Selenium.Support.UI;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Script.Serialization;
namespace TestFloat
{
    public class VietTinBank
    {
        public static CookieContainer Cookies;
        public static Parameters Parameters;
        private static readonly Lazy<Regex> ENCPW = new Lazy<Regex>(() => new Regex(@"function encPw\(\) {\r\n(.*)\r\n(.*)", RegexOptions.Multiline));
        private static readonly Lazy<Regex> REG_BALANCE = new Lazy<Regex>(() => new Regex(@"<td class=""balance right"">(.*)</td>", RegexOptions.Compiled));
        private static readonly Lazy<Regex> REG_ACCOUNT_NO = new Lazy<Regex>(() => new Regex(@"javascript:viewDetail\('(.+?)'\)", RegexOptions.Compiled));
        private static readonly Lazy<Regex> REG_PARSE_PAGES = new Lazy<Regex>(() => new Regex(@"class=""nav-last"" href=""\?btnSubmit=&amp;(d-1335269-p)=(\d*)&amp", RegexOptions.Compiled));
        private static readonly Lazy<Regex> SPID_VALUE = new Lazy<Regex>(() => new Regex("<input type=\\\"hidden\\\" name=\\\"SPID\\\" value=\\\"(.+?)\\\">", RegexOptions.Compiled));
        private static readonly Lazy<Regex> RCASPID_VALUE = new Lazy<Regex>(() => new Regex("<input id=\\\"rcasPId\\\" type=\\\"hidden\\\" value=\\\"(.+?)\\\">", RegexOptions.Compiled));

        private static string _balance = "";
        private static string gateway_url = "https://ebanking.vietinbank.vn/rcas/portal/web/retail/bflogin";
        private static string gateway_url1 = "https://ebanking.vietinbank.vn/rcas/bankfast/Vib-login?screenId=LG01&lang=en";
        private static string dashboard_url = "https://ebanking.vietinbank.vn/rcas/portal/web/retail/dashboard";
        private static string login_url = "https://ebanking.vietinbank.vn/rcas/bankfast/Vib-login";
        private static string inquiry_url = "https://ebanking.vietinbank.vn/rcas/ips/account/getall.do";
        private static string history_url = "https://ebanking.vietinbank.vn/rcas/ips/account/history.do";
        private static string home_url = "https://ebanking.vietinbank.vn/rcas/portal/web/retail/home";

        public static WebDriverWait _waitDriver;
        public static WebDriverWait _mediumDriver;
        public static WebDriverWait _shortWaitDriver;
        public static ChromeDriverService serviceCr;
        public static ChromeDriver WebDriver;
        public static IJavaScriptExecutor JsDriver;


        [DataContract]
        private class JsonObject
        {
            [DataMember(Name = "name")]
            public string Name { get; set; }
            [DataMember(Name = "href")]
            public string Href { get; set; }
            [DataMember(Name = "childNodes")]
            public List<JsonObject> ChildNodes { get; set; }
        }
        static void Main(string[] args)
        {
            string Content = "";
            Cookies = new CookieContainer();

            Parameters = new Parameters();
            var Client = new HttpClient(new HttpClientHandler { CookieContainer = Cookies, AllowAutoRedirect = false, UseCookies = true })
            {
                Timeout = new TimeSpan(0, 3, 0),
            };


            //https://tiki.vn/


            //Client.DefaultRequestHeaders.Add("Accept-Language", "en-US,en;q=0.8");
            //Client.DefaultRequestHeaders.Add("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
            //Client.DefaultRequestHeaders.Add("Upgrade-Insecure-Requests", "1");
            //Client.DefaultRequestHeaders.UserAgent.TryParseAdd(Request.UserAgents.Chrome);

            //Client.DefaultRequestHeaders.Referrer = new Uri("https://ebanking.vietinbank.vn/rcas/portal/web/retail/atm-inquiry");
            using (var response = Client.GetAsync("https://tiki.vn/").Result)
            {
                Content = response.Content.ReadAsStringAsync().Result;
                var results = new List<JsonObject>();
                var doc = new HtmlDocument();
                doc.LoadHtml(Content);
                var historyList = doc.DocumentNode.SelectNodes("//nav[contains(@class, 'header-navigation')]/ul/li");
                if (historyList != null)
                {
                    foreach (var row in historyList)
                    {
                        var parentNode = new JsonObject() { ChildNodes = new List<JsonObject>()};
                        var fields = row.SelectNodes("./a/span");
                        parentNode.Name = fields[0].InnerHtml;
                        parentNode.Href = fields[0].ParentNode.Attributes["href"].Value;
                        var childs = row.SelectNodes("./div/ul/li/div/a");
                        foreach (var child in childs)
                        {
                            var childNode = new JsonObject();

                            childNode.Name = child.InnerHtml;
                            if (child.Attributes["href"] != null)
                            {
                                childNode.Href = child.Attributes["href"].Value;
                            }
                            parentNode.ChildNodes.Add(childNode);
                        }
                        results.Add(parentNode);
                    }
                }
                var json = new JavaScriptSerializer().Serialize(results);
            }

            //using (var response = Client.GetAsync(gateway_url).Result)
            //{
            //    Content = response.Content.ReadAsStringAsync().Result;
            //    if (Content.IndexOf("1900 558868") < 0)
            //    {
            //        Console.WriteLine("StartFailed 1900 558868");
            //    }
            //}

            //Client.DefaultRequestHeaders.Referrer = new Uri("https://ebanking.vietinbank.vn/rcas/portal/web/retail/bflogin");
            //using (var response = Client.GetAsync(gateway_url1).Result)
            //{
            //    Content = response.Content.ReadAsStringAsync().Result;
            //}

            //var encPW = ENCPW.Value.Match(Content);
            //var spid = SPID_VALUE.Value.Match(Content);
            //if (encPW.Groups.Count < 3 || spid.Groups.Count < 2)
            //{
            //    Console.WriteLine("Failed");
            //}

            //var jsFunction = String.Format(@"function encPw() {{ {0};{1}; return encWid(rExp, rMod, '{2}', '{3}') }};", encPW.Groups[1].Value, encPW.Groups[2].Value, spid.Groups[1].Value, "btsh9823");

            //var nilcontext = new NiL.JS.Core.Context();
            //var currentScriptPath = @"C:\myworks\PaymentTool\Midas\Midas.Services\Midas.MonitorService\Fetchers\Vietnam\VTB1.js";
            //var currentScript = File.ReadAllText(currentScriptPath);
            //nilcontext.Eval(currentScript + jsFunction);
            //nilcontext.Eval("var txtPassword_RSA = encPw();");
            //var password = nilcontext.GetVariable("txtPassword_RSA");
            //Console.WriteLine(password);


            //Parameters.Clear();
            //Parameters["txtUsername"] = "phungthanhhung7878";
            //Parameters["txtPassword"] = "";
            //Parameters["errmsg"] = "";
            //Parameters["txtPassword_RSA"] = password.Value;
            //Parameters["SPID"] = spid.Groups[1].Value;
            //Parameters["ss_bid"] = "bu_2";

            //using (var response = Client.PostAsync(login_url, Parameters.ToFormEncodedData()).Result)
            //{
            //    Content = response.Content.ReadAsStringAsync().Result;
            //    if (!Content.Contains("Welcome"))
            //    {
            //        Console.WriteLine("Login failed");
            //    }
            //}

            //using (var response = Client.GetAsync(dashboard_url).Result)
            //{
            //    Content = response.Content.ReadAsStringAsync().Result;

            //    if (!Content.Contains("Dashboard"))
            //    {
            //        Console.WriteLine("Login failed");
            //    }
            //}
            //CookieCollection cookie = Cookies.GetCookies(new Uri(dashboard_url));


            //Client.DefaultRequestHeaders.Remove("Accept");
            //Client.DefaultRequestHeaders.Add("Accept", "application/json, text/plain, */*");
            //Client.DefaultRequestHeaders.Remove("Upgrade-Insecure-Requests");
            //Client.DefaultRequestHeaders.Add("Origin", "https://ebanking.vietinbank.vn");
            //Client.DefaultRequestHeaders.Referrer = new Uri("https://ebanking.vietinbank.vn/rcas/portal/web/retail/home");


            //var cookieContainer = new CookieContainer();
            //using (var handler = new HttpClientHandler() { CookieContainer = cookieContainer })
            //using (var client = new HttpClient(handler) { BaseAddress = new Uri("https://ebanking.vietinbank.vn/rcas/service/getCustomerDetails") })
            //{

            //    client.DefaultRequestHeaders.Remove("Accept");
            //    client.DefaultRequestHeaders.Add("Accept", "application/json, text/plain, */*");
            //    client.DefaultRequestHeaders.Remove("Upgrade-Insecure-Requests");
            //    client.DefaultRequestHeaders.Add("Origin", "https://ebanking.vietinbank.vn");
            //    client.DefaultRequestHeaders.Referrer = new Uri("https://ebanking.vietinbank.vn/rcas/portal/web/retail/dashboard");
            //    client.DefaultRequestHeaders.Remove("Expect");
            //    foreach (Cookie item in cookie)
            //    {
            //        cookieContainer.Add(new Uri("https://ebanking.vietinbank.vn/rcas/service/getCustomerDetails"), new Cookie(item.Name, item.Value));
            //    }

            //    var result = client.PostAsync("https://ebanking.vietinbank.vn/rcas/service/getCustomerDetails", new StringContent("{\"channel\":\"IBW\"}",
            //                                    Encoding.UTF8,
            //                                    "application/json")).Result;
            //    var pageSource = result.Content.ReadAsStringAsync().Result;
            //    Console.WriteLine(pageSource);
            //}

            //var cookieContainer1 = new CookieContainer();
            //using (var handler1 = new HttpClientHandler() { CookieContainer = cookieContainer1 })
            //using (var client1 = new HttpClient(handler1) { BaseAddress = new Uri("https://ebanking.vietinbank.vn/rcas/welcomeInfo/getUserDetails") })
            //{

            //    client1.DefaultRequestHeaders.Remove("Accept");
            //    client1.DefaultRequestHeaders.Add("Accept", "application/json, text/plain, */*");
            //    client1.DefaultRequestHeaders.Remove("Upgrade-Insecure-Requests");
            //    client1.DefaultRequestHeaders.Add("Origin", "https://ebanking.vietinbank.vn");
            //    client1.DefaultRequestHeaders.Referrer = new Uri("https://ebanking.vietinbank.vn/rcas/portal/web/retail/dashboard");
            //    client1.DefaultRequestHeaders.Remove("Expect");
            //    foreach (Cookie item in cookie)
            //    {
            //        cookieContainer1.Add(new Uri("https://ebanking.vietinbank.vn/rcas/welcomeInfo/getUserDetails"), new Cookie(item.Name, item.Value));
            //    }

            //    var result = client1.PostAsync("https://ebanking.vietinbank.vn/rcas/welcomeInfo/getUserDetails", new StringContent("{\"channel\":\"IBW\"}",
            //                    Encoding.UTF8,
            //                    "application/json")).Result;
            //    var pageSource = result.Content.ReadAsStringAsync().Result;
            //    Console.WriteLine(pageSource);

            //}


            ////HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, "https://ebanking.vietinbank.vn/rcas/service/getCustomerDetails");
            ////request.Content = new StringContent("{\"channel\":\"IBW\"}",
            ////                                    Encoding.UTF8,
            ////                                    "application/json");

            ////using (var response = Client.SendAsync(request).Result)
            ////{
            ////    var pageSource = response.Content.ReadAsStringAsync().Result;
            ////    Console.WriteLine(pageSource);
            ////}

            ////HttpRequestMessage request2 = new HttpRequestMessage(HttpMethod.Post, "https://ebanking.vietinbank.vn/rcas/welcomeInfo/getUserDetails");
            ////request2.Content = new StringContent("{\"channel\":\"IBW\"}",
            ////                                    Encoding.UTF8,
            ////                                    "application/json");


            ////using (var response = Client.SendAsync(request2).Result)
            ////{
            ////    var pageSource = response.Content.ReadAsStringAsync().Result;
            ////    Console.WriteLine(pageSource);
            ////}

            //Client.DefaultRequestHeaders.Remove("Accept");
            //Client.DefaultRequestHeaders.Add("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
            //Client.DefaultRequestHeaders.Add("Upgrade-Insecure-Requests", "1");
            //using (var response = Client.GetAsync("https://ebanking.vietinbank.vn/rcas/portal/web/retail/home").Result)
            //{
            //    var pageSource = response.Content.ReadAsStringAsync().Result;
            //    if (!pageSource.Contains("Accounts and Cards"))
            //    {
            //        Console.WriteLine("Login failed");
            //    }
            //}

            //var rcasPId = RCASPID_VALUE.Value.Match(Content);
            //if (rcasPId.Groups.Count < 2) Console.WriteLine("Login failed");
            //Thread.Sleep(2000);
            //Client.DefaultRequestHeaders.Referrer = new Uri("https://ebanking.vietinbank.vn/rcas/portal/web/retail/home");
            //using (var response = Client.GetAsync("https://ebanking.vietinbank.vn/rcas/portal/web/retail/atm-inquiry").Result)
            //{
            //    var pageSource = response.Content.ReadAsStringAsync().Result;
            //    File.WriteAllText(@"D:\atm-inquiry.html", pageSource);
            //    if (!pageSource.Contains("Accounts and Cards"))
            //    {
            //        Console.WriteLine("Cannot reach account home page");
            //    }
            //}

            //var Queries = new NameValueCollection();
            //Queries["lang"] = "en";
            //Queries["rcasPId"] = rcasPId.Groups[1].Value;
            //Thread.Sleep(2000);
            //Client.DefaultRequestHeaders.Referrer = new Uri("https://ebanking.vietinbank.vn/rcas/portal/web/retail/atm-inquiry");
            //using (var response = Client.GetAsync("https://ebanking.vietinbank.vn/rcas/ips/account/inquiry.do?" + Queries.ToQueryString()).Result)
            //{
            //    var pageSource = response.Content.ReadAsStringAsync().Result;
            //    File.WriteAllText(@"D:\InquiryPage.html", pageSource);
            //    if (!pageSource.Contains("Account Detail"))
            //    {
            //        Console.WriteLine("Cannot reach account details page");
            //    }

            //    var doc = new HtmlDocument();
            //    doc.LoadHtml(pageSource);
            //    var balanceNode = doc.DocumentNode.SelectSingleNode(@"//*[@class=""account-info-wrapper""]/div[5]/div[2]");
            //    if (balanceNode != null)
            //        Console.WriteLine(_balance );

            //}

            //Client.DefaultRequestHeaders.Referrer = new Uri("https://ebanking.vietinbank.vn/rcas/ips/account/inquiry.do?" + Queries.ToQueryString());
            //using (var response = Client.GetAsync(history_url).Result)
            //{
            //    var pageSource = response.Content.ReadAsStringAsync().Result;
            //    File.WriteAllText(@"D:\historypage.html", pageSource);

            //    if (response.StatusCode != HttpStatusCode.OK)
            //    {
            //        Console.WriteLine("Can't reach history page");
            //    }
            //}

            //serviceCr = ChromeDriverService.CreateDefaultService();
            //WebDriver = new ChromeDriver(serviceCr);
            //JsDriver = WebDriver as IJavaScriptExecutor;

            //var timeoutSpan = new TimeSpan(0, 3, 0);
            //var TimeOut = timeoutSpan;

            //_waitDriver = new WebDriverWait(WebDriver, TimeOut);
            //_mediumDriver = new WebDriverWait(WebDriver, new TimeSpan(0, 0, 30));
            //_shortWaitDriver = new WebDriverWait(WebDriver, new TimeSpan(0, 0, 20));

            //WebDriver.Url = gateway_url;
            //WebDriver.Navigate();
            //WebDriver.SwitchTo().Frame("sstIframe");

            //var userNameElement = _waitDriver.Until(ExpectedConditions.ElementExists(By.Id("txtUsername")));
            //userNameElement.SendKeys("01632544894");
            //var passwordElement = _waitDriver.Until(ExpectedConditions.ElementExists(By.Id("txtPassword")));
            //passwordElement.SendKeys("kjge6478");

            //if (WebDriver.PageSource.IndexOf("VietinBank iPay") < 0)
            //{
            //    Console.WriteLine("Can't reached viettin home page");
            //}
            //Thread.Sleep(500);
            //_waitDriver.Until(ExpectedConditions.ElementExists(By.Name("bu_2"))).Click();

            //if (WebDriver.PageSource.IndexOf("Here you can view all your accounts") < 0)
            //{
            //    Console.WriteLine("Can't login, bank has changed somethings");
            //}

            //WebDriver.Url = "https://ebanking.vietinbank.vn/rcas/portal/web/retail/atm-transfer";
            //WebDriver.Navigate();
            //WebDriver.SwitchTo().Frame("sstIframe");

            ////frAcct
            //_waitDriver.Until(ExpectedConditions.ElementExists(By.Id("frAcct")));
            //var fromAccountComponent = WebDriver.FindElement(By.Name("frAcct"));
            //var selectElement = new SelectElement(fromAccountComponent);
            //selectElement.SelectByText("(VND) - 711AD1476042");
            //Thread.Sleep(500);
            //var currentBalance = WebDriver.FindElement(By.Id("currBalance")).GetAttribute("value");
            //Console.WriteLine(currentBalance);
            //_waitDriver.Until(ExpectedConditions.ElementExists(By.Id("toAcct"))).SendKeys("711A21443585");
            ////Thread.Sleep(500);
            //_waitDriver.Until(ExpectedConditions.ElementExists(By.Id("amt"))).SendKeys("10000");
            ////Thread.Sleep(500);
            //_waitDriver.Until(ExpectedConditions.ElementExists(By.Id("memo"))).SendKeys("Nội dung");
            ////Thread.Sleep(500);
            //_waitDriver.Until(ExpectedConditions.ElementExists(By.Id("btnSubmit"))).Click();
            //Thread.Sleep(500);
            //var doc = new HtmlDocument();
            //doc.LoadHtml(WebDriver.PageSource);
            //var accountName = doc.DocumentNode.SelectSingleNode(@"//*[@class=""account-info-wrapper""]/div[3]/div[2]").InnerText;
            //var feesParsedResult = doc.DocumentNode.SelectSingleNode(@"//*[@class=""account-info-wrapper""]/div[6]/div[2]").InnerText;
            //_waitDriver.Until(ExpectedConditions.ElementExists(By.Id("btnSubmit"))).Click();

            //HttpClient _client = new HttpClient();
            //DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(OTPResult));
            //var otp = new OTPResult();
            //using (var rsp = _client.GetAsync("http://192.168.111.150:9000/sms/fetch/711AD1476042").Result)
            //{
            //    var page = rsp.Content.ReadAsStringAsync().Result;

            //    otp = OTPResult.Deserialize(page);
            //}

            //_waitDriver.Until(ExpectedConditions.ElementExists(By.Id("otp"))).SendKeys(otp.Data);
            //_waitDriver.Until(ExpectedConditions.ElementExists(By.Id("btnSubmit"))).Click();
            //var doc = new HtmlDocument();
            ////doc.LoadHtml(WebDriver.PageSource);
            ////var balanceNode = doc.DocumentNode.SelectSingleNode(@"//*[@class=""account-info-wrapper""]/div[5]/div[2]");
            ////if (balanceNode != null)
            ////    Console.WriteLine(balanceNode.InnerHtml);

            //var transtionHistory = _waitDriver.Until(ExpectedConditions.ElementExists(By.CssSelector("[href*='#history']")));
            //transtionHistory.Click();

            //if (WebDriver.PageSource.IndexOf("Transaction History") < 0)
            //{
            //    Console.WriteLine("Can't reach account history page");
            //}

            //_waitDriver.Until(ExpectedConditions.ElementExists(By.Id("frDate"))).SendKeys("10/02/2017");
            //_waitDriver.Until(ExpectedConditions.ElementExists(By.Id("toDate"))).SendKeys("10/02/2017");

            //_waitDriver.Until(ExpectedConditions.ElementExists(By.Id("btnSubmit"))).Click();

            //var pages = 0;
            //var param = "";
            //var pagesMatcher = REG_PARSE_PAGES.Value.Match(WebDriver.PageSource);
            //if (!pagesMatcher.Success)
            //{
            //    pages = 1;
            //}
            //else
            //{
            //    pages = Convert.ToInt32(pagesMatcher.Groups[2].Value);
            //    param = pagesMatcher.Groups[1].Value;
            //}

            //List<string> records = new List<string>();
            //if (pages == 1)
            //{
            //    records.Add(Parse(WebDriver.PageSource));
            //}
            //else
            //{
            //    records.Add(Parse(WebDriver.PageSource));
            //    var tasks = new List<Task<string>>(pages);
            //    for (var i = 2; i <= pages; i++)
            //    {
            //        records.Add(Parse(Fetch(param, i)));
            //    }
            //}
            Console.Read();
        }

        [DataContract]
        public class OTPResult
        {

            private static readonly DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(OTPResult));
            public static readonly OTPResult Failure = new OTPResult() { Status = TokenStatusEnum.Failed };

            [DataMember(Name = "status")]
            public TokenStatusEnum Status { get; set; }

            [DataMember(Name = "data")]
            public string Data { get; set; }

            public bool Error
            {
                get { return (int)Status < 1; }
            }

            public string Serialize()
            {
                using (var ms = new MemoryStream())
                {
                    serializer.WriteObject(ms, this);
                    return Encoding.UTF8.GetString(ms.ToArray());
                }
            }

            public static OTPResult Deserialize(string json)
            {
                using (var stream = new MemoryStream(Encoding.UTF8.GetBytes(json)))
                {
                    return serializer.ReadObject(stream) as OTPResult;
                }
            }
        }

        private static string Fetch(string param, int page)
        {
            var queryString = string.Format("[href*='{0}={1}']", param, page);
            try
            {
                _waitDriver.Until(ExpectedConditions.ElementExists(By.CssSelector(queryString))).Click();
                return WebDriver.PageSource;
            }
            catch (Exception err)
            {
                Console.WriteLine(err.Message);
                throw err;
            }
        }

        public static string Parse(string content)
        {
            if (string.IsNullOrWhiteSpace(content))
            {
                return "";
            }
            var result = "";
            var doc = new HtmlDocument();
            doc.LoadHtml(content);
            var historyList = doc.GetElementbyId("histLst");
            if (historyList != null)
            {
                var rows = historyList.SelectNodes("tbody[1]/tr");

                if (rows != null)
                {
                    foreach (var row in rows)
                    {
                        var fields = row.SelectNodes("./td/span[2]");
                        if (fields == null || fields.Count < 5)
                        {
                            continue;
                        }
                        var statement = "";
                        statement += fields[0].InnerHtml + "  ";
                        statement += fields[1].InnerHtml + "  ";
                        statement += fields[2].InnerHtml + "  ";
                        statement += fields[3].SelectNodes("span[1]")[0].InnerText + "  ";
                        statement += fields[4].SelectNodes("span[1]")[0].InnerText + "  ";
                        result += statement + "  ";
                    }
                }
            }
            return result;
        }
    }



    public class Request : IDisposable
    {

        private HttpClient _client;
        private HttpRequestMessage _requestMessage;

        private Request(HttpRequestMessage requestMessage, CookieContainer cookieContainer, bool autoRedirect, IWebProxy proxy, TimeSpan timeout)
        {
            _requestMessage = requestMessage;
            _client = new HttpClient(new HttpClientHandler { CookieContainer = cookieContainer, AllowAutoRedirect = autoRedirect, Proxy = proxy, UseProxy = proxy != null });
        }

        public Task<HttpResponseMessage> SendAsync()
        {
            return _client.SendAsync(_requestMessage);
        }

        public void Dispose()
        {
            _requestMessage.Dispose();
            _client.Dispose();
        }

        public class MediaTypes
        {
            public const string TextualData = "text/plain";
            public const string FormEncodedData = "application/x-www-form-urlencoded";
            public const string JavaScriptObjectNotation = "application/json";
        }

        public class UserAgents
        {
            public const string Chrome = "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36";
        }

        public class Builder
        {

            private HttpRequestMessage requestMessage;
            private CookieContainer cookieContainer;
            private bool autoRedirect = true;
            private string requestUri;
            private NameValueCollection queries;
            private IWebProxy proxy;
            private TimeSpan timeout;

            public Builder()
            {
                requestMessage = new HttpRequestMessage();
                requestMessage.Method = HttpMethod.Get;
                timeout = new TimeSpan(0, 0, 100);
                Header("User-Agent", Request.UserAgents.Chrome);
            }

            public Builder Timeout(TimeSpan timeout)
            {
                this.timeout = timeout;
                return this;
            }

            public Builder Timeout(int seconds)
            {
                return Timeout(new TimeSpan(0, 0, seconds));
            }

            public Builder Url(string url)
            {
                requestUri = url;
                return this;
            }

            public Builder Parameter(string name, object value)
            {
                if (queries == null)
                {
                    queries = new NameValueCollection();
                }
                queries[name] = value.ToString();
                return this;
            }

            public Builder Header(string name, string value)
            {
                if (!requestMessage.Headers.Contains(name))
                    requestMessage.Headers.Add(name, value);
                return this;
            }

            public Builder Header(string name, IEnumerable<string> values)
            {
                requestMessage.Headers.Add(name, values);
                return this;
            }

            public Builder Cookie(CookieContainer cookies)
            {
                cookieContainer = cookies;
                return this;
            }

            public Builder Get()
            {
                requestMessage.Method = HttpMethod.Get;
                return this;
            }

            public Builder Post()
            {
                if (queries == null)
                    return Post(string.Empty);
                return Post(queries.ToQueryString(Encoding.UTF8));
            }

            public Builder Post(object param)
            {
                return Post(param.ToQueryString(Encoding.UTF8));
            }

            public Builder Post(object param, Encoding encoding)
            {
                return Post(param.ToQueryString(Encoding.UTF8), encoding);
            }

            public Builder Post(object param, Encoding encoding, string mediaType)
            {
                return Post(param.ToQueryString(Encoding.UTF8), encoding, mediaType);
            }

            public Builder Post(byte[] body)
            {
                return Post(body, MediaTypes.TextualData);
            }

            public Builder Post(byte[] body, string mediaType)
            {
                return Post(body, mediaType, "utf-8");
            }

            public Builder Post(byte[] body, string mediaType, string charSet)
            {
                requestMessage.Method = HttpMethod.Post;
                requestMessage.Content = new ByteArrayContent(body);
                requestMessage.Content.Headers.ContentType = new MediaTypeHeaderValue(mediaType)
                {
                    CharSet = charSet
                };
                return this;
            }

            public Builder Post(string body)
            {
                return Post(body, Encoding.UTF8);
            }

            public Builder Post(string body, Encoding encoding)
            {
                return Post(body, encoding, MediaTypes.FormEncodedData);
            }

            public Builder Post(string body, Encoding encoding, string mediaType)
            {
                requestMessage.Method = HttpMethod.Post;
                requestMessage.Content = new StringContent(body, encoding, mediaType);
                return this;
            }

            public Builder AutoRedirect(bool allow)
            {
                autoRedirect = allow;
                return this;
            }

            public Builder Proxy(IWebProxy proxy)
            {
                this.proxy = proxy;
                return this;
            }

            public Request Build()
            {
                if (cookieContainer == null)
                    cookieContainer = new CookieContainer();
                if (requestMessage.Method == HttpMethod.Get && queries != null)
                {
                    requestMessage.RequestUri = new Uri(requestUri + "?" + queries.ToQueryString(Encoding.UTF8));
                }
                else
                {
                    requestMessage.RequestUri = new Uri(requestUri);
                }
                return new Request(requestMessage, cookieContainer, autoRedirect, proxy, timeout);
            }
        }
    }

    public class Parameters : Dictionary<string, object>
    {
        public StringContent ToFormEncodedData()
        {
            return ToFormEncodedData(Encoding.UTF8);
        }

        public StringContent ToFormEncodedData(Encoding encoding)
        {
            return HttpUtils.CreateFormEncodedData(this, encoding);
        }
    }

    public class HttpUtils
    {

        public static StringContent CreateFormEncodedData(NameValueCollection keyValues)
        {
            return CreateFormEncodedData(keyValues, Encoding.UTF8);
        }

        public static StringContent CreateFormEncodedData(NameValueCollection keyValues, Encoding encoding)
        {
            return CreateFormEncodedData(keyValues.ToQueryString(encoding));
        }

        public static StringContent CreateFormEncodedData(string queryString)
        {
            return CreateFormEncodedData(queryString, Encoding.UTF8);
        }

        public static StringContent CreateFormEncodedData(string queryString, Encoding encoding)
        {
            return new StringContent(queryString, encoding, Request.MediaTypes.FormEncodedData);
        }

        internal static StringContent CreateFormEncodedData(Parameters parameters)
        {
            return CreateFormEncodedData(parameters, Encoding.UTF8);
        }

        internal static StringContent CreateFormEncodedData(Parameters parameters, Encoding encoding)
        {
            return CreateFormEncodedData(parameters.ToQueryString(encoding));
        }
    }

    public static class Extensions
    {
        public static string ToQueryString(this NameValueCollection collection)
        {
            return ToQueryString(collection, Encoding.UTF8);
        }

        public static string ToQueryString(this NameValueCollection collection, Encoding encoding)
        {
            var array = (from key in collection.AllKeys
                         from value in collection.GetValues(key)
                         select string.Format("{0}={1}", HttpUtility.UrlEncode(key), HttpUtility.UrlEncode(value, encoding))).ToArray();
            return string.Join("&", array);
        }

        public static string ToQueryString(this Dictionary<string, object> dictionary)
        {
            return ToQueryString(dictionary, Encoding.UTF8);
        }

        public static string ToQueryString(this Dictionary<string, object> dictionary, Encoding encoding)
        {
            var array = (from key in dictionary.Keys
                         select string.Format("{0}={1}", HttpUtility.UrlEncode(key), HttpUtility.UrlEncode(dictionary[key].ToString(), encoding))).ToArray();
            return string.Join("&", array);
        }

        public static string ToQueryString(this object obj)
        {
            return ToQueryString(obj, Encoding.UTF8);
        }

        public static string ToQueryString(this object obj, Encoding encoding)
        {
            var array = (from kv in obj.ToKeyValuePairs()
                         select string.Format("{0}={1}", HttpUtility.UrlEncode(kv.Key), HttpUtility.UrlEncode(kv.Value, encoding)));
            return string.Join("&", array);
        }

        public static IEnumerable<KeyValuePair<string, string>> ToKeyValuePairs(this object obj)
        {
            if (obj == null)
                throw new ArgumentNullException("obj");

            if (obj is IDictionary)
            {
                foreach (DictionaryEntry kv in (IDictionary)obj)
                    yield return new KeyValuePair<string, string>(kv.Key.ToString(), kv.Value.ToString());
            }
            else
            {
                foreach (var prop in obj.GetType().GetProperties())
                {
                    yield return new KeyValuePair<string, string>(prop.Name, prop.GetValue(obj, null).ToString());
                }
            }
        }

        public static decimal ToDecimal(this string str)
        {
            var d = default(decimal);
            if (!decimal.TryParse(str, out d))
            {
                d = default(decimal);
            }
            return d;
        }
    }


}
