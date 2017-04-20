using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOLID
{
    //class Program
    //{
    //    static void Main(string[] args)
    //    {
    //        Apple apple = new Orange();
    //        Console.WriteLine(apple.GetColor());
    //        Console.Read();
    //    }

    //    public class Apple
    //    {
    //        public virtual string GetColor()
    //        {
    //            return "Red";
    //        }
    //    }

    //    public class Orange : Apple
    //    {
    //        public override string GetColor()
    //        {
    //            return "Orange";
    //        }
    //    }
    //}

    class Program
    {
        static void Main(string[] args)
        {
            Fruit fruit = new Orange();
            Console.WriteLine(fruit.GetColor());
            fruit = new Apple();
            Console.WriteLine(fruit.GetColor());
            Console.Read();
        }
    }

    public abstract class Fruit
    {
        public abstract string GetColor();
    }

    public class Apple : Fruit
    {
        public override string GetColor()
        {
            return "Red";
        }
    }

    public class Orange : Apple
    {
        public override string GetColor()
        {
            return "Orange";
        }
    }
}
