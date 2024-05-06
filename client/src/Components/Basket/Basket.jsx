import useAuth from "../../hooks/useAuth";
import ViewMyBasket from "./ViewMyBasket"

function Sweet(props) {

  const {_id,username, permission, name, email, phone, isAdmin, isClient,isWorker,isShiftManager}=useAuth()

    return (
      <div className="Sweet">
        <br/>
        <ViewMyBasket/>
      </div>
    );
  }
  
  export default Sweet;