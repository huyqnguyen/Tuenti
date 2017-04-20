using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InsertionSort1
{
    class Program
    {
        static void insertionSort(int[] ar)
        {
            for (int i = 1; i < ar.Length; i++)
                if (ar[i] < ar[i - 1])
                {
                    var index = i;
                    var tempData = ar[i];
                    while (index >= 0)
                    {
                        if (index == 0)
                        {
                            ar[index] = tempData;
                            Console.WriteLine(string.Join(" ", ar));
                            break;
                        }
                        else
                        {
                            if (tempData < ar[index - 1])
                            {
                                //do swap
                                ar[index] = ar[index - 1];
                                Console.WriteLine(string.Join(" ", ar));
                                index--;
                            }
                            else
                            {
                                ar[index] = tempData;
                                Console.WriteLine(string.Join(" ", ar));
                                break;
                            }
                        }
                    }

                }
        }
        static void Main(string[] args)
        {
            int _ar_size;
            _ar_size = Convert.ToInt32(Console.ReadLine());
            int[] _ar = new int[_ar_size];
            String elements = Console.ReadLine();
            String[] split_elements = elements.Split(' ');
            for (int _ar_i = 0; _ar_i < _ar_size; _ar_i++)
            {
                _ar[_ar_i] = Convert.ToInt32(split_elements[_ar_i]);
            }

            insertionSort(_ar);
            Console.Read();
        }
    }
}
