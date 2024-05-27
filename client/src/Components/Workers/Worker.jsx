import RegisterAdmin from './RegisterAdmin'
import EditWorkers from './EditWorkers'

function Worker() {
    
    return (
      <div className="Worker">
        <br/>
        Worker
        <EditWorkers/>
        {/* <RegisterAdmin/> */}
      </div>
    );
  }
  
  export default Worker;