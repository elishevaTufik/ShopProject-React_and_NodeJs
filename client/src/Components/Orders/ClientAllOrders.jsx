import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import { ProductService } from './ProductService';
import { Card } from 'primereact/card';

import { useGetOrderByIdClientQuery } from '../../app/orderApiSlice'
import useAuth from "../../hooks/useAuth";

export default function BasicDemo() {

    const { _id, username, permission, name, email, phone, isAdmin, isClient, isWorker, isShiftManager } = useAuth()
    const { data: orders = [], isLoading, isError, error, isSuccess } = useGetOrderByIdClientQuery(_id)
    
    const columns = [
        {field: 'status', header: 'סטטוס'},
        {field: 'address', header: 'לכתובת'},
        {field: 'createdAt', header: 'תאריך'},
        {field: 'sweets', header: 'מתוקים שהוזמנו'}
    ];

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
