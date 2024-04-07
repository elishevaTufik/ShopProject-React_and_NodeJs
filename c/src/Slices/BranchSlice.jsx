import {createSlice} from "@reduxjs/toolkit"

const initValue={
    BranchsData:[]
}

const BranchSlice=createSlice({
    name:"Branchs",
    initialState:initValue,
    reducers:{
        get:(state,actions)=>{
            state.BranchsData=actions.payload.data
        }
    }
})

export const {get}=BranchSlice.actions
export default BranchSlice.reducer