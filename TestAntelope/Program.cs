using Antelope.Core;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace TestAntelope
{
    class Program
    {
        static void Main(string[] args)
        {

            //ProcessStartInfo start = new ProcessStartInfo();
            //start.FileName = "cmb.exe";
            //// Do you want to show a console window?
            //start.WindowStyle = ProcessWindowStyle.Hidden;
            //start.CreateNoWindow = true;
            //start.ErrorDialog = true;
            //start.WindowStyle = ProcessWindowStyle.Minimized;
            //using (Process proc = Process.Start(start))
            //{
            //    while (!proc.HasExited)
            //    {
            //        Console.WriteLine("Running!");
            //    }
            //}
            //Console.WriteLine("Completed!");
            //Console.ReadLine();
            try
            {
                Thread.Sleep(5000);
                AntelopeUtils.EnterKeysByVirtualKeyboard(args[0], false);
                Console.Read();
                AntelopeUtils.EnterKeysByVirtualKeyboard(args[1], false);
                Console.Read();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            Console.Read();
        }
    }
}
