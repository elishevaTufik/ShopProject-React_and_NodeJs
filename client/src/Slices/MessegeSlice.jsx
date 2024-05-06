import {createSlice} from "@reduxjs/toolkit"

const initValue={
    MessegesData:[]
}

const MessegeSlice=createSlice({
    name:"Messeges",
    initialState:initValue,
    reducers:{
        get:(state,actions)=>{
            state.MessegesData=actions.payload.data
        }
    }
})

export const {get}=MessegeSlice.actions
export default MessegeSlice.reducer