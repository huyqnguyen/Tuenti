using HtmlAgilityPack;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Json;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Script.Serialization;

namespace TestProgram
{
    class Program
    {

        private static readonly Lazy<Regex> REG_CSRF = new Lazy<Regex>(() => new Regex(@"name=""csrf_token_newib"" value=""(.*?)"" />", RegexOptions.Compiled));
        private static readonly Lazy<Regex> REG_HTML_NEWLINE = new Lazy<Regex>(() => new Regex(@"<\/?\s?br\s?\/?>", RegexOptions.Compiled));

        private static string _csrf = "";
        private static string _balance = "";
        public static HttpClient Client { get; set; }
        public static CookieContainer Cookies;
        static void Main(string[] args)
        {
            Cookies = new CookieContainer();
            Client = new HttpClient(new HttpClientHandler { CookieContainer = Cookies, AllowAutoRedirect = true })
            {
                Timeout = new TimeSpan(0, 3, 0)
            };
            Client.DefaultRequestHeaders.UserAgent.TryParseAdd(Request.UserAgents.Chrome);


            var loginUrl = "https://ib.bri.co.id/ib-bri/Login.html";
            var captchaUrl = "https://ib.bri.co.id/ib-bri/login/captcha";

            using (var rsp = Client.GetAsync(loginUrl).Result)
            {
                var page = rsp.Content.ReadAsStringAsync().Result;

                var matcher = REG_CSRF.Value.Match(page);

                _csrf = matcher.Groups[1].Value;

            }
            string CaptchaMidasService = string.Format("{0}/Captcha/GetCaptchaResult", "http://192.168.102.247:8001");
            //var captcha = await RecognizeCaptchaAsync(Client, captchaUrl);
            var captcha = RecognizeCaptchaAsync(Client, captchaUrl, CaptchaMidasService);
            if (captcha.Error)
            {
                Console.WriteLine("Captcha Error");
            }

            Random rnd = new Random();
            var loginParams = new Parameters();
            loginParams["csrf_token_newib"] = _csrf;
            loginParams["j_password"] = "shen1045";
            loginParams["j_username"] = "Shenny3101";
            loginParams["j_plain_username"] = "Shenny3101";
            //loginParams["j_password"] = "albern329088";
            //loginParams["j_username"] = "genesi2309";
            //loginParams["j_plain_username"] = "genesi2309";
            loginParams["j_plain_password"] = "";
            loginParams["j_captcha"] = captcha.Data;
            loginParams["j_language"] = "en_US";
            loginParams["x"] = rnd.Next(1, 100).ToString();
            loginParams["y"] = rnd.Next(1, 24).ToString();
            string LastPage = "";
            using (var rsp = Client.PostAsync("https://ib.bri.co.id/ib-bri/Homepage.html",
                                                            loginParams.ToFormEncodedData()).Result)
            {
                LastPage = rsp.Content.ReadAsStringAsync().Result;
                File.WriteAllText("WaitTenMinutes.html", LastPage);
                if (LastPage.Contains("please wait 10 minutes"))
                    Console.WriteLine("please wait 10 minutes");
                if (!LastPage.Contains("Welcome to BRI Internet Banking"))
                    Console.WriteLine("Login failed");
                //    return new ReturnObject(MonitorRequestStatus.LoginFailed, null, "Welcome to BRI Internet Banking");
            }

            var response = Client.GetAsync("https://ib.bri.co.id/ib-bri/MyAccount.html").Result;

            using (var rsp = Client.GetAsync("https://ib.bri.co.id/ib-bri/BalanceInquiry.html").Result)
            {
                LastPage = rsp.Content.ReadAsStringAsync().Result;
                File.WriteAllText("LoginComplete.html", LastPage);
                var matcher = REG_CSRF.Value.Match(LastPage);
                _csrf = matcher.Groups[1].Value;

                var doc = new HtmlDocument();
                doc.LoadHtml(LastPage);
                var rows = doc.DocumentNode.SelectNodes("html[1]/body[1]/div[1]/div[4]/div[2]/table[1]/tbody[1]/tr");

                if (rows != null)
                {
                    for (int i = 0; i < rows.Count; i++)
                    {
                        var row = rows[i];
                        var fields = row.SelectNodes("./td");
                        var accNo = ContentHelper.Clear(fields[0].InnerHtml, " ").Trim();
                        //if (accNo == "012201000644569")
                        if (accNo == "210201000187565")
                        {
                            _balance = ContentHelper.Clear(fields[4].InnerHtml, " ").Trim();
                            break;
                        }

                    }
                }
                else
                {
                    Console.WriteLine("parse failed", LastPage);
                }

            }

            using (var rsp = Client.GetAsync("https://ib.bri.co.id/ib-bri/AccountStatement.html").Result)
            {
                LastPage = rsp.Content.ReadAsStringAsync().Result;
                var matcher = REG_CSRF.Value.Match(LastPage);
                _csrf = matcher.Groups[1].Value;
            }
            var FromDate = DateTime.Now;
            var ToDate = DateTime.Now;
            var reportParams = new Parameters();
            reportParams["csrf_token_newib"] = _csrf;
            reportParams["FROM_DATE"] = FromDate.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture);
            reportParams["TO_DATE"] = ToDate.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture);
            reportParams["download"] = "";
            //reportParams["ACCOUNT_NO"] = "012201000644569";
            reportParams["ACCOUNT_NO"] = "210201000187565";
            reportParams["VIEW_TYPE"] = "2";
            reportParams["DDAY1"] = FromDate.Day.ToString("00");
            reportParams["DMON1"] = FromDate.Month.ToString("00");
            reportParams["DYEAR1"] = FromDate.Year.ToString("0000");
            reportParams["DDAY2"] = ToDate.Day.ToString("00");
            reportParams["DMON2"] = ToDate.Month.ToString("00");
            reportParams["DYEAR2"] = ToDate.Year.ToString("0000");
            reportParams["MONTH"] = DateTime.Now.Month.ToString("00");
            reportParams["YEAR"] = DateTime.Now.Year.ToString("0000");
            reportParams["submitButton"] = DateTime.Now.Year.ToString("View");

            using (var rsp = Client.PostAsync("https://ib.bri.co.id/ib-bri/Br11600d.html",
                                                               reportParams.ToFormEncodedData()).Result)
            {
                LastPage = rsp.Content.ReadAsStringAsync().Result;
                File.WriteAllText("AccountMutation.html", LastPage);
                if (!LastPage.Contains("Account Mutation"))
                {
                    Console.WriteLine("page does not contain keyworkd \"Account Mutation\".");
                }

                var test = Parse(LastPage);
            }

            var response1 = Client.GetAsync("https://ib.bri.co.id/ib-bri/login/logout").Result;

            using (var rsp = Client.GetAsync("https://ib.bri.co.id/ib-bri/en/logout.htm").Result)
            {
                var page = rsp.Content.ReadAsStringAsync().Result;
                if (page.Contains("Thank You"))
                    Console.WriteLine("Logout finished !");
                else
                    Console.WriteLine("page does not contain keyword \"Thank You\".");
            }

            Console.WriteLine("finish");
            Console.Read();
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

        public static StatementCollection Parse(string content)
        {
            var statements = new StatementCollection();
            statements.Balance = _balance;
            var doc = new HtmlDocument();
            doc.LoadHtml(content);
            var rows = doc.DocumentNode.SelectNodes("/html[1]/body[1]/div[1]/div[4]/div[1]/div[2]/table[1]/tbody[1]/tr[position()>1]");
            if (rows != null)
            {
                for (int i = 0; i < rows.Count - 2; i++)
                {
                    var row = rows[i];
                    var fields = row.SelectNodes("./td");
                    if (fields == null)
                    {
                        continue;
                    }
                    // data/transaction/debit/credit/balance
                    if (fields.Count == 5)
                    {
                        var statement = new Statement();
                        statement.ID = RemoveComma(CryptographyHelper.MD5(row.InnerHtml));
                        statement.Date = RemoveComma(ContentHelper.Clear(fields[0].InnerHtml, " "));

                        statement.Description = RemoveComma(ContentHelper.Clear(fields[1].InnerHtml, " "));
                        statement.Debit = ContentHelper.Clear(fields[2].InnerHtml).Replace(".", "").Replace(",", ".");
                        statement.Credit = ContentHelper.Clear(fields[3].InnerHtml).Replace(".", "").Replace(",", ".");
                        statement.Balance = ContentHelper.Clear(fields[4].InnerHtml).Replace(".", "").Replace(",", ".");
                        statements.Add(statement);
                    }
                }
            }

            statements.Balance = (statements[statements.Count - 1] as Statement).Balance;

            return statements;
        }

        public sealed class CryptographyHelper
        {

            public static string MD5(string source, int offset = 0, int count = -1)
            {
                using (var algorithm = System.Security.Cryptography.MD5.Create())
                {
                    return ComputeHash(algorithm, source, offset, count);
                }
            }

            public static string SHA1(string source, int offset = 0, int count = -1)
            {
                using (var algorithm = System.Security.Cryptography.SHA1.Create())
                {
                    return ComputeHash(algorithm, source, offset, count);
                }
            }

            public static string RSAEncrypt(string source, string xmlKey)
            {
                using (var rsa = new RSACryptoServiceProvider(1024))
                {
                    rsa.FromXmlString(xmlKey);
                    var encrypted = rsa.Encrypt(Encoding.UTF8.GetBytes(source), false);
                    return BytesToHex(encrypted);
                }
            }

            public static string ComputeHash(HashAlgorithm algorithm, string source, int offset = 0, int count = -1)
            {
                var bytes = Encoding.UTF8.GetBytes(source);
                if (count <= 0)
                {
                    count = bytes.Length;
                }
                var data = algorithm.ComputeHash(bytes);
                var sb = new StringBuilder();
                foreach (var b in data)
                {
                    sb.Append(b.ToString("x2"));
                }
                return sb.ToString();
            }

            public static string BytesToHex(byte[] bytes)
            {
                return string.Concat(bytes.Select(b => b.ToString("x2")).ToArray());
            }

            public static byte[] HexStrToBytes(string hex)
            {
                return hex.Where(x => x % 2 == 0).Select(x => Convert.ToByte(hex.Substring(x, 2), 16)).ToArray();
                //return Enumerable.Range(0, hex.Length).Where(x => x % 2 == 0).Select(x => Convert.ToByte(hex.Substring(x, 2), 16)).ToArray();
            }
        }

        public static string RemoveComma(string org)
        {
            if (string.IsNullOrWhiteSpace(org))
            {
                return string.Empty;
            }
            return org.Replace(",", "").Trim();
        }

        public static CaptchaResult RecognizeCaptchaAsync(HttpClient client, string captchaUrl, string captchaServiceUrl)
        {
            try
            {
                var captcha = string.Empty;

                using (var rsp = client.GetAsync(captchaUrl).Result)
                {
                    using (var img = CreateMultipartContent(rsp.Content.ReadAsStreamAsync().Result))
                    {
                        using (var rsp2 = client.PostAsync(captchaServiceUrl, img).Result)
                        {
                            var str = rsp2.Content.ReadAsStringAsync().Result;
                            var result = CaptchaResult.Deserialize(str);
                            if (result.Status == 1)
                            {
                                return result;
                            }
                            else
                            {
                                return new CaptchaResult()
                                {
                                    Status = 0
                                };
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return new CaptchaResult()
                {
                    Status = 0,
                    Data = ex.Message
                };
            }
            //return new CaptchaResult();
        }

        public static MultipartFormDataContent CreateMultipartContent(Stream stream)
        {
            var content = new MultipartFormDataContent();
            var image = new StreamContent(stream);
            //var fileStream = new FileStream("captcha.png", FileMode.Create, FileAccess.Write);
            //stream.CopyTo(fileStream);
            //fileStream.Dispose();

            image.Headers.ContentDisposition = new ContentDispositionHeaderValue("form-data")
            {
                Name = "\"captcha\"",
                FileName = "\"captcha.jpg\""
            };
            content.Add(image);
            return content;
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
    }



    [DataContract]
    public class CaptchaResult
    {

        private static readonly DataContractJsonSerializer _serializer = new DataContractJsonSerializer(typeof(CaptchaResult));

        [DataMember(Name = "status")]
        public int Status { get; set; }

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
                _serializer.WriteObject(ms, this);
                return Encoding.UTF8.GetString(ms.ToArray());
            }
        }

        public static CaptchaResult Deserialize(string json)
        {
            using (var stream = new MemoryStream(Encoding.UTF8.GetBytes(json)))
            {
                return _serializer.ReadObject(stream) as CaptchaResult;
            }
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



        public static string DecodeFromUtf8(this string utf8String)
        {
            // copy the string as UTF-8 bytes.
            byte[] utf8Bytes = new byte[utf8String.Length];
            for (int i = 0; i < utf8String.Length; ++i)
            {
                //Debug.Assert( 0 <= utf8String[i] && utf8String[i] <= 255, "the char must be in byte's range");
                utf8Bytes[i] = (byte)utf8String[i];
            }

            return Encoding.UTF8.GetString(utf8Bytes, 0, utf8Bytes.Length);
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

    [DataContract]
    public class Statement : IStatement
    {
        private const char Quote = '"';
        private static readonly DataContractJsonSerializer Serializer = new DataContractJsonSerializer(typeof(Statement));
        private static readonly char[] SpecialChars = { ',', '"', '\r', '\n' };
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
            return formattedDescription;
        }
    }
}
