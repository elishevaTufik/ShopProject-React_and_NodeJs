import apiSlice from "./apiSlice"

const sweetsApiSlice = apiSlice.injectEndpoints({

    endpoints: (build) => ({

        getAllSweets: build.query({
            query: () => ({
                url: '/api/sweet/getAll'
            }), 
            providesTags:["Sweet"]
        }),

        createNewSweet: build.mutation({
            query: (sweet) => ({
                url: '/api/sweet/create',
                method:"POST",
                body:sweet
            }),
            invalidatesTags:["Sweet"]
        }),

        deleteSweet: build.mutation({
            query: (id) => ({
                url: '/api/sweet/'+id,
                method:"DELETE",
            }),
            invalidatesTags:["Sweet"]
        }),
        
        updateSweet: build.mutation({
            query: (sweet) => ({
                url: '/api/sweet/update',
                method:"PUT",
                body:sweet
            }),
            invalidatesTags:["Sweet"]
        }),

        updateInInventory: build.mutation({
            query: (id) => ({
                url: '/api/sweet/updateInventory/'+id,
                method:"PUT",
            }),
            invalidatesTags:["Sweet"]
        })

    }),
})

export  const { 
    useGetAllSweetsQuery,
    useCreateNewSweetMutation,
    useDeleteSweetMutation,
    useUpdateSweetMutation,
    useUpdateInInventoryMutation 
    } = sweetsApiSlice
