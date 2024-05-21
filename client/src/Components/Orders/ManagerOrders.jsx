import React, { useRef ,useState,useEffect} from "react";
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';

import { useUpdateStatusMutation } from "../../app/orderApiSlice";
import { useGetAllOrdersQuery } from "../../app/orderApiSlice"; 
export default function BasicDemo({order}) {
    const stepperRef = useRef(null);
    const [updateStatus] = useUpdateStatusMutation()
    //const [products, setOrder] = useState([]);
    const { data:orders=[], isLoading, isError, error, isSuccess } = useGetAllOrdersQuery()
    // const orderUpdate =  {id:order._id,status:order.status}
    useEffect(() => {
        if (isSuccess){
            //setProducts(orders)
            console.log(orders);
        }
        else
            console.log("loading");

    }, [isSuccess]);

    

    return (
        <div className="card flex justify-content-center">
        <Stepper ref={stepperRef} style={{ flexBasis: '50rem' }}>
            <StepperPanel  header="התקבל">
                <div className="flex flex-column h-12rem">
                    <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                     
                        <Button onClick={()=>updateStatus(orders[2]._id)} >ביצוע ההזמנה</Button>
                        
                        </div>
                </div>
                <div className="flex pt-4 justify-content-end">
                    <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
                </div>
            </StepperPanel>
            <StepperPanel  header="בדרך ללקוח">
                <div className="flex flex-column h-12rem">
                    <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                    <Button  onClick={()=>updateStatus(orders[2]._id)}>שליח ההזמנה בדרך</Button>
                        </div>
                </div>
                <div className="flex pt-4 justify-content-between">
                    <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
                    <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
                </div>
            </StepperPanel>
            <StepperPanel  header="בוצע">
                <div className="flex flex-column h-12rem">
                    <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                    <Button  onClick={()=>updateStatus(orders[2]._id)}>ההזמנה התקבלה בהצלחה</Button>
                        </div>
                </div>
                <div className="flex pt-4 justify-content-start">
                    <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
                </div>
            </StepperPanel>
        </Stepper>
        </div>
    
    )
}
         