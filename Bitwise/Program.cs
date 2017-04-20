using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Bitwise
{
    class Program
    {
        static void Main(String[] args)
        {
            int t = Convert.ToInt32(Console.ReadLine());
            for (int a0 = 0; a0 < t; a0++)
            {
                string[] tokens_n = Console.ReadLine().Split(' ');
                int n = Convert.ToInt32(tokens_n[0]);
                int k = Convert.ToInt32(tokens_n[1]);
                int max = 0;
                bool flag = false;
                for (int i = 1; i <= n; i++)
                {
                    if (flag) break;
                    for (int j = i + 1; j <= n; j++)
                    {
                        if (max < (i & j) && (i & j) < k)
                        {
                            max = i & j;
                        }
                        if (max == k - 1)
                        {
                            flag = true;
                            break;
                        }
                    }
                }
            }
        }
    }
}
