import apiSlice from "./apiSlice"

const branchApiSlice = apiSlice.injectEndpoints({

    endpoints: (build) => ({

        getAllBranches: build.query({
            query: () => ({
                url: '/api/branch/'
            }), 
            providesTags:["Branch"]
        }),

        createBranch: build.mutation({
            query: (branch) => ({
                url: '/api/branch/create',
                method:"POST",
                body:branch
            }),
            invalidatesTags:["Branch"]
        }),

        deleteBranch: build.mutation({
            query: (id) => ({
                url: '/api/branch/'+id,
                method:"DELETE",
            }),
            invalidatesTags:["Branch"]
        }),
        
        updateBranch: build.mutation({
            query: (branch) => ({
                url: '/api/branch/update',
                method:"PUT",
                body:branch
            }),
            invalidatesTags:["Branch"]
        })

    }),
})

export  const { 
    useGetAllBranchesQuery,
    useCreateBranchMutation,
    useDeleteBranchMutation,
    useUpdateBranchMutation,
    } = branchApiSlice