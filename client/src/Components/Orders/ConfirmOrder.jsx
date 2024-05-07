import React, { useState, useEffect, useRef } from 'react';

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

export default function ConfirmOrder() {

    const { data: branches = [] } = useGetAllBranchesQuery()
    console.log("branches",branches);
    
    const places = branches.map((e)=>e.location+", "+e.city);
    console.log("places",places);

    // const [branchId, setBranchId] = useState(null);
    const [address, setAddress] = useState("");
    const [selectedBranch, setselectedBranch] = useState(null);

    const onclickcancel = () => {

    };

    const onclickadd = () => {

    };


    return (
        <div  style={{width:'50%', textAlign:'center', marginTop: '10%', marginLeft: '25%'}}>
            <Card title="טופס רכישה" subTitle="---יאלה, בוא נזמין" className="md:w-25rem">
                <p className="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae 
                    numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
                </p>
                        <div className="p-inputgroup flex-1">
                            <span  className="p-inputgroup-addon" style={{marginRight:"40px", borderRadius:'5px'}}>
                                <i className="pi pi-home"></i>
                            </span>
                            <InputText style={{width:'50%',borderRadius:'5px'}} placeholder="הכתובת שלך" id="address" onChange={(e)=>{setAddress(e.target.value)}}/>
                        </div><br/>

                        <div className="p-inputgroup flex-1">
                           <span  className="p-inputgroup-addon" style={{marginRight:"40px", borderRadius:'5px'}}>
                                <i className="pi pi-shopping-bag"></i>
                            </span>
                            <ListBox filter value={selectedBranch}  style={{width:'50%', borderRadius:'5px'}} placeholder="בחר סניף" onChange={(e) => setselectedBranch(e.value)} options={places} className="w-full md:w-14rem" />
                        </div><br/>

                        <div className="flex align-items-center gap-2" >
                            <Button label="בטל" onClick={(e) => onclickcancel(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10" style={{ marginTop: "70px", width: '100px', height: '50px', borderRadius: '10px', marginRight: '5%', backgroundColor: '#ffffff' }}></Button>
                            <Button label="הירשם" onClick={(e) => onclickadd()} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10" style={{ marginTop: "70px", width: '100px', height: '50px', borderRadius: '10px', marginRight: '17%', backgroundColor: '#ffffff' }}></Button>
                        </div><br/>
            </Card>
        </div>
    )
}
        