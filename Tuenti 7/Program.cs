using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tuenti_7
{
    class Program
    {
        public static Dictionary<char, int> hashset = new Dictionary<char, int>();
        public static List<int[,]> inputs = new List<int[,]>();
        static void Main(string[] args)
        {
            var filestream = new FileStream(@"C:\myworks\submitInput.txt",
                                        FileMode.Open,
                                        FileAccess.Read,
                                        FileShare.ReadWrite);
            var file = new StreamReader(filestream, Encoding.UTF8, true);
            var lineOfText = "";
            bool isFirstLineOfInput = true;
            int count = 0;
            using (StreamWriter file2 = new StreamWriter(@"C:\myworks\testOutput.txt"))
            {
                int n = 0;
                int m = 0;
                int[,] arr = new int[0,0];
                Initialize();
                while ((lineOfText = file.ReadLine()) != null)
                {
                    if (!isFirstLineOfInput)
                    {
                        if (count == n)
                        {
                            if(arr.Length > 0)
                            {
                                inputs.Add(arr);
                            }
                            var temp = lineOfText.Split(' ');
                            n = Convert.ToInt32(temp[0]);
                            m = Convert.ToInt32(temp[1]);
                            count = 0;
                            arr = new int[n,m];
                        }
                        else
                        {
                            var charArray = lineOfText.ToCharArray();
                            for (int i = 0; i < lineOfText.Length; i++)
                            {
                                arr[count, i] = Convert.ToInt32(hashset[charArray[i]]);
                            }
                            count++;
                        }
                    }
                    else
                    {
                        isFirstLineOfInput = false;
                    }
                }
            }
        }

        public static void Initialize()
        {
            hashset.Add('A', 1);
            hashset.Add('B', 2);
            hashset.Add('C', 3);
            hashset.Add('D', 4);
            hashset.Add('E', 5);
            hashset.Add('F', 6);
            hashset.Add('G', 7);
            hashset.Add('H', 8);
            hashset.Add('I', 9);
            hashset.Add('J', 10);
            hashset.Add('K', 11);
            hashset.Add('L', 12);
            hashset.Add('M', 13);
            hashset.Add('N', 14);
            hashset.Add('O', 15);
            hashset.Add('P', 16);
            hashset.Add('Q', 17);
            hashset.Add('R', 18);
            hashset.Add('S', 19);
            hashset.Add('T', 20);
            hashset.Add('U', 21);
            hashset.Add('V', 22);
            hashset.Add('W', 23);
            hashset.Add('X', 24);
            hashset.Add('Y', 25);
            hashset.Add('Z', 26);

            hashset.Add('.', 0);

            hashset.Add('a', -1);
            hashset.Add('b', -2);
            hashset.Add('c', -3);
            hashset.Add('d', -4);
            hashset.Add('e', -5);
            hashset.Add('f', -6);
            hashset.Add('g', -7);
            hashset.Add('h', -8);
            hashset.Add('i', -9);
            hashset.Add('j', -10);
            hashset.Add('k', -11);
            hashset.Add('l', -12);
            hashset.Add('m', -13);
            hashset.Add('n', -14);
            hashset.Add('o', -15);
            hashset.Add('p', -16);
            hashset.Add('q', -17);
            hashset.Add('r', -18);
            hashset.Add('s', -19);
            hashset.Add('t', -20);
            hashset.Add('u', -21);
            hashset.Add('v', -22);
            hashset.Add('w', -23);
            hashset.Add('x', -24);
            hashset.Add('y', -25);
            hashset.Add('z', -26);
        }
    }
}
