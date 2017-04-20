using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOLID
{
    //public class MileageCalculator
    //{

    //    /// <summary>
    //    /// violating OCP where a new car has to be added then it will require changes in the core function CalculateMileage.
    //    /// </summary>
    //    IEnumerable<Car> _cars;
    //    public MileageCalculator(IEnumerable<Car> cars) { this._cars = cars; }

    //    public void CalculateMileage()
    //    {
    //        foreach (var car in _cars)
    //        {
    //            if (car.Name == "Audi")
    //                Console.WriteLine("Mileage of the car {0} is {1}", car.Name, "10M");
    //            else if (car.Name == "Mercedes")
    //                Console.WriteLine("Mileage of the car {0} is {1}", car.Name, "20M");
    //        }
    //    }
    //}

    public class MileageCalculator
    {
        IEnumerable<Car> _cars;
        public MileageCalculator(IEnumerable<Car> cars) { this._cars = cars; }

        public void CalculateMileage()
        {
            CarController controller = new CarController();
            foreach (var car in _cars)
            {
                Console.WriteLine("Mileage of the car {0} is {1}", car.Name, controller.GetCarMileage(car.Name));
            }
        }
    }

    public class CarController
    {
        List<ICar> cars;
        public CarController()
        {
            cars = new List<ICar>();
            cars.Add(new Audi());
            cars.Add(new Mercedes());
        }

        public string GetCarMileage(string name)
        {
            return cars.First(car => car.Name == name).GetMileage();
        }
    }

    public interface ICar
    {
        string Name { get; set; }
        string GetMileage();
    }

    public class Audi : ICar
    {
        public string Name { get; set; }

        public string GetMileage()
        {
            return "10M";
        }
    }

    public class Mercedes : ICar
    {
        public string Name { get; set; }

        public string GetMileage()
        {
            return "20M";
        }
    }

}
