using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Windows.Automation;
using System.Windows;
using OpenQA.Selenium.Support.UI;
using OpenQA.Selenium;
using System.Threading;
using Astro.Core;
namespace TestProgram
{
    public class IcbcRobot : BaseChineseRobot
    {
        private static readonly Regex VerificationRegex =
            new Regex(@"location.href=""(.*)&imageAlt=Refresh verification code", RegexOptions.Compiled);

        private string Cookie;
        private string Dse_sessionId;

        public IcbcRobot()
            : base()
        {
        }

        private static AutomationElement GetRootHtmlDocPanel
        {
            get
            {
                var htmlDocPanel = AutomationElement.RootElement.FindFirst(TreeScope.Descendants,
                    new PropertyCondition(AutomationElement.ClassNameProperty, "TabWindowClass"));
                return htmlDocPanel;
            }
        }

        private Point GetLogonPasswordPoint()
        {
            var htmlDocPanel = GetRootHtmlDocPanel;

            var logonAutomationElement = htmlDocPanel.FindFirst(TreeScope.Descendants,
                new PropertyCondition(AutomationElement.ClassNameProperty, "ATL:Edit"));
            return logonAutomationElement.GetClickablePoint();
        }

        private System.Windows.Point GetVerificationCodePoint()
        {
            var htmlDocPanel = GetRootHtmlDocPanel;

            var verificationAutomationElement =
                htmlDocPanel.FindAll(TreeScope.Descendants,
                    new PropertyCondition(AutomationElement.ClassNameProperty, "ATL:Edit"))[1];
            return verificationAutomationElement.GetClickablePoint();
        }

        private string GetVerificationUrl()
        {
            var match = VerificationRegex.Match(WebDriver.PageSource);
            var urlVerification = string.Empty;
            if (match.Success)
            {
                urlVerification = match.Groups[1].Value;
            }
            urlVerification = urlVerification.Replace("Verifyimage2?", "Verifyimage2?disFlag=2&isCn=0&");
            return urlVerification;
        }

        protected override void DoLogin()
        {
            InitSeleniumDriver();
            WebDriver.Navigate().GoToUrl(@"https://mybank.icbc.com.cn/icbc/enperbank/index.jsp");

            Console.WriteLine("start");

            WebDriver.SwitchTo().Frame("indexFrame");
            var userNameTextbox = WaitDriver.Until(ExpectedConditions.ElementIsVisible(By.Id("logonCardNum")));

            userNameTextbox.SendKeys("asdfr159");

            var logonPasswordPoint = GetLogonPasswordPoint();
            Input.MoveMouseTo((int)logonPasswordPoint.X, (int)logonPasswordPoint.Y);
            Input.SendLeftClick();
            Input.KeyPressDelay = 50; // See below for explanation; not necessary in non-game apps
            Input.SendText("aa485412");

            Thread.Sleep(100);

            var verificationCodePoint = GetVerificationCodePoint();
            Input.MoveMouseTo((int)verificationCodePoint.X, (int)verificationCodePoint.Y);
            Input.SendLeftClick();
            var cookies = GetCookiesFromSeleniumDriver();
            var urlVerification = GetVerificationUrl();
            var captcha = CaptchaRecognizer.GetICBCCaptcha(urlVerification, cookies);
            Input.SendText(captcha);
            var loginElement = WaitDriver.Until(ExpectedConditions.ElementToBeClickable(By.Id("submitaid")));
            loginElement.Click();
        }
    }
}
