//using HtmlAgilityPack;
//using Jint;
//using System;
//using System.Collections;
//using System.Collections.Generic;
//using System.Collections.Specialized;
//using System.Globalization;
//using System.IO;
//using System.Linq;
//using System.Net;
//using System.Net.Http;
//using System.Net.Http.Headers;
//using System.Runtime.Serialization;
//using System.Runtime.Serialization.Json;
//using System.Security.Cryptography;
//using System.Text;
//using System.Text.RegularExpressions;
//using System.Threading;
//using System.Threading.Tasks;
//using System.Web;

//namespace TestFloat
//{
//    public class CIMBN
//    {
//        public static Parameters _Parameters { get; set; }
//        public static NameValueCollection Queries { get; set; }
//        public static TimeSpan TimeOut { get; set; }
//        public static HttpClient Client { get; set; }
//        public static string BankCode { get; set; }
//        public static string UserName { get; set; }
//        public static string Password { get; set; }
//        public static string AccountNumber { get; set; }
//        public static string CompanyId { get; set; }
//        public static DateTime FromDate { get; set; }
//        public static DateTime ToDate { get; set; }
//        public static int MonitorRequestId { get; set; }
//        public static bool IsCancelled { get; set; }
//        public static bool IsAutomatic { get; set; }
//        public static bool IsCurrentDate { get; set; }
//        public static int Period { get; set; }
//        public static string CaptchaService { get; set; }
//        public static string CaptchaMidasService { get; set; }
//        public static string OtpService { get; set; }
//        public static DateTime SnatchingTime { get; set; }
//        public static bool IsLoginned { get; set; }
//        public static string LastPage { get; set; }
//        public static string LastPageDirectory { get; set; }

//        private static string _gatewayUrl = "https://ibanking.bangkokbank.com/SignOn.aspx";
//        private static string _accountUrl = "https://ibanking.bangkokbank.com/workspace/16AccountActivity/wsp_AccountActivity_SavingCurrent.aspx";
//        private static string _logOutUrl = "https://ibanking.bangkokbank.com/workspace/16AccountActivity/wsp_AccountActivity_SavingCurrent.aspx";
//        private static string __VIEWSTATE = string.Empty;
//        private static string __VIEWSTATEGENERATOR = string.Empty;
//        private static string __EVENTVALIDATION = string.Empty;
//        private static string __PREVIOUSPAGE = string.Empty;
//        private static string __RequestVerificationToken = string.Empty;
//        private static string _collapseFlag = string.Empty;
//        private static string _ddlAccount = string.Empty;
//        private static HtmlDocument _doc = new HtmlDocument();
//        public static CookieContainer Cookies;
//        public static List<BBLStatement> statements = new List<BBLStatement>();
//        static void Main(string[] args)
//        {
//            var timeoutSpan = new TimeSpan(0, 0, 60);
//            Cookies = new CookieContainer();
//            Client = new HttpClient(new HttpClientHandler
//            {
//                CookieContainer = Cookies,
//                AllowAutoRedirect = true,
//                //Proxy = new WebProxy("localhost", 8888)
//            })
//            {
//                Timeout = timeoutSpan
//            };
//            Client.DefaultRequestHeaders.UserAgent.TryParseAdd(Request.UserAgents.Chrome);

//            _Parameters = new Parameters();

//            using (var response = Client.GetAsync(_gatewayUrl).Result)
//            {
//                LastPage = response.Content.ReadAsStringAsync().Result;
//                _doc.LoadHtml(LastPage);
//                __VIEWSTATE = _doc.DocumentNode.SelectSingleNode(@"//*[@id=""__VIEWSTATE""]").GetAttributeValue("value", "");
//                __VIEWSTATEGENERATOR = _doc.DocumentNode.SelectSingleNode(@"//*[@id=""__VIEWSTATEGENERATOR""]").GetAttributeValue("value", "");
//                __EVENTVALIDATION = _doc.DocumentNode.SelectSingleNode(@"//*[@id=""__EVENTVALIDATION""]").GetAttributeValue("value", "");
//            }

//            _Parameters.Clear();
//            _Parameters["__EVENTTARGET"] = "";
//            _Parameters["__EVENTARGUMENT"] = "";
//            _Parameters["DES_Group"] = "GROUPMAIN";
//            _Parameters["__VIEWSTATE"] = __VIEWSTATE;
//            _Parameters["__VIEWSTATEGENERATOR"] = __VIEWSTATEGENERATOR;
//            _Parameters["__EVENTVALIDATION"] = __EVENTVALIDATION;
//            _Parameters["txtID"] = "ywk5362";
//            _Parameters["txtPwd"] = "Coke4752";
//            _Parameters["btnLogOn"] = "Log On";

//            using (var response = Client.PostAsync(_gatewayUrl, _Parameters.ToFormEncodedData()).Result)
//            {
//                LastPage = response.Content.ReadAsStringAsync().Result;

//                _doc.LoadHtml(LastPage);
//                _collapseFlag = _doc.DocumentNode.SelectSingleNode(@"//*[@id=""ctl00_ctl00_C_CW_hidCollapseFlag""]").GetAttributeValue("value", "");
//                __RequestVerificationToken = _doc.DocumentNode.SelectSingleNode(@"//*[@id=""__RequestVerificationToken""]").GetAttributeValue("value", "");
//                __VIEWSTATE = _doc.DocumentNode.SelectSingleNode(@"//*[@id=""__VIEWSTATE""]").GetAttributeValue("value", "");
//                __VIEWSTATEGENERATOR = _doc.DocumentNode.SelectSingleNode(@"//*[@id=""__VIEWSTATEGENERATOR""]").GetAttributeValue("value", "");
//                __PREVIOUSPAGE = _doc.DocumentNode.SelectSingleNode(@"//*[@id=""__PREVIOUSPAGE""]").GetAttributeValue("value", "");
//                __EVENTVALIDATION = _doc.DocumentNode.SelectSingleNode(@"//*[@id=""__EVENTVALIDATION""]").GetAttributeValue("value", "");
//            }

//            _Parameters.Clear();
//            _Parameters["__RequestVerificationToken"] = __RequestVerificationToken;
//            _Parameters["__EVENTTARGET"] = "";
//            _Parameters["__VIEWSTATE"] = __VIEWSTATE;
//            _Parameters["__VIEWSTATEGENERATOR"] = __VIEWSTATEGENERATOR;
//            _Parameters["__PREVIOUSPAGE"] = __PREVIOUSPAGE;
//            _Parameters["__EVENTVALIDATION"] = //*[@id="__EVENTVALIDATION"];
//            _Parameters["AcctID"] = "6477062092";
//            _Parameters["AcctIndex"] = "1";
//            _Parameters["ctl00$ctl00$C$CW$hidCollapseFlag"] = _collapseFlag;

//            using (var response = Client.PostAsync(_accountUrl, _Parameters.ToFormEncodedData()).Result)
//            {
//                LastPage = response.Content.ReadAsStringAsync().Result;
    
//                _doc.LoadHtml(LastPage);
//                _ddlAccount = _doc.DocumentNode.SelectSingleNode(@"//*[@id=""ctl00_ctl00_C_CN_NavAcctActivity1_ddlAccount""]/option[contains(@value,'6477062092')]").GetAttributeValue("value", "");
//                __VIEWSTATEGENERATOR = _doc.DocumentNode.SelectSingleNode(@"//*[@id=""__VIEWSTATEGENERATOR""]").GetAttributeValue("value", "");
//                __VIEWSTATE = _doc.DocumentNode.SelectSingleNode(@"//*[@id=""__VIEWSTATE""]").GetAttributeValue("value", "");
//                __RequestVerificationToken = _doc.DocumentNode.SelectSingleNode(@"//*[@id=""__RequestVerificationToken""]").GetAttributeValue("value", "");
//                __PREVIOUSPAGE = _doc.DocumentNode.SelectSingleNode(@"//*[@id=""__PREVIOUSPAGE""]").GetAttributeValue("value", "");
//                __EVENTVALIDATION = _doc.DocumentNode.SelectSingleNode(@"//*[@id=""__EVENTVALIDATION""]").GetAttributeValue("value", "");

//            }

            

//            _Parameters.Clear();
//            _Parameters["flagPost"] = "";
//            _Parameters["DES_Group"] = "MAINGROUP";
//            _Parameters["ctl00$ctl00$C$radDownloadTextFormat"] = "radDownloadTextFormat";
//            _Parameters["ctl00$ctl00$C$CW$IBCalendarDateTo$IBCalText"] = DateTime.Now.ToString("dd MMM yyyy", CultureInfo.InvariantCulture);
//            _Parameters["ctl00$ctl00$C$CW$IBCalendarDateTo$hidDateDisplay"] = DateTime.Now.ToString("dd MMM yyyy", CultureInfo.InvariantCulture);
//            _Parameters["ctl00$ctl00$C$CW$IBCalendarDateTo$hidDateValue"] = DateTime.Now.ToString("MM/dd/yyyy", CultureInfo.InvariantCulture);
//            _Parameters["ctl00$ctl00$C$CW$IBCalendarDateFrom$IBCalText"] = DateTime.Now.ToString("dd MMM yyyy", CultureInfo.InvariantCulture);
//            _Parameters["ctl00$ctl00$C$CW$IBCalendarDateFrom$hidDateDisplay"] = DateTime.Now.ToString("dd MMM yyyy", CultureInfo.InvariantCulture);
//            _Parameters["ctl00$ctl00$C$CW$IBCalendarDateFrom$hidDateValue"] = DateTime.Now.ToString("MM/dd/yyyy", CultureInfo.InvariantCulture);

//            _Parameters["ctl00$ctl00$C$CW$hidErrorMsg"] = "../images/ChequeImg_99_en.gif";
//            _Parameters["ctl00$ctl00$C$CW$btnOK"] = "OK";
//            _Parameters["ctl00$ctl00$C$CN$NavAcctActivity1$ddlAccount"] = _ddlAccount;
//            _Parameters["Be1stCardIndex"] = "";

//            _Parameters["AcctIndex"] = "";
//            _Parameters["AcctID"] = "";
//            _Parameters["__VIEWSTATEGENERATOR"] = __VIEWSTATEGENERATOR;
//            _Parameters["__VIEWSTATEENCRYPTED"] = "";
//            _Parameters["__VIEWSTATE"] = __VIEWSTATE;
//            _Parameters["__RequestVerificationToken"] = __RequestVerificationToken;

//            _Parameters["__PREVIOUSPAGE"] = __PREVIOUSPAGE;
//            _Parameters["__EVENTVALIDATION"] = __EVENTVALIDATION;
//            _Parameters["__EVENTTARGET"] = "";
//            _Parameters["__EVENTARGUMENT"] = "";

//            using (var response = Client.PostAsync(_accountUrl, _Parameters.ToFormEncodedData()).Result)
//            {
//                LastPage = response.Content.ReadAsStringAsync().Result;
//                _doc.LoadHtml(LastPage);
//                __RequestVerificationToken = _doc.DocumentNode.SelectSingleNode(@"//*[@id=""__RequestVerificationToken""]").GetAttributeValue("value", "");
//                __VIEWSTATE = _doc.DocumentNode.SelectSingleNode(@"//*[@id=""__VIEWSTATE""]").GetAttributeValue("value", "");
//                __VIEWSTATEGENERATOR = _doc.DocumentNode.SelectSingleNode(@"//*[@id=""__VIEWSTATEGENERATOR""]").GetAttributeValue("value", "");
//                __PREVIOUSPAGE = _doc.DocumentNode.SelectSingleNode(@"//*[@id=""__PREVIOUSPAGE""]").GetAttributeValue("value", "");
//                __EVENTVALIDATION = _doc.DocumentNode.SelectSingleNode(@"//*[@id=""__EVENTVALIDATION""]").GetAttributeValue("value", "");

//                Parse(LastPage, statements);
//            }

//            // Next page
//            bool isNext = true;
//            do
//            {
//                _Parameters.Clear();
//                _Parameters["flagPost"] = "";
//                _Parameters["DES_Group"] = "NOVALIDATE";
//                _Parameters["ctl00$ctl00$C$radDownloadTextFormat"] = "radDownloadTextFormat";
//                _Parameters["ctl00$ctl00$C$CW$IBCalendarDateTo$IBCalText"] = DateTime.Now.ToString("dd MMM yyyy", CultureInfo.InvariantCulture);
//                _Parameters["ctl00$ctl00$C$CW$IBCalendarDateTo$hidDateDisplay"] = DateTime.Now.ToString("dd MMM yyyy", CultureInfo.InvariantCulture);
//                _Parameters["ctl00$ctl00$C$CW$IBCalendarDateTo$hidDateValue"] = DateTime.Now.ToString("MM/dd/yyyy", CultureInfo.InvariantCulture);
//                _Parameters["ctl00$ctl00$C$CW$IBCalendarDateFrom$IBCalText"] = DateTime.Now.ToString("dd MMM yyyy", CultureInfo.InvariantCulture);
//                _Parameters["ctl00$ctl00$C$CW$IBCalendarDateFrom$hidDateDisplay"] = DateTime.Now.ToString("dd MMM yyyy", CultureInfo.InvariantCulture);
//                _Parameters["ctl00$ctl00$C$CW$IBCalendarDateFrom$hidDateValue"] = DateTime.Now.ToString("MM/dd/yyyy", CultureInfo.InvariantCulture);

//                _Parameters["ctl00$ctl00$C$CW$hidErrorMsg"] = "../images/ChequeImg_99_en.gif";
//                _Parameters["ctl00$ctl00$C$CW$btnNext"] = "Next";
//                _Parameters["ctl00$ctl00$C$CN$NavAcctActivity1$ddlAccount"] = _ddlAccount;
//                _Parameters["Be1stCardIndex"] = "";

//                _Parameters["AcctIndex"] = "";
//                _Parameters["AcctID"] = "";
//                _Parameters["__VIEWSTATEGENERATOR"] = __VIEWSTATEGENERATOR;
//                _Parameters["__VIEWSTATEENCRYPTED"] = "";
//                _Parameters["__VIEWSTATE"] = __VIEWSTATE;
//                _Parameters["__RequestVerificationToken"] = __RequestVerificationToken;

//                _Parameters["__PREVIOUSPAGE"] = __PREVIOUSPAGE;
//                _Parameters["__EVENTVALIDATION"] = __EVENTVALIDATION;
//                _Parameters["__EVENTTARGET"] = "";
//                _Parameters["__EVENTARGUMENT"] = "";

//                using (var response = Client.PostAsync(_accountUrl, _Parameters.ToFormEncodedData()).Result)
//                {
//                    LastPage = response.Content.ReadAsStringAsync().Result;
//                    _doc.LoadHtml(LastPage);
//                    __RequestVerificationToken = _doc.DocumentNode.SelectSingleNode(@"//*[@id=""__RequestVerificationToken""]").GetAttributeValue("value", "");
//                    __VIEWSTATE = _doc.DocumentNode.SelectSingleNode(@"//*[@id=""__VIEWSTATE""]").GetAttributeValue("value", "");
//                    __VIEWSTATEGENERATOR = _doc.DocumentNode.SelectSingleNode(@"//*[@id=""__VIEWSTATEGENERATOR""]").GetAttributeValue("value", "");
//                    __PREVIOUSPAGE = _doc.DocumentNode.SelectSingleNode(@"//*[@id=""__PREVIOUSPAGE""]").GetAttributeValue("value", "");
//                    __EVENTVALIDATION = _doc.DocumentNode.SelectSingleNode(@"//*[@id=""__EVENTVALIDATION""]").GetAttributeValue("value", "");

//                    isNext = Parse(LastPage, statements);
//               }
//            } while (isNext);

//            Console.Read();
//        }

//        public static bool Parse(string content, List<BBLStatement> records)
//        {
//            //var records = new StatementCollection();
//            //var xpathDetail = "html[1]/body[1]/div[4]/table[1]/tbody[1]/tr[3]/td[2]/table[1]/tbody[1]" +
//            //            "/tr[2]/td[1]/div[1]/div[2]/table[1]/tbody[1]/tr[1]/td[1]/div[2]/table[1]/tbody[1]" +
//            //            "/tr[1]/td[1]/table[1]/tbody[1]/tr[13]/td[1]/div[1]/div[1]/table[1]/tbody[1]/tr[position() >= 2]";

//            var xpathDetail = @"//*[@id=""ctl00_ctl00_C_CW_gvAccountTrans""]/tr[position() >= 2]";

//            _doc.LoadHtml(content);

//            var rows = _doc.DocumentNode.SelectNodes(xpathDetail);
//            if (rows != null)
//            {
//                foreach (var row in rows)
//                {
//                    if (row.Attributes["class"].Value.Contains("RowGridView"))
//                    {
//                        var fields = row.SelectNodes("./td[position() >= 2]");
//                        if (fields == null)
//                        {
//                            continue;
//                        }
//                        else
//                        {
//                            if (fields.Count == 6)
//                            {
//                                var stmt = new BBLStatement();
//                                // Date
//                                var dateNode = fields[0].SelectSingleNode("./span[1]");
//                                stmt.Date = MidasUtils.RemoveComma(ContentHelper.Clear(dateNode.InnerHtml));
//                                if (DateTime.Parse(stmt.Date).Date < DateTime.Now.Date) break;
//                                if (DateTime.Parse(stmt.Date).Date > DateTime.Now.Date) continue;
//                                // Description
//                                var descNode = fields[1].SelectSingleNode("./div[1]/div[1]/span[1]");
//                                stmt.Description = MidasUtils.RemoveComma(ContentHelper.Clear(descNode.InnerHtml));
//                                // Debit
//                                var debtNode = fields[2].SelectSingleNode("./span[1]");
//                                stmt.Debit = MidasUtils.RemoveComma((String.IsNullOrEmpty(debtNode.InnerHtml)) ? null : ContentHelper.Clear(debtNode.InnerHtml));
//                                //Credit
//                                var credNode = fields[3].SelectSingleNode("./span[1]");
//                                stmt.Credit = MidasUtils.RemoveComma((String.IsNullOrEmpty(credNode.InnerHtml)) ? null : ContentHelper.Clear(credNode.InnerHtml));
//                                //Balance
//                                var balcNode = fields[4].SelectSingleNode("./span[1]");
//                                stmt.Balance = MidasUtils.RemoveComma((String.IsNullOrEmpty(balcNode.InnerHtml)) ? null : ContentHelper.Clear(balcNode.InnerHtml));

//                                //Channel
//                                var chnlNode = fields[5].SelectSingleNode("./span[1]");
//                                stmt.Channel = MidasUtils.RemoveComma((String.IsNullOrEmpty(chnlNode.InnerHtml)) ? null : ContentHelper.Clear(chnlNode.InnerHtml));

//                                records.Add(stmt);
//                            }
//                        }
//                    }
//                    else
//                        continue;
//                }
//            }
//            if (records.Count % 20 == 0)
//                return true;
//            else
//                return false;
//        }

//        public static string HashPassword(string username, string password, string salt)
//        {
//            var md5Pwd = MidasUtils.GetMd5Hash(password).ToUpper();
//            return MidasUtils.GetSHA256(md5Pwd + salt) + MidasUtils.GetSHA256(MidasUtils.GetSHA256(md5Pwd + username.ToUpper()) + salt);
//        }
//        public static Parameters ParseLoginPage(string page)
//        {
//            return MidasUtils.ParseHiddenFieldsOfForm(page, "//form[@id='frm']");
//        }

//        public class MidasUtils
//        {
//            private static char[] DIGITS_LOWER = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f' };



//            public static string GetSHA256(string input)
//            {
//                SHA256 mySHA256 = SHA256Managed.Create();
//                var hash = mySHA256.ComputeHash(Encoding.ASCII.GetBytes(input));
//                return string.Join("", hash.Select(c => string.Format("{0:x2}", c)));
//            }

//            public static string GetMd5Hash(string input, bool isEncodeHex = false)
//            {
//                using (var md5Hash = MD5.Create())
//                {
//                    return GetMd5Hash(md5Hash, input, isEncodeHex);
//                }
//            }

//            public static string GetMd5Hash(MD5 md5Hash, string input, bool isEncodeHex = false)
//            {

//                // Convert the input string to a byte array and compute the hash.
//                byte[] data = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(input));
//                StringBuilder sBuilder = new StringBuilder();
//                if (!isEncodeHex)
//                {
//                    // Create a new Stringbuilder to collect the bytes
//                    // and create a string.

//                    // Loop through each byte of the hashed data 
//                    // and format each one as a hexadecimal string.
//                    for (int i = 0; i < data.Length; i++)
//                    {
//                        sBuilder.Append(data[i].ToString("x2"));
//                    }

//                    // Return the hexadecimal string.
//                    return sBuilder.ToString();
//                }
//                else
//                {
//                    var ar = encodeHex(data, DIGITS_LOWER);
//                    return new string(ar);
//                }
//            }

//            // Verify a hash against a string.
//            public static bool VerifyMd5Hash(string input, string hash)
//            {
//                using (var md5Hash = MD5.Create())
//                {
//                    // Hash the input.
//                    string hashOfInput = GetMd5Hash(md5Hash, input);

//                    // Create a StringComparer an compare the hashes.
//                    StringComparer comparer = StringComparer.OrdinalIgnoreCase;

//                    if (0 == comparer.Compare(hashOfInput, hash))
//                    {
//                        return true;
//                    }
//                    else
//                    {
//                        return false;
//                    }
//                }
//            }

//            protected static char[] encodeHex(byte[] data, char[] toDigits)
//            {
//                int l = data.Length;
//                char[] ar = new char[l << 1];
//                int i = 0;

//                for (int j = 0; i < l; ++i)
//                {
//                    ar[j++] = toDigits[(240 & data[i]) >> 4];
//                    ar[j++] = toDigits[15 & data[i]];
//                }

//                return ar;
//            }

//            public static string RemoveComma(string org)
//            {
//                if (string.IsNullOrWhiteSpace(org))
//                {
//                    return string.Empty;
//                }
//                return org.Replace(",", "").Trim();
//            }

//            public static string RemoveDot(string org)
//            {
//                if (string.IsNullOrWhiteSpace(org))
//                {
//                    return string.Empty;
//                }
//                return org.Replace(".", "").Trim();
//            }

//            public static string RemoveCommaAndDot(string org)
//            {
//                if (string.IsNullOrWhiteSpace(org))
//                {
//                    return string.Empty;
//                }
//                return org.Replace(",", "").Replace(".", "").Trim();
//            }

//            public static string RemoveNumberSign(string org)
//            {
//                if (string.IsNullOrWhiteSpace(org))
//                {
//                    return string.Empty;
//                }
//                return org.Replace("+", "").Replace("-", "").Trim();
//            }

//            public static string DecimalToCurrency(decimal? dec, string format = "C2")
//            {
//                return dec == null ? "" : dec.Value.ToString(format).Remove(0, 1);
//            }

//            public static CaptchaResult RecognizeCaptcha(HttpClient client, string captchaUrl, string captchaServiceUrl)
//            {
//                return Task.Run(async () => await RecognizeCaptchaAsync(client, captchaUrl, captchaServiceUrl)).Result;
//            }

//            public static async Task<CaptchaResult> RecognizeCaptchaAsync(HttpClient client, string captchaUrl, string captchaServiceUrl)
//            {
//                try
//                {
//                    var captcha = string.Empty;

//                    using (var rsp = await client.GetAsync(captchaUrl))
//                    {
//                        using (var img = CreateMultipartContent(await rsp.Content.ReadAsStreamAsync()))
//                        {
//                            using (var rsp2 = await client.PostAsync(captchaServiceUrl, img))
//                            {
//                                var str = rsp2.Content.ReadAsStringAsync().Result;
//                                var result = CaptchaResult.Deserialize(str);
//                                if (result.Status == TokenStatusEnum.Successful)
//                                {
//                                    return result;
//                                }
//                                else
//                                {
//                                    return new CaptchaResult()
//                                    {
//                                        Status = TokenStatusEnum.Failed
//                                    };
//                                }
//                            }
//                        }
//                    }
//                }
//                catch (Exception ex)
//                {
//                    return new CaptchaResult()
//                    {
//                        Status = TokenStatusEnum.Failed,
//                        Data = ex.Message
//                    };
//                }
//                //return new CaptchaResult();
//            }

//            public static MultipartFormDataContent CreateMultipartContent(Stream stream)
//            {
//                var content = new MultipartFormDataContent();
//                var image = new StreamContent(stream);
//                image.Headers.ContentDisposition = new ContentDispositionHeaderValue("form-data")
//                {
//                    Name = "\"captcha\"",
//                    FileName = "\"captcha.jpg\""
//                };
//                content.Add(image);
//                return content;
//            }

//            public static string GetDetailTime(int seconds)
//            {
//                if (seconds <= 0)
//                    return seconds + "s";

//                TimeSpan ts = new TimeSpan(0, 0, seconds);
//                string time = string.Empty;
//                if (ts.Hours != 0)
//                    time += string.Format("{0}h ", ts.Hours);
//                if (ts.Minutes != 0)
//                    time += string.Format("{0}m ", ts.Minutes);
//                if (ts.Seconds != 0)
//                    time += string.Format("{0}s", ts.Seconds);

//                return time;
//            }

//            public static Parameters ParseHiddenFieldsOfForm(string page, string xpath)
//            {
//                var hiddenFields = new Parameters();

//                var doc = new HtmlDocument();
//                doc.LoadHtml(page);
//                var form = doc.DocumentNode.SelectSingleNode(xpath);

//                if (form == null)
//                    throw new ArgumentException("can't find form with xpath '" + xpath + "'");

//                //var inputs = form.SelectNodes("//input=[@type='hidden']");
//                var inputs = form.SelectNodes("//input");
//                foreach (var input in inputs)
//                {
//                    var name = input.GetAttributeValue("name", "");
//                    var value = input.GetAttributeValue("value", "");

//                    hiddenFields[name] = value;
//                }

//                return hiddenFields;
//            }
//        }

//        public class Parameters : Dictionary<string, object>
//        {
//            public StringContent ToFormEncodedData()
//            {
//                return ToFormEncodedData(Encoding.UTF8);
//            }

//            public StringContent ToFormEncodedData(Encoding encoding)
//            {
//                return HttpUtils.CreateFormEncodedData(this, encoding);
//            }
//        }


//        public class HttpUtils
//        {

//            public static StringContent CreateFormEncodedData(NameValueCollection keyValues)
//            {
//                return CreateFormEncodedData(keyValues, Encoding.UTF8);
//            }

//            public static StringContent CreateFormEncodedData(NameValueCollection keyValues, Encoding encoding)
//            {
//                return CreateFormEncodedData(keyValues.ToQueryString(encoding));
//            }

//            public static StringContent CreateFormEncodedData(string queryString)
//            {
//                return CreateFormEncodedData(queryString, Encoding.UTF8);
//            }

//            public static StringContent CreateFormEncodedData(string queryString, Encoding encoding)
//            {
//                return new StringContent(queryString, encoding, Request.MediaTypes.FormEncodedData);
//            }

//            internal static StringContent CreateFormEncodedData(Parameters parameters)
//            {
//                return CreateFormEncodedData(parameters, Encoding.UTF8);
//            }

//            internal static StringContent CreateFormEncodedData(Parameters parameters, Encoding encoding)
//            {
//                return CreateFormEncodedData(parameters.ToQueryString(encoding));
//            }
//        }

//        [DataContract]
//        public class CaptchaResult
//        {

//            private static readonly DataContractJsonSerializer _serializer = new DataContractJsonSerializer(typeof(CaptchaResult));

//            [DataMember(Name = "status")]
//            public TokenStatusEnum Status { get; set; }

//            [DataMember(Name = "data")]
//            public string Data { get; set; }

//            public bool Error
//            {
//                get { return (int)Status < 1; }
//            }

//            public string Serialize()
//            {
//                using (var ms = new MemoryStream())
//                {
//                    _serializer.WriteObject(ms, this);
//                    return Encoding.UTF8.GetString(ms.ToArray());
//                }
//            }

//            public static CaptchaResult Deserialize(string json)
//            {
//                using (var stream = new MemoryStream(Encoding.UTF8.GetBytes(json)))
//                {
//                    return _serializer.ReadObject(stream) as CaptchaResult;
//                }
//            }
//        }
//        public static class HttpClientHelper
//        {
//            public static HttpClient CreateClient(CookieContainer cookies = null, int? timeoutSec = null,
//                bool autoRedirect = true)
//            {
//                var client =
//                    new HttpClient(new HttpClientHandler
//                    {
//                        CookieContainer = cookies ?? new CookieContainer(),
//                        AllowAutoRedirect = autoRedirect
//                    }) { Timeout = timeoutSec.HasValue ? new TimeSpan(0, 0, timeoutSec.Value) : new TimeSpan(0, 5, 0) };
//                client.DefaultRequestHeaders.UserAgent.TryParseAdd(Request.UserAgents.Chrome);
//                return client;
//            }
//        }
//    }

public enum TokenStatusEnum
{
    Failed = 0,
    Successful = 1
}

//    public static class Extensions
//    {
//        public static string ToQueryString(this NameValueCollection collection)
//        {
//            return ToQueryString(collection, Encoding.UTF8);
//        }

//        public static string ToQueryString(this NameValueCollection collection, Encoding encoding)
//        {
//            var array = (from key in collection.AllKeys
//                         from value in collection.GetValues(key)
//                         select string.Format("{0}={1}", HttpUtility.UrlEncode(key), HttpUtility.UrlEncode(value, encoding))).ToArray();
//            return string.Join("&", array);
//        }

//        public static string ToQueryString(this Dictionary<string, object> dictionary)
//        {
//            return ToQueryString(dictionary, Encoding.UTF8);
//        }

//        public static string ToQueryString(this Dictionary<string, object> dictionary, Encoding encoding)
//        {
//            var array = (from key in dictionary.Keys
//                         select string.Format("{0}={1}", HttpUtility.UrlEncode(key), HttpUtility.UrlEncode(dictionary[key].ToString(), encoding))).ToArray();
//            return string.Join("&", array);
//        }

//        public static string ToQueryString(this object obj)
//        {
//            return ToQueryString(obj, Encoding.UTF8);
//        }

//        public static string ToQueryString(this object obj, Encoding encoding)
//        {
//            var array = (from kv in obj.ToKeyValuePairs()
//                         select string.Format("{0}={1}", HttpUtility.UrlEncode(kv.Key), HttpUtility.UrlEncode(kv.Value, encoding)));
//            return string.Join("&", array);
//        }

//        public static IEnumerable<KeyValuePair<string, string>> ToKeyValuePairs(this object obj)
//        {
//            if (obj == null)
//                throw new ArgumentNullException("obj");

//            if (obj is IDictionary)
//            {
//                foreach (DictionaryEntry kv in (IDictionary)obj)
//                    yield return new KeyValuePair<string, string>(kv.Key.ToString(), kv.Value.ToString());
//            }
//            else
//            {
//                foreach (var prop in obj.GetType().GetProperties())
//                {
//                    yield return new KeyValuePair<string, string>(prop.Name, prop.GetValue(obj, null).ToString());
//                }
//            }
//        }

//        public static decimal ToDecimal(this string str)
//        {
//            var d = default(decimal);
//            if (!decimal.TryParse(str, out d))
//            {
//                d = default(decimal);
//            }
//            return d;
//        }
//    }


//    public class Request : IDisposable
//    {

//        private HttpClient _client;
//        private HttpRequestMessage _requestMessage;

//        private Request(HttpRequestMessage requestMessage, CookieContainer cookieContainer, bool autoRedirect, IWebProxy proxy, TimeSpan timeout)
//        {
//            _requestMessage = requestMessage;
//            _client = new HttpClient(new HttpClientHandler { CookieContainer = cookieContainer, AllowAutoRedirect = autoRedirect, Proxy = proxy, UseProxy = proxy != null });
//        }

//        public Task<HttpResponseMessage> SendAsync()
//        {
//            return _client.SendAsync(_requestMessage);
//        }

//        public void Dispose()
//        {
//            _requestMessage.Dispose();
//            _client.Dispose();
//        }

//        public class MediaTypes
//        {
//            public const string TextualData = "text/plain";
//            public const string FormEncodedData = "application/x-www-form-urlencoded";
//            public const string JavaScriptObjectNotation = "application/json";
//        }

//        public class UserAgents
//        {
//            public const string Chrome = "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36";
//        }

//        public class Builder
//        {

//            private HttpRequestMessage requestMessage;
//            private CookieContainer cookieContainer;
//            private bool autoRedirect = true;
//            private string requestUri;
//            private NameValueCollection queries;
//            private IWebProxy proxy;
//            private TimeSpan timeout;

//            public Builder()
//            {
//                requestMessage = new HttpRequestMessage();
//                requestMessage.Method = HttpMethod.Get;
//                timeout = new TimeSpan(0, 0, 60);
//                Header("User-Agent", Request.UserAgents.Chrome);
//            }

//            public Builder Timeout(TimeSpan timeout)
//            {
//                this.timeout = timeout;
//                return this;
//            }

//            public Builder Timeout(int seconds)
//            {
//                return Timeout(new TimeSpan(0, 0, seconds));
//            }

//            public Builder Url(string url)
//            {
//                requestUri = url;
//                return this;
//            }

//            public Builder Parameter(string name, object value)
//            {
//                if (queries == null)
//                {
//                    queries = new NameValueCollection();
//                }
//                queries[name] = value.ToString();
//                return this;
//            }

//            public Builder Header(string name, string value)
//            {
//                if (!requestMessage.Headers.Contains(name))
//                    requestMessage.Headers.Add(name, value);
//                return this;
//            }

//            public Builder Header(string name, IEnumerable<string> values)
//            {
//                requestMessage.Headers.Add(name, values);
//                return this;
//            }

//            public Builder Cookie(CookieContainer cookies)
//            {
//                cookieContainer = cookies;
//                return this;
//            }

//            public Builder Get()
//            {
//                requestMessage.Method = HttpMethod.Get;
//                return this;
//            }

//            public Builder Post()
//            {
//                if (queries == null)
//                    return Post(string.Empty);
//                return Post(queries.ToQueryString(Encoding.UTF8));
//            }

//            public Builder Post(object param)
//            {
//                return Post(param.ToQueryString(Encoding.UTF8));
//            }

//            public Builder Post(object param, Encoding encoding)
//            {
//                return Post(param.ToQueryString(Encoding.UTF8), encoding);
//            }

//            public Builder Post(object param, Encoding encoding, string mediaType)
//            {
//                return Post(param.ToQueryString(Encoding.UTF8), encoding, mediaType);
//            }

//            public Builder Post(byte[] body)
//            {
//                return Post(body, MediaTypes.TextualData);
//            }

//            public Builder Post(byte[] body, string mediaType)
//            {
//                return Post(body, mediaType, "utf-8");
//            }

//            public Builder Post(byte[] body, string mediaType, string charSet)
//            {
//                requestMessage.Method = HttpMethod.Post;
//                requestMessage.Content = new ByteArrayContent(body);
//                requestMessage.Content.Headers.ContentType = new MediaTypeHeaderValue(mediaType)
//                {
//                    CharSet = charSet
//                };
//                return this;
//            }

//            public Builder Post(string body)
//            {
//                return Post(body, Encoding.UTF8);
//            }

//            public Builder Post(string body, Encoding encoding)
//            {
//                return Post(body, encoding, MediaTypes.FormEncodedData);
//            }

//            public Builder Post(string body, Encoding encoding, string mediaType)
//            {
//                requestMessage.Method = HttpMethod.Post;
//                requestMessage.Content = new StringContent(body, encoding, mediaType);
//                return this;
//            }

//            public Builder AutoRedirect(bool allow)
//            {
//                autoRedirect = allow;
//                return this;
//            }

//            public Builder Proxy(IWebProxy proxy)
//            {
//                this.proxy = proxy;
//                return this;
//            }

//            public Request Build()
//            {
//                if (cookieContainer == null)
//                    cookieContainer = new CookieContainer();
//                if (requestMessage.Method == HttpMethod.Get && queries != null)
//                {
//                    requestMessage.RequestUri = new Uri(requestUri + "?" + queries.ToQueryString(Encoding.UTF8));
//                }
//                else
//                {
//                    requestMessage.RequestUri = new Uri(requestUri);
//                }
//                return new Request(requestMessage, cookieContainer, autoRedirect, proxy, timeout);
//            }
//        }
//    }

//    public static class ContentHelper
//    {

//        private static Regex _replaceNewlinesRegex = new Regex("<br.*?>", RegexOptions.Compiled);
//        private static Regex _removeAllTagsRegex = new Regex("<[^>]*>", RegexOptions.Compiled);
//        private static Regex _removeWhitespacesRegex = new Regex(@"\s+", RegexOptions.Compiled);

//        public static string ReplaceNewlines(string src)
//        {
//            return _replaceNewlinesRegex.Replace(src, " ");
//        }

//        public static string Clear(string src, string spaceReplacement = "")
//        {
//            var tmp = _removeAllTagsRegex.Replace(src, string.Empty);
//            tmp = HttpUtility.HtmlDecode(tmp);
//            return tmp.Trim();
//            //return removeWhitespacesRegex.Replace(tmp, spaceReplacement);
//        }

//        public static NameValueCollection FindCollections(string source, Regex regex)
//        {
//            var matchers = regex.Matches(source);
//            if (matchers.Count == 0)
//            {
//                return null;
//            }
//            var result = new NameValueCollection();
//            foreach (Match matcher in matchers)
//            {
//                if (matcher.Success)
//                {
//                    result[matcher.Groups[1].Value] = matcher.Groups[2].Value;
//                }
//            }
//            return result;
//        }

//        //public static Parameters FindCollections2(string source, Regex regex) {
//        //    var matchers = regex.Matches(source);
//        //    if (matchers.Count == 0) {
//        //        return null;
//        //    }
//        //    var result = new Parameters();
//        //    foreach (Match matcher in matchers) {
//        //        if (matcher.Success) {
//        //            result[matcher.Groups[1].Value] = matcher.Groups[2].Value;
//        //        }
//        //    }
//        //    return result;
//        //}

//        public static string DefaultMerge(params string[] fields)
//        {
//            return Merge("@#$", "null", fields);
//        }

//        public static string DefaultMergeList(List<string> fields)
//        {
//            return Merge("@#$", "null", fields.ToArray());
//        }

//        public static string Merge(string sperator, string nil, string[] fields)
//        {
//            var result = new StringBuilder();
//            for (var i = 0; i < fields.Length; i++)
//            {
//                var field = fields[i];
//                if (string.IsNullOrWhiteSpace(field))
//                {
//                    result.Append(nil);
//                }
//                else
//                {
//                    result.Append(EnsureNil(Clear(field), nil));
//                }
//                if (i < fields.Length - 1)
//                    result.Append(sperator);
//            }
//            return result.ToString();
//        }

//        public static string EnsureNil(string source, string nil)
//        {
//            if (string.IsNullOrWhiteSpace(source))
//            {
//                return nil;
//            }
//            return source;
//        }

//        public static string EncodeNonAsciiCharacters(string value)
//        {
//            StringBuilder sb = new StringBuilder();
//            foreach (char c in value)
//            {
//                if (c > 127)
//                {
//                    // This character is too big for ASCII
//                    string encodedValue = "\\u" + ((int)c).ToString("x4");
//                    sb.Append(encodedValue);
//                }
//                else
//                {
//                    sb.Append(c);
//                }
//            }
//            return sb.ToString();
//        }

//        public static string DecodeEncodedNonAsciiCharacters(string value)
//        {
//            StringBuilder sb = new StringBuilder();
//            var arr = value.Split(new string[] { @"\u" }, StringSplitOptions.RemoveEmptyEntries);
//            foreach (var item in arr)
//            {
//                sb.Append(string.Format("&#x{0};", item));
//            }

//            return WebUtility.HtmlDecode(sb.ToString());
//        }



//        public static string DecodeFromUtf8(this string utf8String)
//        {
//            // copy the string as UTF-8 bytes.
//            byte[] utf8Bytes = new byte[utf8String.Length];
//            for (int i = 0; i < utf8String.Length; ++i)
//            {
//                //Debug.Assert( 0 <= utf8String[i] && utf8String[i] <= 255, "the char must be in byte's range");
//                utf8Bytes[i] = (byte)utf8String[i];
//            }

//            return Encoding.UTF8.GetString(utf8Bytes, 0, utf8Bytes.Length);
//        }
//    }

//    [DataContract]
//    public class BBLStatement
//    {

//        private static DataContractJsonSerializer _serializer = new DataContractJsonSerializer(typeof(BBLStatement));

//        [DataMember(Name = "date", EmitDefaultValue = false)]
//        public String Date { get; set; }
//        [DataMember(Name = "description", EmitDefaultValue = false)]
//        public String Description { get; set; }
//        [DataMember(Name = "debit", EmitDefaultValue = false)]
//        public String Debit { get; set; }
//        [DataMember(Name = "credit", EmitDefaultValue = false)]
//        public String Credit { get; set; }
//        [DataMember(Name = "balance", EmitDefaultValue = false)]
//        public String Balance { get; set; }
//        [DataMember(Name = "channel", EmitDefaultValue = false)]
//        public String Channel { get; set; }

//        override public string ToString()
//        {
//            using (var ms = new MemoryStream())
//            {
//                _serializer.WriteObject(ms, this);
//                return Encoding.UTF8.GetString(ms.ToArray());
//            }
//        }

//        public BBLStatement Deserialize(string str)
//        {
//            byte[] byteArray = Encoding.UTF8.GetBytes(str);
//            using (var ms = new MemoryStream(byteArray))
//            {
//                var obj = _serializer.ReadObject(ms);
//                return obj as BBLStatement;
//            }
//        }

//        public decimal GetIncomingFund(string str, DateTime date)
//        {
//            try
//            {
//                BBLStatement st = Deserialize(str) as BBLStatement;

//                if (DateTime.Parse(st.Date).Date == date.Date)
//                {
//                    return Convert.ToDecimal(st.Debit);
//                }
//                else
//                {
//                    return 0;
//                }
//            }
//            catch (Exception)
//            {
//                return 0;
//            }
//        }

//        public decimal GetPayOut(string str, DateTime date)
//        {
//            try
//            {
//                BBLStatement st = Deserialize(str) as BBLStatement;

//                if (DateTime.Parse(st.Date).Date == date.Date)
//                {
//                    return Convert.ToDecimal(st.Credit);
//                }
//                else
//                {
//                    return 0;
//                }
//            }
//            catch (Exception)
//            {
//                return 0;
//            }
//        }
//    }
//}
