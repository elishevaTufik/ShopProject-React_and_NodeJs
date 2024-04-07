import apiSlice from "./apiSlice"

const basketsApiSlice = apiSlice.injectEndpoints({

    endpoints: (build) => ({

        getAllCart: build.query({
            query: () => ({
                url: '/api/basket/'
            }), 
            providesTags:["Basket"]
        }),

        addNewProd: build.mutation({
            query: (sweetId) => ({
                url: '/api/basket/'+sweetId,
                method:"POST",
            }),
            invalidatesTags:["Basket"]
        }),

        deleteProduct: build.mutation({
            query: (id) => ({
                url: '/api/basket/'+id,
                method:"DELETE",
            }),
            invalidatesTags:["Basket"]
        }),
    
        updateQuantityOfProduct: build.mutation({
            query: (basket) => ({
                url: '/api/basket/',
                method:"PUT",
                body:basket
            }),
            invalidatesTags:["Basket"]
        }),
    }),
})

export  const { 
    useGetAllCartQuery,
    useAddNewProdMutation,
    useDeleteProductMutation,
    useUpdateQuantityOfProductMutation,
    } = basketsApiSlice
