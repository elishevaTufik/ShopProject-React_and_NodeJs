import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { Checkbox } from 'primereact/checkbox';
import { ListBox } from 'primereact/listbox';
import "primeflex/primeflex.css"

import { useGetAllBranchesQuery } from '../../app/branchApiSlice'
import { useCreateOrderMutation } from '../../app/orderApiSlice'
import { useGetAllCartQuery} from '../../app/basketSlice'
import { confirmDialog } from 'primereact/confirmdialog';

export default function ConfirmOrder() {
    
    const navigate = useNavigate()

    const { data: branches = [] } = useGetAllBranchesQuery()
    const { data: cart = [], isSuccess } = useGetAllCartQuery()
    const [CreateOrder, resCreateOrder] = useCreateOrderMutation()

    useEffect(() => {
        if (resCreateOrder.isError) {
            console.log(resCreateOrder.error)
        }
        if (resCreateOrder.isSuccess) {
        }
        console.log(resCreateOrder)
    }
        ,[resCreateOrder])


    console.log("branches",branches);
    
    let places=[]

    branches.forEach(e => {
        places.push({_id:e._id, description:e.location+" , "+e.city})
    });

    console.log("places",places);

    const [address, setAddress] = useState("");
    const [selectedBranchId, setselectedBranchId] = useState(null);

    const onclickadd = () => {

        if(address==null || address==''){
            alert("הכנס את הכתובת שלך")
            return
        }
        
        if(selectedBranchId==null){
            alert("בחר סניף ממנו תרצה להזמין")
            return
        }

        let x=cart[0].clientId
        //console.log("x, selectedBranchId, cart, address",x,selectedBranchId,cart,address);
        CreateOrder({x,selectedBranchId,cart,address})
    };

    const onclickcancel = () => {
        navigate("/Basket")
    };

    const footer = (
        <>
            <Button label="אישור הזמנה" icon="pi pi-check" onClick={onclickadd}/>
            <Button label="חזרה לסל" severity="secondary" icon="pi pi-undo" style={{ marginLeft: '0.5em' }} onClick={onclickcancel}  />
        </>
    );

    return (
        <div  style={{width:'50%', textAlign:'center', marginTop: '20px', marginLeft: '25%'}}>
            <Card title="טופס רכישה" subTitle="---יאלה, בוא נזמין"  footer={footer}>
                    <div className="p-inputgroup flex-1">
                        <InputText style={{width:'100%',borderRadius:'5px', textAlign:'center'}} placeholder="...מה הכתובת המלאה שלך? השליח יבוא אליך עד הבית" id="address" onChange={(e)=>{setAddress(e.target.value)}}/>
                        <span  className="p-inputgroup-addon" style={{marginRight:"40px", borderRadius:'5px'}}>
                            <i className="pi pi-home"></i>
                        </span></div><br/>
                    <p>אנא בחר סניף שממנו תרצה להזמין</p><br/>

                    <div className="p-inputgroup flex-1">
                        {/* <ListBox filter value={selectedBranch} style={{width:'50%', borderRadius:'5px'}} placeholder="בחר סניף" onChange={(e) => setselectedBranch(e.value)} options={places} className="w-full md:w-40rem" /> */}
                        <ListBox  value={selectedBranchId} style={{width:'50%', borderRadius:'5px'}} placeholder="בחר סניף" onChange={(e) => setselectedBranchId(e.value._id)} options={places} optionLabel="description" className="w-full md:w-40rem" />
                        <span  className="p-inputgroup-addon" style={{marginRight:"40px", borderRadius:'5px'}}>
                            <i className="pi pi-shopping-bag"></i>
                        </span> </div><br/>

            </Card>
        </div>
    )
}
        