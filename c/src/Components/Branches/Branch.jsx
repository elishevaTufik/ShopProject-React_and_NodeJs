import BranchAdmin from './BranchAdmin'
import BranchView from './BranchView'
import useAuth from "../../hooks/useAuth";


function Branch() {
  const {_id,username, permission, name, email, phone, isAdmin, isClient,isWorker,isShiftManager}=useAuth()

  return (
    <div className="Branch">
      <br/>
      Branch        
      {/* {permission=='admin'?<BranchAdmin/>:<BranchView/>} */}
      {permission=='admin'?<BranchAdmin/>:<BranchView/>}

    </div>
  );
}

export default Branch;