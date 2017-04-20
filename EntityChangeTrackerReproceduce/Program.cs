using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityChangeTrackerReproceduce
{
    class Program
    {
        static void Main(string[] args)
        {
            var contextOne = new NORTHWNDEntities();
            var contextTwo = new NORTHWNDEntities();

            var category = contextOne.Categories.FirstOrDefault();

            var product = new Product()
            {
                ProductName = "Hugo"
            };
            product.Category = category;

            contextTwo.Products.Add(product);
            contextTwo.SaveChanges();
            Console.ReadLine();
        }
    }
}
