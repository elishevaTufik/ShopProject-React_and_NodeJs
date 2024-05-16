import ClientOrders from "./ClientOrders";
import ManagerOrders from "./ManagerOrders"
import useAuth from "../../hooks/useAuth";

function Order() {

  const {username, permission, name, email, phone, isAdmin, isClient,isWorker,isShiftManager, _id}=useAuth()
    return (
      <div className="Order">
        <br/>
       {permission=='client'? <ClientOrders />:<ManagerOrders/>}
           
      </div>
    );
  }
  
  export default Order;