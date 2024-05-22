import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputSwitch } from 'primereact/inputswitch';

import ManagerOrders from "./ManagerOrders"
import { useGetAllOrdersQuery } from "../../app/orderApiSlice";
import { Button } from 'primereact/button';


export default function RadioButtonRowSelectionDemo(props) {
    const [products, setProducts] = useState([]);
    const [manager, setManager] = useState(false);
    const [order, setOrder] = useState({});
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [rowClick, setRowClick] = useState(true);
const { data:orders=[], isLoading, isError, error, isSuccess } = useGetAllOrdersQuery()

    useEffect(() => {
        if (isSuccess){
            //setProducts(orders)
            console.log(orders);
        }
        else
            console.log("loading");

    }, [isSuccess]);


    // useEffect(() => {
    //     order.getProductsMini().then((data) => setProducts(data));
    // }, []);

    const selectedOrder=(e)=>{
        props.setOrder(e)
        }

   

    return (
        <div className="card">
            <div className="flex justify-content-center align-items-center mb-4 gap-2">
                <InputSwitch inputId="input-rowclick" checked={rowClick} onChange={(e) => setRowClick(e.value)} />
                <label htmlFor="input-rowclick">Row Click</label>
            </div>
            
            <DataTable value={orders}  selectionMode={rowClick ? null : 'radiobutton'} selection={selectedProduct} onSelectionChange={(e) =>{ selectedOrder(e.value) }} dataKey="id" tableStyle={{ minWidth: '50rem' }}>
                <Column selectionMode="single" headerStyle={{ width: '3rem' }} sortField={"createdAt"} sortOrder={-1}></Column>
                <Column field="status" header="סטטוס"></Column>
                <Column field="address" header="כתובת"></Column>
                <Column field="createdAt" header="תאריך" ></Column>
                <Column field="sweets" header="מוצרים שהוזמנו"></Column>
            </DataTable>
            {/* {manager?<ManagerOrders  order={order} />:<></>} */}
            
        </div>
    );
}