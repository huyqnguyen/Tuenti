using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LINQ_IfByDefault
{

    //Class Employee having two properties
    class Employee
    {
        public string Name { get; set; }
        public string EmpID { get; set; }

    }
    //Class Worker having two properties
    class Worker
    {
        public string WId { get; set; }
        public string City { get; set; }
    }


    class Program
    {

        static void Main(String[] args)
        {
            //int n = Convert.ToInt32(Console.ReadLine());
            //string[] a_temp = Console.ReadLine().Split(' ');
            //int[] x = Array.ConvertAll(a_temp, Int32.Parse);
            //int numberOfSwaps = 0;
            //int endPosition = x.Length - 1;
            //int swapPosition;

            //while (endPosition > 0)
            //{
            //    swapPosition = 0;

            //    for (int i = 0; i < endPosition; i++)
            //    {

            //        if (x[i] > x[i + 1])
            //        {
            //            // Swap elements 'i' and 'i + 1':
            //            int tmp = x[i];
            //            x[i] = x[i + 1];
            //            x[i + 1] = tmp;

            //            swapPosition = i;
            //            numberOfSwaps++;
            //        } // end if

            //    } // end for

            //    endPosition = swapPosition;
            //} // end while
            //Console.WriteLine("Array is sorted in {0} swaps.", numberOfSwaps);
            //Console.WriteLine("First Element: {0}", x[0]);
            //Console.WriteLine("Last Element: {0}", x[n - 1]);
            int[] vInt = new int[] { 1, 2, 3 };
            string[] vString = new string[] { "Hello", "World" };

            printArray<int>(vInt);
            printArray<string>(vString);

            Console.Read();
        }

        private static void printArray<T>(T[] vString)
        {
            for (int i = 0; i < vString.Length; i++)
            {
                Console.WriteLine(vString[i]);
            }
        }
    }
}