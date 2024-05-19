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
import './ViewMyBasket.css'

export default function ProductsDemo() {
    
    const navigate = useNavigate()
    
    const [DeleteProduct, resDeleteProduct] = useDeleteProductMutation()
    const [UpdateQuantityOfProduct] = useUpdateQuantityOfProductMutation()
    const [c,setC]=useState([])
    const { data: cart = [], isSuccess,isError,error } = useGetAllCartQuery()

    let sweets = [];

    useEffect(() => {
        if (isSuccess) {
            // console.log("cart",cart);
            setC(cart)

        }
    }, [isSuccess])
    useEffect(() => {
            // console.log("cart",cart);
            setC(cart)

        
    }, [cart])
    useEffect(() => {
        if (isError) {
            console.log(error);
            if(error.status==400)
            setC([])
        }
    }, [isError])

    const onclickadd = () => {
        setVisible(false)
    }
 
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
        return <Button label="רכישת הסל" icon="pi pi-eject" className="p-button-help" onClick={buyBasket} disabled={checkDisabled()} style={{ "backgroundColor": '#ec4899', border: '1px solid #ec4899' }}  />;
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

    const checkDisabled =()=>{
        if (cart.length>0)
            return false
        return true
    }

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
                <DataTable ref={dt} value={c}
                    style={{ opacity: 1 }}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="מראה {first} - {last} מתוך {totalRecords} מוצרים" globalFilter={globalFilter} header={header}
                >
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem', direction: 'rtl' }}></Column>
                    <Column field="inventoryStatus" body={statusBodyTemplate} ></Column>
                    <Column field="price" body={priceBodyTemplate} style={{ minWidth: '4rem', direction: 'rtl', textAlign: 'center' }}></Column>
                    <Column field="quantity" body={inputN} style={{ minWidth: '4rem', direction: 'rtl'}} ></Column>
                    <Column field="name" body={nameBodyTemplate} style={{ minWidth: '2rem', direction: 'rtl', textAlign: 'center' }}></Column>
                    <Column field="image" body={imageBodyTemplate} style={{ direction: 'rtl' }}> </Column>
                </DataTable>
            </div>


            <Dialog visible={deleteProductDialog} style={{ width: '32rem', textAlign: 'center' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} /> <br /><br />
                    {(
                        <span>
                            ?האם אתה בטוח רוצה למחוק אותי  <b></b>
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

        </div>
    );
}
