import {createSlice} from "@reduxjs/toolkit"

const initValue={
    WorkersData:[]
}

const WorkerSlice=createSlice({
    name:"Workers",
    initialState:initValue,
    reducers:{
        get:(state,actions)=>{
            state.WorkersData=actions.payload.data
        }
    }
})

export const {get}=WorkerSlice.actions
export default WorkerSlice.reducer