import React from 'react'; 
import { Card } from 'primereact/card';
import {useCalculateTotalPaymentQuery} from '../../app/basketSlice'

export default function TotalPayment() {

    const { data: totalPrice, isLoading, isError, error, isSuccess } = useCalculateTotalPaymentQuery()

    return (
        <div className="card">
            <Card title=":סכום ביניים לתשלום">
                <p className="m-0" style={{fontSize:'200%'}}>
                    {totalPrice}₪
                </p> 
            </Card>
          
        </div>
    )
}
        