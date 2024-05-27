import React, { useState,useEffect } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Button } from 'primereact/button';
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { DataView } from 'primereact/dataview';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import './messageCss.css'
import { useGetMessageByIdClientQuery } from '../../app/messegApiSlice'
import { useWriteMessageMutation } from '../../app/messegApiSlice';

export default function MessageClient(props) {
    const id=props.id

    const [productDialog, setProductDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const { data: messages = [], isSuccess } = useGetMessageByIdClientQuery()
    const [writeMessage, resCreate] = useWriteMessageMutation()
    const [activeIndex, setActiveIndex] = useState();
    const [value, setValue] = useState('');
    const [layout, setLayout] = useState('list');

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [clientId, setClientId] = useState(id);

    useEffect(()=>{
        if(resCreate.isError){
            alert(resCreate.error)
        }
        if(resCreate.isSuccess){
        }
        console.log(resCreate)
    }
        ,[resCreate])

    useEffect(() => {
        if (isSuccess) {
            console.log("messages",messages);
        }
    }, [isSuccess])



    const saveProduct = () => {
        setSubmitted(true);

        if (title!="" && text!="") 
        {
                writeMessage({clientId,title, text})
                setText("")
                setTitle("")
                setClientId(id)
            setProductDialog(false);
        }
    };
    const hideDialog = () => {
        setText("")
        setTitle("")
        setClientId(0)
        setSubmitted(false);
        setProductDialog(false);
    };


    const listTemplate = (messages, layout) => {
        return <>{messages.map((messages, index) => itemTemplate(messages, layout, index))}</>;
    };

    const itemTemplate = (product, layout, index) => {
        if (!product) {
            return;
        }
        if (layout === 'list') return listItem(messages, index);
    };
    const openNew = () => {
        setSubmitted(false);
        setProductDialog(true);
    };
    const leftToolbarTemplate = () => {
        return (
                <Button  icon="pi pi-plus" severity="success" onClick={openNew} style={{backgroundColor:'#ce9149', border:'1px solid #ce9149'}} />
        );
    };

    const productDialogFooter = (
        <React.Fragment>
            <Button label="ביטול" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="שמירה" icon="pi pi-check" onClick={saveProduct} />
        </React.Fragment>
    );

    const listItem = (product, index) => {
    return ( <>

            
            <div className="card" style={{marginLeft:'35%', marginRight:'35%'} }> 
            <div className="flex flex-wrap justify-content-end gap-2 mb-300">
                <Button outlined={activeIndex !== 0} rounded label={index+1} onClick={() => setActiveIndex(0)} className="w-2rem h-2rem p-0" />
            </div>
            <Dialog visible={productDialog} style={{ width: '32rem'  }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="?מה תרצה" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>

                
                <div className="field">
                 
                    <InputText id="title" value={title} onChange={(e) =>setTitle(e.target.value)} required  autoFocus 
                     />
                    {submitted && title=="" && <small className="p-error">Title is required</small>}
                </div><br/><br/>

                <div className="field">
                    
                    <InputTextarea id="description" value={text} onChange={(e) => setText(e.target.value)} required rows={3} cols={20} />
                </div><br/><br/>

            </Dialog>
            <Accordion multiple activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                <AccordionTab header={messages[index].title}>

                    <div className="card flex justify-content-center">
                           <div>{messages[index].text}</div>
                    </div>
                </AccordionTab>
            </Accordion>
        </div> 
        </>
    )
    }

    return (<>
        <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
        <div className="card" >
            <DataView value={messages} listTemplate={listTemplate} layout={layout}  />
        </div>
        </>
    )
}