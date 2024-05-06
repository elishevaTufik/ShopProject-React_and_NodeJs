import {createSlice} from "@reduxjs/toolkit"

const initValue={
    BasketsData:[]
}

const BasketSlice=createSlice({
    name:"Baskets",
    initialState:initValue,
    reducers:{
        get:(state,actions)=>{
            state.BasketsData=actions.payload.data
        }
    }
})

export const {get}=BasketSlice.actions
export default BasketSlice.reducer