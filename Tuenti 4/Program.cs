using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tuenti_4
{
    class Program
    {
        static void Main(string[] args)
        {
            var filestream = new FileStream(@"C:\myworks\submitInput.txt",
                                          FileMode.Open,
                                          FileAccess.Read,
                                          FileShare.ReadWrite);
            var file = new StreamReader(filestream, Encoding.UTF8, true);
            var lineOfText = "";
            bool isFirstLineOfInput = true;
            int count = 1;
            using (StreamWriter file2 = new StreamWriter(@"C:\myworks\testOutput.txt"))
            {
                while ((lineOfText = file.ReadLine()) != null)
                {
                    if (!isFirstLineOfInput)
                    {
                        lineOfText += "- - - - - - - ";
                        var output = Solve(lineOfText.Split(new char[] { '-' }));
                        file2.WriteLine("Case #{0}: {1}", count, output);
                        count++;
                    }
                    else
                    {
                        isFirstLineOfInput = false;
                    }
                }
            }
        }

        public static int Solve(string[] input)
        {
            int count = 0;
            for (int i = 0; i < input.Length; i++)
            {
                // by pass case
                if (input[i] == "RU" || input[i] == "U" || input[i] == "LU" || input[i] == "LD" || input[i] == "RD" || input[i] == "K" || input[i] == "P")
                    continue;
                else
                {
                    // R-RD-D-LD-L-K
                    if (input[i] == "R" && input[i + 1] == "RD" && input[i + 2] == "D" && input[i + 3] == "LD" && input[i + 4] == "L" && input[i + 5] != "K")
                    {
                        count += 1;
                        continue;
                    }

                    // L-LD-D-RD-R-P
                    if (input[i] == "L" && input[i + 1] == "LD" && input[i + 2] == "D" && input[i + 3] == "RD" && input[i + 4] == "R" && input[i + 5] != "P")
                    {
                        count += 1;
                        continue;
                    }

                    // D-LD-L-K
                    if (input[i] == "D" && input[i + 1] == "LD" && input[i + 2] == "L" && input[i + 3] != "K")
                    {
                        if (i > 1)
                        {
                            if (input[i - 2] == "R" && input[i - 1] == "RD")
                            {
                                // already counted combo
                                continue;
                            }
                        }
                        count += 1;
                    }

                    // D-RD-R-P
                    if (input[i] == "D" && input[i + 1] == "RD" && input[i + 2] == "R" && input[i + 3] != "P")
                    {
                        if (i > 1)
                        {
                            if (input[i - 2] == "L" && input[i - 1] == "LD")
                            {
                                // already counted combo
                                continue;
                            }
                        }
                        count += 1;
                    }
                    // R-D-RD-P
                    if (input[i] == "R" && input[i + 1] == "D" && input[i + 2] == "RD" && input[i + 3] != "P")
                    {
                        count += 1;
                    }
                }
            }
            return count;
        }
    }
}
