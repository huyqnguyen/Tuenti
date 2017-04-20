using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Similar_Number
{
    //class Program
    //{
    //    private static Dictionary<string, int> checkedList = new Dictionary<string, int>();
    //    private static int count = 0;
    //    private static Stopwatch sw = new Stopwatch();
    //    static void Main(string[] args)
    //    {
    //        sw.Start();
    //        string str = "123456789";
    //        char[] charArry = str.ToCharArray();
    //        permute(charArry, 0, 8);
    //        sw.Stop();
    //        Console.Write(sw.Elapsed);
    //        Console.ReadKey();
    //    }

    //    static void permute(char[] arry, int i, int n)
    //    {

    //        int j;
    //        string tempStr = string.Join("", arry);
    //        if (i == n)
    //        {
    //            if (Convert.ToInt64(tempStr) >= 10000000 && !checkedList.ContainsKey(tempStr))
    //            {
    //                count++;
    //                Console.WriteLine(arry);
    //                checkedList.Add(tempStr, 0);
    //            }
    //        }
    //        else
    //        {
    //            for (j = i; j <= n; j++)
    //            {
    //                swap(ref arry[i], ref arry[j]);
    //                permute(arry, i + 1, n);
    //                swap(ref arry[i], ref arry[j]); //backtrack
    //            }
    //        }
    //    }

    //    static void swap(ref char a, ref char b)
    //    {
    //        char tmp;
    //        tmp = a;
    //        a = b;
    //        b = tmp;
    //    }
    //}

    class Solution
    {
        public static List<long> listDigitsofNumber = new List<long>();
        private static long n;
        private static bool flag;
        private static long[] a;
        private static Stopwatch sw = new Stopwatch();
        static void Main(string[] args)
        {
            sw.Start();
            long n = 123456789;
            GetDigits(n);
            solution(n);
            sw.Stop();
            Console.WriteLine(sw.Elapsed);
            Console.ReadLine();
        }
        public static void solution(long N)
        {
            if (N < 10)
            {
                Message(N);
            }
            else
            {
                n = listDigitsofNumber.Count - 1;
                a = SortArray(listDigitsofNumber.ToArray<long>());
                flag = false;
                while (!flag)
                {
                    ShowResult(a);
                    CreateSimilarNumber();
                }

            }
        }
        private static long[] SortArray(long[] array)
        {
            long temp;
            for (long i = 0; i < n - 1; i++)
                for (long j = i + 1; j < n; j++)
                    if (array[j] < array[i])
                    {
                        temp = array[i];
                        array[i] = array[j];
                        array[j] = temp;
                    }
            return array;
        }
        public static void CreateSimilarNumber()
        {
            long j, k, r, s, temp;
            j = n - 1;
            while (j > -1 && a[j] >= a[j + 1])
            {
                j--;
            }
            if (j == -1)
                flag = true;
            else
            {
                k = n;
                while (k > -1 && a[j] >= a[k])
                {
                    k--;
                };
                if (k == -1) k = 0;
                temp = a[j]; a[j] = a[k]; a[k] = temp;
                r = j + 1; s = n;
                while (r < s)
                {
                    temp = a[r]; a[r] = a[s]; a[s] = temp;
                    r++; s--;
                }
            }

        }
        private static void ShowResult(long[] a)
        {
            Console.WriteLine("{0}", String.Join("", a));
        }
        public static void GetDigits(long N)
        {
            if (N < 10)
            {
                listDigitsofNumber.Add(N);
            }
            else
            {
                GetDigits(N / 10);
                listDigitsofNumber.Add(N % 10);
            }
        }

        public static void Message(long n)
        {
            Console.WriteLine("List of number similar :{0}", n);
        }
    }
}
