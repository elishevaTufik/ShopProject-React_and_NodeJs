import React, { useRef, useState, useEffect } from "react";
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

import GetAllManagerOrders from './GetAllManagerOrders'
import { useUpdateStatusMutation } from "../../app/orderApiSlice";
import { useGetAllOrdersQuery } from "../../app/orderApiSlice";

export default function ManagerOrders() {
    const stepperRef = useRef(null);
    const [updateStatus] = useUpdateStatusMutation()
    const { data: orders = [], isLoading, isError, error, isSuccess } = useGetAllOrdersQuery()
    const [order, setOrder] = useState({})

    const steps = {
        "accepted": 0,
        "done": 1,
        "closed": 2
    }
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
            {/* {console.log("Aaaaaaaaaa",order)} */}
            <Card title="ניהול הזמנות" style={{ textAlign: 'center', width: '80%', paddingRight: '10%', paddingLeft: '10%', marginLeft: '10%' }}>
                <div className="card flex justify-content-center">
                    {console.log("lllll", steps[order.status])}
                    {order.status === "accepted" ?
                        <>
                            {console.log(order.status)}
                            <Stepper activeStep={0} ref={stepperRef} style={{ flexBasis: '50rem' }} linear={true}>
                                <StepperPanel header="התקבל">
                                    <div className="flex flex-column h-12rem">
                                        <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                                            <Button onClick={() => {
                                                updateStatus(order._id);
                                                setOrder(orders.find(o => o._id == order._id))
                                                stepperRef.current.nextCallback()
                                            }
                                            } >ביצוע ההזמנה</Button>
                                        </div>
                                    </div>
                                    <div className="flex pt-4 justify-content-end">

                                    </div>
                                </StepperPanel>
                                <StepperPanel header="בדרך ללקוח">
                                    <div className="flex flex-column h-12rem">
                                        <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                                            <Button onClick={() => {
                                                updateStatus(order._id);
                                                setOrder(orders.find(o => o._id == order._id));
                                                stepperRef.current.nextCallback()

                                            }}>שליח ההזמנה בדרך</Button>
                                        </div>
                                    </div>
                                    <div className="flex pt-4 justify-content-between">

                                    </div>
                                </StepperPanel>
                                <StepperPanel header="בוצע">
                                    <div className="flex flex-column h-12rem">
                                        <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                                            <Button  >ההזמנה התקבלה בהצלחה</Button>
                                        </div>
                                    </div>

                                </StepperPanel>
                            </Stepper></> : <></>
                    }
                    {order.status === "done" ?
                        <>
                            {console.log(order.status)}
                            <Stepper activeStep={1} ref={stepperRef} style={{ flexBasis: '50rem' }} linear={true}>

                                <StepperPanel header="התקבל">
                                    <div className="flex flex-column h-12rem">
                                        <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                                            <Button onClick={() => {
                                                updateStatus(order._id);
                                                setOrder(orders.find(o => o._id == order._id))
                                                stepperRef.current.nextCallback()
                                            }
                                            } >ביצוע ההזמנה</Button>
                                        </div>
                                    </div>
                                    <div className="flex pt-4 justify-content-end">

                                    </div>
                                </StepperPanel>
                                <StepperPanel header="בדרך ללקוח">
                                    <div className="flex flex-column h-12rem">
                                        <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                                            <Button onClick={() => {
                                                updateStatus(order._id);
                                                setOrder(orders.find(o => o._id == order._id));
                                                stepperRef.current.nextCallback()

                                            }}>שליח ההזמנה בדרך</Button>
                                        </div>
                                    </div>
                                    <div className="flex pt-4 justify-content-between">

                                    </div>
                                </StepperPanel>
                                <StepperPanel header="בוצע">
                                    <div className="flex flex-column h-12rem">
                                        <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                                            <Button  >ההזמנה התקבלה בהצלחה</Button>
                                        </div>
                                    </div>

                                </StepperPanel>
                            </Stepper></> : <></>
                    }
                    {order.status === "closed" ?
                        <>
                            {console.log(order.status)}
                            <Stepper activeStep={2} ref={stepperRef} style={{ flexBasis: '50rem' }} linear={true}>

                                <StepperPanel header="התקבל">
                                    <div className="flex flex-column h-12rem">
                                        <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                                            <Button onClick={() => {
                                                updateStatus(order._id);
                                                setOrder(orders.find(o => o._id == order._id))
                                                stepperRef.current.nextCallback()
                                            }
                                            } >ביצוע ההזמנה</Button>
                                        </div>
                                    </div>
                                    <div className="flex pt-4 justify-content-end">

                                    </div>
                                </StepperPanel>
                                <StepperPanel header="בדרך ללקוח">
                                    <div className="flex flex-column h-12rem">
                                        <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                                            <Button onClick={() => {
                                                updateStatus(order._id);
                                                setOrder(orders.find(o => o._id == order._id));
                                                stepperRef.current.nextCallback()

                                            }}>שליח ההזמנה בדרך</Button>
                                        </div>
                                    </div>
                                    <div className="flex pt-4 justify-content-between">

                                    </div>
                                </StepperPanel>
                                <StepperPanel header="בוצע">
                                    <div className="flex flex-column h-12rem">
                                        <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                                            <Button  >ההזמנה התקבלה בהצלחה</Button>
                                        </div>
                                    </div>

                                </StepperPanel>
                            </Stepper></> : <></>
                    }

                </div>
            </Card>

            <div>
                <Card title="הזמנות לקוח" style={{ textAlign: 'center', width: '80%', paddingRight: '10%', paddingLeft: '10%', marginLeft: '10%' }}>
                    <GetAllManagerOrders setOrder={setOrder} />
                </Card>
            </div>
        </>
    )
}
