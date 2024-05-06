import DataTableSweets from "./DataTableSweets"
import Galery from "./Galery"
import useAuth from "../../hooks/useAuth";

function Sweet(props) {

  console.log("sweet before use auth");
  const {_id,username, permission, name, email, phone, isAdmin, isClient,isWorker,isShiftManager}=useAuth()
  console.log("sweet after use auth");

    return (
      <div className="Sweet">
        <br/>
        {permission=='admin'?<DataTableSweets/>:<Galery/>}
      </div>
    );
  }
  
  export default Sweet;