import React, { useRef, useState, useEffect } from "react";
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

import GetAllManagerOrders from './GetAllManagerOrders'
import { useUpdateStatusMutation } from "../../app/orderApiSlice";
import { useGetAllOrdersQuery } from "../../app/orderApiSlice";

export default function BasicDemo({ order }) {
    const stepperRef = useRef(null);
    const [updateStatus] = useUpdateStatusMutation()

    // const { data: orders = [], isLoading, isError, error, isSuccess } = useGetAllOrdersQuery()
    // useEffect(() => {
    //     if (isSuccess) {
    //         //setProducts(orders)
    //         console.log(orders);
    //     }
    //     else
    //         console.log("loading");

    // }, [isSuccess]);


    return (
        <>
            <Card title="הזמנות לקוח" style={{ textAlign: 'center', width: '80%', paddingRight: '10%', paddingLeft: '10%', marginLeft: '10%' }}>
            <div className="card flex justify-content-center">
                <Stepper ref={stepperRef} style={{ flexBasis: '50rem' }}>
                    <StepperPanel header="התקבל">
                        <div className="flex flex-column h-12rem">
                            <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                                <Button onClick={() => updateStatus(order.id)} >ביצוע ההזמנה</Button>
                            </div>
                        </div>
                        <div className="flex pt-4 justify-content-end">
                            <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
                        </div>
                    </StepperPanel>
                    <StepperPanel header="בדרך ללקוח">
                        <div className="flex flex-column h-12rem">
                            <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                                <Button onClick={() => updateStatus(order.id)}>שליח ההזמנה בדרך</Button>
                            </div>
                        </div>
                        <div className="flex pt-4 justify-content-between">
                            <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
                        </div>
                    </StepperPanel>
                    <StepperPanel header="בוצע">
                        <div className="flex flex-column h-12rem">
                            <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                                <Button  >ההזמנה התקבלה בהצלחה</Button>
                            </div>
                        </div>

                    </StepperPanel>
                </Stepper>

            </div>
            </Card>

            <div>
                <Card title="הזמנות לקוח" style={{ textAlign: 'center', width: '80%', paddingRight: '10%', paddingLeft: '10%', marginLeft: '10%' }}>
                    <GetAllManagerOrders />
                </Card>
            </div>
        </>
    )
}
