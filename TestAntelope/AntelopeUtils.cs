using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows;
//using System.Windows.Automation;
using System.Windows.Forms;

namespace Antelope.Core
{
    public class AntelopeUtils
    {
        public static string GetCommandOutput(string command, string arguments)
        {
            var result = "";

            var proc = new Process()
            {
                StartInfo = new ProcessStartInfo()
                {
                    FileName = command,
                    Arguments = arguments,
                    UseShellExecute = false,
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    CreateNoWindow = true
                }
            };

            proc.Start();

            while (!proc.StandardOutput.EndOfStream)
            {
                result += proc.StandardOutput.ReadToEnd();
            }

            return result;
        }

        public static void KillProcesses(string processName)
        {
            var runningProcesses = Process.GetProcessesByName(processName);
            foreach (var proc in runningProcesses)
            {
                proc.Kill();
            }
        }

        //public static void InsertTextUsingUIAutomation(AutomationElement element, string value, bool flag = false)
        //{
        //    try
        //    {
        //        // Validate arguments / initial setup
        //        if (value == null)
        //            throw new ArgumentNullException(
        //                "String parameter must not be null.");

        //        if (element == null)
        //            throw new ArgumentNullException(
        //                "AutomationElement parameter must not be null");

        //        // A series of basic checks prior to attempting an insertion.
        //        //
        //        // Check #1: Is control enabled?
        //        // An alternative to testing for static or read-only controls 
        //        // is to filter using 
        //        // PropertyCondition(AutomationElement.IsEnabledProperty, true) 
        //        // and exclude all read-only text controls from the collection.
        //        if (!element.Current.IsEnabled)
        //        {
        //            throw new InvalidOperationException(
        //                "The control with an AutomationID of "
        //                + element.Current.AutomationId.ToString()
        //                + " is not enabled.\n\n");
        //        }

        //        // Check #2: Are there styles that prohibit us 
        //        //           from sending text to this control?
        //        if (!element.Current.IsKeyboardFocusable)
        //        {
        //            throw new InvalidOperationException(
        //                "The control with an AutomationID of "
        //                + element.Current.AutomationId.ToString()
        //                + "is read-only.\n\n");
        //        }

        //        object valuePattern = null;
        //        if (!element.TryGetCurrentPattern(ValuePattern.Pattern, out valuePattern))
        //        {


        //        }
        //        else
        //        {
        //            element.SetFocus();

        //            if (flag)
        //                ((ValuePattern)valuePattern).SetValue(value);
        //            else
        //                SendKeys.SendWait(value);
        //        }
        //    }
        //    catch (ArgumentNullException exc)
        //    {
        //        Console.WriteLine(exc.Message);
        //    }
        //    catch (InvalidOperationException exc)
        //    {
        //        Console.WriteLine(exc.Message);
        //    }
        //    finally
        //    {
        //    }
        //}

        public static void EnterKeysByVirtualKeyboard(string text, bool delayBetweenCharacters = false)
        {
            Process p = new Process();
            p.StartInfo.FileName = "cscript";
            var args = string.Format(@"D:\dsf\usbhid\Antelope.VirtualKeyboard.wsf ""{0}""", text);
            Console.WriteLine(args);
            if (delayBetweenCharacters)
                args = string.Format(@"{0} """"", args);
            p.StartInfo.Arguments = args;
            p.StartInfo.CreateNoWindow = true;
            p.StartInfo.UseShellExecute = false;            
            p.StartInfo.RedirectStandardOutput = true;
            p.StartInfo.RedirectStandardError = true;
            p.Start();
            p.WaitForExit();

            string output = p.StandardOutput.ReadToEnd();
            string err = p.StandardError.ReadToEnd();
            Console.WriteLine("Out put " + output);
            Console.WriteLine("Error " + err);
        }

        //public static void EnterIntoRect(Rect rect, string value, bool delayBetweenCharacters = false)
        //{
        //    var xpos = rect.X + rect.Width / 2;
        //    var ypos = rect.Y + rect.Height / 2;

        //    EnterIntoPoint((int)xpos, (int)ypos, value, delayBetweenCharacters);
        //}

        //public static void EnterIntoRect(Rectangle rect, string value, bool delayBetweenCharacters = false)
        //{
        //    var xpos = (rect.X + rect.Width) / 2;
        //    var ypos = (rect.Y + rect.Height) / 2;

        //    EnterIntoPoint(xpos, ypos, value);
        //}

        //public static void EnterIntoPoint(int xpos, int ypos, string value, bool delayBetweenCharacters = false)
        //{
        //    //Console.WriteLine("Click at {0}, {1}", xpos, ypos);
        //    Win32Api.LeftMouseClick(xpos, ypos);
        //    Thread.Sleep(500);
        //    AntelopeUtils.EnterKeysByVirtualKeyboard(value, delayBetweenCharacters);
        //    Thread.Sleep(500);
        //}

        //public static void SetSelectedComboBoxItem(AutomationElement comboBox, string item)
        //{
        //    AutomationPattern automationPatternFromElement = GetSpecifiedPattern(comboBox, "ExpandCollapsePatternIdentifiers.Pattern");

        //    ExpandCollapsePattern expandCollapsePattern = comboBox.GetCurrentPattern(automationPatternFromElement) as ExpandCollapsePattern;

        //    expandCollapsePattern.Expand();
        //    expandCollapsePattern.Collapse();

        //    AutomationElement listItem = comboBox.FindFirst(TreeScope.Subtree, new PropertyCondition(AutomationElement.NameProperty, item));

        //    if (listItem == null)
        //        throw new Exception(string.Format("Can't find element with name {0}", item));

        //    automationPatternFromElement = GetSpecifiedPattern(listItem, "SelectionItemPatternIdentifiers.Pattern");

        //    SelectionItemPattern selectionItemPattern = listItem.GetCurrentPattern(automationPatternFromElement) as SelectionItemPattern;

        //    selectionItemPattern.Select();
        //}

        //private static AutomationPattern GetSpecifiedPattern(AutomationElement element, string patternName)
        //{
        //    AutomationPattern[] supportedPattern = element.GetSupportedPatterns();

        //    foreach (AutomationPattern pattern in supportedPattern)
        //    {
        //        if (pattern.ProgrammaticName == patternName)
        //            return pattern;
        //    }

        //    return null;
        //}

        //public static AutomationElement FindAutomationElement(AutomationElement parentElement, TreeScope scope,
        //    string className, int timeoutMiliseconds, int delayBetweenFoundTime = 100)
        //{
        //    AutomationElement elem = null;

        //    while (timeoutMiliseconds > 0 && elem == null)
        //    {
        //        elem = parentElement.FindFirst(scope, new PropertyCondition(AutomationElement.ClassNameProperty, className));
        //        timeoutMiliseconds -= delayBetweenFoundTime;
        //        Thread.Sleep(delayBetweenFoundTime);
        //    }

        //    return elem;
        //}

        //public static AutomationElement FindAutomationElementByChain(AutomationElement parentElement, TreeScope scope,
        //    string[] classNames, int timeoutMiliseconds, int delayBetweenFoundTime = 100)
        //{
        //    var currentElement = parentElement;

        //    foreach (var cn in classNames)
        //    {
        //        currentElement = FindAutomationElement(currentElement, scope, cn, timeoutMiliseconds, delayBetweenFoundTime);
        //        if (currentElement == null)
        //            break;
        //    }

        //    return currentElement;
        //}

        //public static AutomationElement FindAutomationElementByChains(AutomationElement parentElement, TreeScope scope,
        //    List<string[]> classNames, int timeoutMiliseconds, int delayBetweenFoundTime = 100)
        //{
        //    var currentIdx = 0;
        //    var numTries = timeoutMiliseconds / delayBetweenFoundTime;

        //    while(numTries > 0)
        //    {
        //        var element = FindAutomationElementByChain(parentElement, scope, classNames[currentIdx], delayBetweenFoundTime, delayBetweenFoundTime);
        //        if (element != null)
        //            return element;

        //        currentIdx = (currentIdx + 1) % classNames.Count;                

        //        numTries--;
        //    }

        //    return null;
        //}

        public static byte[] CaptureScreen(int x, int y, int width, int height)
        {
            using (MemoryStream ms = new MemoryStream())
            {
                var bmp = new Bitmap(width, height, PixelFormat.Format32bppArgb);
                Graphics graphics = Graphics.FromImage(bmp);
                graphics.CopyFromScreen(x, y, 0, 0, new System.Drawing.Size(width, height), CopyPixelOperation.SourceCopy);

                bmp.Save(ms, ImageFormat.Png);

                return ms.ToArray();
            }
        }
    }
}
