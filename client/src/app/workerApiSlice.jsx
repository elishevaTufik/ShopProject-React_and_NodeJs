import apiSlice from "./apiSlice"

const workerApiSlice = apiSlice.injectEndpoints({

    endpoints: (build) => ({

        getAllWorkers: build.query({
            query: () => ({
                url: '/api/worker/getAllWorkers'
            }), 
            providesTags:["Worker"]
        }),


        getAllShiftManagers: build.query({
            query: () => ({
                url: '/api/worker/getAllShiftManagers'
            }), 
            providesTags:["Worker"]
        }),

        deleteWorker: build.mutation({
            query: (id) => ({
                url: '/api/worker/'+id,
                method:"DELETE",
            }),
            invalidatesTags:["Worker"]
        }),
        
        updateWorkerDetails: build.mutation({
            query: (id) => ({
                url: '/api/worker/update/'+id,
                method:"PUT",
            }),
            invalidatesTags:["Worker"]
        }),

        createWorker: build.mutation({
            query: (worker) => ({
                url: '/registerWorker',
                method:"POST",
                body:worker
            })
        }),
        
        loginWorker: build.mutation({
            query: (worker) => ({
                url: '/login',
                method:"POST",
                body:worker
            })
        })
    }),
})

export  const { 
    useGetAllWorkersQuery,
    useGetAllShiftManagersQuery,
    useDeleteWorkerMutation,
    useUpdateWorkerDetailsMutation
    } = workerApiSlice