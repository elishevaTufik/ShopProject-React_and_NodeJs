import React, { useState,useEffect } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Button } from 'primereact/button';
import { InputTextarea } from "primereact/inputtextarea";
import { DataView } from 'primereact/dataview';
//import { FloatLabel } from "primereact/floatlabel";
import messageCss from './Messege'
import { useGetMessageByIdClientQuery } from '../../app/messegApiSlice'

export default function MessageClient(props) {
    const id=props.id
    console.log(id);

    const { data: messages = [], isSuccess } = useGetMessageByIdClientQuery()
    const [activeIndex, setActiveIndex] = useState();
    const [value, setValue] = useState('');
    const [layout, setLayout] = useState('list');

    useEffect(() => {
        if (isSuccess) {
            console.log("messages",messages);
            console.log(messages[0].title);
        }
    }, [isSuccess])


    const listTemplate = (messages, layout) => {
        return <>{messages.map((messages, index) => itemTemplate(messages, layout, index))}</>;
    };

    const itemTemplate = (product, layout, index) => {
        if (!product) {
            return;
        }
        if (layout === 'list') return listItem(messages, index);
    };
    const listItem = (product, index) => {
        
    return ( <>
        <div className="card" style={{marginLeft:'35%', marginRight:'35%'} }> 
            <div className="flex flex-wrap justify-content-end gap-2 mb-300">
                <Button outlined={activeIndex !== 0} rounded label={index} onClick={() => setActiveIndex(0)} className="w-2rem h-2rem p-0" />
            </div>
            
            <Accordion multiple activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                <AccordionTab header={messages[index].title}>

                    <div className="card flex justify-content-center">
                        {/* <FloatLabel> */}
                            <label htmlFor="description">Description</label><br/><br/>
                            <InputTextarea id="description" value={value} onChange={(e) => setValue(e.target.value)} rows={5} cols={30} />
                            
                        {/* </FloatLabel> */}
                    </div>
                </AccordionTab>
            </Accordion>
        </div> 
        </>
    )
    }

    return (
        <div className="card" >
            <DataView value={messages} listTemplate={listTemplate} layout={layout}  />
            {/* <Toast ref={toast} /> */}
        </div>
    )
}