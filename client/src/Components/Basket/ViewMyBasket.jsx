import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// import { ProductService } from './service/ProductService';

import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
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

import { useCreateNewSweetMutation } from '../../app/sweetsApiSlice'
import { useUpdateSweetMutation } from '../../app/sweetsApiSlice'
import { useGetAllCartQuery, useUpdateQuantityOfProductMutation } from '../../app/basketSlice'
import { useDeleteProductMutation } from '../../app/basketSlice'
import { useCreateOrderMutation } from '../../app/orderApiSlice'
import './ViewMyBasket.css'

export default function ProductsDemo() {
    
    const navigate = useNavigate()
    
    const [DeleteProduct, resDeleteProduct] = useDeleteProductMutation()
    const [UpdateQuantityOfProduct] = useUpdateQuantityOfProductMutation()
    const [CreateOrder, resCreateOrder] = useCreateOrderMutation()

    const { data: cart = [], isSuccess } = useGetAllCartQuery()

    let sweets = [];

    useEffect(() => {
        if (isSuccess) {
            // console.log("cart",cart);
            // console.log(cart[1].sweetId._id);
        }
    }, [isSuccess])

    const onclickadd = () => {
        setVisible(false)
    }
 
    useEffect(() => {
        if (resCreateOrder.isError) {
            alert(resCreateOrder.error)
        }
        if (resCreateOrder.isSuccess) {
        }
        console.log(resCreateOrder)
    }
        , [resCreateOrder])

    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);

    const [checked, setChecked] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);

    const [visible, setVisible] = useState(false);

    const toast = useRef(null);
    const dt = useRef(null);

    const [price, setPrice] = useState(0);
    const [name, setName] = useState("");
    const [inInventory, setInInventory] = useState(false);
    const [id, setId] = useState(0);

    const [image, setImage] = useState("");

    
    // const cities = [
    //     { name: 'New York', code: 'NY' },
    //     { name: 'Rome', code: 'RM' },
    //     { name: 'London', code: 'LDN' },
    //     { name: 'Istanbul', code: 'IST' },
    //     { name: 'Paris', code: 'PRS' }
    // ];

    const fillArrSweets = () => {
        console.log("in fillArrSweets func");
        cart.forEach(element => {
           // sweets.push(element.sweetId._id)
            sweets.push(element)
        });
         console.log("sweets",sweets);
    }

    const onChangeCheckBox = (checked) => {
        setChecked(checked)
        setInInventory(checked)
    };

    const formatCurrency = (value) => {
        return value.toLocaleString('nis', { style: 'currency', currency: 'ILS' });
    };

    const openNew = () => {
        setSubmitted(false);
        setProductDialog(true);
    };

    const buyBasket = () => {
        navigate("/ConfirmOrder")
        // //clientId, branchId, sweets,address
        // fillArrSweets()
        // setVisible(true)
        // // CreateOrder(cart.clientId,sweets)
        // sweets = []
        // setSubmitted(false);
        // setProductDialog(true);
    };

    const onClikUpdeteQuentity = (id, quantity) => {

        UpdateQuantityOfProduct({ id, quantity })
    };

    const hideDialog = () => {
        setPrice(0)
        setName("")
        setInInventory(false)
        setId(0)
        setImage("")
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };


    const confirmDeleteProduct = (id1) => {
        setId(id1)
        setDeleteProductDialog(true);
    };

    const mydeleteProduct = () => {
        DeleteProduct(id)
        setDeleteProductDialog(false);
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

    const deleteSelectedProducts = () => {
        setDeleteProductsDialog(false);
    };

    const rightToolbarTemplate = (rowData) => {
        return <a href="http://localhost:3000/ConfirmOrder" target="_blank" rel="noopener noreferrer" className="p-button font-bold">רכישת הסל</a>
        //  <Button label="רכישת הסל" icon="pi pi-check" onClick={buyBasket()} />   
        // return <Button label="רכישת הסל" icon="pi pi-upload" className="p-button-help" onClick={buyBasket()} style={{ "backgroundColor": '#ec4899', border: '1px solid #ec4899' }} />;
    };

    const imageBodyTemplate = (rowData) => {
        return <img src={`images/${rowData.sweetId.image}`} alt={rowData.sweetId.image} className="shadow-2 border-round" style={{ width: '150px', direction: 'rtl' }} />;
    };
    //,nubvvvv
    const inputN = (rowData) => {
        return (<>
            <InputNumber min={1} className="card flex justify-content-center" value={rowData.quantity} onValueChange={(e) => onClikUpdeteQuentity(rowData._id, e.value)} showButtons buttonLayout="vertical" style={{ width: '8rem' }}
                decrementButtonClassName="p-button-secondary" incrementButtonClassName="p-button-secondary" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" />
        </>)
    }
    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    };

    const nameBodyTemplate = (rowData) => {
        return <p>{rowData.sweetId.name}</p>;
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.inInventory} severity={getSeverity(rowData.inInventory)}></Tag>;
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <s style={{ color: '#ffffff' }}> . . . </s>
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => { confirmDeleteProduct(rowData._id) }} />
            </React.Fragment>
        );
    };

    const getSeverity = (inInventorys) => {
        switch (inInventorys) {
            case true:
                return 'success';

            case false:
                return 'danger';
        }
    };

    const header = (
        <h1 className="m-0"> הסל שלי </h1>
    );

    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="לא" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            <Button label="כן" icon="pi pi-check" severity="danger" onClick={mydeleteProduct} />
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );

    return (
        <div >
            <br /><br /><br />
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" right={rightToolbarTemplate}></Toolbar>
                <DataTable ref={dt} value={cart}
                    style={{ opacity: 1 }}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="מראה {first} - {last} מתוך {totalRecords} מוצרים" globalFilter={globalFilter} header={header}
                >
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem', direction: 'rtl' }}></Column>
                    <Column field="inventoryStatus" body={statusBodyTemplate} ></Column>
                    <Column field="price" body={priceBodyTemplate} style={{ minWidth: '4rem', direction: 'rtl', textAlign: 'center' }}></Column>
                    <Column field="quantity" body={inputN} style={{ minWidth: '4rem', direction: 'rtl' }} ></Column>
                    <Column field="name" body={nameBodyTemplate} style={{ minWidth: '2rem', direction: 'rtl', textAlign: 'center' }}></Column>
                    <Column field="image" body={imageBodyTemplate} style={{ direction: 'rtl' }}> </Column>
                </DataTable>
            </div>


            <Dialog visible={deleteProductDialog} style={{ width: '32rem', textAlign: 'center' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} /> <br /><br />
                    {(
                        <span>
                            האם אתה בטוח רוצה למחוק את  <b>{name}?</b>
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteProductsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {<span>Are you sure you want to delete the selected products?</span>}
                </div>
            </Dialog>

            
            {/* <Dialog 
                visible={visible}
                modal

                onHide={() => {
                    setVisible(false)
                }}

                style={{textAlign:'center'}}
                content={({ hide }) => (

                    <div className="register card" style={{borderRadius:'15px', direction: 'rtl', textAlign:'center' ,width: '500px',height: '600px', backgroundColor: "white", backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}><br/>

                        <h1 style={{ marginRight: '30px',textAlign:'center' , fontSize: '30px' }}>טופס רכישה:</h1><br/>
                    
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
                            <ListBox filter value={selectedBranch} 
                            style={{width:'50%', borderRadius:'5px'}} 
                            placeholder="בחר סניף" 
                            onChange={(e) => setselectedBranch(e.value)} 
                            options={places} 
                            className="w-full md:w-14rem" />
                        </div><br/>

                        <div className="p-inputgroup flex-1">
                        <div className="flex align-items-center gap-2" >
                            <Button label="בטל" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10" style={{ marginTop: "70px", width: '100px', height: '50px', borderRadius: '10px', marginRight: '5%', backgroundColor: '#ffffff' }}></Button>
                            <Button label="הירשם" onClick={(e) => onclickadd()} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10" style={{ marginTop: "70px", width: '100px', height: '50px', borderRadius: '10px', marginRight: '17%', backgroundColor: '#ffffff' }}></Button>
                        </div>
                        </div><br/>

                    </div>
                )}
            ></Dialog> */}

        </div>
    );
}
