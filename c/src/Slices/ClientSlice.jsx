import {createSlice} from "@reduxjs/toolkit"

const initValue={
    ClientsData:[]
}

const ClientSlice=createSlice({
    name:"Clients",
    initialState:initValue,
    reducers:{
        get:(state,actions)=>{
            state.ClientsData=actions.payload.data
        }
    }
})

export const {get}=ClientSlice.actions
export default ClientSlice.reducer