import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useRegisterWorkerMutation } from '../../app/workerApiSlice';

import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from 'primereact/dropdown';
import { Password } from 'primereact/password';
import { InputNumber } from 'primereact/inputnumber';
import { InputMask } from "primereact/inputmask";


import './Register.css'

export default function HeadlessDemo() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [visible, setVisible] = useState(true);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [registerWorker, { isError, isSuccess, error }] = useRegisterWorkerMutation()

    useEffect(() => {
        if (isError) {
            { error.status == 409 ? alert("אופס.... המשתמש הזה כבר קים") : alert("יש להשלים את כל השדות") }
            navigate("/registerWorker")
        }
    }, [isError])

    useEffect(() => {
        if (isSuccess) {
            navigate("/login")
        }
    }, [isSuccess])

    const onclickadd = () => {
        setVisible(false)
        registerWorker({ username: username, name: name, password: password, email: email, phone: phone,branchId:null })
        setUsername("")
        setPassword("")
        setName("")
        setEmail("")
        setPhone("")
    }

    const workersList = ()=>{
        navigate('/EditWorkers')
    }

    return (
        <div className="card flex justify-content-center" style={{ textAlign: 'center' }}>

            <Button onClick={() => setVisible(true)} >הוסף עובד חדש</Button>
            <br/><br/>
            <Button onClick={() => workersList()} >לחזרה לרשימת עובדים</Button>

            <Dialog
                visible={visible}
                modal

                onHide={() => {
                    setVisible(false)
                }}

                style={{ textAlign: 'center' }}
                content={({ hide }) => (

                    <div className="register card" style={{ borderRadius: '15px', direction: 'rtl', textAlign: 'center', width: '500px', height: '600px', backgroundColor: "white", backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}><br />

                        <h1 style={{ marginRight: '30px', textAlign: 'center', fontSize: '30px' }}>ברוך הבא אלינו</h1><br />

                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon" style={{ marginRight: "40px", borderRadius: '5px' }}>
                                <i className="pi pi-user"></i>
                            </span>
                            <InputText style={{ maxWidth: "75%", borderRadius: '5px' }} placeholder="שם משתמש" id="username" onChange={(e) => { setUsername(e.target.value) }} />
                        </div><br />

                        <div className="p-inputgroup flex-1">
                            <span style={{ marginRight: "40px", borderRadius: '5px' }} className="p-inputgroup-addon">
                                <i className="pi pi-key"></i>
                            </span>
                            <div style={{maxWidth: "700%"}}>
                                <div className="p-inputgroup flex-1 ">
                                    <Password style={{ borderRadius: '5px', paddingLeft: "27rem" }} placeholder="סיסמה" id="password" onChange={(e) => { setPassword(e.target.value) }} toggleMask />
                                </div>
                            </div>
                        </div><br />

                        <div className="p-inputgroup flex-1">
                            <span style={{ marginRight: "40px", borderRadius: '5px' }} className="p-inputgroup-addon">
                                <i className="pi pi-pause"></i>
                            </span>
                            <InputText style={{ maxWidth: "75%", borderRadius: '5px' }} placeholder="שם מלא" id="name" onChange={(e) => { setName(e.target.value) }} />
                        </div><br />

                        <div className="p-inputgroup flex-1">
                            <span style={{ marginRight: "40px", borderRadius: '5px' }} className="p-inputgroup-addon">
                                <i className="pi pi-envelope"></i>
                            </span>
                            <InputText style={{ maxWidth: "75%", borderRadius: '5px' }} placeholder="מייל" id="email" onChange={(e) => { setEmail(e.target.value) }} />
                        </div><br />

                        <div className="p-inputgroup flex-1">
                            <span style={{ marginRight: "40px", borderRadius: '5px' }} className="p-inputgroup-addon">
                                <i className="pi pi-phone"></i>
                            </span>
                            <InputMask mask="999-9999999" style={{ maxWidth: "75%", borderRadius: '5px' }} placeholder="טלפון" id="phone" onChange={(e) => { setPhone(e.value) }} />
                        </div>
                        <div className="flex align-items-center gap-2" >
                            <Button label="בטל" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10" style={{ marginTop: "70px", width: '100px', height: '50px', borderRadius: '10px', marginRight: '5%', backgroundColor: '#ffffff' }}></Button>
                            <Button label="הירשם" onClick={(e) => onclickadd()} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10" style={{ marginTop: "70px", width: '100px', height: '50px', borderRadius: '10px', marginRight: '17%', backgroundColor: '#ffffff' }}></Button>
                        </div>
                    </div>
                )}
            ></Dialog>
        </div>
    )
}
