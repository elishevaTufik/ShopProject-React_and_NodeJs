import apiSlice from "./apiSlice"

const clientApiSlice = apiSlice.injectEndpoints({

    endpoints: (build) => ({

        getAllClients: build.query({
            query: () => ({
                url: '/api/client/getAll'
            }), 
            providesTags:["Client"]
        }),

        deleteClient: build.mutation({
            query: (id) => ({
                url: '/api/client/'+id,
                method:"DELETE",
            }),
            invalidatesTags:["Client"]
        }),
        
        updateClient: build.mutation({
            query: (id) => ({
                url: '/api/client/update/'+id,
                method:"PUT",
            }),
            invalidatesTags:["Client"]
        }),

        registerClient: build.mutation({
            query: (client) => ({
                url: '/api/auth/registerClient',
                method:"POST",
                body:client
            })
        }),
        
        loginClient: build.mutation({
            query: (client) => ({
                url: '/api/auth/login',
                method:"POST",
                body:client
            })
        })

    }),
})

export  const { 
    useGetAllClientsQuery,
    useDeleteClientMutation,
    useUpdateClientMutation,
    useRegisterClientMutation,
    useLoginClientMutation
    } = clientApiSlice