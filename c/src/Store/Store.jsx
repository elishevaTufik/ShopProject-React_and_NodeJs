import {configureStore} from "@reduxjs/toolkit"
import apiSlice from "../app/apiSlice"
import authSliceReducer from "../Authorization/authSlice"

const myStore = configureStore({

    reducer:{
        auth: authSliceReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },

    middleware: (getDefaultMiddleware) =>

    getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})

export default myStore