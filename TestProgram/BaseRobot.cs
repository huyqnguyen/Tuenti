
using Interceptor;
using OpenQA.Selenium;
using OpenQA.Selenium.IE;
using OpenQA.Selenium.Support.UI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace TestProgram
{
    public abstract class BaseChineseRobot
    {
        private static bool _isKeyAvailable;
        private static bool _isMouseAvailable;
        protected static Input Input = new Input();
        protected IJavaScriptExecutor JsDriver;
        protected WebDriverWait WaitDriver;
        public string AccountId;
        private bool disposed = false;
        protected BaseChineseRobot()
        {
            InitInput();
        }

        protected virtual IWebDriver WebDriver { get; set; }

        protected abstract void DoLogin();

        public virtual void Logout()
        {
        }

        public void Login()
        {
            try
            {
                DoLogin();
            }
            catch (Exception)
            {
                //Do nothing
            }
            finally
            {
                //if (WebDriver != null) WebDriver.Quit();
                //if (Input != null) Input.Unload();
            }
        }

        protected List<System.Net.Cookie> GetCookiesFromSeleniumDriver()
        {
            var cookies =
                WebDriver.Manage()
                    .Cookies.AllCookies.Select(item => new System.Net.Cookie(item.Name, item.Value, item.Path, item.Domain))
                    .ToList();
            return cookies;
        }

        protected string GetCookieRawFromSeleniumDriver()
        {
            var cookies =
                WebDriver.Manage()
                    .Cookies.AllCookies.Select(item => new Cookie(item.Name, item.Value))
                    .ToList();
            return string.Join("; ", cookies.Select(x => string.Format("{0}={1}", x.Name, x.Value)));
        }

        public void InitSeleniumDriver()
        {
            var options = new InternetExplorerOptions();
            //var proxy = new Proxy
            //{
            //    HttpProxy = string.Format("{0} {1}", "192.168.102.213", "8100"),
            //    SslProxy = string.Format("{0} {1}", "192.168.102.213", "8100"),
            //};
            //options.Proxy = proxy;
            options.IntroduceInstabilityByIgnoringProtectedModeSettings = true;
            WebDriver = new InternetExplorerDriver(options);
            WaitDriver = new WebDriverWait(WebDriver, new TimeSpan(0, 3, 0));
            JsDriver = WebDriver as IJavaScriptExecutor;
        }

        private void InitInput()
        {
            if (_isKeyAvailable && _isMouseAvailable)
                return;
            Input.OnMouseDetected += input_OnMouseDetected;
            Input.OnKeyboardDetected += input_OnKeyboardDetected;

            // Be sure to set your keyboard filter to be able to capture key presses and simulate key presses
            // KeyboardFilterMode.All captures all events; 'Down' only captures presses for non-special keys; 'Up' only captures releases for non-special keys; 'E0' and 'E1' capture presses/releases for special keys
            Input.KeyboardFilterMode = KeyboardFilterMode.All;
            Input.MouseFilterMode = MouseFilterMode.All;
            Input.Load();
            while (!_isKeyAvailable || !_isMouseAvailable)
            {
                Thread.Sleep(100);
            }
        }

        private static void input_OnKeyboardDetected(object sender, DeviceActivatedEventArgs e)
        {
            Console.WriteLine("Keyboard detected with deviceId {0}", e.DeviceId);
            _isKeyAvailable = true;
        }

        private static void input_OnMouseDetected(object sender, DeviceActivatedEventArgs e)
        {
            Console.WriteLine("Mouse detected with deviceId {0}", e.DeviceId);
            _isMouseAvailable = true;
        }

        public void Dispose()
        {
            Dispose(true);
            // Suppress finalization.
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposed)
                return;
            if (disposing)
            {
                WebDriver.Quit();
            }
            disposed = true;
        }
    }
}
