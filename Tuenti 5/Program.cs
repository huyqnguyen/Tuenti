using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;

namespace Tuenti_5
{
    class Program
    {



        static void Main(string[] args)
        {

            var listWords = new List<string>();
            var webRequest = WebRequest.Create(@"https://contest.tuenti.net/resources/2016/words.txt");
            var lineOfText = "";
            using (var response = webRequest.GetResponse())
            using (var content = response.GetResponseStream())
            using (var reader = new StreamReader(content))
            {
                while ((lineOfText = reader.ReadLine()) != null)
                {
                    listWords.Add(lineOfText);
                }
            }

        //Begin:
            TcpClient client = new TcpClient();
            IPEndPoint serverEndPoint = new IPEndPoint(IPAddress.Parse("52.49.91.111"), 9988);
            Dictionary<char, int> alphabetHashTable = new Dictionary<char, int>();
            // get list words

            client.Connect(serverEndPoint);

            InitializeString(alphabetHashTable);


            Stream _stream = client.GetStream();

            byte cmd = (int)' ';
            _stream.Write(new byte[] { 0xa }, 0, 1);
            _stream.Flush();

            var buffer = new byte[1024];
            var nBytes = _stream.Read(buffer, 0, 1024);
            var data = Encoding.ASCII.GetString(buffer, 0, nBytes);

            var stop = false;
            var processedCharacter = new Dictionary<char, int>();
            var filteredList = listWords;
            var guessCharacter = 'A';

            while (!stop)
            {
                try
                {
                    Console.WriteLine("guess character " + guessCharacter);
                    processedCharacter.Add(guessCharacter, 0);
                    nBytes = _stream.Read(buffer, 0, 1024);
                    _stream.Flush();

                    data = Encoding.ASCII.GetString(buffer, 0, nBytes);
                    Console.WriteLine("Count " + filteredList.Count());
                    Console.Write(data);
                    var matches = Regex.Match(data, "\\n\\n(.*?)\\n\\n", RegexOptions.Multiline);
                    if (matches.Groups[1].ToString() != "")
                    {
                        filteredList = StringFilter(matches.Groups[1].ToString().Replace(" ", ""), filteredList, processedCharacter);
                        CountCharacters(filteredList, alphabetHashTable, processedCharacter);
                        guessCharacter = FindHighestValue(alphabetHashTable, processedCharacter);

                        cmd = Convert.ToByte(guessCharacter);
                        _stream.Write(new byte[] { cmd, 0xa }, 0, 2);
                    }

                    if (data.Contains("Congratulations"))
                    {
                        filteredList = listWords;
                        guessCharacter = 'A';
                        processedCharacter.Clear();
                        using (StreamWriter file2 = new StreamWriter(@"C:\myworks\testOutput.txt", true))
                        {
                            file2.WriteLine(data);
                        }
                    }
                }
                catch (Exception ex)
                {
                    using (StreamWriter file2 = new StreamWriter(@"C:\myworks\testOutput.txt", true))
                    {
                        // Process string
                        foreach (var item in filteredList)
                        {
                            file2.WriteLine("Word : {0}", item);
                        }
                        foreach (var item in processedCharacter)
                        {
                            file2.WriteLine("Char : {0}", item);
                        }
                    }
                    Console.WriteLine(ex.Message);
                    stop = true;
                }
            }
            Console.WriteLine("Fnished");
            //goto Begin;
            Console.Read();
        }

        public static void InitializeString(Dictionary<char, int> alphabetHashTable)
        {
            alphabetHashTable.Clear();
            alphabetHashTable.Add('A', 0);
            alphabetHashTable.Add('B', 0);
            alphabetHashTable.Add('C', 0);
            alphabetHashTable.Add('D', 0);
            alphabetHashTable.Add('E', 0);
            alphabetHashTable.Add('F', 0);
            alphabetHashTable.Add('G', 0);
            alphabetHashTable.Add('H', 0);
            alphabetHashTable.Add('I', 0);
            alphabetHashTable.Add('J', 0);
            alphabetHashTable.Add('K', 0);
            alphabetHashTable.Add('L', 0);
            alphabetHashTable.Add('M', 0);
            alphabetHashTable.Add('N', 0);
            alphabetHashTable.Add('O', 0);
            alphabetHashTable.Add('P', 0);
            alphabetHashTable.Add('Q', 0);
            alphabetHashTable.Add('R', 0);
            alphabetHashTable.Add('S', 0);
            alphabetHashTable.Add('T', 0);
            alphabetHashTable.Add('U', 0);
            alphabetHashTable.Add('V', 0);
            alphabetHashTable.Add('W', 0);
            alphabetHashTable.Add('X', 0);
            alphabetHashTable.Add('Y', 0);
            alphabetHashTable.Add('Z', 0);
            alphabetHashTable.Add('-', 0);
        }

        public static void CountCharacters(List<string> input, Dictionary<char, int> alphabetHashTable, Dictionary<char, int> processedCharacter)
        {
            foreach (var obj in input)
            {
                var processWord = obj.ToCharArray();
                for (int i = 0; i < processWord.Length; i++)
                {
                    if (processedCharacter.ContainsKey(processWord[i]))
                    {
                        alphabetHashTable[processWord[i]] = 0;
                        continue;
                    }
                    alphabetHashTable[processWord[i]] = alphabetHashTable[processWord[i]] + 1;
                }
            }
        }

        public static Char FindHighestValue(Dictionary<char, int> alphabetHashTable, Dictionary<char, int> processedCharacter)
        {
            KeyValuePair<char, int> max = new KeyValuePair<char, int>();
            foreach (var kvp in alphabetHashTable)
            {
                if (kvp.Value > max.Value && !processedCharacter.ContainsKey(kvp.Key))
                    max = kvp;
            }
            alphabetHashTable[max.Key] = 0;
            return max.Key;

        }

        public static List<string> StringFilter(string pattern, List<string> inputs, Dictionary<char, int> processedCharacter)
        {
            var output = new List<string>();
            Regex regex = new Regex(@"" + pattern.Replace("_", @"\w"));
            foreach (var obj in inputs)
            {
                if (regex.IsMatch(obj) && obj.Length <= pattern.Length)
                {
                    //var temp = new Dictionary<char, int>();
                    //foreach (var item in processedCharacter)
                    //{
                    //    if (!pattern.Contains(item.Key))
                    //        temp.Add(item.Key, 0);
                    //}

                    //if (temp.Count == 0)
                    //{
                    //    output.Add(obj);
                    //}
                    //else
                    //{
                    //    using (StreamWriter file2 = new StreamWriter(@"C:\Project\testOutput.txt", true))
                    //    {
                    //        foreach (var item in temp)
                    //        {

                    //            file2.WriteLine("Key : {0} - {1}", item, obj.Contains(item.Key));

                    //            if (obj.Contains(item.Key))
                    //                continue;
                    //            output.Add(obj);
                    //        }
                    //    }
                    //}
                    if (StringFilterByExitedCharacter(pattern, obj))
                        output.Add(obj);
                }
            }

            foreach (var item in processedCharacter)
            {
                if (!pattern.Contains(item.Key))
                    output = output.Where(w => !w.Contains(item.Key.ToString())).ToList();
            }

            return output;
        }

        public static bool StringFilterByExitedCharacter(string pattern, string word)
        {
            for (int i = 0; i < pattern.Length; i++)
            {
                if (pattern[i] == '_')
                {
                    if (pattern.Contains(word[i]))
                        return false;
                }
            }
            return true;
        }
    }
}
