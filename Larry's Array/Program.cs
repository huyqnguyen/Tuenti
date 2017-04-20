using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Larry_s_Array
{
    class Program
    {
        static void Main(string[] args)
        {
            //int n = Convert.ToInt16(Console.ReadLine());
            int[] array = Array.ConvertAll(Console.ReadLine().Split(' '), Int32.Parse);
            bool flag = true;
            for (int i = 0; i <= array.Length - 3; i++)
            {
                if (i == array.Length - 3) // special case
                {
                    if (array[i] > array[i + 1] || array[i + 1] > array[i + 2])
                    {
                        if (!Rotate(array, i))
                        {
                            flag = false;
                            break;
                        }
                    }
                }
                else if (array[i] > array[i + 1])
                {
                    if (!Rotate(array, i))
                    {
                        flag = false;
                        break;
                    }
                }
            }
            if (flag)
            {
                Console.WriteLine("YES");
            }
            else
            {
                Console.WriteLine("NO");
            }
            Console.Read();
        }
        static bool Rotate(int[] array, int index)
        {
            int count = 0;
            while (count < 2)
            {
                int a = array[index];
                int b = array[index + 1];
                int c = array[index + 2];
                // Rotate
                array[index] = b;
                array[index + 1] = c;
                array[index + 2] = a;
                if (array[index] < array[index + 1] && array[index + 1] < array[index + 2])
                {
                    return true;
                }
                count++;
            }
            return false;
        }
    }
}
