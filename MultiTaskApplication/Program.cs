using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace MultiTaskApplication
{
    class Program
    {
        static void Main(string[] args)
        { 

            Task.Run(() =>
            {
                int int1 = 0;
                while (true)
                {
                    Console.WriteLine("Thread 1 : {0}", int1);
                    Thread.Sleep(1000);
                    int1++;
                }
            });

            Task.Run(() =>
            {
                int int2 = 0;
                while (true)
                {
                    Console.WriteLine("Thread 2 : {0}", int2);
                    Thread.Sleep(1500);
                    int2++;
                }
            });

            Console.Read();
        }
    }
}
