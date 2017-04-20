using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Diagnostics;
using System.Threading;
using System.Text.RegularExpressions;
using System.IO;
using Newtonsoft.Json;
using System.Runtime.Serialization;
using System.Security.Cryptography;
using System.Globalization;
using System.Windows;
using System.Windows.Automation;
namespace Windows_Running_Process
{

    class Program
    {
        private static AutomationElement _htmlDocPanel;
        static void Main(string[] args)
        {
            //string test = "1234567";
            //string encryp = CryptoHelper.EncryptStringAES(test);
            //Console.WriteLine(encryp);
            //string decryp = CryptoHelper.DecryptStringAES("EAAAAO/tOR0aQiSsFIX15tZLHR+hck5DwyMEYtMSM1jo8NiJ");
            //Console.WriteLine(decryp);

            //Console.WriteLine(RemoveSign4VietnameseString("Vay CHuỗi NhƯ the nay thi sáO TIẾNG VIỆT"));

            //var accountNumber = GetCardNumberPoint();
            //if (accountNumber == null)
            //{
      
            //}
            //Console.WriteLine("GetPoint : X-" + accountNumber.Value.X.ToString() + ";Y-" + accountNumber.Value.Y.ToString());

            //var password = GetEnquiryPasswordPoint();
            //if (password == null)
            //{
  
            //}
            //Console.WriteLine("GetPoint : X-" + password.Value.X.ToString() + ";Y-" + password.Value.Y.ToString());

            var receiver = GetReceiverAccountNumberPoint();
            if (receiver == null)
            {

            }
            Console.WriteLine("GetPoint : X-" + receiver.Value.X.ToString() + ";Y-" + receiver.Value.Y.ToString());

            Console.Read();
        }

        private static Point? GetCardNumberPoint()
        {
            _htmlDocPanel = AutomationElement.RootElement.FindFirst(TreeScope.Descendants,
                new PropertyCondition(AutomationElement.ClassNameProperty, "TabWindowClass"));

            var cardNumberTextBox = _htmlDocPanel.FindAll(TreeScope.Descendants, Condition.TrueCondition)
            .Cast<AutomationElement>().Where(item => item.Current.ClassName.StartsWith("ATL")).ToList();
            if (cardNumberTextBox.Count() < 2) return null;
            return cardNumberTextBox[1].GetClickablePoint();
        }

        private static Point? GetEnquiryPasswordPoint()
        {
            _htmlDocPanel = AutomationElement.RootElement.FindFirst(TreeScope.Descendants,
                new PropertyCondition(AutomationElement.ClassNameProperty, "TabWindowClass"));

            var passwordTextbox = _htmlDocPanel.FindAll(TreeScope.Descendants, Condition.TrueCondition)
                .Cast<AutomationElement>().FirstOrDefault(item => item.Current.ClassName.StartsWith("ATL"));
            if (passwordTextbox == null) return null;
            return passwordTextbox.GetClickablePoint();
        }

        private static Point? GetReceiverAccountNumberPoint()
        {
            _htmlDocPanel = AutomationElement.RootElement.FindFirst(TreeScope.Descendants,
                      new PropertyCondition(AutomationElement.ClassNameProperty, "TabWindowClass"));

            var receiverAccountNumberTextbox = _htmlDocPanel.FindAll(TreeScope.Descendants, Condition.TrueCondition)
                .Cast<AutomationElement>().FirstOrDefault(item => item.Current.ClassName.StartsWith("ATL"));
            if (receiverAccountNumberTextbox == null) return null;
            return receiverAccountNumberTextbox.GetClickablePoint();
        }

        private static readonly string[] VietnameseSigns = new string[]
        {

            "aAeEoOuUiIdDyY",

            "áàạảãâấầậẩẫăắằặẳẵ",

            "ÁÀẠẢÃÂẤẦẬẨẪĂẮẰẶẲẴ",

            "éèẹẻẽêếềệểễ",

            "ÉÈẸẺẼÊẾỀỆỂỄ",

            "óòọỏõôốồộổỗơớờợởỡ",

            "ÓÒỌỎÕÔỐỒỘỔỖƠỚỜỢỞỠ",

            "úùụủũưứừựửữ",

            "ÚÙỤỦŨƯỨỪỰỬỮ",

            "íìịỉĩ",

            "ÍÌỊỈĨ",

            "đ",

            "Đ",

            "ýỳỵỷỹ",

            "ÝỲỴỶỸ"
        };

        public static string RemoveSign4VietnameseString(string str)
        {
            for (int i = 1; i < VietnameseSigns.Length; i++)
            {
                for (int j = 0; j < VietnameseSigns[i].Length; j++)
                    str = str.Replace(VietnameseSigns[i][j], VietnameseSigns[0][i - 1]);
            }
            return str;
        }

        public static string RemoveAccents(string input)
        {
            return new string(
                input
                .Normalize(System.Text.NormalizationForm.FormD)
                .ToCharArray()
                .Where(c => CharUnicodeInfo.GetUnicodeCategory(c) != UnicodeCategory.NonSpacingMark)
                .ToArray());
            // the normalization to FormD splits accented letters in accents+letters
            // the rest removes those accents (and other non-spacing characters)
        }

        public static string RemoveDiacritics(string input)
        {
            string stFormD = input.Normalize(NormalizationForm.FormD);
            int len = stFormD.Length;
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < len; i++)
            {
                System.Globalization.UnicodeCategory uc = System.Globalization.CharUnicodeInfo.GetUnicodeCategory(stFormD[i]);
                if (uc != System.Globalization.UnicodeCategory.NonSpacingMark)
                {
                    sb.Append(stFormD[i]);
                }
            }
            return (sb.ToString().Normalize(NormalizationForm.FormC));
        }

        public class CryptoHelper
        {
            private static byte[] _salt = Encoding.ASCII.GetBytes("o6806642kbM7c5");

            //<add key="SHARED_SECRET" value="ae6a9963ae45bee197435a6918c34cd5" />
            private static string sharedSecret = "ae6a9963ae45bee197435a6918c34cd5";
            /// <summary>
            /// Encrypt the given string using AES.  The string can be decrypted using 
            /// DecryptStringAES().  The sharedSecret parameters must match.
            /// </summary>
            /// <param name="plainText">The text to encrypt.</param>
            /// <param name="sharedSecret">A password used to generate a key for encryption.</param>
            public static string EncryptStringAES(string plainText)
            {
                if (string.IsNullOrEmpty(plainText))
                    throw new ArgumentNullException("plainText");
                if (string.IsNullOrEmpty(sharedSecret))
                    throw new ArgumentNullException("sharedSecret");

                string outStr = null;                       // Encrypted string to return
                RijndaelManaged aesAlg = null;              // RijndaelManaged object used to encrypt the data.

                try
                {
                    // generate the key from the shared secret and the salt
                    Rfc2898DeriveBytes key = new Rfc2898DeriveBytes(sharedSecret, _salt);

                    // Create a RijndaelManaged object
                    aesAlg = new RijndaelManaged();
                    aesAlg.Key = key.GetBytes(aesAlg.KeySize / 8);

                    // Create a decryptor to perform the stream transform.
                    ICryptoTransform encryptor = aesAlg.CreateEncryptor(aesAlg.Key, aesAlg.IV);

                    // Create the streams used for encryption.
                    using (MemoryStream msEncrypt = new MemoryStream())
                    {
                        // prepend the IV
                        msEncrypt.Write(BitConverter.GetBytes(aesAlg.IV.Length), 0, sizeof(int));
                        msEncrypt.Write(aesAlg.IV, 0, aesAlg.IV.Length);
                        using (CryptoStream csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
                        {
                            using (StreamWriter swEncrypt = new StreamWriter(csEncrypt))
                            {
                                //Write all data to the stream.
                                swEncrypt.Write(plainText);
                            }
                        }
                        outStr = Convert.ToBase64String(msEncrypt.ToArray());
                    }
                }
                finally
                {
                    // Clear the RijndaelManaged object.
                    if (aesAlg != null)
                        aesAlg.Clear();
                }

                // Return the encrypted bytes from the memory stream.
                return outStr;
            }

            /// <summary>
            /// Decrypt the given string.  Assumes the string was encrypted using 
            /// EncryptStringAES(), using an identical sharedSecret.
            /// </summary>
            /// <param name="cipherText">The text to decrypt.</param>
            /// <param name="sharedSecret">A password used to generate a key for decryption.</param>
            public static string DecryptStringAES(string cipherText)
            {
                if (string.IsNullOrEmpty(cipherText))
                    throw new ArgumentNullException("cipherText");
                if (string.IsNullOrEmpty(sharedSecret))
                    throw new ArgumentNullException("sharedSecret");

                // Declare the RijndaelManaged object
                // used to decrypt the data.
                RijndaelManaged aesAlg = null;

                // Declare the string used to hold
                // the decrypted text.
                string plaintext = null;

                try
                {
                    // generate the key from the shared secret and the salt
                    Rfc2898DeriveBytes key = new Rfc2898DeriveBytes(sharedSecret, _salt);

                    // Create the streams used for decryption.                
                    byte[] bytes = Convert.FromBase64String(cipherText);
                    using (MemoryStream msDecrypt = new MemoryStream(bytes))
                    {
                        // Create a RijndaelManaged object
                        // with the specified key and IV.
                        aesAlg = new RijndaelManaged();
                        aesAlg.Key = key.GetBytes(aesAlg.KeySize / 8);
                        // Get the initialization vector from the encrypted stream
                        aesAlg.IV = ReadByteArray(msDecrypt);
                        // Create a decrytor to perform the stream transform.
                        ICryptoTransform decryptor = aesAlg.CreateDecryptor(aesAlg.Key, aesAlg.IV);
                        using (CryptoStream csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                        {
                            using (StreamReader srDecrypt = new StreamReader(csDecrypt))

                                // Read the decrypted bytes from the decrypting stream
                                // and place them in a string.
                                plaintext = srDecrypt.ReadToEnd();
                        }
                    }
                }
                finally
                {
                    // Clear the RijndaelManaged object.
                    if (aesAlg != null)
                        aesAlg.Clear();
                }

                return plaintext;
            }

            private static byte[] ReadByteArray(Stream s)
            {
                byte[] rawLength = new byte[sizeof(int)];
                if (s.Read(rawLength, 0, rawLength.Length) != rawLength.Length)
                {
                    throw new SystemException("Stream did not contain properly formatted byte array");
                }

                byte[] buffer = new byte[BitConverter.ToInt32(rawLength, 0)];
                if (s.Read(buffer, 0, buffer.Length) != buffer.Length)
                {
                    throw new SystemException("Did not read byte array properly");
                }

                return buffer;
            }
        }
    }
}
