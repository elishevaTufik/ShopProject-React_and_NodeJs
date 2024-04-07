import {createSlice} from "@reduxjs/toolkit"

const initValue={
    SweetsData:[]
}

const SweetSlice=createSlice({
    name:"Sweets",
    initialState:initValue,
    reducers:{
        get:(state,actions)=>{
            state.SweetsData=actions.payload.data
        }
    }
})

export const {get}=SweetSlice.actions
export default SweetSlice.reducer