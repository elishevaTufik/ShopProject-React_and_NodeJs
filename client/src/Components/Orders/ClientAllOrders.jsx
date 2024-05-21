import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import { ProductService } from './ProductService';
import { Card } from 'primereact/card';

import { useGetAllSweetsQuery } from '../../app/sweetsApiSlice'
import { useGetOrderByIdClientQuery } from '../../app/orderApiSlice'
import useAuth from "../../hooks/useAuth";

export default function BasicDemo() {

    const { _id, username, permission, name, email, phone, isAdmin, isClient, isWorker, isShiftManager } = useAuth()
    const { data: orders = [], isLoading, isError, error, isSuccess } = useGetOrderByIdClientQuery(_id)
    const { data:sweets=[],resGetAllSweets} = useGetAllSweetsQuery()

    const columns = [
        {field: 'status', header: 'סטטוס'},
        {field: 'address', header: 'לכתובת'},
        {field: 'createdAt', header: 'תאריך'},
        {field: 'sweets', header: 'מתוקים שהוזמנו'}
    ];

    useEffect(() => {
        if (isSuccess)
        {
        // let ordersToShow=[{status:'',address:'',createdAt:'',sweets:[]}]
        // createOrdersToShow(ordersToShow)
        console.log("orders",orders);
        }
        else
          console.log("loading");
    
      }, [isSuccess]);
    
    // const fillArry=(element)=>{
    //     element.sweets=['555','di']
    // }

    // const createOrdersToShow=(ordersToShow)=>{
    //     console.log("sweets",sweets);
    //     ordersToShow=orders.map((e)=>'','','',[])
    //     console.log("ordersToShow",ordersToShow);
    //     // for (let i = 0; i < ordersToShow.length; i++) {
    //     //     let myDate=`${new Date(orders[i].createdAt).getDate()}/${new Date(orders[i].createdAt).getMonth()+1}/${new Date(orders[i].createdAt).getFullYear()}` 
    //     //     ordersToShow[i].createdAt=myDate
    //     // }
    //     ordersToShow.forEach(element => {
    //         fillArry(element)
    //     });
    //     return ordersToShow
    // }

    return (
        <div className="card">
            {console.log("orders to db " + orders)}
            <Card title="היסטוריית הזמנות" style={{ textAlign: 'center', width: '80%', paddingRight: '10%', paddingLeft: '10%', marginLeft: '10%' }}>
                <DataTable value={orders} tableStyle={{ minWidth: '50rem' }}>
                    {columns.map((col, i) => (
                        <Column key={col.field} field={col.field} header={col.header} />
                    ))}
                </DataTable>

            </Card>

        </div>
    );
}
