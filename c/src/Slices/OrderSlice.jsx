import {createSlice} from "@reduxjs/toolkit"

const initValue={
    OrdersData:[]
}

const OrderSlice=createSlice({
    name:"Orders",
    initialState:initValue,
    reducers:{
        get:(state,actions)=>{
            state.OrdersData=actions.payload.data
        }
    }
})

export const {get}=OrderSlice.actions
export default OrderSlice.reducer