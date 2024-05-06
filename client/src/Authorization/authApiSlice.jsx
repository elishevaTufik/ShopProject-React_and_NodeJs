import apiSlice from "../app/apiSlice"    

const authApiSlice = apiSlice.injectEndpoints({

    endpoints: (build)=>({

        register: build.mutation({
                query: (registerUser)=>({
                    url: "/api/auth/registerClient",
                    method: "POST",
                    body: registerUser
            })
        }),

        login : build.mutation({
            query: (loginData) =>({
            url: "/api/auth/login",
                method: "POST",
                body: loginData
                })
        })
    })
 })

export const {useRegisterMutation, useLoginMutation} = authApiSlice