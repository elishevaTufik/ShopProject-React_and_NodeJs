import React, { useState,useEffect } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Button } from 'primereact/button';
import { InputTextarea } from "primereact/inputtextarea";
//import { FloatLabel } from "primereact/floatlabel";

import { useGetMessageByIdClientQuery } from '../../app/messegApiSlice'

export default function MessageClient(props) {
    const id=props.id
    console.log(id);

   
    const { data: messages = [], isSuccess } = useGetMessageByIdClientQuery(id)
    const [activeIndex, setActiveIndex] = useState();
    const [value, setValue] = useState('');
    useEffect(() => {
        if (isSuccess) {
            console.log("messages",messages);
           
        }
    }, [isSuccess])
    console.log(messages);

    return ( 
    
        <div className="card">
            <div className="flex flex-wrap justify-content-end gap-2 mb-3">
                <Button outlined={activeIndex !== 0} rounded label={messages.clientId} onClick={() => setActiveIndex(0)} className="w-2rem h-2rem p-0" />
            </div>
            
            <Accordion multiple activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                <AccordionTab header={messages.clientId}>
                    <div className="card flex justify-content-center">
                        {/* <FloatLabel> */}
                            <InputTextarea id="description" value={value} onChange={(e) => setValue(e.target.value)} rows={5} cols={30} />
                            <label htmlFor="description">Description</label>
                        {/* </FloatLabel> */}
                    </div>
                </AccordionTab>
            </Accordion>
        </div>
    )
}