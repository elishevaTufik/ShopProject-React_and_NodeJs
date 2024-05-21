import DataTableSweets from "./DataTableSweets"
import Galery from "./Galery"
import useAuth from "../../hooks/useAuth";

function Sweet(props) {
  const {_id,username, permission, name, email, phone, isAdmin, isClient,isWorker,isShiftManager}=useAuth()
    return (
      <div className="Sweet">
        <br/>
        {permission=='admin'?<DataTableSweets/>:<Galery/>}
      </div>
    );
  }
  
  export default Sweet;