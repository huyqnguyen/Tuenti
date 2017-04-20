using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;

namespace Tuenti_3
{
    class Program
    {
        static void Main(string[] args)
        {
            var filestream = new FileStream(@"C:\myworks\submitInput.txt",
                                            FileMode.Open,
                                            FileAccess.Read,
                                            FileShare.ReadWrite);
            var file = new StreamReader(filestream, Encoding.UTF8, true, 128);
            var lineOfText = "";
            bool isFirstLineOfInput = true;
            List<string> commands = new List<string>();
            List<string> inputs = new List<string>();
            bool isComandInput = false;
            bool isTapesInput = false;

            while ((lineOfText = file.ReadLine()) != null)
            {

                if (!isFirstLineOfInput)
                {
                    if (isComandInput)
                    {
                        commands.Add(lineOfText.Trim());
                    }
                    if (isTapesInput)
                    {
                        if (lineOfText == "...") continue;
                        var index = lineOfText.IndexOf("'") + 1;
                        inputs.Add(lineOfText.Substring(index, lineOfText.LastIndexOf("'") - index).Trim());
                    }
                    if (lineOfText.Contains("code")) // code command
                    {
                        isComandInput = true;
                        isTapesInput = false;
                    }
                    if (lineOfText.Contains("tapes"))// input tapes
                    {
                        isComandInput = false;
                        isTapesInput = true;
                    }
                }
                else
                {
                    isFirstLineOfInput = false;
                }
            }

            using (StreamWriter file2 = new StreamWriter(@"C:\myworks\testOutput.txt"))
            {
                // Process string
                int i = 1;
                foreach (var item in inputs)
                {
                    var outPut = Solve(item.ToCharArray(), 0, commands, 0, "start", true);
                    file2.WriteLine("Tape #{0}: {1}", i, outPut);
                    i++;
                }
            }
        }

        public static string Solve(char[] processString, int processStringPointer, List<string> commands, int commandPointer, string state, bool isStatement)
        {
            while (!commands[commandPointer].Contains("end"))
            {
                if (isStatement)
                {
                    commandPointer = commands.FindIndex(f => f == state + ":");
                    isStatement = false;
                }


                if (processStringPointer == processString.Length)
                {
                    var temp = new string(processString);
                    processString = (temp + " ").ToCharArray();
                }

                //Process to next command

                bool isFirstStatmentExcuted = false;
                if ("'" + processString[processStringPointer] + "':" == commands[commandPointer])
                {
                    for (int i = 1; i <= 3; i++)
                    {
                        if (commands[commandPointer + i].Contains("state"))
                        {
                            state = commands[commandPointer + i].Replace("state: ", "");
                            isStatement = true;
                            commandPointer += i;
                            break;
                            //return Solve(processString, processStringPointer, commands, commandPointer + i, state, isStatement);
                        }

                        if (!isStatement)
                        {
                            if ((Regex.IsMatch(commands[commandPointer + i], @"\'\w\'\:") || Regex.IsMatch(commands[commandPointer + i], @"\'\#\'\:") || Regex.IsMatch(commands[commandPointer + i], @"\'\ \'\:")) && isFirstStatmentExcuted)
                            {
                                //return Solve(processString, processStringPointer, commands, commandPointer, state, true);
                                isStatement = true;
                                break;
                            }

                            isFirstStatmentExcuted = true;
                            switch (commands[commandPointer + i])
                            {
                                case "move: left":
                                    processStringPointer -= 1;
                                    break;
                                case "move: right":
                                    processStringPointer += 1;
                                    break;
                                case "write: '1'":  
                                    processString[processStringPointer] = '1';
                                    break;
                                case "write: '0'":   
                                    processString[processStringPointer] = '0'; ;
                                    break;
                                case "write: '#'":
                                    processString[processStringPointer] = '#';
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                }
                if (!isFirstStatmentExcuted)
                    commandPointer += 1;
                //return Solve(processString, processStringPointer, commands, commandPointer, state, isStatement);
            }
            return new string(processString);
        }
    }
}
