import {useSelector}from "react-redux"
import {selectToken} from '../Authorization/authSlice'
import {jwtDecode} from "jwt-decode"

const useAuth=()=>{

    const token = useSelector(selectToken)

    var isAdmin=false
    var isClient=false
    var isShiftManager=false
    var isWorker=false
   
    if(token){

        const UserDecoded=jwtDecode(token)
        const {_id,username,name,email,phone,permission}=UserDecoded

        if(permission=='client')
            isClient=true

        else{

            if(permission=='admin')
                isAdmin=true

            else{

                if(permission=='shift manager')
                isShiftManager=true
                
                else
                     if(permission=='worker')
                        isWorker=true
                
            }
        }
        
        return {username, permission, name, email, phone, isAdmin, isClient,isWorker,isShiftManager, _id }
    }

    return {_id:'', usename:'', permission:'', name:'', email:'', phone:'', isAdmin, isClient,isWorker,isShiftManager}

}
 
export default useAuth