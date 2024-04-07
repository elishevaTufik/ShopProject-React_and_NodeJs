import React, { useRef, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { removeToken } from "../../Authorization/authSlice"
import { Button } from 'primereact/button';

import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import "primeflex/primeflex.css"
import apiSlice from "../../app/apiSlice"

const Nav = () => {

    const [visible, setVisible] = useState(true);
    const { isUserLoggedIn } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleLogoutClick = () => {
        debugger
        navigate("/")
    }

    const toast = useRef(null);

    const accept = () => {
        
        dispatch(removeToken())
        dispatch(apiSlice.util.resetApiState())
        navigate("/")
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        navigate("/Sweet")

    }

    const confirm1 = () => {
        confirmDialog({
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept,
            reject
        });
    };


    return (
        <>
            <Toast ref={toast} />
            <ConfirmDialog
            style={{opacity:1, textAlign:'center', backgroundColor:'#ffffff', padding:'10px'}}
            visible={true}
                group="headless"
                content={() => (
                    <>
                   <h1>?האם אתה בטוח שאתה רוצה להתנתק</h1>
                        <div className="flex align-items-center gap-2 mt-4" style={{ textAlign:'center'}} >
     
                            <Button 
                                label="כן"
                                onClick={() => {
                                    accept();
                                }}
                                className="w-8rem"
                            ></Button>
                            <Button 
                                label="חס וכרפס"
                                outlined
                                onClick={() => {
                                    reject();
                                }}
                                className="w-8rem"
                            ></Button>
                        </div>
                    </>
                )}
            />
            {confirm1()}
        </>
    )
}
export default Nav
