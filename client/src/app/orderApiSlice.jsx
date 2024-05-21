import apiSlice from "./apiSlice"

const ordersApiSlice = apiSlice.injectEndpoints({

    endpoints: (build) => ({

        getAllOrders: build.query({
            query: () => ({
                url: '/api/orders/'
            }), 
            providesTags:["Order"]
        }),

        getOrdersHistory: build.query({
            query: () => ({
                url: '/api/orders/getOrdersHistory'
            }), 
            providesTags:["Order"]
        }),

        getOrdersDone: build.query({
            query: () => ({
                url: '/api/orders/getOrdersDone'
            }), 
            providesTags:["Order"]
        }),

        getOrdersaccepted: build.query({
            query: () => ({
                url: '/api/orders/getOrdersaccepted'
            }), 
            providesTags:["Order"]
        }),

        getOrderByIdClient: build.query({
            query: (idClient) => ({
                url: '/api/orders/getOrderByIdClient/'+idClient
            }), 
            providesTags:["Order"]
        }),

        createOrder: build.mutation({
            query: (order) => ({
                url: '/api/orders/',
                method:"POST",
                body:order
            }),
            invalidatesTags:["Order"]
        }),

        updateOrder: build.mutation({
            query: (id) => ({
                url: '/api/orders/update/'+id,
                method:"PUT",
            }),
            invalidatesTags:["Order"]
        }),
        
        updateStatus: build.mutation({
            query: (id) => ({
                url: `/api/orders/updateStatus/${id}`,
                method:"PUT",
               
            }),
            invalidatesTags:["Order"]
        }),

        cancelOrder: build.mutation({
            query: (orderId) => ({
                url: `/api/orders/cancelOrder/`+orderId,
                method:"PUT",
               
            }),
            invalidatesTags:["Order"]
        })
    }),
})

export  const {   
    useGetAllOrdersQuery,
    useGetOrdersHistoryQuery,
    useGetOrdersDoneQuery,
    useGetOrdersacceptedQuery,
    useGetOrderByIdClientQuery,
    useCreateOrderMutation,
    useUpdateOrderMutation, 
    useUpdateStatusMutation,
    useCancelOrderMutation
    } = ordersApiSlice