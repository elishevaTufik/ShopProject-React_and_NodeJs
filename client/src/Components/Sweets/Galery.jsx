import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';

import { useGetAllSweetsQuery } from '../../app/sweetsApiSlice'
import { useAddNewProdMutation } from '../../app/basketSlice'
import useAuth from "../../hooks/useAuth";

import './SweetViewClient.css'
import "primeflex/primeflex.css"

export default function Galery() {
    
    const {_id,username, permission, name, email, phone, isAdmin, isClient,isWorker,isShiftManager}=useAuth()

    const toast = useRef(null);

    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [layout, setLayout] = useState('grid');

    const { data, isLoading, isError, error, isSuccess } = useGetAllSweetsQuery()
    const [AddNewProd, resAddNewProd] = useAddNewProdMutation()



    const cart = JSON.parse(localStorage.getItem('cart')) || []

    useEffect(() => {
        if (isSuccess)
            setProducts(data)
        else
            console.log("loading");

    }, [isSuccess]);

    useEffect(() => {
        if (resAddNewProd.isError) {
            console.log(resAddNewProd.error)
        }
        if (resAddNewProd.isSuccess) {
            console.log("success resAddNewProd")

        }
        console.log(resAddNewProd)
    }
        , [resAddNewProd])

    const checkDisabled = (value) => {
        if(username==undefined)
          return true
        
        return value
    
    };
    
    const listItem = (product, index) => {
        return (
            <>
                <div className="col-12" key={product.id} style={{ width: '33%' }}>
                    <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                        <img className="classSize" src={`images/${product.image}`} style={{ height: 150, width: 150 }}/*alt={product.name}*/ />
                        <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                                <div className="text-2xl font-bold text-900">{product.name}</div>
                                <div>{product.description}</div>
                                {/* <div className="flex align-items-center gap-3">
                                    <span className="flex align-items-center gap-2">
                                        <span className="font-semibold">{product.category}</span>
                                    </span>
                                </div> */}
                                {(!product.inInventory)?<Button label="אזלתי מהמלאי" severity="danger" outlined disabled={true}/>:<></>}
                            </div>
                            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                                <span className="text-2xl font-semibold">₪{product.price}</span>
                                <Button onClick={() => { hundleSubmit(product) }} icon="pi pi-cart-plus" className="p-button-rounded" disabled={checkDisabled(!product.inInventory)}></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    const gridItem = (product) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" >
                <div className="p-4 border-1 surface-border surface-card border-round" >
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <span className="font-semibold">{product.category}</span>
                        </div>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <img className="classSize" src={`images/${product.image}`} alt={product.name} />
                        <div className="text-2xl font-bold">{product.name}</div>
                        <div>{product.description}</div>
                    </div>
                    <div className="flex align-items-center justify-content-between"> 
                        <span className="text-2xl font-semibold">₪{product.price}</span> 
                        {(!product.inInventory)?<Button label="אזלתי מהמלאי" severity="danger" outlined disabled={true}/>:<></>}
                        <Button onClick={() => { hundleSubmit(product) }} icon="pi pi-cart-plus" className="p-button-rounded" disabled={checkDisabled(!product.inInventory)}></Button>
                    </div> 
                </div>
            </div>
        );
    };

    const itemTemplate = (product, layout, index) => {
        if (!product) {
            return;
        }

        if (layout === 'list') return listItem(product, index);
        else if (layout === 'grid') return gridItem(product);
    };

    const listTemplate = (products, layout) => {
        return <div className="grid grid-nogutter">{products.map((product, index) => itemTemplate(product, layout, index))}</div>;
    };

    const header = () => {
        return (
            <div className="flex justify-content-end">
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    const hundleSubmit = (product) => {        
        AddNewProd(product._id)
        toast.current.show({ severity: 'success', summary: 'המוצר נוסף לסל בהצלחה', life: 3000 });
    }

    return (
        <div className="card" >
            <DataView value={products} listTemplate={listTemplate} layout={layout} header={header()} />
            <Toast ref={toast} />
        </div>
    )
}