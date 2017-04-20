using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOLID
{
    //public class ServiceStation
    //{
        //Below is a code violating the SRP. In the sample code, SRP is violated by mixing the OpenGate and CloseGate responsibility with the core vehicle service functionality.

        //public void OpenGate()
        //{
        //    //Open the gate if the time is later than 9 AM
        //}

        //public void DoService(Vehicle vehicle)
        //{
        //    //Check if service station is opened and then
        //    //complete the vehicle service
        //}

        //public void CloseGate()
        //{
        //    //Close the gate if the time has crossed 6PM
        //}
    //}

    public class ServiceStation
    {
        IGateUtility _gateUtility;

        public ServiceStation(IGateUtility gateUtility)
        {
            this._gateUtility = gateUtility;
        }
        public void OpenForService()
        {
            _gateUtility.OpenGate();
        }

        public void DoService()
        {
            //Check if service station is opened and then
            //complete the vehicle service
        }

        public void CloseForDay()
        {
            _gateUtility.CloseGate();
        }
    }
    public class ServiceStationUtility : IGateUtility
    {
        public void OpenGate()
        {
            //Open the shop if the time is later than 9 AM
        }

        public void CloseGate()
        {
            //Close the shop if the time has crossed 6PM
        }
    }

    public interface IGateUtility
    {
        void OpenGate();
        void CloseGate();
    }
}
