import React, { useRef } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';

import {useCancelOrderMutation} from '../../app/orderApiSlice'

export default function CancelOrder(props) {

    const lastId = props.lastId
    const lastStatus = props.lastStatus

    const [CancelOrder, resCreate] = useCancelOrderMutation(lastId)

    const toast = useRef(null);

    const accept = () => {
        if(lastStatus!='accepted'){
            alert("אי אפשר לבטל את ההזמנה שלך. כבר הכנו אותה והיא בדרך אליך....")
        return
        }
        CancelOrder(lastId)
        toast.current.show({ severity: 'success', summary: '', detail: 'הזמנתך בוטלה בהצלחה. נשמח לראות אותך שוב ולספק לך את מיטב המוצרים', life: 5000 });
    };

    const reject = () => {
        toast.current.show({ severity: 'success', summary: '', detail: 'אנחנו ממשיכים להכין לך את הטעמים המושלמים שלנו', life: 5000 });
    };

    const confirm1 = () => {
        confirmDialog({
            group: 'headless',
            message: '?האם אתה בטוח רוצה לבטל הזמנה זו',
            header: '',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept,
            reject
        });
    };

    return (
        <>
         <br/>
            <Toast ref={toast} />
            <ConfirmDialog
                group="headless"
                content={({ headerRef, contentRef, footerRef, hide, message }) => (
                    <div className="flex flex-column align-items-center p-5 surface-overlay border-round">
                        <div className="border-circle bg-primary inline-flex justify-content-center align-items-center h-6rem w-6rem -mt-8">
                            <i className="pi pi-question text-5xl"></i>
                        </div>
                        <span className="font-bold text-2xl block mb-2 mt-4" ref={headerRef}>
                            {message.header}
                        </span>
                        <p className="mb-0" ref={contentRef}>
                            {message.message}
                        </p>
                        <div className="flex align-items-center gap-2 mt-4" ref={footerRef}>
                            <Button
                                label="כן"
                                onClick={(event) => {
                                    hide(event);
                                    accept();
                                }}
                                className="w-8rem"
                            ></Button>
                            <Button
                                label="לא"
                                outlined
                                onClick={(event) => {
                                    hide(event);
                                    reject();
                                }}
                                className="w-8rem"
                            ></Button>
                        </div>
                    </div>
                )}
            />
            <div className="card flex flex-wrap gap-2 justify-content-center">
                <Button onClick={confirm1} icon="pi pi pi-eraser" label="לביטול ההזמנה"></Button>
            </div>
        </>
    )
}
        
        