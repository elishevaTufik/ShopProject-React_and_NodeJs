import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Menu } from 'primereact/menu';
import { PrimeIcons } from 'primereact/api';
import { isRejectedWithValue } from "@reduxjs/toolkit";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";


import { useLoginMutation } from '../../Authorization/authApiSlice'
import { setToken } from '../../Authorization/authSlice'
import './Login.css'

export default function Login() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [username, setUsername] = useState(true);
    const [password, setPassword] = useState(true);

    const [login, { isError, error, isSuccess, data }] = useLoginMutation()

    //מחיקת כל ה STATEשל המערכת נריץ את הפקודה
    // dispatch(apiSlice.util.resetApiState())

    useEffect(() => {
        if (isError) {
            console.log(error);
            {error.status==400?alert("!כל השדות הינם שדות חובה"):navigate("/RegisterClient")}
        }
    }, [isError])

    useEffect(() => {
        if (isSuccess) {
            dispatch(setToken(data))
            navigate("/Sweet")
        }
    }, [isSuccess])

    const onclicklogin = () => {
        login({ username: username, password: password })

    }

    return (

        <div className="card flex justify-content-center">

            <div className="LoginDiv" >
                <br /><br /><br /><br />


                
                <span className="p-input-icon-left">

                    <div className="flex gap-3">

                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-user"></InputIcon>
                            <InputText v-model="value1" id="username" placeholder="username" onChange={(e) => { setUsername(e.target.value) }} />
                        </IconField> <br /><br />
                    </div>

                </span>
                <div className="flex gap-3">
                    <Password
                        feedback={false}
                        id="password"
                        onChange={(e) => { setPassword(e.target.value) }} toggleMask />

                    <br /><br />

                    <Button label="התחבר" icon="pi pi-external-link" onClick={() => onclicklogin()} />
                </div>
            </div>
        </div>

    )
}